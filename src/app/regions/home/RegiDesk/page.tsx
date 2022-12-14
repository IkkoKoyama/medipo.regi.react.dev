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
    Table
  }
} = AMOT;


const NearVisitor: FNC<{}> = () => {
  let List = [];
  for ( let i = 0; i < 3; i++ ) {
    List.push(
      <Flex
        vertical='center'
        horizontal='between'
        gap={ 1 }
        padding={ [ '1/3',0 ] }
        borderBottom='normal'
      >
        <Box>
          患者　太郎
        </Box>
        <Box>
          15 : 00~
        </Box>
        <Button.Clear
          size="S"
        >
          受付
        </Button.Clear>
      </Flex>
    );
  }
  return (
    <Flex
      type="col"
    >
      { List }
    </Flex>
  );
}

const TopRegion: FNC<{}> = () => {
  return (
    <Flex
      wrap={ false }
      gap={ 1 }
    >
      <Box
        border="normal"
        borderRadius={ 'LBMain' }
        backgroundColor={ 2 }
        flexGrid={ 4 }
        padding={ 1 }
      >
        <Box ssSubTitle>
          来店受付
        </Box>
        <Flex
          gap={ 1 }
          padding={ [ 1,0 ] }
        >
          <Input.Time.Clock
            label='来店時間'
            value={ new Date().hm( '-' ) }
          />
          <Input.Select
            label='受付担当'
            value={ 1 }
            list={ [
              {
                value: 1,
                label: 'スタッフA'
              },{
                value: 2,
                label: 'スタッフB'
              },
            ] }
          />
          <Input.Search
            label='顧客'
            list={ [
              {
                value: 0,
                label: '未指定'
              },{
                value: 1,
                label: '顧客A'
              },{
                value: 2,
                label: '顧客B'
              },
            ] }
          />
        </Flex>
        <Flex
          horizontal='right'
        >
          <Button.Prime>
            来店受付
          </Button.Prime>
        </Flex>
      </Box>
      <Box
        padding={ 1 }
        flexGrid={ 3 }
      >
        <Box ssSubTitle>
          もうすぐ来店予定
        </Box>
        <NearVisitor />
      </Box>
    </Flex>
  );
}

const VisitorList: FNC<{}> = () => {

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
          来店者一覧
        </Box>
        <Box flexCenter>
          <Switchs
            appearance='cloud'
            name='SwitchList1'
            value={ 0 }
            list={ [
              {
                value: 0,label: <>
                  <Icon d="fal clock" /> 予約
                </>
              },{
                value: 1,label: <>
                  <Icon d="fal clipboard-check" /> 来店済
                </>
              },{
                value: 2,label: <>
                  <Icon d="fal hands-holding-heart" /> 施術中
                </>
              },{
                value: 3,label: <>
                  <Icon d="fal cash-register" /> 会計済
                </>
              }
            ] }
            onChange={ ( { value,componentId } ) => {
            } }
          />
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

export const RegiDeskPage: FNC<{}> = () => {
  let [ val_events,set_events ] = useState( [] );

  return (
    <LayoutContent
      size='MAX'
      styles={ {
        margin: [ 0,'auto' ],
        padding: [ 4,1 ],
        phoneStyles: {
          padding: 1
        }
      } }
    >
      <Flex
        type='col'
        gap={ 2 }
        phoneStyles={ {
          gap: 0
        } }
      >
        <TopRegion />
        <VisitorList />
      </Flex>
    </LayoutContent>
  );
}