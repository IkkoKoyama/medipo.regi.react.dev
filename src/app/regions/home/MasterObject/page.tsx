const {
  glob: {
    React,
    useEffect,
    useState
  },
  atoms: {
    Box,
    Flex,
    Input,
    Buttons: {
      Button,
      Anchor
    },
    Icon,
    Img,
    Span,
    Switchs
  },
  mols: {
    Accordion,
    List,
  },
  orgs: {
    LayoutContent,
    TabContent,
    Table
  }
} = AMOT;

const DashBoardList: FNC<{}> = () => {
  return (
    <Flex
      gap={ 2 }
      flexChilds='auto'
    >
      <Box
        padding={ 2 }
        ssCardBox
      >
        some Card Content some Card Content
      </Box>
      <Box
        padding={ 2 }
        ssCardBox
      >
        some Card Content some Card Content
      </Box>
      <Box
        padding={ 2 }
        ssCardBox
      >
        some Card Content some Card Content
      </Box>
      <Box
        padding={ 2 }
        ssCardBox
      >
        some Card Content some Card Content
      </Box>
      <Box
        padding={ 2 }
        ssCardBox
      >
        some Card Content some Card Content
      </Box>
    </Flex>
  );
}

const SampleList: FNC<{}> = () => {

  let DataData: Orgs.Tables.Data.RowProps[] = [];
  for ( var i = 0; i < 40; i++ ) {
    let random2 = Math.round( Math.random() * 20 + 10 );
    let random3 = Math.round( Math.random() * 50 + 1 ) * 100;

    let Data1 = 'john smith : ' + i;
    let Data2 = random2 + ':00';
    let Data3 = random3;
    let Row: Orgs.Tables.Data.RowProps = {
      columns: [
        {
          type: 'th',
          label: Data1,
          data: Data1,
          orderIndex: i
        },{
          type: 'td',
          label: Data2,
          data: Data2
        },{
          type: 'td',
          label: '¥' + Data3.toLocaleString(),
          data: Data3
        }
      ]
    }
    DataData.push( Row );
  }

  return (
    <>
      <Flex
        wrap={ false }
        gap={ 1 }
        horizontal='between'
      >
        <Box
          ssTitle
          textAligin="center"
        >
          Object Relative List
        </Box>
      </Flex>
      <Table.Data
        colLength={ 3 }
        head={ [
          { label: '名前',data: '名前' },
          { label: '来店時間',data: '来店時間' },
          { label: '合計額',data: '合計額' }
        ] }
        rows={ DataData }
      />
    </>
  );
}

export const MasterObject: FNC<{}> = () => {
  let [ val_events,set_events ] = useState( [] );

  return (
    <>
      <TabContent
        defaultTabIndex={ 0 }
        Swipeable={ true }
        tabBar={ {
          id: 'TopTab',
          justify: 'center',
          stickyWhenPhone: true,
          sticky: [
            '#TopHeader'
          ],
          freeSpace: <Flex
            padding={ 1 }
            gap={ 1 }
          >
            <Box
              width={ 8 }
              height={ 8 }
              borderRadius={ 4 }
              flexCenter={ true }
              backgroundColor={ 3 }
              fontSize={ 7 }
            >
              <Icon d='user' />
            </Box>
            <Box
              flex='auto'
            >
              <Box ssTitle >
                Object Name
              </Box>
              <Box ssSubTitle>
                Object sub Name
              </Box>
            </Box>
            <Box
              backgroundColor={ 4 }
              padding={ [ 1,2 ] }
              borderRadius={ 3 }
              flexCenter
            >
              freeSpace here
            </Box>
          </Flex>
        } }
        contents={ [
          {
            tab: <>
              <Icon
                fontSize={ 4 }
                marginRight={ '2/3' }
                d='fal desktop'
              /> 概要
            </>,
            body: <Box
              padding={ 2 }
            >
              <DashBoardList />
            </Box>
          },{
            tab: <>
              <Icon
                fontSize={ 4 }
                marginRight={ '2/3' }
                d='fal diagram-cells'
              /> リスト
            </>,
            body: <Box
              padding={ 2 }
            >
              <SampleList />
            </Box>
          },{
            tab: <>
              <Icon
                fontSize={ 4 }
                marginRight={ '2/3' }
                d='fal gear'
              /> 設定
            </>,
            body: <>
              {/* <Inputs /> */ }
            </>
          }
        ] }
      />
    </>
  );
}