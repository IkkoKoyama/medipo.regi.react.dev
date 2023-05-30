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
    Grid,
    Span
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


const prefectureCells = [
  { code: 1,keyword: '01.北海.ホッカイドウ',label: '北海道' },
  { code: 2,keyword: '02.青森.アオモリ',label: '青森県' },
  { code: 3,keyword: '03.岩手.イワテ',label: '岩手県' },
  { code: 4,keyword: '04.宮城.ミヤギ',label: '宮城県' },
  { code: 5,keyword: '05.秋田.アキタ',label: '秋田県' },
  { code: 6,keyword: '06.山形.ヤマガタ',label: '山形県' },
  { code: 7,keyword: '07.福島.フクシマ',label: '福島県' },
  { code: 8,keyword: '08.茨城.イバラギ',label: '茨城県' },
  { code: 9,keyword: '09.栃木.トチギ',label: '栃木県' },
  { code: 10,keyword: '10.群馬.グンマ',label: '群馬県' },
  { code: 11,keyword: '11.埼玉.サイタマ',label: '埼玉県' },
  { code: 12,keyword: '12.千葉.チバ',label: '千葉県' },
  { code: 13,keyword: '13.東京.トウキョウ',label: '東京都' },
  { code: 14,keyword: '14.神奈川.カナガワ',label: '神奈川県' },
  { code: 15,keyword: '15.新潟.ニイガタ',label: '新潟県' },
  { code: 16,keyword: '16.富山.トヤマ',label: '富山県' },
  { code: 17,keyword: '17.石川.イシカワ',label: '石川県' },
  { code: 18,keyword: '18.福井.フクイ',label: '福井県' },
  { code: 19,keyword: '19.山梨.ヤマナシ',label: '山梨県' },
  { code: 20,keyword: '20.長野.ナガノ',label: '長野県' },
  { code: 21,keyword: '21.岐阜.ギフ',label: '岐阜県' },
  { code: 22,keyword: '22.静岡.シズオカ',label: '静岡県' },
  { code: 23,keyword: '23.愛知.アイチ',label: '愛知県' },
  { code: 24,keyword: '24.三重.ミエ',label: '三重県' },
  { code: 25,keyword: '25.滋賀.シガ',label: '滋賀県' },
  { code: 26,keyword: '26.京都.キョウト',label: '京都府' },
  { code: 27,keyword: '27.大阪.オオサカ',label: '大阪府' },
  { code: 28,keyword: '28.兵庫.ヒョウゴ',label: '兵庫県' },
  { code: 29,keyword: '29.奈良.ナラ',label: '奈良県' },
  { code: 30,keyword: '30.和歌山.ワカヤマ',label: '和歌山県' },
  { code: 31,keyword: '31.鳥取.トットリ',label: '鳥取県' },
  { code: 32,keyword: '32.島根.シマネ',label: '島根県' },
  { code: 33,keyword: '33.岡山.オカヤマ',label: '岡山県' },
  { code: 34,keyword: '34.広島.ヒロシマ',label: '広島県' },
  { code: 35,keyword: '35.山口.ヤマグチ',label: '山口県' },
  { code: 36,keyword: '36.徳島.トクシマ',label: '徳島県' },
  { code: 37,keyword: '37.香川.カガワ',label: '香川県' },
  { code: 38,keyword: '38.愛媛.エヒメ',label: '愛媛県' },
  { code: 39,keyword: '39.高知.コウチ',label: '高知県' },
  { code: 40,keyword: '40.福岡.フクオカ',label: '福岡県' },
  { code: 41,keyword: '41.佐賀.サガ',label: '佐賀県' },
  { code: 42,keyword: '42.長崎.ナガサキ',label: '長崎県' },
  { code: 43,keyword: '43.熊本.クマモト',label: '熊本県' },
  { code: 44,keyword: '44.大分.オオイタ',label: '大分県' },
  { code: 45,keyword: '45.宮崎.ミヤザキ',label: '宮崎県' },
  { code: 46,keyword: '46.鹿児島.カゴシマ',label: '鹿児島県' },
  { code: 47,keyword: '47.沖縄.オキナワ',label: '沖縄県' },
];


export const DrillDownAddressInputModalFN = ( params: {
  callback( params: {
    address: string
    postalCode?: string
  } ): void
} ) => {
  let ModalId = 'CustomerAddressInputModal';
  let DefaultTabIndex = 1;

  type StepSelectedParams = {
    eventType: 'click' | 'Enter' | 'init' | ''
    code?: number
    label: string
    postalCode?: string
  }

  Modal.open( {
    modalId: ModalId,
    type: 'center',
    size: [ 'R','L' ][ DefaultTabIndex ] || 'R' as any,
    content: () => {
      const Components = {
        Header: () => {
          return (
            <Modal.Attachment.Header
              horizontalAlign='between'
            >
              <Box
                fontWeight='3.bold'
                fontSize='3.paragraph'
              >
                住所ドリルダウン
              </Box>
              <Buttons.Button.Border
                size='S'
                borderRadius={ 'sphere' }
                onClick={ () => {
                  Modal.close.pin( ModalId );
                } }
              >
                閉じる <FontAwesomeIcon
                  iconStyle='solid'
                  d="times"
                />
              </Buttons.Button.Border>
            </Modal.Attachment.Header>
          );
        },
        Snippets: () => {
          let Cell = ( params: {
            label: string
          } ) => {
            return (
              <Buttons.Button.Border
                borderRadius='sphere'
                ssEffectsOnActive='ripple.cloud'
                onClick={ () => {
                  // Modal.close.pin( ModalId );
                } }
              >
                <Flex gap={ '1/2' }>
                  <Box flexSizing={ 'auto' }>
                    { params.label }
                  </Box>
                  <FontAwesomeIcon
                    iconStyle='regular'
                    fontSize={ '3.paragraph' }
                    fontColor='theme'
                    d="angle-right"
                  />
                </Flex>
              </Buttons.Button.Border>
            );
          }
          return (
            <Flex
              flexType='col'
              gap={ 1 }
              padding={ 1.5 }
              overflow='auto'
              flexSizing={ 0 }
            >
              <Flex
                horizontalAlign='between'
                verticalAlign='center'
                flexWrap={ false }
              >
                <Box>
                  <Box
                    fontSize='3.paragraph'
                    fontWeight='3.bold'
                  >
                    <FontAwesomeIcon
                      iconStyle='solid'
                      d="angle-right"
                    />
                    スニペット
                  </Box>
                  <Box
                    fontColor='3.blur'
                    fontSize='1.mini'
                  >
                    よく使う住所はスニペット登録しましょう
                  </Box>
                </Box>
                <Buttons.Button.Sub
                  flexSizing={ 'none' }
                >
                  追加する <FontAwesomeIcon
                    iconStyle='solid'
                    d="angle-right"
                  />
                </Buttons.Button.Sub>
              </Flex>
              <Flex
                flexChilds='auto'
                gap={ '3/4' }
              >
                <Cell label='東京都中野区東中野' />
                <Cell label='東京都中野区' />
                <Cell label='東京都中野区東中野' />
                <Cell label='東京都' />
                <Cell label='東京都豊島区池袋' />
                <Cell label='東京都豊島区' />
                <Cell label='長野県上田市秋和' />
                <Cell label='長野県上田市' />
              </Flex>
            </Flex>
          );
        },
        Step: {
          _: () => {
            let DefaultSelected: StepSelectedParams = {
              code: void 0,
              label: '',
              eventType: ''
            }

            let [ val_selectedLevel1,set_selectedLevel1 ] = useState( DefaultSelected );
            // let [ val_selectedLevel1,set_selectedLevel1 ] = useState( {
            //   code: 13,
            //   label: '東京都',
            //   eventType: 'init'
            // } as StepSelectedParams );
            let [ val_selectedLevel2,set_selectedLevel2 ] = useState( DefaultSelected );
            // let [ val_selectedLevel2,set_selectedLevel2 ] = useState( {
            //   code: 8,
            //   label: '江東区',
            //   eventType: 'init'
            // } as StepSelectedParams );
            let [ val_selectedLevel3,set_selectedLevel3 ] = useState( DefaultSelected );

            useEffect( () => {
              set_selectedLevel2( DefaultSelected );
              set_selectedLevel3( DefaultSelected );
            },[ val_selectedLevel1 ] );
            useEffect( () => {
              set_selectedLevel3( DefaultSelected );
            },[ val_selectedLevel2 ] );
            useEffect( () => {
              if ( val_selectedLevel3.code ) {
                endPoint();
              }
            },[ val_selectedLevel3 ] );

            const endPoint = async () => {
              let address = [
                val_selectedLevel1.label || '',
                val_selectedLevel2.label || '',
                val_selectedLevel3.label || ''
              ].join( '' );

              if ( !address ) return;
              let postalCode = val_selectedLevel3.postalCode || '';

              params.callback( {
                address,
                postalCode
              } );
              Modal.close.pin( ModalId );
            }

            return (
              <Flex
                flexType='col'
                borderTop
                freeCSS={ {
                  maxHeight: '50vh'
                } }
              >
                <Flex
                  flexWrap={ false }
                  flexSizing={ 'auto' }
                  overflow='auto'
                  position='relative'
                  ssLastChildLossBorder='right'
                  freeCSS={ {
                    zIndex: 1
                  } }
                >
                  <Components.Step.Box stepLevel={ 1 }
                    freeCSS={ {
                      width: 12 * 14
                    } }
                    val_selected1={ val_selectedLevel1 } val_selected2={ val_selectedLevel2 } val_selected3={ val_selectedLevel3 }
                    val_selected={ val_selectedLevel1 } set_selected={ set_selectedLevel1 }
                  />
                  <Components.Step.Box stepLevel={ 2 }
                    flexGrid={ 3 }
                    val_selected1={ val_selectedLevel1 } val_selected2={ val_selectedLevel2 } val_selected3={ val_selectedLevel3 }
                    val_selected={ val_selectedLevel2 } set_selected={ set_selectedLevel2 }
                  />
                  <Components.Step.Box stepLevel={ 3 }
                    flexGrid={ 5 }
                    val_selected1={ val_selectedLevel1 } val_selected2={ val_selectedLevel2 } val_selected3={ val_selectedLevel3 }
                    val_selected={ val_selectedLevel3 } set_selected={ set_selectedLevel3 }
                  />
                </Flex>
                <Flex
                  horizontalAlign='between'
                  gap={ 1 }
                  flexSizing='none'
                  borderTop
                  verticalAlign='center'
                  position='sticky'
                  positionBottom={ 0 }
                  backgroundColor={ '1.layer.base' }
                  borderRadius='1.tone.primary'
                  borderTopLeftRadius={ 0 }
                  borderTopRightRadius={ 0 }
                  padding={ 1 }
                  freeCSS={ {
                    zIndex: 2
                  } }
                >
                  <Flex
                    verticalAlign='center'
                  >
                    <Span
                      fontColor='4.thin'
                      fontSize={ '1.mini' }
                      marginRight={ '1/2' }
                    >
                      選択中の住所 :
                    </Span>
                    <Span fontSize='3.paragraph'>
                      { val_selectedLevel1.label || '' }
                      { val_selectedLevel2.label || '' }
                      { val_selectedLevel3.label || '' }
                    </Span>
                  </Flex>
                  <Buttons.Button.Prime
                    ssMiniLoader={ { color: 'white' } }
                    onClick={ () => {
                      endPoint();
                    } }
                  >
                    この住所で入力
                  </Buttons.Button.Prime>
                </Flex>
              </Flex>
            );
          },
          Box: ( params: {
            stepLevel: number
            val_selected: StepSelectedParams
            val_selected1: StepSelectedParams
            val_selected2: StepSelectedParams
            val_selected3: StepSelectedParams
            set_selected: React.Dispatch<React.SetStateAction<StepSelectedParams>>
          } & amotifyUniStyleParams ) => {
            let {
              stepLevel,
              val_selected1,
              val_selected2,
              val_selected3,
              val_selected,
              set_selected,
              ...others
            } = params;

            let ListId = 'PlaceList-' + $.uuidGen();
            let InputId = 'PlaceInput-' + $.uuidGen();
            const onSelected = ( args: StepSelectedParams ) => {
              set_selectedCode( {
                code: args.code,
                eventType: ''
              } );
              params.set_selected( args );
            }

            let [ val_loading,set_loading ] = useState( false );
            let [ val_keyword,set_keyword ] = useState( '' );
            let [ val_selectedCode,set_selectedCode ] = useState( {
              code: val_selected.code,
              eventType: 'init'
            } );

            let [ val_list,set_list ] = useState( [] as {
              code: number,keyword: string,label: string,postalCode?: string
            }[] );

            useEffect( () => {
              if ( stepLevel == 1 ) {
                set_list( prefectureCells );
              }
            },[] );
            useEffect( () => {
              if ( stepLevel == 2 ) {
                if ( val_selected1.eventType != 'init' ) set_selectedCode( {
                  code: void 0,
                  eventType: ''
                } );
                set_keyword( '' );

                ( () => {
                  if ( !val_selected1.code ) return;
                  set_list( [] );
                  set_loading( true );
                  $.fetch.post( {
                    key: 'searchAddressLevel2',
                    url: '/search-address',
                    body: {
                      level: 2,
                      code: [ val_selected1.code ]
                    },
                    trafficControl: 150
                  },( result ) => {
                    if ( !result.ok ) return;
                    set_list( result.body.list );
                    set_loading( false );
                  } );
                } )();

                if ( val_selected1.eventType == 'Enter' ) $( '#' + InputId ).focus();
              } else if ( params.stepLevel == 3 ) {
                set_list( [] );
                set_loading( false );
                if ( val_selected1.eventType != 'init' ) set_selectedCode( {
                  code: void 0,
                  eventType: ''
                } );
                set_keyword( '' );
              }
            },[ val_selected1.code ] );
            useEffect( () => {
              if ( params.stepLevel == 3 ) {
                if ( val_selected2.eventType != 'init' ) set_selectedCode( {
                  code: void 0,
                  eventType: ''
                } );
                set_keyword( '' );

                ( () => {
                  if ( !val_selected1.code ) return;
                  if ( !val_selected2.code ) return;
                  set_list( [] );
                  set_loading( true );
                  $.fetch.post( {
                    key: 'searchAddressLevel3',
                    url: '/search-address',
                    body: {
                      level: 3,
                      code: [
                        val_selected1.code,
                        val_selected2.code
                      ]
                    },
                    trafficControl: 150
                  },( result ) => {
                    if ( !result.ok ) return;
                    set_list( result.body.list );
                    set_loading( false );
                  } );

                  if ( val_selected1.eventType == 'Enter' ) $( '#' + InputId ).focus();
                } )();
              }
            },[ val_selected2.code ] );
            useEffect( () => {
              if ( val_keyword ) {
                let FirstCell = FilterList[ 0 ];
                if ( FirstCell ) set_selectedCode( {
                  code: FirstCell.code,
                  eventType: ''
                } );
              }
            },[ val_keyword ] );

            let FilterList = val_list;
            if ( val_keyword ) {
              FilterList = FilterList.filter( ( cell ) => cell.keyword.match( new RegExp( val_keyword,'ig' ) ) );
            }
            let SelectedId: string;
            let ListContents: ReactElement = FilterList.map( ( cell,index ) => {
              let Selected = cell.code == val_selectedCode.code;
              let Id = 'PlaceCell-' + $.uuidGen();
              if ( Selected ) SelectedId = Id;
              return (
                <Components.Step.PlaceCell
                  buttonId={ Id }
                  code={ cell.code }
                  label={ cell.label }
                  postalCode={ cell.postalCode }
                  selected={ Selected }
                  onSelected={ onSelected }
                />
              );
            } );
            if ( !val_list.length ) {
              ListContents = <Box
                padding={ 2 }
                flexCenter
                fontColor='4.thin'
              >
                ...
              </Box>
            }
            if ( val_loading ) {
              ListContents = <Box
                padding={ 2 }
                flexCenter
              >
                <Loader />
              </Box>
            }

            // srcoll adjust
            useEffect( () => {
              ( () => {
                if ( !val_list.length ) return;
                if ( val_selectedCode.code == void 0 ) return;
                if ( ![ 'ArrowDown','ArrowUp' ].includes( val_selectedCode.eventType ) ) return;
                let Base = $( '#' + ListId )[ 0 ];
                let Cell = $( '#' + SelectedId )[ 0 ];
                if ( !Base || !Cell ) return;
                let { top: pTop,height: pHeight } = Base.position();
                let { top: cTop,height: cHeight } = Cell.position();
                if ( pTop <= cTop && cTop + cHeight <= pTop + pHeight ) return;

                let scroll = Base.scrollTop + ( cTop - pTop );
                if ( val_selectedCode.eventType == 'ArrowDown' ) {
                  scroll -= ( pHeight - cHeight ) - 20;
                } else if ( val_selectedCode.eventType == 'ArrowUp' ) {
                  scroll -= 20;
                }
                Base.scrollTop = scroll;
              } )();
            },[ val_selectedCode.code,val_list ] );

            return (
              <Flex
                flexType='col'
                overflow={ 'auto' }
                borderRight
                { ...others }
                freeCSS={ {
                  minHeight: '40vh',
                  ...others.freeCSS
                } }
                id={ ListId }
              >
                <Input.Text.Normal
                  tone='cloud'
                  boxShadow={ 1 }
                  backgroundColor={ '1.layer.base' }
                  borderColor='0.trans'
                  autoComplete='off'
                  _width={ 0 }
                  override='force'
                  id={ InputId }
                  wrapStyles={ {
                    padding: '3/4',
                    position: 'sticky',
                    positionTop: 0,
                    border: 'unset',
                    freeCSS: {
                      zIndex: 2
                    }
                  } }
                  placeholder={ [ '','都道府県','市区町村','町名' ][ params.stepLevel ] + '...' }
                  rightIcon={
                    <Input.Attachment.RightIcon>
                      <FontAwesomeIcon
                        iconStyle='solid'
                        d="search"
                      />
                    </Input.Attachment.RightIcon>
                  }
                  value={ val_keyword }
                  onKeyDown={ ( event ) => {
                    let { key,metaKey,ctrlKey } = event;
                    let auxKey = metaKey || ctrlKey;
                    if ( key == 'ArrowDown' || key == 'ArrowUp' ) {
                      event.preventDefault();
                      let dir = Number( key == 'ArrowDown' ) * 2 - 1;
                      let nextIndex = Math.max( FilterList.findIndex( ( cell ) => cell.code == val_selectedCode.code ),0 );
                      if ( auxKey ) {
                        if ( key == 'ArrowDown' ) nextIndex = FilterList.length - 1;
                        else nextIndex = 0;
                      } else {
                        nextIndex += dir;
                      }
                      if ( nextIndex < 0 ) return;
                      if ( nextIndex > FilterList.length ) return;
                      if ( !FilterList[ nextIndex ] ) return;
                      set_selectedCode( {
                        code: FilterList[ nextIndex ].code,
                        eventType: key
                      } );
                    } else if ( key == 'Enter' && auxKey ) {
                      if ( !val_selectedCode.code ) return;
                      let Cell = FilterList.filter( ( cell ) => cell.code == val_selectedCode.code )[ 0 ];
                      if ( !Cell ) return;

                      onSelected( {
                        eventType: 'Enter',
                        label: Cell.label,
                        code: Cell.code
                      } );
                    }
                  } }
                  onUpdateValidValue={ ( { value } ) => {
                    if ( !val_list.length ) return;
                    set_keyword( value );
                  } }
                />
                { ListContents }
              </Flex>
            );
          },
          PlaceCell: ( params: {
            buttonId: string
            code: number
            label: string
            postalCode?: string
            selected: boolean
            onSelected( params: StepSelectedParams ): void
          } ) => {
            let Styles: amotifyUniStyleParams = {}
            if ( params.selected ) {
              Styles = {
                backgroundColor: 'tcOpFew',
                fontColor: 'theme'
              }
            }
            return (
              <Buttons.Button.Plain
                { ...Styles }
                tabIndex={ -1 }
                ssPushable
                padding={ [ '1/2',1 ] }
                borderRadius={ 0 }
                flexCenter
                borderTop
                ssEffectsOnActive={ 'ripple.cloud' }
                horizontalAlign='between'
                position='relative'
                _width={ '100%' }
                textAlign='left'
                id={ params.buttonId }
                freeCSS={ {
                  zIndex: 1
                } }
                onClick={ ( event ) => {
                  params.onSelected( {
                    eventType: 'click',
                    label: params.label,
                    code: params.code,
                    postalCode: params.postalCode
                  } );
                } }
              >
                <Flex
                  flexSizing={ 'auto' }
                  flexWrap={ false }
                  gap={ '1/2' }
                >
                  <Box>
                    { params.code }.
                  </Box>
                  <Box flexSizing={ 'auto' }>
                    { params.label }
                  </Box>
                </Flex>
                <FontAwesomeIcon
                  iconStyle='regular'
                  d="angle-right"
                />
              </Buttons.Button.Plain>
            );
          }
        }
      }

      return (
        <>
          <Components.Header />
          <Components.Snippets />
          <Components.Step._ />
        </>
      );
    }
  } );
}