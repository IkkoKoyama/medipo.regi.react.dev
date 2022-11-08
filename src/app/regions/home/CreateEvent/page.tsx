const {
  glob: {
    React,
    useEffect,
    useState
  },
  atoms: {
    Box,
    Flex,
    Input,
    Buttons: {
      Button,
      Label,
    },
    Icon,
    Img
  },
  mols: {
    Accordion,
  },
  orgs: {
    LayoutContent,
    Cropper
  }
} = AMOT;

const BasicInfoRegion: FNC<{}> = () => {
  let [ val_orgType,set_orgType ] = useState( 1 );
  let [ val_anonymity,set_anonymity ] = useState( 1 );

  return (
    <Box ssCardBox={ true }>
      <Box ssCardBoxHeader={ true }>
        基本情報
      </Box>
      <Flex
        ssCardBoxBody={ true }
        padding={ 2 }
        type='col'
        gap={ 2 }
        children={
          <>
            <Flex
              wrap={ false }
              gap={ 1 }
              // flexChilds={ 'even' }
              justify='left'
            >
              <Input.Select
                required={ true }
                label={ '主催' }
                name='orgType'
                form={ 'eventCreate' }
                placeholder=''
                value={ val_orgType }
                list={ [
                  { value: 1,label: '地区' },
                  { value: 2,label: 'クラブ' },
                  // { value: 3,label: 'あなた' }
                ] }
                onChangeCallBack={ ( { value } ) => {
                  set_orgType( Number( value ) );
                } }
              />
            </Flex>
            <Input.Search
              key={ val_orgType }
              required={ true }
              name='orgId'
              form={ 'eventCreate' }
              placeholder={ 'choose ...' }
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
                      icon: <Img
                        src={ OrgIcon }
                        width={ 2 }
                        height={ 2 }
                        borderRadius={ 100 }
                      />,
                      label: <Box
                        fontSize={ 1 }
                        children={ name }
                      />,
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
              {/* <Input.Select
                name='purpose'
                form={ 'eventCreate' }
                label={ '公開の目的' }
                required={ true }
                value={ 1 }
                list={ [
                  { value: 1,label: '参加登録用' },
                  { value: 2,label: '告知用' }
                ] }
              /> */}
              <Input.Hidden
                name='purpose'
                form={ 'eventCreate' }
                value={ 1 }
              />
              <Input.Select
                name='anonymity'
                form={ 'eventCreate' }
                label={ '公開範囲' }
                required={ true }
                value={ val_anonymity }
                list={ [
                  { value: 1,label: '誰でも参加可' },
                  { value: 2,label: '同地区会員' },
                  { value: 3,label: '同クラブ会員' },
                  // { value: 4,label: '招待ユーザーのみ' }
                ] }
                onChangeCallBack={ ( { value } ) => {
                  set_anonymity( value );
                } }
              />
              <Input.Text
                restrict='number'
                name='capacity'
                form={ 'eventCreate' }
                label={ '定員' }
                placeholder='定員'
                indicator={ '人' }
              />
            </Flex>
            {/* {
              val_anonymity == 4 ?
                <Input.Cell
                  required={ true }
                  name='inviteUsers'
                  form={ 'eventCreate' }
                  label='招待するユーザー'
                  list={ [] }
                  onDynamicSearchCallBack={ async ( keyword ) => {
                    let Users = await $.fetch( {
                      method: 'post',
                      url: 'event/inviteUserList',
                      body: {
                        keyword
                      }
                    } );
                    console.log( Users );
                    return [

                    ];
                  } }
                />
                : null
            } */}
          </>
        }
      />
    </Box>
  );
}
const TimeRegion: FNC<{}> = () => {
  let [ val_endDateRequired,set_endDateRequired ] = useState( false );

  return (
    <Box ssCardBox={ true }>
      <Box ssCardBoxHeader={ true }>
        日時
      </Box>
      <Box
        ssCardBoxBody={ true }
        padding={ 0 }
        overflow='unset'
      >
        <Flex
          type='col'
          gap={ 2 }
          padding={ 2 }
          width={ '100%' }
          children={
            <Flex
              type='col'
              gap={ 1 }
            >
              <Flex
                type='row'
                flexChilds='even'
                wrap={ false }
                align='top'
                gap={ 2 }
              >
                <Flex type='col' gap={ 1 }>
                  <Input.Time.Date
                    name='startDate'
                    id='startDateInput'
                    form={ 'eventCreate' }
                    // value={ new Date().ymd( '-' ) || '' }
                    required={ true }
                    label={ '開催日' }
                    onValidateCallBack={ async ( props ) => {
                      let {
                        value
                      } = props;
                      let StartDate = value[ 0 ].replace( /\D/ig,'' );
                      let EndDate = $( '#endDateInput' ).val();

                      if ( EndDate && EndDate.length == 10 ) {
                        EndDate = EndDate.replace( /\D/ig,'' );
                        let Boolean = StartDate <= EndDate;

                        if ( !Boolean ) {
                          return {
                            result: false,
                            messages: [
                              {
                                type: 'warn',
                                label: '終了日よりも後の日時が入力されています'
                              }
                            ],
                            safeValue: value
                          }
                        }
                      }
                      return {
                        result: true,
                        safeValue: value
                      }
                    } }
                  />
                  { val_endDateRequired ?
                    <Input.Time.Date
                      name='endDate'
                      id='endDateInput'
                      form={ 'eventCreate' }
                      required={ true }
                      label={ '終了日' }
                      onValidateCallBack={ async ( props ) => {
                        let {
                          value
                        } = props;
                        let EndDate = value[ 0 ].replace( /\D/ig,'' );
                        let StartDate = $( '#startDateInput' ).val();
                        if ( StartDate.length == 10 ) {
                          StartDate = StartDate.replace( /\D/ig,'' );
                          let Boolean = StartDate <= EndDate;

                          if ( !Boolean ) {
                            return {
                              result: false,
                              messages: [
                                {
                                  type: 'warn',
                                  label: '開始日よりも前の日時が入力されています'
                                }
                              ],
                              safeValue: value
                            }
                          }
                        }
                        return {
                          result: true,
                          safeValue: value
                        }
                      } }
                    /> :
                    <Input.CheckBox
                      appearance={ {
                        format: 'icon'
                      } }
                      value={ val_endDateRequired ? [ 1 ] : undefined }
                      list={ [
                        { value: 1,label: '終了日を追加' }
                      ] }
                      onChangeCallBack={ ( { value } ) => {
                        set_endDateRequired( value[ 0 ] == '1' );
                      } }
                    />
                  }
                </Flex>
                <Flex type='col' gap={ 1 }>
                  <Input.Time.Clock
                    required={ true }
                    name='startTime'
                    form={ 'eventCreate' }
                    label='開始時刻'
                  />
                  <Input.Time.Clock
                    required={ val_endDateRequired }
                    name='endTime'
                    form={ 'eventCreate' }
                    label='終了時刻'
                  />
                </Flex>
              </Flex>
              <Box>
                <Input.Time.Date
                  name='registerExpireDate'
                  form={ 'eventCreate' }
                  label={ '登録期限' }
                  onValidateCallBack={ async ( props ) => {
                    let { value } = props;
                    if ( value.length ) {
                      let ExpireDate = value[ 0 ].replace( /\D/ig,'' );
                      let StartDate = $( '#startDateInput' ).val();

                      if ( StartDate && StartDate.length == 10 ) {
                        StartDate = StartDate.replace( /\D/ig,'' );
                        let Boolean = ExpireDate <= StartDate;

                        if ( !Boolean ) {
                          return {
                            result: false,
                            messages: [
                              {
                                type: 'warn',
                                label: '開催日よりも後の日時が入力されています'
                              }
                            ],
                            safeValue: value
                          }
                        }
                      }
                    }
                    return {
                      result: true,
                      safeValue: value
                    }
                  } }
                />
              </Box>
            </Flex>
          }
        />
      </Box>
    </Box>
  );
}
const LocationRegion: FNC<{}> = () => {
  let [ val_required,set_required ] = useState( true );

  let [ val_postal,set_postal ] = useState( '' );
  let [ val_addr,set_addr ] = useState( '' );
  let [ val_location,set_location ] = useState( { lat: 0,lng: 0 } as { lat: number,lng: number } );

  return (
    <Box ssCardBox={ true }>
      <Box ssCardBoxHeader={ true }>
        開催方法
      </Box>
      <Box
        ssCardBoxBody={ true }
        padding={ 0 }
      >
        <Flex
          type='col'
          padding={ 2 }
          gap={ 2 }
          width={ '100%' }
        >
          <Input.Radio
            required={ true }
            name='way'
            form={ 'eventCreate' }
            align='row'
            value={ [ 1 ] }
            list={ [
              { value: 1,label: '対面' },
              { value: 2,label: 'オンライン' },
              { value: 3,label: '対面 + オンライン' }
            ] }
            onChangeCallBack={ ( { value } ) => {
              set_required( Boolean( value != 2 ) );
            } }
          />
          { !val_required ? null : <>
            <Box children={ '開催場所' } />
            <Flex
              type='col'
              gap={ 1 }
            >
              <Flex
                gap={ 2 }
                flexChilds='auto'
              >
                <Input.Text
                  restrict='postal'
                  name='postal'
                  form={ 'eventCreate' }
                  label='郵便番号'
                  value={ val_postal }
                  forceOverRide={ true }
                  required={ true }
                  placeholder='郵便番号'
                  onGeoCodingCallBack={ ( data ) => {
                    let {
                      location,
                      addr,
                      postal
                    } = data;

                    set_postal( postal );
                    set_addr( addr );
                    set_location( location );
                  } }
                  onGetCurrentLocationCallBack={ ( data ) => {
                    let {
                      postal,
                      addr,
                      location
                    } = data;

                    set_postal( postal );
                    set_addr( addr );
                    set_location( location );
                  } }
                />
                <Input.Text
                  label='住所'
                  name='addr1'
                  form={ 'eventCreate' }
                  value={ val_addr }
                  forceOverRide={ true }
                  required={ true }
                  placeholder='住所'
                />
              </Flex>
              <Input.Text
                label='建物名等'
                name='addr2'
                form={ 'eventCreate' }
                placeholder='建物名等'
              />
              <Input.Hidden
                name='lat'
                form={ 'eventCreate' }
                value={ val_location.lat }
              />
              <Input.Hidden
                name='lng'
                form={ 'eventCreate' }
                value={ val_location.lng }
              />
            </Flex>
          </>
          }
        </Flex>
      </Box>
    </Box>
  );
}

const HeaderImageRegion: FNC<{}> = () => {
  let [ val_image,set_image ] = useState( {
    dataUrl: '',
    files: [] as File[]
  } );
  let [ val_defaultType,set_defaultType ] = useState( 1 );

  let defaultUrl = appEnv.eventHeaderImage( String( val_defaultType ) );

  return (
    <Box ssCardBox={ true }>
      <Box ssCardBoxHeader={ true }>
        ヘッダー画像
      </Box>
      <Box
        ssCardBoxBody={ true }
        padding={ 0 }
      >
        <Flex
          type='col'
          gap={ 1 }
          width={ '100%' }
        >
          <Input.File
            name='headerImage'
            forceOverRide={ true }
            limit={ 10 }
            form={ 'eventCreate' }
            value={ val_image.files }
            appearance={ {
              box: {
                style: {
                  display: 'none'
                }
              }
            } }
          />
          <Input.Hidden
            name='headerImageId'
            form={ 'eventCreate' }
            value={ val_defaultType }
          />
          <Box position='relative'>
            <Img
              showExpand={ true }
              src={ val_image.dataUrl ? val_image.dataUrl : defaultUrl }
            />
            { val_image.files.length ? <Button.Clear
              backgroundColor={ -2 }
              width={ 3 }
              height={ 3 }
              top={ 1 }
              right={ 1 }
              padding={ 0 }
              position='absolute'
              fontColor={ 'white' }
              children={ <Icon d='times' /> }
              onClick={ () => {
                set_image( {
                  dataUrl: '',
                  files: []
                } );
              } }
            /> : null }
            <Flex
              type='row'
              justify='right'
              padding={ 1 }
              wrap={ false }
              gap={ -1 }
            >
              <Button.Sub
                size="S"
                activeEffect={ 'ripple.theme' }
                children={ '1' }
                onClick={ () => {
                  set_defaultType( 1 );
                } }
              />
              <Button.Sub
                size="S"
                activeEffect={ 'ripple.theme' }
                children={ '2' }
                onClick={ () => {
                  set_defaultType( 2 );
                } }
              />
              <Button.Sub
                size="S"
                activeEffect={ 'ripple.theme' }
                children={ '3' }
                onClick={ () => {
                  set_defaultType( 3 );
                } }
              />
              <Button.Sub
                size="S"
                activeEffect={ 'ripple.theme' }
                children={ '4' }
                onClick={ () => {
                  set_defaultType( 4 );
                } }
              />
              <Label.Prime
                size="S"
                htmlFor='headerImageCropper'
              >
                <Icon d='far camera' /> 画像を選択
              </Label.Prime>
            </Flex>
            <Cropper
              use='header'
              triggerId='headerImageCropper'
              develops={ [
                { size: 'R' },
                { size: 'L' }
              ] }
              onProcessFinished={ async ( files ) => {
                let dataUrl = await files[ 0 ].toDataUrl();
                set_image( {
                  dataUrl,
                  files
                } );
              } }
            />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
const OthersRegion: FNC<{}> = () => {
  return (
    <>
      {/* <Input.Cell
        form={ 'eventCreate' }
        label='タグ'
        name='tag'
        appearance={ {
          cell: {
            flexChilds: 'auto'
          }
        } }
        list={ [
          { icon: <Icon fontColor={ 'theme' } d='tag' />,value: 1,label: 'お茶',keyword: 'お茶' },
          { icon: <Icon fontColor={ 'theme' } d='tag' />,value: 2,label: '伊藤園',keyword: '伊藤園' },
          { icon: <Icon fontColor={ 'theme' } d='tag' />,value: 3,label: 'おーい',keyword: 'おーい' },
          { icon: <Icon fontColor={ 'theme' } d='tag' />,value: 4,label: '綾鷹',keyword: '綾鷹' },
          { icon: <Icon fontColor={ 'theme' } d='tag' />,value: 5,label: '朝の',keyword: '朝の' },
          { icon: <Icon fontColor={ 'theme' } d='tag' />,value: 6,label: '茶事',keyword: '茶事' },
          { icon: <Icon fontColor={ 'theme' } d='tag' />,value: 7,label: '濃い',keyword: '濃い' },
          { icon: <Icon fontColor={ 'theme' } d='tag' />,value: 8,label: '朝摘み',keyword: '朝摘み' }
        ] }
      /> */}
      <Input.File
        label={ '参考資料' }
        name='attachment'
        form={ 'eventCreate' }
        limit={ 3 }
      />
    </>
  );
}


const SubmitAction = async () => {
  let form = await $.FormCollect( 'eventCreate' );
  if ( !form.valid ) return;
  let eventId = $.uuidGen( 32 );
  let {
    headerImage = [],
    attachment = [],
    ...others
  } = form.data;

  let Params = others;
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
  await ( async () => {
    if ( !headerImage.length ) return;
    let ImageId = $.uuidGen( 32 );
    let files = headerImage;
    for ( let index = 0; index < 2; index++ ) {
      let file = files[ index ];
      let size = [ 'R','L' ][ index ];
      let Key = 'app/racco/event/header/' + ImageId + '/' + size + '.jpeg';

      let getUrl = await $.fetch( {
        method: 'post',
        url: 'cors/idp/s3/getPresignedUrl',
        body: {
          bucket: 'public',
          key: Key,
          method: 'put'
        },
        trafficControl: 0
      } )
      if ( !getUrl.ok ) return;
      let Url = getUrl.body;

      let Upload = await $.fetch( {
        url: Url,
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
    Params.headerImageId = ImageId;
  } )();
  await ( async () => {
    if ( !attachment.length ) return;
    for ( let file of attachment ) {
      let fileName = file.name;
      let Key = 'app/racco/event/attachments/' + eventId + '/' + fileName;
      let getUrl = await $.fetch( {
        method: 'post',
        url: 'cors/idp/s3/getPresignedUrl',
        body: {
          bucket: 'private',
          key: Key,
          method: 'put'
        },
        trafficControl: 0
      } )
      if ( !getUrl.ok ) return;
      let Url = getUrl.body;
      await $.fetch( {
        url: Url,
        method: 'put',
        mode: 'cors',
        header: {
          'Content-Type': file.type
        },
        body: file,
        bodyStringify: false,
        trafficControl: 0
      } );
    }
  } )();

  $.fetch(
    {
      name: 'createEvent',
      method: 'post',
      url: 'event/create',
      body: Params,
      trafficControl: 1500,
      loaderEffect: 'top'
    },
    ( result ) => {
      if ( result.ok ) global.Temps[ 'history' ].push( '/event/edit?id=' + eventId );
    }
  )
}

export const CreateEventPage: FNC<{}> = () => {
  return (
    <LayoutContent
      styles={ {
        margin: [ 0,'auto' ],
        padding: [ 4,2 ]
      } }
    >
      <Flex
        type='col'
        gap={ 1 }
        // border={ 2 }
        // borderRadius={ 2 }
        ssCardBox={ true }
        padding={ 2 }
      >
        <Box
          fontSize={ 5 }
          fontWeight={ 3 }
        >
          <Icon d='plus-square' fontColor='theme' /> イベントの作成
        </Box>
      </Flex>
      <Flex
        type='col'
        marginTop={ 4 }
        gap={ 2 }
      >
        <Flex
          type='col'
          gap={ 2 }
        >
          <Input.Text
            required={ true }
            name='title'
            form={ 'eventCreate' }
            label={ 'タイトル' }
            placeholder='enter Title'
          />
          <Input.Text
            form={ 'eventCreate' }
            name='subTitle'
            label={ 'サブタイトル' }
            placeholder='enter subTitle'
          />
          <Input.TextArea
            label={ '紹介文' }
            name='description'
            form={ 'eventCreate' }
            placeholder='イベントに関する説明を入力してください。'
            rows={ 7 }
          />
        </Flex>

        <BasicInfoRegion />
        <TimeRegion />
        <LocationRegion />
        <HeaderImageRegion />
        <OthersRegion />

        <Button.Prime
          width={ '100%' }
          miniLoader={ true }
          children={ '作成する' }
          padding={ 1.5 }
          borderRadius={ 100 }
          marginTop={ 3 }
          fontSize={ 3 }
          formButton='eventCreate'
          onClick={ SubmitAction }
        />
      </Flex>
    </LayoutContent>
  );
}