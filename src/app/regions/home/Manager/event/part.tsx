const {
  glob: {
    React,
    useState,
    useEffect,
    useStore
  },
  atoms: {
    Box,
    Span,
    Flex,
    Input,
    Buttons: {
      Button,
      Anchor
    },
    Icon,
    FlexBr,
    Img,
    Loading
  },
  mols: {
    Accordion,
    List,
  },
  orgs: {
    LayoutContent,
    Cropper,
    Table
  }
} = AMOT;

const EventSearchFunction = async () => {
  AMOT.inmemory[ 'SearchSettingRegion' ].close();
  let component = AMOT.inmemory[ 'managerTab-eventList' ];
  component.search();

  let form = await $.formCollect( 'eventSearchForm' );
  if ( !form.valid ) return;

  $.fetch( {
    name: 'searchManageEventList',
    method: 'post',
    url: 'event/manageList',
    trafficControl: 800,
    body: form.data
  },( result ) => {
    if ( result.ok ) {
      AMOT.inmemory[ 'EventManageList' ] = result.body;
      let component = AMOT.inmemory[ 'managerTab-eventList' ];
      if ( component && component.refresh ) {
        component.refresh();
      }
    }
  } )
}

const SearchSettingRegion: FNC<{}> = () => {
  let [ val_detailsOpen,set_detailsOpen ] = useState( false );

  useEffect( () => {
    useStore( {
      insertId: 'SearchSettingRegion',
      data: {
        close: () => {
          set_detailsOpen( false );
        }
      }
    } );
  },[] );

  return (
    <>
      <Flex
        ssCardBox={ true }
        wrap={ false }
        backgroundColor={ 'LBReverse' }
        phoneStyles={ {
          flexDirection: 'col'
        } }
      >
        <Box
          flex={ 'auto' }
          padding={ 2 }
        >
          <Flex gap={ 1 }>
            <Input.Time.Month
              label='検索期間開始月'
              form='eventSearchForm'
              name='smonth'
              value={ new Date().month( -2 ).ym( '-' ) as string }
            />
            <Flex
              align='bottom'
              padding={ [ 1,0 ] }
            >
              ~
            </Flex>
            <Input.Time.Month
              label='期間終了月'
              form='eventSearchForm'
              name='emonth'
              value={ new Date().month( 2 ).ym( '-' ) as string }
            />
            <FlexBr />
            <Input.CheckBox
              form='eventSearchForm'
              name='createdOnly'
              appearance={ {
                format: 'icon',
                cell: {
                  style: {
                    padding: 0
                  }
                }
              } }
              list={ [
                {
                  value: 1,
                  label: '作成したものを表示'
                }
              ] }
            />
          </Flex>

          <Button.Border
            padding={ [ -1,1 ] }
            marginTop={ 1.5 }
            {
            ...val_detailsOpen ? {
              marginBottom: 1.5
            } : {}
            }
            onClick={ () => {
              set_detailsOpen( !val_detailsOpen );
            } }
          >
            詳細設定 <Icon d='angle-down' />
          </Button.Border>
          <Flex
            border={ 'normal' }
            borderRadius={ 'LBSub1' }
            backgroundColor={ 1 }
            padding={ 2 }
            gap={ [ 1,2 ] }
            display={ val_detailsOpen ? 'flex' : 'none' }
          >
            <Input.Text
              label='キーワード'
              form='eventSearchForm'
              name='keyword'
              placeholder='タイトル等を入力'
            />
            {/* <Input.Select
              label='公開目的'
              form='eventSearchForm'
              name='purpose'
              placeholder='指定しない'
              list={ [
                { value: 1,label: '参加登録用' },
                { value: 2,label: '告知用' },
              ] }
            /> */}
            <Input.Select
              label='公開範囲'
              form='eventSearchForm'
              name='anonymity'
              placeholder='指定しない'
              list={ [
                { value: 1,label: 'パブリック' },
                { value: 2,label: '同地区内' },
                { value: 3,label: '同クラブ内' }
              ] }
            />
            <Input.Select
              placeholder='指定しない'
              label='ステータス'
              form='eventSearchForm'
              name='status'
              list={ [
                { value: 200,label: '正常' },
                { value: 400,label: '一時掲載停止' }
              ] }
            />
            <Input.CheckBox
              label='タイプ'
              form='eventSearchForm'
              name='orgType'
              value={ [ 1,2 ] }
              appearance={ {
                format: 'iconBorder'
              } }
              list={ [
                { value: 1,label: '地区' },
                { value: 2,label: 'クラブ' }
              ] }
            />
            <Input.CheckBox
              label='参加方法'
              form='eventSearchForm'
              name='way'
              value={ [ 1,2 ] }
              appearance={ {
                format: 'iconBorder'
              } }
              list={ [
                { value: 1,label: '対面' },
                { value: 2,label: 'オンライン' }
              ] }
            />
          </Flex>
        </Box>
        <Flex
          align='bottom'
          padding={ 2 }
          borderLeft={ 'normal' }
          backgroundColor={ 1 }
          phoneStyles={ {
            border: 'unset',
            borderTop: 'normal'
          } }
        >
          <Button.Prime
            phoneStyles={ {
              width: '100%'
            } }
            formButton={ 'eventSearchForm' }
            onClick={ async () => {
              EventSearchFunction();
            } }
            whiteSpace='nowrap'
          >
            <Icon d='far search' /> 検索
          </Button.Prime>
        </Flex>
      </Flex>
    </>
  );
}

const EventListRegion: FNC<{}> = () => {
  let [ val_searching,set_searching ] = useState( false );
  let EventList = AMOT.inmemory[ 'EventManageList' ]?.event || [];

  useEffect( () => {
    useStore( {
      insertId: 'managerTab-eventList',
      data: {
        search: () => {
          set_searching( true );
        },
        refresh: async () => {
          set_searching( false );
        }
      }
    } );
  },[] );
  if ( val_searching ) {
    return (
      <>
        <Flex
          padding={ 4 }
          type='col'
          flexCenter={ true }
          fontColor={ 4 }
          gap={ 1 }
        >
          <Loading />
          <Box>
            検索中...
          </Box>
        </Flex>
      </>
    );
  }

  let HeadData: Orgs.Tables.Data.HeadProps[] = [
    { label: 'イベント',data: '名前' },
    { label: '主催',data: '主催' },
    {
      label: '日時',data: '日時'
    },
    {
      label: '参加予定',data: '参加予定',
      style: {
        phoneStyles: {
          display: 'none'
        }
      }
    },
    {
      label: 'ステータス',data: 'ステータス',
      style: {
        phoneStyles: {
          display: 'none'
        }
      }
    }
  ];

  let BodyData: Orgs.Tables.Data.RowProps[] = [];

  let EventStatuss: any = global.appEnv.eventStatus;
  for ( let event of EventList ) {
    let {
      title,
      subTitle,
      eventHeader,
      eventUuid,
      dateFrom,
      dateTo,
      orgName,
      orgIcon,
      registers,
      eventStatus
    } = event;

    let EventHeader = appEnv.eventHeaderImage( eventHeader );
    let OrgIcon = appEnv.orgIconImage( orgIcon );

    BodyData.push( {
      columns: [
        {
          label: <Flex
            wrap={ false }
            gap={ 1 }
            align='center'
            phoneStyles={{
              flexDirection : 'col'
            }}
          >
            <Img
              src={ EventHeader }
              width={ 4 }
              height={ 4 }
              borderRadius={ 2 }
              showExpand={ EventHeader.replace( /\/R\./,'/L.' ) }
            />
            <Box textAligin="left">
              <Box
                fontSize={ 4 }
                children={ title }
              />
              <Box
                fontSize={ 1 }
                fontColor={ 4 }
                children={ subTitle || '' }
              />
            </Box>
          </Flex>,
          data: title
        },{
          label:
            <Flex
              gap={ 1 }
              wrap={ false }
              align='center'
              phoneStyles={{
                flexDirection : 'col'
              }}
            >
              <Img
                src={ OrgIcon }
                width={ 2.5 }
                height={ 2.5 }
                borderRadius={ 'sphere' }
              />
              { orgName }
            </Flex>,
          data: orgName
        },{
          label: <Box
            textAligin="left"
          >
            { dateFrom } ~
            <br />
            { dateTo }
          </Box>,
          data: dateFrom + ' ~ ' + dateTo,
          orderIndex: dateFrom
        },{
          label: registers + '人',
          data: registers + '人',
          orderIndex: registers,
          style: {
            phoneStyles: {
              display: 'none'
            }
          }
        },{
          label: <Box
            display='inlineBlock'
            borderRadius={ 2 }
            padding={ -1 }
            backgroundColor={ eventStatus == 200 ? 'posi' : 'nega' }
            fontColor='white'
            children={ EventStatuss[ eventStatus ] }
          />,
          data: EventStatuss[ eventStatus ],
          orderIndex: eventStatus,
          style: {
            phoneStyles: {
              display: 'none'
            }
          }
        }
      ],
      rowId: eventUuid
    } );
  }

  return (
    <>
      <Box
        paddingLeft={ 1 }
      >
        ... { EventList.length }件ヒットしました
      </Box>
      <Box ssCardBox={ true }>
        <Table.Data
          colLength={ 5 }
          appearance={ {
            format: 'rowBorder'
          } }
          head={ HeadData }
          rows={ BodyData }
          rowClickCallBack={ ( rowId ) => {
            AMOT.inmemory[ 'history' ].push( '/event/edit?id=' + rowId );
          } }
        />
      </Box>
    </>
  );
}

export const EventDashBoard: FNC<{}> = () => {
  useEffect( () => {
    useStore( {
      insertId: 'managerTab-event',
      data: {
        refresh: async () => {
          setTimeout( () => {
            EventSearchFunction();
          },100 );
        }
      }
    } );
  } );

  return (
    <Flex
      type='col'
      gap={ 2 }
      padding={ 2 }
      phoneStyles={ {
        padding: 1
      } }
    >
      <Flex justify='right'>
        <Anchor.Prime
          padding={ [ 1,1.5 ] }
          href='create-event'
        >
          イベントを作成する <Icon d='arrow-right' />
        </Anchor.Prime>
      </Flex>
      <SearchSettingRegion />
      <EventListRegion />
    </Flex>
  );
}