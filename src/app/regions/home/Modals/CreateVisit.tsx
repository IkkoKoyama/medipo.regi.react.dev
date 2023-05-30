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
    Grid,
    Span
  },
  mols: {
    List
  },
  fn: {
    Input,
    Buttons,
    SnackBar,
    Layout,
    Table,
    Modal
  }
} = amotify;

export const CreateVisitFN = ( baseParams?: {
  viaType?: number
  customerId?: number
  arriveTime?: string
  arriveDate?: string
  callback: Function
} ) => {
  let modalId = 'CreateVisitModal';
  let formName = 'CreateVisitModal';

  Modal.open( {
    modalId: modalId,
    type: 'center',
    content: () => {
      let today = new Date();

      let [ val_staffs,set_staffs ] = useState( [] );
      let [ val_visitReasons,set_visitReasons ] = useState( [] );
      useEffect( () => {
        $.fetch.post( {
          key: 'listStaff',
          url: '/staff/list-store-staff',
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
          set_staffs( List );
        } );
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


      type InfoParams = {
        isReserved: boolean
        useInsurance: boolean
        date: Date
        time: number[]
        customer: {
          isNewCustomer: boolean

          id?: number
          name?: string
          kana?: string
          customId?: string
          tel1?: string
          birthday?: string
          gender?: number
        }
      }


      const Components = {
        Header: () => {
          return (
            <Modal.Attachment.Header
              horizontalAlign='between'
              gap={ 1 }
            >
              <Box>
                来店受付
              </Box>
              <Buttons.Button.Border
                onClick={ () => {
                  Modal.close.pin( modalId );
                } }
              >
                <FontAwesomeIcon
                  iconStyle='regular'
                  d="times"
                /> 取り消し
              </Buttons.Button.Border>
            </Modal.Attachment.Header>
          );
        },
        Body: {
          _: () => {
            let [ val_phase,set_phase ] = useState( 0 );
            let [ val_info,set_info ] = useState( {
              isReserved: false,
              useInsurance: false,
              date: today,
              time: [ 15,0 ],
              customer: {
                isNewCustomer: false,
                useInsurance: false,
              }
            } as InfoParams );

            return (
              <>
                <Components.Body.Indicator
                  val_phase={ val_phase }
                  set_phase={ set_phase }
                />
                <Layout.PageViewController
                  viewIndex={ val_phase }
                  views={ [
                    <Components.Body.When
                      val_phase={ val_phase }
                      set_phase={ set_phase }
                      val_info={ val_info }
                      set_info={ set_info }
                    />,
                    <Components.Body.Who
                      val_phase={ val_phase }
                      set_phase={ set_phase }
                      val_info={ val_info }
                      set_info={ set_info }
                    />,
                    <Components.Body.Remind
                      val_phase={ val_phase }
                      set_phase={ set_phase }
                      val_info={ val_info }
                      set_info={ set_info }
                    />,
                  ] }
                />
              </>
            );
          },
          Indicator: ( params: {
            val_phase: number
            set_phase: React.Dispatch<React.SetStateAction<number>>
          } ) => {
            let StyleCurrent = {
              fontColor: "theme",
              fontWeight: '3.bold'
            },Style1 = {},Style2 = {},Style3 = {}

            if ( params.val_phase == 0 ) {
              Style1 = StyleCurrent;
            } else if ( params.val_phase == 1 ) {
              Style2 = StyleCurrent;
            } else if ( params.val_phase == 2 ) {
              Style3 = StyleCurrent;
            }
            return (
              <Flex
                gap={ 1 }
                flexWrap={ false }
                horizontalAlign='center'
                borderBottom
                padding={ 1 }
              >
                <Box { ...Style1 }>
                  日時設定
                </Box>
                <FontAwesomeIcon
                  iconStyle='solid'
                  d="angle-right"
                />
                <Box { ...Style2 }>
                  お客様情報
                </Box>
                <FontAwesomeIcon
                  iconStyle='solid'
                  d="angle-right"
                />
                <Box { ...Style3 }>
                  その他・確認
                </Box>
              </Flex>
            );
          },
          When: ( params: {
            val_phase: number
            set_phase: React.Dispatch<React.SetStateAction<number>>
            val_info: InfoParams
            set_info: React.Dispatch<React.SetStateAction<InfoParams>>
          } ) => {
            let [ val_isReserved,set_isReserved ] = useState( params.val_info.isReserved );
            let [ val_date,set_date ] = useState( $.Time( today ) );
            let [ val_time,set_time ] = useState( [ 15,0 ] );

            let DatesSelect: ReactElement[] = [];

            let CellStyles: amotifyUniStyleParams = {
              fontSize: '4.thirdTitle',
              padding: [ 1,2 ],
              border: 'unset',
              borderRadius: 0,
              borderBottom: true,
            }
            for ( let index = 0; index < ( 7 * 3 ); index++ ) {
              let date = val_date.addDate( index );
              let JPIndi = <></>;
              if ( index <= 2 ) {
                JPIndi = <Box
                  border
                  padding={ '1/3' }
                  borderRadius={ '2.tone.secondary' }
                  fontSize='2.normal'
                >
                  { [ '今日','明日','明後日' ][ index ] }
                </Box>
              }
              let dateTitle = date.toOrder( [ 'month','date' ] ).join( '/' );
              let weekday = date.weekday;
              let weekdayTitle = $.transformer.weekday.shortJP( weekday );

              DatesSelect.push( <Buttons.Button.Border
                { ...CellStyles }
                textAlign="left"
                onClick={ () => {
                  set_date( date );
                } }
              >
                <Flex
                  verticalAlign="center"
                  gap={ 1 }
                >
                  <Box
                    freeCSS={ {
                      color: weekday == 0 ? 'red' : weekday == 6 ? 'blue' : 'inherit'
                    } }
                  >
                    { dateTitle } ({ weekdayTitle })
                  </Box>
                  { JPIndi }
                </Flex>
              </Buttons.Button.Border> );
            }

            let HoursSelect: ReactElement[] = [];
            let MinutesSelect: ReactElement[] = [];

            for ( let index = 0; index < 24; index++ ) {
              let Value = index.zeroEmbed( 2 );
              HoursSelect.push( <Buttons.Button.Border
                { ...CellStyles }
                onClick={ () => {
                  set_time( [ index,val_time[ 1 ] ] );
                } }
                children={ Value }
              /> );
            }
            for ( let index = 0; index < 12; index++ ) {
              let Value = ( index * 5 ).zeroEmbed( 2 );

              MinutesSelect.push( <Buttons.Button.Border
                { ...CellStyles }
                onClick={ () => {
                  set_time( [ val_time[ 0 ],index * 5 ] );
                } }
                children={ Value }
              /> );
            }

            return (
              <>
                <Flex
                  padding={ 2 }
                  flexType="col"
                  gap={ 2 }
                >
                  <Flex flexCenter>
                    <Input.List.Radio.IconBorder
                      value={ val_isReserved }
                      onUpdateValidValue={ ( { value } ) => {
                        set_isReserved( value[ 0 ] );
                      } }
                      cellStyles={ {
                        flexSizing: 'auto',
                        flexCenter: true
                      } }
                      list={ [
                        { value: false,label: '当日受付' },
                        { value: true,label: '予約受付' }
                      ] }
                      form={ formName }
                      name='isReserved'
                    />
                  </Flex>
                  <Flex
                    horizontalAlign="center"
                    { ...val_isReserved ? {
                      flexWrap: false,
                      gap: 2
                    } : {
                      gap: 1,
                      flexType: 'col'
                    } }
                  >
                    <Flex
                      flexType="col"
                      gap={ 1 }
                    >
                      <Flex
                        flexCenter
                        gap={ '1/2' }
                      >
                        <Box fontColor='3.blur'>日付 :</Box>
                        <Box fontSize='4.thirdTitle'>
                          { val_date.toFormatYMD() } ({ $.transformer.weekday.shortJP( val_date.weekday ) })
                        </Box>
                      </Flex>
                      { val_isReserved ? <>
                        <Box
                          ssCardBox
                          ssLastChildLossBorder='bottom'
                          borderRadius={ '1.tone.primary' }
                          overflow={ 'auto' }
                          padding={ '1/2' }
                          children={ <>
                            { DatesSelect }
                          </> }
                          flexSizing={ 0 }
                        />
                        <Buttons.Button.Border
                          fontColor="theme"
                          backgroundColor='2.layer.cloud'
                          flexSizing={ 'none' }
                        >
                          <FontAwesomeIcon
                            d="calendar-alt"
                          /> 他の日付を選択
                        </Buttons.Button.Border>
                      </> : null }
                    </Flex>
                    <Flex
                      flexType="col"
                      gap={ 1 }
                    >
                      <Flex
                        flexCenter
                        gap={ '1/2' }
                      >
                        <Box fontColor='3.blur'>時間 :</Box>
                        <Box fontSize='4.thirdTitle'>
                          { val_time[ 0 ].zeroEmbed( 2 ) }:{ val_time[ 1 ].zeroEmbed( 2 ) }
                        </Box>
                      </Flex>
                      <Flex
                        flexWrap={ false }
                        gap={ 1 }
                        flexCenter
                      >
                        <Box
                          ssCardBox
                          ssLastChildLossBorder='bottom'
                          borderRadius={ '1.tone.primary' }
                          overflow={ 'auto' }
                          freeCSS={ {
                            maxHeight: 12 * 30
                          } }
                          padding={ '1/2' }
                          children={ <>
                            { HoursSelect }
                          </> }
                        />
                        <Box
                          ssCardBox
                          ssLastChildLossBorder='bottom'
                          borderRadius={ '1.tone.primary' }
                          overflow={ 'auto' }
                          freeCSS={ {
                            maxHeight: 12 * 30
                          } }
                          padding={ '1/2' }
                          children={ <>
                            { MinutesSelect }
                          </> }
                        />
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  horizontalAlign='right'
                  gap={ 1 }
                  padding={ [ 1,2 ] }
                  borderTop
                >
                  <Buttons.Button.Prime
                    isLocked={ !( !!val_date && !!val_time ) }
                    onClick={ () => {
                      params.set_phase( 1 );
                      params.set_info( {
                        ...params.val_info,
                        date: val_date.value,
                        time: val_time,
                        isReserved: val_isReserved
                      } );
                    } }
                  >
                    次へ <FontAwesomeIcon
                      iconStyle='regular'
                      d="angle-right"
                    />
                  </Buttons.Button.Prime>
                </Flex>
              </>
            );
          },
          Who: ( params: {
            val_phase: number
            set_phase: React.Dispatch<React.SetStateAction<number>>
            val_info: InfoParams
            set_info: React.Dispatch<React.SetStateAction<InfoParams>>
          } ) => {
            let formName = 'CreateVisitModalCustomer';

            let [ val_isNewCustomer,set_isNewCustomer ] = useState( params.val_info.customer.isNewCustomer );
            let [ val_useInsurace,set_useInsurance ] = useState( params.val_info.useInsurance );

            let Content: ReactElement;
            if ( val_isNewCustomer ) {
              Content = <Flex>
                <List
                  gap={ 1 }
                  rowStyles={ {
                    gap: 1,
                    verticalAlign: 'center'
                  } }
                  rows={ [
                    {
                      children: <>
                        <Flex
                          flexWrap={ false }
                          flexSizing={ 'none' }
                          freeCSS={ { width: 12 * 10 } }
                          horizontalAlign="right"
                        >
                          <Input.Attachment.RequiredSign type='plain' /> フリガナ
                        </Flex>
                        <Input.Text.Normal
                          wrapStyles={ {
                            flexGrid: 2
                          } }
                          required
                          placeholder='ナマエを入力'
                          form={ formName }
                          name='kana'
                          rightIndicator={ <Input.Attachment.RightIndicator>
                            様
                          </Input.Attachment.RightIndicator> }
                        />
                      </>
                    },{
                      children: <>
                        <Flex
                          flexWrap={ false }
                          flexSizing={ 'none' }
                          freeCSS={ { width: 12 * 10 } }
                          horizontalAlign="right"
                        >
                          { val_useInsurace ? <Input.Attachment.RequiredSign type='plain' /> : null } 名前
                        </Flex>
                        <Input.Text.Normal
                          wrapStyles={ {
                            flexGrid: 2
                          } }
                          required={ val_useInsurace }
                          placeholder='姓・名を入力'
                          form={ formName }
                          name='name'
                          rightIndicator={ <Input.Attachment.RightIndicator>
                            様
                          </Input.Attachment.RightIndicator> }
                        />
                      </>
                    },{
                      children: <>
                        <Flex
                          flexWrap={ false }
                          flexSizing={ 'none' }
                          freeCSS={ { width: 12 * 10 } }
                          horizontalAlign="right"
                        >
                          <Input.Attachment.RequiredSign type='plain' /> 電話番号
                        </Flex>
                        <Input.Text.Tel
                          form={ formName }
                          name='tel1'
                          required
                        />
                      </>
                    },{
                      children: <>
                        <Flex
                          flexWrap={ false }
                          flexSizing={ 'none' }
                          freeCSS={ { width: 12 * 10 } }
                          horizontalAlign="right"
                        >
                          顧客ID
                        </Flex>
                        <Input.Text.Normal
                          placeholder='顧客ID'
                          form={ formName }
                          name='customId'
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
                      </>
                    },{
                      children: <>
                        <Flex
                          flexWrap={ false }
                          flexSizing={ 'none' }
                          freeCSS={ { width: 12 * 10 } }
                          horizontalAlign="right"
                        >
                          { val_useInsurace ? <Input.Attachment.RequiredSign type='plain' /> : null } 性別
                        </Flex>
                        <Input.List.Radio.Border
                          list={ [
                            { value: 1,label: '男性' },
                            { value: 2,label: '女性' },
                            { value: 3,label: '無回答' }
                          ] }
                          required={ val_useInsurace }
                          form={ formName }
                          name='gender'
                        />
                      </>
                    },{
                      children: <>
                        <Flex
                          flexWrap={ false }
                          flexSizing={ 'none' }
                          freeCSS={ { width: 12 * 10 } }
                          horizontalAlign="right"
                        >
                          { val_useInsurace ? <Input.Attachment.RequiredSign type='plain' /> : null } 生年月日
                        </Flex>
                        <Input.Time.DateWareki
                          required={ val_useInsurace }
                          form={ formName }
                          name='birthday'
                        />
                      </>
                    }
                  ] }
                />
              </Flex>
            } else {
              Content = <Input.Search
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
                          { Content }
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
                        </Flex>
                      </>
                    }
                  }
                } }
              />
            }

            return (
              <>
                <Flex
                  flexType="col"
                  gap={ 2 }
                  padding={ 2 }
                >
                  <Flex
                    gap={ 1 }
                    horizontalAlign='between'
                  >
                    <Input.List.Radio.IconBorder
                      value={ val_isNewCustomer }
                      onUpdateValidValue={ ( { value } ) => {
                        set_isNewCustomer( value[ 0 ] );
                      } }
                      cellStyles={ {
                        flexSizing: 'auto',
                        flexCenter: true
                      } }
                      list={ [
                        { value: false,label: '既存顧客' },
                        { value: true,label: '新規顧客' }
                      ] }
                      form={ formName }
                      name='isNewCustomer'
                    />
                    <Input.List.Checkbox.IconBorder
                      value={ val_useInsurace }
                      list={ [
                        { value: true,label: '保険施術を利用' }
                      ] }
                      cellStyles={ {
                        flexSizing: 'auto',
                        flexCenter: true
                      } }
                      onUpdateValidValue={ ( { value } ) => {
                        let Value = Boolean( value[ 0 ] );
                        set_useInsurance( Value );
                      } }
                      form={ formName }
                      name='useInsurance'
                    />
                  </Flex>
                  { Content }
                </Flex>
                <Flex
                  horizontalAlign='between'
                  gap={ 1 }
                  padding={ [ 1,2 ] }
                  borderTop
                >
                  <Buttons.Button.Border
                    onClick={ () => {
                      params.set_phase( 0 );
                    } }
                  >
                    <FontAwesomeIcon
                      iconStyle='regular'
                      d="angle-left"
                    /> 戻る
                  </Buttons.Button.Border>
                  <Buttons.Button.Prime
                    submitOption={ {
                      formName,
                      callback: ( form ) => {
                        let useInsurance = Boolean( form.useInsurance[ 0 ] );

                        let data = form.customer || form;
                        params.set_info( {
                          ...params.val_info,
                          useInsurance,
                          customer: {
                            ...data
                          }
                        } )
                        params.set_phase( 2 );
                      }
                    } }
                  >
                    次へ <FontAwesomeIcon
                      iconStyle='regular'
                      d="angle-right"
                    />
                  </Buttons.Button.Prime>
                </Flex>
              </>
            );
          },
          Remind: ( params: {
            val_phase: number
            set_phase: React.Dispatch<React.SetStateAction<number>>
            val_info: InfoParams
            set_info: React.Dispatch<React.SetStateAction<InfoParams>>
          } ) => {
            let {
              val_info
            } = params;
            let {
              customer
            } = val_info;

            let arriveDate = $.Time( val_info.date ).toFormatYMD();
            let arriveTime = val_info.time[ 0 ].zeroEmbed( 2 ) + ':' + val_info.time[ 1 ].zeroEmbed( 2 );


            return (
              <>
                <Flex
                  padding={ 2 }
                  flexCenter
                >
                  <Flex
                    flexType="col"
                    gap={ 2 }
                    freeCSS={ {
                      minWidth: '50%'
                    } }
                  >
                    <Box
                      flexCenter
                      padding={ 1 }
                    >
                      以下の内容で受付を確定します
                    </Box>
                    <Input.Select
                      placeholder="受付スタッフ"
                      list={ val_staffs }
                      form={ formName }
                      name='staffId'
                    />
                    <Table.Normal
                      colLength={ 2 }
                      tone='border'
                      border
                      cellStyles={ {
                        padding: '1/2'
                      } }
                      head={ false }
                      rows={ [
                        [
                          { children: '-' },
                          { children: val_info.isReserved ? '予約受付' : '来店受付' }
                        ],[
                          { children: '来店日' },
                          {
                            children: arriveDate + '(' + $.transformer.weekday.shortJP( val_info.date.getDay() ) + ')'
                          }
                        ],[
                          { children: '来店時刻' },
                          { children: arriveTime }
                        ],[
                          { children: '時間枠' },
                          { children: '約30分' }
                        ]
                      ] }
                    />
                    <Table.Normal
                      colLength={ 2 }
                      tone='border'
                      border
                      cellStyles={ {
                        padding: '1/2'
                      } }
                      head={ false }
                      rows={ [
                        [
                          { children: '-' },
                          { children: customer.isNewCustomer ? '新規顧客' : '既存顧客' }
                        ],[
                          { children: 'かな' },
                          {
                            children: customer.kana || '--'
                          }
                        ],[
                          { children: '名前' },
                          {
                            children: customer.name || '--'
                          }
                        ],[
                          { children: '電話番号' },
                          { children: customer.tel1 || '--' }
                        ],[
                          { children: '性別' },
                          { children: appEnv.genderName( customer.gender || 0 ) }
                        ],[
                          { children: '生年月日' },
                          { children: customer.birthday }
                        ]
                      ] }
                    />
                    <Input.Wrapper.Normal
                      label='来店経由'
                    >
                      <Input.Select
                        list={ val_visitReasons }
                        form={ formName }
                        name='visitViaId'
                      />
                    </Input.Wrapper.Normal>
                    <Input.TextArea
                      placeholder='メモ等'
                      form={ formName }
                      name='description'
                    />
                  </Flex>
                </Flex>
                <Flex
                  horizontalAlign='between'
                  gap={ 1 }
                  padding={ [ 1,2 ] }
                  borderTop
                >
                  <Buttons.Button.Border
                    onClick={ () => {
                      params.set_phase( 1 );
                    } }
                  >
                    <FontAwesomeIcon
                      iconStyle='regular'
                      d="angle-left"
                    /> 戻る
                  </Buttons.Button.Border>
                  <Buttons.Button.Prime
                    onClick={ async () => {
                      let otherForm = await $.formCollect( formName );
                      if ( !otherForm.valid ) return;

                      let Form: any = {
                        useInsurance: val_info.useInsurance,
                        isReserved: val_info.isReserved,
                        arriveDate,
                        arriveTime,
                        ...otherForm.data
                      }

                      if ( val_info.customer.isNewCustomer ) {
                        let customerUuid = $.uuidGen();

                        let FormCreateCustomer = {
                          uuid: customerUuid,
                          kana: customer.kana,
                          name: customer.name,
                          tel1: customer.tel1,
                          birthday: customer.birthday,
                          gender: customer.gender,
                          customId: customer.customId
                        }
                        let createCustomerResult = await $.fetch.post( {
                          key: 'createCustomer',
                          url: '/customer/create',
                          body: FormCreateCustomer
                        } );
                        if ( !createCustomerResult.ok ) return;

                        Form.customerId = createCustomerResult.body.createCustomer.insertId;
                      } else {
                        Form.customerId = customer.id;
                      }

                      let uuid = $.uuidGen();

                      Form = {
                        ...Form,
                        uuid,
                      }
                      if ( $.is.nullish( Form.customerId ) ) return;

                      $.fetch.post( {
                        key: 'CreateVisit',
                        url: '/visit/create',
                        body: Form
                      },( result ) => {
                        if ( !result.ok ) return;
                        Modal.close.pin( modalId );
                        SnackBar.add( {
                          backgroundColor: 'theme',
                          fontColor: 'white',
                          children: <>
                            受付の登録が完了しました
                          </>
                        } );
                        if ( baseParams?.callback ) {
                          baseParams?.callback();
                        }
                      } );
                    } }
                  >
                    登録 <FontAwesomeIcon
                      iconStyle='regular'
                      d="paper-plane-top"
                    />
                  </Buttons.Button.Prime>
                </Flex>
              </>
            );
          }
        }
      }

      return (
        <>
          <Components.Header />
          <Components.Body._ />
        </>
      );
    }
  } );
}

const test = () => {
  let modalId = 'CreateVisitModal';
  let formName = 'CreateVisitModal';

  let [ val_isReserved,set_isReserved ] = useState( false );
  let [ val_newCustomer,set_newCustomer ] = useState( false );
  let [ val_useInurance,set_useInsurance ] = useState( false );

  let [ val_staffs,set_staffs ] = useState( [] );
  let [ val_visitReasons,set_visitReasons ] = useState( [] );
  useEffect( () => {
    $.fetch.post( {
      key: 'listStaff',
      url: '/staff/list-store-staff',
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
      set_staffs( List );
    } );
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

  const ConsoleRegion = <>
    <Input.List.Radio.IconBorder
      value={ val_isReserved }
      onUpdateValidValue={ ( { value } ) => {
        set_isReserved( value[ 0 ] );
      } }
      cellStyles={ {
        flexSizing: 'auto',
        flexCenter: true
      } }
      list={ [
        { value: false,label: '当日受付' },
        { value: true,label: '予約受付' }
      ] }
      form={ formName }
      name='isReserved'
    />
    <Input.List.Radio.IconBorder
      value={ !!val_newCustomer }
      list={ [
        { value: true,label: '新規顧客' },
        { value: false,label: '既存顧客' }
      ] }
      cellStyles={ {
        flexSizing: 'auto',
        flexCenter: true
      } }
      onUpdateValidValue={ ( { value } ) => {
        set_newCustomer( value[ 0 ] );
      } }
      form={ formName }
      name='newCustomer'
    />
    <Input.List.Checkbox.IconBorder
      value={ val_useInurance }
      list={ [
        { value: true,label: '保険施術を利用' }
      ] }
      cellStyles={ {
        flexSizing: 'auto',
        flexCenter: true
      } }
      onUpdateValidValue={ ( { value } ) => {
        set_useInsurance( value[ 0 ] );
      } }
      form={ formName }
      name='useInsurance'
    />
  </>;
  const LeftRegion = <>
    <Flex
      flexSizing='none'
      flexType='col'
      gap={ 1 }
      padding={ 1.5 }
      borderBottom
    >
      { ConsoleRegion }
    </Flex>
    <Flex
      flexType='col'
      gap={ 1 }
      padding={ 1.5 }
      flexSizing='auto'
      backgroundColor='2.layer.cloud'
    >
      <Input.Wrapper.Normal
        label='受付担当'
      >
        <Input.Select
          list={ val_staffs }
          form={ formName }
          name='staffId'
        />
      </Input.Wrapper.Normal>
      <Input.Wrapper.Normal
        label='来店日'
      >
        <Input.Time.Date
          required
          form={ formName }
          name='arriveDate'
          override='force'
          // value={ !val_isReserved ? new Date().trimString( [ 'year','month','date' ] ).join( '-' ) : '' }
          disabled={ !val_isReserved }
          onValidate={ async ( { value } ) => {
            let Result: amotify.fn.Input.Validation.Result = {
              ok: true,
              notice: []
            }
            let Value = Number( value[ 0 ].replace( /\D/ig,'' ) );
            // let Today = Number( new Date().trimString( [ 'year','month','date' ] ).join( '' ) );
            // if ( Value < Today ) {
            //   Result = {
            //     ok: false,
            //     notice: [ {
            //       type: 'invalid',
            //       label: '今日以降の日付を入力してください'
            //     } ]
            //   }
            // }

            return Result;
          } }
        />
      </Input.Wrapper.Normal>
      <Input.Wrapper.Normal
        label='来店時間'
        required
      >
        <Input.Time.Clock
          required
          override='force'
          // value={ !val_isReserved ? new Date().trimString( [ 'hours','minutes' ] ).join( '-' ) : '' }
          form={ formName }
          name='arriveTime'
        />
      </Input.Wrapper.Normal>
      <Input.Wrapper.Normal
        label='来店経由'
      >
        <Input.Select
          list={ val_visitReasons }
          form={ formName }
          name='visitViaId'
        />
      </Input.Wrapper.Normal>
      <Input.TextArea
        placeholder='メモ欄'
        form={ formName }
        name='description'
      />
    </Flex>
  </>;

  let CustomerRegion: ReactElement;
  let InsuranceRegion: ReactElement;

  if ( val_newCustomer ) {
    CustomerRegion = <>
      <Input.Wrapper.Normal
        label='フリガナ'
        required
      >
        <Input.Text.Normal
          required
          placeholder='ナマエを入力'
          form={ formName }
          name='kana'
          rightIndicator={ <Input.Attachment.RightIndicator>
            様
          </Input.Attachment.RightIndicator> }
        />
      </Input.Wrapper.Normal>
      <Input.Wrapper.Normal
        label='電話番号'
        required
      >
        <Input.Text.Tel
          form={ formName }
          name='tel1'
          required
        />
      </Input.Wrapper.Normal>

      <Flex
        gap={ 1 }
        flexChilds='auto'
      >
        <Input.Wrapper.Normal
          label='名前'
        >
          <Input.Text.Normal
            placeholder='姓・名を入力'
            form={ formName }
            name='name'
          />
        </Input.Wrapper.Normal>
        <Input.Wrapper.Normal
          label='顧客ID'
        >
          <Input.Text.Normal
            placeholder='顧客ID'
            form={ formName }
            name='customId'
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
        </Input.Wrapper.Normal>
        <Input.Wrapper.Normal
          label='性別'
        >
          <Input.List.Radio.Border
            list={ [
              { value: 1,label: '男性' },
              { value: 2,label: '女性' },
              { value: 3,label: '無回答' }
            ] }
            form={ formName }
            name='gender'
          />
        </Input.Wrapper.Normal>
        <Input.Wrapper.Normal
          label='生年月日'
        >
          <Input.Time.DateWareki
            form={ formName }
            name='birthday'
          />
        </Input.Wrapper.Normal>
      </Flex>
    </>
  } else {
    CustomerRegion = <Input.Search
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
  }
  if ( val_useInurance ) {
    InsuranceRegion = <>
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

    </>
  }

  return (
    <>
      <Modal.Attachment.Header>
        来店受付
      </Modal.Attachment.Header>
      <Flex
        flexWrap={ false }
        UnderBreakPointStyles={ {
          flexType: 'col'
        } }
      >
        <Flex
          flexType='col'
          flexGrid={ 3 }
          borderRight
        >
          { LeftRegion }
        </Flex>
        <Flex
          flexType='col'
          gap={ 1 }
          padding={ 1.5 }
          flexGrid={ 4 }
        >
          <Box
            fontWeight='3.bold'
          >
            患者情報
            <Box
              marginTop={ '1/2' }
              _height={ '1/3' }
              backgroundColor={ '4.layer.darken' }
              borderRadius='sphere'
            />
          </Box>
          { CustomerRegion }
          { val_useInurance ? <>
            <Box fontWeight='3.bold'>
              保険情報
              <Box
                marginTop={ '1/2' }
                _height={ '1/3' }
                backgroundColor={ '4.layer.darken' }
                borderRadius='sphere'
              />
            </Box>
            { InsuranceRegion }
          </> : null }
        </Flex>
      </Flex>
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
            callback: async ( form ) => {
              let {
                newCustomer,
                useInsurance,
                customer,
                ...Params
              } = form;
              newCustomer = Boolean( newCustomer );
              useInsurance = Boolean( useInsurance[ 0 ] );

              if ( newCustomer ) {
                let customerUuid = $.uuidGen();
                let {
                  kana,
                  tel1,
                  name,
                  customId,
                  gender,
                  birthday,
                  ...others
                } = Params;

                Params = others;

                let createCustomerResult = await $.fetch.post( {
                  key: 'createCustomer',
                  url: '/customer/create',
                  body: {
                    uuid: customerUuid,
                    kana,
                    name,
                    tel1,
                    birthday,
                    gender,
                    customId
                  }
                } );
                if ( !createCustomerResult.ok ) return;
                Params.customerId = createCustomerResult.body.createCustomer.insertId;
              } else {
                Params.customerId = customer?.id;
              }

              let uuid = $.uuidGen();

              let Form = {
                uuid,
                useInsurance,
                ...Params
              }

              return;
              $.fetch.post( {
                key: 'createSimpleOrder',
                url: '/visit/create',
                body: Form
              },( result ) => {
                if ( !result.ok ) return;
                Modal.close.pin( modalId );
                // if ( params?.callback ) {
                //   params?.callback();
                // }
              } );
            }
          } }
        >
          登録する
        </Buttons.Button.Prime>
      </Modal.Attachment.Footer>
    </>
  );
}