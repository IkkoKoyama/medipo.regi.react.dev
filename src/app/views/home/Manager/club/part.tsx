const {
  glob: {
    React,
    useState,
    useEffect,
    useStore
  },
  atoms: {
    Box,
    Span,
    Flex,
    Input,
    Button,
    Link,
    Label,
    Icon,
    Img,
  },
  mols: {
    CardBox,
    Accordion,
    List,
  },
  orgs: {
    LayoutContent,
    Cropper,
    Table
  }
} = AMOT;

import style from './style.module.scss';

const CreateModal: FNC<{}> = () => {
  return (
    <>
      <Flex
        type='col'
        gap={ 1 }
        padding={ 2 }
        children={
          <>
            <Input.Text
              name='name'
              id='createClubNameInput'
              form='createClub'
              label='名前'
              placeholder='名前を入力'
              required={ true }
            />
            <Input.Radio
              name='type'
              label='タイプ'
              form='createClub'
              appearance={ {
                format: 'iconBorder'
              } }
              required={ true }
              list={ [
                {
                  value: 1,
                  label: 'ロータリー'
                },{
                  value: 2,
                  label: 'ロータアクト'
                }
              ] }
            />
            <Input.Search
              name='regionId'
              label='所属地区'
              form='createClub'
              required={ true }
              limit={ 1 }
              list={ [] }
              onDynamicSearchCallBack={ async ( keyword ) => {
                let result = await $.fetch( {
                  method: 'post',
                  url: 'club/regionSearchOnClubCreate',
                  trafficControl: 0,
                  body: { keyword }
                } );
                if ( result.ok ) {
                  let { regions } = result.body;

                  let options = regions.map( ( region: any ) => {
                    let { id,name } = region;
                    return {
                      value: id,
                      icon:
                        <Icon d='map-location-dot' />,
                      label: name,
                      keyword: name
                    }
                  } )

                  return options;
                }
                return [];
              } }
            />
            <Input.Time
              type='date'
              name='sdate'
              form='createClub'
              label='設立年月日'
              required={ true }
            />
          </>
        }
      />
    </>
  );
}

const ClubList: FNC<{}> = () => {
  let { clubs = [] } = global.Temps[ 'clubManageList' ] || {};

  let HeadData: Orgs.Tables.Data.HeadProps[] = [
    { label: 'タイプ',data: 'タイプ' },
    { label: '名前',data: '名前' },
    {
      label: '所属地区',data: '所属地区',
      style: {
        phoneStyles: {
          display: 'none'
        }
      }
    },
    { label: 'メンバー',data: 'メンバー' },
    { label: '設立年月日',data: '設立年月日' },
  ];
  let BodyData: Orgs.Tables.Data.RowProps[] = [];
  for ( let club of clubs ) {
    let {
      clubId,
      clubName,
      clubTypeId,
      clubSdate,
      regionName,
      userCount
    } = club as any;

    let clubType = [ '','Rotary','Rotaract' ][ clubTypeId ];

    BodyData.push( {
      columns: [
        {
          type: 'td',
          label: clubType,
          data: clubType
        },{
          type: 'th',
          label: clubName,
          data: clubName,
          style: {
            backgroundColor: 1
          }
        },{
          type: 'td',
          label: regionName,
          data: regionName,
          style: {
            phoneStyles: {
              display: 'none'
            }
          }
        },{
          type: 'td',
          label:
            <>
              <Flex
                align='center'
                display='inlineFlex'
                gap={ -1 }
                children={
                  <>
                    <Box
                      paddingLeft={ 1 }
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
                        </>
                      }
                    />
                    <Box
                      children={ userCount + ' Users' }
                    />
                  </>
                }
              />
            </>,
          data: userCount
        },{
          type: 'td',
          label: clubSdate,
          data: clubSdate,
        },
      ],
      rowId: clubId
    } );
  }

  return (
    <Table.Data
      colLength={ 5 }
      appearance={ {
        format: 'rowBorder'
      } }
      head={ HeadData }
      rows={ BodyData }
      option={ {
        excelDownLoadable: false,
        order: true,
        defaultOrder: [ 1,'ASC' ],
        filter: [ false,true,true,false ]
      } }
      rowClickCallBack={ ( rowId ) => {
        console.log( rowId );
      } }
    />
  );
}

export const ClubDashboard: FNC<{}> = () => {
  let [ val_refresh,set_refresh ] = useState( $.uuidGen( 16 ) );

  useEffect( () => {
    useStore( {
      insertId: 'managerTab-club',
      data: {
        refresh: async () => {
          $.fetch( {
            method: 'post',
            url: 'club/manageList',
            trafficControl: 400,
            loaderEffect : 'corner'
          },
            ( result ) => {
              global.Temps[ 'clubManageList' ] = result.body;
              set_refresh( $.uuidGen( 16 ) );
            }
          );
        }
      }
    } );
  },[] );

  return (
    <Flex
      type='col'
      gap={ 2 }
      padding={ 2 }
      children={
        <>
          <Flex
            justify='right'
            children={
              <>
                <Button
                  type='main'
                  padding={ [ 1,2 ] }
                  children={
                    <>
                      <Icon d='plus' /> クラブを作成
                    </>
                  }
                  onClick={ () => {
                    Modal.toggle( {
                      modalId: 'createClub',
                      size: 'S',
                      type: 'center',
                      header:
                        <Box
                          padding={ [ 1,2 ] }
                          children={ 'クラブの作成' }
                        />,
                      body: <CreateModal />,
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
                                  submitFormName='createClub'
                                  onClickDelegationKeyboardEvents={ [ 'auxEnter' ] }
                                  children={ '作成する' }
                                  onClick={ async () => {
                                    let form = await $.FormCollect( 'createClub' );
                                    if ( form.valid ) {
                                      let {
                                        uuid
                                      } = form.data;

                                      let result = await $.fetch( {
                                        name : 'createClub',
                                        method: 'post',
                                        url: '/club/create',
                                        body: form.data
                                      } );
                                      if ( result.ok ) {
                                        let history = global.Temps[ 'history' ];
                                        history.push( '/club/obj?id=' + uuid );
                                      }
                                    }
                                  } }
                                />
                              </>
                            }
                          />
                        );
                      },
                      openAfter: () => {
                        $( 'input[id="createClubNameInput"]' ).focus();
                      }
                    } );
                  } }
                />
              </>
            }
          />
          <ClubList />
        </>
      }
    />
  );

  return (
    <Flex
      type='col'
      gap={ 2 }
      padding={ 2 }
      children={
        <>
          <Flex
            justify='right'
            children={
              <>
                <Button
                  type='main'
                  padding={ [ 1,2 ] }
                  children={
                    <>
                      <Icon d='plus' /> クラブを作成
                    </>
                  }
                  onClick={ () => {
                    Modal.toggle( {
                      modalId: 'createClub',
                      size: 'S',
                      type: 'center',
                      header:
                        <Box
                          padding={ [ 1,2 ] }
                          children={ 'クラブの作成' }
                        />,
                      body: <CreateModal />,
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
                                  submitFormName='createClub'
                                  onClickDelegationKeyboardEvents={ [ 'auxEnter' ] }
                                  children={ '作成する' }
                                  onClick={ async () => {
                                    let form = await $.FormCollect( 'createClub' );
                                    if ( form.valid ) {
                                      let result = await $.fetch( {
                                        method: 'post',
                                        url: '/club/create',
                                        body: form.data
                                      } );
                                      if ( result.ok ) {
                                        let {
                                          insertId
                                        } = result.body.club;
                    
                                        console.log( insertId );
                                        // window.location.
                                      }
                                    }
                                  } }
                                />
                              </>
                            }
                          />
                        );
                      },
                      openAfter: () => {
                        $( 'input[id="createClubName"]' ).focus();
                      }
                    } );
                  } }
                />
              </>
            }
          />
          <ClubList />
        </>
      }
    />
  );
}