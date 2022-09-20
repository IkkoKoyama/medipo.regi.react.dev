const {
  glob: {
    React,
    useStore,
    useState,
    useEffect,
    useHistory
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
            <Input.Hidden
              name='uuid'
              form='createRegion'
              value={ $.uuidGen( 32 ) }
            />
            <Input.Text
              name='name'
              id='regionName'
              form='createRegion'
              label='名前'
              placeholder='名前を入力'
              required={ true }
            />
            <Input.Time
              type='date'
              name='sdate'
              form='createRegion'
              label='設立年月日'
              required={ true }
            />
          </>
        }
      />
    </>
  );
}

const RegionList: FNC<{}> = () => {
  let { regions = [] } = global.Temps[ 'regionManageList' ] || {};

  let HeadData: Orgs.Tables.Data.HeadProps[] = [
    { label: '名前',data: '名前' },
    { label: '設立年月日',data: '設立年月日' },
    { label: 'クラブ数',data: 'クラブ数' },
    { label: 'メンバー',data: 'メンバー' }
  ];
  let BodyData: Orgs.Tables.Data.RowProps[] = [];
  for ( let region of regions ) {
    let {
      regionId,
      regionName,
      regionUuid,
      regionSdate,
      clubCount,
      userCount
    } = region as any;

    BodyData.push( {
      columns: [
        {
          type: 'th',
          label: regionName,
          data: regionName,
          style: {
            backgroundColor: 1,
            maxWidth : 12
          }
        },{
          type: 'td',
          label: regionSdate,
          data: regionSdate,
        },{
          type: 'td',
          label: clubCount + ' Clubs',
          data: clubCount
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
                            className={ 'TableMemberCellImage' }
                          />
                          <Img
                            src={ FS.usr.incognitorTop }
                            className={ 'TableMemberCellImage' }
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
        }
      ],
      rowId: regionUuid
    } );
  }

  return (
    <Table.Data
      colLength={ 4 }
      appearance={ {
        format: 'rowBorder'
      } }
      head={ HeadData }
      rows={ BodyData }
      option={ {
        excelDownLoadable: false,
        order: true,
        defaultOrder: [ 0,'ASC' ],
        filter : [ true ]
      } }
      rowClickCallBack={ ( rowId ) => {
        global.Temps[ 'history' ].push( '/region/obj?id=' + rowId );
      } }
    />
  );
}

export const RegionDashboard: FNC<{}> = () => {
  let [ val_refresh,set_refresh ] = useState( $.uuidGen( 16 ) );

  useEffect( () => {
    useStore( {
      insertId: 'managerTab-region',
      data: {
        refresh: async () => {
          $.fetch( {
            method: 'post',
            url: 'region/manageList',
            trafficControl: 400,
            loaderEffect : 'corner'
          },
            ( result ) => {
              global.Temps[ 'regionManageList' ] = result.body;
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
                      <Icon d='plus' /> 地区を作成
                    </>
                  }
                  onClick={ () => {
                    Modal.toggle( {
                      modalId: 'createRegion',
                      size: 'S',
                      type: 'center',
                      header:
                        <Box
                          padding={ [ 1,2 ] }
                          children={ '地区の作成' }
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
                                  submitFormName='createRegion'
                                  onClickDelegationKeyboardEvents={ [ 'auxEnter' ] }
                                  children={ '作成する' }
                                  onClick={ async () => {
                                    let form = await $.FormCollect( 'createRegion' );
                                    if ( form.valid ) {
                                      let {
                                        uuid
                                      } = form.data;

                                      let result = await $.fetch( {
                                        name : 'createRegion',
                                        method: 'post',
                                        url: '/region/create',
                                        body: form.data
                                      } );
                                      if ( result.ok ) {
                                        let history = global.Temps[ 'history' ];
                                        history.push( '/region/obj?id=' + uuid );
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
                        $( 'input[id="regionName"]' ).focus();
                      }
                    } );
                  } }
                />
              </>
            }
          />
          <RegionList />
        </>
      }
    />
  );
}