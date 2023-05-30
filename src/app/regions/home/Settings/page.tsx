export { }

const {
  glob: {
    React: {
      useEffect,
      useState
    }
  },
  atoms: {
    Box,
    FontAwesomeIcon,
    Flex,
    Span,
    Grid,
    Img,
    Placeholder
  },
  mols: {
    List
  },
  fn: {
    Input,
    Buttons,
    Layout,
    Table,
    Modal,
    Loader,
    SnackBar
  }
} = amotify;

type Params = {
  request: {
    type: string
    hushoDate: string
    hushoBui: string
    hushoName: string
    gender: string
    age: string
  }
  prompt: string
  response: string
  transferredTime: number
}

export const Settings: FNC<{}> = () => {
  let [ val_messages,set_messages ] = useState( [ {
    request: {
      type: 'chatGPTサンプル',
      hushoDate: '--',
      hushoBui: '--',
      hushoName: '--',
      gender: '--',
      age: '--',
    },
    prompt: 'ここに質問した内容が入力されます',
    response: 'ここにchatGPTからの回答が入力されます',
    transferredTime: 10
  } ] as Params[] );
  // let [ val_def,set_def ] = useState( {} as DefParams );

  let formName = 'formGetSenario';

  return (
    <Layout.Plate
      padding={ 3 }
      UnderBreakPointStyles={ {
        padding: 1
      } }
    >
      <Flex
        flexType="col"
        gap={ 1 }
      >
        <Box
          fontSize='5.subTitle'
          fontWeight='3.bold'
        >
          ChatGPT シナリオ自動生成
        </Box>
        <Flex
          flexType="col"
          gap={ 1 }
          ssCardBox
          padding={ 1.5 }
        >
          <Box>
            パラメーター設定
          </Box>
          <Grid
            padding={ 1 }
            gridCols={ 2 }
            gap={ 1 }
          >
            <Input.Wrapper.Row label={ <Box freeCSS={ { width: 12 * 8 } }>・シナリオ</Box> }>
              <Input.Select
                enableUnSelected={ false }
                value={ '負傷原因' }
                list={ [
                  { value: '負傷原因',label: '負傷原因' },
                  { value: '傷病経過',label: '傷病経過' },
                  { value: '長期継続理由',label: '長期継続理由' }
                ] }
                required
                form={ formName }
                name='reason'
              />
            </Input.Wrapper.Row>

            <Input.Wrapper.Row label={ <Box freeCSS={ { width: 12 * 8 } }>・負傷日</Box> }>
              <Input.Time.Date
                value={ '2023-05-01' }
                required
                form={ formName }
                name='date'
              />
            </Input.Wrapper.Row>

            <Input.Wrapper.Row label={ <Box freeCSS={ { width: 12 * 8 } }>・負傷部位</Box> }>
              <Input.Select
                value={ '手根骨' }
                list={ [
                  { value: '左足関節',label: '左足関節' },
                  { value: '鎖骨',label: '鎖骨' },
                  { value: '膝蓋骨',label: '膝蓋骨' },
                  { value: '手根骨',label: '手根骨' },
                  { value: '大腿骨',label: '大腿骨' },
                ] }
                required
                form={ formName }
                name='bui'
              />
            </Input.Wrapper.Row>
            <Input.Wrapper.Row label={ <Box freeCSS={ { width: 12 * 8 } }>・負傷名</Box> }>
              <Input.Select
                value={ '打撲' }
                list={ [
                  { value: '骨折',label: '骨折' },
                  { value: '挫傷',label: '挫傷' },
                  { value: '捻挫',label: '捻挫' },
                  { value: '打撲',label: '打撲' },
                ] }
                required
                form={ formName }
                name='name'
              />
            </Input.Wrapper.Row>

            <Input.Wrapper.Row label={ <Box freeCSS={ { width: 12 * 8 } }>・性別</Box> }>
              <Input.List.Radio.Border
                value={ '男性' }
                list={ [
                  { value: '不明',label: '不明' },
                  { value: '男性',label: '男性' },
                  { value: '女性',label: '女性' }
                ] }
                required
                form={ formName }
                name='gender'
              />
            </Input.Wrapper.Row>
            <Input.Wrapper.Row label={ <Box freeCSS={ { width: 12 * 8 } }>・年齢</Box> }>
              <Input.Text.Number
                value={ 54 }
                required
                form={ formName }
                name='age'
                rightIndicator={ <Input.Attachment.RightIndicator>
                  歳
                </Input.Attachment.RightIndicator> }
              />
            </Input.Wrapper.Row>
          </Grid>
          <Flex
            padding={ 1 }
            horizontalAlign='right'
          >
            <Buttons.Button.Prime
              ssMiniLoader={ { color: 'white' } }
              submitOption={ {
                formName: formName,
                callback: ( form ) => {
                  $.fetch.post( {
                    key: 'getScenario',
                    url: '/chat-gpt-test',
                    body: form,
                    timeout: 1000 * 60 * 5
                  },( result ) => {
                    if ( result.ok ) {
                      console.log( result.body );

                      set_messages( [ {
                        request: {
                          type: form.reason,
                          hushoDate: form.date,
                          hushoBui: form.bui,
                          hushoName: form.name,
                          gender: form.gender,
                          age: form.age
                        },
                        ...result.body,
                        transferredTime: result.requestTime
                      },...val_messages ] );
                    } else {
                      console.log( result.body );

                      SnackBar.add( {
                        children: result.body
                      } );
                    }
                  } );
                }
              } }
            >
              Get Scenario
            </Buttons.Button.Prime>
          </Flex>
        </Flex>

        <Flex
          flexType="col"
          gap={ 1 }
          marginTop={ 3 }
        >
          <Box>
            <FontAwesomeIcon
              iconStyle='regular'
              d="arrow-down"
            />
            以下にChatGPTからのメッセージが表示されます
          </Box>

          { val_messages.map( ( date ) => {
            let {
              request,
              prompt,
              response,
              transferredTime,
            } = date;
            let Time = transferredTime.rate( 1000,2 );
            return <Flex
              flexType="col"
              gap={ '1/2' }
              ssCardBox
              padding={ 1 }
            >
              <Box>
                通信時間(秒) : { Time }s
              </Box>
              <Flex
                gap={ '1/2' }
              >
                【シナリオ】{ request.type }
                【負傷日】{ request.hushoDate }
                【負傷部位】{ request.hushoBui }
                【負傷名】{ request.hushoName }
                【性別】{ request.gender }
                【年齢】{ request.age }歳
              </Flex>
              <Flex horizontalAlign="right">
                <Flex
                  flexType="col"
                  gap={ '1/2' }
                  freeCSS={ {
                    whiteSpace: 'pre-wrap',
                    maxWidth: '75%'
                  } }
                >
                  <Flex
                    gap={ '1/2' }
                    verticalAlign="center"
                  >
                    <Img
                      src={ Env.Images.usr.incognitor.icon.S }
                      _width={ 3 }
                      _height={ 3 }
                      borderRadius={ 'sphere' }
                    /> User
                  </Flex>
                  <Box
                    backgroundColor="posi"
                    borderRadius={ 3 }
                    fontColor="white"
                    padding={ [ 1,1.5 ] }
                    boxShadow={ 2 }
                    children={ prompt }
                  />
                </Flex>
              </Flex>
              <Flex horizontalAlign="left">
                <Flex
                  flexType="col"
                  gap={ '1/2' }
                  freeCSS={ {
                    whiteSpace: 'pre-wrap',
                    maxWidth: '75%'
                  } }
                >
                  <Flex
                    gap={ '1/2' }
                    verticalAlign="center"
                  >
                    <FontAwesomeIcon
                      iconStyle='regular'
                      d="robot"
                      _width={ 3 }
                      _height={ 3 }
                      borderRadius={ 'sphere' }
                      backgroundColor='4.layer.darken'
                      fontColor="theme"
                    /> chatGPT
                  </Flex>
                  <Box
                    backgroundColor='3.layer.canvas'
                    borderRadius={ 3 }
                    padding={ [ 1,1.5 ] }
                    children={ response }
                  />
                </Flex>
              </Flex>
            </Flex>
          } ) }
        </Flex>
      </Flex>
    </Layout.Plate >
  );
}