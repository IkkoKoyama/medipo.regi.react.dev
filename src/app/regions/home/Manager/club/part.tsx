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
    Buttons: {
      Button
    },
    Icon,
    Img,
  },
  mols: {
  },
  orgs: {
    Table
  }
} = AMOT;

const ClubList: FNC<{}> = () => {
  let { orgs = [] } = AMOT.inmemory[ 'clubManageList' ] || {};

  let HeadData: Orgs.Tables.Data.HeadProps[] = [
    { label: '名前',data: '名前' },
    { label: 'タイプ',data: 'タイプ' },
    {
      label: '所属地区',data: '所属地区',
      style: {
        phoneStyles: {
          display: 'none'
        }
      }
    },
    { label: 'メンバー',data: 'メンバー' }
  ];
  let BodyData: Orgs.Tables.Data.RowProps[] = [];
  for ( let org of orgs ) {
    let {
      orgId,
      orgUuid,
      orgName,
      type,
      parentName,
      childCount,
      userCount
    } = org;

    let ClubType = [ '','Rotary','Rotaract' ][ type ];

    BodyData.push( {
      columns: [
        {
          type: 'th',
          label: orgName,
          data: orgName,
          style: {
            backgroundColor: 1
          }
        },{
          type: 'td',
          label: ClubType,
          data: ClubType,
          orderIndex: type
        },{
          type: 'td',
          label: parentName,
          data: parentName,
          style: {
            phoneStyles: {
              display: 'none'
            }
          }
        },{
          type: 'td',
          label: <Box
            children={ userCount + ' Users' }
          />,
          data: userCount
        }
      ],
      rowId: orgUuid
    } );
  }

  return (
    <Box
      ssCardBox={ true }
    >
      <Table.Data
        colLength={ 4 }
        appearance={ {
          format: 'rowBorder'
        } }
        head={ HeadData }
        rows={ BodyData }
        option={ {
          order: true,
          defaultOrder: [ 1,'ASC' ],
          filter: [ true,false,false,false ]
        } }
        rowClickCallBack={ ( rowId ) => {
          AMOT.inmemory[ 'history' ].push( '/org/obj?id=' + rowId );
        } }
      />
    </Box>
  );
}

const CreateClubRegion: FNC<{}> = () => {
  return (
    <Flex
      justify='right'
      children={
        <>
          <Button.Prime
            padding={ [ 1,2 ] }
            onClick={ () => {
              Modal.toggle( {
                modalId: 'createClub',
                size: 'S',
                type: 'center',
                header: <Box
                  padding={ [ 1,2 ] }
                  children={ 'クラブの作成' }
                />,
                body: <Flex
                  type='col'
                  gap={ 1 }
                  padding={ 2 }
                >
                  <Input.Hidden
                    name='uuid'
                    form='createClub'
                    value={ $.uuidGen( 32 ) }
                  />
                  <Input.Text
                    name='name'
                    id='createOrgNameInput'
                    form='createClub'
                    label='名前'
                    placeholder='名前を入力'
                    required={ true }
                  />
                  <Input.Radio
                    name='type'
                    label='タイプ'
                    form='createClub'
                    required={ true }
                    list={ [ {
                      value: 1,
                      label: 'ロータリー'
                    },{
                      value: 2,
                      label: 'ロータアクト'
                    } ] }
                  />
                  <Input.Search
                    name='parentOrgId'
                    label='所属地区'
                    form='createClub'
                    required={ true }
                    limit={ 1 }
                    list={ [] }
                    onDynamicSearchCallBack={ async ( keyword ) => {
                      let result = await $.fetch( {
                        method: 'post',
                        url: 'org/regionSearchOnClubCreate',
                        trafficControl: 0,
                        body: { keyword }
                      } );
                      if ( result.ok ) {
                        let { orgs } = result.body;
                        let options = orgs.map( ( region: any ) => {
                          let {
                            id,name,
                            iconImage
                          } = region;

                          let Image = appEnv.orgIconImage( iconImage );
                          return {
                            value: id,
                            icon:
                              <Img
                                src={ Image }
                                width={ 2 }
                                height={ 2 }
                                borderRadius={ 'sphere' }
                              />,
                            label: name,
                            keyword: name
                          }
                        } )

                        return options;
                      }
                      return [];
                    } }
                  />
                  <Input.Time.Date
                    name='sdate'
                    form='createClub'
                    label='設立年月日'
                    required={ true }
                  />
                </Flex>,
                footer: ( { modalClose } ) => (
                  <Flex
                    type='row'
                    wrap={ false }
                    gap={ 1 }
                    padding={ [ 1,2 ] }
                    justify='between'
                  >
                    <Button.Border
                      onClick={ modalClose }
                      children={ '閉じる' }
                    />
                    <Button.Prime
                      formButton='createClub'
                      submitDelegationFormInputKeydownEvents={ [ 'auxEnter' ] }
                      children={ '作成する' }
                      onClick={ async () => {
                        let form = await $.formCollect( 'createClub' );
                        if ( form.valid ) {
                          let { uuid } = form.data;

                          $.fetch(
                            {
                              name: 'createOrg',
                              method: 'post',
                              url: 'org/create',
                              body: {
                                ...form.data,
                                orgType: 2
                              }
                            },
                            ( result ) => {
                              if ( result.ok ) {
                                let history = AMOT.inmemory[ 'history' ];
                                history.push( '/org/obj?id=' + uuid );
                              }
                            }
                          );
                        }
                      } }
                    />
                  </Flex>
                ),
                openAfter: () => {
                  $( 'input[id="createOrgNameInput"]' ).focus();
                }
              } );
            } }
          >
            <Icon d='plus' /> クラブを作成
          </Button.Prime>
        </>
      }
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
            url: 'org/manageList',
            body: {
              orgType: 2
            },
            trafficControl: 400
          },
            ( result ) => {
              AMOT.inmemory[ 'clubManageList' ] = result.body;
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
      phoneStyles={ {
        padding: 1
      } }
    >
      { Env.Session.userLevel >= 3281 ? <CreateClubRegion /> : null }
      <ClubList />
    </Flex>
  );
}