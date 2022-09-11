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
    Button,
    Label,
    Icon,
    Img
  },
  mols: {
    CardBox,
    Accordion
  },
  orgs: {
    LayoutContent,
    Cropper
  }
} = AMOT;

import style from './style.module.scss';

const Title: FNC<{ children: ReactElement }> = ( props ) => {
  return (
    <Box
      fontSize={ 4 }
      fontWeight={ 3 }
      children={ props.children }
    />
  );
}

const BasicInfoRegion: FNC<{}> = () => {
  let [ val_orgType,set_orgType ] = useState( 1 );
  let [ val_anonymity,set_anonymity ] = useState( 1 );
  return (
    <CardBox
      header={
        <Box
          padding={ [ 1,2 ] }
          children={ <Title children={ '基本情報' } /> }
        />
      }
      body={
        <Flex
          type='col'
          gap={ 2 }
          children={
            <>
              <Flex
                type='row'
                auto={ true }
                wrap={ false }
                borderRadius={ 2 }
                children={
                  <>
                    <Flex
                      type='col'
                      gap={ 2 }
                      padding={ 2 }
                      children={
                        <>
                          <Input.Select
                            required={ true }
                            label={ '主催' }
                            name='orgType'
                            form={ 'eventCreate' }
                            value={ val_orgType }
                            list={ [
                              { value: 1,label: '地区' },
                              { value: 2,label: 'クラブ' },
                              { value: 3,label: 'あなた' }
                            ] }
                            onChangeCallBack={ ( { value } ) => {
                              set_orgType( Number( value ) );
                            } }
                          />
                          {
                            val_orgType != 3 ?
                              <Input.Search
                                required={ true }
                                name='orgId'
                                form={ 'eventCreate' }
                                placeholder={ 'choose ...' }
                                list={ [
                                  { value: 1,keyword: 'clubA',label: 'clubA' },
                                  { value: 2,keyword: 'clubB',label: 'clubB' },
                                  { value: 3,keyword: 'clubC',label: 'clubC' },
                                  { value: 4,keyword: 'clubD',label: 'clubD' }
                                ] }
                                appearance={ {
                                  box: {
                                    style: {
                                      flexColSize: 'auto',
                                    }
                                  },
                                  cell: {
                                    style: {
                                      padding: -2,
                                    }
                                  }
                                } }
                                limit={ 1 }
                              /> : null
                          }
                        </>
                      }
                    />
                    <Flex
                      type='col'
                      gap={ 1 }
                      backgroundColor={ 2 }
                      borderRadius='inherit'
                      padding={ 2 }
                      children={
                        <>
                          <Input.Radio
                            required={ true }
                            name='purpose'
                            form={ 'eventCreate' }
                            label={ '公開の目的' }
                            align='row'
                            value={ [ 1 ] }
                            list={ [
                              { value: 1,label: '参加登録用' },
                              { value: 2,label: '告知用' }
                            ] }
                          />
                          <Input.Select
                            required={ true }
                            name='anonymity'
                            form={ 'eventCreate' }
                            label={ '公開範囲' }
                            value={ val_anonymity }
                            list={ [
                              { value: 1,label: '誰でも' },
                              { value: 2,label: '同地区内' },
                              { value: 3,label: '同クラブ内' },
                              { value: 4,label: '招待ユーザーのみ' }
                            ] }
                            onChangeCallBack={ ( { value } ) => {
                              set_anonymity( value );
                            } }
                          />
                          {
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
                          }
                        </>
                      }
                    />
                  </>
                }
              />
            </>
          }
        />
      }
    />
  );
}
const HeaderImageRegion: FNC<{}> = () => {
  let [ val_imageData,set_imageData ] = useState( '' );
  let [ val_defaultType,set_defaultType ] = useState( 1 );

  let defaultUrl = Cdn.proEnv + `app/racco/event/defaultHeader${ val_defaultType }.jpeg`;

  return (
    <Flex
      type='col'
      gap={ 1 }
      width={ '100%' }
      children={
        <>
          <Title children={ 'ヘッダー画像' } />

          <Input.Hidden
            name='headerImageData'
            form={ 'eventCreate' }
            value={ val_imageData }
          />
          <Input.Hidden
            name='headerDefaultImageId'
            form={ 'eventCreate' }
            value={ val_defaultType }
          />
          <Box
            position='relative'
            children={
              <>
                <Img
                  borderRadius={ 2 }
                  showExpand={ true }
                  src={ val_imageData || defaultUrl }
                />

                {
                  val_imageData ?
                    <Button
                      type='clear'
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
                        set_imageData( '' );
                      } }
                    /> : null
                }
                <Flex
                  type='row'
                  justify='right'
                  marginTop={ 1 }
                  wrap={ false }
                  gap={ -1 }
                  children={
                    <>
                      <Button
                        type='sub'
                        children={ '1' }
                        onClick={ () => {
                          set_defaultType( 1 );
                        } }
                      />
                      <Button
                        type='sub'
                        children={ '2' }
                        onClick={ () => {
                          set_defaultType( 2 );
                        } }
                      />
                      <Button
                        type='sub'
                        children={ '3' }
                        onClick={ () => {
                          set_defaultType( 3 );
                        } }
                      />
                      <Button
                        type='sub'
                        children={ '4' }
                        onClick={ () => {
                          set_defaultType( 4 );
                        } }
                      />
                      <Label
                        type='main'
                        htmlFor='headerImageCropper'
                        children={
                          <>
                            <Icon d='far camera' /> 画像を選択
                          </>
                        }
                      />
                    </>
                  }
                />
              </>
            }
          />
          <Cropper
            use='head'
            triggerId='headerImageCropper'
            maxImageSize={ 150000 }
            onProcessFinished={ async ( args ) => {
              let { dataUrl } = args;

              set_imageData( dataUrl );
            } }
          />
        </>
      }
    />
  );
}
const LocationRegion: FNC<{}> = () => {

  let [ val_positionRequired,set_positionRequired ] = useState( true );

  let [ val_postal,set_postal ] = useState( '' );
  let [ val_addr,set_addr ] = useState( '' );
  let [ val_location,set_location ] = useState( { lat: 0,lng: 0 } as { lat: number,lng: number } );

  return (
    <Accordion
      toggleLabel={
        <Title children={ '開催方法' } />
      }
      children={
        <Flex
          type='col'
          padding={ 2 }
          gap={ 2 }
          width={ '100%' }
          children={
            <>
              <Input.CheckBox
                required={ true }
                name='way'
                form={ 'eventCreate' }
                align='row'
                value={ [ 1 ] }
                list={ [
                  { value: 1,label: '対面' },
                  { value: 2,label: 'オンライン' }
                ] }
                onChangeCallBack={ ( { value } ) => {
                  let bool = value.includes( '1' ) || value.includes( 1 );
                  set_positionRequired( bool );
                } }
              />
              {
                val_positionRequired ?
                  <>
                    <Box children={ '開催場所' } />
                    <Flex
                      type='col'
                      gap={ 1 }
                      children={
                        <>
                          <Flex
                            gap={ 2 }
                            auto={ true }
                            children={
                              <>
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
                                    if ( !val_addr ) set_addr( addr );
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
                                  id='createEventAddr'
                                />
                              </>
                            }
                          />
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
                            id='createEventLat'
                          />
                          <Input.Hidden
                            name='lng'
                            form={ 'eventCreate' }
                            value={ val_location.lng }
                            id='createEventLng'
                          />
                        </>
                      }
                    />
                  </> : null
              }
            </>
          }
        />
      }
    />
  );
}
const TimeRegion: FNC<{}> = () => {
  let [ val_addEndDate,set_addEndDate ] = useState( false );

  return (
    <Accordion
      toggleLabel={ <Title children={ '日時' } /> }
      children={
        <Flex
          type='col'
          gap={ 2 }
          padding={ 2 }
          width={ '100%' }
          children={
            <>
              <Flex
                type='col'
                gap={ 1 }
                children={
                  <>
                    <Flex
                      type='row'
                      even={ true }
                      wrap={ false }
                      align='top'
                      gap={ 2 }
                      children={
                        <>
                          <Flex
                            type='col'
                            gap={ 1 }
                            children={
                              <>
                                <Input.Time
                                  type='date'
                                  name='startDate'
                                  form={ 'eventCreate' }
                                  value={ new Date().ymd( '-' ) || '' }
                                  required={ true }
                                  label={ '開催日' }
                                />
                                {
                                  val_addEndDate ?
                                    <Input.Time
                                      type='date'
                                      name='endDate'
                                      form={ 'eventCreate' }
                                      required={ true }
                                      label={ '終了日' }
                                    /> :
                                    <Input.CheckBox
                                      appearance={ {
                                        format: 'icon'
                                      } }
                                      value={ val_addEndDate ? [ 1 ] : undefined }
                                      list={ [
                                        { value: 1,label: '終了日を追加' }
                                      ] }
                                      onChangeCallBack={ ( { value } ) => {
                                        set_addEndDate( value[ 0 ] == '1' );
                                      } }
                                    />
                                }
                              </>
                            }
                          />
                          <Flex
                            type='col'
                            gap={ 1 }
                            children={
                              <>
                                <Input.Time
                                  required={ true }
                                  name='startTime'
                                  form={ 'eventCreate' }
                                  label='開始時刻'
                                  type='clock'
                                />
                                <Input.Time
                                  required={ true }
                                  name='endTime'
                                  form={ 'eventCreate' }
                                  label='終了時刻'
                                  type='clock'
                                />
                              </>
                            }
                          />
                        </>
                      }
                    />
                  </>
                }
              />
            </>
          }
        />
      }
    />
  );
}

export const CreateEventPage: FNC<{}> = () => {
  return (
    <LayoutContent
      size='R'
      styles={ {
        margin: [ 0,'auto' ],
        padding: [ 4,2 ]
      } }
    >
      <Flex
        type='col'
        gap={ 2 }
        children={
          <>
            <Flex
              type='col'
              gap={ 1 }
              border={ 2 }
              borderRadius={ 2 }
              padding={ 2 }
              children={
                <>
                  <Box
                    fontSize={ 5 }
                    fontWeight={ 3 }
                    children={
                      <>
                        <Icon d='plus-square' fontColor='theme' /> イベントの作成
                      </>
                    }
                  />
                  <Box children={ '定例会のようなフォーマルなイベントから、親しい友人との小さな寄合まで様々なイベントを誰でも作成できます。' } />
                </>
              }
            />

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

            <BasicInfoRegion />
            <TimeRegion />
            <LocationRegion />
            <HeaderImageRegion />

            <Input.Cell
              form={ 'eventCreate' }
              label='タグ'
              name='tag'
              appearance={{
                cell : {
                  flexAuto : true
                }
              }}
              list={[
                { icon : <Icon fontColor={ 'theme' } d='tag' />,value : 1,label : 'お茶',keyword : 'お茶' },
                { icon : <Icon fontColor={ 'theme' } d='tag' />,value : 2,label : '伊藤園',keyword : '伊藤園' },
                { icon : <Icon fontColor={ 'theme' } d='tag' />,value : 3,label : 'おーい',keyword : 'おーい' },
                { icon : <Icon fontColor={ 'theme' } d='tag' />,value : 4,label : '綾鷹',keyword : '綾鷹' },
                { icon : <Icon fontColor={ 'theme' } d='tag' />,value : 5,label : '朝の',keyword : '朝の' },
                { icon : <Icon fontColor={ 'theme' } d='tag' />,value : 6,label : '茶事',keyword : '茶事' },
                { icon : <Icon fontColor={ 'theme' } d='tag' />,value : 7,label : '濃い',keyword : '濃い' },
                { icon : <Icon fontColor={ 'theme' } d='tag' />,value : 8,label : '朝摘み',keyword : '朝摘み' }
              ]}
            />

            <Input.TextArea
              label={ '紹介文' }
              name='description'
              form={ 'eventCreate' }
              placeholder='イベントに関する説明を入力してください。'
              rows={ 7 }
            />

            <Input.File
              label={ '参考資料' }
              name='attachment'
              form={ 'eventCreate' }
              limit={ 5 }
            />

            <Button
              type='main'
              width={ '100%' }
              rippleEffect={ true }
              miniLoader={ true }
              children={ '作成する' }
              fontSize={ 3 }
              submitFormName='eventCreate'
              onClickDelegationKeyboardEvents={ [ 'auxEnter' ] }
              onClick={ async () => {
                let form = await $.FormCollect( 'eventCreate' );
                console.log( form.data );
              } }
            />
          </>
        }
      />
    </LayoutContent>
  );
}