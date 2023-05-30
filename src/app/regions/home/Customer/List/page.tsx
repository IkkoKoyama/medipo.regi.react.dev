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
    Flex,
    Img
  },
  mols: {
    Accordion
  },
  fn: {
    Input,
    Buttons,
    Layout,
    Table,
    Modal
  }
} = amotify;

import {
  ParaTitle
} from '@appComps/ParaTitle';

type DefParams = {
  id: number
  uuid: string
  kana: string
  name: string
  gender: number
  tel1: string
  customId: string

  lastVisitDate: string,
  totalVisitCount: number
}

const Components = {
  Header: () => {
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
          borderRadius='2.tone.secondary'
          padding={ [ '1/2',1 ] }
        >
          <FontAwesomeIcon
            d='id-card-clip'
            fontColor={ 'theme' }
            fontSize='6.title'
          />
          顧客台帳
        </Flex>
        <Buttons.Anchor.Prime
          href='/customer/create'
        >
          顧客登録 <FontAwesomeIcon
            iconStyle='solid'
            d="plus"
          />
        </Buttons.Anchor.Prime>
      </Flex>
    );
  },
  Filter: ( params: {
    getList: Function
  } ) => {
    useEffect( () => {
      params.getList();
    },[] );

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
            <Input.Wrapper.Normal label='キーワード'>
              <Input.Text.Normal
                placeholder="名前・ID・電話番号"
              />
            </Input.Wrapper.Normal>
            <Input.Wrapper.Normal label='前回来店月'>
              <Input.Time.Month />
            </Input.Wrapper.Normal>
          </Flex>
          <Box>
            <Buttons.Button.Border
              size='S'
              onClick={ () => {
                Accordion.fn.toggle( accordionId );
              } }
            >
              <FontAwesomeIcon d="chevron-down" /> 詳細
            </Buttons.Button.Border>
          </Box>
          <Accordion
            accordionId={ accordionId }
          >
            <Flex
              flexType="col"
              gap={ 1 }
              padding={ 1 }
              fontSize={ '1.mini' }
              ssCardBox
            >
              <ParaTitle children='基本情報' />
              <Flex
                gap={ 1 }
                verticalAlign='bottom'
              >
                <Box flexNewLine>
                  <Input.Checker
                    label='他店舗の顧客も表示する'
                  />
                </Box>
                <Flex
                  gap={ 1 }
                  verticalAlign='bottom'
                  flexWrap={ false }
                  freeCSS={ {
                    maxWidth: 12 * 12
                  } }
                >
                  <Input.Wrapper.Normal
                    label='年齢'
                  >
                    <Input.Text.Number
                      placeholder='歳'
                      _width={ 4 }
                    />
                  </Input.Wrapper.Normal>
                  <Box
                    padding={ [ '3/4',0 ] }
                    children='~'
                  />
                  <Input.Text.Number
                    placeholder='歳'
                    _width={ 4 }
                  />
                </Flex>

                <Input.Wrapper.Normal
                  label='性別'
                >
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
              <Flex
                gap={ 1 }
                verticalAlign='bottom'
              >
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
            onClick={ () => {
              params.getList();
            } }
            ssMiniLoader={ { color: 'white' } }
          >
            <FontAwesomeIcon d="search" />
            検索する
          </Buttons.Button.Prime>
        </Box>
      </Flex>
    );
  },
  Body: ( params: {
    val_list: DefParams[]
  } ) => {
    let DataData: amotify.fn.Tables.Data.BodyRowParams[] = [];
    for ( let li of params.val_list ) {
      let {
        id,
        uuid,
        customId,
        name,
        kana,
        tel1,
        gender,
        lastVisitDate,
        totalVisitCount
      } = li;

      let Row: amotify.fn.Tables.Data.BodyRowParams = [
        {
          type: 'th',
          data: customId || '--'
        },{
          type: 'td',
          data: name || '--'
        },{
          type: 'td',
          data: kana
        },{
          type: 'td',
          data: appEnv.genderName( gender )
        },{
          type: 'td',
          data: $.formatCharacter.tel.mobile( tel1 )
        },{
          type: 'td',
          data: totalVisitCount.toLocaleString() + '回'
        },{
          type: 'td',
          data: lastVisitDate || '--'
        },{
          type: 'td',
          data: '',
          ...Table.Attachment.RightIndicator
        }
      ];
      Row.rowId = uuid;
      DataData.push( Row );
    }

    return (
      <Table.Data
        ssCardBox
        colLength={ 8 }
        tone='rowBorder'
        head={ [
          { data: '顧客ID' },
          { data: '名前' },
          { data: 'かな' },
          { data: '性別' },
          { data: '電話番号' },
          { data: '来店回数' },
          { data: '前回来店日' },
          { data: '' },
        ] }
        cellStyleCallback={ ( args ) => {
          let Styles: amotifyUniStyleParams = {}
          if ( args.type == 'head' ) {
            Styles.positionTop = 'topBase';
          }

          return Styles;
        } }
        rows={ DataData }
        onRowClick={ ( rowId ) => {
          $.pagePush( '/customer/obj?id=' + rowId );
        } }
        options={ {
          sizeFixed: false,
          order: [ true,true,true,true,true,true,false ],
          defaultOrder: [ 2,'ASC' ],
          defaultRowLength: 100
        } }
      />
    );
  }
}

export const CustomerList: FNC<{}> = () => {
  let [ val_list,set_list ] = useState( [] as DefParams[] );

  const getList = () => {
    $.fetch.post( {
      key: 'ListCustomer',
      url: '/customer/list'
    },( result ) => {
      if ( !result.ok ) return;
      set_list( result.body.list );
    } );
  }

  return (
    <>
      {/* <Img
        src={ Env.CDN.dev + '35000/' + Env.app.alias + '/image/banner.png' }
        position='absolute'
        _width={ '100%' }
        opacity='high'
        _height='auto'
        freeCSS={ {
          filter: 'brightness(60%)',
          zIndex: 1,
          maxHeight: 12 * 18
        } }
      /> */}
      <Layout.Plate
        size='L'
        padding={ 3 }
        position='relative'
        freeCSS={ {
          zIndex: 2
        } }
        UnderBreakPointStyles={ {
          padding: 1
        } }
      >
        <Flex
          flexType="col"
          gap={ 3 }
        >
          <Components.Header />
          <Components.Filter getList={ getList } />
          <Components.Body val_list={ val_list } />
        </Flex>
      </Layout.Plate>
    </>
  );
}