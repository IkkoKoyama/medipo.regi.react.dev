const {
  glob: {
    React: {
      useState,
      useEffect
    }
  },
  atoms: {
    Box,
    Flex,
    FontAwesomeIcon,
    Span,
    Grid,
    Img
  },
  mols: {
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

import style from './style.module.scss';

import {
  CreateDWFN
} from '../RegiCheck/page';

import {
  VisitDetailsFN,
  CreateVisitFN
} from '../Modals/_';


type ListParams = {
  id: number
  uuid: string
  arriveDate: string
  arriveTime: string
  customerId: number
  customerName: string
  customerKana: string

  viaType: number
  visitPhase: number
}


const Components = {
  LeftRegion: {
    _: ( params: {
      getList: Function
      val_list: ListParams[]
    } ) => {
      let [ val_simpleReceptionKey,set_simpleReceptionKey ] = useState( $.uuidGen() );

      useEffect( () => {
        params.getList();
      },[] );

      return (
        <Flex
          flexType='col'
          gap={ 2 }
          flexGrid={ 2 }
          flexSizing={ 'auto' }
        >
          <Components.LeftRegion.SimpleReception
            key={ val_simpleReceptionKey }
            val_simpleReceptionKey={ val_simpleReceptionKey }
            set_simpleReceptionKey={ set_simpleReceptionKey }
            getList={ params.getList }
          />
          <Flex
            flexType='col'
            gap={ 1 }
          >
            <Box fontSize='4.thirdTitle'>
              来店リスト
            </Box>
            <Components.LeftRegion.List._
              val_list={ params.val_list }
              getList={ params.getList }
            />
          </Flex>
        </Flex>
      );
    },
    SimpleReception: ( params: {
      val_simpleReceptionKey: string
      set_simpleReceptionKey: React.Dispatch<React.SetStateAction<string>>
      getList: Function
    } ) => {
      let formName = 'formSimpleReception';
      let [ val_currentTime,set_currentTime ] = useState( new Date() );

      const reTime = () => {
        setTimeout( () => {
          set_currentTime( new Date() );
          reTime();
        },10000 );
      }
      useEffect( () => {
        reTime();
      },[] );

      let [ val_isReserve,set_isReserve ] = useState( false );
      let [ val_newCustomer,set_newCustomer ] = useState( false );
      let [ val_useInurance,set_useInsurance ] = useState( false );

      let BodyContents: ReactElement[] = [];

      if ( !val_newCustomer ) {
        BodyContents.push(
          <Input.Search
            placeholder='患者を検索'
            optionGroups={ [] }
            onDynamicSearch={ appEnv.dynamicSearchCustomerInput }
            form={ formName }
            name='customer'
            required
            appearances={ {
              addButton: () => {
                return {
                  padding: 1
                }
              },
              selectedChip: ( { params,status,deleteCallback } ) => {
                let {
                  icon,
                  label,
                  value
                } = params;
                let Content: ReactElement;
                let Value = $.toJson( value );
                if ( Value.ok ) {
                  let {
                    name,
                    kana,
                    gender,
                    age
                  } = Value.body;

                  Content = <Box
                    flexSizing={ 'auto' }
                    textAlign='left'
                  >
                    <Box
                      fontWeight='3.bold'
                      fontSize='4.thirdTitle'
                    >
                      { kana } 様
                    </Box>
                    <Box
                      fontSize='3.paragraph'
                      children={ name }
                    />
                    <Box
                      fontColor='3.blur'
                    >
                      <Box>
                        性別 : { appEnv.genderName( gender ) }
                      </Box>
                      <Box>
                        年齢 : { age }歳
                      </Box>
                      <Box>
                        来店回数 : 0回
                      </Box>
                      <Box>
                        前回来店日 : ----/--/--
                      </Box>
                    </Box>
                  </Box>
                }

                return {
                  children: <>
                    <Flex
                      gap={ 1 }
                      verticalAlign='center'
                    >
                      <Buttons.Button.Border
                        tabIndex={ -1 }
                        _height={ 3 }
                        padding={ [ 0,'3/4' ] }
                        borderRadius='sphere'
                        onClick={ deleteCallback }
                      >
                        <FontAwesomeIcon
                          iconStyle='regular'
                          d='times'
                        /> 削除
                      </Buttons.Button.Border>
                      { Content }
                    </Flex>
                  </>
                }
              }
            } }
          />
        );
      } else {
        BodyContents.push( <>
          <Flex
            flexType='col'
            gap={ 1 }
          >
            <Flex
              gap={ 1 }
              flexChilds='auto'
            >
              <Input.Wrapper.Normal
                label='フリガナ'
              >
                <Input.Text.Normal
                  placeholder='フリガナ'
                  required
                  form={ formName }
                  name='kana'
                />
              </Input.Wrapper.Normal>
              { val_useInurance ?
                <Input.Wrapper.Normal
                  label='名前'
                >
                  <Input.Text.Normal
                    placeholder='名前'
                    required
                    form={ formName }
                    name='name'
                  />
                </Input.Wrapper.Normal> : null }
              <Input.Wrapper.Normal
                label='電話番号'
              >
                <Input.Text.Tel
                  required
                  form={ formName }
                  name='tel'
                />
              </Input.Wrapper.Normal>
            </Flex>
            { val_useInurance ? <>
              <Flex
                gap={ 1 }
              >
                <Input.Wrapper.Normal
                  label='性別'
                >
                  <Input.List.Radio.Border
                    list={ [
                      { value: 1,label: '男性' },
                      { value: 2,label: '女性' }
                    ] }
                    required
                    form={ formName }
                    name='gender'
                  />
                </Input.Wrapper.Normal>
                <Input.Wrapper.Normal
                  label='生年月日'
                >
                  <Input.Time.DateWareki
                    defaultEra='year'
                    required
                    form={ formName }
                    name='birthday'
                  />
                </Input.Wrapper.Normal>
              </Flex>
            </> : null }
          </Flex>
        </> );
      }
      if ( val_useInurance ) {
        if ( val_newCustomer ) {
          BodyContents.push( <>
            <Flex
              gap={ 1 }
            >
              <Input.Wrapper.Normal
                label='負傷日'
              >
                <Input.Time.Date
                  required
                  onValidate={ async ( { value } ) => {
                    let today = Number( $.Time().toOrder( [ 'year','month','date' ] ).join( '' ) );
                    let Value = Number( value.replace( /\D/ig,'' ) );

                    let Result: amotify.fn.Input.Validation.Result = {
                      ok: false,
                      notice: [ {
                        type: 'invalid',
                        label: '今日までの日付を入力してください'
                      } ]
                    }
                    if ( today >= Value ) {
                      Result = {
                        ok: true,
                        notice: []
                      }
                    }
                    return Result;
                  } }
                />
              </Input.Wrapper.Normal>
              <Input.Wrapper.Normal
                label='負担割合'
              >
                <Input.Select
                  required
                  list={ [
                    { value: 1,label: '1割' },
                    { value: 2,label: '2割' },
                    { value: 3,label: '3割' },
                    { value: 10,label: '自賠責・労災' }
                  ] }
                />
              </Input.Wrapper.Normal>
              <Input.Wrapper.Normal
                label='傷病数'
              >
                <Input.Select
                  required
                  list={ [
                    { value: 1,label: '1部位' },
                    { value: 2,label: '2部位' },
                    { value: 3,label: '3部位' },
                    { value: 4,label: '4部位' },
                    { value: 5,label: '5部位' }
                  ] }
                />
              </Input.Wrapper.Normal>
            </Flex>
          </> );
        }
        BodyContents.push( <>
          <Input.Wrapper.Normal
            label='確認事項'
          >
            <Input.List.Checkbox.IconBorder
              list={ [
                { value: 1,label: '保険証' },
                { value: 2,label: '柔整レセサイン' },
                { value: 3,label: '鍼灸レセサイン' },
                { value: 4,label: 'マッサージレセサイン' }
              ] }
            />
          </Input.Wrapper.Normal>
        </> );
      }

      return (
        <Box ssCardBox>
          <Box ssCardBoxHeader>
            簡易受付
            <Span
              fontSize='1.mini'
              marginLeft={ '1/2' }
            >
              (当日来店のみ)
            </Span>
          </Box>
          <Flex
            ssCardBoxBody
            flexType='col'
            gap={ 1 }
          >
            <Flex
              gap={ 1 }
              verticalAlign='bottom'
            >
              <Input.Hidden
                form={ formName }
                name='arriveDate'
                value={ $.Time().toFormatYMD() }
              />
              <Input.List.Checkbox.IconBorder
                value={ val_isReserve }
                list={ [
                  { value: true,label: '予約' }
                ] }
                onUpdateValidValue={ ( { value } ) => {
                  set_isReserve( !!value[ 0 ] );
                } }
                form={ formName }
                name='isReserved'
              />
              <Input.Time.Clock
                value={ $.Time().toFormatHM() }
                override='force'
                form={ formName }
                disabled={ !val_isReserve }
                name='arriveTime'
                wrapStyles={ {
                  freeCSS: {
                    width: 12 * 9
                  }
                } }
              />
              <Box flexSizing={ 'auto' } />
              <Input.List.Checkbox.IconBorder
                value={ val_newCustomer }
                list={ [
                  { value: true,label: '新患登録' }
                ] }
                onUpdateValidValue={ ( { value } ) => {
                  set_newCustomer( value[ 0 ] );
                } }
                form={ formName }
                name='newCustomer'
              />
              <Input.List.Checkbox.IconBorder
                value={ val_useInurance }
                list={ [
                  { value: true,label: '保険利用' }
                ] }
                onUpdateValidValue={ ( { value } ) => {
                  set_useInsurance( value[ 0 ] );
                } }
                form={ formName }
                name='useInsurance'
              />
            </Flex>
            { BodyContents }

            <Flex
              flexNewLine
              horizontalAlign='right'
            >
              <Buttons.Button.Prime
                ssMiniLoader={ { color: 'white' } }
                submitOption={ {
                  formName: formName,
                  callback: async ( form ) => {
                    form.isReserved = !!form.isReserved[ 0 ];

                    let {
                      newCustomer,
                      useInsurance,
                      customer,
                      ...Params
                    } = form;
                    let uuid = $.uuidGen();

                    useInsurance = Boolean( useInsurance[ 0 ] );
                    newCustomer = Boolean( newCustomer[ 0 ] );

                    if ( newCustomer ) {
                      let customerUuid = $.uuidGen();
                      let {
                        tel,
                        kana,
                      } = Params;
                      delete Params.tel;
                      delete Params.kana;

                      let createCustomerResult = await $.fetch.post( {
                        key: 'createCustomer',
                        url: '/customer/create',
                        body: {
                          uuid: customerUuid,
                          kana: kana,
                          tel1: tel
                        }
                      } );
                      if ( !createCustomerResult.ok ) return;
                      Params.customerId = createCustomerResult.body.createCustomer.insertId;
                    } else {
                      Params.customerId = customer.id;
                    }

                    let Form = {
                      uuid,
                      useInsurance,
                      ...Params
                    }

                    $.fetch.post( {
                      key: 'createSimpleOrder',
                      url: '/visit/create',
                      body: Form
                    },( result ) => {
                      if ( !result.ok ) return;
                      params.getList();
                      params.set_simpleReceptionKey( $.uuidGen() );
                    } );
                  }
                } }
              >
                登録する
              </Buttons.Button.Prime>
            </Flex>
          </Flex>
        </Box >
      );
    },
    List: {
      _: ( params: {
        val_list: ListParams[]
        getList: Function
      } ) => {
        let [ val_tabIndex,set_tabIndex ] = useState( Number( localStorage.getItem( 'dashboard/phaseTabIndex' ) || 100 ) );

        useEffect( () => {
          localStorage.setItem( 'dashboard/phaseTabIndex',String( val_tabIndex ) );
        },[ val_tabIndex ] );

        return (
          <Box ssCardBox>
            <Components.LeftRegion.List.Console
              val_tabIndex={ val_tabIndex }
              set_tabIndex={ set_tabIndex }
              val_list={ params.val_list }
              getList={ params.getList }
            />
            <Components.LeftRegion.List.Body
              val_tabIndex={ val_tabIndex }
              val_list={ params.val_list }
              getList={ params.getList }
            />
          </Box>
        );
      },
      Console: ( params: {
        val_tabIndex: number
        set_tabIndex: React.Dispatch<React.SetStateAction<number>>
        val_list: ListParams[]
        getList: Function
      } ) => {
        let statusIds = [ {
          id: 0,
          label: <>
            <FontAwesomeIcon
              iconStyle='solid'
              d="clock"
            /> 予約
          </>
        },{
          id: 100,
          label: <>
            <FontAwesomeIcon
              iconStyle='solid'
              d="clipboard-check"
            /> 来店中
          </>
        },{
          id: 200,
          label: <>
            <FontAwesomeIcon
              iconStyle='solid'
              d="arrow-right-from-bracket"
            /> 会計済
          </>
        } ];

        let Lists: amotify.fn.Input.List.OptionParams[] = statusIds.map( ( li ) => {
          let result = params.val_list.filter( ( list ) => list.visitPhase == li.id ).length;
          return {
            value: li.id,
            label: <>
              <Box>
                <Box fontSize={ '1.mini' }>
                  { li.label }
                </Box>
                <Box fontSize={ '6.title' }>
                  { result || '-' }<Span fontSize={ '1.mini' } >人</Span>
                </Box>
              </Box>
            </>
          }
        } );

        return (
          <Flex
            flexWrap={ false }
            verticalAlign='center'
            borderBottom
          >
            <Box
              flexCenter
              flexSizing={ 'auto' }
            >
              <Input.Segmented.BottomLine
                name='SwitchList1'
                value={ params.val_tabIndex }
                gap={ 0 }
                cellStyles={ {
                  padding: [ 1,2 ],
                  textAlign: 'center',
                  fontColor: '1.clear'
                } }
                cellCheckedStyles={ {
                  fontColor: 'theme'
                } }
                list={ Lists }
                onUpdateValidValue={ ( { value } ) => {
                  params.set_tabIndex( value[ 0 ] );
                } }
              />
            </Box>
            <Flex
              flexType='col'
              paddingRight={ '3/4' }
              gap={ '1/2' }
            >
              <Buttons.Button.Border
                size='S'
                onClick={ () => {
                  params.getList();
                } }
              >
                再取得 <FontAwesomeIcon
                  iconStyle='solid'
                  d="rotate-right"
                />
              </Buttons.Button.Border>
              <Buttons.Button.Border
                size='S'
              >
                表示設定 <FontAwesomeIcon
                  iconStyle='solid'
                  d="arrow-up-right-from-square"
                />
              </Buttons.Button.Border>
            </Flex>
          </Flex>
        );
      },
      Body: ( params: {
        val_tabIndex: number
        val_list: ListParams[]
        getList: Function
      } ) => {
        let DataData: amotify.fn.Tables.Data.BodyRowParams[] = [];

        let filteredList = params.val_list.filter( ( li ) => li.visitPhase == params.val_tabIndex );

        for ( let li of filteredList ) {
          let {
            id,
            uuid,
            arriveDate,
            arriveTime,
            customerId,
            customerName,
            customerKana
          } = li;

          let Row: amotify.fn.Tables.Data.BodyRowParams = [
            {
              type: 'th',
              data: customerKana,
              children: <>
                <Box>
                  { customerKana || '--' } 様
                </Box>
                <Box fontColor='3.blur'>
                  { customerName }
                </Box>
              </>
            },{
              type: 'td',
              data: arriveTime
            },{
              type: 'td',
              data: '--'
            },{
              type: 'td',
              data: '',
              children: <Box
                textAlign='right'
              >
                <Buttons.Anchor.Sub
                  href={ '/order/entry?id=' + uuid }
                >
                  注文入力 <FontAwesomeIcon
                    iconStyle='solid'
                    d="angle-right"
                  />
                </Buttons.Anchor.Sub>
              </Box>
            }
          ]
          Row.rowId = uuid;
          DataData.push( Row );
        }

        return (
          <Table.Data
            colLength={ 4 }
            tone='rowBorder'
            head={ [
              { data: '名前' },
              { data: '来店時間' },
              { data: '合計額' },
              { data: '' },
            ] }
            cellStyleCallback={ ( args ) => {
              let {
                type
              } = args;

              if ( type == 'head' ) {
                return {
                  position: 'sticky',
                  positionTop: 'topBase'
                }
              }
              return {}
            } }
            rows={ DataData }
            borderRadius={ '1.tone.primary' }
            options={ {
              sizeFixed: false,
              order: [ true,true,true,false ],
              rowLengthChange: false,
              paging: false,
              search: false,
              info: false
            } }
            onRowClick={ ( rowId ) => {
              VisitDetailsFN( {
                uuid: String( rowId ),
                callback: () => {
                  params.getList();
                }
              } );
            } }
          />
        );
      }
    }
  },
  RightRegion: {
    _: ( params: {
      getList: Function
    } ) => {
      return (
        <Box
          _width={ 0 }
          flexGrid={ 1 }
          UnderBreakPointStyles={ {
            _width: 'auto'
          } }
        >
          <Flex
            flexType='col'
            gap={ 2 }
            position='sticky'
            freeCSS={ {
              top: 'calc( var( --topBase ) + 12px * 2 )'
            } }
          >
            <Components.RightRegion.Pipes
              getList={ params.getList }
            />
            <Components.RightRegion.Unreceipts />
            <Components.RightRegion.Infos />
          </Flex>
        </Box>
      );
    },
    Pipes: ( params: {
      getList: Function
    } ) => {
      let CommonStyles: amotifyUniStyleParams = {
        borderRadius: '1.tone.primary',
        ssEffectsOnActive: 'shrink',
        freeCSS: {
          minHeight: 12 * 6
        }
      }

      return (
        <Flex
          flexCenter
        >
          <Flex
            flexType='col'
            gap={ 1 }
            _width='100%'
          >
            <Buttons.Button.Prime
              { ...CommonStyles }
              boxShadow={ 2 }
              ssEffectsOnActive='shrink'
              flexNewLine
              onClick={ () => {
                CreateVisitFN( {
                  callback: () => {
                    params.getList();
                  }
                } );
              } }
            >
              <Box
                fontWeight='3.bold'
                fontSize='3.paragraph'
              >
                来店受付
              </Box>
            </Buttons.Button.Prime>
            <Buttons.Anchor.UniqueStyle.BorderToFill
              href='/order/entry'
              { ...CommonStyles }
              boxShadow={ 2 }
            >
              <Box
                fontWeight='3.bold'
                fontSize='3.paragraph'
              >
                ご注文入力・会計
              </Box>
              <Box
                fontSize='1.mini'
                fontColor='4.thin'
              >
                伝票のみの作成・会計
              </Box>
            </Buttons.Anchor.UniqueStyle.BorderToFill>
            <Flex
              gap={ 1 }
              flexChilds='even'
            >
              <Buttons.Button.Sub
                { ...CommonStyles }
                onClick={ () => {
                  CreateDWFN();
                } }
              >
                <Box
                  fontWeight='3.bold'
                  fontSize='3.paragraph'
                >
                  <FontAwesomeIcon
                    iconStyle='regular'
                    d='yen-sign'
                  /> 入出金
                </Box>
              </Buttons.Button.Sub>
              <Buttons.Button.Sub
                { ...CommonStyles }
                onClick={ () => {
                  amotify.fn.SnackBar.add( {
                    backgroundColor: 'posi',
                    children: 'ドロアを開きました'
                  } );
                } }
              >
                <Box
                  fontWeight='3.bold'
                  fontSize='3.paragraph'
                >
                  <FontAwesomeIcon
                    iconStyle='regular'
                    d='cash-register'
                  /> ドロアを開く
                </Box>
              </Buttons.Button.Sub>
            </Flex>
          </Flex>
        </Flex>
      );
    },
    Infos: () => {
      let Slides = [
        <Flex
          flexType='col'
          gap={ 1 }
        >
          <Box
            padding={ 1 }
            paddingBottom={ 0 }
            fontSize='3.paragraph'
          >
            お知らせ (未実)
          </Box>
          <List
            padding={ [ 0,1 ] }
            rowStyles={ {
              gap: 1,
              flexWrap: false,
              verticalAlign: 'center'
            } }
            gap={ '3/4' }
            rows={ [
              {
                children: <>
                  <Components.Variables.ReportIcon
                    d="exclamation-triangle"
                    fontColor='warn'
                  />
                  2名の予約顧客が来店予定時刻を過ぎています。
                </>
              },{
                children: <>
                  <Components.Variables.ReportIcon
                    d="exclamation-triangle"
                    fontColor='warn'
                  />
                  本日の売上目標まであと、¥1,230,000です。
                </>
              }
            ] }
          />
          <Box
            position='relative'
          >
            <Img
              src={ Env.CDN.dev + '35000/' + Env.app.alias + '/image/banner.png' }
              draggable={ false }
              freeCSS={ {
                maxHeight: 12 * 8
              } }
            />
            <Box
              position='absolute'
              positionBottom={ '1/2' }
              positionRight={ '1/2' }
              backgroundColor='lcOpHigh'
              padding={ '1/2' }
              borderRadius={ 1 }
              fontColor='white'
            >
              <FontAwesomeIcon
                d="image"
                fontSize={ '5.subTitle' }
              /> バナー広告的なやつ
            </Box>
          </Box>
        </Flex>,
        <Flex
          flexType='col'
          gap={ 1 }
          padding={ 1 }
        >
          <Box
            fontSize='3.paragraph'
          >
            売上レポート { $.Time().toOrder( [ 'month','date' ] ).join( '月' ) }日
          </Box>
          <List
            rowStyles={ {
              gap: 1,
              flexWrap: false,
            } }
            gap={ '3/4' }
            rows={ [
              {
                children: <>
                  <Components.Variables.ReportIcon
                    d="yen-sign"
                  />
                  <Components.Variables.ReportData
                    Title='現金売上'
                    Data='¥1,310,000'
                  />
                </>
              },{
                children: <>
                  <Components.Variables.ReportIcon
                    d="wave-pulse"
                  />
                  <Components.Variables.ReportData
                    Title='カード・電子決済売上'
                    Data='¥1,421,301'
                  />
                </>
              },{
                children: <>
                  <Components.Variables.ReportIcon
                    d="wave-pulse"
                  />
                  <Components.Variables.ReportData
                    Title='保険売上'
                    Data='¥1,421,301'
                  />
                </>
              }
            ] }
          />
        </Flex>,
        <Flex
          flexType='col'
          gap={ 1 }
          padding={ 1 }
        >
          <Box
            fontSize='3.paragraph'
          >
            今月の実績
          </Box>
          <List
            rowStyles={ {
              gap: 1,
              flexWrap: false,
            } }
            gap={ '3/4' }
            rows={ [
              {
                children: <>
                  <Components.Variables.ReportIcon
                    d="yen-sign"
                  />
                  <Components.Variables.ReportData
                    Title='今月の売上高'
                    Data='¥6,310,000'
                  />
                </>
              },{
                children: <>
                  <Components.Variables.ReportIcon
                    d="wave-pulse"
                  />
                  <Components.Variables.ReportData
                    Title='今月の予実売上'
                    Data='¥9,310,000'
                  />
                </>
              },{
                children: <>
                  <Components.Variables.ReportIcon
                    d="badge-percent"
                  />
                  <Components.Variables.ReportData
                    Title='目標実績進捗率'
                    Data={ <>
                      <Box>
                        63%
                      </Box>
                    </> }
                  />
                </>
              },{
                children: <>
                  <Components.Variables.ReportIcon
                    d="route"
                  />
                  <Components.Variables.ReportData
                    Title='目標予実達成率'
                    Data={ <>
                      <Box fontColor={ 'posi' }>
                        103.4%
                        <FontAwesomeIcon
                          iconStyle='solid'
                          d="caret-up"
                        />
                      </Box>
                    </> }
                  />
                </>
              }
            ] }
          />
        </Flex>
      ];

      return (
        <Layout.SwipeView
          ssCardBox
          slideIndex={ 0 }
          options={ {
            swipeableOnMouseDrag: true,
            autoSwipeSeconds: 10000,
            loop: true,
          } }
          slides={ Slides }
        />
      );
    },
    Unreceipts: () => {
      let CommonStyles: amotifyUniStyleParams = {
        borderRadius: '1.tone.primary',
        ssEffectsOnActive: 'shrink',
        freeCSS: {
          minHeight: 12 * 6
        }
      }

      return (
        <Box
          ssCardBox
        >
          <Flex
            ssCardBoxHeader
            horizontalAlign='between'
          >
            <Box>
              未会計の伝票 ( 4件 )
            </Box>
            <Box>
              <FontAwesomeIcon
                iconStyle='regular'
                fontColor='4.thin'
                d='question-circle'
                ssTooltips={ {
                  type: 'bottomRight',
                  children: 'aaa'
                } }
              />
            </Box>
          </Flex>
          <Table.Normal
            colLength={ 3 }
            tone='rowBorder'
            head={ [
              { children: 'AA',},
              { children: 'BB',},
              { children: 'CC',},
            ] }
            rows={ [
              [
                { children: 'AA',},
                { children: 'BB',},
                { children: 'CC',},
              ],[
                { children: 'AA',},
                { children: 'BB',},
                { children: 'CC',},
              ],[
                { children: 'AA',},
                { children: 'BB',},
                { children: 'CC',},
              ],
            ] }
          />
          <Box
            padding={ 1 }
            flexCenter
          >
            <Buttons.Button.Border>
              すべて見る
              <FontAwesomeIcon
                iconStyle='regular'
                d='angle-down'
              />
            </Buttons.Button.Border>
          </Box>
        </Box>
      );
    },
  },
  Variables: {
    ReportIcon: ( params: Atoms.FontAwesomeIconParams ) => (
      <FontAwesomeIcon
        iconStyle='regular'
        fontColor={ 'theme' }
        backgroundColor='lcOpFew'
        padding={ 1 }
        borderRadius={ '1.tone.primary' }
        _width={ 3 }
        _height={ 3 }
        { ...params }
      />
    ),
    ReportData: ( params: Atoms.BoxProps & {
      Title: ReactElement
      Data: ReactElement
    } ) => (
      <Flex flexType='col'>
        <Box
          fontSize={ '1.mini' }
          fontColor='4.thin'
        >
          { params.Title }
        </Box>
        <Box
          fontSize='4.thirdTitle'
          fontWeight='3.bold'
        >
          { params.Data }
        </Box>
      </Flex>
    )
  }
}

export const Reception: FNC<{}> = () => {
  let [ val_list,set_list ] = useState( [] as ListParams[] );

  const getList = () => {
    $.fetch.post( {
      key: 'ListOrder',
      url: '/visit/list',
      // trafficControl: 0
    },( result ) => {
      if ( !result.ok ) return;
      set_list( result.body.list );
    } );
  }

  useEffect( () => {
    //   // VRRB7JGU2TSHI19SPS8PDB3JWKV78I8D4ZRNU7GSERGRZO34
    //   // ZQ0HXMV6RFVJ2KW85Z3NX9KH4YOMXPEQDFR7XH87K27FMBBD
    //   VisitDetailsFN( {
    //     uuid: String( 'VRRB7JGU2TSHI19SPS8PDB3JWKV78I8D4ZRNU7GSERGRZO34' ),
    //     callback: () => {
    //       getList();
    //     }
    //   } );

    // CreateVisitFN({
    //   callback:()=>{
    //     getList();
    //   }
    // });
  },[] );

  return (
    <Layout.Plate
      size='L'
      margin={ [ 0,'auto' ] }
      padding={ [ 4,2 ] }
      UnderBreakPointStyles={ {
        padding: [ 4,1 ]
      } }
    >
      <Flex
        flexWrap={ false }
        gap={ 2 }
        className={ style.Wrapper }
        UnderBreakPointStyles={ {
          margin: 'auto',
          flexType: 'col-r'
        } }
      >
        <Components.LeftRegion._
          getList={ getList }
          val_list={ val_list }
        />
        <Components.RightRegion._
          getList={ getList }
        />
      </Flex>
    </Layout.Plate>
  );
}














import { FelicaReader } from '@appComps/FelicaReader/parts';
const FelicaRegion: FNC<{}> = () => {
  let [ val_id,set_id ] = useState( '' );
  return (
    <Flex
      ssCardBox
      padding={ 1.5 }
      flexType='col'
      _width={ '100%' }
      gap={ 1 }
    >
      <Buttons.Button.Prime
        onClick={ () => {
          FelicaReader( {
            callback: ( params ) => {
              if ( !params.valid ) return;
              set_id( params.data.id );
            }
          } );
        } }
      >
        ICカードを読み取る
      </Buttons.Button.Prime>

      this card has ID as : { val_id }
    </Flex>
  );
}
const TestRegion: FNC<{}> = () => {
  let [ val_id,set_id ] = useState( '' );

  const StatusRegion: FNC<{}> = () => {
    let [ val_status,set_status ] = useState( '' );

    let appSocket = window.io( 'ws://localhost:10200' );

    useEffect( () => {
      appSocket
        .emit( 'joinRoom','checkout' )
        .on( 'paymentStatus',( args ) => {
          let obj = {
            amount: args.amount_money,
            id: args.id,
            status: args.status
          }
          // amotify.fn.SnackBar.add( {
          //   backgroundColor: 'nega',
          //   children: '支払いがキャンセルされました'
          // } );
          set_status( JSON.stringify( obj ) );
        } )
    },[] );

    return (
      <Box>
        Latest Status : { val_status }
      </Box>
    );
  }

  return (
    <Flex
      marginBottom={ 4 }
      gap={ 1.5 }
    >
      <FelicaRegion />
      <Flex
        ssCardBox
        flexNewLine
        padding={ 1.5 }
        gap={ 1 }
        verticalAlign='center'
        flexWrap={ false }
      >
        <Box
          ssCardBox
        >
          <Box ssCardBoxHeader>
            Create Checkout
          </Box>
          <Flex
            ssCardBoxBody
            flexType='col'
            gap={ 1 }
          >
            <Input.Text.DigitNumber
              placeholder='Amount'
              form='checkoutForm'
              name='amount'
              required
              enableFormSubmit
            />
            <Input.Select
              form='checkoutForm'
              name='method'
              required
              list={ [
                { value: 'CARD_PRESENT',label: 'クレジットカード' },
                { value: 'FELICA_ALL',label: '交通系電子マネー' }
              ] }
            />
            <Flex
              gap={ 1 }
              flexWrap={ false }
            >
              <Buttons.Button.Border
                color='nega'
                onClick={ async () => {
                  let result = await $.fetch.post( {
                    key: 'squareAPICheckoutCancel',
                    url: '/squareAPI/checkout/cancel',
                    body: {
                      id: val_id
                    }
                  } );
                  amotify.fn.SnackBar.add( {
                    backgroundColor: 'nega',
                    children: '支払いがキャンセルされました'
                  } );
                } }
              >
                Cancel Checkout
              </Buttons.Button.Border>
              <Buttons.Button.Prime
                submitOption={ {
                  formName: 'checkoutForm',
                  callback: ( form ) => {
                    $.fetch.post( {
                      key: 'squareAPICheckoutCreate',
                      url: '/squareAPI/checkout/create',
                      body: form.data
                    },( result ) => {
                      if ( !result.ok ) return;
                      amotify.fn.SnackBar.add( {
                        backgroundColor: 'posi',
                        children: '支払いリクエストを送信しました'
                      } );
                      set_id( result.body.id );
                    } );
                  }
                } }
              >
                Create Checkout
              </Buttons.Button.Prime>
            </Flex>
          </Flex>
        </Box>
        <StatusRegion />
      </Flex>
    </Flex>
  );
}