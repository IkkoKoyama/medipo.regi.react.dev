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
    Img
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


const TableComps = Table.Attachment;


import style from './style.module.scss';


const PrintDocuments = {
  Receipt: ( params: AppTypes.TradeDetailsParams ) => {
    let {
      details,
      menus
    } = params || {};

    let {
      tradeUuid,
      totalPrice,
      arriveDate,
      arriveTime,
      leaveTime,
      totalPriceTax
    } = details;

    return (
      <Flex
        flexType="col"
        gap={ 1 }
        padding={ 4 }
      >
        <Box
          flexCenter
          padding={ 2 }
          fontWeight='3.bold'
          fontSize='4.thirdTitle'
          border
          borderRadius={ '1.tone.primary' }
          backgroundColor='2.layer.cloud'
        >
          Custom Shop Name
        </Box>
        <Box
          className={ style.ReceiptBorder }
        />
        <List
          rowStyles={ {
            horizontalAlign: 'between',
            gap: 1
          } }
          rows={ menus.map( ( menu ) => {
            let {
              name,
              totalPrice,
              totalPriceTax
            } = menu;

            return {
              children: <>
                <Box>
                  { name }
                </Box>
                <Box>
                  ¥{ totalPriceTax.toLocaleString() }
                </Box>
              </>
            }
          } ) }
        />
        <Box
          className={ style.ReceiptBorder }
        />

        <Flex
          horizontalAlign='between'
          gap={ 1 }
          fontSize='4.thirdTitle'
          fontWeight='3.bold'
        >
          <Box>
            合計
          </Box>
          <Box>
            ¥{ totalPriceTax.toLocaleString() }
          </Box>
        </Flex>
        <Box
          className={ style.ReceiptBorder }
        />
        <Flex
          horizontalAlign='between'
          gap={ 1 }
        >
          <Box>
            支払い方法
          </Box>
          <Box>
            クレジット払い
          </Box>
        </Flex>

        <Box>
          { arriveDate } { arriveTime } - { leaveTime }
        </Box>
        <Box>
          伝票番号 : { tradeUuid }
        </Box>
        <Box>
          担当 : tester Man
        </Box>

        <Box
          className={ style.ReceiptBorder }
        />

        <Box
          flexCenter
          padding={ 3 }
          fontWeight='3.bold'
          fontSize='4.thirdTitle'
          border
          borderRadius={ '1.tone.primary' }
          backgroundColor='2.layer.cloud'
        >
          Thank you for your purchase!
        </Box>
      </Flex>
    );
  },
  Meisaisho: ( params: AppTypes.TradeDetailsParams ) => {
    let {
      details,
      menus
    } = params;

    let {
      tradeUuid,
      totalPrice,
      arriveDate,
      arriveTime,
      leaveTime,
      totalPriceTax,
      customerName,
      customerKana
    } = details;

    return (
      <Flex
        flexType="col"
        gap={ 1 }
        padding={ [ 1,4 ] }
        className={ style.MeisaiSection }
      >
        <Box
          flexCenter
          fontSize='5.subTitle'
          padding={ 1 }
        >
          領収証 兼 明細書
        </Box>
        <Flex
          flexType='col'
          gap={ 1 }
        >
          <Flex
          >
            <Flex
              horizontalAlign='between'
              gap={ 1 }
              borderBottom
              freeCSS={ {
                minWidth: '50%'
              } }
            >
              <Box>
                { customerKana || customerName }
              </Box>
              <Box>
                様
              </Box>
            </Flex>
          </Flex>
          <Box>
            施術日 : { arriveDate }
          </Box>
          <Flex
            flexWrap={ false }
            gap={ '1/2' }
          >
            <Box flexSizing={ 'auto' }>
              <TableComps.Table
                border
                className={ style.MeisaiTable }
              >
                <TableComps.Row>
                  <TableComps.Cell.Data
                    rowSpan={ 17 }
                    children='保険分'
                    className={ style.insuranceDetails }
                  />
                  <TableComps.Cell.Data
                    children={ "<初検料・再検料等>" }
                  />
                  <TableComps.Cell.Data
                    children='-'
                  />
                </TableComps.Row>
                <TableComps.Row>
                  <TableComps.Cell.Data children={ '初検料' } />
                  <TableComps.Cell.Data
                    children={ '1,520円' }
                  />
                </TableComps.Row>
                <TableComps.Row>
                  <TableComps.Cell.Data children={ '初検時相談支援料' } />
                  <TableComps.Cell.Data
                    children={ '100円' }
                  />
                </TableComps.Row>
                <TableComps.Row>
                  <TableComps.Cell.Data children={ '再検料' } />
                  <TableComps.Cell.Data
                    children={ '0円' }
                  />
                </TableComps.Row>
                <TableComps.Row>
                  <TableComps.Cell.Data children={ "<施術情報提供料>" } />
                  <TableComps.Cell.Data
                    children={ '0円' }
                  />
                </TableComps.Row>
                <TableComps.Row>
                  <TableComps.Cell.Data children={ "<往療料>" } />
                  <TableComps.Cell.Data
                    children={ '0円' }
                  />
                </TableComps.Row>
                <TableComps.Row>
                  <TableComps.Cell.Data children={ "<施術料等>" } />
                  <TableComps.Cell.Data
                    children={ '-' }
                  />
                </TableComps.Row>
                <TableComps.Row>
                  <TableComps.Cell.Data children={ '整復・固定施療料' } />
                  <TableComps.Cell.Data
                    children={ '760円' }
                  />
                </TableComps.Row>
                <TableComps.Row>
                  <TableComps.Cell.Data children={ '後療料' } />
                  <TableComps.Cell.Data
                    children={ '0円' }
                  />
                </TableComps.Row>
                <TableComps.Row>
                  <TableComps.Cell.Data children={ '温罨法料' } />
                  <TableComps.Cell.Data
                    children={ '0円' }
                  />
                </TableComps.Row>
                <TableComps.Row>
                  <TableComps.Cell.Data children={ '冷罨法料' } />
                  <TableComps.Cell.Data
                    children={ '85円' }
                  />
                </TableComps.Row>
                <TableComps.Row>
                  <TableComps.Cell.Data children={ '電罨法料' } />
                  <TableComps.Cell.Data
                    children={ '0円' }
                  />
                </TableComps.Row>
                <TableComps.Row>
                  <TableComps.Cell.Data children={ '金属副子等加算' } />
                  <TableComps.Cell.Data
                    children={ '0円' }
                  />
                </TableComps.Row>
                <TableComps.Row>
                  <TableComps.Cell.Data children={ '柔道整復運動後療料' } />
                  <TableComps.Cell.Data
                    children={ '0円' }
                  />
                </TableComps.Row>
                <TableComps.Row>
                  <TableComps.Cell.Data children={ "<明細書発行体制加算>" } />
                  <TableComps.Cell.Data
                    children={ '13円' }
                  />
                </TableComps.Row>
                <TableComps.Row>
                  <TableComps.Cell.Data children={ "<その他>" } />
                  <TableComps.Cell.Data
                    children={ '0円' }
                  />
                </TableComps.Row>
                <TableComps.Row>
                  <TableComps.Cell.Data children={ '計' } />
                  <TableComps.Cell.Data
                    children={ '2,478円' }
                  />
                </TableComps.Row>
                <TableComps.Row>
                  <TableComps.Cell.Data
                    colSpan={ 2 }
                    children={ '1.一部負担金' }
                  />
                  <TableComps.Cell.Data
                    children={ '250円' }
                  />
                </TableComps.Row>
                <TableComps.Row>
                  <TableComps.Cell.Data
                    colSpan={ 2 }
                    children={ '2.保険外' }
                  />
                  <TableComps.Cell.Data
                    children={ '250円' }
                  />
                </TableComps.Row>
                <TableComps.Row>
                  <TableComps.Cell.Data
                    colSpan={ 2 }
                    children={ '合計金額( 1 + 2 )' }
                  />
                  <TableComps.Cell.Data
                    children={ '500円' }
                  />
                </TableComps.Row>
              </TableComps.Table>
            </Box>
            <Box
              flexSizing={ 'none' }
              className={ style.MeisaiTableRight }
            >
              負傷箇所
              1カ所
            </Box>
          </Flex>
          <Box>
            <TableComps.Table>
              <TableComps.Row>
                <TableComps.Cell.Data>
                  発行日
                </TableComps.Cell.Data>
                <TableComps.Cell.Data>
                  { arriveDate } 上記合計金額を領収いたしました。
                </TableComps.Cell.Data>
              </TableComps.Row>
              <TableComps.Row>
                <TableComps.Cell.Data>
                  住所
                </TableComps.Cell.Data>
                <TableComps.Cell.Data>
                  〒 171-0014
                  <br />
                  東京都豊島区池袋2-24-4
                </TableComps.Cell.Data>
              </TableComps.Row>
              <TableComps.Row>
                <TableComps.Cell.Data>
                  施術所名
                </TableComps.Cell.Data>
                <TableComps.Cell.Data>
                  大久保接骨院
                </TableComps.Cell.Data>
              </TableComps.Row>
              <TableComps.Row>
                <TableComps.Cell.Data>
                  氏名
                </TableComps.Cell.Data>
                <TableComps.Cell.Data>
                  ミニッツ　太郎
                </TableComps.Cell.Data>
              </TableComps.Row>
              <TableComps.Row>
                <TableComps.Cell.Data>
                  電話
                </TableComps.Cell.Data>
                <TableComps.Cell.Data>
                  03-5396-5861
                </TableComps.Cell.Data>
              </TableComps.Row>
            </TableComps.Table>
          </Box>
        </Flex>
      </Flex>
    );
  }
}

const Body = ( params: AppTypes.TradeDetailsParams ) => {
  let [ val_printType,set_printType ] = useState( {
    type: 1,
    eventId: ''
  } );
  let accordionId = $.uuidGen();
  params.details = params.details || {};

  let {
    totalPrice = 0,
    totalPriceTax = 0,
    totalTax = 0,
    changePrice = 0,
    depositTotal = 0,
    insuranceQuantity = 0,
    menuQuantity = 0,

    arriveDate,
    leaveDate,
    arriveTime,
    leaveTime,

    customerName,
    customerKana
  } = params.details;

  let menuRows: amotify.fn.Tables.Uni.BodyRowParams[] = params.menus.map( ( menu ) => {
    let {
      name = '',
      totalPriceTax = 0,
      totalTax = 0,
      quantity = 0
    } = menu || {};

    return [
      { type: 'th',children: name },
      { children: quantity },
      { children: '¥0' },
      { children: '¥' + totalPriceTax.toLocaleString() },
      { children: '¥' + totalTax.toLocaleString() }
    ];
  } );
  menuRows.push( [
    { type: 'th',children: '計' },
    { children: insuranceQuantity + menuQuantity },
    { children: '¥0' },
    { children: '¥' + totalPriceTax.toLocaleString() },
    { children: '¥' + totalTax.toLocaleString() }
  ] );

  const mounted = useRef( false );
  useEffect( () => {
    if ( mounted.current ) {
      if ( val_printType.type ) window.print();
    } else {
      mounted.current = true;
    }
  },[ val_printType ] );

  return (
    <>
      <Box
        display='none'
        className={ style.PrintDocument }
      >
        { val_printType.type == 1 ? <PrintDocuments.Meisaisho
          { ...params }
        /> : val_printType.type == 2 ? <PrintDocuments.Receipt
          { ...params }
        /> : val_printType.type == 10 ? <PrintDocuments.Receipt
          { ...params }
        /> : null
        }
      </Box>
      <Flex
        flexType="col"
        _height={ 'viewHeight' }
        className={ style.DisplayRegion }
      >
        <Box
          flexSizing={ 0 }
          overflow='auto'
          flexCenter
        >
          <Flex
            textAlign="center"
            flexType="col"
            padding={ [ 4,1 ] }
            margin={ 'auto' }
            gap={ 2 }
          >
            <Flex
              fontSize={ '4.thirdTitle' }
              fontColor='posi'
              verticalAlign='baseline'
              horizontalAlign="center"
            >
              <FontAwesomeIcon
                iconStyle='regular'
                fontSize='6.title'
                d="check"
              /> お会計が完了しました
            </Flex>
            <Flex
              flexWrap={ false }
              margin='auto'
              ssCardBox
              borderRadius={ 'sphere' }
              verticalAlign='center'
              padding={ '1/2' }
            >
              <Img
                _width={ 3 }
                _height={ 3 }
                src={ Env.Images.usr.incognitor.icon.R }
              />
              <Box
                flexSizing={ 'auto' }
                padding={ [ 0,'3/4' ] }
              >
                { customerName || customerKana } 様
              </Box>
            </Flex>
            <Box>
              来店 : { arriveDate }
              <br />
              { arriveTime } - { leaveTime }
            </Box>
            <Box>
              おつり
              <Box
                fontSize={ '8.xl' }
                lineHeight={ 0 }
              >
                ¥{ changePrice.toLocaleString() }
              </Box>
            </Box>
            <Box>
              お預かり ¥{ depositTotal.toLocaleString() } - 合計 ¥{ totalPriceTax.toLocaleString() }
            </Box>
            <Buttons.Button.Border
              size='S'
              margin={ 'auto' }
              borderRadius='sphere'
              onClick={ () => {
                Accordion.fn.toggle( accordionId );
              } }
            >
              明細を確認 <FontAwesomeIcon
                d="angle-down"
                fontColor={ 'theme' }
              />
            </Buttons.Button.Border>
            <Box
              freeCSS={ {
                minWidth: '50vw'
              } }
            >
              <Accordion
                open
                accordionId={ accordionId }
              >
                <Table.Normal
                  colLength={ 5 }
                  tone='rowBorder'
                  ssCardBox
                  head={ [
                    { children: '商品名' },
                    { children: '数量' },
                    { children: '保険請求' },
                    { children: '金額' },
                    { children: '内消費税' },
                  ] }
                  cellStyles={ {
                    textAlign: 'right'
                  } }
                  cellStyleCallback={ ( params ) => {
                    let {
                      end
                    } = params;
                    let Styles: amotifyUniStyleParams = {}
                    if ( end.left ) {
                      Styles = {
                        textAlign: 'center'
                      }
                    }
                    if ( end.bottom ) {
                      Styles = {
                        borderTop: '2.normal'
                      }
                    }
                    return Styles;
                  } }
                  rows={ menuRows }
                />

                <Box
                  fontSize='1.mini'
                  fontColor='3.blur'
                >
                  ※ 商品毎の消費税合計と計の消費税は異なる場合があります
                </Box>
              </Accordion>
              <Flex
                gap={ 1 }
                flexChilds='auto'
                padding={ [ 1,0 ] }
              >
                <Buttons.Button.Prime
                  color='posi'
                  onClick={ () => {
                    set_printType( { type: 10,eventId: $.uuidGen() } );
                  } }
                >
                  レシート印刷
                </Buttons.Button.Prime>
                <Buttons.Button.Border
                  borderBottomWidth={ 1 }
                  onClick={ () => {
                    set_printType( { type: 1,eventId: $.uuidGen() } );
                  } }
                >
                  施術明細書印刷
                </Buttons.Button.Border>
                <Buttons.Button.Border
                  color='nega'
                  borderBottomWidth={ 1 }
                  onClick={ () => {
                    set_printType( { type: 2,eventId: $.uuidGen() } );
                  } }
                >
                  領収証印刷
                </Buttons.Button.Border>
              </Flex>
            </Box>
          </Flex>
        </Box >
        <Flex
          flexSizing={ 'none' }
          borderTop
          backgroundColor={ '1.layer.base' }
          padding={ 1 }
          gap={ 1 }
          horizontalAlign='between'
        >
          <Buttons.Anchor.UniqueStyle.BorderToFill
            href="/"
            size="L"
          >
            受付に戻る
          </Buttons.Anchor.UniqueStyle.BorderToFill>
          <Flex
            gap={ 1 }
          >
            <Buttons.Button.Prime
              size="L"
            >
              <Flex
                horizontalAlign="center"
                verticalAlign='center'
                gap={ '1/2' }
              >
                <Img
                  _width={ 2 }
                  _height={ 2 }
                  borderRadius='sphere'
                  src={ Env.Images.usr.incognitor.icon.R }
                />
                <Box>
                  患者ページを見る
                </Box>
              </Flex>

            </Buttons.Button.Prime>
            <Buttons.Button.Prime
              size="L"
            >
              次回予約へ
            </Buttons.Button.Prime>
          </Flex>
        </Flex>
      </Flex >
    </>
  );
}

export const PaymentComplete: FNC<{}> = () => {
  let [ val_init,set_init ] = useState( false );
  let [ val_def,set_def ] = useState( {} as AppTypes.TradeDetailsParams );
  let { id: uuid } = $.getQueryParams();

  useEffect( () => {
    $.fetch.post( {
      key: 'orderPage',
      url: 'trade/details',
      body: { uuid },
      trafficControl: 0
    },( result ) => {
      if ( !result.ok ) return;
      set_init( true );

      let {
        details,
        menus
      } = result.body;

      set_def( {
        details: details[ 0 ],
        menus
      } );
    } );
  },[] );


  let Content = <></>
  if ( !val_init ) {
    Content =
      <Flex
        _height={ 'viewHeight' }
        flexType="col"
        gap={ 2 }
        flexCenter
      >
        <Loader size="L" />
        <Box>
          お会計情報を取得中
        </Box>
      </Flex>
  } else {
    Content = <Body { ...val_def } />;
  }

  return ( Content );
}