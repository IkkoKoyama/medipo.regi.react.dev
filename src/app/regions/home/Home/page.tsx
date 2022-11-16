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
    Buttons: {
      Button,
      Anchor
    },
    Icon,
    Img,
    Span
  },
  mols: {
    Accordion,
    List
  },
  orgs: {
    LayoutContent
  }
} = AMOT;

import { InteractButton } from '@appComps/InteractButton/parts';

let Way: any = appEnv.eventWay;

type Val_like = {
  mylike: boolean
  likes: number
}

const Event: FNC<any> = ( props ) => {
  let {
    eventId,
    eventUuid,
    title,
    subTitle,
    description,

    dateFrom,
    timeFrom,

    way,

    postal,
    addr1,
    addr2,

    headerImage,

    orgIcon,
    orgName,
    orgUuid,

    likes,
    myLike,

    registers,
    myRegister,
    userProfiles = ''
  } = props;

  let Description = description;
  if ( Description.length > 300 ) {
    Description = Description.slice( 0,100 ) + ' ...';
  }

  let RegisterUsersImages = ( userProfiles || '' ).split( ',' ).map( ( image: string ) => {
    return <Img
      key={ image }
      src={ $.userIconImage( image ) }
      className={ 'TableMemberCellImage' }
      width={ 2 }
      height={ 2 }
      borderRadius={ 'sphere' }
    />
  } );
  let Header = appEnv.eventHeaderImage( headerImage );
  let OrgIcon = appEnv.orgIconImage( orgIcon );

  let [ val_like,set_like ] = useState( {
    mylike: !!myLike,
    likes: likes
  } as Val_like );

  return (
    <Button.Clear
      color='trans'
      ssCardBox={ true }
      padding={ 1.5 }
      borderRadius={ 'LBMain' }
      textAligin='left'
      key={ eventUuid }
      onClick={ () => {
        Temps[ 'history' ].push( '/event/obj?id=' + eventUuid );
      } }
    >
      <Box
        marginBottom={ -1 }
        fontColor={ 4 }
        fontSize={ 1 }
      >
        { registers ? <Flex
          align='center'
          paddingLeft={ 1 }
        >
          { RegisterUsersImages }
          <Span marginLeft={ -1 }>{ registers }人が参加予定</Span>
        </Flex> : null
        }
      </Box>
      <Flex
        wrap={ false }
        gap={ 1 }
        align='top'
      >
        <Flex
          type='col'
          gap={ 1 }
          width={ 4 }
          flex={ 'none' }
          fontColor={ 1 }
        >
          <Img
            src={ OrgIcon }
            borderRadius={ 'sphere' }
          />
        </Flex>
        <Flex
          type='col'
          fontColor={ 2 }
          gap={ 1 }
        >
          <Box>
            <Box
              fontSize={ 4 }
              fontWeight={ 'bold' }
              children={ title }
            />
            <Box
              children={ orgName }
              fontColor={ 4 }
            />
          </Box>
          <Box>
            <Box children={ subTitle } />
            <Box
              whiteSpace='preWrap'
              children={ Description }
            />
            <Flex
              wrap={ false }
              padding={ [ -1,0 ] }
            >
              <Box
                backgroundColor={ 4 }
                borderRadius={ 4 }
                width={ -1 }
                margin={ [ 0,-1 ] }
              />
              <List
                type='row'
                gridsRate={ [ 3,9 ] }
                appearance='border'
                flex={ 'auto' }
                rowStyle={ {
                  padding: [ -1,-2 ]
                } }
                list={ [
                  {
                    title: <>
                      <Icon d='fal clock' /> 日時
                    </>,
                    content: <>
                      { dateFrom } { timeFrom } ~
                    </>
                  },{
                    title: <>
                      <Icon d='fal route' /> 参加方法
                    </>,
                    content: <>
                      { Way[ way ] }
                    </>
                  },...way != 2 ? [
                    {
                      title: <>
                        <Icon d='fal location-dot' /> 住所
                      </>,
                      content: <>
                        〒{ postal }
                        <br />
                        { addr1 }
                        <br />
                        { addr2 }
                      </>
                    }
                  ] : []
                ] }
              />
            </Flex>
          </Box>
          <Img
            src={ Header }
            borderRadius={ 'LBSub1' }
            showExpand={ Header.replace( /\/R\./,'/L.' ) }
          />
          <Flex
            wrap={ false }
            gap={ 1 }
          >
            <Flex
              wrap={ false }
              justify='left'
              align='center'
              gap={ 1 }
              flex={ 0 }
            >
              <InteractButton
                type='heart'
                value={ !!val_like.mylike }
                onChangeCallBack={ ( value ) => {
                  $.fetch(
                    {
                      name: 'eventHeart',
                      method: 'post',
                      url: 'event/heart',
                      body: {
                        eventId,
                        value
                      },
                      trafficControl: 0
                    },
                    ( result ) => {
                      if ( result.ok ) {
                        let direction = Number( value ) * 2 - 1;
                        set_like(
                          {
                            likes: val_like.likes + direction,
                            myLike: value
                          } as any
                        );
                        Toast.add( {
                          toastId: 'eventAdd' + value,
                          type: 'plain',
                          message: value ? 'イベントにいいねしました' : 'いいねを解除しました'
                        } );
                      }
                    }
                  )
                } }
                free={ val_like.likes }
              />
            </Flex>
            { myRegister ?
              <Button.Prime
                size='S'
                color='nega'
                borderRadius={ 2 }
                children={ '登録済' }
              /> : <Button.Prime
                size='S'
                borderRadius={ 2 }
                children={ '登録する' }
              />
            }
          </Flex>
        </Flex>
      </Flex>
    </Button.Clear>
  );
}

const Events: FNC<{
  val_events: any[]
}> = ( props ) => {
  let { val_events } = props;

  let Events: ReactElement[] = [];
  for ( let event of val_events ) {
    Events.push( <Event { ...event } /> )
  }

  return (
    <>
      <Box
        padding={ 1 }
      >
        ... { val_events.length }件のヒット
      </Box>
      <Flex
        type='col'
        gap={ 2 }
        flexChilds='auto'
        children={ Events }
      />
    </>
  );
}

const SearchSetting: FNC<{
  set_events: React.Dispatch<React.SetStateAction<never[]>>
}> = ( props ) => {
  let {
    set_events
  } = props;

  return (
    <>
      <Box ssCardBox={ true }>
        <Box ssCardBoxHeader={ true }>
          イベントを見つける
        </Box>
        <Flex
          type='col'
          gap={ 1 }
          padding={ 2 }
          ssCardBoxBody={ true }
        >
          <Flex
            flexChilds='even'
            gap={ 1 }
            phoneStyles={ {
              flexDirection : 'col'
            } }
          >
            <Input.Time.Month
              label='開催月'
              form='searchEventForm'
              name='month'
              required={ true }
              hideRequiredSign={ true }
              value={ String( new Date().ym( '-' ) ) }
            />
            <Input.Select
              label='参加方法'
              placeholder='指定しない'
              name='way'
              form='searchEventForm'
              list={ [
                {
                  value: 1,
                  label: '現地参加'
                },{
                  value: 2,
                  label: 'オンライン参加'
                }
              ] }
            />
          </Flex>
          <Input.CheckBox
            appearance={ {
              format: 'icon'
            } }
            name='onlyBelongs'
            form='searchEventForm'
            list={ [
              {
                value: 1,
                label: '所属組織のイベントのみ表示する'
              }
            ] }
          />
          <Flex
            justify='right'
            marginTop={ 1 }
          >
            <Button.Prime
              size='S'
              submitDelegationFormInputKeydownEvents={ [ 'auxEnter' ] }
              miniLoader={ true }
              onClick={ () => {
                searchEventFn( set_events );
              } }
            >
              <Icon d='far search' /> さがす
            </Button.Prime>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}


const searchEventFn = async (
  set_events: React.Dispatch<React.SetStateAction<never[]>>
) => {
  let form = await $.FormCollect( 'searchEventForm' );
  if ( !form.valid ) return;

  $.fetch( {
    method: 'post',
    url: 'event/getList',
    body: { ...form.data }
  },( result ) => {
    if ( result.ok ) set_events( result.body.events );
  } )
}

export const HomePage: FNC<{}> = () => {
  let [ val_events,set_events ] = useState( [] );

  useEffect( () => {
    setTimeout( () => {
      searchEventFn( set_events );
    },200 );
  },[] );

  return (
    <LayoutContent
      size='R'
      styles={ {
        margin: [ 0,'auto' ],
        padding: [ 4,1 ],
        phoneStyles: {
          padding: 1,
        }
      } }
    >
      <Flex
        type='col'
        gap={ 2 }
        phoneStyles={ {
          gap: 0,
        } }
      >
        <SearchSetting set_events={ set_events } />
        <Events val_events={ val_events } />
      </Flex>
    </LayoutContent>
  );
}