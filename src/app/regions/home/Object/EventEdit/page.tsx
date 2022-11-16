const {
  glob: {
    React,
    useEffect,
    useState
  },
  atoms: {
    Box,
    Flex,
    FlexBr,
    Input,
    Buttons: {
      Button,
      Label,
      Anchor
    },
    Icon,
    Img,
    Paragraph,
    Switchs,
    Loading
  },
  mols: {
    Accordion,
    List,
    LinkifyText
  },
  orgs: {
    LayoutContent,
    Cropper,
    TabContent,
    Table
  }
} = AMOT;

type Val_titles = {
  title: string
  subTitle: string
}


let Anonymity: any = appEnv.eventAnonymity;
let Purpose: any = appEnv.eventPurpose;
let Way: any = appEnv.eventWay;

const BasicRegion: FNC<{}> = () => {
  let {
    obj
  } = Temps[ 'editPage' ];
  let {
    eventId,

    orgType,
    orgId,
    orgName,
    orgUuid,
    orgIcon,

    purpose,
    anonymity,
    capacity
  } = obj[ 0 ];

  let [ val_edit,set_edit ] = useState( false );

  let [ val_orgType,set_orgType ] = useState( orgType );
  let [ val_anonymity,set_anonymity ] = useState( anonymity );

  let OrgIcon = appEnv.orgIconImage( orgIcon );

  let [ val_defaultOrg,set_defaultOrg ] = useState( {
    icon: <Img
      src={ OrgIcon }
      width={ 3 }
      height={ 3 }
      borderRadius={ 'sphere' }
    />,
    value: orgId,
    label: orgName
  } );

  return (
    <Box ssCardBox={ true }>
      <Flex
        ssCardBoxHeader={ true }
        justify='between'
        align='center'
        gap={ 1 }
      >
        基本情報
        <Button.Border
          size='S'
          fontSize={ 2 }
          onClick={ () => {
            set_edit( true );
          } }
        >
          編集 <Icon d='fal pen' />
        </Button.Border>
      </Flex>
      <Box
        ssCardBoxBody={ true }
        paddingRight={ 0 }
      >
        { !val_edit ? <>
          <List
            fontSize={ 3 }
            type='sides'
            appearance='border'
            rowStyle={ {
              padding: [ -1,0 ],
              paddingRight: 2
            } }
            list={ [
              {
                title: '主催',
                content: <Anchor.Link
                  /** 要確認 */
                  href={ '/org/obj?id=' + orgUuid }
                  children={ orgName }
                />
              },{
                title: '公開範囲',
                content: Anonymity[ anonymity ]
              },{
                title: '公開の目的',
                content: Purpose[ purpose ]
              },{
                title: '定員',
                content: capacity ? capacity + '人' : '未設定'
              },
            ] }
          />
        </> : <>
          <Flex
            type='col'
            paddingRight={ 2 }
            gap={ 2 }
          >
            <Flex
              wrap={ false }
              gap={ 1 }
              flexChilds={ 'even' }
            >
              <Input.Select
                required={ true }
                label={ '主催' }
                name='orgType'
                form={ 'updateBasicForm' }
                value={ val_orgType }
                list={ [
                  { value: 1,label: '地区' },
                  { value: 2,label: 'クラブ' },
                ] }
                onChangeCallBack={ ( { value } ) => {
                  set_orgType( Number( value ) );
                  set_defaultOrg( null as any );
                } }
              />
              <Input.Select
                name='anonymity'
                form={ 'updateBasicForm' }
                label={ '公開範囲' }
                required={ true }
                value={ val_anonymity }
                list={ [
                  { value: 1,label: '誰でも参加可' },
                  { value: 2,label: '同地区会員' },
                  { value: 3,label: '同クラブ会員' }
                ] }
                onChangeCallBack={ ( { value } ) => {
                  set_anonymity( value );
                } }
              />
            </Flex>
            <Input.Search
              key={ val_orgType }
              required={ true }
              name='orgId'
              form={ 'updateBasicForm' }
              placeholder={ 'choose ...' }
              value={ val_defaultOrg }
              list={ [] }
              onDynamicSearchCallBack={ async ( keyword ) => {
                let result = await $.fetch( {
                  method: 'post',
                  url: 'event/searchOrgOnCreateEvent',
                  body: {
                    orgType: val_orgType,
                    keyword
                  },
                  trafficControl: 0
                } );
                let OrgList: Input.Search.OptionProps[] = [];
                if ( result.ok ) {
                  let {
                    orgs
                  } = result.body;

                  for ( let org of orgs ) {
                    let {
                      id,name,iconImage
                    } = org;

                    let OrgIcon = appEnv.orgIconImage( iconImage,'R' );
                    OrgList.push( {
                      icon:
                        <Img
                          src={ OrgIcon }
                          width={ 3 }
                          height={ 3 }
                          borderRadius={ 'sphere' }
                        />,
                      label: name,
                      keyword: name,
                      value: id
                    } );
                  }
                }

                return OrgList;
              } }
              appearance={ {
                box: {
                  style: {
                    flex: 0
                  }
                }
              } }
              limit={ 1 }
            />
            <Flex
              wrap={ false }
              gap={ 1 }
              flexChilds={ 'even' }
            >
              <Input.Select
                name='purpose'
                form={ 'updateBasicForm' }
                label={ '公開の目的' }
                required={ true }
                value={ 1 }
                list={ [
                  { value: 1,label: '参加登録用' },
                  { value: 2,label: '告知用' }
                ] }
              />
              <Input.Text
                restrict='number'
                name='capacity'
                value={ capacity }
                form={ 'updateBasicForm' }
                label={ '定員' }
                placeholder='定員'
                indicator={ '人' }
              />
            </Flex>
          </Flex>
        </>
        }
      </Box>
      { val_edit ? <Flex
        gap={ 1 }
        justify='right'
        wrap={ false }
        ssCardBoxFooter={ true }
      >
        <Button.Border
          size='S'
          children={ '取り消し' }
          onClick={ () => {
            set_edit( false );
          } }
        />
        <Button.Prime
          size='S'
          formButton='updateBasicForm'
          submitDelegationFormInputKeydownEvents={ [ 'auxEnter' ] }
          children={ '変更' }
          onClick={ async () => {
            let form = await $.FormCollect( 'updateBasicForm' );
            if ( !form.valid ) return;

            $.fetch(
              {
                name: 'updateEventTimes',
                method: 'post',
                url: 'event/updateEventBasic',
                trafficControl: 0,
                body: {
                  ...form.data,
                  eventId
                }
              },
              ( result ) => {
                if ( result.ok ) window.location.reload();
              }
            )
          } }
        />
      </Flex> : null }
    </Box>
  );
}
const TimesRegion: FNC<{}> = () => {
  let {
    obj
  } = Temps[ 'editPage' ];
  let {
    eventId,

    dateFrom = '',
    dateTo = '',
    timeFrom = '',
    timeTo = '',
    registerExpireDate = '',
  } = obj[ 0 ];

  let [ val_times,set_times ] = useState( {
    dateFrom,
    dateTo: dateTo || dateFrom,
    timeFrom,
    timeTo,
    registerExpireDate
  } );

  let [ val_edit,set_edit ] = useState( false );

  return (
    <Box
      ssCardBox={ true }
    // minWidth={ '50%' }
    >
      <Flex
        ssCardBoxHeader={ true }
        justify='between'
        align='center'
        gap={ 1 }
      >
        日時
        <Button.Border
          size='S'
          fontSize={ 2 }
          onClick={ () => {
            set_edit( true );
          } }
        >
          編集 <Icon d='fal pen' />
        </Button.Border>
      </Flex>
      <Box ssCardBoxBody={ true }>
        { !val_edit ? <>
          <List
            fontSize={ 3 }
            type='sides'
            appearance='border'
            rowStyle={ {
              padding: [ -1,0 ],
              paddingRight: 1
            } }
            list={ [
              {
                title: '開催日',
                content: String( val_times.dateFrom ).toDateJP()
              },
              {
                title: '開始時刻',
                content: String( val_times.timeFrom ).toTimeJP()
              },
              {
                title: '終了日',
                content: String( val_times.dateTo ).toDateJP()
              },
              {
                title: '終了予定時刻',
                content: String( val_times.timeTo ).toTimeJP() || '未設定'
              },
              {
                title: '登録期限',
                content: String( val_times.registerExpireDate ).toDateJP() || '未設定'
              },
            ] }
          />
        </> : <>
          <Flex
            gap={ 1 }
            phoneStyles={ {
              flexDirection: 'col'
            } }
          >
            <Input.Time.Date
              name='dateFrom'
              required={ true }
              form='updateTimes'
              label='開催日'
              value={ val_times.dateFrom }
            />
            <Input.Time.Clock
              name='timeFrom'
              label='開始時刻'
              required={ true }
              form='updateTimes'
              value={ val_times.timeFrom }
            />
            <FlexBr />
            <Input.Time.Date
              name='dateTo'
              label='終了日'
              required={ true }
              form='updateTimes'
              value={ val_times.dateTo }
            />
            <Input.Time.Clock
              name='timeTo'
              label='終了予定時刻'
              required={ true }
              form='updateTimes'
              value={ val_times.timeTo }
            />
            <FlexBr />
            <Input.Time.Date
              name='registerExpireDate'
              label='登録期限日'
              required={ true }
              form='updateTimes'
              value={ val_times.registerExpireDate }
            />
          </Flex>
        </>
        }
      </Box>
      { val_edit ? <Flex
        gap={ 1 }
        justify='right'
        wrap={ false }
        ssCardBoxFooter={ true }
      >
        <Button.Border
          size='S'
          children={ '取り消し' }
          onClick={ () => {
            set_edit( false );
          } }
        />
        <Button.Prime
          size='S'
          formButton='updateTimes'
          submitDelegationFormInputKeydownEvents={ [ 'auxEnter' ] }
          children={ '変更' }
          onClick={ async () => {
            let form = await $.FormCollect( 'updateTimes' );
            if ( !form.valid ) return;

            $.fetch( {
              name: 'updateEventTimes',
              method: 'post',
              url: 'event/updateEventTimes',
              trafficControl: 0,
              body: {
                ...form.data,
                eventId
              }
            },( result ) => {
              if ( result.ok ) {
                set_times( form.data as any );
                set_edit( false );
              }
            } )
          } }
        />
      </Flex> : null
      }
    </Box>
  );
}
const LocationRegion: FNC<{}> = () => {
  let {
    obj
  } = Temps[ 'editPage' ];
  let {
    eventId,

    way,
    postal,
    addr1,
    addr2,
    lat,
    lng,
  } = obj[ 0 ];

  let [ val_data,set_data ] = useState( {
    way,
    postal,
    addr1,
    addr2,
    lat,
    lng,
  } );

  let [ val_edit,set_edit ] = useState( false );

  return (
    <Box
      ssCardBox={ true }
    // minWidth={ '50%' }
    >
      <Flex
        ssCardBoxHeader={ true }
        justify='between'
        align='center'
        gap={ 1 }
      >
        場所
        <Button.Border
          size='S'
          fontSize={ 2 }
          onClick={ () => {
            set_edit( true );
          } }
        >
          編集 <Icon d='fal pen' />
        </Button.Border>
      </Flex>
      <Box
        ssCardBoxBody={ true }
        paddingRight={ 0 }
      >
        { !val_edit ? <>
          <List
            fontSize={ 3 }
            type='sides'
            appearance='border'
            rowStyle={ {
              padding: [ -1,0 ],
              paddingRight: 1
            } }
            list={ [
              {
                title: '参加形式',
                content: Way[ val_data.way ]
              },
              ...val_data.way != 2 ? [
                {
                  title: '住所',
                  content: <Box textAligin='right'>
                    { val_data.postal }
                    <br />
                    { val_data.addr1 }
                    <br />
                    { val_data.addr2 }
                  </Box>
                },{
                  title: '緯度経度',
                  content: <Box textAligin='right'>
                    { val_data.lat }
                    <br />
                    { val_data.lng }
                  </Box>
                },
              ] as any : []
            ] }
          />
        </> : <>
          <Flex
            type='col'
            paddingRight={ 2 }
            gap={ 2 }
          >
            <Input.Radio
              required={ true }
              name='way'
              form={ 'updateEventLocation' }
              align='row'
              value={ [ val_data.way ] }
              list={ [
                { value: 1,label: '対面' },
                { value: 2,label: 'オンライン' },
                { value: 3,label: '対面 + オンライン' }
              ] }
              onChangeCallBack={ ( { value } ) => {
                set_data( {
                  ...val_data,
                  way: value
                } )
              } }
            />
            { val_data.way == 2 ? null : <>
              <Flex
                type='col'
                gap={ 1 }
                children={
                  <>
                    <Flex
                      gap={ 2 }
                      flexChilds='auto'
                    >
                      <Input.Text
                        restrict='postal'
                        name='postal'
                        form={ 'updateEventLocation' }
                        label='郵便番号'
                        value={ val_data.postal }
                        forceOverRide={ true }
                        required={ true }
                        placeholder='郵便番号'
                        appearance={ {
                          box: {
                            style: {
                              minWidth: 12
                            }
                          }
                        } }
                        onGeoCodingCallBack={ ( data ) => {
                          let {
                            location,
                            addr,
                            postal
                          } = data;

                          set_data( {
                            ...val_data,
                            postal,
                            addr1: addr,
                            lat: location.lat,
                            lng: location.lng
                          } );
                        } }
                        onGetCurrentLocationCallBack={ ( data ) => {
                          let {
                            postal,
                            addr,
                            location
                          } = data;

                          set_data( {
                            ...val_data,
                            postal,
                            addr1: addr,
                            lat: location.lat,
                            lng: location.lng,
                          } )
                        } }
                      />
                      <Input.Text
                        label='住所'
                        name='addr1'
                        form={ 'updateEventLocation' }
                        value={ val_data.addr1 }
                        forceOverRide={ true }
                        required={ true }
                        placeholder='住所'
                      />
                    </Flex>
                    <Input.Text
                      label='建物名等'
                      name='addr2'
                      value={ val_data.addr2 }
                      form={ 'updateEventLocation' }
                      placeholder='建物名等'
                    />
                    <Input.Hidden
                      name='lat'
                      form={ 'updateEventLocation' }
                      value={ val_data.lat }
                    />
                    <Input.Hidden
                      name='lng'
                      form={ 'updateEventLocation' }
                      value={ val_data.lng }
                    />
                  </>
                }
              />
            </>
            }
          </Flex>
        </>
        }
      </Box>
      { val_edit ? <Flex
        gap={ 1 }
        justify='right'
        wrap={ false }
        ssCardBoxFooter={ true }
      >
        <Button.Border
          size='S'
          children={ '取り消し' }
          onClick={ () => {
            set_edit( false );
          } }
        />
        <Button.Prime
          size='S'
          formButton='updateEventLocation'
          submitDelegationFormInputKeydownEvents={ [ 'auxEnter' ] }
          children={ '変更' }
          onClick={ async () => {
            let form = await $.FormCollect( 'updateEventLocation' );
            if ( !form.valid ) return;

            let Params = form.data;
            Params.eventId = eventId;
            await ( async () => {
              if ( !form.data.addr1 ) return;
              let result = await $.getGeocode( {
                type: 'address',
                params: form.data.addr1
              } );
              if ( !result.ok ) return;
              let { lat,lng } = result.body.location;

              Params.lat = lat;
              Params.lng = lng;
            } )();

            $.fetch(
              {
                name: 'updateEventLocation',
                method: 'post',
                url: 'event/updateEventLocation',
                trafficControl: 0,
                body: Params
              },
              ( result ) => {
                if ( result.ok ) {
                  set_data( form.data as any );
                  set_edit( false );
                }
              }
            )
          } }
        />
      </Flex> : null
      }
    </Box>
  );
}
const DescriptionRegion: FNC<{}> = () => {
  let {
    obj
  } = Temps[ 'editPage' ];
  let {
    eventId,
    description
  } = obj[ 0 ];

  let [ val_description,set_description ] = useState( description );

  let [ val_edit,set_edit ] = useState( false );

  return (
    <>
      <Box ssCardBox={ true }>
        <Flex
          ssCardBoxHeader={ true }
          justify='between'
          align='center'
          gap={ 1 }
        >
          説明文
          <Button.Border
            size='S'
            fontSize={ 2 }
            onClick={ () => {
              set_edit( true );
            } }
          >
            編集 <Icon d='fal pen' />
          </Button.Border>
        </Flex>
        <Box
          ssCardBoxBody={ true }
        >
          { !val_edit ? <>
            <Box whiteSpace='preWrap'>
              <LinkifyText
                text={ val_description }
                placeholder={ '説明文はありません' }
              />
            </Box>
          </> : <>
            <Input.TextArea
              placeholder='説明文を入力'
              value={ val_description }
              delegationFormSubmit={ true }
              form='updateDescription'
              id='updateDescriptionInput'
              name='description'
              rows={ 8 }
            />
          </>
          }
        </Box>
        { val_edit ? <Flex
          gap={ 1 }
          justify='right'
          wrap={ false }
          ssCardBoxFooter={ true }
        >
          <Button.Border
            size='S'
            children={ '取り消し' }
            onClick={ () => {
              set_edit( false );
            } }
          />
          <Button.Prime
            size='S'
            submitDelegationFormInputKeydownEvents={ [ 'auxEnter' ] }
            formButton='updateDescription'
            children={ '変更' }
            onClick={ async () => {
              let form = await $.FormCollect( 'updateDescription' );
              if ( !form.valid ) return;

              let { description } = form.data;

              $.fetch(
                {
                  name: 'updateObjName',
                  method: 'post',
                  url: 'updateAColumn',
                  trafficControl: 0,
                  body: {
                    objType: 'event',
                    id: eventId,
                    column: 'description',
                    value: description
                  }
                },
                ( result ) => {
                  if ( result.ok ) {
                    set_edit( false );
                    set_description( description );
                  }
                }
              )
            } }
          />
        </Flex> : null
        }
      </Box>
    </>
  );
}
const AttachmentRegion: FNC<{}> = () => {
  let {
    obj
  } = Temps[ 'editPage' ];
  let {
    eventId,
    eventUuid
  } = obj[ 0 ];

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
    let Files = val_files.map( ( key: string,index: number ) => {
      let fileSplit = key.split( '/' );
      let fileName = fileSplit[ fileSplit.length - 1 ];

      fileSplit.splice( 0,3 );
      let Key = fileSplit.join( '/' );

      return (
        <Button.Clear
          border={ 'normal' }
          padding={ 1 }
          onClick={ () => {
            $.fetch( {
              method: 'post',
              url: 'mod/auth/s3/getPresignedUrl',
              body: {
                type: 'app',
                keys: [ {
                  bucket: 'private',
                  key: Key,
                  method: 'get'
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
            align='center'
            textAligin='left'
          >
            <Box flex={ 'auto' }>
              <Icon d='fal file' /> { fileName }
            </Box>
            <Button.Border
              padding={ [ -1,1 ] }
              onClick={ ( event ) => {
                event.stopPropagation();
                $.fetch(
                  {
                    method: 'post',
                    url: 'mod/auth/s3/deleteFiles',
                    body: {
                      type: 'app',
                      bucket: 'private',
                      keys: [ Key ]
                    },
                    trafficControl: 0
                  },
                  ( result ) => {
                    if ( result.ok ) {
                      let newFiles = [ ...val_files ];
                      newFiles.splice( index,1 );
                      set_files( newFiles );
                    }
                  }
                )

              } }
            >
              削除 <Icon d='times' />
            </Button.Border>
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
    <>
      <Box ssCardBox={ true }>
        <Flex
          ssCardBoxHeader={ true }
          justify='between'
          align='center'
          gap={ 1 }
        >
          添付ファイル
          <Button.Border
            size='S'
            fontSize={ 2 }
            onClick={ () => {
              Modal.add( {
                modalId: 'addAttachment',
                type: 'center',
                header: <Box
                  padding={ [ 1,2 ] }
                  children={ 'ファイルを追加' }
                />,
                body: <Box padding={ 2 }>
                  <Input.File
                    required={ true }
                    name='attachments'
                    form={ 'addFiles' }
                    limit={ 3 }
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
                        size='S'
                        onClick={ modalClose }
                        children={ '閉じる' }
                      />
                      <Button.Prime
                        size='S'
                        formButton='addFiles'
                        submitDelegationFormInputKeydownEvents={ [ 'auxEnter' ] }
                        children={ 'アップロード' }
                        onClick={ async () => {
                          let form = await $.FormCollect( 'addFiles' );
                          if ( !form.valid ) return;
                          let { attachments } = form.data;

                          for ( let file of attachments ) {
                            let fileName = file.name;
                            let Key = 'event/attachments/' + eventUuid + '/' + fileName;
                            let getUrl = await $.fetch( {
                              method: 'post',
                              url: 'mod/auth/s3/getPresignedUrl',
                              body: {
                                type: 'app',
                                keys: [ {
                                  bucket: 'private',
                                  key: Key,
                                  method: 'put'
                                } ]
                              },
                              trafficControl: 0
                            } )
                            if ( !getUrl.ok ) return;
                            let Url = getUrl.body[ 0 ];
                            if ( !Url.ok ) return;
                            let result = await $.fetch( {
                              url: Url.body,
                              method: 'put',
                              mode: 'cors',
                              header: {
                                'Content-Type': file.type
                              },
                              body: file,
                              bodyStringify: false,
                              trafficControl: 0
                            } );
                            console.log( result );
                            if ( !result.ok ) return;
                          }

                          window.location.reload();
                        } }
                      />
                    </Flex>
                  );
                },
              } );
            } }
          >
            追加 <Icon d='fal plus' />
          </Button.Border>
        </Flex>
        <Box
          ssCardBoxBody={ true }
          padding={ 2 }
        >
          { Attachments }
        </Box>
      </Box>
    </>
  );
}

const DashBoardRegion: FNC<{}> = () => {
  let {
    obj
  } = Temps[ 'editPage' ];
  let {
    eventId,
    eventUuid
  } = obj[ 0 ];

  return (
    <Flex
      gap={ 2 }
      flexChilds='auto'
      children={
        <>

          <Flex
            justify='right'
            flex={ 'none' }
            width='100%'
          >
            <Anchor.Prime
              href={ '/event/obj?id=' + eventUuid }
              newTab={ true }
            >
              プレビュー <Icon d='arrow-right' />
            </Anchor.Prime>
          </Flex>
          <BasicRegion />
          <TimesRegion />
          <LocationRegion />
          <DescriptionRegion />
          <AttachmentRegion />
        </>
      }
    />
  );
}


const HeaderRegion: FNC<{}> = () => {
  let {
    obj
  } = Temps[ 'editPage' ];
  let {
    eventId,
    headerImage
  } = obj[ 0 ];

  let [ val_headerImage,set_headerImage ] = useState( headerImage );
  val_headerImage = appEnv.eventHeaderImage( val_headerImage );

  return (
    <Box
      position='relative'
      maxHeight={ 18 }
    >
      <Img
        src={ val_headerImage }
        borderRadius={ 'LBMain' }
        showExpand={ val_headerImage.replace( /\/R\./,'/L.' ) }
      />
      <Label.Prime
        size="S"
        backgroundColor={ 'lcOpMiddle' }
        htmlFor='changeHeaderImage'
        position='absolute'
        bottom={ 1 }
        right={ 1 }
        fontSize={ 0 }
      >
        <Icon d='far camera' />
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
                  key: 'event/header/' + ImageId + '/' + size + '.jpeg',
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
                objType: 'event',
                id: eventId,
                column: 'headerImage',
                value: ImageId
              }
            } )
            if ( !result.ok ) return;
            isFinished = true;
          } )();

          if ( isFinished ) {
            set_headerImage( ImageId );
          }
        } }
      />
    </Box>
  )
}

const TitlesRegion: FNC<{
}> = ( props ) => {
  let {
  } = props;
  let {
    obj
  } = Temps[ 'editPage' ];
  let {
    eventId,
    title,
    subTitle
  } = obj[ 0 ];

  let [ val_edit,set_edit ] = useState( false );

  let [ val_titles,set_titles ] = useState( {
    title: title,
    subTitle: subTitle
  } as Val_titles );

  return (
    <Box ssCardBox={ true } padding={ 1 }>
      { !val_edit ? <>
        <Box
          flex={ 'auto' }
          marginBottom={ 1 }
        >
          <Box ssSubTitle={ true }>
            { val_titles.title }
          </Box>
          <Box fontColor={ 4 }>
            { val_titles.subTitle }
          </Box>
        </Box>
        <Button.Sub
          size='S'
          onClick={ () => {
            set_edit( true );
          } }
        >
          タイトルを変更 <Icon d='fal pen' />
        </Button.Sub>
      </> : <>
        <Flex
          type='col'
          gap={ 1 }
          flex={ 'auto' }
          padding={ [ 0,1 ] }
        >
          <Input.Text
            label='タイトル'
            name='title'
            required={ true }
            placeholder='タイトルを入力'
            form='updateTitles'
            hideRequiredSign={ true }
            value={ val_titles.title }
          />
          <Input.Text
            label='サブタイトル'
            name='subTitle'
            required={ true }
            placeholder='サブタイトルを入力'
            form='updateTitles'
            hideRequiredSign={ true }
            value={ val_titles.subTitle }
          />
          <Flex
            gap={ 1 }
            justify='right'
            wrap={ false }
          >
            <Button.Border
              size='S'
              children={ '取り消し' }
              onClick={ () => {
                set_edit( false );
              } }
            />
            <Button.Prime
              size='S'
              formButton='updateTitles'
              submitDelegationFormInputKeydownEvents={ [ 'auxEnter' ] }
              children={ '変更' }
              onClick={ async () => {
                let form = await $.FormCollect( 'updateTitles' );
                if ( !form.valid ) return;

                $.fetch(
                  {
                    name: 'updateEventTitle',
                    method: 'post',
                    url: 'event/updateTitles',
                    trafficControl: 0,
                    body: {
                      eventId,
                      ...form.data
                    }
                  },
                  ( result ) => {
                    if ( result.ok ) {
                      set_edit( false );
                      set_titles( form.data as any );
                    }
                  }
                )
              } }
            />
          </Flex>
        </Flex>
      </>
      }
    </Box>
  );
}



const UserList: FNC<{}> = () => {
  let {
    users,
    obj = []
  } = Temps[ 'editPage' ] || {};
  let {
    eventId,
    way
  } = obj[ 0 ] || {};
  let [ val_refresh,set_refresh ] = useState( $.uuidGen( 16 ) );

  let ListData: Orgs.Tables.Plain.RowProps[] = [];
  users.forEach( ( user: any,index: number ) => {
    let {
      userId,
      userName,
      userKana,
      userIcon,
      way
    } = user;

    let Row: Orgs.Tables.Plain.RowProps = {
      columns: [
        {
          label: <>
            <Flex
              gap={ 1 }
              align='center'
              justify="center"
            >
              <Img
                src={ $.userIconImage( userIcon ) }
                width={ 3 }
                height={ 3 }
                borderRadius={ 'sphere' }
              />
              { userName }
            </Flex>
          </>
        },{
          type: 'td',
          label: ( appEnv.eventWay as any )[ way ]
        },{
          type: 'td',
          label: <Flex justify="right">
            <Button.Sub
              size="S"
              color="nega"
              fontSize={ 1 }
              onClick={ () => {
                Modal.add( {
                  modalId: 'adminLiftRegister',
                  type: 'center',
                  size: 'S',
                  header: ( { modalClose } ) => (
                    <Flex
                      justify='between'
                      align='center'
                      gap={ 1 }
                      padding={ [ 1,2 ] }
                    >
                      参加者の削除
                      <Button.Border
                        size="S"
                        onClick={ modalClose }
                      >
                        閉じる
                      </Button.Border>
                    </Flex>
                  ),
                  body: <Box padding={ 2 } textAligin='center'>
                    <Box>
                      参加を取り消します
                      <br />
                      よろしいですか？
                    </Box>
                    <Flex
                      gap={ 1 }
                      align='center'
                      justify="center"
                      padding={ 1 }
                    >
                      <Img
                        src={ $.userIconImage( userIcon ) }
                        width={ 4 }
                        height={ 4 }
                        borderRadius={ 'sphere' }
                      />
                      <Box textAligin="left">
                        { userName }
                        <br />
                        { userKana }
                      </Box>
                    </Flex>
                    <Button.Prime
                      color="nega"
                      onClick={ () => {
                        $.fetch( {
                          method: 'post',
                          url: 'event/liftRegister',
                          body: {
                            userId,
                            eventId
                          }
                        },( result ) => {
                          if ( result.ok ) {
                            let newUsers = [ ...users ];
                            newUsers.splice( index,1 );
                            Temps[ 'editPage' ].users = newUsers;
                            set_refresh( $.uuidGen() )
                            Modal.remove( 'adminLiftRegister' );
                          }
                        } )
                      } }
                    >
                      取り消し
                    </Button.Prime>
                  </Box>,
                  footer: false
                } );
              } }
            >
              参加取消
            </Button.Sub>
          </Flex>
        }
      ]
    }
    ListData.push( Row );
  } );

  return (
    <>
      <Box padding={ [ 0,-1 ] }>
        <Button.Prime
          size='S'
          onClick={ () => {
            Modal.add( {
              modalId: 'adminAddRegister',
              type: 'center',
              size: 'S',
              header: ( { modalClose } ) => {
                return (
                  <Flex
                    padding={ [ 1,2 ] }
                    gap={ 1 }
                    justify='between'
                    align='center'
                  >
                    参加者の追加
                    <Button.Border
                      size='S'
                      onClick={ modalClose }
                    >
                      閉じる
                    </Button.Border>
                  </Flex>
                );
              },
              body: <Flex
                type='col'
                gap={ 1 }
                padding={ 2 }
              >
                <Input.Search
                  label='ユーザー'
                  required={ true }
                  name='user'
                  form='adminRegisterForm'
                  limit={ 1 }
                  list={ [] }
                  onDynamicSearchCallBack={ async ( keyword ) => {
                    let Users: Input.Search.OptionCellProps[] = [];
                    let result = await $.fetch( {
                      method: 'post',
                      url: 'org/searchUserOnAdminRegister',
                      body: {
                        eventId,
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
                <Input.Radio
                  name='way'
                  form='adminRegisterForm'
                  required={ true }
                  appearance={ {
                    cell: {
                      style: {
                        flex: 'auto'
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
                { [
                  '',
                  <Box
                    fontColor={ 'nega' }
                    textAligin='center'
                    fontSize={ 1 }
                    children={ '※ このイベントは現地参加でのみ登録可能です' }
                  />,
                  <Box
                    fontColor={ 'nega' }
                    textAligin='center'
                    fontSize={ 1 }
                    children={ '※ このイベントはオンライン参加でのみ登録可能です' }
                  />,
                  ''
                ][ way ] }
                <Button.Prime
                  onClick={ async () => {
                    let form = await $.FormCollect( 'adminRegisterForm' );
                    if ( !form.valid ) return;

                    let {
                      way,
                      user
                    } = form.data;
                    $.fetch( {
                      method: 'post',
                      url: 'event/adminRegister',
                      body: {
                        eventId,
                        ...form.data
                      }
                    },( result ) => {
                      if ( result.ok ) {
                        let User = {
                          userId: user.id,
                          userName: user.name,
                          userKana: user.kana,
                          userIcon: user.iconImage,
                          way
                        }
                        Temps[ 'editPage' ].users = [ ...users,User ];
                        set_refresh( $.uuidGen() )
                        Modal.hide( 'adminAddRegister' );
                      }
                    } )
                  } }
                >
                  登録
                </Button.Prime>
              </Flex>,
              footer: false
            } )
          } }
        >
          参加者を追加
        </Button.Prime>
      </Box>

      参加登録者 : { users.length }人

      <Table.Plain
        colLength={ 3 }
        appearance={ {
          format: 'rowBorder',
          base: {
            style: {
              ssCardBox: true
            }
          }
        } }
        head={ [
          { label: 'ユーザー' },
          { label: '参加方法' },
          { label: '' }
        ] }
        rows={ ListData }
      />
    </>
  );
}
const UserRegistration: FNC<{}> = () => {
  return (
    <>
    </>
  );
}
const UserExport: FNC<{}> = () => {
  let { obj = [] } = Temps[ 'editPage' ] || {};
  let { eventId,title } = obj[ 0 ] || {};

  let [ val_users,set_users ] = useState( [] );

  useEffect( () => {
    $.fetch( {
      method: 'post',
      url: 'event/userListOnExport',
      body: {
        eventId
      }
    },( result ) => {
      if ( result.ok ) set_users( result.body.users );
    } );
  },[] );

  let UserData: Orgs.Tables.Drag.RowProps[] = [];
  for ( let user of val_users ) {
    let {
      id,
      name,
      kana,
      orgNames = '',
      history = ''
    } = user;

    let Orgs = orgNames.split( '[$_s]' );
    let OrgValue = '';
    let OrgSelect: any[] = Orgs.map( ( org,index ) => {
      if ( index == 0 ) OrgValue = org;
      return {
        value: org,
        label: org
      }
    } );

    let History = history ? history.split( '[$_s]' ) : [];
    let HistoryLabel: any = [];
    let HistorySelectValue: any = [];
    let HisValue = '';
    History.forEach( ( h ) => {
      if ( !h ) return;
      let arr = []
      arr = JSON.parse( h );
      arr.forEach( ( ar: any ) => {
        HistoryLabel.push( ar.join( '年 ' ) )
        HistorySelectValue.push( ar[ 1 ] );
      } )
    } );

    let HistorySelect = HistoryLabel.map( ( label: any,index: number ) => {
      let value = HistorySelectValue[ index ]
      if ( index == 0 ) HisValue = value;
      return {
        value: value,
        label: label,
        displayLabel: value
      } as Input.Select.OptionProps
    } );

    let orderId = String( id );
    let Row: Orgs.Tables.Drag.RowProps = {
      rowId: orderId,
      columns: [
        {
          label: name
        },{
          type: 'td',
          label: <>
            <Input.Select
              placeholder='なし'
              id={ 'ExportUser-Org-' + id }
              value={ OrgValue }
              list={ OrgSelect }
            />
          </>
        },{
          type: 'td',
          label: <>
            <Input.Select
              placeholder='なし'
              id={ 'ExportUser-Position-' + id }
              value={ HisValue }
              list={ HistorySelect }
            />
          </>
        }
      ]
    }
    UserData.push( Row );
  }

  let [ val_order,set_order ] = useState( [] as string[] );

  return (
    <>
      <Flex
        justify='between'
        align='bottom'
        gap={ 1 }
        padding={ [ 0,-1 ] }
      >
        <Box
          fontColor={ 4 }
          fontSize={ 1 }
        >
          参加者をエクスポートできます。
          <br />
          また、役職名や表示順序を変更することもできます。
          <br />
          現在Excelエクスポートのみサポートされています。
        </Box>
        <Button.Prime
          onClick={ () => {
            if ( !val_users.length ) {
              Toast.add( {
                toastId: 'noUsers',
                type: 'plain',
                message: '対象者がいないためエクスポートは中断されました'
              } );
              return;
            }

            let Users: any[] = val_users;
            if ( val_order.length ) Users = val_order.map( ( id ) => val_users.filter( ( u: any ) => u.id == id )[ 0 ] );

            let Headers: JsminExtension.ExportToSpreadSheet.HeadProps[] = [
              {
                key: '1',
                value: 'なまえ'
              },{
                key: '2',
                value: 'かな'
              },{
                key: '3',
                value: '所属'
              },{
                key: '4',
                value: '役職'
              }
            ];
            let Rows = Users.map( ( row ) => {
              let {
                id,
                name,
                kana
              } = row;
              let orgName = $( '#ExportUser-Org-' + id ).val();
              let positionName = $( '#ExportUser-Position-' + id ).val();

              orgName = JSON.parse( orgName );
              positionName = JSON.parse( positionName );

              return {
                '1': name,
                '2': kana || '',
                '3': orgName || 'なし',
                '4': positionName || 'なし'
              }
            } );

            $.exportToSpreadSheet( {
              type: 'xlsx',
              fileName: title + '参加者一覧',
              sheets: [
                {
                  sheetName: 'シート1',
                  headers: Headers,
                  rows: Rows
                }
              ]
            } );
          } }
        >
          ダウンロード
        </Button.Prime>
      </Flex>
      <Table.Drag
        key={ JSON.stringify( val_users ) }
        appearance={ {
          format: 'rowBorder',
          base: {
            style: {
              ssCardBox: true
            }
          }
        } }
        colLength={ 3 }
        head={ [
          { label: '名前' },
          { label: '所属' },
          { label: '役職' }
        ] }
        rows={ UserData }
        onDragCallBack={ ( args ) => {
          set_order( args );
        } }
      />
    </>
  );
}

const UsersRegion: FNC<{}> = () => {
  let [ val_editType,set_editType ] = useState( 1 );

  return (
    <>
      <Flex
        type="col"
        gap={ 2 }
      >
        <Flex padding={ [ 0,-1 ] }>
          <Switchs
            value={ val_editType }
            appearance='cloud'
            onChangeEvent={ ( { value } ) => {
              set_editType( value | 0 );
            } }
            list={ [
              {
                value: 1,
                label: '一覧'
              },{
                value: 2,
                label: 'エクスポート'
              }
            ] }
          />
        </Flex>
        {
          val_editType == 1 ? <UserList /> :
            val_editType == 100 ? <UserRegistration /> :
              val_editType == 2 ? <UserExport /> : null
        }
      </Flex>
    </>
  );
}

export const ObjPage: FNC<{}> = () => {
  let {
    obj = []
  } = Temps[ 'editPage' ] || {};
  let {
    eventId,
    status,
    title
  } = obj[ 0 ] || {};

  let [ val_status,set_status ] = useState( status );

  return (
    <LayoutContent
      size='XL'
      styles={ {
        padding: 4,
        phoneStyles: {
          padding: 1
        }
      } }
    >
      <Flex
        type='col'
        gap={ 1 }
      >
        <Box ssSubTitle={ true }>
          <Icon
            fontSize={ 7 }
            d='fal gear'
          /> イベントの管理
        </Box>
        <Flex
          justify='right'
          gap={ 1 }
        >
          { val_status == 200 ?
            <Button.Sub
              color='nega'
              fontSize={ 2 }
              onClick={ () => {
                let Status = 400;
                $.fetch(
                  {
                    name: 'updateStatus',
                    method: 'post',
                    url: 'updateAColumn',
                    trafficControl: 0,
                    body: {
                      objType: 'event',
                      id: eventId,
                      column: 'status',
                      value: Status
                    }
                  },
                  ( result ) => {
                    if ( result.ok ) set_status( Status );
                  }
                )
              } }
            >
              掲載を停止する
            </Button.Sub> : val_status == 400 ? <Box
              border={ 'normal' }
              borderColor={ 'warn' }
              borderRadius={ 2 }
              padding={ 1 }
              width='100%'
              flex={ 'none' }
            >
              <Box fontColor={ 'warn' }>
                <Icon d='exclamation-triangle' /> 現在、掲載が一時停止されています
              </Box>
              <Flex justify='right' gap={ 1 }>
                <Button.Prime
                  size='S'
                  fontSize={ 2 }
                  onClick={ () => {
                    let Status = 200;
                    $.fetch(
                      {
                        name: 'updateStatus',
                        method: 'post',
                        url: 'updateAColumn',
                        trafficControl: 0,
                        body: {
                          objType: 'event',
                          id: eventId,
                          column: 'status',
                          value: Status
                        }
                      },
                      ( result ) => {
                        if ( result.ok ) set_status( Status );
                      }
                    )
                  } }
                >
                  掲載を再開する
                </Button.Prime>
                <Button.Prime
                  size='S'
                  color='nega'
                  fontSize={ 2 }
                  onClick={ () => {
                    Modal.add( {
                      modalId: 'removeMember',
                      size: 'S',
                      type: 'center',
                      header:
                        <Flex
                          padding={ [ 1,2 ] }
                          justify='between'
                          align='center'
                        >
                          イベントの削除
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
                            key={ eventId }
                            padding={ 2 }
                            textAligin='center'
                          >
                            <Box>
                              <Icon
                                fontColor={ 'warn' }
                                d='exclamation-triangle'
                              /> この操作は取り消せません
                            </Box>
                            <Box
                              padding={ 1 }
                              fontSize={ 4 }
                              children={ title }
                            />
                            <Paragraph>
                              イベントを削除します
                              <br />
                              よろしければ、以下に「完全に削除」と入力してください。
                            </Paragraph>
                            <Flex
                              gap={ 1 }
                              wrap={ false }
                              marginTop={ 1 }
                            >
                              <Input.Text
                                required={ true }
                                placeholder='「完全に削除」と入力'
                                name='confirm'
                                form='deleteComplete'
                                appearance={ {
                                  box: {
                                    style: {
                                      flex: 'auto'
                                    }
                                  }
                                } }
                                onChangeCallBack={ ( { value } ) => {
                                  set_disabled( !Boolean( value === '完全に削除' ) );
                                } }
                              />
                              <Button.Prime
                                size='S'
                                color='nega'
                                children={ '削除' }
                                padding={ [ 1,2 ] }
                                disabled={ val_disabled }
                                formButton={ 'deleteComplete' }
                                submitDelegationFormInputKeydownEvents={ [ 'auxEnter' ] }
                                onClick={ async () => {
                                  let form = await $.FormCollect( 'deleteComplete' );
                                  if ( !form.valid ) return;
                                  if ( form.data.confirm !== '完全に削除' ) return;

                                  $.fetch(
                                    {
                                      name: 'deleteEvent',
                                      method: 'post',
                                      url: 'event/delete',
                                      body: { eventId }
                                    },
                                    ( result ) => {
                                      if ( result.ok ) {
                                        window.location.href = '/manages'
                                      }
                                    }
                                  );
                                } }
                              />
                            </Flex>
                          </Box>
                        );
                      },
                      footer: false,
                    } );
                  } }
                >
                  <Icon d='trash-alt' /> 削除
                </Button.Prime>
              </Flex>
            </Box>
              : null
          }
        </Flex>
        <Flex
          flexChilds='even'
          gap={ 1 }
          phoneStyles={ {
            flexDirection: 'col',
            flexChilds: 'auto'
          } }
        >
          <HeaderRegion />
          <TitlesRegion />
        </Flex>
        <TabContent
          Swipeable={ true }
          defaultTabIndex={ Number( localStorage.getItem( 'manageEventEditTab' ) ) | 0 }
          onTabChange={ ( index ) => {
            localStorage.setItem( 'manageEventEditTab',String( index ) );
          } }
          tabBar={ {
            sticky: [
              '#TopHeader'
            ]
          } }
          bodyTemplate={ ( children ) => {
            return (
              <Box
                paddingTop={ 2 }
                phoneStyles={ {
                  padding: 1.5
                } }
                children={ children }
              />
            );
          } }
          contents={ [
            {
              tab: 'イベント情報',
              body: <DashBoardRegion />
            },{
              tab: '参加者管理',
              body: <UsersRegion />
            }
          ] }
        />
      </Flex>
    </LayoutContent>
  );
}



export const EventEditPage: FNC<{}> = () => {
  let [ val_def,set_def ] = useState( 0 );

  useEffect( () => {
    let {
      id
    } = $.getQueryParams();

    $.fetch(
      {
        method: 'post',
        url: 'event/obj',
        body: { id },
        trafficControl: 800
      },
      ( result ) => {
        if ( result.ok && result.body.obj.length === 1 ) {
          let Editable = Boolean( result.body.editable.length ) ||
            result.body.obj[ 0 ].ownerId === Env.Session.userId ||
            Env.Session.userLevel >= 3281;
          if ( Editable ) {
            Temps[ 'editPage' ] = {
              ...result.body,
              Editable
            };
            set_def( 200 );
          } else {
            set_def( 400 );
          }
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
    )
  }
  else if ( val_def == 400 ) {
    return (
      <Flex
        padding={ 4 }
        flexCenter={ true }
      >
        <Box textAligin='center'>
          <Box padding={ 1 }>
            このイベントを管理する権限がありません
          </Box>
          <Button.Prime
            onClick={ () => {
              global.Temps[ 'history' ].goBack();
            } }
            children={ '戻る' }
          />
        </Box>
      </Flex>
    );
  }

  return ( <ObjPage /> );
}