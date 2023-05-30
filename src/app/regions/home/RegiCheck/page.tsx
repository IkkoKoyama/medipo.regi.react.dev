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
    Flex,
    Span,
    Placeholder
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
    Loader,
    SnackBar
  }
} = amotify;

type DefParams = {
  dws: {
    id: number
    uuid: string
    price: number
    type: number
    eventDate: string
    eventTime: string
    name: string
    description: string
    staffId: number
    staffName: string
  }[]
  rcs: {
    id: number
    uuid: string
    total_price: number
    type: number
    eventDate: string
    eventTime: string
    description: string

    staffId: number
    staffName: string
  }[]
}

type ContentParams = {
  val_def: DefParams
  set_def: React.Dispatch<React.SetStateAction<DefParams>>
}

export const CreateDWFN = () => {
  let modalId = 'addCustomerModal';

  Modal.open( {
    type: 'center',
    modalId: modalId,
    size: 'S',
    content: <>
      <Modal.Attachment.Header>
        入出金登録
      </Modal.Attachment.Header>
      <Modal.Attachment.Body>
        <Flex
          flexType="col"
          gap={ 1 }
        >
          <Input.Wrapper.Normal label='種別'>
            <Input.List.Radio.Border
              form='formCreateDW'
              name='type'
              required
              list={ [
                {
                  value: 1,
                  label: '入金'
                },{
                  value: 2,
                  label: '出金'
                }
              ] }
            />
          </Input.Wrapper.Normal>
          <Input.Wrapper.Normal label='スタッフ'>
            <Input.Search
              form='formCreateDW'
              name='staff'
              optionGroups={ [] }
              onDynamicSearch={ appEnv.dynamicSearchStoreStaffInput }
            />
          </Input.Wrapper.Normal>
          <Flex
            gap={ 1 }
            flexWrap={ false }
            verticalAlign='bottom'
          >
            <Input.Wrapper.Normal label='発生日'>
              <Input.Time.Date
                form='formCreateDW'
                name='date'
                value={ $.Time().toFormatYMD() }
                required
              />
            </Input.Wrapper.Normal>
            <Input.Time.Clock
              form='formCreateDW'
              name='time'
              value={ $.Time().toFormatHM() }
              required
            />
          </Flex>
          <Input.Wrapper.Normal label='取引金額'>
            <Input.Text.Money.JPY
              form='formCreateDW'
              name='price'
              required
            />
          </Input.Wrapper.Normal>
          <Input.Wrapper.Normal label='名目'>
            <Input.Text.Normal
              form='formCreateDW'
              name='name'
              placeholder="名目"
              required
            />
          </Input.Wrapper.Normal>
          <Input.TextArea
            form='formCreateDW'
            name='description'
            placeholder='備考欄'
          />
        </Flex>
      </Modal.Attachment.Body>
      <Modal.Attachment.Footer>
        <Buttons.Button.Border
          onClick={ () => {
            Modal.close.pin( modalId );
          } }
        >
          閉じる
        </Buttons.Button.Border>
        <Buttons.Button.Prime
          ssMiniLoader={ { color: 'white' } }
          submitOption={ {
            formName: 'formCreateDW',
            callback: ( form ) => {
              let {
                staff,
                ...otherForms
              } = form;
              let uuid = $.uuidGen();

              $.fetch.post( {
                key: 'createDW',
                url: 'regi-check/create-dw',
                body: {
                  uuid: uuid,
                  staffId: staff.id,
                  ...otherForms
                }
              },( result ) => {
                if ( !result.ok ) return;
                Modal.close.pin( modalId );

                SnackBar.add( {
                  backgroundColor: 'posi',
                  fontColor: 'white',
                  children: <>
                    <FontAwesomeIcon
                      iconStyle='solid'
                      iconAnimation='bounce'
                      d="check"
                    /> 入出金の登録が完了しました
                  </>
                } )
              } );
            }
          } }
        >
          登録する
        </Buttons.Button.Prime>
      </Modal.Attachment.Footer>
    </>
  } );
}
const RegiCheckFN = () => {
  let modalId = 'addCustomer';
  let formName = 'formCreateRegiCheck';

  Modal.open( {
    type: 'center',
    modalId: modalId,
    size: 'L',
    content: () => {
      let [ val_denomination,set_denomination ] = useState( {
        jpy_1: 0,
        jpy_5: 0,
        jpy_10: 0,
        jpy_50: 0,
        jpy_100: 0,
        jpy_500: 0,
        jpy_1000: 0,
        jpy_2000: 0,
        jpy_5000: 0,
        jpy_10000: 0
      } );

      let jpy_total =
        val_denomination.jpy_1 * 1 +
        val_denomination.jpy_5 * 5 +
        val_denomination.jpy_10 * 10 +
        val_denomination.jpy_50 * 50 +
        val_denomination.jpy_100 * 100 +
        val_denomination.jpy_500 * 500 +
        val_denomination.jpy_1000 * 1000 +
        val_denomination.jpy_2000 * 2000 +
        val_denomination.jpy_5000 * 5000 +
        val_denomination.jpy_10000 * 10000;

      return (
        <>
          <Modal.Attachment.Header>
            レジ点検・精算
          </Modal.Attachment.Header>
          <Box>
            <Input.Hidden
              form={ formName }
              name='jpy_total'
              value={ jpy_total }
            />
            <Flex
              flexWrap={ false }
              gap='1/3'
              backgroundColor='3.layer.canvas'
              UnderBreakPointStyles={ {
                flexType: 'col',
              } }
            >
              <Flex
                flexType="col"
                flexGrid={ 5 }
                padding={ 2 }
                gap={ 2 }
                backgroundColor='1.layer.base'
                borderRight
              >
                <Box>
                  レジ想定金額
                  <Box
                    fontSize='6.title'
                  >
                    ¥9,280
                  </Box>
                  <List
                    borderTop
                    borderBottom
                    padding={ [ '1/2',0 ] }
                    rowStyles={ {
                      padding: [ '1/2',0 ],
                      borderBottom: true,
                      horizontalAlign: 'between'
                    } }
                    rows={ [
                      {
                        children: <>
                          <Box>現金売上</Box>
                          <Box>¥1,280</Box>
                        </>
                      },{
                        children: <>
                          <Box>釣り銭準備金</Box>
                          <Box>¥1,280</Box>
                        </>
                      },{
                        children: <>
                          <Box>入金額</Box>
                          <Box>¥1,280</Box>
                        </>,
                      },{
                        children: <>
                          <Box>出金額</Box>
                          <Box>¥1,280</Box>
                        </>
                      }
                    ] }
                  />
                </Box>
                <Box>
                  <Input.Wrapper.Normal label='種別'>
                    <Input.List.Radio.Border
                      form={ formName }
                      name='type'
                      required
                      list={ [
                        { value: 1,label: '点検' },
                        { value: 2,label: '精算' }
                      ] }
                    />
                  </Input.Wrapper.Normal>
                  {/* <Box
                fontColor={ 'nega' }
                fontSize='1.mini'
                marginTop={ 1 }
              >
                ※精算を選択した場合、それ以前の会計・入出金履歴を修正することはできません。
              </Box> */}
                </Box>
                <Input.Wrapper.Normal label='スタッフ'>
                  <Input.Search
                    required
                    placeholder='スタッフを検索'
                    optionGroups={ [] }
                    onDynamicSearch={ appEnv.dynamicSearchStoreStaffInput }
                    form={ formName }
                    name='staff'
                  />
                </Input.Wrapper.Normal>
                <Input.TextArea
                  placeholder='備考欄'
                  form={ formName }
                  name='description'
                />
              </Flex>
              <Flex
                flexType="col"
                flexGrid={ 7 }
                gap='1/3'
                borderLeft
                UnderBreakPointStyles={ {
                  borderLeft: 'unset'
                } }
              >
                <Box
                  position='sticky'
                  positionTop={ 4 }
                  backgroundColor={ '1.layer.base' }
                  borderBottom
                  textAlign='center'
                  freeCSS={ {
                    zIndex: 2
                  } }
                >
                  <Flex
                    gap={ 2 }
                    padding={ [ 1,2 ] }
                    flexCenter
                  >
                    <Box>
                      レジ合計金額
                      <Box
                        fontSize='5.subTitle'
                        padding={ 0 }
                      >
                        ¥{ jpy_total.toLocaleString() }
                      </Box>
                    </Box>
                    <Box>
                      過不足金
                      <Box
                        fontSize='5.subTitle'
                        padding={ 0 }
                        fontColor={ 'nega' }
                      >
                        ¥-280
                      </Box>
                    </Box>
                  </Flex>
                </Box>

                <List
                  backgroundColor='1.layer.base'
                  borderTop
                  position='relative'
                  freeCSS={ {
                    zIndex: 1
                  } }
                  rowStyles={ {
                    verticalAlign: 'center',
                    borderBottom: true,
                    padding: 1,
                    gap: 1
                  } }
                  rows={ [
                    {
                      children: <Components.RegiChecks.MoneyCell
                        moneyType={ 10000 }
                        formName={ formName }
                        val_denomination={ val_denomination }
                        set_denomination={ set_denomination }
                      />
                    },{
                      children: <Components.RegiChecks.MoneyCell
                        moneyType={ 5000 }
                        formName={ formName }
                        val_denomination={ val_denomination }
                        set_denomination={ set_denomination }
                      />
                    },{
                      children: <Components.RegiChecks.MoneyCell
                        moneyType={ 2000 }
                        formName={ formName }
                        val_denomination={ val_denomination }
                        set_denomination={ set_denomination }
                      />
                    },{
                      children: <Components.RegiChecks.MoneyCell
                        moneyType={ 1000 }
                        formName={ formName }
                        val_denomination={ val_denomination }
                        set_denomination={ set_denomination }
                      />
                    },{
                      children: <Components.RegiChecks.MoneyCell
                        moneyType={ 500 }
                        formName={ formName }
                        val_denomination={ val_denomination }
                        set_denomination={ set_denomination }
                      />
                    },{
                      children: <Components.RegiChecks.MoneyCell
                        moneyType={ 100 }
                        formName={ formName }
                        val_denomination={ val_denomination }
                        set_denomination={ set_denomination }
                      />
                    },{
                      children: <Components.RegiChecks.MoneyCell
                        moneyType={ 50 }
                        formName={ formName }
                        val_denomination={ val_denomination }
                        set_denomination={ set_denomination }
                      />
                    },{
                      children: <Components.RegiChecks.MoneyCell
                        moneyType={ 10 }
                        formName={ formName }
                        val_denomination={ val_denomination }
                        set_denomination={ set_denomination }
                      />
                    },{
                      children: <Components.RegiChecks.MoneyCell
                        moneyType={ 5 }
                        formName={ formName }
                        val_denomination={ val_denomination }
                        set_denomination={ set_denomination }
                      />
                    },{
                      children: <Components.RegiChecks.MoneyCell
                        moneyType={ 1 }
                        formName={ formName }
                        val_denomination={ val_denomination }
                        set_denomination={ set_denomination }
                      />
                    },
                  ] }
                />
              </Flex>
            </Flex>
          </Box>
          <Modal.Attachment.Footer>
            <Buttons.Button.Border
              onClick={ () => {
                Modal.close.pin( modalId );
              } }
            >
              閉じる
            </Buttons.Button.Border>
            <Buttons.Button.Prime
              ssMiniLoader={ { color: 'white' } }
              submitOption={ {
                formName: formName,
                callback: ( form ) => {
                  let {
                    staff,
                    ...otherForms
                  } = form;
                  let uuid = $.uuidGen();

                  $.fetch.post( {
                    key: 'createDW',
                    url: 'regi-check/create-rc',
                    body: {
                      uuid: uuid,
                      staffId: staff.id,
                      ...otherForms
                    }
                  },( result ) => {
                    if ( !result.ok ) return;
                    console.log( result.body );
                    Modal.close.pin( modalId );
                  } );
                }
              } }
            >
              精算する
            </Buttons.Button.Prime>
          </Modal.Attachment.Footer>
        </>
      );
    },
  } );
}

const Components = {
  Header: ( params: ContentParams ) => {
    let date = $.Time();

    // useEffect( () => {
    //   RegiCheckFN();
    // },[] );

    return (
      <>
        <Flex
          flexType="col"
          gap={ 1 }
        >
          <Flex
            fontSize='4.thirdTitle'
            gap={ '1/2' }
            verticalAlign='baseline'
          >
            <FontAwesomeIcon
              d='cash-register'
              fontColor={ 'theme' }
              fontSize='5.subTitle'
            />
            レジ管理
          </Flex>
          <Flex
            gap={ 1 }
            flexWrap={ false }
          >
            <Flex
              ssCardBox
              padding={ [ 2,0 ] }
              flexWrap={ false }
              flexSizing='auto'
              verticalAlign='center'
              flexGrid={ 2 }
              horizontalAlign='around'
              UnderBreakPointStyles={ {
                padding: 1,
                flexType: 'col',
                flexWrap: true
              } }
              fontSize={ '1.mini' }
              textAlign='center'
            >
              <Flex
                flexType="col"
                gap={ '1/3' }
                padding={ [ 0,2 ] }
              >
                <Box fontColor={ '4.thin' }>
                  前回点検
                </Box>
                <Box
                  fontSize='4.thirdTitle'
                >
                  { date.toOrder( [ 'month','date' ] ).join( '/' ) } { date.toFormatHM() }
                </Box>
              </Flex>
              <Box
                _width='1/6'
                _height={ 3 }
                borderRadius='sphere'
                backgroundColor={ '4.layer.darken' }
              />
              <Flex
                flexType="col"
                gap={ '1/3' }
                padding={ [ 0,2 ] }
              >
                <Box fontColor={ '4.thin' }>
                  レジ内想定金額
                </Box>
                <Box
                  fontSize='4.thirdTitle'
                >
                  ¥18,766
                </Box>
              </Flex>
            </Flex>
            <Flex
              flexGrid={ 1 }
              flexType="col"
              gap={ 1 }
              freeCSS={ {
                whiteSpace: 'nowrap'
              } }
            >
              <Buttons.Button.Prime
                padding={ 1.5 }
                ssEffectsOnActive='shrink'
                onClick={ () => {
                  RegiCheckFN();
                } }
              >
                レジ点検・精算
              </Buttons.Button.Prime>
              <Flex
                gap={ 1 }
                flexWrap={ false }
                flexChilds='even'
              >
                <Buttons.Button.Border
                  padding={ 1 }
                  onClick={ () => {
                    CreateDWFN();
                  } }
                >
                  入出金
                </Buttons.Button.Border>
                <Buttons.Button.Border
                  ssMiniLoader={ { color: 'theme' } }
                  padding={ 1 }
                  onClick={ () => {
                    Loader.fn.active( 'mini' );

                    setTimeout( () => {
                      Loader.fn.stop();
                    },2000 );
                  } }
                >
                  ドロアを開く
                </Buttons.Button.Border>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </>
    );
  },
  Body: ( params: ContentParams ) => {
    let DataData: amotify.fn.Tables.Data.BodyRowParams[] = [];

    let {
      dws,
      rcs
    } = params.val_def;

    for ( let dw of dws ) {
      let {
        id,
        type,
        price,
        name,
        description,
        eventDate,
        eventTime,
        staffId,
        staffName
      } = dw;
      let Row: amotify.fn.Tables.Data.BodyRowParams = [
        {
          type: 'th',
          data: appEnv.depositWithdrawTypeName( type )
        },{
          type: 'td',
          data: [ eventDate,eventTime ].join( ' ' )
        },{
          type: 'td',
          data: price,
          children: '¥' + price.toLocaleString()
        },{
          type: 'td',
          data: staffName || '--'
        },{
          type: 'td',
          data: '',
          children: <>
            <Box
              textAlign='left'
            >
              { name }
              <Box
                fontSize='1.mini'
                fontColor='4.thin'
              >
                { description }
              </Box>
            </Box>
          </>
        }
      ]
      DataData.push( Row );
    }
    for ( let rc of rcs ) {
      let {
        id,
        type,
        total_price,
        description,
        eventDate,
        eventTime,
        staffId,
        staffName
      } = rc;
      let Row: amotify.fn.Tables.Data.BodyRowParams = [
        {
          type: 'th',
          data: appEnv.regiCheckTypeName( type )
        },{
          type: 'td',
          data: [ eventDate,eventTime ].join( ' ' )
        },{
          type: 'td',
          data: total_price,
          children: '¥' + total_price.toLocaleString()
        },{
          type: 'td',
          data: staffName || '--'
        },{
          type: 'td',
          data: '',
          children: <>
            <Box
              textAlign='left'
            >
              <Box
                fontColor='nega'
              >
                過不足金 -¥780
              </Box>
              <Box
                fontSize='1.mini'
                fontColor='4.thin'
              >
                { description }
              </Box>
            </Box>
          </>
        }
      ]
      DataData.push( Row );
    }

    for ( var i = 0; i < 3; i++ ) {
      let Row: amotify.fn.Tables.Data.BodyRowParams = [
        {
          type: 'th',
          data: '現金売上'
        },{
          type: 'td',
          data: $.Time().toFormatYMDHMS()
        },{
          type: 'td',
          data: 21000,
          children: '¥' + ( 21000 ).toLocaleString()
        },{
          type: 'td',
          data: 'John Smith'
        },{
          type: 'td',
          data: '--'
        }
      ]
      DataData.push( Row );
    }

    return (
      <Flex
        flexType="col"
        gap={ 1 }
      >
        <Flex
          fontSize='4.thirdTitle'
          gap={ '1/2' }
          verticalAlign='baseline'
        >
          <FontAwesomeIcon
            d='list'
            fontColor={ 'theme' }
            fontSize='5.subTitle'
          />
          履歴
          <Span
            fontSize='2.normal'
            fontColor='4.thin'
          >
            ( 直近7日間 )
          </Span>
          <Box flexSizing={ 'auto' } />
          <Buttons.Anchor.Link
            fontSize='2.normal'
            href=""
          >
            <Span>
              すべての履歴
            </Span>
            <FontAwesomeIcon
              iconStyle='regular'
              d="angle-right"
            />
          </Buttons.Anchor.Link>
        </Flex>
        <Table.Data
          colLength={ 5 }
          tone='rowBorder'
          ssCardBox
          head={ [
            { data: '種別' },
            { data: '日時' },
            { data: '金額' },
            { data: '担当' },
            { data: '備考' }
          ] }
          rows={ DataData }
          onRowClick={ () => {
            console.log( 'yhiul;jok' );
          } }
          options={ {
            sizeFixed: false,
            consoleEnabled: false,
            order: [ true,true,true,true ],
            filter: [ true ],
            defaultOrder: [ 1,'DESC' ],
            defaultRowLength: 100
          } }
        />
      </Flex>
    );
  },
  Placeholder: () => {
    return (
      <>
        <Flex
          flexType="col"
          gap={ 1 }
        >
          <Placeholder
            backgroundColor={ '2.tone.reverse' }
            freeCSS={ {
              height: 12 * 4
            } }
          />
          <Flex
            gap={ 1 }
            freeCSS={ {
              height: 12 * 9
            } }
          >
            <Placeholder
              backgroundColor={ '2.tone.reverse' }
              flexGrid={ 2 }
            />
            <Flex
              flexType="col"
              gap={ 1 }
              flexGrid={ 1 }
              flexChilds='even'
            >
              <Placeholder
                backgroundColor={ '2.tone.reverse' }
              />
              <Placeholder
                backgroundColor={ '2.tone.reverse' }
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex
          flexType="col"
          gap={ 1 }
        >
          <Placeholder
            backgroundColor={ '2.tone.reverse' }
            freeCSS={ {
              height: 12 * 4
            } }
          />
          <Placeholder
            backgroundColor={ '2.tone.reverse' }
            freeCSS={ {
              height: 12 * 30
            } }
          />
        </Flex>
      </>
    );
  },
  RegiChecks: {
    MoneyCell: ( params: {
      moneyType: number
      formName: string
      val_denomination: any
      set_denomination: React.Dispatch<React.SetStateAction<any>>
    } ) => {
      let [ val_amount,set_amount ] = useState( 0 );

      return (
        <>
          <Box
            textAlign="right"
            freeCSS={ {
              width: 12 * 8
            } }
          >
            { params.moneyType.toLocaleString() }円{ params.moneyType >= 1000 ? '札' : '玉' }
          </Box>
          <FontAwesomeIcon
            iconStyle='regular'
            fontColor='4.thin'
            d="times"
          />
          <Input.Text.DigitNumber
            placeholder="枚数の入力"
            textAlign='right'
            wrapStyles={ {
              flexGrid: 1
            } }
            required
            form={ params.formName }
            name={ 'jpy_' + params.moneyType }
            value={ val_amount }
            onUpdateValidValue={ ( { value } ) => {
              let Value = Number( value );
              set_amount( Value );

              let newValue: any = {}
              newValue[ 'jpy_' + params.moneyType ] = Value;
              params.set_denomination( {
                ...params.val_denomination,
                ...newValue
              } );
            } }
            rightIndicator={ <Input.Attachment.RightIndicator>
              枚
            </Input.Attachment.RightIndicator> }
          />
          <FontAwesomeIcon
            iconStyle='regular'
            fontColor='4.thin'
            d="equals"
          />
          <Box
            textAlign="right"
            flexGrid={ 1 }
          >
            ¥{ ( params.moneyType * val_amount ).toLocaleString() }
          </Box>
        </>
      );
    }
  }
}

export const RegiCheck: FNC<{}> = () => {
  let [ val_init,set_init ] = useState( false );
  let [ val_def,set_def ] = useState( {} as DefParams );

  useEffect( () => {
    $.fetch.post( {
      key: 'listRegiCheck',
      url: '/regi-check/dashboard',
      trafficControl: 1000
    },( result ) => {
      if ( !result.ok ) return;
      set_init( true );
      set_def( {
        ...result.body
      } );
    } );
  },[] );

  let Contents = <></>;

  if ( !val_init ) {
    Contents = <Components.Placeholder />;
  } else {
    Contents = <>
      <Components.Header
        val_def={ val_def }
        set_def={ set_def }
      />
      <Components.Body
        val_def={ val_def }
        set_def={ set_def }
      />
    </>
  }

  return (
    <Layout.Plate
      padding={ 3 }
      UnderBreakPointStyles={ {
        padding: 1
      } }
    >
      <Flex
        flexType="col"
        gap={ 3 }
      >
        { Contents }
      </Flex>
    </Layout.Plate>
  );
}