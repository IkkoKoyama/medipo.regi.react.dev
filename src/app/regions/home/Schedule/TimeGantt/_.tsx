const {
  glob: {
    React: {
      useEffect,
      useState
    }
  },
  atoms: {
    Box,
    Grid,
    Flex,
    Img
  },
  fn: {
    Buttons,
    Table
  }
} = amotify;

import style from './style.module.scss';


export const methods = {
  timeToMinutes: ( time: number ) => {
    let hour = Math.floor( time / 100 );
    let minutes = time - hour * 100;

    return hour * 60 + minutes;
  },
  minutesToTime: ( data: number ) => {
    let hour = Math.floor( data / 60 );
    let minutes = data % 60;
    return hour * 100 + minutes;
  },
  ToFloorMinutes: ( minutes: number,unit: number ) => {
    return Math.floor( minutes / unit ) * unit;
  },
  ToCeilMinutes: ( minutes: number,unit: number ) => {
    return Math.ceil( minutes / unit ) * unit;
  }
}


import { HeadRow } from './HeadRow';
import { BodyRows } from './BodyRows';
import { CurrentSign } from './CurrentSign';
import { ActiveIndicator } from './ActiveIndicator'

let rawData: any = {
  unit: 20,
  range: [
    800,
    2800
  ],
  restRange: [
    1100,
    1200
  ],
  segments: [
    {
      id: 1,label: <Box
        padding={ 1 }
        textAlign='center'
      >
        <Img
          src={ Env.CDN.dev + '35000/' + Env.app.alias + '/image/profile1.jpg' }
          _width={ 4 } _height={ 4 }
          borderRadius='sphere'
          marginBottom={ 1 }
        />
        <Box
          fontSize={ '3.paragraph' }
          fontColor={ '4.thin' }
        >
          Samuel Paul
        </Box>
      </Box>
    },
    {
      id: 2,label: <Box
        padding={ 1 }
        textAlign='center'
      >
        <Img
          src={ Env.CDN.dev + '35000/' + Env.app.alias + '/image/profile2.jpg' }
          _width={ 4 } _height={ 4 }
          borderRadius='sphere'
          marginBottom={ 1 }
        />
        <Box
          fontSize={ '3.paragraph' }
          fontColor={ '4.thin' }
        >
          Leta Lestrange
        </Box>
      </Box>
    },
    {
      id: 3,label: <Box
        padding={ 1 }
        textAlign='center'
      >
        <Img
          src={ Env.CDN.dev + '35000/' + Env.app.alias + '/image/profile3.jpg' }
          _width={ 4 } _height={ 4 }
          borderRadius='sphere'
          marginBottom={ 1 }
        />
        <Box
          fontSize={ '3.paragraph' }
          fontColor={ '4.thin' }
        >
          Neville Long Bottom
        </Box>
      </Box>
    }
    // { id: 5,label: <Box padding={ 1 } >StaffE</Box> },
    // { id: 6,label: <Box padding={ 1 } >StaffF</Box> },
    // { id: 7,label: <Box padding={ 1 } >StaffG</Box> },
  ],
  cells: [
    {
      segmentId: 1,
      range: [ 820,1000 ],
      label: 'theme'
    },{
      segmentId: 1,
      range: [ 840,940 ],
      label: 'posi'
    },{
      segmentId: 1,
      range: [ 840,1020 ],
      label: 'nega'
    },{
      segmentId: 1,
      range: [ 920,1020 ],
      label: 'dark'
    },{
      segmentId: 1,
      range: [ 940,1040 ],
      label: 'warn'
    },{
      segmentId: 1,
      range: [ 1200,1340 ]
    },{
      segmentId: 2,
      range: [ 820,940 ]
    },{
      segmentId: 2,
      range: [ 900,1000 ]
    },{
      segmentId: 2,
      range: [ 940,1040 ]
    },{
      segmentId: 3,
      range: [ 820,1100 ],
      label: 'posi'
    },{
      segmentId: 3,
      range: [ 1200,1400 ],
      label: 'warn'
    },{
      segmentId: 2,
      range: [ 1200,1400 ],
      label: 'warn'
    }
  ]
}

export const TimeGantt: FNC<TimeGantt.Params> = ( params ) => {
  let {
    ...others
  } = params;

  let [ val_params,set_params ] = useState( rawData );

  useEffect( () => {
    setTimeout( () => {
      // set_params( {
      //   // unit: 15,
      //   unit: 30,
      //   range: [
      //     800,
      //     2100
      //   ],
      //   restRange: [
      //     1100,
      //     1200
      //   ],
      //   segments: [
      //     { id: 1,label: <Box padding={ 1 } >StaffA</Box> },
      //     { id: 2,label: <Box padding={ 1 } >StaffB</Box> },
      //     { id: 3,label: <Box padding={ 1 } >StaffC</Box> },
      //     { id: 4,label: <Box padding={ 1 } >StaffD</Box> },
      //     // { id: 5,label: <Box padding={ 1 } >StaffE</Box> },
      //     // { id: 6,label: <Box padding={ 1 } >StaffF</Box> },
      //     // { id: 7,label: <Box padding={ 1 } >StaffG</Box> },
      //   ],
      //   cells: [
      //     {
      //       segmentId: 1,
      //       range: [ 900,1000 ],
      //       label: 'theme'
      //     },{
      //       segmentId: 1,
      //       range: [ 840,940 ],
      //       label: 'nega'
      //     },{
      //       segmentId: 1,
      //       range: [ 800,1000 ],
      //       label: 'posi'
      //     },{
      //       segmentId: 1,
      //       range: [ 920,1000 ],
      //       label: 'dark'
      //     },{
      //       segmentId: 1,
      //       range: [ 940,1040 ],
      //       label: 'warn'
      //     },{
      //       segmentId: 1,
      //       range: [ 820,920 ]
      //     },{
      //       segmentId: 3,
      //       range: [ 900,945 ]
      //     },{
      //       segmentId: 2,
      //       range: [ 2000,2030 ]
      //     }
      //   ]
      // } );
    },1000 );
  },[] );

  let {
    unit
  } = val_params;
  let status: TimeGantt.StatusParams = {
    componentId: $.uuidGen( 16 ),
    segmentType: 'スタッフ',
    segments: val_params.segments,
    unit: val_params.unit,
    unitPerHour: 60 / val_params.unit,

    openAt: 0,
    closeAt: 0,
    from: 0,
    to: 0,

    colLength: 0,
    cells: [],
    unitsInfo: []
  }
  {
    {
      let [ startAt,endAt ] = val_params.range;

      let from = methods.timeToMinutes( startAt );
      status.openAt = from;
      status.from = methods.ToFloorMinutes( from,unit );

      let to = methods.timeToMinutes( endAt );
      status.closeAt = to;
      status.to = methods.ToCeilMinutes( to + unit * 2,unit );
    }
    if ( val_params?.restRange ) {
      let [ startAt,endAt ] = val_params.restRange;

      let from = methods.timeToMinutes( startAt );
      status.restFrom = methods.ToFloorMinutes( from,unit );

      let to = methods.timeToMinutes( endAt );
      status.restTo = methods.ToCeilMinutes( to,unit );
    }
  }
  let Cells: TimeGantt.CellObjectParams[] = [];
  val_params.cells.forEach( ( cell: any ) => {
    let {
      segmentId,
      range,
      label = 'theme'
    } = cell;

    let [ from,to ] = range;
    if ( from >= to ) return;

    Cells.push( {
      componentId: $.uuidGen( 16 ),
      color: label,
      segmentId,
      from: methods.ToFloorMinutes( methods.timeToMinutes( from ),status.unit ),
      to: methods.ToCeilMinutes( methods.timeToMinutes( to ),status.unit )
    } );
  } );
  status.cells = Cells;
  status.colLength = ( status.to - status.from ) / status.unit;

  let unitsInfo: TimeGantt.UnitInfoParams[] = [];
  for ( let index = 0; index < status.colLength; index++ ) {
    let time = status.from + index * status.unit;
    let unitInfo: TimeGantt.UnitInfoParams = {
      time: time,
      outCell: false,
      stem: false
    }

    if ( unitInfo.time < status.openAt || status.closeAt <= unitInfo.time ) {
      unitInfo.outCell = true;
    }
    if ( status.restFrom && status.restTo ) {
      if ( status.restFrom <= unitInfo.time && unitInfo.time < status.restTo ) {
        unitInfo.outCell = true;
      }
    }

    if ( ( unitInfo.time + status.unit ) % 60 == 0 ) {
      unitInfo.stem = true;
    }
    unitsInfo.push( unitInfo );
  }
  status.unitsInfo = unitsInfo;

  let CellSize = status.unitPerHour >= 10 ? 'S' : status.unitPerHour >= 3 ? 'R' : 'L';
  let ClassNames = [
    style.Table,
    style[ 'CellSize_' + CellSize ]
  ];

  return (
    <Box
      position='relative'
      { ...others }
      overflow='auto'
      freeCSS={ {
        zIndex: 1,
        ...others.freeCSS,
        minHeight: 12 * 30
      } }
      id={ 'Wrapper-' + status.componentId }
    >
      <CurrentSign status={ status } />
      <ActiveIndicator
        componentId={ status.componentId }
        unit={ status.unit }
      />

      <Table.Attachment.Table
        textAlign='left'
        position='relative'
        _width={ '100%' }
        minHeight='100%'
        className={ ClassNames.join( ' ' ) }
        id={ 'Table-' + status.componentId }
      >
        <HeadRow status={ status } />
        <BodyRows status={ status } />

      </Table.Attachment.Table>
    </Box>
  );
}