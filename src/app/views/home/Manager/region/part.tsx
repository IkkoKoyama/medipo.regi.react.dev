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
            <Input.Text
              name='name'
              id='regionName'
              form='createForm'
              label='名前'
              placeholder='名前を入力'
              required={ true }
            />
            <Input.Time
              type='month'
              name='sdate'
              form='createForm'
              label='設立年月日'
              required={ true }
            />
            <Input.Time
              type='date'
            />
          </>
        }
      />
    </>
  );
}
const CreateModalProps : Modal.Props = {
  modalId : 'createRegion',
  size : 'S',
  type : 'center',
  header :
  <Box
    padding={ [ 1,2 ] }
    children={ '地区の作成' }
  />,
  body : <CreateModal />,
  footer : ( closeCallBack ) => {
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
                    url: '/region/create',
                    body: form.data
                  } );
                  if ( result.ok ) {
                    let {
                      insertId
                    } = result.body.region;

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
  openAfterCallBack : () => {
    $( 'input[id="regionName"]' ).focus();
  }
}


const RegionList: FNC<{}> = () => {
  let { regions } = global.Temps[ 'regionListEnv' ];

  let HeadData: Orgs.Tables.Data.HeadProps[] = [
    { label: '名前',data: '名前' },
    { label: 'クラブ数',data: 'クラブ数' },
    { label: 'メンバー',data: 'メンバー' }
  ];
  let BodyData: Orgs.Tables.Data.RowProps[] = [];
  for ( let region of regions ) {
    let {
      regionId,
      regionName,
      clubCount,
      userCount
    } = region as any;

    BodyData.push({
      columns: [
        {
          type: 'th',
          label: regionName,
          data: regionName,
          style: {
            backgroundColor: 1
          }
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
      rowId : regionId
    });
  }

  return (
    <Table.Data
      colLength={ 3 }
      appearance={ {
        format: 'rowBorder'
      } }
      head={ HeadData }
      rows={ BodyData }
      option={ {
        excelDownLoadable: false,
        order : true,
        defaultOrder: [ 0,'ASC' ],
      } }
      rowClickCallBack={ ( rowId ) => {
        console.log( rowId );
      } }
    />
  );
}
export const RegionContent: FNC<{}> = () => {
  let [ val_def,set_def ] = useState( false );

  useEffect( () => {
    ( async () => {
      let result = await $.fetch( {
        method: 'post',
        url: 'region/listEnv',
        trafficControl : 400
      } );
      if ( result.ok ) {
        global.Temps[ 'regionListEnv' ] = result.body;
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
                      <Icon d='plus' /> 地区を作成
                    </>
                  }
                  onClick={ () => {
                    Modal.open( CreateModalProps );
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