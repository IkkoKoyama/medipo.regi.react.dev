const {
  glob: {
    React,
    useEffect,
    useState,
    useStore
  },
  atoms: {
    Box,
    Flex,
    Input,
    Buttons: {
      Button,
      Anchor,
      Label,
    },
    Icon,
    Img,
    Grid,
    Paragraph,
    Loading
  },
  mols: {
    Accordion,
    List,
  },
  orgs: {
    LayoutContent,
    Cropper,
    TabContent,
    Table
  },
  minifyGlobalComponent: {
    logos: {
      LINEIcon
    },
  }
} = AMOT;

const HeaderRegion: FNC<{}> = () => {
  let {
    Editable,
    user
  } = AMOT.inmemory[ 'objPage' ]
  let {
    userId,
    headerImage
  } = user[ 0 ];

  let [ val_headerImage,set_headerImage ] = useState( headerImage );
  val_headerImage = appEnv.userHeaderImage( val_headerImage );

  return (
    <Box position='relative'>
      <Box
        position='relative'
        minHeight={ 6 }
      >
        <Img
          src={ val_headerImage }
          borderRadius={ 4 }
          showExpand={ val_headerImage.replace( /\/R\./,'/L.' ) }
          phoneStyles={ {
            borderRadius: 0
          } }
        />
        { Editable ? <>
          <Label.Prime
            size="S"
            backgroundColor={ 'lcOpMiddle' }
            htmlFor='changeHeaderImage'
            position='absolute'
            bottom={ 1 }
            right={ 1 }
            fontColor='white'
          >
            <Icon d='far camera' /> 画像を選択
          </Label.Prime>
          <Cropper
            use='header'
            triggerId='changeHeaderImage'
            develops={ [
              { size: 'R' },
              { size: 'L' }
            ] }
            onProcessFinished={ async ( files ) => {
              let ImageId = $.uuidGen( 32 ).toUpper();
              let isFinished = false;

              let sizes = [ 'R','L' ];
              await ( async () => {
                let getUrls = await $.fetch( {
                  method: 'post',
                  url: 'mod/auth/s3/getPresignedUrl',
                  body: {
                    type: 'app',
                    keys: sizes.map( ( size ) => ( {
                      bucket: 'public',
                      key: 'user/header/' + ImageId + '/' + size + '.jpeg',
                      method: 'put'
                    } ) )
                  }
                } );
                if ( !getUrls.ok ) return;

                for ( let index = 0; index < getUrls.body.length; index++ ) {
                  let result = getUrls.body[ index ];
                  let {
                    ok,
                    body: url
                  } = result;

                  if ( !ok ) continue;
                  let file = files[ index ];

                  let Upload = await $.fetch( {
                    url: url,
                    method: 'put',
                    mode: 'cors',
                    header: {
                      'Content-Type': file.type
                    },
                    body: file,
                    bodyStringify: false,
                    trafficControl: 0
                  } );
                  if ( !Upload.ok ) return;
                }

                let result = await $.fetch( {
                  name: 'updateObjHeaderImage',
                  method: 'post',
                  url: 'updateAColumn',
                  trafficControl: 0,
                  body: {
                    objType: 'user',
                    id: userId,
                    column: 'headerImage',
                    value: ImageId
                  }
                } )
                if ( !result.ok ) return;
                isFinished = true;
              } )();

              if ( isFinished ) set_headerImage( ImageId );
            } }
          />
        </> : null
        }
      </Box>
    </Box>
  )
}

const OrgRegion: FNC<{}> = () => {
  let {
    user,
    orgs
  } = AMOT.inmemory[ 'objPage' ];
  let {
  } = user[ 0 ];

  let Orgs = orgs.map( ( org: any ) => {
    let {
      history,
      joinAt,
      orgid,
      orgUuid,
      orgName,
      orgIcon,
      userLevel,
      orgType
    } = org;

    let History = [];
    if ( history ) History = JSON.parse( history );

    let prev = '';
    let Histories = History.map( ( his: any,index: number ) => {
      let [ year,position ] = his;
      let displayYear: any = <>
        <Icon d='stop' />
        { year.toString().toDateJP() }
      </>
      if ( year == prev ) displayYear = null;
      prev = year;

      return {
        title: <Box
          whiteSpace='nowrap'
          children={ displayYear }
        />,
        content: position
      }
    } );

    return (
      <Flex
        type="col"
        gap={ 1 }
        key={ orgUuid }
        ssCardBox={ true }
        padding={ 1 }
      >
        <Flex
          gap={ 1 }
          align='center'
        >
          <Flex
            gap={ 1 }
            align='center'
            flex={ 'auto' }
            wrap={ false }
          >
            <Img
              width={ 3 }
              height={ 3 }
              borderRadius={ 'sphere' }
              src={ appEnv.orgIconImage( orgIcon ) }
            />
            <Anchor.Plain
              href={ '/org/obj?id=' + orgUuid }
            >
              { orgName }
            </Anchor.Plain>
            <Box>
            </Box>
          </Flex>
          <Box
            border={ 'normal' }
            borderRadius={ 2 }
            padding={ [ -1,1 ] }
          >
            { ( appEnv.orgUserLevelArray as any )[ userLevel ] }
          </Box>
        </Flex>
        { Histories.length ?
          <List
            gridsRate={ [ 2,10 ] }
            list={ Histories }
          /> : null
        }
      </Flex>
    );
  } )

  return (
    <>
      <Box ssSubTitle={ true }>
        所属組織と役職
      </Box>
      { Orgs }
    </>
  );
}

const HomeTab: FNC<{}> = () => {
  let {
    Editable,
    events,
    user,
    reps = []
  } = AMOT.inmemory[ 'objPage' ];
  let {
    userId,
    description = ''
  } = user[ 0 ];


  let repCount = reps[ 0 ]?.repCount | 0;

  let [ val_description,set_description ] = useState( description );

  let DescriptionEditModal: Modal.Props = {
    modalId: 'updateDescription',
    type: 'center',
    closeDelegationAroundClick: true,
    header: <Box
      padding={ [ 1,2 ] }
      children={ '紹介文の入力' }
    />,
    body: <Box padding={ [ 1,2 ] }>
      <Input.TextArea
        required={ true }
        value={ val_description }
        placeholder='紹介文を入力してください'
        form='updateDescription'
        name='description'
        id='updateDescriptionInput'
        rows={ 8 }
      />
    </Box>,
    footer: ( { modalClose } ) => {
      return (
        <Flex
          type='row'
          wrap={ false }
          gap={ 1 }
          padding={ [ 1,2 ] }
          justify='between'
        >
          <Button.Border
            size="S"
            onClick={ modalClose }
            children={ '閉じる' }
          />
          <Button.Prime
            size="S"
            formButton='updateDescription'
            submitDelegationFormInputKeydownEvents={ [ 'auxEnter' ] }
            children={ '変更' }
            onClick={ async () => {
              let form = await $.formCollect( 'updateDescription' );
              if ( !form.valid ) return;
              let { description } = form.data;

              $.fetch( {
                name: 'updateObjDescription',
                method: 'post',
                url: 'updateAColumn',
                trafficControl: 0,
                body: {
                  objType: 'user',
                  id: userId,
                  column: 'description',
                  value: description
                }
              },( result ) => {
                if ( result.ok ) {
                  Modal.hide( 'updateDescription' );
                  set_description( description );
                }
              } )
            } }
          />
        </Flex>
      );
    },
    openAfter: () => {
      $( '#updateDescriptionInput' ).focus();
    }
  }

  return (
    <Flex
      type='col'
      gap={ 2 }
      flexChilds='auto'
    >
      <Flex
        ssCardBox={ true }
        flexChilds='even'
        width='100%'
        wrap={ false }
        align='bottom'
        textAligin='center'
        borderTop={ 'normal' }
      >
        <Box
          borderRight={ 'normal' }
          padding={ 1 }
        >
          <Icon
            d='fal heart'
            fontColor={ 'nega' }
            fontSize={ 6 }
          />
          <Box
            fontSize={ 5 }
            children={ repCount | 0 }
          />
          <Box fontSize={ 1 } children='いいね!した数' />
        </Box>
        <Box padding={ 1 }>
          <Icon
            d='fal calendar-star'
            fontColor={ 'warn' }
            fontSize={ 6 }
          />
          <Box
            fontSize={ 5 }
            children={ events.length | 0 }
          />
          <Box fontSize={ 1 } children='イベントに参加' />
        </Box>
      </Flex>
      { Editable ? <Box textAligin="right">
        <Button.Clear
          flex={ 'none' }
          onClick={ () => {
            Modal.toggle( DescriptionEditModal );
          } }
        >
          <Icon d='fal pen' /> 紹介文を編集
        </Button.Clear>
        <Box
          textAligin="left"
          whiteSpace='preWrap'
        >
          { val_description || <Box fontColor={ 4 } children='紹介文はありません' /> }
        </Box>
      </Box>
        : null }
      <OrgRegion />
      <Box ssSubTitle={ true }>
        参加イベント
      </Box>
      <EventRegion />
    </Flex>
  );
}

const EventRegion: FNC<{}> = () => {
  let { events } = AMOT.inmemory[ 'objPage' ];

  let Events: ReactElement[] = [];

  if ( events.length ) {
    for ( let event of events ) {
      let {
        id,
        eventUuid,
        title,
        headerImage,
        dateFrom,
        timeFrom,
        repCount,
        registerCount
      } = event;

      let Header = appEnv.eventHeaderImage( headerImage );

      Events.push(
        <Anchor.Border
          key={ id }
          borderRadius={ 'LBSub1' }
          overflow='hidden'
          textAligin='left'
          href={ '/event/obj?id=' + eventUuid }
          padding={ 1 }
        >
          <Flex
            width='100%'
            height='100%'
            type="col"
            gap={ -2 }
          >
            <Img
              src={ Header }
              borderRadius={ 2 }
              height='auto'
              flex='none'
            />
            <Box flex={ 'auto' }>
              <Box fontWeight={ 'bold' } fontSize={ 3 }>
                { title }
              </Box>
              <Box fontColor={ 3 } fontSize={ 1 }>
                { String( dateFrom ).toDateJP() }
                <br />
                { String( timeFrom ).toTimeJP() } ~
              </Box>
            </Box>
            <Flex justify='left' gap={ 1 } fontColor={ 5 }>
              <Box>
                <Icon fontColor={ 'nega' } d='heart' /> { repCount }
              </Box>
              <Box>
                <Icon fontColor={ 'posi' } d='users' /> { registerCount }
              </Box>
            </Flex>
          </Flex>
        </Anchor.Border>
      );
    }
  } else {
    Events = [
      <Box
        key={ 'noEvent' }
        children={ 'イベントはありません' }
      />
    ];
  }

  return (
    <Grid
      cols={ 3 }
      gap={ 1 }
      phoneStyles={ {
        gridCols: 2
      } }
      children={ Events }
    />
  );
}
const LineSettingRegion: FNC<{}> = () => {
  let {
    Editable,
    user
  } = AMOT.inmemory[ 'objPage' ]
  let {
    userId,
    lineId,
    lineNoticeRemind,
    lineNoticeWeekly
  } = user[ 0 ];

  let [ val_LN_remind,set_LN_remind ] = useState( !!lineNoticeRemind );
  let [ val_LN_weekly,set_LN_weekly ] = useState( !!lineNoticeWeekly );

  let Connected = Boolean( lineId );
  if ( Connected ) {
    return (
      <>
        <Flex
          type='col'
          gap={ 1 }
        >
          <Box ssCardBox={ true }>
            <List
              appearance='border'
              type='sides'
              padding={ 1.5 }
              paddingRight={ 0 }
              rowStyle={ {
                padding: [ 1,0 ],
                paddingRight: 1.5
              } }
              list={ [
                {
                  title: <>
                    <Box>
                      <Box fontSize={ 4 }>
                        リマインド
                      </Box>
                      <Paragraph
                        fontColor={ 4 }
                        fontSize={ 1 }
                      >
                        参加登録をしたイベント開催の前日20:00に、
                        <br />
                        リマインド通知を送ります。
                      </Paragraph>
                    </Box>
                  </>,
                  content: <>
                    <Input.Switch
                      value={ val_LN_remind }
                      onChangeCallBack={ ( { value } ) => {
                        $.fetch(
                          {
                            method: 'post',
                            url: 'updateAColumn',
                            body: {
                              objType: 'user',
                              id: Env.Session.userId,
                              column: 'lineNoticeRemind',
                              value: Number( value )
                            },
                            trafficControl: 200
                          },
                          ( result ) => {
                            if ( result.ok ) set_LN_remind( true );
                          }
                        )
                      } }
                    />
                  </>
                },{
                  title: <>
                    <Box>
                      <Box fontSize={ 4 }>
                        おすすめ例会
                      </Box>
                      <Paragraph
                        fontColor={ 4 }
                        fontSize={ 1 }
                      >
                        第二・第四水曜日の20:00に、
                        <br />
                        あなたへおすすめの例会を送ります。
                      </Paragraph>
                    </Box>
                  </>,
                  content: <>
                    <Input.Switch
                      value={ val_LN_weekly }
                      onChangeCallBack={ ( { value } ) => {
                        $.fetch(
                          {
                            method: 'post',
                            url: 'updateAColumn',
                            body: {
                              objType: 'user',
                              id: Env.Session.userId,
                              column: 'lineNoticeWeekly',
                              value: Number( value )
                            },
                            trafficControl: 200
                          },
                          ( result ) => {
                            if ( result.ok ) set_LN_weekly( true );
                          }
                        )
                      } }
                    />
                  </>
                }
              ] }
            />
          </Box>
          <Flex justify='right'>
            <Button.Sub
              color='nega'
              onClick={ () => {
                Modal.add( {
                  modalId: 'removeConnect',
                  type: 'center',
                  styles: {
                    width: 'auto'
                  },
                  header: <Box
                    padding={ [ 1,2 ] }
                  >
                    LINE連携の解除
                  </Box>,
                  footer: false,
                  body: ( { modalClose } ) => {
                    return (
                      <Box padding={ 2 }>
                        <Box
                          textAligin='center'
                          padding={ 1 }
                        >
                          連携を解除します、よろしいですか？
                        </Box>
                        <Flex
                          justify='center'
                          gap={ 1 }
                        >
                          <Button.Border
                            size="S"
                            onClick={ modalClose }
                          >
                            閉じる
                          </Button.Border>
                          <Button.Prime
                            size="S"
                            onClick={ () => {
                              $.fetch(
                                {
                                  method: 'post',
                                  url: 'updateAColumn',
                                  body: {
                                    objType: 'user',
                                    id: Env.Session.userId,
                                    column: 'lineId',
                                    value: null
                                  },
                                  trafficControl: 100
                                },
                                ( result ) => {
                                  if ( result.ok ) window.location.reload();
                                }
                              )
                            } }
                          >
                            解除
                          </Button.Prime>
                        </Flex>
                      </Box>
                    );
                  }
                } );
              } }
            >
              連携を解除する
            </Button.Sub>
          </Flex>
        </Flex>
      </>
    );
  } else {
    return (
      <>
        <Flex
          type='col'
          gap={ 1 }
        >
          <Box ssCardBox={ true }>
            <Box
              ssCardBoxBody={ true }
              borderTop={ 'unset' }
            >
              <Box marginBottom={ 1 } fontSize={ 3 }>
                <LINEIcon
                  size='L'
                /> LINE 連携について
              </Box>
              <Paragraph
                fontColor={ 4 }
              >
                RACCOの公式LINEを友達追加すると、イベント開催のリマインドやおすすめのイベント情報を受け取ることができます。
              </Paragraph>
              <Flex
                justify='right'
              >
                <Anchor.Prime
                  href={ appEnv.lineLink }
                  newTab={ true }
                >
                  LINEを開く
                </Anchor.Prime>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </>
    );
  }
}


const ObjPage: FNC<{}> = () => {
  let {
    Editable,
    user
  } = AMOT.inmemory[ 'objPage' ]
  let {
    name,
    kana,
    iconImage
  } = user[ 0 ];

  let IconImage = $.userIconImage( iconImage );

  return (
    <LayoutContent
      size='XL'
      styles={ {
        padding: [ 2,3 ],
        phoneStyles: {
          padding: 0
        }
      } }
    >
      <Flex
        wrap={ false }
        align='top'
        gap={ 2 }
        phoneStyles={ {
          display: 'block',
        } }
      >
        <Flex
          type='col'
          gap={ 2 }
          flex={ 0 }
        >
          <HeaderRegion />
          <Box
            padding={ [ 0,1 ] }
          >
            <Flex
              wrap={ false }
              align='center'
              gap={ 1 }
            >
              <Img
                src={ IconImage }
                showExpand={ IconImage.replace( /\/R\./,'/L.' ) }
                width={ 6 }
                height={ 6 }
                borderRadius={ 'sphere' }
              />
              <Box>
                <Box
                  fontSize={ 6 }
                  fontWeight={ 'bold' }
                  children={ name }
                />
                <Box
                  fontSize={ 3 }
                  children={ kana }
                />
              </Box>
            </Flex>
          </Box>
          <TabContent
            defaultTabIndex={ 0 }
            tabBar={ {
              sticky: [
                '#TopHeader'
              ]
            } }
            Swipeable={ true }
            bodyTemplate={ ( children ) => {
              return (
                <Box
                  paddingTop={ 2 }
                  phoneStyles={ {
                    padding: 1
                  } }
                  children={ children }
                />
              );
            } }
            contents={ [
              {
                tab: 'ホーム',
                body: <HomeTab />
              },
              ...Editable ? [
                {
                  tab: <>
                    <Icon d='fal gear' /> LINE 通知設定
                  </>,
                  body: <LineSettingRegion />
                }
              ] : []
            ] }
          />
        </Flex>
      </Flex>
    </LayoutContent>
  );
}

export const UserPage: FNC<{}> = () => {
  let [ val_def,set_def ] = useState( null as any );

  useEffect( () => {
    let {
      id = Env.Session.userUuid
    } = $.getQueryParams();
    let Editable = id === Env.Session.userUuid ||
      Env.Session.userLevel >= 3281;

    $.fetch( {
      method: 'post',
      url: 'user/obj',
      body: {
        id
      },
      trafficControl: 800
    },( result ) => {
      if ( result.ok && result.body.user.length === 1 ) {
        AMOT.inmemory[ 'objPage' ] = {
          ...result.body,
          Editable
        };
        set_def( true );
      }
    } )
  },[] );

  if ( !val_def ) return (
    <Flex
      padding={ 4 }
      flexCenter={ true }
      children={ <Loading /> }
    />
  );
  return ( <ObjPage /> );
}