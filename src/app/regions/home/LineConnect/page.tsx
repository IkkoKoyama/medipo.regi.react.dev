let {
  glob: {
    React,
    Render,
    useEffect,
    useState
  },
  atoms: {
    Box,
    Icon,
    Flex,
    Paragraph,
    Span,
    Buttons: {
      Button,
    },
    Img
  },
  mols: {
  },
  orgs: {
    LayoutContent
  },
  temps: {
  },
  xtraMinifyComponent: {
    logos: {
      LINEIcon
    },
  }
} = AMOT;

export const LineConnectPage: FNC<{}> = () => {
  let [ val_done,set_done ] = useState( false );
  let {
    userid: lineUserId
  } = $.getQueryParams();

  return (
    <LayoutContent
      size='S'
      styles={ {
        padding: [ 4,2 ]
      } }
    >
      <Box
        ssCardBox={ true }
        textAligin='center'
      >
        <Box
          ssCardBoxHeader={ true }
          padding={ 1 }
        >
          <Flex
            align="center"
            justify="center"
            gap={ 1 }
          >
            <LINEIcon size='L' />
            LINE連携
          </Flex>
        </Box>
        <Flex
          ssCardBoxBody={ true }
          type='col'
          gap={ 2 }
        >
          RACCOアカウントとLINEアカウントを連携します
          <Box
            fontColor={ 'nega' }
            fontSize={ 1 }
            padding={ [ 0,1 ] }
          >
            ※ 共有されたユーザー情報は厳重に保管・管理され、
            例会のお知らせ配信等以外の目的で使用されることはありません。
          </Box>
          <Flex
            gap={ -1 }
            align='center'
            margin={ 'auto' }
            wrap={ false }
            border={ 2 }
            borderRadius={ 100 }
            padding={ -1 }
            paddingRight={ 1 }
          >
            <Img
              src={ Images.usr.icon.S }
              width={ 3 }
              height={ 3 }
              borderRadius={ 100 }
            />
            <Box
              flex='auto'
              children={ Usr.name }
            />
          </Flex>
          <Button.Prime
            borderRadius={ 100 }
            padding={ 1 }
            children={ 'ユーザー情報を共有' }
            onClick={ () => {
              $.fetch( {
                method: 'post',
                url: 'line/connect',
                body: {
                  lineUserId
                }
              },( result ) => {
                if ( result.ok ) {
                  window.location.href = appEnv.lineLink;
                }
              } )
            } }
          />
        </Flex>
      </Box>
    </LayoutContent>
  );
}