const {
  glob: {
    React: {
      useState
    },
  },
  atoms: {
    Box,
    FontAwesomeIcon,
    Grid,
    Flex
  },
  fn: {
    Buttons,
    Input,
  }
} = amotify;

const TopConsole: FNC<{
  val_type: string
  set_type: React.Dispatch<React.SetStateAction<string>>
}> = ( params ) => {
  let {
    val_type,
    set_type
  } = params;

  return (
    <Flex
      borderBottom
      verticalAlign='bottom'
      horizontalAlign='between'
      padding={ 1 }
      fontSize={ '1.mini' }
      gap={ 1 }
      flexSizing='none'
      position='sticky'
      positionLeft={ 0 }
    >
      <Flex
        gap={ 1 }
        flexWrap={ false }
      >
        <Input.Wrapper.Normal label='Segment'>
          <Input.Select
            enableUnSelected={ false }
            value={ 0 }
            list={ [
              { value: 0,label: 'ALL' },
              { value: 1,label: 'StaffA' },
              { value: 2,label: 'StaffB' },
              { value: 3,label: 'StaffC' },
              { value: 4,label: 'StaffD' }
            ] }
          />
        </Input.Wrapper.Normal>
        <Input.Wrapper.Normal label='Label'>
          <Input.Select
            value={ 1 }
            enableUnSelected={ false }
            list={ [
              { value: 1,label: 'Sales' },
              { value: 2,label: 'Rank' },
              { value: 3,label: 'Gender' },
              { value: 4,label: 'Generation' }
            ] }
          />
        </Input.Wrapper.Normal>
      </Flex>
      <Flex
        gap={ 1 }
        verticalAlign='center'
      >
        <Buttons.Button.Border
          padding={ [ '3/4',1 ] }
        >
          Today
        </Buttons.Button.Border>
        <Flex>
          <Buttons.Button.Clear
            padding={ '3/4' }
          >
            <FontAwesomeIcon
              iconStyle='regular'
              d="chevron-left"
            />
          </Buttons.Button.Clear>
          <Buttons.Button.Clear
            padding={ '3/4' }
          >
            <FontAwesomeIcon
              iconStyle='regular'
              d="chevron-right"
            />
          </Buttons.Button.Clear>
        </Flex>

        { $.Time().toOrder( [ 'month','date' ] ).join( '/' ) }
        <Input.Segmented.Cloud
          backgroundColor='tcOpLow'
          value={ val_type }
          cellStyles={ {
            padding: [ 0,'3/4' ],
            fontColor: 'theme',
            freeCSS: {
              height: 12 * 2.5,
              // width: 12 * 2.5,
            }
          } }
          list={ [
            { value: 'day',label: <Box>Day</Box> },
            { value: 'week',label: <Box>Week</Box> },
            { value: 'month',label: <Box>Month</Box> },
          ] }
          onUpdateValidValue={ ( { value } ) => {
            set_type( value[ 0 ] );
          } }
        />
        <Input.Segmented.Cloud
          backgroundColor='tcOpLow'
          value={ 1 }
          cellStyles={ {
            padding: 0,
            fontColor: 'theme',
            freeCSS: {
              width: 12 * 2.5,
              height: 12 * 2.5
            }
          } }
          list={ [
            {
              value: 1,label: <FontAwesomeIcon
                iconStyle='regular'
                d="table-cells"
              />
            },{
              value: 2,label: <FontAwesomeIcon
                iconStyle='regular'
                d="bars"
              />
            }
          ] }
        />
      </Flex>
    </Flex>
  );
}

import { MonthCalendar } from './Calendar/parts';
import { TimeGantt } from './TimeGantt/_';

export const ScheduleDashboard: FNC<{}> = () => {
  let [ val_type,set_type ] = useState( 'day' );

  let Content = null;

  if ( val_type == 'day' ) {
    Content = <Box
      flexSizing={ 0 }
      _height='100%'
      overflow='auto'
      freeCSS={ {
        zIndex: 1
      } }
    >
      <TimeGantt
        flexSizing={ 0 }
        overflow='unset'
        _height='100%'
      />
    </Box>
  } else if ( val_type == 'month' ) {
    Content = <MonthCalendar />
  }

  return (
    <Flex
      flexType='col'
      _height={ 'contentHeight' }
      overflow='hidden'
    >
      <TopConsole
        val_type={ val_type }
        set_type={ set_type }
      />
      { Content }
    </Flex>
  );
}