const {
  glob: {
    React: {
      useEffect,
    }
  },
  atoms: {
    Box,
  }
} = amotify;

import { methods } from './_';

import style from './style.module.scss';


export const CurrentSign: FNC<{
  status: TimeGantt.StatusParams
}> = ( params ) => {
  let {
    componentId,
    unitsInfo,
    unit,
  } = params.status;

  let Positioner = () => {
    // let now = new Date();
    let now = $.Time( '2023/01/15 10:20' );

    setTimeout( () => {
      Positioner();
    },1000 * ( 60 - now.seconds ) );

    let Sign = $( '#CurrentSign-' + componentId );
    if ( !Sign[ 0 ] ) return;

    let current = now.toFormatHM();

    let time = Number( now.toOrder( [ 'hours','minutes' ] ).join( '' ) );
    let minutes = methods.timeToMinutes( time );

    let roundMinutes = methods.ToFloorMinutes( minutes,unit );
    let UnitInfo = unitsInfo.find( ( unitInfo ) => unitInfo.time == roundMinutes );
    if ( !UnitInfo ) return;

    let CellRect = $( '#TimeCell-' + componentId + '-' + UnitInfo.time ).position();
    let decimalRate = ( minutes % unit ) / unit;

    let Base = $( '#Wrapper-' + componentId );
    let BaseRect = Base.position();
    let Left = CellRect.left - BaseRect.left;

    Left += Base[ 0 ].scrollLeft;
    Left += CellRect.width * decimalRate;
    Left -= 0.5;

    Sign.css( {
      left: Left
    } );
  }
  const Scroller = () => {
    // let now = new Date().trimString( [ 'hours','minutes' ] );
    let now: any = new Date( '2023/01/15 10:30' );
    now = now.trimString( [ 'hours','minutes' ] );

    let time = Number( now.join( '' ) );
    let minutes = methods.timeToMinutes( time );
    let roundMinutes = methods.ToFloorMinutes( minutes,unit ) - unit;
    let UnitInfo = unitsInfo.find( ( unitInfo ) => unitInfo.time == roundMinutes );
    if ( !UnitInfo ) return;
    let CellRect = $( '#TimeCell-' + componentId + '-' + UnitInfo.time ).position();
    let Base = $( '#Wrapper-' + componentId );
    let BaseRect = Base.position();

    Base[ 0 ].scrollLeft = CellRect.left - BaseRect.left - 12 * 16;
  }
  useEffect( () => {
    Positioner();
    // Scroller();
  },[] );

  return (
    <Box
      className={ style.CurrentSign }
      position='sticky'
      _height={ 0 }
      freeCSS={ {
        top: 12 * 1.5
      } }
    >
      <Box
        id={ 'CurrentSign-' + componentId }
        position='absolute'
        positionLeft={ 0 }
        flexCenter
        transition='middle'
        freeCSS={ {
          pointerEvents: 'none'
        } }
      >
        <Box
          className={ style.Ball }
          _width={ 1 }
          _height={ 1 }
          backgroundColor='nega'
          borderRadius={ 'sphere' }
          position='absolute'
          boxShadow={ 1 }
        />
        <Box
          className={ style.Pole }
          position='absolute'
          positionTop={ 0 }
          _height={ 2 }
          _width={ '1/12' }
          boxShadow={ 2 }
          backgroundColor='nega'
        />
      </Box>
    </Box>
  );
}