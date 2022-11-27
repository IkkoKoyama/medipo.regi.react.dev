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
      Label,
      Anchor
    },
    Icon,
    Img,
    Paragraph,
    FlexBr,
    Loading,
    Grid
  },
  mols: {
    List,
  },
  orgs: {
    LayoutContent,
    Cropper,
    TabContent,
    Table
  }
} = AMOT;

let ObjTab = 'OrgObj';

const updateNameModal = (
  props: {
    val_objName: string
    set_objName: React.Dispatch<any>
    objId: number
  }
) => {
  let {
    val_objName,
    set_objName,
    objId
  } = props;

  Modal.toggle( {
    modalId: 'updateName',
    size: 'S',
    type: 'center',
    closeDelegationAroundClick: true,
    header: <Box
      padding={ [ 1,2 ] }
      children={ '名前を変更する' }
    />,
    body: <Box
      padding={ [ 1,2 ] }
    >
      <Input.Text
        required={ true }
        value={ val_objName }
        form='updateName'
        name='name'
        id='updateName'
      />
    </Box>,
    footer: ( { modalClose } ) => (
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
          formButton='updateName'
          submitDelegationFormInputKeydownEvents={ [ 'auxEnter' ] }
          children={ '変更' }
          onClick={ async () => {
            let form = await $.formCollect( 'updateName' );
            if ( !form.valid ) return;
            let { name } = form.data;

            $.fetch({
                name: 'updateObjName',
                method: 'post',
                url: 'updateAColumn',
                trafficControl: 0,
                body: {
                  objType: 'org',
                  id: objId,
                  column: 'name',
                  value: name
                }
              },( result ) => {
                if ( result.ok ) {
                  Modal.hide( 'updateName' );
                  set_objName( name );
                }
              })
          } }
        />
      </Flex>
    ),
    openAfter: () => {
      $( '#updateName' ).focus();
    }
  } );
}

const IconRegion: FNC<plainObject> = ( props ) => {
  let {
    Editable,
    val_objName,
    set_objName,
    val_iconImage,
    set_iconImage,
    objId,
    objUuid
  } = props;

  let {
    obj,
    events,
  } = AMOT.inmemory[ 'objPage' ]
  let {
    eventCount,
    repCount,
    userCount
  } = obj[ 0 ];

  let TotalRegisters = events.reduce( ( a: any,b: any ) => a + b.registerCount,0 );

  const IconImage = <>
    <Img
      src={ val_iconImage }
      showExpand={ val_iconImage.replace( /\/R\./,'/L.' ) }
    />
    { Editable ? <>
      <Label.Clear
        htmlFor='changeIconImage'
        position='absolute'
        bottom={ 0 }
        left={ 0 }
        right={ 0 }
        backgroundColor={ 'lcOpMiddle' }
        fontColor={ 'white' }
        padding={ -2 }
        fontSize={ 4 }
        tipsEffect={ {
          position: 'bottomCenter',
          content: 'イメージを変更'
        } }
        children={ <Icon d='far camera' /> }
      />
      <Cropper
        use='profile'
        triggerId='changeIconImage'
        develops={ [
          { size: 'S' },
          { size: 'R' },
          { size: 'L' }
        ] }
        onProcessFinished={ async ( files ) => {
          let ImageId = $.uuidGen( 32 ).toUpper();
          let isFinished = false;

          let sizes = [ 'S','R','L' ];
          await ( async () => {
            let getUrls = await $.fetch( {
              method: 'post',
              url: 'mod/auth/s3/getPresignedUrl',
              body: {
                type: 'app',
                keys: sizes.map( ( size ) => ( {
                  bucket: 'public',
                  key: 'org/icon/' + ImageId + '/' + size + '.jpeg',
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
              name: 'updateObjIconImage',
              method: 'post',
              url: 'updateAColumn',
              trafficControl: 0,
              body: {
                objType: 'org',
                id: objId,
                column: 'iconImage',
                value: ImageId
              }
            } )
            if ( !result.ok ) return;
            isFinished = true;
          } )();

          if ( isFinished ) set_iconImage( ImageId );
        } }
      />
    </> : null }
  </>;

  return (
    <Box
      maxWidth={ 24 }
      width='100%'
      textAligin='center'
      position='sticky'
      top={ 6 }
      phoneStyles={ {
        display: 'none'
      } }
    >
      <Flex
        type='col'
        gap={ 1 }
        maxWidth={ 30 }
        position='sticky'
        top={ 8 }
        phoneStyles={ {
          display: 'none'
        } }
      >
        <Box ssCardBox={ true }>
          <Box padding={ 2 }>
            <Box
              width={ 12 }
              height={ 12 }
              position='relative'
              overflow='hidden'
              margin='auto'
              borderRadius={ 'sphere' }
              children={ IconImage }
            />
            <Box
              marginTop={ 2 }
              fontSize={ 6 }
              fontWeight={ 'bold' }
              children={ val_objName }
            />
            { Editable ? <Button.Clear
              padding={ [ -1,1.5 ] }
              marginLeft={ -1 }
              onClick={ () => {
                updateNameModal( {
                  val_objName,
                  set_objName,
                  objId
                } );
              } }
            >
              名前を変更する <Icon d='fal pen' />
            </Button.Clear> : null
            }
          </Box>
          <Flex
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
              <Box fontSize={ 0 } children='いいね!' />
            </Box>
            <Box
              borderRight={ 'normal' }
              padding={ 1 }
            >
              <Icon
                d='fal users'
                fontColor={ 'posi' }
                fontSize={ 6 }
              />
              <Box
                fontSize={ 5 }
                children={ TotalRegisters | 0 }
              />
              <Box fontSize={ 0 } children='参加者' />
            </Box>
            <Box
              padding={ 1 }
            >
              <Icon
                d='fal calendar-star'
                fontColor={ 'warn' }
                fontSize={ 6 }
              />
              <Box
                fontSize={ 5 }
                children={ eventCount | 0 }
              />
              <Box fontSize={ 0 } children='イベント' />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

const AddMemberModal: FNC<{}> = () => {
  let Data = AMOT.inmemory[ 'objPage' ];
  let {
    id: objId
  } = Data.obj[ 0 ];

  let [ val_addRegionOpen,set_addRegionOpen ] = useState( true );
  let [ val_users,set_users ] = useState( [] as any );

  let UserList: Orgs.Tables.Plain.RowProps[] = [];

  let UserLevels: any = global.appEnv.orgUserLevelArray;
  val_users.forEach( ( val_user: any,index: number ) => {
    let {
      user,
      userLevel,
      joinAt = ''
    } = val_user;

    let {
      userId,
      iconImage,
      name
    } = user;

    let UserData = {
      ...user,
      joinAt,
      userLevel
    }

    let UserLevelLabel = UserLevels[ userLevel as any ];

    let Row: Orgs.Tables.Plain.RowProps = {
      columns: [
        {
          label: <>
            <Img
              width={ 2 }
              height={ 2 }
              borderRadius={ 'sphere' }
              src={ $.userIconImage( iconImage,'S' ) }
            /> { name }
          </>
        },
        { label: UserLevelLabel },
        { label: String( joinAt ).toDateJP() || '--' },
        {
          label: <>
            <Input.Hidden
              form='addMemberForm'
              name={ 'user-' + index }
              value={ UserData }
            />
            <Button.Sub
              size="S"
              color="nega"
              children={ <><Icon d='trash-alt' /> 削除</> }
              onClick={ () => {
                let newList = [ ...val_users ];
                newList.splice( index,1 );
                set_users( newList );
              } }
            />
          </>
        }
      ]
    }
    UserList.push( Row );
  } );

  useEffect( () => {
    let Button: any = $( '#addMemberButton' )[ 0 ];
    if ( Button ) Button.disabled = !val_users.length;
  } );

  let AddUserAddButton = async () => {
    let form = await $.formCollect( 'addMemberAddForm' );
    if ( !form.valid ) return;
    let {
      user,
      userLevel,
      joinAt
    } = form.data;

    set_users(
      [
        ...val_users,
        {
          user,
          userLevel,
          joinAt
        }
      ]
    );
    set_addRegionOpen( false );
  }

  return (
    <Flex
      type='col'
      gap={ 2 }
      padding={ 2 }
    >
      <Input.Hidden
        form='addMemberForm'
        name={ 'length' }
        value={ val_users.length }
      />
      <Input.Hidden
        form='addMemberForm'
        name={ 'orgId' }
        value={ objId }
      />
      { val_addRegionOpen ? <Box border={ 'normal' } borderRadius={ 2 }>
        <Flex
          padding={ 2 }
          align='top'
          flexChilds='auto'
          gap={ [ -1,1 ] }
        >
          <Input.Search
            label='ユーザー'
            required={ true }
            name='user'
            form='addMemberAddForm'
            limit={ 1 }
            list={ [] }
            onDynamicSearchCallBack={ async ( keyword ) => {
              let Users: Input.Search.OptionCellProps[] = [];
              let result = await $.fetch( {
                method: 'post',
                url: 'org/searchUserOnAddOrgUser',
                body: {
                  orgId: objId,
                  keyword
                },
                trafficControl: 10
              } );
              if ( result.ok ) {
                for ( let user of result.body.users ) {
                  let {
                    id,
                    name,
                    kana,
                    iconImage
                  } = user;

                  Users.push( {
                    value: {
                      userId: id,
                      name: name,
                      iconImage
                    },
                    icon: <Img
                      width={ 3 }
                      height={ 3 }
                      borderRadius={ 'sphere' }
                      src={ $.userIconImage( iconImage ) }
                    />,
                    label: <Box>
                      <Box children={ name } />
                      <Box
                        children={ kana }
                        fontColor={ 4 }
                        fontSize={ 0 }
                      />
                    </Box>,
                    keyword: name,
                  } );
                }
              }

              return Users;
            } }
          />

          <FlexBr />
          <Input.Select
            label='権限レベル'
            required={ true }
            name='userLevel'
            form='addMemberAddForm'
            value={ 64 }
            list={ [
              { value: 16,label: 'ビジター' },
              { value: 32,label: '友好メンバー' },
              { value: 64,label: '一般' },
              { value: 128,label: '幹部' },
              { value: 256,label: '管理者' },
              { value: 1,label: 'その他' },
            ] }
          />
          <Input.Time.Month
            required={ true }
            label='入会月'
            name='joinAt'
            form='addMemberAddForm'
          />
        </Flex>
        <Flex
          wrap={ false }
          gap={ 1 }
          borderTop={ 'normal' }
          padding={ [ 1,2 ] }
        >
          <Button.Sub
            size="S"
            color='nega'
            fontColor={ 'nega' }
            marginRight='auto'
            activeEffect={ 'ripple.nega' }
            children={ <><Icon d='times' /> 取消</> }
            onClick={ () => {
              set_addRegionOpen( false );
            } }
          />
          <Button.Sub
            size="S"
            activeEffect={ 'ripple.theme' }
            children={ 'もう一件追加' }
            onClick={ async () => {
              await AddUserAddButton();
              setTimeout( () => {
                set_addRegionOpen( true );
              },1 );
            } }
          />
          <Button.Prime
            size="S"
            children={ '追加' }
            onClick={ async () => {
              await AddUserAddButton();
            } }
          />
        </Flex>
      </Box> : <Button.Sub
        padding={ 1 }
        onClick={ () => {
          set_addRegionOpen( true );
        } }
      >
        <Icon d='plus' /> ユーザーを追加する
      </Button.Sub>
      }
      { UserList.length ?
        <Table.Plain
          colLength={ 4 }
          appearance={ {
            format: 'rowBorder'
          } }
          head={ [
            { label: 'ユーザー' },
            { label: '権限レベル' },
            { label: '入会月' },
            { label: '' },
          ] }
          rows={ UserList }
        /> : null }
    </Flex>
  );
}

const HomeTab: FNC<{}> = () => {
  let {
    Editable,
    events = [],
    obj
  } = AMOT.inmemory[ 'objPage' ];
  let {
    id: objId,
    description = '',
    repCount,
    userCount,
    eventCount
  } = obj[ 0 ];


  let [ val_description,set_description ] = useState( description );

  let DescriptionEditModal: Modal.Props = {
    modalId: 'updateDescription',
    type: 'center',
    closeDelegationAroundClick: true,
    header: <Box
      padding={ [ 1,2 ] }
      children={ '説明文の入力' }
    />,
    body: <Box padding={ [ 1,2 ] }>
      <Input.TextArea
        required={ true }
        value={ val_description }
        placeholder='説明文を入力してください'
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
                  objType: 'org',
                  id: objId,
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

  let Events: ReactElement[] = [];

  let TotalRegisters = events.reduce( ( a: any,b: any ) => a + b.registerCount,0 );

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
        children={ '参加イベントはまだありません。' }
      />
    ];
  }

  return (
    <Flex type='col' gap={ 2 }>
      <Flex
        ssCardBox={ true }
        flexChilds='even'
        width='100%'
        wrap={ false }
        align='bottom'
        textAligin='center'
        borderTop={ 'normal' }
      >
        <Box borderRight={ 'normal' } padding={ 1 }>
          <Icon
            d='fal heart'
            fontColor={ 'nega' }
            fontSize={ 6 }
          />
          <Box fontSize={ 5 } children={ repCount | 0 } />
          <Box fontSize={ 1 } children='総いいね!' />
        </Box>
        <Box borderRight={ 'normal' } padding={ 1 }>
          <Icon
            d='fal users'
            fontColor={ 'posi' }
            fontSize={ 6 }
          />
          <Box
            fontSize={ 5 }
            children={ TotalRegisters | 0 }
          />
          <Box fontSize={ 1 } children='累計参加者数' />
        </Box>
        <Box padding={ 1 }>
          <Icon
            d='fal calendar-star'
            fontColor={ 'warn' }
            fontSize={ 6 }
          />
          <Box fontSize={ 5 } children={ eventCount | 0 } />
          <Box fontSize={ 1 } children='イベント' />
        </Box>
      </Flex>
      <Box textAligin="right">
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

      <Grid
        cols={ 3 }
        gap={ 1 }
        phoneStyles={ {
          gridCols: 2
        } }
      >
        { Events }
      </Grid>
    </Flex>
  );
}
const MemberTab: FNC<{}> = () => {
  let Data = AMOT.inmemory[ 'objPage' ];
  let {
    Editable,
    obj
  } = Data;
  let {
    id: objId
  } = obj[ 0 ];

  let [ val_members,set_members ] = useState( [] );

  useEffect( () => {
    useStore( {
      insertId: ObjTab + '-members',
      data: {
        refresh: () => {
          $.fetch( {
            method: 'post',
            url: 'org/listMember',
            body: {
              orgId: objId
            },
            trafficControl: 300,
          },
            ( result ) => {
              if ( result.ok ) {
                let { members } = result.body;
                set_members( members );
              }
            }
          );
        }
      }
    } );
  },[] );

  let UserList: Orgs.Tables.Data.RowProps[] = [];
  let UserLevels: any = global.appEnv.orgUserLevelArray;
  val_members.forEach( ( member: any,index: number ) => {
    let {
      userId,
      userName,
      userKana,
      userUuid,
      userLevel,
      history,
      iconImage
    } = member;

    let History = JSON.parse( history ) || [];
    let UserLevelLabel = UserLevels[ userLevel as any ];

    let Histories = History.map( ( history: any ) => {
      let [ month,name ] = history;

      return (
        <Box
          textAligin='left'
        >
          <Icon d='stop' />
          { String( month ).toDateJP() } { name }
        </Box>
      )
    } );

    let Row: Orgs.Tables.Data.RowProps = {
      columns: [
        {
          label: <Anchor.Plain
            href={ '/user/obj?id=' + userUuid }
          >
            <Flex
              gap={ -1 }
              flexCenter={ true }
            >
              <Img
                width={ 2 }
                height={ 2 }
                borderRadius={ 'sphere' }
                src={ $.userIconImage( iconImage,'S' ) }
              />
              { userName }
            </Flex>
          </Anchor.Plain>,
          data: userName
        },
        {
          label: UserLevelLabel,
          data: UserLevelLabel,
          orderIndex: userLevel
        },{
          label: Histories,
          data: '',
          style: {
            maxWidth: 24,
            phoneStyles: {
              display: 'none'
            }
          }
        },
        ...Editable ? [
          {
            label: <>
              <Button.Clear
                children={ <Icon d='pen' /> }
                padding={ 0 }
                width={ 3 }
                height={ 3 }
                borderRadius={ 'sphere' }
                onClick={ () => {
                  Modal.add( {
                    modalId: 'editMemberInfo',
                    type: 'center',
                    header: <Flex
                      padding={ [ 1,2 ] }
                      justify='between'
                      align='center'
                    >
                      メンバー情報の編集
                      <Button.Sub
                        color="nega"
                        padding={ [ -2,1 ] }
                        children={ '退会' }
                        onClick={ () => {
                          Modal.add( {
                            modalId: 'removeMember',
                            size: 'S',
                            type: 'center',
                            header: <Flex
                              padding={ [ 1,2 ] }
                              justify='between'
                              align='center'
                            >
                              メンバーの退会
                              <Button.Border
                                children={ 'キャンセル' }
                                onClick={ () => {
                                  Modal.remove( 'removeMember' );
                                } }
                              />
                            </Flex>,
                            body: () => {
                              let [ val_disabled,set_disabled ] = useState( true );
                              return (
                                <Box
                                  key={ userId }
                                  padding={ 2 }
                                  textAligin='center'
                                >
                                  <Box>
                                    <Icon
                                      fontColor={ 'warn' }
                                      d='exclamation-triangle'
                                    /> この操作は取り消せません
                                  </Box>
                                  <Flex
                                    gap={ 1 }
                                    align='center'
                                    justify='center'
                                    flex='auto'
                                    padding={ 1 }
                                  >
                                    <Img
                                      width={ 4 }
                                      height={ 4 }
                                      borderRadius={ 'sphere' }
                                      src={ $.userIconImage( iconImage ) }
                                    />
                                    <Box textAligin="left">
                                      <Box
                                        fontSize={ 4 }
                                        children={ userName + ' - ' + UserLevelLabel }
                                      />
                                      <Box fontSize={ 2 } fontColor={ 4 } children={ userKana } />
                                    </Box>
                                  </Flex>
                                  <Paragraph
                                    fontSize={ 1 }
                                    fontColor={ 4 }
                                    padding={ 1 }
                                  >
                                    メンバーを退会させます
                                    <br />
                                    よろしければ、以下に「退会」と入力してください。
                                  </Paragraph>
                                  <Flex
                                    gap={ 1 }
                                    wrap={ false }
                                    marginTop={ 1 }
                                  >
                                    <Input.Text
                                      required={ true }
                                      placeholder='「退会」と入力'
                                      name='confirm'
                                      form='removeMemberForm'
                                      delegationFormSubmit={ true }
                                      appearance={ {
                                        box: {
                                          style: {
                                            flex: 'auto'
                                          }
                                        }
                                      } }
                                      onChangeCallBack={ ( { value } ) => {
                                        set_disabled( !Boolean( value === '退会' ) );
                                      } }
                                    />
                                    <Button.Prime
                                      color='nega'
                                      children={ '退会させる' }
                                      disabled={ val_disabled }
                                      formButton={ 'removeMemberForm' }
                                      submitDelegationFormInputKeydownEvents={ [ 'auxEnter' ] }
                                      onClick={ async () => {
                                        let form = await $.formCollect( 'removeMemberForm' );
                                        if ( !form.valid ) return;
                                        if ( form.data.confirm !== '退会' ) return;

                                        $.fetch( {
                                          name: 'removeOrgUser',
                                          method: 'post',
                                          url: 'removeOrgUser',
                                          body: {
                                            orgId: objId,
                                            userId: userId
                                          }
                                        },( result ) => {
                                          if ( result.ok ) {
                                            Modal.remove( 'editMemberInfo' );
                                            Modal.remove( 'removeMember' );
                                            let component = AMOT.inmemory[ ObjTab + '-members' ];
                                            if ( component && component.refresh ) component.refresh();
                                          }
                                        } );
                                      } }
                                    />
                                  </Flex>
                                </Box>
                              );
                            },
                            footer: false,
                          } );
                        } }
                      />
                    </Flex>,
                    body: () => {
                      let [ val_addOpen,set_addOpen ] = useState( false );
                      let [ val_history,set_history ] = useState( ( History ) as [ string,string ][] );

                      val_history = val_history.order( {
                        direction: 'DESC',
                        keys: [ '0' ]
                      } );
                      let Data: string[][] = [];

                      let Histories = val_history.map( ( history,index ) => {
                        let [ year,name ] = history;
                        Data.push( [ year,name ] );

                        return {
                          title: year.toDateJP(),
                          content:
                            <Flex
                              justify='between'
                              align='center'
                              wrap={ false }
                              gap={ 1 }
                            >
                              { name }
                              <Button.Sub
                                size="S"
                                color="nega"
                                flex={ 'none' }
                                onClick={ () => {
                                  let newList = [ ...val_history ];
                                  newList.splice( index,1 );
                                  set_history( newList );
                                } }
                              >
                                <Icon d='trash-alt' /> 削除
                              </Button.Sub>
                            </Flex>
                        }
                      } );

                      return (
                        <Box
                          key={ userId }
                          padding={ 2 }
                        >
                          <Flex gap={ 1 } align='center'>
                            <Flex
                              gap={ 1 }
                              align='center'
                              flex='auto'
                            >
                              <Img
                                width={ 6 }
                                height={ 6 }
                                borderRadius={ 'sphere' }
                                src={ $.userIconImage( iconImage,'S' ) }
                              />
                              <Box>
                                <Box fontSize={ 4 } children={ userName } />
                                <Box fontSize={ 2 } fontColor={ 4 } children={ userKana } />
                              </Box>
                            </Flex>
                            <Input.Select
                              required={ true }
                              hideRequiredSign={ true }
                              name='userLevel'
                              form='memberEditForm'
                              value={ userLevel }
                              list={ [
                                { value: 16,label: 'ビジター' },
                                { value: 32,label: '友好メンバー' },
                                { value: 64,label: '一般' },
                                { value: 128,label: '幹部' },
                                { value: 256,label: '管理者' },
                                { value: 1,label: 'その他' },
                              ] }
                            />
                          </Flex>
                          <Box>
                            <Flex
                              align='center'
                              justify='between'
                              wrap={ false }
                              paddingTop={ 2 }
                              paddingBottom={ 1 }
                            >
                              <Box>
                                <Icon d='stop' />
                                来歴
                              </Box>
                              <Button.Clear
                                padding={ -1 }
                                onClick={ () => {
                                  set_addOpen( !val_addOpen );
                                } }
                              >
                                <Icon d='plus' /> 経歴を追加
                              </Button.Clear>
                            </Flex>
                            { !val_addOpen ? null :
                              <Flex
                                gap={ 1 }
                                padding={ 1 }
                                border={ 'normal' }
                                borderRadius={ 2 }
                                marginBottom={ 1 }
                              >
                                <Input.Time.Year
                                  name='year'
                                  form='addHistoryAddForm'
                                  required={ true }
                                  delegationFormSubmit={ true }
                                  hideRequiredSign={ true }
                                />
                                <Input.Text
                                  placeholder='来歴名'
                                  required={ true }
                                  name='name'
                                  form='addHistoryAddForm'
                                  delegationFormSubmit={ true }
                                  hideRequiredSign={ true }
                                  appearance={ {
                                    box: {
                                      style: {
                                        flex: 'auto'
                                      }
                                    }
                                  } }
                                />
                                <Button.Prime
                                  size="S"
                                  formButton='addHistoryAddForm'
                                  submitDelegationFormInputKeydownEvents={ [ 'auxEnter' ] }
                                  onClick={ async () => {
                                    let form = await $.formCollect( 'addHistoryAddForm' );
                                    if ( !form.valid ) return;
                                    let {
                                      year,
                                      name
                                    } = form.data;

                                    set_history( [
                                      ...val_history,
                                      [ year,name ]
                                    ] );
                                    set_addOpen( false );
                                  } }
                                  children={ '追加' }
                                />
                              </Flex>
                            }
                            { !Histories.length ? null : <List
                              border={ 'normal' }
                              borderRadius={ 2 }
                              appearance='border'
                              gridsRate={ [ 2,10 ] }
                              rowStyle={ {
                                padding: 1,
                                gap: 1,
                                flexWrap: false
                              } }
                              list={ Histories }
                            /> }
                          </Box>
                          <Input.Hidden
                            name='histories'
                            form='memberEditForm'
                            value={ Data }
                          />
                        </Box>
                      );
                    },
                    footer: ( { modalClose } ) => (
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
                          submitDelegationFormInputKeydownEvents={ [ 'auxEnter' ] }
                          children={ '更新' }
                          id='addMemberButton'
                          onClick={ async () => {
                            let form = await $.formCollect( 'memberEditForm' );
                            if ( !form.valid ) return;

                            $.fetch(
                              {
                                name: 'editOrgUser',
                                method: 'post',
                                url: 'editOrgUser',
                                body: {
                                  ...form.data,
                                  userId: userId,
                                  orgId: objId
                                },
                                trafficControl: 300
                              },
                              ( result ) => {
                                if ( result.ok ) {
                                  Modal.hide( 'editMemberInfo' );
                                  let component = AMOT.inmemory[ ObjTab + '-members' ];
                                  if ( component && component.refresh ) component.refresh();
                                }
                              }
                            );
                          } }
                        />
                      </Flex>
                    )
                  } );
                } }
              />
            </>,
            data: '',
            style: {
              phoneStyles: {
                display: 'none'
              }
            }
          }
        ] as any : []
      ]
    }
    UserList.push( Row );
  } );

  let AddButton = !Editable ? null : <Button.Prime
    padding={ [ 1,2 ] }
    onClick={ () => {
      Modal.toggle( {
        modalId: 'addMember',
        type: 'center',
        header:
          <Box
            padding={ [ 1,2 ] }
            children={ 'メンバーの追加' }
          />,
        body: <AddMemberModal />,
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
                submitDelegationFormInputKeydownEvents={ [ 'auxEnter' ] }
                children={ '送信' }
                id='addMemberButton'
                onClick={ async () => {
                  let form = await $.formCollect( 'addMemberForm' );
                  if ( !form.valid ) return;

                  $.fetch(
                    {
                      name: 'addOrgUser',
                      method: 'post',
                      url: 'addOrgUser',
                      body: form.data
                    },
                    ( result ) => {
                      if ( result.ok ) {
                        Modal.remove( 'addMember' );
                        let component = AMOT.inmemory[ ObjTab + '-members' ];
                        if ( component && component.refresh ) component.refresh();
                      }
                    }
                  );
                } }
              />
            </Flex>
          );
        }
      } );
    } }
  >
    <Icon d='plus' /> メンバーを追加する
  </Button.Prime>

  return (
    <Flex
      type='col'
      gap={ 2 }
    >
      <Flex
        justify='right'
        paddingRight={ 2 }
        children={ AddButton }
      />
      <Box ssCardBox={ true }>
        <Table.Plain
          colLength={ Editable ? 4 : 3 }
          appearance={ {
            format: 'rowBorder'
          } }
          head={ [
            { label: '名前' },
            { label: '権限' },
            {
              label: '来歴',
              style: {
                phoneStyles: {
                  display: 'none'
                }
              }
            },
            {
              label: '',
              style: {
                phoneStyles: {
                  display: 'none'
                }
              }
            },
          ] }
          rows={ UserList }
        />
      </Box>
    </Flex>
  );
}


const ObjPage: FNC<{}> = () => {
  let {
    Editable,
    obj
  } = AMOT.inmemory[ 'objPage' ]
  let {
    id: objId,
    uuid: objUuid,
    name: objName,
    sdate,
    description,
    iconImage,
    headerImage,
    eventCount,
    repCount
  } = obj[ 0 ];

  let [ val_objName,set_objName ] = useState( objName );
  objUuid = objUuid.replace( /-/ig,'' ).toUpper();

  let [ val_iconImage,set_iconImage ] = useState( iconImage );
  val_iconImage = appEnv.orgIconImage( val_iconImage );

  let [ val_headerImage,set_headerImage ] = useState( headerImage );
  val_headerImage = appEnv.orgHeaderImage( val_headerImage );

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
        <IconRegion
          Editable={ Editable }
          val_iconImage={ val_iconImage }
          set_iconImage={ set_iconImage }
          val_objName={ val_objName }
          set_objName={ set_objName }
          objId={ objId }
          objUuid={ objUuid }
          objName={ objName }
        />
        <Flex
          type='col'
          gap={ 2 }
          flex={ 0 }
        >
          <Box position='relative'>
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
                          key: 'org/header/' + ImageId + '/' + size + '.jpeg',
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
                      name: 'updateObjIconImage',
                      method: 'post',
                      url: 'updateAColumn',
                      trafficControl: 0,
                      body: {
                        objType: 'org',
                        id: objId,
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
          <Box
            display={ 'none' }
            padding={ [ 0,1 ] }
            phoneStyles={ {
              display: 'block'
            } }
          >
            <Flex
              wrap={ false }
              align='center'
              gap={ 1 }
            >
              <Img
                src={ val_iconImage }
                width={ 6 }
                height={ 6 }
                borderRadius={ 'sphere' }
                showExpand={ val_iconImage.replace( /\/R\./,'/L.' ) }
              />
              <Box>
                <Box
                  fontSize={ 6 }
                  fontWeight={ 'bold' }
                  children={ val_objName }
                />
                { Editable ?
                  <Button.Clear
                    onClick={ () => {
                      updateNameModal( {
                        val_objName,
                        set_objName,
                        objId
                      } );
                    } }
                  >
                    名前を変更する <Icon d='fal pen' />
                  </Button.Clear> : null
                }
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
            onTabChange={ ( index ) => {
              let name = [ 'home','members' ][ index ];
              let component = AMOT.inmemory[ ObjTab + '-' + name ];
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
                tab: 'ホーム',
                body: <HomeTab />
              },{
                tab: 'メンバー',
                body: <MemberTab />
              }
            ] }
          />
        </Flex>
      </Flex>
    </LayoutContent>
  );
}

export const OrgPage: FNC<{}> = () => {
  let [ val_def,set_def ] = useState( null as any );

  useEffect( () => {
    let {
      id
    } = $.getQueryParams();

    $.fetch(
      {
        method: 'post',
        url: 'org/obj',
        body: {
          id
        },
        trafficControl: 800
      },
      ( result ) => {
        if ( result.ok && result.body.obj.length === 1 ) {
          let Editable = Boolean( result.body.editable.length ) ||
            result.body.obj[ 0 ].ownerId === Env.Session.userId ||
            Env.Session.userLevel >= 3281;

          AMOT.inmemory[ 'objPage' ] = {
            ...result.body,
            Editable
          };
          set_def( true );
        }
      }
    )
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