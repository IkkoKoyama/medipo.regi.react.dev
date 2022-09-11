const {
  glob: {
    React,
    useState,
    useEffect
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
    Tab,
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
            <Input.Radio
              name='type'
              label='タイプ'
              form='createForm'
              required={ true }
              list={[
                {
                  value : 1,
                  label : 'ロータリー'
                },{
                  value : 2,
                  label : 'ロータアクト'
                }
              ]}
            />
            <Input.Search
              name='regionId'
              id='regionSearch'
              label='所属地区'
              form='createForm'
              required={ true }
              limit={ 1 }
              list={ [] }
              onDynamicSearchCallBack={ async ( keyword ) => {
                let result = await $.fetch( {
                  method: 'post',
                  url: 'club/createRegionSearch',
                  trafficControl: false,
                  body: { keyword }
                } );
                if ( result.ok ) {
                  let { regions } = result.body;

                  let options = regions.map( ( region : any ) => {
                    let { id,name } = region;
                    return {
                      value : id,
                      icon :
                      <Icon d='map-location-dot' />,
                      label : name,
                      keyword : name
                    }
                  } )

                  return options;
                }
                return [];
              } }
            />
            <Input.Text
              name='name'
              form='createForm'
              label='名前'
              placeholder='名前を入力'
              required={ true }
            />
          </>
        }
      />
    </>
  );
}
const CreateModalProps: Modal.Props = {
  modalId: 'createClub-',
  size: 'S',
  type: 'center',
  header :
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
              submitFormName='createForm'
              onClickDelegationKeyboardEvents={ [ 'auxEnter' ] }
              children={ '作成する' }
              onClick={ async () => {
                let form = await $.FormCollect( 'createForm' );
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
  // openAfterCallBack : () => {
  //   $( 'input[id="regionSearch"]' ).focus();
  // }
}


const ClubList: FNC<{}> = () => {
  let { clubs } = global.Temps[ 'clubListEnv' ];

  let HeadData: Orgs.Tables.Data.HeadProps[] = [
    { label: '名前',data: '名前' },
    { label: 'タイプ',data: 'タイプ' },
    {
      label: '所属地区',data: '所属地区',
      style : {
        phoneStyles : {
          display : 'none'
        }
      }
    },
    { label: 'メンバー',data: 'メンバー' }
  ];
  let BodyData: Orgs.Tables.Data.RowProps[] = [];
  for ( let club of clubs ) {
    let {
      clubId,
      clubName,
      clubTypeId,
      regionName,
      userCount
    } = club as any;

    let clubType = [ '','Rotary','Rotaract' ][ clubTypeId ];

    BodyData.push( {
      columns: [
        {
          type: 'th',
          label: clubName,
          data: clubName,
          style: {
            backgroundColor: 1
          }
        },{
          type: 'td',
          label: clubType,
          data: clubType
        },{
          type: 'td',
          label: regionName,
          data: regionName,
          style : {
            phoneStyles : {
              display : 'none'
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
                            src={ FS.usr.top }
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
        }
      ],
      rowId: clubId
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
        filter : [ false,true,true,false ]
      } }
      rowClickCallBack={ ( rowId ) => {
        console.log( rowId );
      } }
    />
  );
}

export const ClubContent: FNC<{}> = () => {
  let [ val_def,set_def ] = useState( false );

  useEffect( () => {
    ( async () => {
      let result = await $.fetch( {
        method: 'post',
        url: 'club/listEnv',
        trafficControl: 400
      } );
      if ( result.ok ) {
        global.Temps[ 'clubListEnv' ] = result.body;
        set_def( true )
      }
    } )();
  },[] );

  if ( !val_def ) return null;
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
                    setTimeout( () => {
                      Modal
                        .open( CreateModalProps );
                    },100 );
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