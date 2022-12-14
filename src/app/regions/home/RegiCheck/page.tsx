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
    Span,
    Switchs
  },
  mols: {
    Accordion,
    List
  },
  orgs: {
    LayoutContent
  }
} = AMOT;

const Top: FNC<{}> = () => {
  return (
    <Flex
      wrap={ false }
      gap={ 1 }
      padding={ 1 }
      borderBottom='normal'
      vertical='center'
    >
      <Box
        padding={ [ 0,1 ] }
      >
        <Box ssSubTitle>
          お会計
        </Box>
        <Box>
          No.12323311121
        </Box>
      </Box>
      <Input.Select
        label='会計担当'
        value={ 1 }
        list={ [
          {
            value: 1,
            label: 'スタッフA'
          },{
            value: 2,
            label: 'スタッフB'
          }
        ] }
      />
      <Box flex='auto' />
      <Flex
        gap={ 1 }
        vertical='center'
      >
        <Box
          width={ 6 }
          height={ 6 }
          borderRadius={ 2 }
          backgroundColor={ 3 }
          flexCenter
          fontSize={ 6 }
        >
          <Icon d='user' />
        </Box>
        <Box>
          <Box ssSubTitle>
            Customer Name
          </Box>
          <Box>
            sub Name
          </Box>
        </Box>
        <Button.Border
          onClick={ () => {
            Modal.add( {
              modalId: 'customer',
              type: 'right',
              header: false,
              body: 'customer details',
              footer: false
            } )
          } }
        >
          詳細
        </Button.Border>
      </Flex>
    </Flex>
  );
}


const ProductCard: FNC<{}> = () => {
  return (
    <Box
      ssCardBox
      borderRadius={ 'LBSub1' }
      backgroundColor='LBMain'
      padding={ '2/3' }
    >
      <Box
        ssSubTitle
        marginBottom={ '1/3' }
      >
        Product Name
      </Box>
      <Flex
        gap={ 1 }
        wrap={ false }
        vertical='center'
      >
        <Flex
          wrap={ false }
        >
          <Button.Border
            size="S"
            padding={ '2/3' }
          >
            <Icon d='minus' />
          </Button.Border>
          <Box
            flexCenter
            padding={ [ 0,1 ] }
          >
            1個
          </Box>
          <Button.Border
            size="S"
            padding={ '2/3' }
          >
            <Icon d='plus' />
          </Button.Border>
        </Flex>

        <Box
          flex={ 'auto' }
          textAligin='right'
        >
          ¥ 1,200
        </Box>
      </Flex>
    </Box>
  );
}

const Body: FNC<{}> = () => {
  return (
    <Flex
      flex={ 'auto' }
    >
      <Box
        flexGrid={2}
        padding={ 1 }
      >
        <Flex
          gap={ 1 }
          vertical='center'
          horizontal='between'
        >
          <Box>
            アイテム選択
          </Box>
          <Switchs
            appearance='cloud'
            name='SwitchList1'
            value={ 0 }
            list={ [
              {
                value: 0,label: <>
                  商品
                </>
              },{
                value: 1,label: <>
                  保険
                </>
              },{
                value: 3,label: <>
                  カスタム
                </>
              }
            ] }
          />
        </Flex>
        <Flex
          flexChilds='even'
          marginTop={ 2 }
          gap={ 1 }
        >
          <Box
            ssCardBox
            padding={ 1 }
          >
            Product
          </Box>
          <Box
            ssCardBox
            padding={ 1 }
          >
            Product
          </Box>
          <Box
            ssCardBox
            padding={ 1 }
          >
            Product
          </Box>
          <Box
            ssCardBox
            padding={ 1 }
          >
            Product
          </Box>
        </Flex>
      </Box>
      <Flex
        type="col"
        flexGrid={1}
        borderLeft='normal'
        backgroundColor={ 'LBReverse' }
      >
        <Flex
          type="col"
          flex={ 'auto' }
          overflow="auto"
          gap={ 1 }
          padding={ 1 }
        >
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </Flex>
        <Box
          borderTop='normal'
          padding={ 1 }
          backgroundColor={ 1 }
        >
          <Flex horizontal='between'>
            <Box>小計</Box>
            <Box>¥1,232</Box>
          </Flex>
          <Flex horizontal='between'>
            <Box>内消費税</Box>
            <Box>¥200</Box>
          </Flex>
          <Flex horizontal='between'>
            <Box>保険請求額</Box>
            <Box>¥1000</Box>
          </Flex>
          <Flex
            horizontal='between'
            marginTop={ 1 }
            fontSize={ 4 }
          >
            <Box>合計</Box>
            <Box>¥1,232</Box>
          </Flex>
          <Button.Prime
            marginTop={ 1 }
            width={ '100%' }
            onClick={ () => {
              Modal.add( {
                modalId: 'check',
                type: 'center',
                header: false,
                footer: false,
                body: <Box
                  height={ 12 }
                  flexCenter
                >
                  金額画面
                </Box>
              } )
            } }
          >
            お会計
          </Button.Prime>
        </Box>
      </Flex>
    </Flex>
  );
}

export const RegiCheck: FNC<{}> = () => {
  let [ val_events,set_events ] = useState( [] );

  return (
    <>
      <Flex
        type="col"
        className={ 'viewHeight' }
      >
        <Top />
        <Body />
      </Flex>
    </>
  );
}