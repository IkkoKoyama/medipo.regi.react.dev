export { }

const {
  glob: {
    React: {
      useEffect,
      useState
    }
  },
  atoms: {
    Box,
    FontAwesomeIcon,
    Flex
  },
  mols: {
    Accordion,
    List
  },
  fn: {
    Input,
    Buttons,
    Layout,
    Table,
    Modal
  },
  minifyComponent: {
    logos: {
      LINEIcon
    }
  }
} = amotify;

import {
  ParaTitle
} from '@appComps/ParaTitle';

const Title: FNC<{}> = () => {
  return (
    <Flex
      horizontalAlign='between'
      verticalAlign='center'
      gap={ 2 }
    >
      <Flex
        fontSize='5.subTitle'
        gap={ 1 }
        verticalAlign='baseline'
      >
        <FontAwesomeIcon
          d='clock-rotate-left'
          fontColor={ 'theme' }
          fontSize='6.title'
        />
        取引履歴
      </Flex>
    </Flex>
  );
}

const Settings: FNC<{}> = () => {
  let accordionId = $.uuidGen();
  return (
    <Flex
      ssCardBox
      padding={ 2 }
      flexWrap={ false }
      verticalAlign='bottom'
      gap={ 2 }
      UnderBreakPointStyles={ {
        padding: 1,
        flexType: 'col',
        flexWrap: true
      } }
    >
      <Flex
        flexSizing={ 'auto' }
        gap={ 1 }
        flexType='col'
      >
        <Flex gap={ 1 }>
          <Input.Wrapper.Normal label='期間'>
            <Input.Time.Periods.Date />
          </Input.Wrapper.Normal>
          <Input.Wrapper.Normal label='最終ステータス'>
            <Input.Select
              list={ [
                {
                  value: 200,
                  label: '会計済'
                },{
                  value: 400,
                  label: '来店後キャンセル'
                },{
                  value: 401,
                  label: '連絡キャンセル'
                },{
                  value: 402,
                  label: '無断キャンセル'
                }
              ] }
            />
          </Input.Wrapper.Normal>
        </Flex>
        <Box>
          <Buttons.Button.Border
            borderRadius={ 'sphere' }
            size='XS'
            onClick={ () => {
              Accordion.fn.toggle( accordionId );
            } }
          >
            <FontAwesomeIcon d="chevron-down" /> 詳細
          </Buttons.Button.Border>
        </Box>
        <Accordion
          accordionId={ accordionId }
          open={ false }
          ssCardBox
          padding={ 1 }
          fontSize={ '1.mini' }
          overflow='auto'
          style={ {
            maxHeight: 12 * 30
          } }
        >
          <Flex
            flexType='col'
            gap={ 1 }
          >
            <ParaTitle children='基本情報' />
            <Flex gap={ 1 } verticalAlign='bottom'>
              <Box flexNewLine>
                <Input.List.Checkbox.Icon
                  list={ [
                    {
                      value: 1,
                      label: '他店舗の顧客も表示する'
                    }
                  ] }
                />
              </Box>
              <Flex
                gap={ '1/2' }
                verticalAlign='bottom'
                flexWrap={ false }
                freeCSS={ {
                  maxWidth: 12 * 12
                } }
              >
                <Input.Wrapper.Normal label='年齢'>
                  <Input.Text.Number
                    placeholder='歳'
                  />
                </Input.Wrapper.Normal>
                <Box
                  padding={ [ '3/4',0 ] }
                  children='~'
                />
                <Input.Text.Number
                  placeholder='歳'
                />
              </Flex>
              <Input.Wrapper.Normal label='性別'>
                <Input.List.Checkbox.Border
                  value={ [ 1,2 ] }
                  list={ [
                    {
                      value: 1,
                      label: '男性'
                    },{
                      value: 2,
                      label: '女性'
                    },{
                      value: 3,
                      label: '未設定'
                    }
                  ] }
                />
              </Input.Wrapper.Normal>
            </Flex>
            <ParaTitle children='実績' />
            <Flex gap={ 1 } verticalAlign='bottom'>
              <Input.Wrapper.Normal label='来店回数'>
                <Input.Select
                  list={ [
                    { value: 1,label: '1回以内' },
                    { value: 2,label: '2回以内' },
                    { value: 3,label: '3回以内' },
                    { value: 4,label: '4回以内' },
                    { value: 5,label: '5回以内' },
                    { value: 6,label: '6回以内' },
                    { value: 7,label: '7回以内' },
                    { value: 8,label: '8回以内' },
                    { value: 9,label: '9回以内' },
                    { value: 10,label: '10回以上' }
                  ] }
                />
              </Input.Wrapper.Normal>
            </Flex>
          </Flex>
        </Accordion>
      </Flex>
      <Box>
        <Buttons.Button.Prime
          freeCSS={ {
            whiteSpace: 'nowrap'
          } }
        >
          <FontAwesomeIcon d="search" />
          検索する
        </Buttons.Button.Prime>
      </Box>
    </Flex>
  );
}

const CustomersLdger: FNC<{}> = () => {
  let DataData: amotify.fn.Tables.Data.BodyRowParams[] = [];
  for ( var i = 0; i < 100; i++ ) {
    let Row: amotify.fn.Tables.Data.BodyRowParams = [
      {
        type: 'td',
        data: 'John' + ( i + 1 )
      },{
        type: 'td',
        data: [ '男性','女性' ][ Math.round( Math.random() ) ]
      },{
        type: 'td',
        data: '¥' + ( 12000 ).toLocaleString()
      },{
        type: 'td',
        data: '3商品'
      },{
        type: 'td',
        data: '10回'
      },{
        type: 'td',
        data: '会計済',
        children: <Box
          flexCenter
        >
          <Box
            backgroundColor={ 'posi' }
            fontColor='white'
            borderRadius={ 'sphere' }
            padding={ [ '1/4',1 ] }
          >
            会計済
          </Box>
        </Box>
      },{
        type: 'td',
        data: '',
        children: <FontAwesomeIcon
          d="chevron-right"
          fontColor={ 'theme' }
        />,
      }
    ]
    DataData.push( Row );
  }

  return (
    <Table.Data
      ssCardBox
      colLength={ 7 }
      tone='rowBorder'
      cellStyleCallback={ ( args ) => {
        let Styles: amotifyUniStyleParams = {}
        if ( args.type == 'head' ) {
          Styles.positionTop = 'topBase';
        }

        return Styles;
      } }
      head={ [
        { data: '氏名' },
        { data: '性別' },
        { data: '合計金額' },
        { data: '商品数' },
        { data: '来店回数' },
        { data: '種別' },
        { data: '' },
      ] }
      rows={ DataData }
      onRowClick={ () => {
        OpenVisitDetailsModal( {
          uuid: 'R8YWV2VDGUHYQOPZE6H76BU928WVGSJAMM6C1MGYQHFRD0QR',
        } );
      } }
      options={ {
        sizeFixed: false,
        order: [ true,true,true,true,true,false ],
        defaultOrder: [ 1,'ASC' ],
        defaultRowLength: 100
      } }
    />
  );
}


export const OpenVisitDetailsModal = ( params: {
  uuid: string
} ) => {

}

export const VisitHistory: FNC<{}> = () => {
  // useEffect( () => {
  //   let id = 'R8YWV2VDGUHYQOPZE6H76BU928WVGSJAMM6C1MGYQHFRD0QR'
  //   // OpenVisitDetailsModal( {
  //   //   tradeUuid: id
  //   // } );
  // },[] );

  return (
    <Layout.Plate
      size='L'
      padding={ 3 }
      UnderBreakPointStyles={ {
        padding: 1
      } }
    >
      <Flex
        flexType='col'
        gap={ 3 }
      >
        <Title />
        <Settings />
        <CustomersLdger />
      </Flex>
    </Layout.Plate>
  );
}