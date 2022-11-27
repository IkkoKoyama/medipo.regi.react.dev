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
    Buttons: {
      Button,
    },
    Icon,
    Img,
  },
  mols: {
    Accordion,
    List,
  },
  orgs: {
    LayoutContent,
    Cropper,
    Table
  }
} = AMOT;

const OrgList: FNC<{}> = () => {
  let { orgs = [] } = AMOT.inmemory[ 'regionManageList' ] || {};

  let HeadData: Orgs.Tables.Data.HeadProps[] = [
    { label: '名前',data: '名前' },
    { label: 'クラブ数',data: 'クラブ数' },
    { label: 'メンバー',data: 'メンバー' }
  ];
  let BodyData: Orgs.Tables.Data.RowProps[] = [];
  for ( let org of orgs ) {
    let {
      orgId,
      orgUuid,
      orgName,
      childCount,
      userCount
    } = org;

    BodyData.push( {
      columns: [
        {
          type: 'th',
          label: orgName,
          data: orgName,
          style: {
            backgroundColor: 1,
            maxWidth: 12
          }
        },{
          type: 'td',
          label: childCount + ' Clubs',
          data: childCount
        },{
          type: 'td',
          label:
            <>
              <Box
                children={ userCount + ' Users' }
              />
            </>,
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
        colLength={ 3 }
        appearance={ {
          format: 'rowBorder'
        } }
        head={ HeadData }
        rows={ BodyData }
        option={ {
          order: true,
          defaultOrder: [ 0,'ASC' ],
          filter: [ true ]
        } }
        rowClickCallBack={ ( rowId ) => {
          AMOT.inmemory[ 'history' ].push( '/org/obj?id=' + rowId );
        } }
      />
    </Box>
  );
}

const CreateRegionRegion: FNC<{}> = () => {
  return (
    <Flex justify='right'>
      <Button.Prime
        padding={ [ 1,2 ] }
        onClick={ () => {
          Modal.toggle( {
            modalId: 'createRegion',
            size: 'S',
            type: 'center',
            header: <Box
              padding={ [ 1,2 ] }
              children={ '地区の作成' }
            />,
            body: <Flex
              type='col'
              gap={ 1 }
              padding={ 2 }
            >
              <Input.Hidden
                name='uuid'
                form='createRegion'
                value={ $.uuidGen( 32 ) }
              />
              <Input.Text
                name='name'
                form='createRegion'
                label='名前'
                placeholder='名前を入力'
                required={ true }
              />
              <Input.Time.Date
                name='sdate'
                form='createRegion'
                label='設立年月日'
                required={ true }
              />
            </Flex>,
            footer: ( { modalClose } ) => {
              return (
                <Flex
                  type='row'
                  wrap={ false }
                  gap={ 1 }
                  padding={ [ 1,2 ] }
                  justify='between'
                  children={
                    <>
                      <Button.Border
                        size="S"
                        onClick={ modalClose }
                        children={ '閉じる' }
                      />
                      <Button.Prime
                        size="S"
                        formButton='createRegion'
                        submitDelegationFormInputKeydownEvents={ [ 'auxEnter' ] }
                        children={ '作成する' }
                        onClick={ async () => {
                          let form = await $.formCollect( 'createRegion' );
                          if ( form.valid ) {
                            let {
                              uuid
                            } = form.data;

                            $.fetch(
                              {
                                name: 'createOrg',
                                method: 'post',
                                url: 'org/create',
                                body: {
                                  ...form.data,
                                  orgType: 1
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
                    </>
                  }
                />
              );
            },
          } );
        } }
      >
        <Icon d='plus' /> 地区を作成
      </Button.Prime>
    </Flex>
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
            url: 'org/manageList',
            body: {
              orgType: 1
            },
            trafficControl: 400
          },
            ( result ) => {
              AMOT.inmemory[ 'regionManageList' ] = result.body;
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
      { Env.Session.userLevel >= 3281 ? <CreateRegionRegion /> : null }
      <OrgList />
    </Flex>
  );
}