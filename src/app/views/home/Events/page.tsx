const {
  glob: {
    React
  },
  atoms: {
    Box,
    Flex,
    Input,
    Button,
    Label,
    Link,
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

import { InteractButton } from '@appComps/InteractButton/parts';

import style from './style.module.scss';

const TimeLine: FNC<{}> = () => {
  let Cells = [];
  for ( let i = 0; i < 6; i++ ) {
    Cells.push(
      <Flex
        border={ 2 }
        borderRadius={ 4 }
        padding={ 1.5 }
        wrap={ false }
        gap={ 1 }
        align='top'
        position={ 'relative' }
        className={ style.Cell }
        phoneStyles={ {
          borderTop: 'none',
          borderLeft: 'none',
          borderRight: 'none',
          borderBottom: 2,
          borderRadius: 0
        } }
        children={
          <>
            <Link
              href='/event'
              className={ style.CellLink }
            />
            <Flex
              type='col'
              gap={ 1 }
              width={ 4 }
              flexColSize={ 'none' }
              fontColor={ 1 }
              children={
                <>
                  <Img
                    src={ FS.usr.profile.display }
                    borderRadius={ 100 }
                  />
                </>
              }
            />
            <Flex
              type='col'
              fontColor={ 2 }
              gap={ 1 }
              children={
                <>
                  <Box
                    children={
                      <>
                        <Box
                          fontSize={ 4 }
                          fontWeight={ 3 }
                          children={ 'Title Name' }
                        />
                        <Box
                          children={ 'by Organizer Name' }
                          fontColor={ 4 }
                        />
                      </>
                    }
                  />
                  <Box
                    children={
                      <>
                        description
                        <br />
                        description
                        <br />
                        description
                        <br />
                        description
                        <br />
                        ■ 2022/09/21 15:00 ~ 18:00
                        <br />
                        ■ 〒○○○-○○○○ ○○○○○○○○
                      </>
                    }
                  />
                  <Img
                    src={ Cdn.proEnv + `app/racco/event/defaultHeader3.jpeg` }
                    borderRadius={ 4 }
                    showExpand={ true }
                    className={ style.Float }
                  />
                  <Flex
                    wrap={ false }
                    gap={ 1 }
                    children={
                      <>
                        <Flex
                          wrap={ false }
                          justify='left'
                          align='center'
                          gap={ 1 }
                          flexColSize={ 'auto' }
                          children={
                            <>
                              <InteractButton
                                type='heart'
                                value={ true }
                                className={ style.Float }
                                onChangeCallBack={ ( value ) => {
                                  console.log( value );
                                } }
                                free={ 120 }
                              />
                              <InteractButton
                                type='star'
                                className={ style.Float }
                                onChangeCallBack={ ( value ) => {
                                  console.log( value );
                                } }
                                free={ 20 }
                              />
                            </>
                          }
                        />
                        <Button
                          type='main'
                          className={ style.Float }
                          borderRadius={ 100 }
                          boxShadow={ 2 }
                          children={ '参加登録' }
                        />
                      </>
                    }
                  />
                  <Flex
                    wrap={ false }
                    gap={ 1 }
                    align='top'
                    children={
                      <>
                        <Label
                          type='sub'
                          htmlFor={ 'toggleId-' + i }
                          padding={ [ -1,1 ] }
                          children={ '詳細' }
                          className={ style.Float }
                        />
                        <Box
                          flexColSize='auto'
                          children={
                            <Accordion
                              appearance='plain'
                              toggleId={ 'toggleId-' + i }
                              children={
                                <Box
                                  children={ 'adfvdfv' }
                                  padding={ 1 }
                                  border={ 2 }
                                  borderRadius={ 2 }
                                />
                              }
                            />
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
    );
  }
  return (
    <Flex
      type='col'
      gap={ 2 }
      cols='auto'
      phoneStyles={ {
        gap: 0,
      } }
      children={ Cells }
    />
  );
}

export const EventsPage: FNC<{}> = () => {
  return (
    <LayoutContent
      size='R'
      styles={ {
        margin: [ 0,'auto' ],
        padding: [ 0,1 ],
        paddingBottom: 6,
        phoneStyles: {
          padding: 0,
        }
      } }
      children={
        <Flex
          type='col'
          gap={ 2 }
          phoneStyles={ {
            gap: 0,
          } }
          children={
            <>
              <Box
                position='sticky'
                className={ style.Console }
                children={
                  <>
                    <Box
                      overflow='hidden'
                      border={ 2 }
                      borderTop={ 'none' }
                      backgroundColor={ 1 }
                      borderRadius={ [ 0,0,2,2 ] }
                      phoneStyles={ {
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 0
                      } }
                      children={
                        <Input.Radio
                          align='rowFlex'
                          value={ [ 1 ] }
                          gap={ 0 }
                          wrap={ false }
                          appearance={ {
                            format: 'plain',
                            cell: {
                              style: {
                                padding: [ 1,2 ],
                                flexCenter: true
                              }
                            },
                            checked: {
                              style: {
                                fontColor: 'theme',
                                backgroundColor : 'themeAlfa3'
                              }
                            }
                          } }
                          list={ [
                            {
                              value: 1,label: 'TimeLine',
                              appearance: {
                                style: {
                                  borderRight: 2
                                }
                              }
                            },
                            {
                              value: 2,label: 'Search',
                              appearance: {
                                style: {
                                  borderRight: 2
                                }
                              }
                            },
                            { value: 3,label: 'Map' },
                          ] }
                        />
                      }
                    />
                  </>
                }
              />
              <Box
                className={ style.Body }
                flexColSize={ 'auto' }
                children={ <TimeLine /> }
              />
            </>
          }
        />
      }
    />
  );
}