const {
  glob: {
    React: {
      useEffect,
      useState
    },
    useStore,
  },
  atoms: {
    Box,
  },
  fn: {
    Table: {
      Attachment
    }
  }
} = amotify;

import style from './style.module.scss';

export const ActiveIndicator: FNC<{
  componentId: string
  unit: number
}> = ( params ) => {
  let {
    componentId,
    unit
  } = params;

  let [ val_show,set_show ] = useState( false );
  let [ val_info,set_info ] = useState( {
    left: 0,
    width: 0
  } );

  useEffect( () => {
    useStore( {
      insertId: 'ActiveIndicator-' + params.componentId,
      data: {
        fadeIn: ( from: number,to: number ) => {
          let fromCellRect = $( '#TimeCell-' + componentId + '-' + from ).position();
          let toCellRect = $( '#TimeCell-' + componentId + '-' + ( to - unit ) ).position();

          let Base = $( '#Table-' + componentId );
          let BaseRect = Base.position();
          let Left = fromCellRect.left - BaseRect.left;
          let Width = toCellRect.right - fromCellRect.left;

          set_show( true );
          set_info( {
            left: Left,
            width: Width
          } );
        },
        fadeOut: () => {
          set_show( false );
        }
      }
    } );
  },[] );

  return (
    <Box
      className={ style.ActiveIndicator }
      // left={ 0 }
      position='sticky'
      _height={ 0 }
      positionTop={ 0 }
      freeCSS={ {
        // top: 12 * 3
      } }
    >
      <Box
        id={ 'ActiveIndicator-' + params.componentId }
        transition='short'
        position='relative'
        backgroundColor={ 'theme' }
        _height={ '1/3' }
        borderRadius='sphere'
        // borderBottomLeftRadius={ 0 }
        // borderBottomRightRadius={ 0 }
        freeCSS={ {
          // left: 240,
          // width: 240
          left: val_info.left,
          width: val_info.width,
          opacity: Number( !!val_show )
        } }
      />
    </Box>
  );
}