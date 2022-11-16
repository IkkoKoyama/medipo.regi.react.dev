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
    FlexBr,
    Input,
    Buttons: {
      Button,
      Label,
      Anchor,
    },
    Icon,
    Img,
    Paragraph,
    Loading,
    Span,
  },
  mols: {
    Accordion,
    List,
    LinkifyText
  },
  orgs: {
    LayoutContent,
    Cropper,
    TabContent
  }
} = AMOT;

import { InteractButton } from '@appComps/InteractButton/parts';

const HeaderImageRegion: FNC<{}> = () => {
  let {
    obj
  } = Temps[ 'objPage' ];
  let {
    headerImage
  } = obj[ 0 ];

  let [ val_headerImage,set_headerImage ] = useState( headerImage );
  val_headerImage = appEnv.eventHeaderImage( val_headerImage );

  return (
    <Img
      src={ val_headerImage }
      borderRadius={ 'LBMain' }
      showExpand={ val_headerImage.replace( /\/R\./,'/L.' ) }
      phoneStyles={ {
        borderRadius: 0
      } }
    />
  );
}

type Val_like = {
  mylike: boolean
  likes: number
}

const TitlesRegion: FNC<{
  val_like: Val_like
  set_like: React.Dispatch<React.SetStateAction<Val_like>>
}> = ( props ) => {
  let {
    val_like,
    set_like
  } = props;
  let {
    obj
  } = Temps[ 'objPage' ];
  let {
    eventId,
    title,
    subTitle
  } = obj[ 0 ];

  return (
    <>
      <Box
        phoneStyles={ {
          padding: [ 0,1 ]
        } }
      >
        <Flex
          wrap={ false }
          justify='between'
          align='top'
          gap={ 1 }
        >
          <Box
            children={
              <>
                <Box
                  fontSize={ 6 }
                  children={ title }
                />
                <Box
                  fontSize={ 3 }
                  fontColor={ 4 }
                  children={ subTitle || '--' }
                />
              </>
            }
          />
          <InteractButton
            type='heart'
            size='L'
            value={ !!val_like.mylike }
            onChangeCallBack={ ( value ) => {
              $.fetch(
                {
                  name: 'eventHeart',
                  method: 'post',
                  url: 'event/heart',
                  body: {
                    eventId,
                    value
                  },
                  trafficControl: 0
                },
                ( result ) => {
                  if ( result.ok ) {
                    let direction = Number( value ) * 2 - 1;
                    set_like(
                      {
                        likes: val_like.likes + direction,
                        myLike: value
                      } as any
                    );
                    Toast.add( {
                      toastId: 'eventAdd' + value,
                      type: 'plain',
                      message: value ? 'イベントにいいねしました' : 'いいねを解除しました'
                    } );
                  }
                }
              )
            } }
            free={ val_like.likes }
          />
        </Flex>
        {/* <Flex
          gap={ -1 }
          marginTop={ -2 }
        >
          <Flex
            align='center'
            padding={ [ -2,-1 ] }
            border={ 'normal' }
            borderRadius={ 1 }
            borderColor={ 'theme' }
            fontColor={ 'theme' }
          >
            <Icon d='far tag' /> オンライン
          </Flex>
          <Flex
            align='center'
            padding={ [ -2,-1 ] }
            border={ 'normal' }
            borderRadius={ 1 }
            borderColor={ 'theme' }
            fontColor={ 'theme' }
          >
            <Icon d='far tag' /> 対面
          </Flex>
        </Flex> */}
      </Box>
    </>
  );
}

const TimePlaceRegion: FNC<{}> = () => {
  let {
    obj
  } = Temps[ 'objPage' ];
  let {
    eventId,
    title,

    dateFrom = '',
    dateTo = '',
    timeFrom = '',
    timeTo = '',
    registerExpireDate,

    way,
    addr1,
    addr2,
    postal,
    lat,lng
  } = obj[ 0 ];

  let [ val_mapOpen,set_mapOpen ] = useState( false );

  useEffect( () => {
    if ( val_mapOpen && lat && lng ) {
      ( async () => {
        let position = { lat,lng }

        let gmap = await $.MapView( {
          target: $( '#mapView' )[ 0 ],
          options: {
            center: position,
            zoom: 15,
            mapTypeControl: false,
            streetViewControl: false
          }
        } );
        if ( gmap.ok ) {
          gmap
            .setMarker( {
              id: 'marker1',
              options: {
                position: position
              }
            } )
            .setCircle( {
              id: 'circle1',
              options: {
                center: position,
                strokeColor: 'rgb( 66,133,244 )',
                strokeOpacity: 1,
                strokeWeight: 1,
                fillColor: 'rgb( 66,133,244 )',
                fillOpacity: .1,
                radius: 500
              }
            } );
        }
      } )();
    }
  },[ val_mapOpen ] );

  let googleCalendarParams = [
    'action=TEMPLATE',
    'text=' + title,
    ( 'dates=' + dateFrom + 'T' + timeFrom + '00' + '/' + ( ( dateTo || dateFrom ) + 'T' + ( timeTo || timeFrom ) + '00' ) ).replace( /-/ig,'' )
  ];

  let googleCalendarUrl = 'https://www.google.com/calendar/render?' + googleCalendarParams.join( '&' );

  return (
    <Box ssCardBox={ true }>
      <Box ssCardBoxHeader={ true }>
        日程と場所
      </Box>
      <Flex
        ssCardBoxBody={ true }
        fontSize={ 4 }
        gap={ 1 }
        wrap={ false }
      >
        <Box>
          <Icon d='fal calendar-days' />
        </Box>
        <Box
          gap={ 1 }
        >
          <Flex gap={ [ 0,-1 ] }>
            <Box children={ String( dateFrom ).toDateJP() } />
            { dateTo ? <>
              <Box children={ String( timeFrom ).toTimeJP() } /> ~
              <Flex
                flex={ 'none' }
                width='100%'
                gap={ -1 }
              >
                <Box children={ String( dateTo ).toDateJP() } />
                <Box children={ String( timeTo ).toTimeJP() } />
              </Flex>
            </> : null }
          </Flex>
          { dateTo ? null : <Flex
            gap={ [ 0,-1 ] }
          >
            { String( timeFrom ).toTimeJP() }
            <Box children={ '~' } />
            <Box children={ String( timeTo ).toTimeJP() || '随時終了' } />
          </Flex>
          }
          <Anchor.Border
            size='S'
            marginTop={ -1 }
            fontSize={ 2 }
            fontColor={ 'theme' }
            href={ googleCalendarUrl }
            newTab={ true }
            onClick={ () => {
            } }
          >
            Googleカレンダーに登録 <Icon d='far arrow-right' />
          </Anchor.Border>
        </Box>
      </Flex>
      <Box
        ssCardBoxBody={ true }
        fontSize={ 4 }
      >
        <Flex
          gap={ 1 }
          wrap={ false }
        >
          <Icon d='fal location-dot' />
          <Box
            flex={ 'auto' }
          >
            {
              way == 2 ? 'オンライン開催' :
                <>
                  <Box children={ '〒' + postal } />
                  <Box children={ addr1 } />
                  <Box children={ addr2 } />
                  <Button.Border
                    marginTop={ -1 }
                    fontColor={ 'theme' }
                    fontSize={ 2 }
                    onClick={ () => {
                      set_mapOpen( true );
                    } }
                    children={ '地図で確認する' }
                  />
                  {
                    val_mapOpen ? <Box
                      id='mapView'
                      borderRadius={ 2 }
                      backgroundColor={ 3 }
                      minHeight={ 24 }
                    /> : null
                  }
                </>
            }
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
const DescriptionRegion: FNC<{}> = () => {
  let {
    obj
  } = Temps[ 'objPage' ];
  let { description } = obj[ 0 ];

  return (
    <>
      <Box>
        <Paragraph whiteSpace='preWrap'>
          <LinkifyText
            text={ description }
            placeholder={ '説明文はありません' }
          />
        </Paragraph>
      </Box>
    </>
  );
}
const OrgRegion: FNC<{}> = () => {
  let {
    obj
  } = Temps[ 'objPage' ];
  let {
    orgName,
    orgDescription,
    orgIcon,
    orgUuid
  } = obj[ 0 ];

  return (
    <Box ssCardBox={ true }>
      <Box ssCardBoxHeader={ true }>
        主催者の情報
      </Box>
      <Flex
        ssCardBoxBody={ true }
        wrap={ false }
        gap={ 1 }
      >
        <Img
          src={ appEnv.orgIconImage( orgIcon,'S' ) }
          width={ 3 }
          height={ 3 }
          borderRadius={ 'sphere' }
        />
        <Box flex='auto'>
          <Box
            fontSize={ 4 }
            children={ orgName }
          />
          <Box whiteSpace='preWrap'>
            <LinkifyText
              text={ orgDescription }
            />
          </Box>
          <Flex
            justify='right'
          >
            <Anchor.Prime
              href={ '/org/obj?id=' + orgUuid }
              children={ '紹介ページへ' }
            />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
const DetailsRegion: FNC<{}> = () => {
  let {
    obj
  } = Temps[ 'objPage' ];
  let {
    eventId,
    eventUuid,
    anonymity,
    capacity,
    way
  } = obj[ 0 ];

  let Anonymity: any = appEnv.eventAnonymity;

  let [ val_files,set_files ] = useState( [] );

  useEffect( () => {
    $.fetch( {
      method: 'post',
      url: 'mod/auth/s3/getFolderFiles',
      body: {
        type: 'app',
        bucket: 'private',
        key: 'event/attachments/' + eventUuid
      }
    },( result ) => {
      if ( result.ok ) set_files( result.body.files );
    } )
  },[] );

  let Attachments = <></>;
  if ( val_files.length ) {
    let Files = val_files.map( ( key: string ) => {
      let fileSplit = key.split( '/' );
      let fileName = fileSplit[ fileSplit.length - 1 ];

      fileSplit.splice( 0,3 );
      let Key = fileSplit.join( '/' );

      return (
        <Button.Clear
          border={ 'normal' }
          onClick={ () => {
            $.fetch( {
              method: 'post',
              url: 'mod/auth/s3/getPresignedUrl',
              body: {
                type: 'app',
                keys: [ {
                  bucket: 'private',
                  method: 'get',
                  key: Key
                } ]
              },
              trafficControl: 0
            },( { ok,body } ) => {
              if ( ok && body[ 0 ].ok ) window.open( body[ 0 ].body,'_blank' );
            } )
          } }
        >
          <Flex
            wrap={ false }
            gap={ 1 }
            textAligin='left'
            wordBreak={ 'break-all' }
          >
            <Icon d='fal file' />
            { fileName }
          </Flex>
        </Button.Clear>
      );
    } );

    Attachments = <Flex
      type='col'
      gap={ 1 }
      children={ Files }
    />;
  }

  return (
    <Box ssCardBox={ true }>
      <Box ssCardBoxHeader={ true }>
        詳細
      </Box>
      <Box ssCardBoxBody={ true }>
        <List
          borderRadius={ 0 }
          list={ [
            {
              title: <>
                <Icon d='stop' /> 公開範囲
              </>,
              content: <>
                { Anonymity[ anonymity ] }
              </>
            },{
              title: <>
                <Icon d='stop' /> 参加方法
              </>,
              content: <>
                { [ '対面','オンライン','対面 + オンライン' ][ way ] }
              </>
            },{
              title: <>
                <Icon d='stop' /> 定員
              </>,
              content: <>
                { capacity || 'なし' }
              </>
            },{
              title: <>
                <Icon d='stop' /> 資料
              </>,
              content: <>
                <Loading />
                { Attachments }
              </>
            },
          ] }
        />
      </Box>
    </Box>
  );
}

const registerModal = (
  props: {
    set_myRegister: React.Dispatch<React.SetStateAction<boolean>>
  }
) => {
  let {
    set_myRegister
  } = props;
  let {
    obj
  } = Temps[ 'objPage' ];
  let {
    eventId,
    way,
    registerExpireDate
  } = obj[ 0 ];

  Modal.add( {
    modalId: 'eventRegister',
    type: 'center',
    size: 'S',
    header: ( { modalClose } ) => {
      return (
        <Flex
          padding={ [ 1,2 ] }
          align='center'
          justify='between'
        >
          イベントに参加する
          <Button.Border
            size='S'
            onClick={ modalClose }
            children={ '閉じる' }
          />
        </Flex>
      );
    },
    body: <Box
      padding={ 2 }
      children={
        <>
          <Flex
            type='col'
            textAligin='center'
            gap={ 2 }
          >
            <Input.Radio
              form='eventRegister'
              name='way'
              required={ true }
              appearance={ {
                cell: {
                  style: {
                    flex: 'auto',
                    borderRadius: 'sphere'
                  }
                }
              } }
              value={ way != 3 ? [ way ] : [] }
              list={ [
                {
                  value: 1,
                  label: '現地での参加',
                  disabled: way == 2
                },{
                  value: 2,
                  label: 'オンライン参加',
                  disabled: way == 1
                }
              ] }
            />
            {
              [
                '',
                <Box
                  fontColor={ 'nega' }
                  fontSize={ 1 }
                  children={ '※ このイベントは現地参加でのみ登録可能です' }
                />,
                <Box
                  fontColor={ 'nega' }
                  fontSize={ 1 }
                  children={ '※ このイベントはオンライン参加でのみ登録可能です' }
                />,
                ''
              ][ way ]
            }

            <Button.Prime
              borderRadius={ 'sphere' }
              formButton='eventRegister'
              width={ '100%' }
              padding={ 1 }
              onClick={ async () => {
                let form = await $.FormCollect( 'eventRegister' );
                if ( !form.valid ) return;

                $.fetch(
                  {
                    method: 'post',
                    url: 'event/register',
                    body: {
                      eventId,
                      way
                    }
                  },
                  ( result ) => {
                    if ( result.ok ) {
                      set_myRegister( true );
                      Modal.remove( 'eventRegister' );
                      Toast.add( {
                        toastId: 'eventRegisterCompleted',
                        type: 'plain',
                        appearance: 'theme',
                        message: '参加登録が完了しました'
                      } );
                    }
                  }
                )
              } }
              children={ '参加する' }
            />
          </Flex>
        </>
      }
    />,
    footer: false
  } );
}
const liftModal = () => {
  let {
    Registable,
    obj
  } = Temps[ 'objPage' ];
  let {
    eventId
  } = obj[ 0 ];

  Modal.add( {
    modalId: 'eventRegister',
    type: 'center',
    size: 'S',
    header: ( { modalClose } ) => {
      return (
        <Flex
          padding={ [ 1,2 ] }
          align='center'
          justify='between'
        >
          登録を解除する
          <Button.Border
            size='S'
            onClick={ modalClose }
            children={ '閉じる' }
          />
        </Flex>
      );
    },
    body: <Box
      padding={ 2 }
      children={
        <>
          { Registable ?
            <Flex
              type='col'
              textAligin='center'
              gap={ 2 }
            >
              登録を解除します
              よろしいですか？

              <Button.Prime
                size='S'
                color='nega'
                borderRadius={ 'sphere' }
                formButton='eventRegister'
                width={ '100%' }
                padding={ 1 }
                onClick={ async () => {
                  let form = await $.FormCollect( 'eventRegister' );
                  if ( !form.valid ) return;

                  $.fetch(
                    {
                      method: 'post',
                      url: 'event/liftRegister',
                      body: {
                        eventId,
                        userId: Env.Session.userId
                      }
                    },
                    ( result ) => {
                      if ( result.ok ) window.location.href = '/';
                    }
                  )
                } }
                children={ '解除する' }
              />
            </Flex> : <>
              <Box textAligin='center'>
                参加登録の編集期限を過ぎているため、
                登録のキャンセルができません。
                <br />
                主催者へ直接ご連絡ください。
              </Box>
            </>
          }
        </>
      }
    />,
    footer: false
  } );
}




const DashBoardTab: FNC<{
  val_myRegister: boolean
  set_myRegister: React.Dispatch<React.SetStateAction<boolean>>
}> = ( props ) => {
  let {
    val_myRegister,
    set_myRegister
  } = props;
  let {
    Registable,
    obj
  } = Temps[ 'objPage' ];
  let {
    eventId,

    orgId,
    orgName
  } = obj[ 0 ];

  return (
    <Flex
      type='col'
      gap={ 2 }
      children={
        <>
          <DescriptionRegion />
          <TimePlaceRegion />
          <DetailsRegion />

          { Registable ?
            !val_myRegister ? <Button.Prime
              padding={ 1.5 }
              fontSize={ 4 }
              borderRadius={ 'sphere' }
              margin={ 2 }
              children={ '参加する' }
              onClick={ () => {
                registerModal( {
                  set_myRegister
                } );
              } }
            /> : <Button.Sub
              color='nega'
              padding={ 1.5 }
              fontSize={ 4 }
              borderRadius={ 'sphere' }
              margin={ 2 }
              onClick={ () => {
                liftModal();
              } }
            >
              登録済です
              <Box fontSize={ 1 }>
                登録を解除する
              </Box>
            </Button.Sub>
            : null
          }
          <OrgRegion />
        </>
      }
    />
  );
}
const CommentTab: FNC<{}> = () => {
  let {
    obj
  } = Temps[ 'objPage' ];
  let {
    eventId,
    eventUuid,
    title
  } = obj[ 0 ];

  let [ val_comments,set_comments ] = useState( [] );
  let [ val_addComment,set_addComment ] = useState( false );

  useEffect( () => {
    useStore( {
      insertId: 'eventObj-comment',
      data: {
        refresh: () => {
          $.fetch(
            {
              method: 'post',
              url: 'event/getComments',
              body: {
                eventId
              },
              trafficControl: 400
            },
            ( result ) => {
              if ( result.ok ) {
                set_comments( result.body.comment );
              }
            }
          )
        }
      }
    } );
  },[] )

  $( '#commentLength' ).html( val_comments.length );

  let Comments: ReactElement[] = [];

  for ( let comment of val_comments ) {
    let {
      id,
      description,
      userId,
      userUuid,
      userName,
      createdAt,
      userIcon
    } = comment;

    let IconImage = $.userIconImage( userIcon );

    Comments.push(
      <Box
        key={ id }
        marginTop={ 1 }
      >
        <Flex
          gap={ 1 }
          wrap={ false }
        >
          <Img
            src={ IconImage }
            width={ 3 }
            height={ 3 }
            borderRadius={ 'sphere' }
          />
          <Box flex={ 'auto' }>
            <Flex
              height={ 3 }
              alignItems='center'
              justify='left'
            >
              <Anchor.Plain
                href={ '/user/obj?id=' + userUuid }
                children={ userName }
              />
            </Flex>
            <Box
              backgroundColor={ 'LBReverse' }
              borderRadius={ 2 }
              border={ 'normal' }
              padding={ 1 }
              whiteSpace='preWrap'
              children={ description }
            />
            <Box
              textAligin='right'
              paddingTop={ -2 }
              children={ createdAt }
            />
          </Box>
        </Flex>
      </Box>
    );
  }
  if ( !val_comments.length ) {
    Comments = [
      <Box
        key='noComment'
        children={ 'コメントはありません' }
      />
    ];
  }

  return (
    <>
      { !val_addComment ? <>
        <Flex
          justify='right'
          padding={ 1 }
        >
          <Button.Prime
            size='S'
            onClick={ () => {
              set_addComment( true );
            } }
          >
            コメントする
          </Button.Prime>
        </Flex>
      </> : <>
        <Box ssCardBox={ true }>
          <Box
            padding={ [ 1,2 ] }
            children={ 'コメントする' }
          />
          <Box ssCardBoxBody={ true }>
            <Input.TextArea
              placeholder='相手のことを考え丁寧なコメントを心がけましょう。不快な言葉遣いなどは利用制限や退会処分となることがあります。'
              required={ true }
              name='description'
              form='eventComment'
              rows={ 8 }
            />
            <Flex
              gap={ 1 }
              justify='right'
              marginTop={ 1 }
            >
              <Button.Border
                size='S'
                onClick={ () => {
                  set_addComment( false );
                } }
                children={ '取り消し' }
              />
              <Button.Prime
                size='S'
                formButton='eventComment'
                submitDelegationFormInputKeydownEvents={ [ 'auxEnter' ] }
                onClick={ async () => {
                  let form = await $.FormCollect( 'eventComment' );
                  if ( !form.valid ) return;

                  $.fetch(
                    {
                      name: 'addComment',
                      method: 'post',
                      url: 'event/addComment',
                      body: {
                        eventId,
                        eventUuid,
                        title,
                        iconImage: Env.Images.usr.icon.S,
                        userName: Env.User.name,
                        ...form.data
                      },
                      trafficControl: 0
                    },
                    ( result ) => {
                      if ( result.ok ) {
                        set_addComment( false );

                        StoreComponents[ 'eventObj-comment' ].refresh();
                      }
                    }
                  )
                } }
                children={ '送信' }
              />
            </Flex>
          </Box>
        </Box>
      </> }
      { Comments }
      <Loading margin={ [ 2,'auto' ] } />
    </>
  );
}
const UsersTab: FNC<{}> = () => {
  let {
    obj,
    users
  } = Temps[ 'objPage' ];
  let {
    eventId
  } = obj[ 0 ];
  let [ val_users,set_users ] = useState( users );

  let Users: ReactElement[] = [];

  useEffect( () => {
    $( '#usersLength' ).html( val_users.length );
  },[] );

  for ( let user of val_users ) {
    let {
      id,
      userId,
      userUuid,
      userName,
      userIcon
    } = user;

    let IconImage = $.userIconImage( userIcon );

    Users.push(
      <Anchor.Clear
        key={ id }
        href={ '/user/obj?id=' + userUuid }
        borderRadius={ 0 }
        borderBottom={ 'normal' }
        padding={ 1 }
        width='100%'
      >
        <Flex
          gap={ 1 }
          wrap={ false }
        >
          <Img
            src={ IconImage }
            width={ 3 }
            height={ 3 }
            borderRadius={ 'sphere' }
          />
          <Box flex={ 'auto' }>
            <Flex
              height={ 3 }
              alignItems='center'
              justify='left'
            >
              <Anchor.Plain
                /** 要確認 */
                href={ '/user/obj?id=' + userUuid }
                children={ userName }
              />
            </Flex>
          </Box>
        </Flex>
      </Anchor.Clear>
    );
  }
  if ( !val_users.length ) {
    Users = [
      <Box
        key='noComment'
        children={ '参加予定のユーザーはいません' }
      />
    ];
  }

  return (
    <>
      { Users }
      <Loading margin={ [ 2,'auto' ] } />
    </>
  );
}

const ClosingRegion: FNC<{
  val_myRegister: boolean
  set_myRegister: React.Dispatch<React.SetStateAction<boolean>>
}> = ( props ) => {
  let {
    val_myRegister,
    set_myRegister
  } = props;
  let {
    Registable,
    obj,
    users
  } = Temps[ 'objPage' ];
  let {
    title,
    dateFrom,
    timeFrom,
    orgUuid,
    orgName,
    orgIcon
  } = obj[ 0 ];

  let UserIcons: ReactElement[] = [];
  for ( let index = 0; index < 5; index++ ) {
    let user = users[ index ];
    if ( !user ) continue;
    let {
      userId,
      userIcon
    } = user;

    let IconImage = $.userIconImage( userIcon );

    UserIcons.push(
      <Img
        key={ userId }
        src={ IconImage }
        width={ 2 }
        height={ 2 }
        className={ 'TableMemberCellImage' }
      />
    )
  }

  return (
    <>
      <Flex
        type='col'
        gap={ 1 }
        width={ 24 }
        position='sticky'
        top={ 8 }
        phoneStyles={ {
          width: 'auto',
          display: 'none'
        } }
      >
        <Flex
          type='col'
          gap={ 1 }
          ssCardBox={ true }
          padding={ 1.5 }
        >
          <Flex
            gap={ 1 }
            align='center'
            wrap={ false }
          >
            <Img
              src={ appEnv.orgIconImage( orgIcon ) }
              width={ 3 }
              height={ 3 }
              borderRadius={ 'sphere' }
            />
            <Anchor.Plain
              textAligin='left'
              href={ '/org/obj?id=' + orgUuid }
              fontSize={ 4 }
              children={ orgName }
            />
          </Flex>
          <Box
            children={
              <>
                <Box>
                  { title }
                </Box>
                <Box>
                  { String( dateFrom ).toDateJP() }
                </Box>
                <Box>
                  { String( timeFrom ).toTimeJP() } ~
                </Box>
                <Box>
                  参加予定
                  <Flex align='center'
                    paddingLeft={ 1 }
                  >
                    { UserIcons }
                    <Span marginLeft={ -1 }>{ users.length }人が参加予定</Span>
                  </Flex>
                </Box>
              </>
            }
          />
        </Flex>
        { Registable ?
          val_myRegister ? <Button.Sub
            color='nega'
            padding={ 1 }
            borderRadius={ 'LBMain' }
            onClick={ () => {
              liftModal();
            } }
          >
            登録済です
            <Box fontSize={ 1 }>
              登録を解除する
            </Box>
          </Button.Sub> : <Button.Prime
            width={ '100%' }
            padding={ 1 }
            borderRadius={ 'LBMain' }
            activeEffect={ 'shrink' }
            children={ '参加登録' }
            onClick={ () => {
              registerModal( {
                set_myRegister
              } );
            } }
          />
          : null
        }
      </Flex>
    </>
  )
}


export const ObjPage: FNC<{}> = () => {
  let {
    Registable,
    obj
  } = Temps[ 'objPage' ];
  let {
    registerExpireDate,

    likes,
    myLike,

    myRegister
  } = obj[ 0 ];

  let [ val_like,set_like ] = useState( {
    mylike: !!myLike,
    likes: likes
  } as Val_like );

  let [ val_myRegister,set_myRegister ] = useState( Boolean( myRegister ) );

  return (
    <LayoutContent
      size='MAX'
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
          <Box
            padding={ 1 }
          >
            { Registable ? <Flex
              gap={ 1 }
              align='center'
            >
              <Box
                display='inlineBlock'
                backgroundColor='posi'
                fontColor='white'
                borderRadius={ 1 }
                padding={ [ -2,1 ] }
                children={ '参加受付中' }
              />
              { registerExpireDate ? String( registerExpireDate ).toDateJP() + 'まで登録可能' : null }
            </Flex> : <Box
              display='inlineBlock'
              backgroundColor={ 4 }
              borderRadius={ 1 }
              padding={ [ -2,1 ] }
              children={ '参加登録期間は終了しました' }
            /> }
          </Box>
          <HeaderImageRegion />
          <TitlesRegion
            val_like={ val_like }
            set_like={ set_like }
          />

          <TabContent
            Swipeable={ true }
            defaultTabIndex={ 0 }
            tabBar={ {
              sticky: [
                '#TopHeader'
              ]
            } }
            onTabChange={ ( index ) => {
              let name = [ '','comment','users' ][ index ];
              let component = global.StoreComponents[ 'eventObj-' + name ];
              if ( component && component.refresh ) component.refresh();
            } }
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
                tab: '概要ページ',
                body: <DashBoardTab
                  val_myRegister={ val_myRegister }
                  set_myRegister={ set_myRegister }
                />
              },{
                tab:
                  <>
                    コメント <Span id='commentLength' />
                  </>,
                body: <CommentTab />
              },{
                tab:
                  <>
                    参加するユーザー <Span id='usersLength' />
                  </>,
                body: <UsersTab />
              }
            ] }
          />
        </Flex>
        <ClosingRegion
          val_myRegister={ val_myRegister }
          set_myRegister={ set_myRegister }
        />
      </Flex>
    </LayoutContent>
  );
}

export const EventPage: FNC<{}> = () => {
  let [ val_def,set_def ] = useState( 0 );

  useEffect( () => {
    let {
      id
    } = $.getQueryParams();

    $.fetch(
      {
        name: 'getEventObj',
        method: 'post',
        url: 'event/obj',
        body: {
          id
        },
        trafficControl: 800
      },
      ( result ) => {
        if (
          result.ok && result.body.obj.length === 1 &&
          result.body.obj[ 0 ].status == 200
        ) {
          let {
            registerExpireDate,
            dateFrom,
            timeFrom,
            status
          } = result.body.obj[ 0 ];

          let CurrentTime = new Date();
          let EventStartTime = ( dateFrom + timeFrom + '00' ).replace( /-/ig,'' );

          let Registable = 1;
          if ( registerExpireDate ) {
            Registable &= Number( Number( CurrentTime.ymd() ) <= Number( registerExpireDate.replace( /-/ig,'' ) ) );
          }
          Registable &= Number( Number( EventStartTime ) >= Number( CurrentTime.ymdhms() ) );

          Temps[ 'objPage' ] = {
            ...result.body,
            Registable: Boolean( Registable )
          };
          set_def( 200 );
        } else {
          set_def( 401 );
        }
      }
    )
  },[] );

  if ( val_def == 0 ) {
    return (
      <Flex
        padding={ 4 }
        flexCenter={ true }
        children={ <Loading /> }
      />
    );
  } else if ( val_def == 401 ) {
    return (
      <Flex
        padding={ 4 }
        flexCenter={ true }
      >
        <Box textAligin='center'>
          <Box>
            このイベントは現在表示できません
          </Box>
          <Anchor.Prime
            href='/'
            marginTop={ 1 }
          >
            ホームへ戻る
          </Anchor.Prime>
        </Box>
      </Flex>
    );
  } else if ( val_def == 200 ) {
    return ( <ObjPage /> );
  }
  return null;
}