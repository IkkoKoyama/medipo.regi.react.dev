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
    Span,
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
    Modal,
    Loader
  }
} = amotify;

import {
  ParaTitle
} from '@appComps/ParaTitle';

type DefParams = {
  details: {
    id: number
    uuid: string
    name: string
    kana: string
    gender: number
    age: number
  }
}
type NestParams = {
  val_def: DefParams
  set_def: React.Dispatch<React.SetStateAction<DefParams>>
  val_index: number
  set_index: React.Dispatch<React.SetStateAction<number>>
}

const Components = {
  TopRegion: ( params: NestParams ) => {
    let {
      val_index,
      set_index,
      val_def
    } = params;

    let {
      name,
      kana
    } = val_def.details;

    return (
      <>
        <Flex
          backgroundColor={ '1.layer.base' }
          horizontalAlign='between'
        >
          <Flex
            flexWrap={ false }
            gap={ 2 }
            padding={ 2 }
            verticalAlign='center'
          >
            <Box
              _width={ 6 }
              _height={ 6 }
              borderRadius={ 4 }
              backgroundColor='3.layer.canvas'
              flexCenter
              fontSize={ '5.subTitle' }
            >
              <FontAwesomeIcon d="user" />
            </Box>
            <Box>
              <Box fontSize={ '5.subTitle' }>
                { kana }様
                <Buttons.Button.Clear
                  fontSize={ '2.normal' }
                >
                  <FontAwesomeIcon
                    d="pen"
                  />
                </Buttons.Button.Clear>
              </Box>
              <Box
                fontSize={ '3.paragraph' }
                fontColor='4.thin'
              >
                { name || '--' }
              </Box>
            </Box>
          </Flex>
          <Box
            padding={ 2 }
          >
            <Flex
              flexType='col'
              gridCols={ 2 }
              gap={ '1/6' }
              borderRadius={ '1.tone.primary' }
              overflow='hidden'
              freeCSS={ {
                whiteSpace: 'nowrap'
              } }
            >
              <Buttons.Button.Prime
                borderRadius={ 0 }
              >
                <FontAwesomeIcon d="clipboard-check" /> Reception
              </Buttons.Button.Prime>
              <Flex
                flexChilds='even'
                gap={ '1/6' }
              >
                <Buttons.Button.Prime
                  borderRadius={ 0 }
                  backgroundColor={ 'warn' }
                >
                  <FontAwesomeIcon d="merge" /> Merge
                </Buttons.Button.Prime>
                <Buttons.Button.Prime
                  borderRadius={ 0 }
                  backgroundColor={ 'posi' }
                >
                  <FontAwesomeIcon d="phone" /> Tel
                </Buttons.Button.Prime>
              </Flex>
            </Flex>
          </Box>
        </Flex>
        <Layout.TabBar
          margin={ 'auto' }
          positionTop='topBase'
          position='sticky'
          backgroundColor={ '1.layer.base' }
          tabIndex={ val_index }
          tabs={ [
            '概要',
            '来店履歴',
            '保険情報',
            'コース・サブスクリプション',
          ] }
          onTabChange={ ( index ) => {
            set_index( index );
          } }
        />
      </>
    );
  },
  TabContents: {
    _: ( params: NestParams ) => {
      let {
        val_index,
        set_index
      } = params;

      return (
        <Layout.PageViewController
          viewIndex={ val_index }
          swipeOptions={ {
            enable: true,
            mouseDrag: true,
            onSlide: ( index ) => {
              set_index( index );
            }
          } }
          wrapTemplate={ ( View ) => (
            <Layout.Plate
              size='L'
              padding={ 2 }
              children={ View }
            />
          ) }
          views={ [
            <Components.TabContents.DashBoardRegion { ...params } />,
            <Components.TabContents.VisitHistory />,
            <Components.TabContents.InsuranceRegion />,
            <Components.TabContents.PropertyRegion />
          ] }
        />
      );
    },
    DashBoardRegion: ( params: NestParams ) => {
      let {
        name,
        kana,
        gender,
        age
      } = params.val_def.details;

      return (
        <>
          <Flex
            ssCardBox
            padding={ 1.5 }
            horizontalAlign='around'
            flexChilds='auto'
          >
            <Box
              padding={ 1.5 }
              textAlign='center'
            >
              <FontAwesomeIcon
                d="timer"
                fontColor={ 'posi' }
                fontSize={ '3.paragraph' }
              /> 来店回数
              <Box
                fontSize={ '6.title' }
                fontColor={ '1.clear' }
              >
                43
                <Span
                  fontColor='4.thin'
                >回</Span>
              </Box>
            </Box>
            <Box
              backgroundColor={ '4.layer.darken' }
              borderRadius='sphere'
              _width={ '1/3' }
              flexSizing='none'
              margin={ [ 2,0 ] }
            />
            <Box
              padding={ 1.5 }
              textAlign='center'
            >
              <FontAwesomeIcon
                d="coins"
                fontColor={ 'nega' }
                fontSize={ '3.paragraph' }
              /> LTV
              <Box
                fontSize={ '6.title' }
                fontColor={ '1.clear' }
              >
                ¥180,000
              </Box>
            </Box>
            <Box
              backgroundColor={ '4.layer.darken' }
              borderRadius='sphere'
              _width={ '1/3' }
              flexSizing='none'
              margin={ [ 2,0 ] }
            />
            <Box
              padding={ 1.5 }
              textAlign='center'
            >
              <FontAwesomeIcon
                d="wave-pulse"
                fontColor={ 'warn' }
                fontSize={ '3.paragraph' }
              /> 来店頻度
              <Box
                fontSize={ '6.title' }
                fontColor={ '1.clear' }
              >
                6.3日
                <Span
                  fontSize={ '2.normal' }
                  fontColor='4.thin'
                >/回</Span>
              </Box>
            </Box>
          </Flex>
          <Flex
            padding={ [ 2,0 ] }
            gap={ [ 1,2 ] }
          >
            <Box
              ssCardBox
              flexGrid={ 1 }
            >
              <Box ssCardBoxHeader>
                基本情報
              </Box>
              <Box ssCardBoxBody>
                <List
                  rowStyles={ {
                    horizontalAlign: 'between',
                    paddingBottom: 1,
                    gap: 1,
                    borderBottom: true
                  } }
                  gap={ 1 }
                  rows={ [
                    {
                      children: <>
                        <Box>名前</Box>
                        <Box>
                          { name || '--' }
                        </Box>
                      </>
                    },{
                      children: <>
                        <Box>かな</Box>
                        <Box>
                          { kana }
                        </Box>
                      </>
                    },{
                      children: <>
                        <Box>性別</Box>
                        <Box>
                          { appEnv.genderName( gender ) }
                        </Box>
                      </>
                    },{
                      children: <>
                        <Box>年齢</Box>
                        <Box>
                          { age }歳
                        </Box>
                      </>
                    }
                  ] }
                />
              </Box>
            </Box>
            <Box
              padding={ 2 }
              ssCardBox
              flexGrid={ 2 }
            >
              Some Content
            </Box>
            <Box flexNewLine />
            <Box
              padding={ 2 }
              ssCardBox
              flexGrid={ 2 }
            >
              Some Content
            </Box>
            <Box
              padding={ 2 }
              ssCardBox
              flexGrid={ 1 }
            >
              Some Content
            </Box>
            <Box flexNewLine />
            <Box
              padding={ 2 }
              ssCardBox
              flexGrid={ 2 }
            >
              Some Content
            </Box>
            <Box
              padding={ 2 }
              ssCardBox
              flexGrid={ 1 }
            >
              Some Content
            </Box>
          </Flex>
        </>
      );
    },
    VisitHistory: () => {
      let DataData: amotify.fn.Tables.Data.BodyRowParams[] = [];
      for ( var i = 0; i < 100; i++ ) {
        let Row: amotify.fn.Tables.Data.BodyRowParams = [
          {
            type: 'td',
            data: '2023-12-02'
          },{
            type: 'td',
            data: '¥33,100'
          },{
            type: 'td',
            data: '¥33,100'
          },{
            type: 'td',
            data: '3商品'
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
          colLength={ 6 }
          tone='rowBorder'
          ssCardBox
          head={ [
            { data: '来店日' },
            { data: '支払い金額' },
            { data: '保険請求金額' },
            { data: '商品数' },
            { data: '最終ステータス' },
            { data: '' },
          ] }
          rows={ DataData }
          onRowClick={ () => {
            console.log( 'yhiul;jok' );
          } }
          options={ {
            sizeFixed: false,
            order: [ true,true,true,true,true,false ],
            defaultOrder: [ 1,'ASC' ],
            defaultRowLength: 100
          } }
        />
      );
    },
    InsuranceRegion: () => {
      const InsuranceCard: FNC<{}> = () => {
        return (
          <Flex
            flexType='col'
            ssCardBox
          >
            <Flex
              ssCardBoxHeader
              horizontalAlign='between'
              verticalAlign='center'
              gap={ 1 }
            >
              <Box
                fontWeight='3.bold'
              >
                〇〇保険証
              </Box>
              <Buttons.Button.Sub
                size='S'
              >
                編集
              </Buttons.Button.Sub>
            </Flex>
            <Flex
              horizontalAlign='between'
              gap={ 1 }
              padding={ 1 }
            >
              <Box>
                交付日 : 2022/12/01
                <br />
                失効日 : 2024/12/31
              </Box>
              <Box>
                家族保険証
                <br />
                ミニッツ　小太郎
                <br />
                080-6995-2229
              </Box>
              <Box>
                被保険者
                <br />
                〒164-0003
                <br />
                中野区東中野3-18-5
                <br />
                Timor Nakano203
              </Box>
            </Flex>
          </Flex>
        );
      }

      return (
        <>
          <Flex
            flexType='col'
            gap={ 2 }
          >
            <Flex
              horizontalAlign='right'
            >
              <Buttons.Button.Prime>
                保険証登録 <FontAwesomeIcon d="plus" />
              </Buttons.Button.Prime>
            </Flex>
            <InsuranceCard />
            <InsuranceCard />
          </Flex>
        </>
      );
    },
    PropertyRegion: () => {
      return (
        <Flex
          flexType='col'
          gap={ 2 }
        >
          <Flex
            horizontalAlign='between'
            verticalAlign='center'
          >
            <Box fontSize='5.subTitle'>
              コース
            </Box>
            <Buttons.Button.Prime>
              <FontAwesomeIcon
                d="plus"
              /> 追加
            </Buttons.Button.Prime>
          </Flex>
          <List
            gap={ 1 }
            ssLastChildLossBorder={ false }
            rowStyles={ {
              padding: 1,
              ssCardBox: true,
              backgroundColor: '1.layer.base',
              horizontalAlign: 'between',
              verticalAlign: 'baseline'
            } }
            rows={ [
              {
                children: <>
                  <Box>
                    〇〇回数券
                  </Box>
                  <Box>
                    <Span
                      fontColor={ 'theme' }
                      fontSize={ '4.thirdTitle' }
                      marginRight='1/2'
                    >
                      3
                    </Span>
                    /12回使用済
                  </Box>
                  <Box>
                    2023/04/01まで使用可能
                  </Box>
                  <Buttons.Button.Sub>
                    詳細
                  </Buttons.Button.Sub>
                </>
              },{
                children: <>
                  <Box>
                    〇〇コース
                  </Box>
                  <Box>
                    2023/04/01まで使用可能
                  </Box>
                  <Buttons.Button.Sub>
                    詳細
                  </Buttons.Button.Sub>
                </>
              },{
                children: <>
                  <Box>
                    〇〇コース
                  </Box>
                  <Box>
                    2023/04/01まで使用可能
                  </Box>
                  <Buttons.Button.Sub>
                    編集
                  </Buttons.Button.Sub>
                </>
              }
            ] }
          />
          <Flex
            horizontalAlign='between'
            verticalAlign='center'
          >
            <Box fontSize='5.subTitle'>
              サブスクリプション
            </Box>
            <Buttons.Button.Prime>
              <FontAwesomeIcon
                d="plus"
              /> 追加
            </Buttons.Button.Prime>
          </Flex>
          <List
            gap={ 1 }
            rowStyles={ {
              padding: 1,
              ssCardBox: true,
              backgroundColor: '1.layer.base',
              horizontalAlign: 'between',
              verticalAlign: 'center'
            } }
            rows={ [
              {
                children: <>
                  <Box>
                    〇〇定額制
                  </Box>
                  <Box>
                    ¥1,980/月
                  </Box>
                  <Buttons.Button.Sub>
                    編集
                  </Buttons.Button.Sub>
                </>
              },{
                children: <>
                  <Box>
                    〇〇定額制
                  </Box>
                  <Box>
                    ¥1,980/月
                  </Box>
                  <Buttons.Button.Sub>
                    編集
                  </Buttons.Button.Sub>
                </>
              }
            ] }
          />
        </Flex>
      );
    }
  }
}


export const CustomeObj: FNC<{}> = () => {
  let [ val_index,set_index ] = useState( 0 );

  let [ val_init,set_init ] = useState( false );
  let [ val_def,set_def ] = useState( {} as DefParams );
  let { id: uuid } = $.getQueryParams();

  useEffect( () => {
    $.fetch.post( {
      key: 'getCustomerDetails',
      url: 'customer/object',
      body: { customerId: uuid },
      trafficControl: 1000
    },( result ) => {
      if ( !result.ok ) return;
      set_init( true );

      let {
        details,
        menus
      } = result.body;

      set_def( {
        details: details[ 0 ]
      } );
    } );
  },[] );

  let Content = <></>
  if ( !val_init ) {
    Content =
      <Flex
        flexType="col"
        gap={ 2 }
        padding={ 4 }
        flexCenter
      >
        <Loader size="L" />
        <Box>
          お客様情報を取得中
        </Box>
      </Flex>
  } else {
    Content = <>
      <Components.TopRegion
        val_index={ val_index }
        set_index={ set_index }
        val_def={ val_def }
        set_def={ set_def }
      />
      <Components.TabContents._
        val_index={ val_index }
        set_index={ set_index }
        val_def={ val_def }
        set_def={ set_def }
      />
    </>;
  }

  return ( Content );
}