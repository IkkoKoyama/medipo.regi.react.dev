const {
  glob: {
    React: {
      useState,
      useEffect,
    },
    useStore
  },
  atoms: {
    Box,
    Flex
  },
  fn: {
    Buttons,
    Table: {
      Attachment
    },
    Modal
  },
  inmemory
} = amotify;


import style from './style.module.scss';

import { GanttCell } from './GanttCell';

import { methods } from './_'


const autoScroll = ( params: {
  componentId: string
  cursor: {
    x: number
    y: number
  }
  end: boolean
} ) => {
  let {
    componentId,
    cursor,
    end
  } = params;

  clearInterval( inmemory[ componentId ].autoScroll );

  let Base = $( '#Wrapper-' + componentId );
  let BaseRect = Base.position();
  let OriginRect = $( '#OriginCell-' + componentId ).position();
  if ( cursor.x / OriginRect.right <= 1.1 ) {
    let bitShift = ( 1 - cursor.x / OriginRect.right ) * 10;
    bitShift = Math.min( bitShift,10 );
    inmemory[ componentId ].autoScroll = setInterval( () => {
      Base[ 0 ].scrollLeft -= ( 5 + bitShift );
    },10 );
  }
  if ( cursor.x / BaseRect.right >= .9 ) {
    let bitShift = ( cursor.x / BaseRect.right - .9 ) * 100 | 0;
    bitShift = Math.min( bitShift,10 );
    inmemory[ componentId ].autoScroll = setInterval( () => {
      Base[ 0 ].scrollLeft += ( 5 + bitShift );
    },10 );
  }

  if ( end ) {
    clearInterval( inmemory[ componentId ].autoScroll );
  }
}

export const BodyRows: FNC<{
  status: TimeGantt.StatusParams
}> = ( params ) => {
  let [ val_init,set_init ] = useState( false );
  let [ val_refresh,set_refresh ] = useState( $.uuidGen() );

  let [ val_status,set_status ] = useState( params.status );

  let cellSize = 0;
  if ( val_init ) {
    cellSize = $( '#TimeCell-' + val_status.componentId + '-' + val_status.unitsInfo[ 0 ].time ).position().width;
  }

  inmemory[ val_status.componentId ] = {
    ...inmemory[ val_status.componentId ],
    onStretchEffect: ( params: TimeGantt.Effect.Stretch.Params ) => {
      let {
        componentId,
        cur,
        def,
        dir,
        status
      } = params;

      let CellIndex = val_status.cells.findIndex( ( cell ) => cell.componentId == componentId );
      if ( CellIndex == -1 ) return;

      let cell = val_status.cells[ CellIndex ];
      if ( !cell ) return;

      let Base = $( '#Wrapper-' + val_status.componentId );
      let {
        from,
        to,
        rowIndex
      } = cell;

      let eventInfo = inmemory[ val_status.componentId ].activeEvent;
      if ( !eventInfo ) {
        inmemory[ val_status.componentId ].activeEvent = eventInfo = {
          componentId,
          origin: {
            from,
            to,
            scroll: Base[ 0 ].scrollLeft
          },
          rowIndex,
          end: status == 'end'
        }
      }
      let scrollX = Base[ 0 ].scrollLeft - inmemory[ val_status.componentId ].activeEvent.origin.scroll;
      let dragX = cur.x - def.x + scrollX;
      let shiftUnits = Math.round( dragX / cellSize );
      let marginPX = shiftUnits * val_status.unit;

      let newFrom = cell.from,newTo = cell.to;

      if ( dir == 'right' ) {
        newTo = eventInfo.origin.to + marginPX;
        if ( newFrom >= newTo ) newFrom = cell.to - val_status.unit;
        if ( newFrom == newTo ) newFrom -= val_status.unit;
      } else if ( dir == 'left' ) {
        newFrom = eventInfo.origin.from + marginPX;
        if ( newFrom >= newTo ) newTo = cell.from + val_status.unit;
        if ( newFrom == newTo ) newTo += val_status.unit;
      }

      autoScroll( {
        componentId: val_status.componentId,
        cursor: cur,
        end: status == 'end'
      } );

      if ( status == 'end' ) {
        inmemory[ val_status.componentId ].activeEvent = void 0;
      }

      if ( status != 'end' && to == newTo && from == newFrom ) return;
      if ( val_status.openAt > newFrom ) newFrom = val_status.openAt;
      if ( val_status.closeAt < newTo ) newTo = val_status.closeAt;
      if ( val_status.openAt >= newTo ) newTo = val_status.openAt + val_status.unit;
      if ( val_status.closeAt <= newFrom ) newFrom = val_status.closeAt - val_status.unit;

      val_status.cells[ CellIndex ] = {
        ...val_status.cells[ CellIndex ],
        from: newFrom,
        to: newTo
      }

      set_status( { ...val_status } );
    },
    onDragEffect: ( params: TimeGantt.Effect.Drag.Params ) => {
      let {
        componentId,
        cur,
        def,
        status
      } = params;

      let CellIndex = val_status.cells.findIndex( ( cell ) => cell.componentId == componentId );
      if ( CellIndex == -1 ) return;
      let cell = val_status.cells[ CellIndex ];
      let {
        from,
        to,
        rowIndex,
        segmentId
      } = cell;

      let Base = $( '#Wrapper-' + val_status.componentId );

      let eventInfo = inmemory[ val_status.componentId ].activeEvent;
      if ( !eventInfo ) {
        inmemory[ val_status.componentId ].activeEvent = eventInfo = {
          componentId,
          origin: {
            from,
            to,
            scroll: Base[ 0 ].scrollLeft
          },
          rowIndex
        }
      }


      let scrollX = Base[ 0 ].scrollLeft - inmemory[ val_status.componentId ].activeEvent.origin.scroll;
      let dragX = cur.x - def.x + scrollX;
      let shiftUnits = Math.round( dragX / cellSize );
      let marginPX = shiftUnits * val_status.unit;

      let newFrom = eventInfo.origin.from + marginPX;
      let newTo = eventInfo.origin.to + marginPX;
      let newSegmentId = segmentId;

      {
        let heights = inmemory[ val_status.componentId ].segmentedHeights;
        let Y = cur.y - window.scrollY;
        for ( let index = 0; index < val_status.segments.length; index++ ) {
          let {
            id
          } = val_status.segments[ index ];
          let Cell = $( '#ObjectCell-' + val_status.componentId + '-' + id );

          let {
            top,bottom
          } = Cell.position();

          if ( index == 0 ) {
            if ( Y <= bottom ) {
              newSegmentId = id;
              break;
            }
          } else if ( index == heights.length - 1 ) {
            if ( top <= Y ) {
              newSegmentId = id;
              break;
            }
          } else {
            if ( top <= Y && Y <= bottom ) {
              newSegmentId = id;
              break;
            }
          }
        }
      }

      autoScroll( {
        componentId: val_status.componentId,
        cursor: cur,
        end: status == 'end'
      } );

      if ( segmentId != newSegmentId ) {
        inmemory[ val_status.componentId ].activeEvent.rowIndex = 0;
      }
      if ( status == 'end' ) {
        inmemory[ val_status.componentId ].activeEvent = void 0;
      }

      if ( status != 'end' && to == newTo && from == newFrom && segmentId == newSegmentId ) return;
      if ( val_status.openAt > newFrom ) newFrom = val_status.openAt;
      if ( val_status.closeAt < newTo ) newTo = val_status.closeAt;
      if ( val_status.openAt >= newTo ) newTo = val_status.openAt + val_status.unit;
      if ( val_status.closeAt <= newFrom ) newFrom = val_status.closeAt - val_status.unit;

      val_status.cells[ CellIndex ] = {
        ...val_status.cells[ CellIndex ],
        from: newFrom,
        to: newTo,
        segmentId: newSegmentId
      }

      set_status( { ...val_status } );
    }
  }

  useEffect( () => {
    useStore( {
      insertId: val_status.componentId,
      data: {
        rowLocked: null,
        marginUnits: 0,
        segmentedHeights: []
      }
    } );

    set_init( true );
  },[] );

  let {
    activeEvent
  } = inmemory[ val_status.componentId ] || {}

  let ActiveIndicator = inmemory[ 'ActiveIndicator-' + val_status.componentId ];
  if ( ActiveIndicator ) {
    if ( activeEvent ) {
      let cell = val_status.cells.filter( ( cell ) => cell.componentId == activeEvent.componentId )[ 0 ];
      let { from,to } = cell;
      ActiveIndicator.fadeIn( from,to );
    } else {
      ActiveIndicator.fadeOut();
    }
  }

  let Rows: ReactElement[] = [];
  val_status.segments.forEach( ( segmented,index ) => {
    let {
      id: objId,
      label
    } = segmented;

    let ClassNames = [
      style.TableCell,
      style.Stem,
      style.ObjectCell
    ];

    let Cols: ReactElement[] = [];

    {
      let Children: ReactElement = null;
      if ( val_init ) {
        let filterCells = val_status.cells.filter( ( cell ) => cell.segmentId == objId );
        let matrix: number[][] = [];
        let metrics = Array.from( { length: val_status.colLength } ).map( ( a ) => 1 );

        let RowsCells: ReactElement[][] = [];
        let primeCells = filterCells.filter( ( cell ) => cell.componentId == activeEvent?.componentId );
        let normalCells = filterCells.filter( ( cell ) => cell.componentId != activeEvent?.componentId );

        const viewer = ( cell: TimeGantt.CellObjectParams,index: number ) => {
          let {
            componentId,
            segmentId,
            from,
            to,
            color
          } = cell;

          if ( from < val_status.from ) return;
          if ( val_status.to < to ) return;

          let fromIndex = ( from - val_status.from ) / val_status.unit;
          let toIndex = ( to - val_status.from ) / val_status.unit - 1;

          let BaseRect = $( '#TimeCell-' + val_status.componentId + '-' + val_status.from ).position();
          let fromCellRect = $( '#TimeCell-' + val_status.componentId + '-' + from ).position();
          let toCellRect = $( '#TimeCell-' + val_status.componentId + '-' + ( to - val_status.unit ) ).position();

          let Left = ( fromCellRect.left - BaseRect.left ) | 0;
          let Width = toCellRect.right - fromCellRect.left;

          let rowIndex = -1;
          if ( componentId == activeEvent?.componentId ) {
            rowIndex = activeEvent.rowIndex;
          } else {
            for ( let metricsIndex = 0; metricsIndex <= matrix.length; metricsIndex++ ) {
              if ( !matrix[ metricsIndex ] ) matrix[ metricsIndex ] = [ ...metrics ];
              let rowMatrix = matrix[ metricsIndex ];
              let available = 1;
              for ( let colIndex = fromIndex; colIndex <= toIndex; colIndex++ ) {
                available &= rowMatrix[ colIndex ];
              }
              if ( !!available ) {
                rowIndex = metricsIndex;
                break;
              }
            }
            if ( rowIndex == -1 ) {
              rowIndex = matrix.length;
            }
          }

          if ( !matrix[ rowIndex ] ) matrix[ rowIndex ] = [ ...metrics ];
          for ( let index = fromIndex; index <= toIndex; index++ ) {
            matrix[ rowIndex ][ index ] = 0;
          }
          cell.rowIndex = rowIndex;

          if ( !RowsCells[ rowIndex ] ) RowsCells[ rowIndex ] = [];

          RowsCells[ rowIndex ].push(
            <Flex _width={ 0 }>
              <GanttCell
                key={ componentId }
                componentId={ componentId }
                baseComponentId={ val_status.componentId }
                active={ activeEvent?.componentId == componentId }
                color={ color }
                position='relative'
                flexSizing={ 'none' }
                freeCSS={ {
                  left: Left,
                  width: Width - 1
                } }
              >
                { componentId }
                <Box
                  fontSize={ '1.mini' }
                  ssTextEllipsis
                >
                  { methods.minutesToTime( from ) }
                  ~
                  { methods.minutesToTime( to ) }
                </Box>
              </GanttCell>
            </Flex>
          );
        }

        primeCells.forEach( viewer );
        normalCells.forEach( viewer );

        let Rows = RowsCells.map( ( RowCells ) => <Flex flexWrap={ false } children={ RowCells } /> );
        Children = <Flex
          flexType='col'
          gap={ 1 }
          position='relative'
          padding={ [ 3,0 ] }
          freeCSS={ {
            minHeight: 12 * 8
          } }
          children={ Rows }
        />;
      }
      Cols = [
        <Attachment.Cell.Data
          backgroundColor={ '1.layer.base' }
          className={ ClassNames.join( ' ' ) }
          position='relative'
          id={ 'ObjectCell-' + val_status.componentId + '-' + objId }
        >
          { label }
        </Attachment.Cell.Data >,
        <Box
          _width={ 0 }
          className={ style.MetaCell }
          children={ Children }
        />
      ];
    }

    for ( let index = 0; index < val_status.colLength; index++ ) {
      let Params: amotify.fn.Tables.TableCellParams = {}

      let ClassNames = [
        style.TableCell,
        style.FieldCell
      ];
      let unitInfo = val_status.unitsInfo[ index ];
      if ( unitInfo.outCell ) {
        Params.backgroundColor = 'lcOpLow';
      } else {
        ClassNames.push( style.Addable );
      }
      if ( unitInfo.stem ) ClassNames.push( style.Stem );

      Params.className = ClassNames.join( ' ' );

      Cols.push(
        <Attachment.Cell.Data
          backgroundColor={ '1.layer.base' }
          ssPushable
          { ...Params }
        />
      );
    }

    Rows.push(
      <Attachment.Row
        className={ [
          style.Row,
          style[ 'Last_' + !!( index == val_status.segments.length - 1 ) ]
        ].join( ' ' ) }
      >
        { Cols }
      </Attachment.Row>
    );
  } );

  return (
    <Attachment.Body className={ style.TBody }>
      { Rows }
    </Attachment.Body>
  );
}


const Pending = async ( params: {
  type: 'mouse' | 'touch'
  x: number
  y: number
  time: number
} ) => {
  let {
    type,
    x,y,time
  } = params;
  return await $.pending( ( resolve ) => {
    $( window ).addEvent( {
      eventId: 'PendingCancelizationEnd',
      eventType: type == 'mouse' ? 'mouseup' : 'touchend',
      callback: () => {
        resolve( false );
      }
    } ).addEvent( {
      eventId: 'PendingCancelizationBlur',
      eventType: type == 'mouse' ? 'mousemove' : 'touchmove',
      callback: ( event ) => {
        let cursor = $.getCursor( event );
        let diffX = cursor.x - x;
        let diffY = cursor.y - y;
        let Diff = diffX ** 2 + diffY ** 2;
        if ( Diff >= 20 ** 2 ) {
          resolve( false );
        }
      }
    } );
    setTimeout( () => {
      $( window ).removeEvent( [ 'PendingCancelizationEnd','PendingCancelizationBlur' ] );
    },time );
  },time );
}

const AddModalEffect = async ( event: MouseEvent ) => {
  let {
    type
  } = event;

  let defCursor = $.getCursor( event );

  let pendingResult = await Pending( {
    type: type == 'mousedown' ? 'mouse' : 'touch',
    x: defCursor.x,
    y: defCursor.y,
    time: 300
  } );
  if ( !pendingResult ) return;


  CreateVisitFN( {
    callback: () => {
      // getList();
    }
  } );
}
const StretchEffect = async ( event: MouseEvent ) => {
  event.preventDefault();

  let {
    type,
    target
  } = event;
  let Button = ( target as HTMLElement ).closest( '.' + style.ForEventClassStretch ) as HTMLElement;
  let {
    dir,
    baseComponentId,
    componentId
  } = Button.dataset;

  let component = amotify.inmemory[ baseComponentId! ];

  let callback: TimeGantt.Effect.Stretch.Callback = component.onStretchEffect;
  let defaultCursor = $.getCursor( event );

  $( '#Table-' + baseComponentId ).addClass( [ style.Editable,style.StretchEffect ] );
  $( event.target ).parent( '.' + style.GanttCell ).addClass( [ style.ActiveOrigin,style.Stretch ] );

  $( window ).addEvent( {
    eventId: 'GanttCellStretchEffectMove',
    eventType: type == 'mousedown' ? 'mousemove' : 'touchmove',
    option: { passive: false },
    callback: ( event ) => {
      event.preventDefault();

      callback( {
        componentId: componentId!,
        cur: $.getCursor( event ),
        def: defaultCursor,
        dir: dir as 'left',
        status: 'move'
      } );
    }
  } ).addEvent( {
    eventId: 'GanttCellStretchEffectEnd',
    eventType: type == 'mousedown' ? 'mouseup' : 'touchend',
    callback: ( event ) => {
      callback( {
        componentId: componentId!,
        cur: $.getCursor( event ),
        def: defaultCursor,
        dir: dir as 'left',
        status: 'end'
      } );

      $( window ).removeEvent( [ 'GanttCellStretchEffectMove','GanttCellStretchEffectEnd' ] );

      $( '#Table-' + baseComponentId ).removeClass( [ style.Editable,style.StretchEffect ] );
      $( '.' + style.GanttCell ).removeClass( style.ActiveOrigin );
    }
  } );
}


import {
  OpenVisitDetailsModal
} from '../../VisitHistory/page';
import {
  CreateVisitFN
} from '../../Modals/_';

const DragEffect = async ( event: MouseEvent ) => {
  event.preventDefault();

  let Type = event.type == 'mousedown' ? 'mouse' : 'touch' as 'mouse' | 'touch';
  let {
    target
  } = event;
  let Button = ( target as HTMLElement ).closest( '.' + style.ForEventClassDrag ) as HTMLElement;
  let cursor = $.getCursor( event );
  let {
    baseComponentId,
    componentId
  } = Button.dataset;

  let eventInfo = {
    baseComponentId: baseComponentId!,
    dragId: $.uuidGen(),
    origin: { x: 0,y: 0 },
    def: { x: cursor.x,y: cursor.y }
  }

  let component = amotify.inmemory[ baseComponentId! ];
  let callback: TimeGantt.Effect.Drag.Callback = component.onDragEffect;

  let pendingResult = await Pending( {
    type: Type,
    x: cursor.x,
    y: cursor.y,
    time: 400
  } );

  if ( !pendingResult ) {
    OpenVisitDetailsModal( {
      uuid: 'R8YWV2VDGUHYQOPZE6H76BU928WVGSJAMM6C1MGYQHFRD0QR',
    } );
    return;
  }

  $( 'html' ).addClass( style.Grabbing );
  $( '#Table-' + baseComponentId ).addClass( [ style.Editable,style.DragEffect ] );

  $( event.target ).parent( '.' + style.GanttCell )
    .addClass( [ style.ActiveOrigin,style.Drag ] )
    .callback( ( Cell ) => {
      let OriginRect = Cell.position();
      eventInfo.origin = {
        x: OriginRect.x,
        y: OriginRect.y
      }
      {
        let clone = Cell[ 0 ].cloneNode( true ) as HTMLElement;
        clone.id = 'DraggerCell-' + eventInfo.dragId;

        $( clone ).addClass( [ style.Dragger,style.FadeOut ] ).css( {
          position: 'fixed',
          zIndex: 1000,
          top: eventInfo.origin.y,
          left: eventInfo.origin.x
        } );

        $( 'body' ).append( clone ).await( 10 ).callback( () => {
          $( clone )
            .removeClass( style.FadeOut )
            .addClass( style.Active )
        } );
      }

      let EventTarget = Type == 'mouse' ? $( window ) : Cell;

      EventTarget.addEvent( {
        eventId: 'GanttCellDragMove',
        eventType: Type == 'mouse' ? 'mousemove' : 'touchmove',
        option: { passive: false },
        callback: ( event ) => {
          event.preventDefault();
          let cursor = $.getCursor( event );

          $( '#DraggerCell-' + eventInfo.dragId ).css( {
            top: eventInfo.origin.y + ( cursor.y - eventInfo.def.y ),
            left: eventInfo.origin.x + ( cursor.x - eventInfo.def.x )
          } );

          callback( {
            componentId: componentId!,
            cur: cursor,
            def: eventInfo.def,
            status: 'move'
          } );
        }
      } ).addEvent( {
        eventId: 'GanttCellDragEnd',
        eventType: Type == 'mouse' ? 'mouseup' : 'touchend',
        callback: ( event ) => {
          callback( {
            componentId: componentId!,
            cur: $.getCursor( event ),
            def: eventInfo.def,
            status: 'end'
          } );

          $( '#DraggerCell-' + eventInfo.dragId )
            .addClass( style.FadeOut )
            .removeClass( style.Active )
            .await( 300 ).remove();

          $( 'html' ).removeClass( style.Grabbing );
          $( '#Table-' + baseComponentId ).removeClass( [ style.Editable,style.DragEffect ] );
          $( '.' + style.GanttCell ).removeClass( style.ActiveOrigin );
          EventTarget.removeEvent( [ 'GanttCellDragMove','GanttCellDragEnd' ] );

          clearInterval( amotify.inmemory[ eventInfo.baseComponentId ].autoScroll );
        }
      } );
    } );
}

window.addEventListener( 'mousedown',( event ) => {

} );

let Window = $( window );
Window.addEvent( {
  eventId: 'TimeGanttMouseDown',
  eventType: 'mousedown',
  option: { passive: false },
  callback: ( event: MouseEvent ) => {
    let target = event.target as HTMLElement;
    if ( target?.closest( '.' + style.Addable ) ) {
      AddModalEffect( event );
    } else if ( target?.closest( '.' + style.ForEventClassStretch ) ) {
      StretchEffect( event )
    } else if ( target?.closest( '.' + style.ForEventClassDrag ) ) {
      DragEffect( event );
    }
  }
} );

if ( amotify.config.device.isTouchDevice ) {
  Window.addEvent( {
    eventId: 'TimeGanttTouchStart',
    eventType: 'touchstart',
    option: { passive: false },
    callback: ( event ) => {
      let { target } = event;
      if ( target?.closest( '.' + style.Addable ) ) {
        AddModalEffect( event );
      } else if ( target?.closest( '.' + style.ForEventClassStretch ) ) {
        StretchEffect( event )
      } else if ( target?.closest( '.' + style.ForEventClassDrag ) ) {
        DragEffect( event );
      }
    }
  } );
}