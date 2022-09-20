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
    TabContent
  }
} = AMOT;

import { InteractButton } from '@appComps/InteractButton/parts';

import style from './style.module.scss';

export const EventPage: FNC<{}> = () => {
  let [ val_test,set_test ] = useState( false );

  useEffect( () => {
    let lat = 35.7086363;
    let lng = 139.6810559;
    if ( val_test && lat && lng ) {
      ( async () => {
        let position = { lat,lng }

        let gmap = await $.MapView( {
          target: $( '#testGMap' )[ 0 ],
          options: {
            center: position,
            zoom: 14,
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
  },[ val_test ] );

  return (
    <LayoutContent
      size='XL'
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
                gap={ 2 }
                flexColSize='auto'
                children={
                  <>
                    <Img
                      src={ Cdn.proEnv + 'app/racco/event/defaultHeader3.jpeg' }
                      borderRadius={ 4 }
                      showExpand={ true }
                      phoneStyles={ {
                        borderRadius: 0
                      } }
                    />
                    <Flex
                      wrap={ false }
                      justify='between'
                      gap={ 1 }
                      phoneStyles={ {
                        padding: [ 0,1 ]
                      } }
                      children={
                        <>
                          <Box
                            children={
                              <>
                                <Box
                                  fontSize={ 6 }
                                  fontWeight={ 3 }
                                  children={ 'Event Title' }
                                />
                                <Box
                                  fontSize={ 3 }
                                  children={ 'Event Sub Title' }
                                />
                              </>
                            }
                          />
                          <InteractButton
                            type='heart'
                            size='L'
                            value={ true }
                            onChangeCallBack={ ( value ) => {
                              console.log( value );
                            } }
                            free={ 120 }
                          />
                        </>
                      }
                    />
                    <TabContent
                      defaultTabIndex={ 0 }
                      tabBar={ {
                        stickyTarget: [
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
                          tab: 'イベント詳細',
                          body:
                            <>
                              <Flex
                                type='col'
                                gap={ 2 }
                                children={
                                  <>
                                    <CardBox
                                      appearance='border'
                                      space={ 1 }
                                      header={ '日程と場所' }
                                      body={
                                        <>
                                          <Box
                                            children={
                                              <>
                                                <Icon d='stop' /> 2022/09/01 15:00 ~ 18:00
                                              </>
                                            }
                                          />
                                          <Box
                                            children={
                                              <>
                                                <Icon d='stop' /> 〒○○○-○○○○ ○○○○○○○○
                                              </>
                                            }
                                          />
                                          <Button
                                            type='sub'
                                            marginTop={ -1 }
                                            children={ 'Googleマップで見る' }
                                            onClick={ () => {
                                              set_test( true );
                                            } }
                                          />
                                          {
                                            val_test ?
                                              <Box
                                                id='testGMap'
                                                minHeight={ 24 }
                                                borderRadius={ 2 }
                                              /> : null
                                          }
                                        </>
                                      }
                                    />
                                    <Box
                                      children={
                                        <>
                                          こんにちは！！ ○○○クラブの○○○です！！！今月○日の○曜日は
                                          <br />
                                          description description description description
                                          description description description description
                                          description description description description
                                          description description description description
                                          description description description description
                                          description description description description
                                          description description description description
                                          description description description description
                                          description description description description
                                          description description description description
                                          description description description description
                                          description description description description
                                          みなさん、是非ご参加ください！！！！
                                        </>
                                      }
                                    />

                                    <CardBox
                                      appearance='border'
                                      space={ 1 }
                                      header={ '主催者の情報' }
                                      body={
                                        <>
                                          <Flex
                                            align='center'
                                            gap={ 1 }
                                            children={
                                              <>
                                                <Img
                                                  src={ FS.usr.incognitorTop }
                                                  width={ 4 }
                                                  height={ 4 }
                                                  borderRadius={ 100 }
                                                />
                                                <Box
                                                  fontSize={ 4 }
                                                  children={ 'Organizer Name' }
                                                />
                                              </>
                                            }
                                          />
                                          <Box
                                            paddingLeft={ 1 }
                                            children={
                                              <Paragraph
                                                paddingLeft={ 4 }
                                                children={
                                                  <>
                                                    description description description description
                                                    description description description description
                                                    description description description description
                                                    description description description description
                                                    description description description description
                                                    description description description description
                                                    description description description description
                                                  </>
                                                }
                                              />
                                            }
                                          />
                                          <Flex
                                            justify='right'
                                            children={
                                              <Link
                                                type='main'
                                                href=''
                                                children={ '紹介ページへ' }
                                              />
                                            }
                                          />
                                        </>
                                      }
                                    />
                                    <CardBox
                                      appearance='border'
                                      space={ 1 }
                                      header={ '詳細' }
                                      body={
                                        <>
                                          <Flex
                                            wrap={ false }
                                            gap={ 1 }
                                            children={
                                              <>
                                                <Box
                                                  width={ '25%' }
                                                  children={
                                                    <>
                                                      <Icon d='stop' /> 参加費
                                                    </>
                                                  }
                                                />
                                                <Box children={ '¥○○,○○○' } />
                                              </>
                                            }
                                          />
                                          <Flex
                                            wrap={ false }
                                            gap={ 1 }
                                            children={
                                              <>
                                                <Box
                                                  width={ '25%' }
                                                  children={
                                                    <>
                                                      <Icon d='stop' /> 資料
                                                    </>
                                                  }
                                                />
                                                <Box children={ '○○○○○' } />
                                              </>
                                            }
                                          />
                                          <Flex
                                            wrap={ false }
                                            gap={ 1 }
                                            children={
                                              <>
                                                <Box
                                                  width={ '25%' }
                                                  children={
                                                    <>
                                                      <Icon d='stop' /> 公開範囲
                                                    </>
                                                  }
                                                />
                                                <Box children={ 'パブリック' } />
                                              </>
                                            }
                                          />
                                          <Flex
                                            wrap={ false }
                                            gap={ 1 }
                                            children={
                                              <>
                                                <Box
                                                  width={ '25%' }
                                                  children={
                                                    <>
                                                      <Icon d='stop' /> 参加方法
                                                    </>
                                                  }
                                                />
                                                <Box children={ '対面 + オンライン' } />
                                              </>
                                            }
                                          />
                                        </>
                                      }
                                    />

                                    <Button
                                      type='main'
                                      children={ '参加登録' }
                                    />
                                  </>
                                }
                              />
                            </>
                        },{
                          tab: 'コメント',
                          body: 'Comments'
                        },{
                          tab: '参加予定のユーザー',
                          body: 'Users'
                        }
                      ] }
                    />
                  </>
                }
              />
              <Flex
                type='col'
                gap={ 1 }
                border={ 2 }
                borderRadius={ 4 }
                padding={ 1.5 }
                backgroundColor={ 1 }
                boxShadow={ 4 }
                maxWidth={ 30 }
                className={ style.Closing }
                phoneStyles={ {
                  display: 'none'
                } }
                children={
                  <>
                    <Flex
                      gap={ 1 }
                      align='center'
                      wrap={ false }
                      children={
                        <>
                          <Img
                            src={ FS.usr.profile.icon }
                            width={ 3 }
                            height={ 3 }
                            borderRadius={ 100 }
                          />
                          <Box
                            fontSize={ 4 }
                            children={ 'Organizer Name' }
                          />
                        </>
                      }
                    />
                    <Box
                      children={
                        <>
                          <Icon d='stop' /> Event Title
                          <br />
                          <Icon d='stop' /> 2022/09/01 15:00 ~ 18:00
                          <br />
                          <Icon d='stop' /> 〒○○○-○○○○ ○○○○○○○○
                        </>
                      }
                    />
                    <Flex
                      paddingLeft={ -1 }
                      align='center'
                      children={
                        <>
                          <Img
                            src={ FS.usr.profile.icon }
                            className={ style.MemberImage }
                          />
                          <Img
                            src={ FS.usr.incognitorTop }
                            className={ style.MemberImage }
                          />
                          <Img
                            src={ FS.mingoo.pngIcon }
                            className={ style.MemberImage }
                          />
                          <Img
                            src={ FS.app.Icon }
                            className={ style.MemberImage }
                          />
                          <Img
                            src={ FS.usr.profile.icon }
                            className={ style.MemberImage }
                          />
                          <Box
                            flexCenter={ true }
                            flexColSize='auto'
                            fontSize={ 1 }
                            children={ '＋34人が参加予定' }
                          />
                        </>
                      }
                    />
                    <Button
                      type='main'
                      width={ '100%' }
                      borderRadius={ 100 }
                      activeEffect={ 'shrink' }
                      children={ '参加登録' }
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