const {
  glob: {
    React,
    useEffect
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
    Tab,
    Table
  }
} = AMOT;

import style from './style.module.scss';

import { InteractButton } from '@appComps/InteractButton/parts';

const ProfileContent: FNC<{}> = () => {
  return (
    <Flex
      type='col'
      gap={ 2 }
      auto={ true }
      children={
        <>
          <CardBox
            space={ 2 }
            body={
              <>
                <Flex
                  justify='even'
                  children={
                    <>
                      <Flex
                        type='col'
                        justify='center'
                        align='center'
                        gap={ -2 }
                      >
                        <Box
                          fontSize={ 6 }
                          fontWeight={ 3 }
                          children={ '130回' }
                        />
                        イベントに参加
                      </Flex>
                      <Flex
                        type='col'
                        justify='center'
                        align='center'
                        gap={ -2 }
                      >
                        <Box
                          fontSize={ 6 }
                          fontWeight={ 3 }
                          children={ '20回' }
                        />
                        イベントを企画
                      </Flex>
                      <Flex
                        type='col'
                        justify='center'
                        align='center'
                        gap={ -2 }
                      >
                        <Box
                          fontSize={ 6 }
                          fontWeight={ 3 }
                          children={ '500+' }
                        />
                        いいね！
                      </Flex>
                    </>
                  }
                />
              </>
            }
          />
          <Flex
            even={ true }
            gap={ 2 }
            children={
              <>
                <CardBox
                  space={ 2 }
                  header={ '役職' }
                  body={
                    <>
                      <Icon d='stop' /> ○○○○○○会長 2022/09 ~
                      <br />
                      <Icon d='stop' /> ○○○○○○会長 2020/09 ~
                      <br />
                      <Icon d='stop' /> ○○○○○○会長 2017/09 ~
                    </>
                  }
                />
                <CardBox
                  space={ 2 }
                  header={ '役職' }
                  body={
                    <>
                      <Icon d='stop' /> ○○○○○○会長 2022/09 ~
                      <br />
                      <Icon d='stop' /> ○○○○○○会長 2020/09 ~
                      <br />
                      <Icon d='stop' /> ○○○○○○会長 2017/09 ~
                    </>
                  }
                />
              </>
            }
          />
        </>
      }
    />
  );
}

export const AccountPage: FNC<{}> = () => {
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
                padding={ [ 2,4 ] }
                backgroundColor={ 1 }
                boxShadow={ 4 }
                maxWidth={ 30 }
                justify='center'
                align='center'
                className={ style.Closing }
                phoneStyles={ {
                  display: 'none'
                } }
                children={
                  <>
                    <Img
                      src={ FS.usr.top }
                      width={ 12 }
                      height={ 12 }
                      borderRadius={ 100 }
                      showExpand={ true }
                    />
                    <Flex
                      type='col'
                      wrap={ false }
                      children={
                        <>
                          <Box
                            fontSize={ 6 }
                            fontWeight={ 3 }
                            children={ '鈴木　信弘' }
                          />
                          <Box
                            fontWeight={ 3 }
                            fontColor={ 4 }
                            children={ Usr.kana || 'すずき　のぶひろ' }
                          />
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
                            src={ Cdn.proEnv + 'app/racco/event/defaultHeader3.jpeg' }
                            borderRadius={ 4 }
                            showExpand={ true }
                            phoneStyles={ {
                              borderRadius: 0
                            } }
                          />
                          <Label
                            type='clearVivid'
                            htmlFor='headerImageCropper'
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
                            use='head'
                            triggerId='headerImageCropper'
                            maxImageSize={ 150000 }
                            onProcessFinished={ async ( args ) => {
                              let { dataUrl } = args;

                              // set_imageData( dataUrl );
                            } }
                          />
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
                                src={ FS.usr.top }
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
                                      children={ '鈴木　信弘' }
                                    />
                                    <Box
                                      fontSize={ 3 }
                                      children={ Usr.kana || 'すずき　のぶひろ' }
                                    />
                                  </>
                                }
                              />
                            </>
                          }
                        />
                      }
                    />
                    <Tab
                      tabIndex={ 0 }
                      header={ {
                        labelName: 'testTabLabel',
                        stickyTarget: [
                          '#TopHeader'
                        ]
                      } }
                      contentTemplate={ ( children ) => {
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
                          label: 'プロフィール',
                          content: <ProfileContent />
                        },{
                          label: '実績',
                          content: '実績'
                        },{
                          label: 'History',
                          content: 'History'
                        },{
                          label: 'LINE 通知',
                          content: 'LINE Notification'
                        },{
                          label:
                          <>
                            <Icon d='fal gear' /> 設定
                          </>,
                          content: 'AnalyticsContent'
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