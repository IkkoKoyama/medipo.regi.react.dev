const {
  glob: {
    React: {
      useState,
      useEffect,
      useRef
    }
  },
  atoms: {
    Box,
    Flex,
    FontAwesomeIcon,
    Span,
    Grid,
    Placeholder
  },
  mols: {
    Accordion,
    List
  },
  fn: {
    Buttons,
    Input,
    Layout,
    Table,
    Modal,
    Loader
  }
} = amotify;

import style from './style.module.scss';

type MenuParams = {
  id: number
  uuid: string
  groupId: number
  storeId: number
  name: string
  type: number
}
type MenuSeedParams = {
  id: number
  uuid: string
  menuId: number
  name: string
  price: number
  priceType: number
  taxType: number
  treatMinutes: number
}
type DefParam = {
  incognitor: boolean
  menus: MenuParams[]
  seeds: MenuSeedParams[]
  visitor: {
    visitId: number
    visitUuid: string
    arriveDate: string
    arriveTime: string

    viaType: number
    visitPhase: number

    customerId: number
    customerUuid: string
    kana: string
    name: string
    gender: number
    birthday: string
    age: string
    preData: string
  }

  selectedMenus: {

  }[]
}
type DefParams = {
  val_def: DefParam
  set_def: React.Dispatch<React.SetStateAction<DefParam>>
}


type SelectedMenuParams = AppTypes.OrderSelectedMenuTypes

type UpdateMenuListFNsParams = {
  modify( params: SelectedMenuParams[] ): void
  addMenu( params: SelectedMenuParams ): void
  updateMenu( params: SelectedMenuParams ): void
  deleteMenu( id: string ): void
}
type UniParam = {
  SelectedList: SelectedMenuParams[]
}
type UniParams = {
  val_uniStatus: UniParam
  set_uniStatus: React.Dispatch<React.SetStateAction<UniParam>>
  UpdateMenuListFNs: UpdateMenuListFNsParams
}

let localStorageKey = {
  selectMenuTabIndex: 'payment/order/selectMenu/tabIndex',
  selectMenuDisplayType: 'payment/order/selectMenu/displayType',
  selectedMenuFooterSummary: 'payment/order/selectedMenu/footerSummary'
}

let inmemorySelectedMenus: SelectedMenuParams[] = [];
let isPaymentCompleted = false;

const Components = {
  Header: ( params: DefParams ) => {
    let {
      val_def
    } = params;

    let openTradeDetails = () => {
      let modalId = 'tradeDetails';
      Modal.open( {
        modalId,
        type: 'right',
        size: 'MAX',
        content: <>
          <Modal.Attachment.Header
            horizontalAlign='between'
          >
            取引情報の詳細
            <Buttons.Button.Clear
              onClick={ () => {
                Modal.close.pin( modalId );
              } }
            >
              <FontAwesomeIcon
                iconStyle='regular'
                d='angle-left'
              /> 閉じる
            </Buttons.Button.Clear>
          </Modal.Attachment.Header>
          <Modal.Attachment.Body>
            <Flex
              flexType='col'
              gap={ 1.5 }
            >
              <Flex
                gap={ 1.5 }
              >
                <Box
                  ssCardBox
                  flexSizing={ 0 }
                >
                  <Box
                    ssCardBoxHeader
                  >
                    概要
                  </Box>
                  <List
                    padding={ 1 }
                    rowStyles={ {
                      flexWrap: false,
                      gap: 1,
                      padding: [ 1,0 ],
                      borderBottom: true
                    } }
                    rows={ [
                      {
                        children: <>
                          <Box
                            flexGrid={ 1 }
                            textAlign='right'
                          >
                            取引ID
                          </Box>
                          <Box flexGrid={ 3 }>
                            {/* { params. } */ }
                            fvdsbfg
                          </Box>
                        </>
                      },{
                        children: <>
                          <Box
                            flexGrid={ 1 }
                            textAlign='right'
                          >
                            取引日
                          </Box>
                          <Box flexGrid={ 3 }>
                            { $.Time().toFormatYMD() }
                          </Box>
                        </>
                      },{
                        children: <>
                          <Box
                            flexGrid={ 1 }
                            textAlign='right'
                          >
                            店舗名
                          </Box>
                          <Box flexGrid={ 3 }>
                            〇〇店舗
                          </Box>
                        </>
                      }
                    ] }
                  />
                </Box>
                <Box ssCardBox>
                  <Box
                    ssCardBoxHeader
                  >
                    顧客情報
                  </Box>
                  <Box ssCardBoxBody>
                    <Components.CustomerRegion />
                  </Box>
                </Box>
              </Flex>
              <Box
                ssCardBox
              >
                <Box ssCardBoxHeader>
                  その他
                </Box>
                <Flex
                  ssCardBoxBody
                  flexType='col'
                  gap={ 1 }
                >
                  <Flex
                    horizontalAlign='between'
                    verticalAlign='center'
                    backgroundColor='1.layer.base'
                  >
                    <Box>
                      来店経由
                    </Box>
                    <Box>
                      <Input.Select
                        list={ [
                          { value: 1,label: '来店動機-A' },
                          { value: 2,label: '来店動機-B' },
                          { value: 3,label: '来店動機-C' },
                          { value: 4,label: '来店動機-D' }
                        ] }
                      />
                    </Box>
                  </Flex>
                  <Flex
                    horizontalAlign='between'
                    verticalAlign='center'
                    backgroundColor='1.layer.base'
                  >
                    <Box>
                      来店時間
                    </Box>
                    <Box>
                      <Input.Time.Clock
                        freeCSS={ {
                          maxWidth: 12 * 6
                        } }
                      />
                    </Box>
                  </Flex>

                  <Flex
                    flexType='col'
                    gap='1/2'
                    backgroundColor='1.layer.base'
                  >
                    <Box>
                      ラベル
                    </Box>
                    <Input.Chips
                      optionGroups={ [
                        {
                          options: [
                            { value: 1,label: 'ラベル-A',keyword: 'ラベル-A' },
                            { value: 2,label: 'ラベル-B',keyword: 'ラベル-B' },
                            { value: 3,label: 'ラベル-C',keyword: 'ラベル-C' },
                            { value: 4,label: 'ラベル-D',keyword: 'ラベル-D' },
                          ]
                        }
                      ] }
                    />
                  </Flex>
                  <Input.TextArea
                    placeholder='メモ'
                  />
                </Flex>
              </Box>
            </Flex>
          </Modal.Attachment.Body>
        </>
      } );
    }

    return (
      <Flex
        flexWrap={ false }
        gap={ 1 }
        padding={ '1/2' }
        borderBottom
        horizontalAlign='between'
        backgroundColor='1.layer.base'
        verticalAlign='center'
      >
        <Buttons.Anchor.Clear
          fontSize={ '3.paragraph' }
          flexCenter
          href='/'
          ssEffectsOnActive='ripple.theme'
        >
          <FontAwesomeIcon
            iconStyle='solid'
            d="chevron-left"
          /> 受付
        </Buttons.Anchor.Clear>
        <Flex
          gap={ '1/2' }
          verticalAlign='center'
        >
          <Box
            fontSize='4.thirdTitle'
            fontWeight='3.bold'
          >
            { val_def.incognitor ? '伝票作成' : 'ご注文入力' }
          </Box>
          <Box
            lineHeight={ 0 }
          >
            { val_def.visitor.arriveDate }
          </Box>
          <Buttons.Button.Normal
            borderRadius={ 'sphere' }
            onClick={ ( event ) => {
              let modalId = 'paymentSettingModal';
              Modal.open( {
                modalId: modalId,
                type: 'free',
                gravityPoint: 16,
                parent: event.currentTarget,
                children: <Flex
                  backgroundColor='1.layer.base'
                  ssCardBox
                  padding={ 1 }
                  flexType='col'
                  gap='1/2'
                  boxShadow={ 1 }
                >
                  <Buttons.Button.Clear
                    fontColor='2.normal'
                  >
                    <FontAwesomeIcon
                      d='question-circle'
                    /> お会計のチュートリアル
                  </Buttons.Button.Clear>
                  <Buttons.Button.Sub
                    color='nega'
                  >
                    <FontAwesomeIcon
                      d='trash-alt'
                    /> 伝票を削除
                  </Buttons.Button.Sub>
                </Flex>
              } );
            } }
          >
            <FontAwesomeIcon
              iconStyle='regular'
              d='gear'
              fontColor='4.thin'
            />
          </Buttons.Button.Normal>
        </Flex>
        <Buttons.Button.Border
          padding={ '1/2' }
          onClick={ () => {
            openTradeDetails();
          } }
        >
          <Flex
            flexWrap={ false }
            gap={ '1/2' }
          >
            { val_def.incognitor ? <FontAwesomeIcon
              iconStyle='solid'
              fontColor='warn'
              d='exclamation-triangle'
              fontSize={ '3.paragraph' }
            /> : null }
            <Box
              textAlign='left'
            >
              { val_def.incognitor ? '来店情報' : <>
                <Box
                  lineHeight={ 0 }
                  fontSize={ '3.paragraph' }
                >
                  { val_def.visitor.kana || '--' }様
                </Box>
                <Box
                  fontSize='1.mini'
                  fontColor='3.blur'
                >
                  来店 : { val_def.visitor.arriveTime }
                </Box>
              </> }
            </Box>
            <FontAwesomeIcon
              fontSize={ '3.paragraph' }
              iconStyle='regular'
              d='angle-right'
            />
          </Flex>
        </Buttons.Button.Border>
      </Flex>
    );
  },
  Body: ( params: DefParams ) => {
    let DefaultMenuList: SelectedMenuParams[] = [];
    if ( params.val_def.visitor.preData ) {
      let JSON_data = $.toJson( params.val_def.visitor.preData );
      if ( JSON_data.ok ) {
        DefaultMenuList = JSON_data.body;
      }
    }

    let DefaultUniParams: UniParam = {
      SelectedList: DefaultMenuList
    }
    let [ val_uniStatus,set_uniStatus ] = useState( DefaultUniParams );

    useEffect( () => {
      inmemorySelectedMenus = DefaultMenuList;
    },[] );

    const UpdateMenuListFNs: UpdateMenuListFNsParams = {
      modify: ( newList: SelectedMenuParams[] ) => {
        inmemorySelectedMenus = newList;

        set_uniStatus( {
          ...val_uniStatus,
          SelectedList: newList
        } );
      },
      addMenu: async ( params: SelectedMenuParams ) => {
        let newList = [
          ...val_uniStatus.SelectedList,
          params
        ];
        UpdateMenuListFNs.modify( newList );
      },
      updateMenu: ( params: SelectedMenuParams ) => {
        let Index = val_uniStatus.SelectedList.findIndex( ( li ) => li.id == params.id );
        if ( Index != -1 ) {
          let newList = [ ...val_uniStatus.SelectedList ];
          newList[ Index ] = params;

          UpdateMenuListFNs.modify( newList );
        }
      },
      deleteMenu: ( id ) => {
        let Index = val_uniStatus.SelectedList.findIndex( ( li ) => li.id == id );
        if ( Index != -1 ) {
          let newList = [ ...val_uniStatus.SelectedList ];
          newList.splice( Index,1 );

          UpdateMenuListFNs.modify( newList );
        }
      }
    }

    return (
      <Flex
        flexSizing={ 0 }
        flexWrap={ false }
        overflow='auto'
        className={ style.Body }
      >
        <Components.LeftRegion._
          val_uniStatus={ val_uniStatus }
          set_uniStatus={ set_uniStatus }
          UpdateMenuListFNs={ UpdateMenuListFNs }
          { ...params }
        />
        <Components.RightRegion._
          val_uniStatus={ val_uniStatus }
          set_uniStatus={ set_uniStatus }
          UpdateMenuListFNs={ UpdateMenuListFNs }
          { ...params }
        />
      </Flex>
    );
  },
  Variables: {
    TenKeyCell: ( params: {
      data: string
      label?: ReactElement
      callback: {
        ( data: string ): void
      }
    } ) => {
      return (
        <Buttons.Button.Border
          fontSize='4.thirdTitle'
          padding={ '3/4' }
          borderRadius='1.tone.primary'
          ssEffectsOnActive='shrink'
          onClick={ () => {
            params.callback( params.data );
          } }
          children={ params.label || params.data }
        />
      );
    }
  },

  LeftRegion: {
    _: ( params: DefParams & UniParams ) => {
      let [ val_tabIndex,set_tabIndex ] = useState( Number( localStorage.getItem( localStorageKey.selectMenuTabIndex ) ) | 0 );
      useEffect( () => {
        localStorage.setItem( localStorageKey.selectMenuTabIndex,String( val_tabIndex ) );
      },[ val_tabIndex ] );

      const reloadMenuList = () => {
        $.fetch.post( {
          key: 'orderListMenu',
          url: '/order/get-menus'
        },( result ) => {
          if ( !result.ok ) return;
          params.set_def( {
            ...params.val_def,
            ...result.body
          } );
        } );
      }

      return (
        <Flex
          flexSizing={ 0 }
          _width={ 0 }
          borderRight
          overflow='auto'
          UnderBreakPointStyles={ {
            display: 'none'
          } }
          flexType='col'
        >
          <Components.LeftRegion.Header
            val_tabIndex={ val_tabIndex }
            set_tabIndex={ set_tabIndex }
            reloadMenuList={ reloadMenuList }
            { ...params }
          />
          <Components.LeftRegion.Body
            val_tabIndex={ val_tabIndex }
            set_tabIndex={ set_tabIndex }
            { ...params }
          />
        </Flex>
      );
    },
    Header: ( params: DefParams & UniParams & {
      reloadMenuList: Function
      val_tabIndex: number
      set_tabIndex: React.Dispatch<React.SetStateAction<number>>
    } ) => {
      return (
        <Flex
          flexSizing={ 'none' }
          freeCSS={ {
            zIndex: 3,
            pointerEvents: 'none'
          } }
          position='sticky'
          positionTop={ 0 }
          padding={ [ 1,1.5 ] }
          verticalAlign='center'
        >
          <Input.Segmented.ThemeBorder
            name='SwitchList1'
            backgroundColor='1.layer.base'
            boxShadow={ 2 }
            freeCSS={ {
              pointerEvents: 'all'
            } }
            value={ params.val_tabIndex }
            override='force'
            list={ [
              {
                value: 0,label: <Box>
                  <FontAwesomeIcon d="square-list" /> 商品
                </Box>
              },{
                value: 1,label: <Box>
                  <FontAwesomeIcon d="hand-heart" /> 保険
                </Box>
              },{
                value: 2,label: <Box>
                  <FontAwesomeIcon d="calculator" /> カスタム商品
                </Box>
              }
            ] }
            onUpdateValidValue={ ( args ) => {
              let Index = args.value[ 0 ];
              params.set_tabIndex( Index );
            } }
          />
          <Box flexSizing={ 'auto' } />
          <Buttons.Button.Border
            size='S'
            gap={ '1/2' }
            freeCSS={ {
              pointerEvents: 'all'
            } }

            backgroundColor='1.layer.base'
            ssTooltips={ {
              children: 'メニューを再取得'
            } }
            ssMiniLoader={ { color: 'theme' } }
            onClick={ () => {
              params.reloadMenuList();
            } }
          >
            <FontAwesomeIcon
              iconStyle='solid'
              d="rotate-right"
            /> 再取得
          </Buttons.Button.Border>
        </Flex>
      );
    },
    Body: ( params: DefParams & UniParams & {
      val_tabIndex: number
      set_tabIndex: React.Dispatch<React.SetStateAction<number>>
    } ) => {
      return (
        <Box
          flexSizing={ 0 }
          position='relative'
          freeCSS={ {
            zIndex: 1
          } }
        >
          <Layout.PageViewController
            minHeight={ '100%' }
            viewIndex={ params.val_tabIndex }
            swipeOptions={ {
              enable: true,
              mouseDrag: true,
              onSlide: ( index ) => {
                params.set_tabIndex( index );
              }
            } }
            wrapTemplate={ ( view ) => {
              return (
                <Box
                  padding={ 1.5 }
                  overflow='auto'
                >
                  { view }
                </Box>
              )
            } }
            views={ [
              <Components.LeftRegion.TabContents.Products._ { ...params } />,
              <Components.LeftRegion.TabContents.Insurances />,
              <Components.LeftRegion.TabContents.CustomMenu
                UpdateMenuListFNs={ params.UpdateMenuListFNs }
              />
            ] }
          />
        </Box>
      );
    },
    TabContents: {
      Products: {
        _: ( params: DefParams & UniParams ) => {
          let [ val_displayType,set_displayType ] = useState( Number( localStorage.getItem( localStorageKey.selectMenuDisplayType ) || 1 ) );

          useEffect( () => {
            localStorage.setItem( localStorageKey.selectMenuDisplayType,String( val_displayType ) );
          },[ val_displayType ] );

          return (
            <Flex
              flexType="col"
              gap={ 2 }
            >
              <Components.LeftRegion.TabContents.Products.Console
                val_displayType={ val_displayType }
                set_displayType={ set_displayType }
              />
              <Components.LeftRegion.TabContents.Products.Body
                { ...params }
                val_displayType={ val_displayType }
                set_displayType={ set_displayType }
              />
            </Flex>
          );
        },
        Console: ( params: {
          val_displayType: number
          set_displayType: React.Dispatch<React.SetStateAction<number>>
        } ) => {
          return (
            <Flex
              horizontalAlign='between'
              verticalAlign='bottom'
              gap={ 1 }
            >
              <Flex
                gap={ 1 }
              >
                <Input.Select
                  name='SwitchList2'
                  value={ 0 }
                  enableUnSelected={ false }
                  list={ [
                    { value: 0,label: '全て' },
                    { value: 1,label: '施術' },
                    { value: 2,label: '物販' },
                    { value: 3,label: '回数券' },
                    { value: 4,label: 'その他' }
                  ] }
                />
                <Input.Text.Normal
                  placeholder="検索"
                  paddingRight={ 3 }
                  rightIcon={
                    <Input.Attachment.RightIcon>
                      <FontAwesomeIcon
                        iconStyle='solid'
                        d="search"
                      />
                    </Input.Attachment.RightIcon>
                  }
                />
              </Flex>
              <Flex gap={ '1/2' }>
                <Input.Segmented.ThemeCloud
                  borderRadius={ '3.tone.tertiary' }
                  cellStyles={ {
                    padding: [ '1/2','3/4' ]
                  } }
                  name='SwitchList2'
                  value={ params.val_displayType }
                  onUpdateValidValue={ ( { value } ) => {
                    params.set_displayType( value[ 0 ] );
                  } }
                  list={ [
                    {
                      value: 1,label: <Box>
                        <FontAwesomeIcon
                          iconStyle='regular'
                          d="table-cells"
                        />
                      </Box>
                    },{
                      value: 2,label: <Box>
                        <FontAwesomeIcon
                          iconStyle='regular'
                          d="bars"
                        />
                      </Box>
                    }
                  ] }
                />
              </Flex>
            </Flex>
          );
        },
        Body: ( params: DefParams & UniParams & {
          val_displayType: number
          set_displayType: React.Dispatch<React.SetStateAction<number>>
        } ) => {
          let {
            menus,
            seeds
          } = params.val_def;

          let MenuCells: ReactElement[] = [];
          menus.forEach( ( menu ) => {
            let {
              id,
              type
            } = menu;

            let menuSeeds = seeds.filter( ( seed ) => seed.menuId == id );
            if ( !menuSeeds.length ) return;
            MenuCells.push( <Components.LeftRegion.SelectMenuCell
              displayType={ params.val_displayType }
              menu={ menu }
              seeds={ menuSeeds }
              onclick={ ( seed ) => {
                params.UpdateMenuListFNs.addMenu( {
                  id: 'Type_10X-' + menu.id + '-' + seed.id,
                  type: 100 + type,
                  name: [
                    menu.name,
                    seed.name
                  ].join( ' - ' ),
                  typeId: seed.id,
                  price: seed.price,
                  priceType: seed.priceType,
                  taxType: seed.taxType,
                  treatMinutes: seed.treatMinutes,
                  quantity: 1
                } );
              } }
            /> );
          } );

          if ( params.val_displayType == 1 ) {
            return (
              <Grid
                gap={ 1 }
                className={ style.SelectMenuGridCells }
                children={ MenuCells }
              />
            );
          }
          return (
            <Flex
              flexType='col'
              ssLastChildLossBorder='bottom'
              children={ MenuCells }
            />
          );
        }
      },
      Insurances: () => {
        return (
          <Box
            padding={ 2 }
          >
            <Box
              textAlign='center'
            >
              medipo カルテとの連携が確認できないため、保険メニューを選択することができません。
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
      },
      CustomMenu: ( params: {
        UpdateMenuListFNs: UpdateMenuListFNsParams
      } ) => {
        let formName = 'formAddCustomMenu';
        let [ val_price,set_price ] = useState( 0 );
        let [ val_priceType,set_priceType ] = useState( 1 );
        let [ val_plus,set_plus ] = useState( true );

        const modifyPriceFN = ( value: string ) => {
          value = value || '';
          if ( value == 'backspace' ) {
            set_price( 0 );
          } else {
            let newValue = String( val_price ) + String( value );
            set_price( Number( newValue ) );
          }
        }
        let rate = Number( val_plus ) * 2 - 1;
        let valPrice = val_price * rate;

        return (
          <Flex
            padding={ [ 3,1 ] }
            flexType="col"
            gap={ 2 }
            margin={ 'auto' }
            freeCSS={ {
              maxWidth: 12 * 36
            } }
          >
            <Input.Hidden
              form={ formName }
              name='menuType'
              value={ 100 }
            />
            <Input.Hidden
              form={ formName }
              name='price'
              value={ valPrice }
            />
            <Box
              padding={ 1 }

              border
              borderRadius={ '1.tone.primary' }
              backgroundColor='2.layer.cloud'
            >
              <Box
                textAlign="right"
                fontSize={ '6.title' }
                fontColor={ val_plus ? '2.normal' : 'nega' }
                transition='middle'
              >
                ¥{ valPrice.toLocaleString() }
                { val_priceType == 2 ? ' + 税' : '' }
              </Box>
            </Box>
            <Flex
              gap={ 1 }
              verticalAlign='center'
              horizontalAlign='between'
            >
              <Input.List.Radio.IconBorder
                gap={ '1/2' }
                value={ val_priceType }
                list={ [
                  { value: 1,label: '税込' },
                  { value: 2,label: '税抜' },
                ] }
                onUpdateValidValue={ ( { value } ) => {
                  set_priceType( value[ 0 ] );
                } }
                form={ formName }
                name='priceType'
              />
              <Input.Select
                enableUnSelected={ false }
                value={ 1 }
                form={ formName }
                name='taxType'
                list={ [
                  { value: 0,label: '非課税 - 0%' },
                  { value: 2,label: '軽減税率 - 8%' },
                  { value: 1,label: '標準税率 - 10%' }
                ] }
              />
            </Flex>
            <Grid
              gridCols={ 3 }
              gap={ '2/3' }
            >
              <Components.Variables.TenKeyCell
                data={ '7' } callback={ modifyPriceFN }
              />
              <Components.Variables.TenKeyCell
                data={ '8' } callback={ modifyPriceFN }
              />
              <Components.Variables.TenKeyCell
                data={ '9' } callback={ modifyPriceFN }
              />

              <Components.Variables.TenKeyCell
                data={ '4' } callback={ modifyPriceFN }
              />
              <Components.Variables.TenKeyCell
                data={ '5' } callback={ modifyPriceFN }
              />
              <Components.Variables.TenKeyCell
                data={ '6' } callback={ modifyPriceFN }
              />

              <Components.Variables.TenKeyCell
                data={ '1' } callback={ modifyPriceFN }
              />
              <Components.Variables.TenKeyCell
                data={ '2' } callback={ modifyPriceFN }
              />
              <Components.Variables.TenKeyCell
                data={ '3' } callback={ modifyPriceFN }
              />

              <Components.Variables.TenKeyCell
                data={ '0' } callback={ modifyPriceFN }
              />
              <Components.Variables.TenKeyCell
                data={ '00' } callback={ modifyPriceFN }
              />
              <Components.Variables.TenKeyCell
                callback={ modifyPriceFN }
                data={ 'backspace' }
                label={ <FontAwesomeIcon
                  iconStyle='regular'
                  d="backspace"
                /> }
              />
            </Grid>

            <Input.Wrapper.Normal
              label='品目名'
              required
            >
              <Input.Text.Normal
                placeholder="品目名"
                form={ formName }
                name='name'
                required
              />
            </Input.Wrapper.Normal>
            <Input.TextArea
              placeholder="備考欄"
              form={ formName }
              name='description'
            />
            <Buttons.Button.Prime
              size='L'
              submitOption={ {
                formName: formName,
                callback: ( form ) => {
                  params.UpdateMenuListFNs.addMenu( {
                    type: 999,
                    typeId: 0,
                    id: 'CustomMenu-' + $.uuidGen(),
                    name: form.name,
                    price: form.price,
                    priceType: form.priceType,
                    taxType: form.taxType,
                    quantity: 1,
                    treatMinutes: 0
                  } );
                }
              } }
            >
              メニューを追加する
            </Buttons.Button.Prime>
          </Flex>
        )
      }
    },
    SelectMenuCell: ( params: {
      displayType: number
      menu: MenuParams
      seeds: MenuSeedParams[]
      onclick: {
        ( args: MenuSeedParams ): void
      }
    } ) => {
      let {
        menu: {
          id: menuId,
          name: menuName
        },
        seeds
      } = params;

      let ParentParams: amotify.fn.Buttons.Tones.Border<amotify.fn.Buttons.ButtonInput> = {
        _width: '100%',
        textAlign: 'left',
        ssEffectsOnActive: 'ripple.cloud'
      }

      if ( params.displayType == 1 ) {
        ParentParams = {
          ...ParentParams,
          padding: 1
        }
      } else {
        ParentParams = {
          ...ParentParams,
          padding: [ 1,'1/2' ],
          border: 'unset',
          borderBottom: true,
          borderBottomWidth: 1,
          borderRadius: 0
        }
      }

      if ( seeds.length == 1 ) {
        let seed = seeds[ 0 ];
        let {
          id,
          price,
          priceType,
          taxType
        } = seed;

        return (
          <Buttons.Button.Border
            freeCSS={ {
              minHeight: 6
            } }
            onClick={ () => {
              params.onclick( seed );
            } }
            { ...ParentParams }
          >
            <Flex
              flexWrap={ false }
              verticalAlign='center'
              flexSizing={ 'auto' }
              gap={ 1 }
            >
              <FontAwesomeIcon
                fontSize='5.subTitle'
                d="file"
              />
              <Flex
                { ...params.displayType == 1 ? {
                  flexType: 'col'
                } : {
                  horizontalAlign: 'between',
                  flexSizing: 'auto'
                } }
              >
                <Box
                  fontSize='3.paragraph'
                  flexSizing={ 'auto' }
                  textAlign='left'
                >
                  { menuName }
                </Box>
                <Box
                  fontSize='3.paragraph'
                  freeCSS={ {
                    minHeight: 12 * 2
                  } }
                >
                  ¥{ price.toLocaleString() }
                  { priceType == 2 ? ' + 税' : '' }
                </Box>
              </Flex>
            </Flex>
          </Buttons.Button.Border>
        );
      }
      let buttonId = 'SelectMenuCell-' + menuId;

      let MenuSeedRows: amotify.fn.Tables.Normal.BodyRowParams[] = seeds.map( ( seed ) => {
        let {
          id,
          name: seedName,
          price,
          priceType,
        } = seed;

        let Row: amotify.fn.Tables.Drag.BodyRowParams = [
          {
            children: <Box
              textAlign='left'
              children={ seedName || '--' }
            />
          },{
            children: <Box
              textAlign='left'
            >
              ¥{ price.toLocaleString() }
              { priceType == 2 ? ' + 税' : '' }
            </Box>
          }
        ];
        Row.rowId = id;
        return Row;
      } )

      return (
        <Buttons.Button.Border
          { ...ParentParams }
          id={ buttonId }
          onClick={ ( event ) => {
            let modalId = 'SelectMenuCellModal-' + menuId;
            Modal.open( {
              type: 'free',
              modalId: modalId,
              parent: '#' + buttonId,
              closeOption: {
                type: 'remove'
              },
              gravityPoint: 16,
              children: <Box
                backgroundColor={ '1.layer.base' }
                ssCardBox
                boxShadow={ 3 }
                overflow={ 'hidden' }
                ssLastChildLossBorder='bottom'
                ssChildsBottomBorder
              >
                <Box
                  position='sticky'
                  positionTop={ 0 }
                  backgroundColor='1.layer.base'
                  padding={ '1/2' }
                  flexCenter
                  freeCSS={ {
                    zIndex: 2
                  } }
                >
                  種別を選択 ( { seeds.length }件 )
                </Box>
                <Table.Normal
                  colLength={ 2 }
                  tone='rowBorder'
                  head={ false }
                  rows={ MenuSeedRows }
                  onRowClick={ ( rowId ) => {
                    let seed = seeds.find( ( seed ) => seed.id == rowId );
                    !seed || params.onclick( seed );
                  } }
                />
              </Box>
            } );
          } }
        >
          <Flex
            flexWrap={ false }
            gap={ 1 }
            verticalAlign='center'
          >
            <Flex
              flexWrap={ false }
              verticalAlign='center'
              flexSizing={ 'auto' }
              gap={ 1 }
            >
              <FontAwesomeIcon
                fontSize='5.subTitle'
                fontColor={ 'theme' }
                d="folder-open"
              />
              <Flex
                { ...params.displayType == 1 ? {
                  flexType: 'col'
                } : {
                  horizontalAlign: 'between',
                  flexSizing: 'auto'
                } }
              >
                <Box
                  fontSize='3.paragraph'
                >
                  { menuName }
                </Box>
                <Box
                  fontColor='3.blur'
                  freeCSS={ {
                    minHeight: 12 * 2
                  } }
                >
                  ( { seeds.length }種別 )
                </Box>
              </Flex>
            </Flex>
            <FontAwesomeIcon
              flexSizing={ 'none' }
              flexCenter
              fontColor={ 'theme' }
              iconStyle='solid'
              d="angle-down"
            />
          </Flex>
        </Buttons.Button.Border>
      );
    },
  },
  RightRegion: {
    _: ( params: UniParams & DefParams ) => {
      return (
        <Flex
          flexType="col"
          flexSizing={ 'none' }
          className={ style.SelectedRegion }
          backgroundColor='2.layer.cloud'
          transition='middle'
        >
          <Flex
            flexType='col'
            flexSizing={ 0 }
            overflow='auto'
            position='relative'
            freeCSS={ {
              zIndex: 1
            } }
          >
            <Components.RightRegion.Body
              { ...params }
            />
          </Flex>
          <Components.RightRegion.Footer
            { ...params }
          />
        </Flex>
      );
    },
    Body: ( params: UniParams ) => {
      let SelectedList = params.val_uniStatus.SelectedList.map( ( li ) => {
        return (
          <Components.RightRegion.Parts.ProductCard
            { ...params }
            menu={ li }
          />
        );
      } );

      if ( !SelectedList.length ) {
        SelectedList = [
          <Box
            flexCenter
            padding={ 1 }
            fontColor='3.blur'
          >
            リストからメニューを追加してください
          </Box>
        ];
      }

      return (
        <Box
          flexSizing={ 0 }
        >
          <Flex
            flexType='col'
            // flexChilds='auto'
            gap={ 1 }
            padding={ 1 }
            position='relative'
            freeCSS={ {
              zIndex: 1
            } }
          >
            <Box
              fontWeight='3.bold'
              fontSize='4.thirdTitle'
            >
              ご注文リスト
            </Box>
            { SelectedList }
          </Flex>
          {/* <Box
            padding={ 1 }
            border='unset'
          >
            <Buttons.Button.Border
              onClick={ () => {
              } }
              borderWidth={ 1 }
              borderStyle='dashed'
              borderColor='3.strong'
              padding={ 2 }
              _width={ '100%' }
            >
              <Flex
                gap={ '1/2' }
                flexWrap={ false }
                fontColor='4.thin'
                fontSize='3.paragraph'
                horizontalAlign='center'
              >
                メニューを追加する
                <FontAwesomeIcon
                  iconStyle='solid'
                  fontColor={ 'theme' }
                  fontSize='4.thirdTitle'
                  d="plus"
                />
              </Flex>
            </Buttons.Button.Border>
          </Box> */}
        </Box>
      );
    },
    Footer: ( params: UniParams & DefParams ) => {
      let summary = {
        price: 0,
        tax: 0,
        quantity: 0
      }

      useEffect( () => {
        // Components.OpenPaymentModal( {
        //   val_def: params.val_def,
        //   menus: params.val_uniStatus.SelectedList,
        //   summary
        // } );
      },[] );

      params.val_uniStatus.SelectedList.forEach( ( li ) => {
        let {
          price,
          priceType,
          taxType,
          quantity
        } = li;
        let taxRate = appEnv.taxTypeRate( taxType );
        let taxPrice = priceType == 1 ? price - price * 100 / ( 100 + taxRate ) : price * ( taxRate ) / 100;
        taxPrice = Math.floor( taxPrice );

        summary.quantity += quantity;
        summary.tax += taxPrice * quantity;
        summary.price += ( priceType == 1 ? price : price + taxPrice ) * quantity;
      } );

      let [ val_openDetails,set_openDetails ] = useState( localStorage.getItem( localStorageKey.selectedMenuFooterSummary ) == 'true' );
      useEffect( () => {
        localStorage.setItem( localStorageKey.selectedMenuFooterSummary,String( val_openDetails ) );
      },[ val_openDetails ] );

      return (
        <Box
          position='sticky'
          positionBottom={ 0 }
          borderTop
          padding={ 1 }
          backgroundColor={ '1.layer.base' }
          freeCSS={ {
            zIndex: 2
          } }
        >
          <Accordion
            open={ val_openDetails }
            padding={ [ 1,0 ] }
            slideAnimation='fast'
          >
            <Flex horizontalAlign='between'>
              <Box>小計</Box>
              <Box>¥{ summary.price.toLocaleString() }</Box>
            </Flex>
            <Flex horizontalAlign='between'>
              <Box>内消費税</Box>
              <Box>¥{ summary.tax.toLocaleString() }</Box>
            </Flex>
            <Flex horizontalAlign='between'>
              <Box>保険請求額</Box>
              <Box>¥--</Box>
            </Flex>
          </Accordion>

          <Flex horizontalAlign='right' >
            <Buttons.Button.Border
              size='S'
              onClick={ () => {
                set_openDetails( !val_openDetails );
              } }
            >
              詳細 <FontAwesomeIcon
                fontColor={ 'theme' }
                iconStyle='solid'
                d="angle-up"
              />
            </Buttons.Button.Border>
          </Flex>
          <Flex
            horizontalAlign='between'
            marginTop={ 1 }
            fontSize={ '3.paragraph' }
          >
            <Box
              fontColor={ '4.thin' }
              fontSize={ '1.mini' }
            >
              <Span
                fontSize='4.thirdTitle'
                fontColor={ '1.clear' }
                children={ summary.quantity }
              />
              点
            </Box>
            <Box
              fontColor={ '4.thin' }
              fontSize={ '1.mini' }
            >
              <Span
                fontSize={ '4.thirdTitle' }
                fontColor={ '1.clear' }
              >
                ¥{ summary.price.toLocaleString() }
              </Span> (税込)
            </Box>
          </Flex>
          <Buttons.Button.Prime
            padding={ 1 }
            fontSize={ '3.paragraph' }
            marginTop={ 1 }
            marginBottom='safeAreaBottom'
            ssEffectsOnActive='shrink'
            _width={ '100%' }
            onClick={ () => {
              Components.OpenPaymentModal( {
                val_def: params.val_def,
                menus: params.val_uniStatus.SelectedList,
                summary
              } );
            } }
          >
            お会計に進む
          </Buttons.Button.Prime>
        </Box>
      );
    },
    Parts: {
      ProductCard: ( params: UniParams & {
        menu: SelectedMenuParams
      } ) => {
        let {
          type,
          name
        } = params.menu;

        let id = $.uuidGen();

        let Content = <></>;

        if ( type == 101 || type == 102 ) {
          Content = <Components.RightRegion.Parts.Type_Jihi
            { ...params }
          />
        } else if ( type == 999 ) {
          Content = <Components.RightRegion.Parts.Type_Custom
            { ...params }
          />
        } else {
          // Content = <>
          //   <InsurancePriceRegion />
          //   <Flex
          //     horizontalAlign="right"
          //     verticalAlign='center'
          //   >
          //     <Buttons.Label.Border
          //       htmlFor={ id }
          //       size="S"
          //       fontColor={ '3.blur' }
          //     >
          //       詳細 <FontAwesomeIcon d="angle-down" />
          //     </Buttons.Label.Border>
          //   </Flex>
          //   <Accordion
          //     toggleId={ id }
          //     fontSize={ '1.mini' }
          //     backgroundColor={ '3.layer.canvas' }
          //     padding={ 1 }
          //     borderRadius='1.tone.primary'
          //   >
          //     <Flex
          //       flexType="col"
          //       gap={ 1 }
          //     >
          //       <Flex
          //         gap={ 1 }
          //       >
          //         <Input.Wrapper.Normal
          //           label='施術スタッフ'
          //         >
          //           <Input.Select
          //             tone='border'
          //             enableUnSelected={ false }
          //             value={ 1 }
          //             list={ [
          //               { value: 1,label: 'スタッフ1' },
          //               { value: 2,label: 'スタッフ2' }
          //             ] }
          //           />
          //         </Input.Wrapper.Normal>
          //       </Flex>
          //     </Flex>
          //   </Accordion>
          // </>;
        }

        return (
          <Box
            ssCardBox
          >
            <Flex
              ssCardBoxHeader
              flexWrap={ false }
              horizontalAlign='between'
            >
              <Box
                fontSize='3.paragraph'
                fontWeight='3.bold'
              >
                { appEnv.productTypeName( type ) } - { name }
              </Box>
              <Buttons.Button.Clear
                color='nega'
                size='S'
                padding={ 0 }
                freeCSS={ {
                  width: 12 * 2.5,
                  height: 12 * 2.5
                } }
                borderRadius='sphere'
                onClick={ () => {
                  let modalId = $.uuidGen();
                  Modal.open( {
                    modalId: modalId,
                    type: 'center',
                    size: 'S',
                    content: <Modal.Attachment.Body>
                      <Box
                        flexCenter
                        marginBottom={ 1 }
                      >
                        メニューを削除しますか云々?
                      </Box>

                      <Flex
                        gap={ 1 }
                        flexCenter
                      >
                        <Buttons.Button.Border
                          onClick={ () => {
                            Modal.close.pin( modalId );
                          } }
                        >
                          閉じる
                        </Buttons.Button.Border>
                        <Buttons.Button.Prime
                          color='nega'
                          onClick={ () => {
                            params.UpdateMenuListFNs.deleteMenu( params.menu.id );
                            Modal.close.pin( modalId );
                          } }
                        >
                          削除
                        </Buttons.Button.Prime>
                      </Flex>
                    </Modal.Attachment.Body>
                  } );
                } }
              >
                <FontAwesomeIcon
                  iconStyle='regular'
                  d="trash-alt"
                />
              </Buttons.Button.Clear>
            </Flex>
            <Flex
              flexType='col'
              gap={ 1 }
              padding={ 1 }
              ssCardBoxBody
            >
              { Content }
            </Flex>
          </Box>
        )
      },
      Type_Jihi: ( params: UniParams & {
        menu: SelectedMenuParams
      } ) => {
        let {
          type,
          typeId,
          name,
          price,
          priceType,
          taxType,
          treatMinutes,
          quantity
        } = params.menu;

        let [ val_componentId ] = useState( $.uuidGen() );

        let accordionId = $.uuidGen();
        let modalId = $.uuidGen();
        let [ val_DiscountList,set_DiscountList ] = useState( false );

        return (
          <>
            <Flex
              gap={ 1 }
              flexWrap={ false }
              horizontalAlign='between'
            >
              <Components.RightRegion.Parts.AmountRegion
                componentId={ val_componentId }
                defaultValue={ quantity }
                callback={ ( data ) => {
                  params.UpdateMenuListFNs.updateMenu( {
                    ...params.menu,
                    quantity: Number( data )
                  } );
                } }
              />
              <Box
                fontColor={ '4.thin' }
                flexSizing='none'
                padding={ [ '3/4',0 ] }
                children={ <FontAwesomeIcon
                  iconStyle='solid'
                  d="times"
                /> }
              />
              <Input.Wrapper.Normal
                flexSizing={ 'auto' }
              >
                <Input.Text.Money.JPY
                  placeholder='金額'
                  value={ price }
                  override='force'
                  _width={ 0 }
                  onUpdateValidValue={ ( { value } ) => {
                    params.UpdateMenuListFNs.updateMenu( {
                      ...params.menu,
                      price: Number( value )
                    } );
                  } }
                  leftIndicator={
                    <Input.Select
                      enableUnSelected={ false }
                      value={ priceType }
                      _height={ '100%' }
                      flexCenter
                      borderTopRightRadius={ 0 }
                      borderBottomRightRadius={ 0 }
                      rightIcon={ false }
                      freeCSS={ {
                        marginRight: 12 * -1 / 12,
                        whiteSpace: 'nowrap'
                      } }
                      onUpdateValidValue={ ( { value } ) => {
                        params.UpdateMenuListFNs.updateMenu( {
                          ...params.menu,
                          priceType: value
                        } );
                      } }
                      list={ [
                        { value: 1,label: '税込' },
                        { value: 2,label: '税抜' },
                      ] }
                    />
                  }
                  rightIndicator={
                    <Input.Attachment.RightIndicator
                      padding={ 0 }
                      overflow='hidden'
                    >
                      <Buttons.Button.Normal
                        padding={ '3/4' }
                        fontColor='theme'
                        borderRadius={ 0 }
                        id={ 'priceModifyModalKick-' + val_componentId }
                        onClick={ () => {
                          Components.modifyNumeralModal( {
                            type: 'price',
                            modalId: 'priceModifyModalKick-' + val_componentId,
                            defaultValue: params.menu.price,
                            onValueChange: ( value ) => {
                              params.UpdateMenuListFNs.updateMenu( {
                                ...params.menu,
                                price: Number( value )
                              } );
                            }
                          } );
                        } }
                      >
                        <FontAwesomeIcon
                          iconStyle='regular'
                          d="calculator"
                        />
                      </Buttons.Button.Normal>
                    </Input.Attachment.RightIndicator>
                  }
                />
              </Input.Wrapper.Normal>

              <Buttons.Button.Clear
                freeCSS={ {
                  whiteSpace: 'nowrap'
                } }
                id={ 'parent-' + modalId }
                onClick={ () => {
                  DiscountModal( modalId,set_DiscountList );
                } }
              >
                割引
              </Buttons.Button.Clear>
            </Flex>
            { val_DiscountList ?
              <Flex
                marginLeft={ 'auto' }
                horizontalAlign='between'
                verticalAlign='center'
                gap={ 1 }
                ssCardBox
                padding={ '1/2' }
                fontColor={ 'nega' }
              >
                <Box>
                  〇〇割引
                </Box>
                <Box>
                  -10%
                </Box>
                <Buttons.Button.Clear
                  color='nega'
                  padding={ '1/2' }
                  onClick={ () => {
                    set_DiscountList( false );
                  } }
                >
                  <FontAwesomeIcon d="trash-alt" />
                </Buttons.Button.Clear>
              </Flex> : null
            }
            <Flex
              horizontalAlign="right"
              verticalAlign='center'
            >
              <Buttons.Button.Border
                size="S"
                fontColor={ '3.blur' }
                onClick={ () => {
                  Accordion.fn.toggle( accordionId );
                } }
              >
                詳細 <FontAwesomeIcon d="angle-down" />
              </Buttons.Button.Border>
            </Flex>
            <Accordion
              // open
              accordionId={ accordionId }
              fontSize={ '1.mini' }
              backgroundColor={ '3.layer.canvas' }
              padding={ 1 }
              borderRadius='1.tone.primary'
            >
              <Flex
                flexType="col"
                gap={ 1 }
              >
                <Flex gap={ 1 }>
                  <Input.Wrapper.Normal label='税率'>
                    <Input.Segmented.Border
                      value={ taxType }
                      list={ [
                        { value: 0,label: '0%' },
                        { value: 1,label: '10%' },
                        { value: 2,label: '8%' }
                      ] }
                    />
                  </Input.Wrapper.Normal>
                  <Input.Wrapper.Normal
                    label='施術スタッフ'
                  >
                    <Input.Select
                      tone='border'
                      enableUnSelected={ false }
                      value={ 1 }
                      list={ [
                        { value: 1,label: 'スタッフ1' },
                        { value: 2,label: 'スタッフ2' },
                      ] }
                    />
                  </Input.Wrapper.Normal>
                </Flex>
              </Flex>
            </Accordion>
          </>
        );
      },
      Type_Custom: ( params: UniParams & {
        menu: SelectedMenuParams
      } ) => {
        let {
          type,
          typeId,
          name,
          price,
          priceType,
          taxType,
          treatMinutes,
          quantity
        } = params.menu;

        let [ val_componentId ] = useState( $.uuidGen() );

        let accordionId = 'OpenAccordion-' + $.uuidGen();
        let modalId = $.uuidGen();

        return (
          <>
            <Flex
              gap={ 1 }
              flexWrap={ false }
              horizontalAlign='between'
            >
              <Components.RightRegion.Parts.AmountRegion
                componentId={ val_componentId }
                defaultValue={ quantity }
                callback={ ( data ) => {
                  params.UpdateMenuListFNs.updateMenu( {
                    ...params.menu,
                    quantity: Number( data )
                  } );
                } }
              />
              <Box
                fontColor={ '4.thin' }
                flexSizing='none'
                padding={ [ '3/4',0 ] }
                children={ <FontAwesomeIcon
                  iconStyle='solid'
                  d="times"
                /> }
              />
              <Input.Wrapper.Normal
                flexSizing={ 'auto' }
              >
                <Input.Text.Money.JPY
                  placeholder='金額'
                  value={ price }
                  _width={ 0 }
                  onUpdateValidValue={ ( { value } ) => {
                    params.UpdateMenuListFNs.updateMenu( {
                      ...params.menu,
                      price: Number( value )
                    } );
                  } }
                  leftIndicator={
                    <Input.Select
                      enableUnSelected={ false }
                      value={ priceType }
                      _height={ '100%' }
                      flexCenter
                      borderTopRightRadius={ 0 }
                      borderBottomRightRadius={ 0 }
                      rightIcon={ false }
                      freeCSS={ {
                        marginRight: 12 * -1 / 12,
                        whiteSpace: 'nowrap'
                      } }
                      onUpdateValidValue={ ( { value } ) => {
                        params.UpdateMenuListFNs.updateMenu( {
                          ...params.menu,
                          priceType: value
                        } );
                      } }
                      list={ [
                        { value: 1,label: '税込' },
                        { value: 2,label: '税抜' },
                      ] }
                    />
                  }
                  rightIndicator={
                    <Input.Attachment.RightIndicator
                      padding={ 0 }
                      overflow='hidden'
                    >
                      <Buttons.Button.Normal
                        padding={ '3/4' }
                        fontColor='theme'
                        borderRadius={ 0 }
                        id={ 'parent0-' + modalId }
                        onClick={ () => {
                          // AddQuantityModal( 'parent0-' + modalId );
                        } }
                      >
                        <FontAwesomeIcon d="calculator" />
                      </Buttons.Button.Normal>
                    </Input.Attachment.RightIndicator>
                  }
                />
              </Input.Wrapper.Normal>
            </Flex>
            <Flex
              horizontalAlign="right"
              verticalAlign='center'
            >
              <Buttons.Button.Border
                size="S"
                fontColor={ '3.blur' }
                onClick={ () => {
                  Accordion.fn.toggle( accordionId );
                } }
              >
                詳細 <FontAwesomeIcon d="angle-down" />
              </Buttons.Button.Border>
            </Flex>
            <Accordion
              // open
              accordionId={ accordionId }
              fontSize={ '1.mini' }
              backgroundColor={ '3.layer.canvas' }
              padding={ 1 }
              borderRadius='1.tone.primary'
            >
              <Flex
                flexType="col"
                gap={ 1 }
              >
                <Flex gap={ 1 }>
                  <Input.Wrapper.Normal label='税率'>
                    <Input.Segmented.Border
                      value={ taxType }
                      list={ [
                        { value: 0,label: '0%' },
                        { value: 1,label: '10%' },
                        { value: 2,label: '8%' }
                      ] }
                    />
                  </Input.Wrapper.Normal>
                  <Input.Wrapper.Normal
                    label='施術スタッフ'
                  >
                    <Input.Select
                      tone='border'
                      enableUnSelected={ false }
                      value={ 1 }
                      list={ [
                        { value: 1,label: 'スタッフ1' },
                        { value: 2,label: 'スタッフ2' },
                      ] }
                    />
                  </Input.Wrapper.Normal>
                </Flex>
              </Flex>
            </Accordion>
          </>
        );
      },
      AmountRegion: ( params: {
        componentId: string
        defaultValue: number
        callback( data: number ): void
      } ) => {
        let [ val_amount,set_amount ] = useState( params.defaultValue );

        return (
          <Input.Wrapper.Normal
            flexSizing={ 0 }
          >
            <Input.Text.Number
              override='force'
              value={ val_amount }
              freeCSS={ {
                minWidth: 12 * 4
              } }
              onUpdateValidValue={ ( { value } ) => {
                set_amount( Number( value ) );
                params.callback( Number( value ) );
              } }
              rightIndicator={
                <Input.Attachment.RightIndicator
                  padding={ 0 }
                  overflow='hidden'
                >
                  <Buttons.Button.Normal
                    padding={ '3/4' }
                    fontColor='theme'
                    borderRadius={ 0 }
                    id={ 'amountModifyModalKick-' + params.componentId }
                    onClick={ () => {
                      Components.modifyNumeralModal( {
                        type: 'amount',
                        modalId: 'amountModifyModalKick-' + params.componentId,
                        defaultValue: params.defaultValue,
                        onValueChange: ( data ) => {
                          set_amount( Number( data ) );
                          params.callback( data );
                        }
                      } );
                    } }
                  >
                    <FontAwesomeIcon
                      iconStyle='regular'
                      d="calculator"
                    />
                  </Buttons.Button.Normal>
                </Input.Attachment.RightIndicator>
              }
              _width={ '100%' }
            />
          </Input.Wrapper.Normal>
        );
      }
    },
  },
  CustomerRegion: () => {
    let [ val_index,set_index ] = useState( 0 );

    const OpenCustomerModal = () => {
      let modalId = 'customerRegion';
      Modal.open( {
        modalId: modalId,
        size: 'XL',
        type: 'right',
        content: <>
          <Box>
            <Flex
              flexWrap={ false }
              gap={ 2 }
              padding={ 1.5 }
              verticalAlign='center'
            >
              <Box
                _width={ 6 }
                _height={ 6 }
                borderRadius='sphere'
                backgroundColor={ '3.layer.canvas' }
                flexCenter
                fontSize={ '4.thirdTitle' }
              >
                <FontAwesomeIcon d="user" />
              </Box>
              <Box>
                <Box fontSize={ '4.thirdTitle' }>
                  Customer Name
                </Box>
                <Box
                  fontSize={ '3.paragraph' }
                  fontColor={ '4.thin' }
                >
                  Customer Kana
                </Box>
              </Box>
            </Flex>
            <Layout.TabBar
              tabIndex={ val_index }
              borderBottom='unset'
              marginLeft={ 1.5 }
              tabs={ [
                'DashBoard',
                'History',
                'Property',
              ] }
              freeCSS={ {
                display: 'inline-block'
              } }
              onTabChange={ ( index ) => {
                set_index( index );
              } }
            />
          </Box>
          <Layout.PageViewController
            viewIndex={ val_index }
            swipeOptions={ {
              enable: true,
              onSlide: ( index ) => {
                set_index( index );
              }
            } }
            wrapTemplate={ ( View ) => {
              return (
                <Box padding={ 1.5 }>
                  { View }
                </Box>
              );
            } }
            views={ [
              <>
                <Box>
                  <Flex
                    ssCardBox
                    padding={ 1.5 }
                    horizontalAlign='around'
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
                          fontColor={ '4.thin' }
                        >回</Span>
                      </Box>
                    </Box>
                    <Box
                      backgroundColor={ '4.layer.darken' }
                      borderRadius='sphere'
                      _width={ '1/3' }
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
                          fontColor={ '4.thin' }
                        >/回</Span>
                      </Box>
                    </Box>
                  </Flex>
                </Box>
              </>,
              'BBB',
              'CCC'
            ] }
          />
          <Box paddingBottom='safeAreaBottom'>
            <Flex
              padding={ 1 }
              horizontalAlign='right'
            >
              <Buttons.Button.Prime
                onClick={ () => {
                  Modal.close.pin( modalId );
                } }
              >
                閉じる
              </Buttons.Button.Prime>
            </Flex>
          </Box>
        </>,
      } )
    }

    return (
      <Flex
        flexType='col'
        gap={ 1 }
      >
        <Flex
          flexType='col'
          gap={ '1/2' }
          border
          borderStyle='dashed'
          borderColor='warn'
          borderRadius={ '1.tone.primary' }
          padding={ 1 }
          textAlign='center'
        >
          <Box
            fontSize='3.paragraph'
            fontColor='warn'
            flexCenter
            gap={ '1/2' }
          >
            <FontAwesomeIcon
              iconStyle='solid'
              d='exclamation-triangle'
            /> 顧客情報がセットされていません
          </Box>
          伝票の会計はできますが、顧客の分析等はできなくなります。
        </Flex>
        <Buttons.Button.Prime
          onClick={ () => {
            OpenCustomerModal();
          } }
          padding={ 1 }
          borderRadius={ 'sphere' }
        >
          <Flex
            gap={ '1/2' }
            flexWrap={ false }
            fontSize='3.paragraph'
            horizontalAlign='center'
          >
            顧客を追加する
            <FontAwesomeIcon
              iconStyle='solid'
              fontSize='4.thirdTitle'
              d="plus"
            />
          </Flex>
        </Buttons.Button.Prime>
      </Flex>
    );
  },
  Placeholder: () => {
    return (
      <>
        <Flex
          _height={ 6 }
          borderBottom
          horizontalAlign='between'
          padding={ 1 }
        >
          <Placeholder
            freeCSS={ {
              width: '10vw'
            } }
          />
          <Placeholder
            freeCSS={ {
              width: '30vw'
            } }
          />
          <Placeholder
            freeCSS={ {
              width: '10vw'
            } }
          />
        </Flex>
        <Flex
          flexWrap={ false }
          flexSizing={ 0 }
        >
          <Flex
            flexType='col'
            flexGrid={ 5 }
          >
            <Flex
              gap={ 1 }
              horizontalAlign='between'
              padding={ [ 1,1.5 ] }
              borderBottom
            >
              <Placeholder
                _height={ 3 }
                freeCSS={ {
                  width: '30%'
                } }
              />
              <Placeholder
                _height={ 3 }
                freeCSS={ {
                  width: '20%'
                } }
              />
            </Flex>
            <Grid
              gridCols={ 3 }
              gap={ 1.5 }
              padding={ 1.5 }
            >
              <Placeholder _height={ 6 } />
              <Placeholder _height={ 6 } />
              <Placeholder _height={ 6 } />
              <Placeholder _height={ 6 } />
              <Placeholder _height={ 6 } />
              <Placeholder _height={ 6 } />
              <Placeholder _height={ 6 } />
            </Grid>
          </Flex>
          <Flex
            flexType='col'
            flexGrid={ 3 }
            borderLeft
          >
            <Flex
              flexSizing={ 0 }
              gap={ 1 }
              flexType='col'
              padding={ 1 }
              backgroundColor='2.layer.cloud'
              overflow={ 'auto' }
            >
              <Placeholder
                _height={ 6 }
              />
              <Placeholder
                _height={ 6 }
              />
              <Placeholder
                _height={ 6 }
              />
            </Flex>
            <Flex
              flexType='col'
              gap={ 1 }
              padding={ 1 }
              flexSizing={ 'none' }
              borderTop
            >
              <Flex
                horizontalAlign='between'
              >
                <Placeholder
                  _height={ 2 }
                  freeCSS={ {
                    width: '20%'
                  } }
                />
                <Placeholder
                  _height={ 2 }
                  freeCSS={ {
                    width: '20%'
                  } }
                />
              </Flex>
              <Placeholder
                _height={ 4 }
              />
            </Flex>
          </Flex>
        </Flex>
      </>
    );
  },
  OpenPaymentModal: ( params: {
    val_def: DefParam
    menus: SelectedMenuParams[]
    summary: {
      price: number
      tax: number
      quantity: number
    }
  } ) => {
    let modalId = 'checkModal';
    let formName = 'formCheckPayment';

    let totalPrice = params.summary.price;
    let totalTax = params.summary.tax;
    let totalQuantity = params.summary.quantity;

    let snippetData_1 = totalPrice;
    let snippetData_2 = 0;
    let snippetData_3 = -1;
    {
      let deca = 10 ** ( String( totalPrice ).length - 1 );
      snippetData_2 = Math.ceil( totalPrice / deca ) * deca;
    }
    if ( snippetData_2 < 10000 ) {
      let deca = 10 ** String( totalPrice ).length;
      snippetData_3 = Math.ceil( totalPrice / deca ) * deca;
    }

    const MenuTable = () => {
      let menuList: amotify.fn.Tables.Uni.BodyRowParams[] = params.menus.map( ( menu ) => {
        let {
          price,
          priceType,
          taxType,
          quantity,
          name,
        } = menu;

        let taxRate = appEnv.taxTypeRate( taxType );
        let taxPrice = priceType == 1 ? price - price * 100 / ( 100 + taxRate ) : price * ( taxRate ) / 100;
        taxPrice = Math.floor( taxPrice );

        let Tax = taxPrice * quantity;
        let Price = ( priceType == 1 ? price : price + taxPrice ) * quantity;

        return [
          { type: 'th',children: name },
          { children: quantity + '点' },
          { children: '¥' + 0 },
          { children: '¥' + Price.toLocaleString() },
          { children: '¥' + Tax.toLocaleString() }
        ];
      } );

      return (
        <Table.Normal
          tone='rowBorder'
          border='unset'
          colLength={ 5 }
          head={ [
            { children: '商品名' },
            { children: '数量' },
            { children: '保険請求額' },
            { children: 'お支払額' },
            { children: '内消費税' },
          ] }
          cellStyleCallback={ ( params ) => {
            let Styles: amotifyUniStyleParams = {}
            if ( params.type == 'head' ) Styles.fontWeight = '3.bold';
            if ( params.end.left ) Styles.textAlign = 'center';
            return Styles;
          } }
          rows={ [
            ...menuList,
            [
              { type: 'th',children: '計' },
              { children: totalQuantity + '点' },
              { children: '¥0' },
              { children: '¥' + totalPrice.toLocaleString() },
              { children: '¥' + totalTax.toLocaleString() }
            ]
          ] }
        />
      );
    }

    Modal.open( {
      modalId: modalId,
      type: 'center',
      content: () => {
        let [ val_currentPayway,set_currentPayway ] = useState( 1 );
        let [ val_payways,set_payways ] = useState( [
          {
            type: 1,
            data: 0,
            label: <>
              <FontAwesomeIcon d="wallet" fontSize={ '3.paragraph' } /> 現金
            </>
          },{
            type: 2,
            data: 0,
            label: <>
              <FontAwesomeIcon d="credit-card" fontSize={ '3.paragraph' } /> クレジット
            </>
          },{
            type: 3,
            data: 0,
            label: <>
              <FontAwesomeIcon d="mobile" fontSize={ '3.paragraph' } /> 電子マネー
            </>
          },{
            type: 999,
            data: 0,
            label: <>
              <FontAwesomeIcon d="ellipsis" fontSize={ '3.paragraph' } /> その他
            </>
          }
        ] );
        const modifyPriceFN = ( value: string ) => {
          value = value || '';
          let nextValue: any = 0;

          let currentPaywayIndex = val_payways.findIndex( ( payway ) => payway.type == val_currentPayway );
          if ( currentPaywayIndex == -1 ) return;
          let currentValue = val_payways[ currentPaywayIndex ].data;
          if ( value.match( /^snippet_/ ) ) {
            let Value = value.match( /^snippet_(.*)/ )![ 1 ];
            nextValue = Value;
          } else if ( value == 'backspace' ) {
            nextValue = 0;
          } else {
            nextValue = String( currentValue ) + String( value );
          }

          let nextPayway = [ ...val_payways ];
          nextPayway[ currentPaywayIndex ].data = Number( nextValue );
          set_payways( nextPayway );
        }

        let List: amotify.fn.Input.List.OptionParams[] = val_payways.map( ( payway ) => {
          return {
            value: payway.type,
            label: <Flex
              horizontalAlign='between'
              verticalAlign="center"
              gap={ 1 }
              flexSizing='auto'
              flexWrap={ false }
            >
              <Box
                children={ payway.label }
              />
              <Box
                fontSize={ '3.paragraph' }
                children={ '¥' + payway.data.toLocaleString() }
              />
            </Flex>
          }
        } );

        let totalDeposit = val_payways.reduce( ( a,b ) => a + b.data,0 );
        let change = totalDeposit - totalPrice;

        let accordionId = $.uuidGen();
        return (
          <>
            <Modal.Attachment.Header
              horizontalAlign='between'
            >
              <Box
                fontSize='4.thirdTitle'
                fontWeight='3.bold'
              >
                お支払い
              </Box>
              <Input.Wrapper.Row
                label='会計担当'
                fontSize='2.normal'
              >
                <Input.Select
                  placeholder='未選択'
                  list={ [
                    { value: 1,label: 'AA' },
                    { value: 2,label: 'BB' },
                    { value: 3,label: 'CC' },
                  ] }
                />
              </Input.Wrapper.Row>
            </Modal.Attachment.Header>
            <Flex
              flexType='col'
              gap={ 2 }
              textAlign="center"
              padding={ 2 }
              boxShadow={ 1 }
              position='relative'
              freeCSS={ {
                zIndex: 2
              } }
            >
              <Box flexCenter>
                <Flex
                  border
                  borderRadius={ 'sphere' }
                  padding={ '1/2' }
                  verticalAlign='center'
                >
                  <FontAwesomeIcon
                    d='user'
                    backgroundColor='3.layer.canvas'
                    borderRadius='sphere'
                    _width={ 3 }
                    _height={ 3 }
                  />
                  <Box padding={ [ 0,'1/2' ] }>
                    { params.val_def.visitor.kana || '--' }様
                  </Box>
                </Flex>
              </Box>
              <Flex
                flexType='col'
              >
                <Flex
                  gap={ 1 }
                  horizontalAlign='center'
                >
                  <Box>
                    計{ totalQuantity }点
                  </Box>
                  <Box>
                    小計 ¥{ ( totalPrice ).toLocaleString() }
                  </Box>
                  <Box>
                    内消費税 ¥{ ( totalTax ).toLocaleString() }
                  </Box>
                </Flex>
                <Box
                  fontColor={ 'theme' }
                  fontSize={ '8.xl' }
                  lineHeight={ 0 }
                >
                  ¥{ ( totalPrice ).toLocaleString() }
                </Box>
              </Flex>
              <Box>
                <Buttons.Label.Border
                  size='S'
                  htmlFor="openDetails"
                  margin={ 'auto' }
                  borderRadius={ 'sphere' }
                  onClick={ () => {
                    Accordion.fn.toggle( accordionId );
                  } }
                >
                  明細を確認 <FontAwesomeIcon d="angle-down" fontColor={ 'theme' } />
                </Buttons.Label.Border>
                <Accordion
                  accordionId={ accordionId }
                  padding={ [ 1,2 ] }
                  open
                >
                  <MenuTable />
                </Accordion>
              </Box>
            </Flex>
            <Flex
              flexChilds='even'
              backgroundColor={ '3.layer.canvas' }
              position='relative'
              freeCSS={ {
                zIndex: 1
              } }
            >
              <Flex
                flexType="col"
                position='relative'
              >
                <Box
                  overflow='auto'
                  flexSizing={ 0 }
                  padding={ 1.5 }
                >
                  <Input.List.Radio.IconBorder
                    flexType="col"
                    gap={ '1/2' }
                    hideInput
                    cellStyles={ {
                      padding: 1,
                      borderColor: '0.trans'
                    } }
                    cellCheckedStyles={ {
                      boxShadow: 1
                    } }
                    value={ val_currentPayway }
                    onUpdateValidValue={ ( { value } ) => {
                      set_currentPayway( value[ 0 ] );
                    } }
                    list={ List }
                  />
                </Box>
                <Flex
                  horizontalAlign='between'
                  verticalAlign="center"
                  padding={ [ 1,2 ] }
                  position='sticky'
                  positionBottom={ 0 }
                >
                  <Box>
                    お釣り
                  </Box>
                  <Box
                    fontSize={ '4.thirdTitle' }
                    fontColor={ change < 0 ? 'nega' : 'inherit' }
                  >
                    ¥{ change.toLocaleString() }
                  </Box>
                </Flex>
              </Flex>
              <Box
                padding={ 1.5 }
                paddingLeft={ 0 }
              >
                <Grid
                  backgroundColor={ '1.layer.base' }
                  borderRadius={ '1.tone.primary' }
                  boxShadow={ 1 }
                  gridCols={ 3 }
                  padding={ 1 }
                  gap={ '2/3' }
                >
                  <Components.Variables.TenKeyCell
                    callback={ modifyPriceFN }
                    data={ 'snippet_' + snippetData_1 }
                    label={ <Box fontSize='2.normal'>
                      ¥{ snippetData_1.toLocaleString() }
                    </Box> }
                  />
                  <Components.Variables.TenKeyCell
                    callback={ modifyPriceFN }
                    data={ 'snippet_' + snippetData_2 }
                    label={ <Box fontSize='2.normal'>
                      ¥{ snippetData_2.toLocaleString() }
                    </Box> }
                  />
                  { snippetData_3 == -1 ? <Box />
                    : <Components.Variables.TenKeyCell
                      callback={ modifyPriceFN }
                      data={ 'snippet_' + snippetData_3 }
                      label={ <Box fontSize='2.normal'>
                        ¥{ snippetData_3.toLocaleString() }
                      </Box> }
                    /> }

                  <Components.Variables.TenKeyCell
                    data={ '7' } callback={ modifyPriceFN }
                  />
                  <Components.Variables.TenKeyCell
                    data={ '8' } callback={ modifyPriceFN }
                  />
                  <Components.Variables.TenKeyCell
                    data={ '9' } callback={ modifyPriceFN }
                  />

                  <Components.Variables.TenKeyCell
                    data={ '4' } callback={ modifyPriceFN }
                  />
                  <Components.Variables.TenKeyCell
                    data={ '5' } callback={ modifyPriceFN }
                  />
                  <Components.Variables.TenKeyCell
                    data={ '6' } callback={ modifyPriceFN }
                  />

                  <Components.Variables.TenKeyCell
                    data={ '1' } callback={ modifyPriceFN }
                  />
                  <Components.Variables.TenKeyCell
                    data={ '2' } callback={ modifyPriceFN }
                  />
                  <Components.Variables.TenKeyCell
                    data={ '3' } callback={ modifyPriceFN }
                  />

                  <Components.Variables.TenKeyCell
                    data={ '0' } callback={ modifyPriceFN }
                  />
                  <Components.Variables.TenKeyCell
                    data={ '00' } callback={ modifyPriceFN }
                  />
                  <Components.Variables.TenKeyCell
                    callback={ modifyPriceFN }
                    data={ 'backspace' }
                    label={ <FontAwesomeIcon
                      iconStyle='regular'
                      d="backspace"
                    /> }
                  />
                </Grid>
              </Box>
            </Flex>
            <Modal.Attachment.Footer
              position='sticky'
              positionBottom={ 0 }
              backgroundColor='1.layer.base'
              borderRadius={ 'inherit' }
              borderTop
              borderTopLeftRadius={ 0 }
              borderTopRightRadius={ 0 }
              freeCSS={ {
                zIndex: 2
              } }
            >
              <Buttons.Button.Border
                onClick={ () => {
                  Modal.close.pin( modalId );
                } }
              >
                閉じる
              </Buttons.Button.Border>
              <Buttons.Button.Prime
                ssMiniLoader={ {
                  color: 'white'
                } }
                fontSize={ '3.paragraph' }
                isLocked={ change < 0 }
                onClick={ async () => {
                  if ( change < 0 ) return;

                  let leaveAt = $.Time().toOrder( [ 'year','month','date','hours','minutes','seconds' ] ).join( '' );
                  let Body = {
                    incognitor: params.val_def.incognitor,
                    visitId: params.val_def.visitor.visitId,
                    visitUuid: params.val_def.visitor.visitUuid,
                    customerId: params.val_def.visitor.customerId,
                    leaveAt,
                    change,
                    deposits: val_payways.map( ( payway ) => ( {
                      type: payway.type,
                      data: payway.data
                    } ) ),
                    menus: params.menus.map( ( menu ) => {
                      let {
                        id,
                        taxType,
                        priceType,
                        price,
                        quantity,
                        ...others
                      } = menu;

                      let taxRate = appEnv.taxTypeRate( taxType );
                      let taxPrice = priceType == 1 ? price - price * 100 / ( 100 + taxRate ) : price * ( taxRate ) / 100;
                      taxPrice = Math.floor( taxPrice );

                      let Tax = taxPrice * quantity;
                      let PriceTax = ( priceType == 1 ? price : price + taxPrice ) * quantity;

                      return {
                        priceType,
                        price: PriceTax - Tax,
                        tax: Tax,
                        priceTax: PriceTax,
                        taxRate,
                        quantity,
                        ...others
                      }
                    } )
                  }

                  $.fetch.post( {
                    key: 'completePayment',
                    url: 'order/complete-payment',
                    body: Body,
                    // trafficControl: 2500
                    trafficControl: 0
                  },( result ) => {
                    if ( !result.ok ) return;
                    isPaymentCompleted = true;
                    $.pagePush( '/order/complete-payment?id=' + params.val_def.visitor.visitUuid );
                  } );
                } }
              >
                会計を完了する
              </Buttons.Button.Prime>
            </Modal.Attachment.Footer>
          </>
        );
      }
    } );
  },
  modifyNumeralModal: ( params: {
    type: 'amount' | 'price'
    modalId: string
    defaultValue: number
    onValueChange( data: number ): void
  } ) => {
    let TenKeyCell = ( params: {
      data: string
      label?: ReactElement
      callback: {
        ( data: string ): void
      }
    } & amotifyUniStyleParams ) => {
      let {
        data,
        label,
        callback,
        ...others
      } = params;
      return (
        <Buttons.Button.Border
          fontSize='4.thirdTitle'
          borderRadius='1.tone.primary'
          _width={ 6 }
          padding={ [ 1,0 ] }
          ssEffectsOnActive='shrink'
          onClick={ () => {
            params.callback( data );
          } }
          children={ label || data }
          { ...others }
        />
      );
    }
    let Body = () => {
      let [ val_amount,set_amount ] = useState( params.defaultValue );

      const modifyAmountFN = ( value: string ) => {
        value = value || '';

        let nextValue: any = value;
        if ( value == 'backspace' ) {
          nextValue = 0;
        } else {
          nextValue = String( val_amount ) + String( value );
        }
        set_amount( Number( nextValue ) );
      }

      return (
        <Flex
          flexType='col'
          borderRadius='1.tone.primary'
          ssCardBox
          overflow={ 'hidden' }
        >
          <Flex
            textAlign='right'
            borderBottom
            padding={ 1 }
            gap={ 1 }
            verticalAlign='center'
            horizontalAlign='between'
          >
            <Box>
              【{ params.type == 'amount' ? '個数' : '金額' }】
            </Box>
            <Box
              fontSize={ '6.title' }
              children={ val_amount.toLocaleString() }
            />
          </Flex>
          <Flex
            flexType='col'
            gap={ 1 }
            padding={ 1 }
          >
            <Grid
              gridCols={ 3 }
              flexType='col'
              gap='1/2'
              fontWeight='3.bold'
            >
              <TenKeyCell
                data='7'
                callback={ modifyAmountFN }
              />
              <TenKeyCell
                data='8'
                callback={ modifyAmountFN }
              />
              <TenKeyCell
                data='9'
                callback={ modifyAmountFN }
              />

              <TenKeyCell
                data='4'
                callback={ modifyAmountFN }
              />
              <TenKeyCell
                data='5'
                callback={ modifyAmountFN }
              />
              <TenKeyCell
                data='6'
                callback={ modifyAmountFN }
              />

              <TenKeyCell
                data='1'
                callback={ modifyAmountFN }
              />
              <TenKeyCell
                data='2'
                callback={ modifyAmountFN }
              />
              <TenKeyCell
                data='3'
                callback={ modifyAmountFN }
              />
              <TenKeyCell
                data='0'
                callback={ modifyAmountFN }
              />
              <TenKeyCell
                data='00'
                callback={ modifyAmountFN }
              />
              <TenKeyCell
                callback={ modifyAmountFN }
                data={ 'backspace' }
                label={ <FontAwesomeIcon
                  iconStyle='regular'
                  d="backspace"
                /> }
              />
            </Grid>
            <Buttons.Button.Prime
              boxShadow={ 2 }
              fontSize='3.paragraph'
              onClick={ () => {
                params.onValueChange( val_amount );
                Modal.close.pin( params.modalId );
              } }
            >
              確定
            </Buttons.Button.Prime>
          </Flex>
        </Flex>
      );
    }
    Modal.open( {
      modalId: params.modalId,
      type: 'free',
      parent: '#' + params.modalId,
      padding: [ 1,0 ],
      gravityPoint: 16,
      children: <Body />
    } );
  }
}

const InsurancePriceRegion: FNC<{}> = () => {
  let modalId = $.uuidGen();

  return (
    <>
      <Input.Wrapper.Normal
        label='窓口負担額'
        flexSizing={ 'auto' }
      >
        <Flex
          gap={ 1 }
          flexWrap={ false }
        >
          <Input.Text.Money.JPY
            wrapStyles={ {
              flexSizing: 'auto'
            } }
            _width={ 0 }
            placeholder='窓口負担金額'
            value={ 2100 }
            rightIndicator={
              <Input.Attachment.RightIndicator
                padding={ 0 }
              >
                <Buttons.Button.Normal
                  padding={ '3/4' }
                  fontColor='theme'
                  borderRadius={ 0 }
                  backgroundColor='trans'
                  id={ 'parent0-' + modalId }
                  onClick={ () => {
                    // AddQuantityModal( 'parent0-' + modalId );
                  } }
                >
                  <FontAwesomeIcon d="calculator" />
                </Buttons.Button.Normal>
              </Input.Attachment.RightIndicator>
            }
          />
          <Buttons.Button.Prime
            color='theme'
            freeCSS={ {
              whiteSpace: 'nowrap'
            } }
          >
            自動算出
          </Buttons.Button.Prime>
        </Flex>
      </Input.Wrapper.Normal>
      <Flex
        gap={ 1 }
        flexWrap={ false }
      >
        <Input.Wrapper.Normal
          label='請求額'
          flexSizing={ 'auto' }
        >
          <Input.Text.Money.JPY
            placeholder='請求額'
            value={ 7000 }
            rightIndicator={
              <Input.Attachment.RightIndicator
                padding={ 0 }
              >
                <Buttons.Button.Normal
                  padding={ '3/4' }
                  fontColor='theme'
                  backgroundColor='trans'
                  borderRadius={ 0 }
                  id={ 'parent1-' + modalId }
                  onClick={ () => {
                    // AddQuantityModal( 'parent1-' + modalId );
                  } }
                >
                  <FontAwesomeIcon d="calculator" />
                </Buttons.Button.Normal>
              </Input.Attachment.RightIndicator>
            }
          />
        </Input.Wrapper.Normal>
        <Input.Wrapper.Normal
          label='調整額'
          flexSizing={ 'auto' }
        >
          <Input.Text.Money.JPY
            placeholder='調整額'
            disabled
            value={ 0 }
            rightIndicator={ false }
          />
        </Input.Wrapper.Normal>
      </Flex>
    </>
  );
}

const DiscountModal = ( modalId: string,set_list: any ) => {
  const ModalContent: FNC<{}> = () => {
    const Content: FNC<{}> = () => {
      let [ val_viewIndex,set_viewIndex ] = useState( 3 );
      return (
        <>
          <Box
            padding={ '1/2' }
            fontSize={ '1.mini' }
            flexCenter
          >
            <Input.Segmented.Border
              value={ val_viewIndex }
              onUpdateValidValue={ ( { value } ) => {
                set_viewIndex( value[ 0 ] );
              } }
              cellStyles={ {
                padding: [ '1/2',1 ]
              } }
              list={ [
                {
                  value: 0,
                  label: 'コース'
                },{
                  value: 1,
                  label: '割引券'
                },{
                  value: 2,
                  label: '月額商品'
                },{
                  value: 3,
                  label: 'カスタム'
                }
              ] }
            />
          </Box>
          <Layout.PageViewController
            viewIndex={ val_viewIndex }
            swipeOptions={ {
              mouseDrag: true,
              onSlide: ( index ) => {
                set_viewIndex( index );
              }
            } }
            views={ [
              <>
                <Flex
                  flexType='col'
                  gap={ 1 }
                  padding={ 1 }
                >
                  <Buttons.Button.Border
                    _width={ '100%' }
                    size='S'
                  >
                    <Flex
                      horizontalAlign='between'
                      verticalAlign='center'
                      padding={ '1/2' }
                    >
                      <Box>
                        〇〇コース
                      </Box>
                      <Box
                        fontSize={ '1.mini' }
                      >
                        <Span
                          fontSize={ '4.thirdTitle' }
                          fontColor='theme'
                        >
                          4
                        </Span>
                        /12回使用済
                      </Box>
                      <Box>
                        10%割引
                      </Box>
                      <Buttons.Button.Clear>
                        選択 <FontAwesomeIcon d="angle-right" />
                      </Buttons.Button.Clear>
                    </Flex>
                  </Buttons.Button.Border>
                  <Buttons.Button.Border
                    _width={ '100%' }
                  >
                    <Flex
                      horizontalAlign='between'
                      verticalAlign='center'
                      padding={ '1/2' }
                    >
                      <Box>
                        〇〇コース
                      </Box>
                      <Box
                        fontSize={ '1.mini' }
                      >
                        <Span
                          fontSize={ '4.thirdTitle' }
                          fontColor='theme'
                        >
                          4
                        </Span>
                        /12回使用済
                      </Box>
                      <Box>
                        ¥100円引
                      </Box>
                      <Buttons.Button.Clear>
                        選択 <FontAwesomeIcon d="angle-right" />
                      </Buttons.Button.Clear>
                    </Flex>
                  </Buttons.Button.Border>
                </Flex>
              </>,
              <Box
                padding={ 1 }
                flexCenter
              >
                顧客〇〇さんは該当商品を保有していません。
              </Box>,
              <Box
                padding={ 1 }
                flexCenter
              >
                顧客〇〇さんは該当商品を保有していません。
              </Box>,
              <>
                <Flex
                  verticalAlign='center'
                  borderBottom
                  padding={ 1 }
                >
                  <Input.Segmented.Cloud
                    value={ 0 }
                    borderRadius='sphere'
                    cellStyles={ {
                      padding: [ '1/2',1 ],
                      borderRadius: 'sphere'
                    } }
                    list={ [
                      { value: 0,label: '-%' },
                      { value: 1,label: '-¥' },
                      { value: 2,label: '+%' },
                      { value: 3,label: '+¥' }
                    ] }
                  />
                  <Box
                    flexSizing={ 'auto' }
                    fontSize={ '6.title' }
                    textAlign='right'
                    fontColor={ 'nega' }
                  >
                    -10%
                  </Box>
                </Flex>
                <Flex
                  flexWrap={ false }
                  gap='1/12'
                  backgroundColor={ '4.layer.darken' }
                  fontSize={ '4.thirdTitle' }
                >
                  <Grid
                    gridCols={ 3 }
                    gap='1/12'
                    flexSizing={ 'auto' }
                    className={ style.TenKeyWrapper }
                  >
                    <Buttons.Button.Normal>
                      7
                    </Buttons.Button.Normal>
                    <Buttons.Button.Normal>
                      8
                    </Buttons.Button.Normal>
                    <Buttons.Button.Normal>
                      9
                    </Buttons.Button.Normal>
                    <Buttons.Button.Normal>
                      4
                    </Buttons.Button.Normal>
                    <Buttons.Button.Normal>
                      5
                    </Buttons.Button.Normal>
                    <Buttons.Button.Normal>
                      6
                    </Buttons.Button.Normal>
                    <Buttons.Button.Normal>
                      1
                    </Buttons.Button.Normal>
                    <Buttons.Button.Normal>
                      2
                    </Buttons.Button.Normal>
                    <Buttons.Button.Normal>
                      3
                    </Buttons.Button.Normal>
                    <Buttons.Button.Normal
                      borderBottom='unset'
                    >
                      0
                    </Buttons.Button.Normal>
                    <Buttons.Button.Normal
                      borderBottom='unset'
                    >
                      00
                    </Buttons.Button.Normal>
                    <Buttons.Button.Normal
                      borderBottom='unset'
                    >
                      <FontAwesomeIcon d="backspace" />
                    </Buttons.Button.Normal>
                  </Grid>
                  <Buttons.Button.Clear
                    borderRadius={ 0 }
                    backgroundColor={ '1.layer.base' }
                    _width={ 8 }
                    flexSizing='none'
                    onClick={ () => {
                      set_list( true );
                      Modal.close.pin( modalId );
                    } }
                  >
                    確定
                  </Buttons.Button.Clear>
                </Flex>
              </>
            ] }
          />
        </>
      );
    }

    return (
      <Box
        backgroundColor={ '1.layer.base' }
        borderRadius='1.tone.primary'
        boxShadow={ 4 }
        overflow='hidden'
        freeCSS={ {
          maxWidth: 12 * 30
        } }
      >
        <Content />
      </Box>
    );
  }

  Modal.open( {
    modalId: modalId,
    type: 'free',
    parent: '#' + 'parent-' + modalId,
    gravityPoint: 16,
    padding: [ 1,0 ],
    children: <ModalContent />
  } );
}

export const OrderEntry: FNC<{}> = () => {
  let [ val_init,set_init ] = useState( false );
  let [ val_def,set_def ] = useState( {} as DefParam );
  let { id: uuid = $.uuidGen() } = $.getQueryParams();

  useEffect( () => {
    $.fetch.post( {
      key: 'orderPage',
      url: 'order/entry-page-data',
      body: { uuid },
      trafficControl: 0
    },( result ) => {
      if ( !result.ok ) return;
      let incognitor = !result.body.visitor.length;
      console.log( result.body );

      result.body.visitor = result.body.visitor[ 0 ] || {};

      if ( incognitor ) {
        result.body.visitor = {
          visitId: 0,
          visitUuid: $.uuidGen(),
          arriveDate: $.Time().toOrder( [ 'month','date' ] ).join( '/' ),
          arriveTime: $.Time().toOrder( [ 'hours','minutes' ] ).join( ':' ),
          viaType: -1,
          visitPhase: 0,
          customerId: 0,
          customerUuid: '',
          kana: '',
          name: '',
          gender: 0,
          birthday: '',
          age: '',
          preData: '[]'
        }
      }

      set_def( {
        ...result.body,
        incognitor
      } );
      set_init( true );
    } );

    $.setQueryParam( {
      key: 'id',
      value: uuid
    } );
  },[] );

  if ( !val_def?.incognitor && val_def?.visitor?.visitPhase >= 200 ) {
    return (
      <>
        <Box
          padding={ 2 }
          flexCenter
        >
          すでに取引が終了しています。的な文章
        </Box>
      </>
    );
  }

  const syncSelectedMenus = () => {
    if ( isPaymentCompleted ) return;
    $.fetch.post( {
      key: 'syncData',
      url: 'order/sync-selected-menu-data',
      body: {
        uuid,
        data: JSON.stringify( inmemorySelectedMenus )
      }
    } );
  }
  useEffect( () => {
    let eventName = 'RemovePageEventCallback';
    if ( Env.isProduct ) {
      $( window ).addEvent( {
        eventType: 'beforeunload',
        eventId: eventName,
        callback: ( event ) => {
          syncSelectedMenus();
          event.preventDefault();
          event.returnValue = '';
        }
      } );
    }

    return () => {
      // detect react page transaction
      $( window ).removeEvent( eventName );
      syncSelectedMenus();
    }
  },[] );

  return (
    <Flex
      flexType="col"
      _height={ 'viewHeight' }
      children={ !val_init ? <Components.Placeholder /> : <>
        <Components.Header
          val_def={ val_def }
          set_def={ set_def }
        />
        <Components.Body
          val_def={ val_def }
          set_def={ set_def }
        />
      </> }
    />
  );
}