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
    Span
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
  },
  minifyComponent: {
    logos: {
      LINEIcon
    }
  }
} = amotify;


export const VisitDetailsFN = ( params: {
  uuid: string,
  callback?: Function
} ) => {
  let modalId = $.uuidGen();

  const ModalHeader = () => {
    return (
      <Modal.Attachment.Header>
        <Box
          position='absolute'
          positionTop={ 0 }
          positionBottom={ 0 }
          positionLeft={ 1 }
          flexCenter
        >
          <Buttons.Button.Border
            padding={ [ '1/2','3/4' ] }
            onClick={ () => {
              Modal.close.pin( modalId );
            } }
          >
            <FontAwesomeIcon
              iconStyle='regular'
              d="times"
              fontSize={ '3.paragraph' }
            /> 閉じる
          </Buttons.Button.Border>
        </Box>
        <Box
          textAlign='center'
          flexSizing={ 'auto' }
          fontSize='3.paragraph'
        >
          来店詳細
        </Box>
      </Modal.Attachment.Header>
    );
  }

  let ModalParams: amotify.fn.Modal.CenterLeftRightParams = {
    type: 'center',
    modalId,
    content: <>
      <ModalHeader />
      <Modal.Attachment.Body
        padding={ 3 }
      >
        <Loader
          size='L'
        />
      </Modal.Attachment.Body>
    </>
  }

  Modal.open( ModalParams );

  ( async () => {
    let { uuid } = params!;
    if ( !uuid ) return;

    $.fetch.post( {
      key: 'getTradeDetails',
      url: 'visit/details',
      body: { uuid }
    },( result ) => {
      if ( !result.ok ) return;
      if ( !result.body?.visit.length ) return;

      ModalParams.content = () => {
        let [ val_data,set_data ] = useState( {
          visit: result.body.visit[ 0 ]
        } as AppTypes.VisitDetailsParams );

        const Components = {
          Header: () => {
            let {
              visitPhase,
              arriveDate,
              arriveWeekday,
              arriveTime,
              leaveDate,
              leaveWeekday,
              leaveTime
            } = val_data.visit;

            return (
              <Flex
                gap={ 1 }
                verticalAlign='center'
              >
                <Box
                  borderRadius={ 1 }
                  border
                  borderColor='theme'
                  borderWidth={ 2 }
                  padding={ [ '1/4','3/4' ] }
                  fontWeight='3.bold'
                  fontColor='theme'
                >
                  { appEnv.visitPhaseName( visitPhase ) }
                </Box>

                { arriveDate } ({ $.transformer.weekday.shortJP( arriveWeekday ) }) { arriveTime } ~ { leaveTime }
              </Flex>
            );
          },
          Notices: () => {
            return (
              <Box
                border
                borderColor="warn"
                borderRadius='1.tone.primary'
                overflow={ 'hidden' }
              >
                <Flex
                  gap={ 1 }
                  flexWrap={ false }
                >
                  <Flex
                    flexCenter
                    borderRight
                    borderRightColor='warn'
                    freeCSS={ {
                      width: 12 * 5,
                      backgroundColor: 'rgba(var(--cWarn), .3)'
                    } }
                  >
                    <FontAwesomeIcon
                      iconStyle='solid'
                      d="exclamation-triangle"
                      fontColor='warn'
                      fontSize='5.subTitle'
                      flexSizing={ 'none' }
                    />
                  </Flex>
                  <List
                    flexSizing={ 'auto' }
                    paddingRight={ 1 }
                    rowStyles={ {
                      borderBottom: true,
                      padding: [ 1,0 ]
                    } }
                    rows={ [
                      {
                        children: <>
                          来店予定時刻を過ぎています。
                          <br />
                          スケジュールに支障をきたす場合には、お客様への連絡をお願いします。
                        </>
                      },{
                        children: <>
                          保険証の有効性を確認してください。
                        </>
                      }
                    ] }
                  />
                </Flex>
              </Box>
            );
          },
          CustomerBox: () => {
            let {
              lastVisitDate = '',
              totalVisitCount = 0,

              customerUuid,
              customerKana,
              customerName
            } = val_data.visit;

            return (
              <Flex
                flexType='col'
                gap={ 1 }
                ssCardBox
                backgroundColor='2.layer.cloud'
                padding={ 1 }
              >
                <Box>
                  <Flex
                    gap={ 1 }
                    horizontalAlign='between'
                    verticalAlign='center'
                  >
                    <Flex
                      fontSize={ '3.paragraph' }
                      fontWeight='3.bold'
                      flexWrap={ false }
                      gap={ 1 }
                    >
                      <FontAwesomeIcon
                        d="user-injured"
                        _width={ 3 }
                        _height={ 3 }
                        backgroundColor='3.layer.canvas'
                        borderRadius={ 'sphere' }
                      />
                      <Box>
                        { customerKana }様
                        <Box fontColor={ '4.thin' }>
                          { customerName || '--' }
                        </Box>
                      </Box>
                    </Flex>
                    <Buttons.Anchor.Sub
                      href={ '/customer/obj?id=' + customerUuid }
                    >
                      顧客ページへ
                    </Buttons.Anchor.Sub>
                  </Flex>
                </Box>
                <Flex
                  horizontalAlign='left'
                  gap={ 1 }
                >
                  <Flex
                    verticalAlign='center'
                    gap='1/2'
                    ssPushable
                    padding={ [ '1/2',1 ] }
                    border
                    borderRadius={ 'sphere' }
                    backgroundColor='1.layer.base'
                    copyToClipboard={ {
                      type: 'string',
                      data: '080-6995-2229'
                    } }
                  >
                    080-6995-2229 <FontAwesomeIcon
                      iconStyle='solid'
                      d="copy"
                      fontColor={ 'theme' }
                    />
                  </Flex>
                  <Flex
                    verticalAlign='center'
                    gap='1/2'
                    ssPushable
                    padding={ [ '1/2',1 ] }
                    border
                    borderRadius={ 'sphere' }
                    backgroundColor='1.layer.base'
                    copyToClipboard={ {
                      type: 'string',
                      data: '080-6995-2229'
                    } }
                  >
                    <LINEIcon
                      size='S'
                    />
                    LINE
                  </Flex>
                </Flex>
                <Flex
                  gap={ 1 }
                  horizontalAlign='left'
                  verticalAlign='center'
                >
                  <Box>
                    来店回数 : { totalVisitCount || 0 }回
                  </Box>
                  <Box>
                    最終来店 : { lastVisitDate || '--' }
                  </Box>
                </Flex>
              </Flex>
            );
          },
          TabContents: {
            _: () => {
              let [ val_tabIndex,set_tabIndex ] = useState( 0 );

              return (
                <>
                  <Layout.TabBar
                    tabIndex={ val_tabIndex }
                    horizontalAlign="left"
                    padding={ [ 0,1 ] }
                    onTabChange={ ( value ) => {
                      set_tabIndex( value );
                    } }
                    rightSpace={ <Box
                      flexSizing={ 'auto' }
                    /> }
                    tabs={ [
                      '概要',
                      '来店履歴'
                    ] }
                  />
                  <Layout.PageViewController
                    viewIndex={ val_tabIndex }
                    swipeOptions={ {
                      enable: false
                    } }
                    views={ [
                      <Components.TabContents.Dashboard />,
                      <Components.TabContents.VisitHistory />
                    ] }
                  />
                </>
              );
            },
            Dashboard: () => {
              let {
                visitUuid,
                preData
              } = val_data.visit;

              let menus: AppTypes.OrderSelectedMenuTypes[] = [];
              if ( preData ) {
                let JSON_data = $.toJson( preData );
                if ( JSON_data.ok ) {
                  menus = JSON_data.body;
                }
              }

              let MenusTableRows: amotify.fn.Tables.Normal.BodyRowParams[] = [];
              menus.forEach( ( menu ) => {
                let {
                  name = '',
                  quantity = 0,
                  price = 0,
                  taxType,
                  priceType
                } = menu;

                MenusTableRows.push( [
                  { children: name },
                  { children: quantity + '点' },
                  { children: '¥' + price.toLocaleString() + ( priceType == 2 ? ' + 税' : '' ) }
                ] );
              } );

              return (
                <List
                  gap={ 1 }
                  rowStyles={ {
                    gap: 1
                  } }
                  rows={ [
                    {
                      children: <>
                        <Box flexGrid={ 3 }>
                          <FontAwesomeIcon
                            d="yen-sign"
                          /> 合計金額
                        </Box> :
                        <Box flexGrid={ 9 }>
                          {/* ¥{ totalPriceTax.toLocaleString() } */ }
                          ¥0
                        </Box>
                      </>
                    },{
                      children: <>
                        <Box flexGrid={ 3 }>
                          <FontAwesomeIcon
                            d="heart"
                          /> 保険金額
                        </Box> :
                        <Box flexGrid={ 9 }>
                          -
                        </Box>
                      </>
                    },{
                      children: <>
                        <Box flexGrid={ 3 }>
                          <FontAwesomeIcon
                            d="heart"
                          /> 保険請求金額
                        </Box> :
                        <Box flexGrid={ 9 }>
                          -
                        </Box>
                      </>
                    },{
                      children: <>
                        <Box flexGrid={ 3 }>
                          <FontAwesomeIcon
                            d="file-lines"
                          /> 施術明細( 予定含む )
                        </Box> :
                        <Box flexGrid={ 9 }>
                          { MenusTableRows.length ?
                            <Table.Normal
                              colLength={ 3 }
                              tone='rowBorder'
                              border
                              cellStyles={ {
                                padding: '1/2'
                              } }
                              head={ [
                                { children: '名前' },
                                { children: '数量' },
                                { children: '料金' }
                              ] }
                              rows={ MenusTableRows }
                            /> : '登録されたメニューはありません' }
                        </Box>
                      </>
                    }
                  ] }
                />
              );
            },
            VisitHistory: () => {
              return (
                <>
                  来店履歴
                </>
              );
            }
          },
          Footer: () => {
            let {
              visitPhase
            } = val_data.visit;

            let Contents: ReactElement;
            if ( visitPhase == 0 ) {
              Contents = <>
                <Buttons.Button.Prime
                  onClick={ () => {
                    CompleteReceptionReserverFN( 0,100 );
                  } }
                >
                  来店受付
                </Buttons.Button.Prime>
              </>;
            } else if ( visitPhase == 100 ) {
              Contents = <>
                <Buttons.Button.Border
                  color="nega"
                  onClick={ () => {
                    CompleteReceptionReserverFN( 100,0 );
                  } }
                >
                  来店の取り消し
                </Buttons.Button.Border>
              </>;
            }

            return (
              <Modal.Attachment.Footer
                horizontalAlign='between'
              >
                <Buttons.Anchor.Border
                  fontColor="theme"
                  href={ '/order/entry?id=' + val_data.visit.visitUuid }
                >
                  ご注文入力・会計
                </Buttons.Anchor.Border>
                { Contents }
              </Modal.Attachment.Footer>
            );
          }
        }

        const CompleteReceptionReserverFN = ( from: number,to: number ) => {
          let FromTitle = appEnv.visitPhaseName( from );
          let ToTitle = appEnv.visitPhaseName( to );

          let modalId = $.uuidGen();
          let formName = 'formUpdatePhase';
          Modal.open( {
            modalId: modalId,
            type: 'center',
            size: 'S',
            closeOption: {
              type: 'remove'
            },
            content: () => {
              let {
                arriveDate,
                arriveTime,
                customerKana,
                customerName,
                customerId
              } = val_data.visit;
              return (
                <>
                  <Modal.Attachment.Body>
                    <Flex
                      flexType="col"
                      gap={ 1 }
                    >
                      <Box textAlign="center">
                        ステータスを
                        「<Span
                          fontColor="theme"
                          fontWeight='3.bold'
                          children={ FromTitle }
                        />」から「<Span
                          fontColor="theme"
                          fontWeight='3.bold'
                          children={ ToTitle }
                        />」に変更します。
                      </Box>
                      <Table.Normal
                        colLength={ 2 }
                        border
                        tone="border"
                        cellStyles={ {
                          padding: '1/2'
                        } }
                        head={ false }
                        rows={ [
                          [
                            { children: '来店日' },
                            { children: arriveDate || '--' }
                          ],[
                            { children: '来店(予定)時刻' },
                            { children: arriveTime || '--' }
                          ],[
                            { children: '顧客情報' },
                            {
                              children: customerId ? customerName || customerKana : '顧客情報が設定されていません'
                            }
                          ]
                        ] }
                      />
                      <Input.Wrapper.Normal
                        label='担当スタッフ'
                      >
                        <Input.Select
                          list={ [
                            { value: 1,label: 'staffAA' },
                            { value: 2,label: 'staffBB' },
                            { value: 3,label: 'staffCC' }
                          ] }
                          name="receptionStaffId"
                          form={ formName }
                        />
                      </Input.Wrapper.Normal>
                    </Flex>
                  </Modal.Attachment.Body>
                  <Modal.Attachment.Footer>
                    <Buttons.Button.Border
                      fontColor="theme"
                      onClick={ () => {
                        Modal.close.pin( modalId );
                      } }
                    >
                      閉じる
                    </Buttons.Button.Border>
                    <Buttons.Button.Prime
                      ssMiniLoader={ { color: 'white' } }
                      submitOption={ {
                        formName,
                        callback: ( form ) => {
                          let Form = {
                            ...form,
                            phase: to,
                            id: val_data.visit.visitId
                          }
                          $.fetch.post( {
                            key: 'updateVisitPhase',
                            url: 'visit/update-phase',
                            body: Form
                          },( result ) => {
                            if ( !result.status ) return;
                            if ( params.callback ) params.callback();

                            Modal.close.pin( modalId );
                            set_data( {
                              ...val_data,
                              visit: {
                                ...val_data.visit,
                                visitPhase: to
                              }
                            } );
                          } );
                        }
                      } }
                    >
                      来店受付
                    </Buttons.Button.Prime>
                  </Modal.Attachment.Footer>
                </>
              );
            }
          } );
        }
        useEffect( () => {
          // CompleteReceptionReserverFN();
        },[] );

        return (
          <>
            <ModalHeader />
            <Modal.Attachment.Body>
              <Flex
                flexType='col'
                gap={ 1 }
              >
                <Components.Header />
                <Components.Notices />
                <Components.CustomerBox />
                <Components.TabContents._ />
              </Flex>
            </Modal.Attachment.Body>
            <Components.Footer />
          </>
        );
      }
      Modal.update.refresh( ModalParams );
    } );
  } )();
}