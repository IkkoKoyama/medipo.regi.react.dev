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
    Span
  },
  mols: {
    Accordion,
    List
  },
  orgs: {
    LayoutContent,
    Table
  }
} = AMOT;


const TopRegion: FNC<{}> = () => {
  return (
    <Flex
      vertical="center"
      horizontal='between'
    >
      <Box ssSubTitle>
        〇〇オブジェクト
      </Box>
      <Button.Prime>
        新規作成
      </Button.Prime>
    </Flex>
  );
}
const ObjectList: FNC<{}> = () => {

  let DataData: Orgs.Tables.Data.RowProps[] = [];
  for ( var i = 0; i < 40; i++ ) {
    let random2 = Math.round( Math.random() * 20 + 10 );
    let random3 = Math.round( Math.random() * 50 + 1 ) * 100;

    let Data1 = 'product : ' + i;
    let Data2 = 'some description'
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
      <Table.Data
        colLength={ 3 }
        head={ [
          { label: 'Object',data: 'Object' },
          { label: 'description',data: 'description' },
          { label: 'price',data: 'price' }
        ] }
        rows={ DataData }
      />
    </>
  );
}


export const MasterList: FNC<{}> = () => {
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
        <ObjectList />
      </Flex>
    </LayoutContent>
  );
}