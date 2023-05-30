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
  }
} = amotify;

import { ParaTitle } from '@appComps/ParaTitle';

import { FelicaReader } from '@appComps/FelicaReader/parts';
import { DrillDownAddressInputModalFN } from '@appComps/DrillDownAddressInputModal/parts';

type UniStatusParams = {
  setInsuranceInfo: boolean
}

let formName = 'createCustomer';

const Components = {
  Header: () => {
    return (
      <Flex
        backgroundColor={ '1.layer.base' }
        horizontalAlign='between'
        verticalAlign='center'
        padding={ 1 }
        borderBottom
      >
        <Box
          fontSize='5.subTitle'
          fontWeight='3.bold'
        >
          <FontAwesomeIcon
            d='plus-square'
            fontColor={ 'theme' }
          /> 顧客登録
        </Box>
        <Flex
          gap={ 1 }
          verticalAlign='center'
        >
          <Flex
            gap={ '1/2' }
          >
            <Buttons.Button.Clear
              _width={ 3 }
              _height={ 3 }
              flexCenter
              borderRadius={ 'sphere' }
            >
              <FontAwesomeIcon
                iconStyle='regular'
                d="question-circle"
              />
            </Buttons.Button.Clear>
            <Buttons.Button.Clear
              _width={ 3 }
              _height={ 3 }
              flexCenter
              borderRadius={ 'sphere' }
            >
              <FontAwesomeIcon
                iconStyle='regular'
                d="gear"
              />
            </Buttons.Button.Clear>
          </Flex>
          <Buttons.Button.Prime
            size='L'
            ssTooltips={ {
              type: 'bottomRight',
              children: 'ctrl + Enter'
            } }
            onClick={ async () => {
              let form = await $.formCollect( formName );
              if ( !form.valid ) return;
              let uuid = $.uuidGen();

              let {
                postalCode,
                addr1,
                addr2
              } = form.data;

              if ( postalCode && addr1 ) {
                let result = await $.googleMaps.getGeocode( {
                  type: 'address',
                  params: addr1
                } );

                if ( !result.ok ) return;
                form.data.postalCode = result.body.postalCode;
                form.data.location = result.body.location;
              }

              $.fetch.post( {
                key: 'createCustomer',
                url: '/customer/create',
                body: {
                  uuid,
                  ...form.data
                }
              },( result ) => {
                if ( !result.ok ) return;
                $.pagePush( '/customer/obj?id=' + uuid );
              } );
            } }
          >
            この内容で登録する
          </Buttons.Button.Prime>
        </Flex>
      </Flex>
    );
  },
  Body: {
    _: () => {
      let [ val_tabIndex,set_tabIndex ] = useState( 0 );
      let [ val_uniStatus,set_uniStatus ] = useState( {
        setInsuranceInfo: false
      } );

      return (
        <Box
          flexSizing={ 0 }
          padding={ [ 0,2 ] }
          overflow='auto'
        >
          <Layout.Plate
            padding={ [ 3,0 ] }
          >
            <Flex
              flexWrap={ false }
              gap={ 2 }
              verticalAlign='top'
              UnderBreakPointStyles={ {
                flexType: 'col'
              } }
            >
              <Components.Body.Basic
                val_uniStatus={ val_uniStatus }
                set_uniStatus={ set_uniStatus }
                position='sticky'
                flexGrid={ 2 }
                freeCSS={ {
                  top: 12 * 3
                } }
                UnderBreakPointStyles={ {
                  position: 'static',
                  _width: '100%'
                } }
              />
              <Flex
                flexGrid={ 3 }
                flexType='col'
                gap={ 2 }
                UnderBreakPointStyles={ {
                  _width: '100%'
                } }
              >
                <Box ssCardBox>
                  <Flex
                    ssCardBoxHeader
                    gap={ '1/2' }
                  >
                    { val_uniStatus.setInsuranceInfo ? <Input.Attachment.RequiredSign type /> : null } 住所
                  </Flex>
                  <Flex
                    flexType='col'
                    gap={ 1.5 }
                    padding={ 1.5 }
                  >
                    <Components.Body.Uni.Address
                      val_uniStatus={ val_uniStatus }
                      set_uniStatus={ set_uniStatus }
                    />
                  </Flex>
                </Box>

                { val_uniStatus.setInsuranceInfo ? <>
                  <Layout.TabBar
                    tabIndex={ val_tabIndex }
                    ssCardBox
                    position='sticky'
                    freeCSS={ {
                      top: -1,
                      zIndex: 2
                    } }
                    tabs={ [ '患者情報','健康保険','労災','自賠責','生活保護' ] }
                    onTabChange={ ( value ) => {
                      set_tabIndex( value );
                    } }
                  />
                </> : null }
                <Layout.PageViewController
                  viewIndex={ !val_uniStatus.setInsuranceInfo ? 0 : val_tabIndex }
                  views={ [
                    <Components.Body.Tabs.Basic._ />,
                    <Components.Body.Tabs.Insurance._ />,
                    <Components.Body.Tabs.Rosai._ />,
                    <Components.Body.Tabs.Jibai._ />,
                    <Components.Body.Tabs.Namapo._ />,
                  ] }
                  swipeOptions={ {
                    enable: false
                    // enable: true,
                    // mouseDrag : true
                  } }
                  wrapTemplate={ ( View ) => {
                    return (
                      <Flex
                        flexType='col'
                        gap={ 2 }
                        position='relative'
                        freeCSS={ {
                          zIndex: 1
                        } }
                        children={ View }
                      />
                    )
                  } }
                />
              </Flex>
            </Flex>
          </Layout.Plate>
        </Box>
      );
    },
    Basic: ( params: Atoms.BoxProps & {
      val_uniStatus: UniStatusParams
      set_uniStatus: React.Dispatch<React.SetStateAction<UniStatusParams>>
    } ) => {
      return (
        <Flex
          padding={ 0 }
          flexType="col"
          gap={ 1 }
          { ...params }
        >
          <Box
            flexCenter
            padding={ 1 }
          >
            <Input.Checker
              label={ '保険情報も併せて入力する' }
              value={ params.val_uniStatus.setInsuranceInfo }
              onUpdateValidValue={ ( { value } ) => {
                params.set_uniStatus( {
                  ...params.val_uniStatus,
                  setInsuranceInfo: value
                } );
              } }
              name='setInsuranceInfo'
              form={ formName }
            />
          </Box>
          <Input.Wrapper.Normal
            required
            label='フリガナ'
          >
            <Input.Text.Normal
              placeholder='フリガナ'
              backgroundColor='1.layer.base'
              name='kana'
              form={ formName }
              required
            />
          </Input.Wrapper.Normal>
          <Input.Wrapper.Normal
            label={ <>
              名前
              <FontAwesomeIcon
                iconStyle='solid'
                d="question-circle"
                fontColor='warn'
                ssTooltips={ {
                  children: <Box>
                    この項目は、その他アプリで検索・使用等される可能性があるため、
                    <br />
                    可能な限り通名で入力するようにしてください。
                  </Box>
                } }
              />
            </> }
            required={ params.val_uniStatus.setInsuranceInfo }
          >
            <Input.Text.Normal
              placeholder='名前'
              backgroundColor='1.layer.base'
              required={ params.val_uniStatus.setInsuranceInfo }
              name='name'
              form={ formName }
            />
          </Input.Wrapper.Normal>
          <Input.Wrapper.Normal
            required
            label='電話番号'
          >
            <Input.Text.Tel
              backgroundColor='1.layer.base'
              required
              name='tel1'
              form={ formName }
            />
          </Input.Wrapper.Normal>
          <Input.Wrapper.Normal
            required={ params.val_uniStatus.setInsuranceInfo }
            label='性別'
          >
            <Input.List.Radio.Border
              gap={ '1/2' }
              list={ [
                { value: 1,label: '男性' },
                { value: 2,label: '女性' },
                { value: 100,label: 'カスタム' }
              ] }
              required={ params.val_uniStatus.setInsuranceInfo }
              name='gender'
              form={ formName }
            />
          </Input.Wrapper.Normal>
          <Input.Wrapper.Normal
            required={ params.val_uniStatus.setInsuranceInfo }
            label='生年月日'
          >
            <Input.Time.DateWareki
              backgroundColor='1.layer.base'
              required={ params.val_uniStatus.setInsuranceInfo }
              defaultEra='year'
              name='birthday'
              form={ formName }
            />
          </Input.Wrapper.Normal>
        </Flex>
      );
    },
    Uni: {
      Address: ( params: {
        val_uniStatus: UniStatusParams
        set_uniStatus: React.Dispatch<React.SetStateAction<UniStatusParams>>
      } ) => {
        let [ val_postalCode,set_postalCode ] = useState( '' );
        let [ val_addr,set_addr ] = useState( '' );

        return (
          <>
            <Input.Wrapper.Row
              label='郵便番号'
            >
              <Input.Text.Postal
                override='force'
                value={ val_postalCode }
                onGeoCoding={ ( args ) => {
                  let {
                    postalCode,
                    addressArray,
                    location
                  } = args;

                  set_postalCode( postalCode );
                  set_addr( addressArray.join( '' ) );
                } }
                enableCurrentGeoCoding
                name='postalCode'
                form={ formName }
              />
            </Input.Wrapper.Row>
            <Input.Wrapper.Row
              label='住所'
              labelStyles={ {
                flexGrid: 1
              } }
            >
              <Input.Text.Normal
                override='force'
                value={ val_addr }
                placeholder='住所'
                wrapStyles={ {
                  flexGrid: 3
                } }
                name='addr1'
                form={ formName }
              />
            </Input.Wrapper.Row>
            <Input.Wrapper.Row
              label='建物名等'
              labelStyles={ {
                flexGrid: 1
              } }
            >
              <Input.Text.Normal
                placeholder='建物名等'
                wrapStyles={ {
                  flexGrid: 3
                } }
                name='addr2'
                form={ formName }
              />
            </Input.Wrapper.Row>
            <Buttons.Button.Border
              color='theme'
              borderWidth={ 2 }
              marginLeft={ 'auto' }
              onClick={ async ( event ) => {
                DrillDownAddressInputModalFN( {
                  callback: ( args ) => {
                    set_postalCode( args.postalCode || '' );
                    set_addr( args.address );
                  }
                } );
              } }
            >
              カスタム入力 <FontAwesomeIcon
                iconStyle='solid'
                d="arrow-up-right"
              />
            </Buttons.Button.Border>
          </>
        );
      },
      Address2: () => {
        let [ val_same,set_same ] = useState( true );

        let XtraRegion = <></>;
        if ( !val_same ) {
          // XtraRegion = <Components.Body.Uni.Address />
        }

        return (
          <Flex
            flexType='col'
            gap={ 1.5 }
          >
            <Input.Wrapper.Row
              label='【住所】'
              padding={ [ 1,0 ] }
            >
              <Input.Checker
                value={ val_same }
                label='基本情報と同じ'
                onUpdateValidValue={ ( { value } ) => {
                  set_same( !!value );
                } }
              />
            </Input.Wrapper.Row>
            { XtraRegion }
          </Flex>
        );
      },
      Name: () => {
        let [ val_same,set_same ] = useState( true );

        let XtraRegion = <></>;
        if ( !val_same ) {
          XtraRegion = <>
            <Input.Wrapper.Row
              label='フリガナ'
            >
              <Input.Text.Normal
                placeholder='フリガナ'
              />
            </Input.Wrapper.Row>
            <Input.Wrapper.Row
              label='名前'
            >
              <Input.Text.Normal
                placeholder='名前'
              />
            </Input.Wrapper.Row>
          </>;
        }

        return (
          <Flex
            flexType='col'
            gap={ 1.5 }
          >
            <Input.Wrapper.Row
              label='【名前】'
              padding={ [ 1,0 ] }
            >
              <Input.Checker
                value={ val_same }
                label='基本情報と同じ'
                onUpdateValidValue={ ( { value } ) => {
                  set_same( !!value );
                } }
              />
            </Input.Wrapper.Row>
            { XtraRegion }
          </Flex>
        );
      },
      verifyInsuranceAvailable: () => {
        // return false;
        return true;
      },
      DisabledCarte: () => {
        return (
          <Box
            ssCardBox
            padding={ 2 }
            textAlign='center'
            borderColor='warn'
          >
            <Box>
              <FontAwesomeIcon
                d='exclamation-triangle'
                iconStyle='regular'
              /> 保険情報を入力するには、別アプリ medipo カルテを有効にする必要があります。
            </Box>
            <Box
              padding={ 2 }
              flexCenter
            >
              <Buttons.Button.Prime>
                medipo カルテ を有効にする
              </Buttons.Button.Prime>
            </Box>
          </Box>
        );
      }
    },
    Tabs: {
      Basic: {
        _: () => ( <>
          <Components.Body.Tabs.Basic.Others />
          <Components.Body.Tabs.Basic.IDs />
          <Components.Body.Tabs.Basic.Memo />
        </> ),
        IDs: () => {
          let [ val_FelicaId,set_FelicaId ] = useState( '' );
          let accordionId = $.uuidGen();
          return (
            <>
              <Box ssCardBox>
                <Flex
                  ssCardBoxHeader
                  horizontalAlign='between'
                  verticalAlign='center'
                >
                  所持認証
                </Flex>
                <Flex
                  flexType='col'
                  ssCardBoxBody
                  gap={ 1 }
                >
                  <Box
                    flexCenter
                    gap={ 1.5 }
                    padding={ 1 }
                  >
                    <Buttons.Button.Sub
                      onClick={ () => {
                        FelicaReader( {
                          callback: ( params ) => {
                            if ( !params.valid ) return;
                            set_FelicaId( params.data.id );
                          }
                        } );
                      } }
                    >
                      ICカードを読み取る
                    </Buttons.Button.Sub>

                    <Buttons.Button.Sub>
                      マイナンバーカードを読み取る
                    </Buttons.Button.Sub>
                  </Box>
                  {
                    val_FelicaId ? <>
                      <br />
                      読み取ったID : { val_FelicaId }
                    </> : ''
                  }

                  <Flex
                    horizontalAlign='right'
                  >
                    <Buttons.Button.Border
                      size='S'
                      onClick={ () => {
                        Accordion.fn.toggle( accordionId );
                      } }
                    >
                      所持認証とは? <FontAwesomeIcon
                        iconStyle='solid'
                        d='angle-down'
                      />
                    </Buttons.Button.Border>
                  </Flex>
                  <Accordion
                    accordionId={ accordionId }
                  >
                    <Box>
                      お客様が所持しているマイナンバーカードまたは、交通系ICカードとmedipoの顧客情報の連携ができます。
                      <br />
                      連携ができると、カードを使用した来店受付ができるなど業務の効率化に役立ちます。
                      <br />
                      また、運営院が指定業者であれば、マイナンバーカードを使って国が保管している保険情報を抜き取れます。
                    </Box>
                    <Box
                      fontColor='nega'
                      fontSize='1.mini'
                    >
                      ※ 決済としての機能はご利用いただけません。
                    </Box>
                  </Accordion>
                </Flex>
              </Box>
            </>
          );
        },
        Others: () => {
          let [ val_visitReasons,set_visitReasons ] = useState( [] );
          useEffect( () => {
            $.fetch.post( {
              key: 'listVisitReason',
              url: '/visit-reason/list',
              trafficControl: 0
            },( result ) => {
              if ( !result.ok ) return;
              let List = result.body.list.map( ( li: any ) => {
                let {
                  id,name
                } = li;
                return {
                  value: id,
                  label: name
                }
              } );
              set_visitReasons( List );
            } );
          },[] );

          return (
            <>
              <Box ssCardBox>
                <Box ssCardBoxHeader>
                  その他情報
                </Box>
                <Flex
                  flexType='col'
                  gap={ 1 }
                  padding={ 1.5 }
                >
                  <Input.Wrapper.Row
                    label='顧客ID'
                    labelStyles={ {
                      flexGrid: 1
                    } }
                  >
                    <Input.Text.Normal
                      placeholder='顧客ID'
                      name='customID'
                      form={ formName }
                      onValidate={ async ( args ) => {
                        let Result: amotify.fn.Input.Validation.Result = {
                          ok: true,notice: []
                        }

                        await ( async () => {
                          if ( !args.value ) return;

                          let result = await $.fetch.post( {
                            key: 'checkCustomerID',
                            url: '/customer/check-id',
                            body: {
                              id: args.value
                            },
                            trafficControl: 0
                          } );
                          if ( !result.ok ) {
                            Result = {
                              ok: false,
                              notice: [ {
                                type: 'invalid',
                                label: '現在ご利用になれません'
                              } ]
                            }
                            return;
                          }
                          let exist = result.body.exist;
                          if ( exist.length ) {
                            Result = {
                              ok: false,
                              notice: [ {
                                type: 'invalid',
                                label: 'このIDはすでに使用されています'
                              } ]
                            }
                            return;
                          }
                          Result = {
                            ok: true,
                            notice: [ {
                              type: 'valid',
                              label: '使用可能です'
                            } ]
                          }
                        } )();

                        return Result;
                      } }
                      wrapStyles={ {
                        flexGrid: 3
                      } }
                    />
                  </Input.Wrapper.Row>
                  <Input.Wrapper.Row
                    label='来店理由'
                    labelStyles={ {
                      flexGrid: 1
                    } }
                  >
                    <Input.Select
                      list={ val_visitReasons }
                      form={ formName }
                      name='visitReasonId'
                      wrapStyles={ {
                        flexGrid: 3
                      } }
                    />
                  </Input.Wrapper.Row>
                  <Input.Wrapper.Row
                    label='電話番号②'
                    labelStyles={ {
                      flexGrid: 1
                    } }
                  >
                    <Input.Text.Tel
                      placeholder='電話番号②'
                      name='tel2'
                      form={ formName }
                      wrapStyles={ {
                        flexGrid: 3
                      } }
                    />
                  </Input.Wrapper.Row>
                  <Input.Wrapper.Normal
                    label='メールアドレス'
                  >
                    <Input.Text.Email
                      placeholder='メールアドレス'
                      name='email'
                      form={ formName }
                    />
                  </Input.Wrapper.Normal>
                </Flex>
              </Box>
            </>
          );
        },
        Memo: () => {
          return (
            <>
              <Box ssCardBox>
                <Box ssCardBoxHeader>
                  患者メモ
                </Box>
                <Flex
                  flexType='col'
                  gap={ 1 }
                  padding={ 1.5 }
                >
                  <Input.Wrapper.Normal
                    label='ラベル'
                  >
                    <Input.Chips
                      value={ [
                        { value: 0,label: 'Hello' },
                      ] }
                      optionGroups={ [
                        {
                          options: [
                            { value: 1,label: '優良',keyword: '優良' },
                            { value: 2,label: '新規',keyword: '新規' },
                            { value: 3,label: 'コネ',keyword: 'コネ' },
                            { value: 4,label: 'クレーマー',keyword: 'クレーマー' },
                            { value: 6,label: '超優良',keyword: '超優良' },
                            { value: 7,label: '超絶優良',keyword: '超絶優良' },
                            { value: 8,label: '劇良',keyword: '劇良' },
                          ]
                        }
                      ] }
                    />
                  </Input.Wrapper.Normal>
                  <Input.TextArea
                    placeholder='メモ'
                    rows={ 6 }
                    name='description'
                    form={ formName }
                  />
                </Flex>
              </Box>
            </>
          );
        },
      },
      Insurance: {
        _: () => {
          if ( !Components.Body.Uni.verifyInsuranceAvailable() ) {
            return (
              <Components.Body.Uni.DisabledCarte />
            );
          }
          return (
            <>
              <Components.Body.Tabs.Insurance.Insurer />
              <Components.Body.Tabs.Insurance.Insured />
              <Components.Body.Tabs.Insurance.IryoJosei />
              <Components.Body.Tabs.Insurance.Office />
            </>
          );
        },
        Insured: () => {
          let [ val_samer,set_samer ] = useState( true );

          let InsuredRegion = <></>;
          if ( !val_samer ) {
            InsuredRegion = <>
              <Input.Wrapper.Row
                label='フリガナ'
              >
                <Input.Text.Normal
                  placeholder='フリガナ'
                />
              </Input.Wrapper.Row>
              <Input.Wrapper.Row
                label='名前'
              >
                <Input.Text.Normal
                  placeholder='名前'
                />
              </Input.Wrapper.Row>
            </>;
          }

          return (
            <Box ssCardBox>
              <Box ssCardBoxHeader>
                被保険者
              </Box>
              <Flex
                flexType='col'
                gap={ 1.5 }
                padding={ 1.5 }
                borderBottom
              >
                <Input.Wrapper.Row
                  label='続柄'
                >
                  <Input.List.Radio.IconBorder
                    value={ val_samer }
                    list={ [
                      { value: true,label: '本人' },
                      { value: false,label: '家族' }
                    ] }
                    onUpdateValidValue={ ( { value } ) => {
                      set_samer( !!value[ 0 ] );
                    } }
                  />
                </Input.Wrapper.Row>
                { InsuredRegion }
                <Input.Wrapper.Row
                  label='保険期間'
                >
                  <Flex
                    flexType='col'
                    gap={ 1 }
                  >
                    <Input.Time.DateWareki
                      defaultEra='wareki'
                    />
                    <Input.Time.DateWareki
                      defaultEra='wareki'
                    />
                  </Flex>
                </Input.Wrapper.Row>
              </Flex>
              <Flex
                flexType='col'
                gap={ 1.5 }
                padding={ 1.5 }
              >
                <Components.Body.Uni.Name />
                <Components.Body.Uni.Address2 />
              </Flex>
            </Box>
          );
        },
        Insurer: () => {
          let [ val_insurance,set_insurance ] = useState( void 0 as any );
          let [ val_elder,set_elder ] = useState( false );

          let Content = <></>;
          if ( val_insurance ) {
            Content = <>
              <Flex flexWrap={ false }>
                <Input.Wrapper.Normal
                  label='記号'
                  flexGrid={ 4 }
                >
                  <Input.Text.Number
                    placeholder='記号'
                    borderBottomRightRadius={ 0 }
                    borderTopRightRadius={ 0 }
                    freeCSS={ {
                      marginRight: -1
                    } }
                  />
                </Input.Wrapper.Normal>
                <Input.Wrapper.Normal
                  label='番号'
                  flexGrid={ 2 }
                >
                  <Input.Text.Number
                    placeholder='番号'
                    borderRadius={ 0 }
                    _width={ 0 }
                    freeCSS={ {
                      marginRight: -1
                    } }
                  />
                </Input.Wrapper.Normal>
                <Input.Wrapper.Normal
                  label='枝番'
                  flexGrid={ 1 }
                >
                  <Input.Text.Number
                    placeholder='枝番'
                    _width={ 0 }
                    borderBottomLeftRadius={ 0 }
                    borderTopLeftRadius={ 0 }
                  />
                </Input.Wrapper.Normal>
              </Flex>
              <Box>【請求方法】</Box>
              <Flex
                flexWrap={ false }
                gap={ 1.5 }
                flexChilds='even'
              >
                <Input.Wrapper.Normal
                  label='柔整'
                >
                  <Input.Select
                    enableUnSelected={ false }
                    value={ 0 }
                    list={ [
                      { value: 0,label: '受領委任' },
                      { value: 1,label: '償還' },
                    ] }
                  />
                </Input.Wrapper.Normal>
                <Input.Wrapper.Normal
                  label='鍼・マッサージ'
                >
                  <Input.Select
                    enableUnSelected={ false }
                    value={ 0 }
                    list={ [
                      { value: 0,label: '受領委任' },
                      { value: 1,label: '償還' },
                    ] }
                  />
                </Input.Wrapper.Normal>
              </Flex>
              <Flex
                gap={ 1.5 }
                horizontalAlign='between'
              >
                <Box>
                  【負担割合】
                </Box>
                <Box>
                  3割
                </Box>
              </Flex>
            </>;
            if ( val_insurance.kouki ) {
              Content = <>
                <Flex flexWrap={ false }>
                  <Input.Wrapper.Normal
                    label='記号'
                    flexGrid={ 4 }
                  >
                    <Input.Text.Number
                      placeholder='記号'
                      borderBottomRightRadius={ 0 }
                      borderTopRightRadius={ 0 }
                      freeCSS={ {
                        marginRight: -1
                      } }
                    />
                  </Input.Wrapper.Normal>
                  <Input.Wrapper.Normal
                    label='番号'
                    flexGrid={ 2 }
                  >
                    <Input.Text.Number
                      placeholder='番号'
                      _width={ 0 }
                      borderBottomLeftRadius={ 0 }
                      borderTopLeftRadius={ 0 }
                      freeCSS={ {
                        marginRight: -1
                      } }
                    />
                  </Input.Wrapper.Normal>
                </Flex>
                <Input.Wrapper.Normal
                  label='被保険者番号'
                >
                  <Input.DigitCharacters
                    digits={ 8 }
                    combineInput
                  />
                </Input.Wrapper.Normal>
                <Input.Wrapper.Row
                  label='交付日'
                >
                  <Input.Time.DateWareki
                    defaultEra='wareki'
                  />
                </Input.Wrapper.Row>
                <Input.Wrapper.Row
                  label='負担割合'
                >
                  <Input.Select
                    enableUnSelected={ false }
                    value={ 2 }
                    list={ [
                      { value: 1,label: '1割' },
                      { value: 2,label: '2割' },
                    ] }
                  />
                </Input.Wrapper.Row>
              </>;
            }
          }

          return (
            <Box ssCardBox>
              <Box
                ssCardBoxHeader
                gap={ 1 }
              >
                保険者
              </Box>
              <Flex
                flexType='col'
                gap={ 1.5 }
                padding={ 1.5 }
              >
                <Input.Search
                  optionGroups={ [
                    {
                      options: [
                        {
                          value: {
                            id: 1,
                            kouki: false
                          },
                          keyword: '公費1',
                          label: <Flex
                            flexType='col'
                            gap={ '1/3' }
                          >
                            <Box>
                              健康保険1
                            </Box>
                            <Box
                              fontSize={ '1.mini' }
                              fontColor='4.thin'
                              lineHeight={ 0 }
                            >
                              〒164-0003
                              <br />
                              中野区東中野3-18-5 Timor Nakano203
                              <br />
                              柔整 : 受領委任
                              <br />
                              鍼マ : 償還
                            </Box>
                          </Flex>
                        },{
                          value: {
                            id: 2,
                            kouki: true
                          },
                          keyword: '公費2',
                          label: <Flex
                            flexType='col'
                            gap={ '1/3' }
                          >
                            <Box>
                              39から始まる保険
                            </Box>
                            <Box
                              fontSize={ '1.mini' }
                              fontColor='4.thin'
                              lineHeight={ 0 }
                            >
                              〒164-0003
                              <br />
                              中野区東中野3-18-5 Timor Nakano203
                              <br />
                              柔整 : 受領委任
                              <br />
                              鍼マ : 償還
                            </Box>
                          </Flex>
                        },{
                          value: {
                            id: 3,
                            kouki: false
                          },
                          keyword: '公費3',
                          label: <Flex
                            flexType='col'
                            gap={ '1/3' }
                          >
                            <Box>
                              健康保険2
                            </Box>
                            <Box
                              fontSize={ '1.mini' }
                              fontColor='4.thin'
                              lineHeight={ 0 }
                            >
                              〒164-0003
                              <br />
                              中野区東中野3-18-5 Timor Nakano203
                              <br />
                              柔整 : 受領委任
                              <br />
                              鍼マ : 償還
                            </Box>
                          </Flex>
                        }
                      ]
                    }
                  ] }
                  placeholder='名前、番号で検索'
                  appearances={ {
                    modalBottomSpace: <Flex
                      flexType='col'
                      gap={ '1/2' }
                      padding={ [ '1/2',1 ] }
                    >
                      <Buttons.Button.Sub
                        _width={ '100%' }
                        size='S'
                      >
                        新しく登録する <FontAwesomeIcon d="angle-right" />
                      </Buttons.Button.Sub>
                    </Flex>
                  } }
                  onUpdateValue={ ( { value } ) => {
                    set_insurance( value[ 0 ] );
                  } }
                />
                { Content }
              </Flex>
            </Box>
          );
        },
        IryoJosei: () => {
          let [ val_enable,set_enable ] = useState( false );
          let [ val_anotherEnable,set_anotherEnable ] = useState( false );

          let Content: ReactElement[] = [
            <Box
              padding={ 2 }
            >
              <Input.Checker
                value={ val_enable }
                label='併用する'
                fontSize={ '1.mini' }
                onUpdateValidValue={ ( { value } ) => {
                  set_enable( value );
                } }
              />
            </Box>
          ];

          const IryoJoseiCell = <>
            <Input.Wrapper.Row
              label='公費負担者'
            >
              <Input.Search
                optionGroups={ [
                  {
                    options: [
                      {
                        value: 1,
                        keyword: '公費1',
                        label: <Flex
                          flexType='col'
                          gap={ '1/3' }
                        >
                          <Box>
                            〇〇公費負担者1
                          </Box>
                          <Box
                            fontSize={ '1.mini' }
                            fontColor='4.thin'
                            lineHeight={ 0 }
                          >
                            〒164-0003
                            <br />
                            中野区東中野3-18-5 Timor Nakano203
                          </Box>
                        </Flex>
                      },{
                        value: 2,
                        keyword: '公費2',
                        label: <Flex
                          flexType='col'
                          gap={ '1/3' }
                        >
                          <Box>
                            〇〇公費負担者2
                          </Box>
                          <Box
                            fontSize={ '1.mini' }
                            fontColor='4.thin'
                            lineHeight={ 0 }
                          >
                            〒164-0003
                            <br />
                            中野区東中野3-18-5 Timor Nakano203
                          </Box>
                        </Flex>
                      },{
                        value: 3,
                        keyword: '公費3',
                        label: <Flex
                          flexType='col'
                          gap={ '1/3' }
                        >
                          <Box>
                            〇〇公費負担者3
                          </Box>
                          <Box
                            fontSize={ '1.mini' }
                            fontColor='4.thin'
                            lineHeight={ 0 }
                          >
                            〒164-0003
                            <br />
                            中野区東中野3-18-5 Timor Nakano203
                          </Box>
                        </Flex>
                      }
                    ]
                  }
                ] }
                placeholder='名称、負担者番号で検索'
                appearances={ {
                  modalBottomSpace: <Flex
                    flexType='col'
                    gap={ '1/2' }
                    padding={ [ '1/2',1 ] }
                  >
                    <Buttons.Button.Sub
                      _width={ '100%' }
                      size='S'
                    >
                      新しく登録する <FontAwesomeIcon d="angle-right" />
                    </Buttons.Button.Sub>
                  </Flex>
                } }
              />
            </Input.Wrapper.Row>
            <Input.Wrapper.Normal
              label='受給者番号'
            >
              <Input.DigitCharacters
                digits={ 11 }
                numericOnly
                combineInput
              />
            </Input.Wrapper.Normal>
            <Input.Wrapper.Row
              label='期間'
            >
              <Flex
                flexType='col'
                gap={ 1 }
              >
                <Input.Time.DateWareki
                  defaultEra='wareki'
                />
                <Input.Time.DateWareki
                  defaultEra='wareki'
                />
              </Flex>
            </Input.Wrapper.Row>
          </>;

          if ( val_enable ) {
            Content = [
              <>
                <Flex
                  flexType='col'
                  gap={ 1.5 }
                  padding={ 1.5 }
                >
                  <Box paddingBottom={ '1/2' }>
                    <FontAwesomeIcon d="stop" /> 一件目
                  </Box>
                  { IryoJoseiCell }
                </Flex>
              </>
            ];

            if ( val_anotherEnable ) {
              Content.push(
                <>
                  <Flex
                    flexType='col'
                    gap={ 1.5 }
                    padding={ 1.5 }
                    borderTop
                  >
                    <Flex
                      paddingBottom={ '1/2' }
                      horizontalAlign='between'
                      verticalAlign='center'
                    >
                      <Box>
                        <FontAwesomeIcon d="stop" /> 二件目
                      </Box>
                      <Buttons.Button.Clear
                        color='nega'
                        size='S'
                        onClick={ () => {
                          set_anotherEnable( false );
                        } }
                      >
                        削除 <FontAwesomeIcon d="trash-alt" />
                      </Buttons.Button.Clear>
                    </Flex>
                    { IryoJoseiCell }
                  </Flex>
                </>
              );
            } else {
              Content.push(
                <Buttons.Button.Sub
                  margin={ 1.5 }
                  onClick={ () => {
                    set_anotherEnable( true );
                  } }
                >
                  もう一件追加 <FontAwesomeIcon d="plus" />
                </Buttons.Button.Sub>
              );
            }
          }

          return (
            <>
              <Box ssCardBox>
                <Flex
                  ssCardBoxHeader
                  position='sticky'
                  positionTop={ 0 }
                  verticalAlign='center'
                  backgroundColor={ '1.layer.base' }
                >
                  <Box flexSizing={ 'auto' }>
                    医療助成
                  </Box>
                  { val_enable ? <>
                    <Buttons.Button.Clear
                      color='nega'
                      size='S'
                      onClick={ () => {
                        set_enable( false );
                        set_anotherEnable( false );
                      } }
                    >
                      取り消し <FontAwesomeIcon d="trash-alt" />
                    </Buttons.Button.Clear>
                  </> : null }
                </Flex>
                <Flex
                  ssCardBoxBody
                  flexType="col"
                  // gap={ 1 }
                  padding={ 0 }
                >
                  { Content }
                </Flex>
              </Box>
            </>
          );
        },
        Office: () => {
          return (
            <Box ssCardBox>
              <Flex
                ssCardBoxHeader
                position='sticky'
                positionTop={ 0 }
                verticalAlign='center'
                backgroundColor={ '1.layer.base' }
              >
                事業所
              </Flex>
              <Flex
                ssCardBoxBody
                flexType="col"
                gap={ 1 }
              >
                <Input.Wrapper.Row
                  label='事業所名'
                >
                  <Input.Text.Normal
                    placeholder='事業所名'
                  />
                </Input.Wrapper.Row>
                <Input.Wrapper.Row
                  label='郵便番号'
                >
                  <Input.Text.Postal
                  />
                </Input.Wrapper.Row>
                <Input.Wrapper.Row
                  label='住所'
                >
                  <Input.Text.Normal
                    placeholder='住所'
                  />
                </Input.Wrapper.Row>
                <Input.Wrapper.Row
                  label='建物名等'
                >
                  <Input.Text.Normal
                    placeholder='建物名等'
                  />
                </Input.Wrapper.Row>
              </Flex>
            </Box>
          );
        }
      },
      Rosai: {
        _: () => {
          if ( !Components.Body.Uni.verifyInsuranceAvailable() ) {
            return (
              <Components.Body.Uni.DisabledCarte />
            );
          }
          return (
            <>
              <Components.Body.Tabs.Rosai.Basic />
              <Components.Body.Tabs.Rosai.Others />
            </>
          );
        },
        Basic: () => {
          return (
            <Box ssCardBox>
              <Flex
                ssCardBoxBody
                flexType='col'
                gap={ 1.5 }
                padding={ 1.5 }
              >
                <Input.Wrapper.Row
                  label='労基署'
                >
                  <Input.Search
                    optionGroups={ [
                      {
                        options: [
                          {
                            value: 1,
                            keyword: '公費1',
                            label: <Flex
                              flexType='col'
                              gap={ '1/3' }
                            >
                              <Box>
                                〇〇労基署1
                              </Box>
                              <Box
                                fontSize={ '1.mini' }
                                fontColor='4.thin'
                                lineHeight={ 0 }
                              >
                                〒164-0003
                                <br />
                                中野区東中野3-18-5 Timor Nakano203
                              </Box>
                            </Flex>
                          },{
                            value: 2,
                            keyword: '公費2',
                            label: <Flex
                              flexType='col'
                              gap={ '1/3' }
                            >
                              <Box>
                                〇〇労基署2
                              </Box>
                              <Box
                                fontSize={ '1.mini' }
                                fontColor='4.thin'
                                lineHeight={ 0 }
                              >
                                〒164-0003
                                <br />
                                中野区東中野3-18-5 Timor Nakano203
                              </Box>
                            </Flex>
                          },{
                            value: 3,
                            keyword: '公費3',
                            label: <Flex
                              flexType='col'
                              gap={ '1/3' }
                            >
                              <Box>
                                〇〇労基署3
                              </Box>
                              <Box
                                fontSize={ '1.mini' }
                                fontColor='4.thin'
                                lineHeight={ 0 }
                              >
                                〒164-0003
                                <br />
                                中野区東中野3-18-5 Timor Nakano203
                              </Box>
                            </Flex>
                          }
                        ]
                      }
                    ] }
                    placeholder='名前、番号で検索'
                    appearances={ {
                      modalBottomSpace: <Flex
                        flexType='col'
                        gap={ '1/2' }
                        padding={ [ '1/2',1 ] }
                      >
                        <Buttons.Button.Sub
                          _width={ '100%' }
                          size='S'
                        >
                          新しく登録する <FontAwesomeIcon d="angle-right" />
                        </Buttons.Button.Sub>
                      </Flex>
                    } }
                  />
                </Input.Wrapper.Row>

                <Input.Wrapper.Normal
                  label='労働保険番号'
                >
                  <Input.DigitCharacters
                    digits={ 14 }
                    numericOnly
                    combineInput
                  />
                </Input.Wrapper.Normal>
                <Input.Wrapper.Row
                  label='事業所名'
                >
                  <Input.Text.Normal
                    placeholder='事業所名'
                  />
                </Input.Wrapper.Row>
                <Input.Wrapper.Row
                  label='住所'
                >
                  <Input.Text.Normal
                    placeholder='住所'
                  />
                </Input.Wrapper.Row>

                <Input.Wrapper.Row
                  label='代表者'
                >
                  <Input.Text.Normal
                    placeholder='代表者'
                  />
                </Input.Wrapper.Row>
                <Input.Wrapper.Row
                  label='電話番号'
                >
                  <Input.Text.Tel
                  />
                </Input.Wrapper.Row>
              </Flex>
            </Box>
          );
        },
        Others: () => {
          return (
            <Box ssCardBox>
              <Box ssCardBoxHeader>
                その他
              </Box>
              <Flex
                ssCardBoxBody
                flexType='col'
                gap={ 1.5 }
                padding={ 1.5 }
              >
                <Components.Body.Uni.Name />
                <Components.Body.Uni.Address2 />
                <Input.Wrapper.Normal
                  label='摘要欄'
                >
                  <Input.TextArea
                    rows={ 8 }
                  />
                </Input.Wrapper.Normal>
              </Flex>
            </Box>
          );
        }
      },
      Jibai: {
        _: () => {
          if ( !Components.Body.Uni.verifyInsuranceAvailable() ) {
            return (
              <Components.Body.Uni.DisabledCarte />
            );
          }
          return (
            <>
              <Components.Body.Tabs.Jibai.Top />
              <Components.Body.Tabs.Jibai.Company />
              <Components.Body.Tabs.Jibai.Prices />
              <Components.Body.Tabs.Jibai.Others />
            </>
          );
        },
        Top: () => {
          let [ val_conbine,set_conbine ] = useState( false );

          let Content = <></>;
          if ( val_conbine ) {
            Content = <>
              <Input.Wrapper.Row
                label='保険会社請求分'
              >
                <Input.Select
                  value={ 0 }
                  enableUnSelected={ false }
                  list={ [
                    { value: 0,label: '文書料のみ' },
                    { value: 1,label: '文書料 + 一部負担金' }
                  ] }
                />
              </Input.Wrapper.Row>
            </>;
          }

          return (
            <Box ssCardBox>
              <Flex
                flexType='col'
                ssCardBoxBody
                gap={ 1.5 }
                padding={ 1.5 }
              >
                <Input.Wrapper.Row
                  label='健康保険と併用する'
                >
                  <Input.Switch
                    value={ val_conbine }
                    onUpdateValidValue={ ( { value } ) => {
                      set_conbine( value );
                    } }
                  />
                </Input.Wrapper.Row>
                { Content }
              </Flex>
            </Box>
          );
        },
        Company: () => {
          return (
            <Box ssCardBox>
              <Box ssCardBoxHeader>
                保険会社
              </Box>
              <Flex
                flexType='col'
                ssCardBoxBody
                gap={ 1.5 }
                padding={ 1.5 }
              >
                <Flex gap={ 1.5 }>
                  <Input.Wrapper.Normal
                    label='コード'
                  >
                    <Input.DigitCharacters
                      digits={ 3 }
                      numericOnly
                      combineInput
                      freeCSS={ {
                        width: 12 * 3
                      } }
                    />
                  </Input.Wrapper.Normal>
                  <Input.Wrapper.Normal
                    label='名称'
                    flexSizing={ 'auto' }
                  >
                    <Input.Text.Normal
                      placeholder='名称'
                    />
                  </Input.Wrapper.Normal>
                </Flex>
                <Box>
                  【支店情報】
                </Box>
                <Flex gap={ 1.5 }>
                  <Input.Wrapper.Normal
                    label='コード'
                  >
                    <Input.DigitCharacters
                      digits={ 3 }
                      numericOnly
                      combineInput
                      freeCSS={ {
                        width: 12 * 3
                      } }
                    />
                  </Input.Wrapper.Normal>
                  <Input.Wrapper.Normal
                    label='名称'
                    flexSizing={ 'auto' }
                  >
                    <Input.Text.Normal
                      placeholder='名称'
                    />
                  </Input.Wrapper.Normal>
                </Flex>

                <Input.Wrapper.Row
                  label='部署名'
                >
                  <Input.Text.Normal
                    placeholder='部署名'
                  />
                </Input.Wrapper.Row>
                <Input.Wrapper.Row
                  label='担当者'
                >
                  <Input.Text.Normal
                    placeholder='担当者'
                  />
                </Input.Wrapper.Row>
                <Input.Wrapper.Row
                  label='電話番号'
                >
                  <Input.Text.Tel
                  />
                </Input.Wrapper.Row>
              </Flex>
            </Box>
          );
        },
        Prices: () => {
          return (
            <Box ssCardBox>
              <Box ssCardBoxHeader>
                料金
              </Box>
              <Flex
                flexType='col'
                ssCardBoxBody
                gap={ 1.5 }
                padding={ 1.5 }
              >
                <Input.Wrapper.Row
                  label='柔整'
                >
                  <Input.Text.DigitNumber
                    placeholder={ '柔整' }
                    rightIndicator={
                      <Input.Attachment.RightIndicator>
                        円
                      </Input.Attachment.RightIndicator>
                    }
                  />
                </Input.Wrapper.Row>
                <Input.Wrapper.Row
                  label='鍼灸'
                >
                  <Input.Text.DigitNumber
                    placeholder={ '鍼灸' }
                    rightIndicator={
                      <Input.Attachment.RightIndicator>
                        円
                      </Input.Attachment.RightIndicator>
                    }
                  />
                </Input.Wrapper.Row>
                <Input.Wrapper.Row
                  label='マッサージ'
                >
                  <Input.Text.DigitNumber
                    placeholder={ 'マッサージ' }
                    rightIndicator={
                      <Input.Attachment.RightIndicator>
                        円
                      </Input.Attachment.RightIndicator>
                    }
                  />
                </Input.Wrapper.Row>
              </Flex>
            </Box>
          );
        },
        Others: () => {
          return (
            <Box ssCardBox>
              <Box ssCardBoxHeader>
                その他
              </Box>
              <Flex
                ssCardBoxBody
                flexType='col'
                gap={ 1.5 }
                padding={ 1.5 }
              >
                <Components.Body.Uni.Name />
                <Components.Body.Uni.Address2 />
                <Input.Wrapper.Normal
                  label='摘要欄'
                >
                  <Input.TextArea
                    rows={ 8 }
                  />
                </Input.Wrapper.Normal>
              </Flex>
            </Box>
          );
        },
      },
      Namapo: {
        _: () => {
          if ( !Components.Body.Uni.verifyInsuranceAvailable() ) {
            return (
              <Components.Body.Uni.DisabledCarte />
            );
          }
          return (
            <>
              <Components.Body.Tabs.Namapo.Basic />
              <Components.Body.Tabs.Namapo.Others />
            </>
          );
        },
        Basic: () => {
          return (
            <Box ssCardBox>
              <Flex
                flexType='col'
                gap={ 1.5 }
                padding={ 1.5 }
              >
                <Input.Wrapper.Row
                  label='福祉事務局'
                >
                  <Input.Search
                    optionGroups={ [
                      {
                        options: [
                          {
                            value: 1,
                            keyword: '公費1',
                            label: <Flex
                              flexType='col'
                              gap={ '1/3' }
                            >
                              <Box>
                                〇〇福祉事務所1
                              </Box>
                              <Box
                                fontSize={ '1.mini' }
                                fontColor='4.thin'
                                lineHeight={ 0 }
                              >
                                〒164-0003
                                <br />
                                中野区東中野3-18-5 Timor Nakano203
                              </Box>
                            </Flex>
                          },{
                            value: 2,
                            keyword: '公費2',
                            label: <Flex
                              flexType='col'
                              gap={ '1/3' }
                            >
                              <Box>
                                〇〇福祉事務所1
                              </Box>
                              <Box
                                fontSize={ '1.mini' }
                                fontColor='4.thin'
                                lineHeight={ 0 }
                              >
                                〒164-0003
                                <br />
                                中野区東中野3-18-5 Timor Nakano203
                              </Box>
                            </Flex>
                          },{
                            value: 3,
                            keyword: '公費3',
                            label: <Flex
                              flexType='col'
                              gap={ '1/3' }
                            >
                              <Box>
                                〇〇福祉事務所1
                              </Box>
                              <Box
                                fontSize={ '1.mini' }
                                fontColor='4.thin'
                                lineHeight={ 0 }
                              >
                                〒164-0003
                                <br />
                                中野区東中野3-18-5 Timor Nakano203
                              </Box>
                            </Flex>
                          }
                        ]
                      }
                    ] }
                    placeholder='名称、事務所番号で検索'
                    appearances={ {
                      modalBottomSpace: <Flex
                        flexType='col'
                        gap={ '1/2' }
                        padding={ [ '1/2',1 ] }
                      >
                        <Buttons.Button.Sub
                          _width={ '100%' }
                          size='S'
                        >
                          新しく登録する <FontAwesomeIcon d="angle-right" />
                        </Buttons.Button.Sub>
                      </Flex>
                    } }
                  />
                </Input.Wrapper.Row>
                <Input.Wrapper.Row
                  label='電話番号'
                >
                  <Input.Text.Tel
                  />
                </Input.Wrapper.Row>
                <Input.Wrapper.Row
                  label='担当者名'
                >
                  <Input.Text.Normal
                    placeholder='担当者名'
                  />
                </Input.Wrapper.Row>
              </Flex>
            </Box>
          );
        },
        Others: () => {
          return (
            <Box ssCardBox>
              <Box ssCardBoxHeader>
                その他
              </Box>
              <Flex
                ssCardBoxBody
                flexType='col'
                gap={ 1.5 }
                padding={ 1.5 }
              >
                <Components.Body.Uni.Name />
                <Components.Body.Uni.Address2 />
                <Input.Wrapper.Normal
                  label='摘要欄'
                >
                  <Input.TextArea
                    rows={ 8 }
                  />
                </Input.Wrapper.Normal>
              </Flex>
            </Box>
          );
        }
      }
    }
  },
}

export const CustomeCreate: FNC<{}> = () => {
  return (
    <Flex
      flexType='col'
      _height='contentHeight'
    >
      <Components.Header />
      <Components.Body._ />
    </Flex>
  );
}