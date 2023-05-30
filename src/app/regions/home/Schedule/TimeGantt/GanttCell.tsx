const {
  glob: {
    React: {
      useState
    }
  },
  atoms: {
    Box,
    Flex,
    FontAwesomeIcon
  },
  fn: {
    Buttons
  }
} = amotify;

// import {
//   StretchEffect,
//   DragEffect
// } from './Effect';

import style from './style.module.scss';

export const GanttCell: FNC<TimeGantt.GanttCellParams> = ( params ) => {
  let {
    baseComponentId,
    componentId,
    onDrag,
    color,
    children,
    className,
    active = false,
    ...others
  } = params;

  let [ val_random ] = useState( Math.round( Math.random() * 4 + 1 ) );
  let ClassNames = [
    style.GanttCell,
    className,
    style[ 'JiggType_' + val_random ]
  ]

  if ( active ) ClassNames.push( style.ActiveOrigin );

  return (
    <Flex
      className={ ClassNames.join( ' ' ) }
      fontColor='white'
      transition='short'
      position='relative'
      flexWrap={ false }
      borderRadius='2.tone.secondary'
      boxShadow={ 1 }
      backgroundColor={ color }
      padding={ '1/6' }
      gap={ '1/6' }
      id={ 'GanttCell-' + componentId }
      { ...others }
      freeCSS={ {
        ...others.freeCSS
      } }
    >
      <Buttons.Button.Clear
        color='white'
        borderRadius='2.tone.secondary'
        flexCenter
        data-dir='left'
        data-base-component-id={ baseComponentId }
        componentId={ componentId }
        className={ [
          style.Expander,
          style.Left,
          style.ForEventClassStretch
        ].join( ' ' ) }
      >
        <FontAwesomeIcon d="grip-lines-vertical" />
      </Buttons.Button.Clear>
      <Flex
        backgroundColor={ 'lcOpLow' }
        padding={ [ '1/6','1/2' ] }
        borderRadius={ '2.tone.secondary' }
        flexSizing={ 0 }
        flexWrap={ false }
        ssTextEllipsis
        freeCSS={ {
          cursor: 'grab',
          userSelect: 'none'
        } }
        data-base-component-id={ baseComponentId }
        componentId={ componentId }
        className={ style.ForEventClassDrag }
      >
        <Box
          ssTextEllipsis
          flexSizing={ 0 }
          margin={ [ 'auto',0 ] }
        >
          { children }
        </Box>
        <Box flexCenter>
          <Buttons.Button.Clear
            flexSizing={ 'none' }
            color='cloud'
            padding={ 0 }
            borderRadius='sphere'
            freeCSS={ {
              width: 12 * 2,
              height: 12 * 2
            } }
            children={ <FontAwesomeIcon d="ellipsis-vertical" /> }
          />
        </Box>
      </Flex>
      <Buttons.Button.Clear
        color='white'
        borderRadius='2.tone.secondary'
        flexCenter
        data-dir='right'
        data-base-component-id={ baseComponentId }
        componentId={ componentId }
        className={ [
          style.Expander,
          style.Right,
          style.ForEventClassStretch
        ].join( ' ' ) }
      >
        <FontAwesomeIcon d="grip-lines-vertical" />
      </Buttons.Button.Clear>
    </Flex>
  );
}