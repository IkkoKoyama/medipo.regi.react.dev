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
    Link,
    Icon,
    Img,
    Label,
    Grid,
    Span,
    Paragraph
  },
  mols: {
    CardBox,
    Accordion,
    List,
  },
  orgs: {
    LayoutContent,
    Cropper,
    TabContent,
    Table
  }
} = AMOT;

import style from './style.module.scss';

const RegionObj: FNC<{}> = () => {
  let Data = global.Temps[ 'regionObj' ];
  let {
    id: regionId,
    uuid: regionUuid,
    name: regionName,
    sdate,
    description,
    profileImage,
    headerImage
  } = Data.region[ 0 ];

  let editor = Boolean( Data?.editable?.length );

  let [ val_regionName,set_regionName ] = useState( regionName );

  let [ val_profileImage,set_profileImage ] = useState( profileImage );
  val_profileImage = Cdn.proEnv + 'app/racco/region/img/profile/' + ( val_profileImage ? regionUuid + '/' + val_profileImage : 'default' ) + '.jpeg';

  let [ val_headerImage,set_headerImage ] = useState( headerImage );
  val_headerImage = Cdn.proEnv + 'app/racco/region/img/header/' + ( val_headerImage ? regionUuid + '/' + val_headerImage : 'default' ) + '.jpeg';

  return (
    <LayoutContent
      size='MAX'
      styles={ {
        padding: [ 2,3 ],
        phoneStyles: {
          padding: 0
        }
      } }
      children={
        <Flex
          wrap={ false }
          align='top'
          gap={ 2 }
          phoneStyles={ {
            display: 'block',
          } }
          children={
            <>
              <Flex
                type='col'
                gap={ 1 }
                border={ 2 }
                borderRadius={ 4 }
                padding={ 2 }
                backgroundColor={ 1 }
                boxShadow={ 4 }
                maxWidth={ 24 }
                justify='center'
                align='center'
                textAligin='center'
                phoneStyles={ {
                  display: 'none'
                } }
                children={
                  <>
                    <Box
                      width={ 12 }
                      height={ 12 }
                      position='relative'
                      overflow='hidden'
                      borderRadius={ 100 }
                      children={
                        <>
                          <Img
                            src={ val_profileImage }
                            showExpand={ true }
                          />
                          {
                            editor ?
                              <>
                                <Label
                                  type='clear'
                                  htmlFor='changeProfileImage'
                                  position='absolute'
                                  bottom={ 0 }
                                  left={ 0 }
                                  right={ 0 }
                                  backgroundColor={ -2 }
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
                                  triggerId='changeProfileImage'
                                  develops={[
                                    { size : 'icon' },
                                    { size : 'image' }
                                  ]}
                                  onProcessFinished={ async ( develops ) => {
                                    // develops

                                    // let imageId = $.uuidGen( 32 ).toUpper();
                                    // $.fetch(
                                    //   {
                                    //     method: 'post',
                                    //     url: '/uploadImage',
                                    //     body: {
                                    //       objType: 'region',
                                    //       type: 'profile',
                                    //       objId: regionId,
                                    //       objUuid: regionUuid,
                                    //       data: dataUrl,
                                    //       imageId: imageId
                                    //     }
                                    //   },
                                    //   ( result ) => {
                                    //     if ( result.ok ) set_profileImage( imageId );
                                    //   }
                                    // );
                                  } }
                                />
                              </> : null
                          }
                        </>
                      }
                    />
                    <Box
                      children={
                        <>
                          <Span
                            fontSize={ 6 }
                            fontWeight={ 3 }
                            children={ val_regionName }
                          />
                          {
                            editor ?
                              <Button
                                type='clear'
                                padding={ -1 }
                                marginLeft={ -1 }
                                children={ <Icon d='pen' /> }
                                tipsEffect={ {
                                  content: '名前を変更'
                                } }
                                onClick={ () => {
                                  Modal.toggle( {
                                    modalId: 'updateRegionName',
                                    size: 'S',
                                    type: 'center',
                                    closeDelegationAroundClick: true,
                                    header:
                                      <Box
                                        padding={ [ 1,2 ] }
                                        children={ '名前を変更する' }
                                      />,
                                    body:
                                      <Box
                                        padding={ [ 1,2 ] }
                                        children={
                                          <>
                                            <Input.Text
                                              required={ true }
                                              value={ val_regionName }
                                              form='updateRegionName'
                                              name='name'
                                              id='updateRegionName'
                                            />
                                          </>
                                        }
                                      />,
                                    footer: ( closeCallBack ) => {
                                      return (
                                        <Flex
                                          type='row'
                                          wrap={ false }
                                          gap={ 1 }
                                          padding={ [ 1,2 ] }
                                          justify='between'
                                          children={
                                            <>
                                              <Button
                                                type='border'
                                                onClick={ closeCallBack }
                                                children={ '閉じる' }
                                              />
                                              <Button
                                                type='main'
                                                submitFormName='updateRegionName'
                                                onClickDelegationKeyboardEvents={ [ 'auxEnter' ] }
                                                children={ '変更' }
                                                onClick={ async () => {
                                                  let form = await $.FormCollect( 'updateRegionName' );
                                                  if ( form.valid ) {
                                                    let {
                                                      name
                                                    } = form.data;

                                                    $.fetch(
                                                      {
                                                        name: 'updateRegionName',
                                                        method: 'post',
                                                        url: '/updateAColumn',
                                                        trafficControl : 0,
                                                        loaderEffect : 'corner',
                                                        body: {
                                                          objType: 'region',
                                                          id: regionId,
                                                          column: 'name',
                                                          value: name
                                                        }
                                                      },
                                                      ( result ) => {
                                                        if ( result.ok ) {
                                                          Modal.hide( 'updateRegionName' );
                                                          set_regionName( name );
                                                        }
                                                      }
                                                    )
                                                  }
                                                } }
                                              />
                                            </>
                                          }
                                        />
                                      );
                                    },
                                    openAfter: () => {
                                      $( 'input[id="updateRegionName"]' ).focus();
                                    }
                                  } );
                                } }
                              /> : null
                          }
                        </>
                      }
                    />
                    <Box
                      children={
                        <>
                          <Icon d='stop' /> システム管理者
                          <br />
                          <Icon d='stop' /> ○○○○クラブ会長
                        </>
                      }
                    />
                  </>
                }
              />
              <Flex
                type='col'
                gap={ 2 }
                flexColSize='auto'
                children={
                  <>
                    <Box
                      position='relative'
                      children={
                        <>
                          <Img
                            src={ val_headerImage }
                            borderRadius={ 4 }
                            showExpand={ true }
                            phoneStyles={ {
                              borderRadius: 0
                            } }
                          />
                          {
                            editor ?
                              <>
                                <Label
                                  type='clearVivid'
                                  htmlFor='changeHeaderImage'
                                  position='absolute'
                                  bottom={ 1 }
                                  right={ 1 }
                                  fontColor='white'
                                  backgroundColor={ -1 }
                                  children={
                                    <>
                                      <Icon d='far camera' /> 画像を選択
                                    </>
                                  }
                                />
                                <Cropper
                                  use='header'
                                  triggerId='changeHeaderImage'
                                  develops={[
                                    { size : 'icon' },
                                    { size : 'image' }
                                  ]}
                                  onProcessFinished={ async ( develops ) => {
                                    // let { dataUrl } = args;

                                    // let imageId = $.uuidGen( 32 ).toUpper();

                                    // $.fetch(
                                    //   {
                                    //     method: 'post',
                                    //     url: '/uploadImage',
                                    //     body: {
                                    //       objType: 'region',
                                    //       type: 'header',
                                    //       objId: regionId,
                                    //       objUuid: regionUuid,
                                    //       data: dataUrl,
                                    //       imageId: imageId
                                    //     }
                                    //   },
                                    //   ( result ) => {
                                    //     if ( result.ok ) set_headerImage( imageId );
                                    //   }
                                    // );
                                  } }
                                />
                              </> : null
                          }
                        </>
                      }
                    />
                    <Box
                      display={ 'none' }
                      padding={ [ 0,1 ] }
                      phoneStyles={ {
                        display: 'block'
                      } }
                      children={
                        <Flex
                          wrap={ false }
                          align='center'
                          gap={ 1 }
                          children={
                            <>
                              <Img
                                src={ val_profileImage }
                                width={ 6 }
                                height={ 6 }
                                borderRadius={ 100 }
                                showExpand={ true }
                              />
                              <Box
                                children={
                                  <>
                                    <Box
                                      fontSize={ 6 }
                                      fontWeight={ 3 }
                                      children={ val_regionName }
                                    />
                                  </>
                                }
                              />
                            </>
                          }
                        />
                      }
                    />
                    <TabContent
                      defaultTabIndex={ 1 }
                      tabBar={ {
                        stickyTarget: [
                          '#TopHeader'
                        ]
                      } }
                      AnimateSlide={ true }
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
                          tab: 'ホーム',
                          body: 'HOME'
                        },{
                          tab: 'メンバー',
                          body: 'MEMBER'
                        },{
                          tab: '主催イベント',
                          body: 'EVENTS'
                        }
                      ] }
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

export const RegionObjectPage: FNC<{}> = () => {
  let [ val_def,set_def ] = useState( null as any );

  useEffect( () => {
    let {
      id
    } = $.getUrlSearchParams();

    $.fetch(
      {
        method: 'post',
        url: '/region/obj',
        body: {
          id
        },
        trafficControl: 0,
        loaderEffect: 'corner'
      },
      ( result ) => {
        if ( result.ok && result.body.region.length === 1 ) {
          global.Temps[ 'regionObj' ] = result.body;
          set_def( true );
        }
      }
    )
  },[] );

  if ( !val_def ) return null;
  return ( <RegionObj /> );
}