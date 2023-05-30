const {
  glob: {
    React: {
      useState,
      useEffect
    }
  },
  atoms: {
    Box,
    Span,
    Paragraph,
    Grid,
    Flex,
    FontAwesomeIcon,
    FlexBr,
    Img,
    Placeholder
  },
  mols: {
    List,
    LinkifyText,
    Accordion
  },
  orgs: {
    Cropper
  },
  temps: {
    PlayGround
  },
  fn: {
    Layout,
    Table,
    Input,
    Buttons,
    Modal,
    SnackBar,
    Tooltips,
    Loader
  },
  minifyComponent: {
    logos: {
      MingooIcon,
      MinifyLogoV,
      MinifyLogoH,
      MinifyIcon,
      MinifyTitle,

      GoogleIcon,
      FaceBookIcon,
      LINEIcon,
      TwitterIcon
    }
  }
} = amotify;

const Basic = {
  _Origin: () => {
    return (
      <>
        <Basic.UserCustom />
        <Flex
          gap={ 1 }
        >
          <Box
            flexCenter
          >
            <Placeholder
              _width={ 6 }
              _height={ 6 }
              children={ 'Placeholder' }
              borderRadius={ 'sphere' }
            />
          </Box>
          <Grid
            gridCols={ 3 }
            gap={ 1 }
            flexSizing='auto'
          >
            <Box backgroundColor={ '1.layer.base' } padding={ 2 }>
            </Box>
            <Box backgroundColor={ '2.layer.cloud' } padding={ 2 }>
            </Box>
            <Box backgroundColor={ '3.layer.canvas' } padding={ 2 }>
            </Box>
            <Box backgroundColor={ '4.layer.darken' } padding={ 2 }>
            </Box>
            <Box backgroundColor={ '5.layer.darker' } padding={ 2 }>
            </Box>
            <Box backgroundColor={ '6.layer.darkest' } padding={ 2 }>
            </Box>
          </Grid>
          <Grid
            gridCols={ 3 }
            gap={ '1/2' }
            flexSizing='auto'
            ssCardBox
          >
            <Box flexCenter fontColor={ '1.clear' }>
              FontColor1
            </Box>
            <Box flexCenter fontColor={ '2.normal' }>
              FontColor2
            </Box>
            <Box flexCenter fontColor={ '3.blur' }>
              FontColor3
            </Box>
            <Box flexCenter fontColor={ '4.thin' }>
              FontColor4
            </Box>
            <Box flexCenter fontColor={ '5.translucent' }>
              FontColor5
            </Box>
          </Grid>
        </Flex>

        <Basic.Fonts />
        <Basic.Box />
        <Basic.Flex />
        <Basic.Grid />
        <Basic.Others />
      </>
    );
  },
  UserCustom: () => {
    return (
      <List
        ssCardBox
        rowStyles={ {
          gap: 1,
          horizontalAlign: 'between',
          verticalAlign: 'center',
          borderBottom: true,
          padding: 1
        } }
        rows={ [
          {
            children: <>
              <Box
                fontSize='5.subTitle'
                fontWeight='3.bold'
                padding={ 1 }
              >
                <FontAwesomeIcon
                  d="stop"
                  fontColor='5.translucent'
                /> Tones
              </Box>
              <Flex
                gap={ 2 }
                flexCenter
              >
                <Input.Segmented.Cloud
                  value={ amotify.config.tone }
                  flexWrap={ true }
                  list={ [
                    { value: 'Default',label: 'Default' },
                    { value: 'Angle',label: 'Angle' },
                    { value: 'Flat',label: 'Flat' },
                    { value: 'Cloud',label: 'Cloud' },
                    { value: 'Plain',label: 'Plain' },
                  ] }
                  onUpdateValidValue={ ( { value } ) => {
                    let Value = value[ 0 ];
                    $.setLocalStrageData( 'DesignTone',Value );
                    amotify.config.update.tone( Value );
                  } }
                />
              </Flex>
            </>
          },{
            children: <>
              <Box
                fontSize='5.subTitle'
                padding={ 1 }
                fontWeight='3.bold'
              >
                <FontAwesomeIcon
                  d="stop"
                  fontColor='5.translucent'
                /> Dark Mode
              </Box>
              <Input.List.Radio.IconCloud
                value={ amotify.config.darkMode }
                textAlign='left'
                list={ [
                  { value: false,label: 'Light' },
                  { value: true,label: 'Dark' },
                ] }
                flexCenter
                onUpdateValidValue={ ( { value } ) => {
                  let Value = value[ 0 ];
                  $.setLocalStrageData( 'DesignDarkMode',Value );
                  amotify.config.update.darkMode( Value );
                } }
              />
            </>
          },{
            children: <>
              <Box
                fontSize='5.subTitle'
                padding={ 1 }
                fontWeight='3.bold'
              >
                <FontAwesomeIcon d="stop" fontColor='5.translucent' /> Theme Color
              </Box>
              <Input.Wrapper.Normal
                label='enter Numeral 0 to 47'
              >
                <Input.Text.Number
                  value={ amotify.config.themeColor }
                  textAlign='left'
                  onUpdateValidValue={ ( { value } ) => {
                    let Value = Number( value );
                    $.setLocalStrageData( 'DesignTheme',Value );
                    amotify.config.update.themeColor( Value );
                  } }
                />
              </Input.Wrapper.Normal>
            </>
          }
        ] }
      />
    );
  },
  Fonts: () => {
    return (
      <Box ssCardBox>
        <Box ssCardBoxHeader>
          Font
        </Box>
        <Box ssCardBoxBody
          overflow='auto'>
          <Box
            freeCSS={ { whiteSpace: 'pre-wrap' } }
            padding={ 1 }
          >
            {
              `<Box
  fontSize={ 0 ~ 8 }
>
  some text
</Box>
            `
            }
          </Box>
          <List
            rowStyles={ {
              flexType: 'col',
              borderBottom: true,
              padding: 1,
              flexWrap: false,
              gap: '1/2',
              // horizontalAlign: 'between',
              // verticalAlign: 'center'
            } }
            rows={ [
              {
                children: <>
                  <Box>
                    <FontAwesomeIcon d="stop" /> Landing
                  </Box>
                  <Box fontSize='7.landing'>
                    財務省
                  </Box>
                </>
              },{
                children: <>
                  <Box>
                    <FontAwesomeIcon d="stop" /> Title
                  </Box>
                  <Box fontSize='6.title'>
                    令和４年度の国民負担率を公表します
                  </Box>
                </>
              },{
                children: <>
                  <Box>
                    <FontAwesomeIcon d="stop" /> SubTitle
                  </Box>
                  <Box fontSize='5.subTitle'>
                    支払いを受け付ける
                  </Box>
                </>
              },{
                children: <>
                  <Box>
                    <FontAwesomeIcon d="stop" /> ThirdTitle
                  </Box>
                  <Box fontSize='4.thirdTitle'>
                    租税負担率と社会保障負担率を合計した国民負担率について、令和４年度の見通しを推計しましたので、公表します。
                  </Box>
                </>
              },{
                children: <>
                  <Box>
                    <FontAwesomeIcon d="stop" /> Paragraph
                  </Box>
                  <Box
                    fontSize='3.paragraph'
                    freeCSS={ {
                      whiteSpace: 'pre-wrap'
                    } }
                  >
                    <LinkifyText
                      text={ `
This article discusses performance best practices for fonts. There are a variety of ways in which web fonts impact performance:

https://google.com
                      `}
                    />
                  </Box>
                </>
              },{
                children: <>
                  <Box>
                    <FontAwesomeIcon d="stop" /> Normal
                  </Box>
                  <Box fontSize='2.normal'>
                    効率的で持続可能な財政への転換を図り、この財政構造を各般の構造改革とともに推進することで、民間需要主導の持続的経済成長の実現を目指します。
                    少子・高齢化、国際化など経済社会の構造変化に対応できる21世紀のあるべき税制をきずきます。
                    財政投融資は、行財政改革の趣旨を踏まえ、民間ではできない分野・事業などに重点化を行い、真に政策的に必要な資金需要には的確に対応します。
                    金融庁と協力し、金融のセーフティネットを整備し、金融危機に素早く対応するなど、金融システムの安定の確保を目指します。
                    国際的な協力等に積極的に取り組むことにより、国際通貨システムの安定・国際貿易の秩序ある発展を目指します。
                  </Box>
                </>
              },{
                children: <>
                  <Box>
                    <FontAwesomeIcon d="stop" /> Mini
                  </Box>
                  <Box fontSize='1.mini'>
                    Copyright © Ministry of Finance Japan. All Rights Reserved.
                  </Box>
                </>
              }
            ] }
          />
        </Box>
      </Box>
    );
  },
  Box: () => {
    return (
      <Box ssCardBox>
        <Box
          ssCardBoxHeader
          children={ 'Box' }
        />
        <Box
          ssCardBoxBody
          overflow='auto'
          padding={ 0 }
        >
          <Table.Normal
            ssCardBox={ false }
            tone='cellBorder'
            borderRadius={ 0 }
            _height='100%'
            colLength={ 2 }
            head={ false }
            rows={ [
              [
                {
                  children: <>
                    <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                      {
                        `<Box>
helloWorld!!
</Box>`
                      }
                    </Box>
                  </>
                },{
                  children: <Box> helloWorld!! </Box>
                }
              ],[
                {
                  children: <>
                    <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                      {
                        `<Box
children={ 'helloWorld!!' }
/>`
                      }
                    </Box>
                  </>
                },{
                  children: <>
                    <Box children={ 'helloWorld!!' } />
                  </>
                }
              ],[
                {
                  children: <>
                    <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                      {
                        `<Box
fontColor={ '4.thin' }
padding={ 1 }
margin={ 1 }
textAlign='center'
borderRadius={ 2 }
border={ 'normal' }
children={ 'styleBox' }
/>
`
                      }
                    </Box>
                  </>
                },{
                  children: <>
                    <Box
                      fontColor={ '4.thin' }
                      padding={ 1 }
                      margin={ 1 }
                      textAlign='center'
                      borderRadius={ 2 }
                      border
                      children={ 'styleBox' }
                    />
                  </>
                }
              ]
            ] }
          />
        </Box>
      </Box>
    );
  },
  Flex: () => {
    return (
      <Box ssCardBox>
        <Box
          ssCardBoxHeader
          children={ 'Flex' }
        />
        <Box
          ssCardBoxBody
          overflow='auto'
          padding={ 0 }
        >
          <Table.Normal
            ssCardBox={ false }
            colLength={ 2 }
            tone='cellBorder'
            borderRadius={ 0 }
            _height='100%'
            head={ false }
            rows={ [
              [
                {
                  children: <>
                    <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                      {
                        `<Flex flexType='row' gap={ 1 }>
  <Box children={ 'FlexBox1' } />
  <Box children={ 'FlexBox2' } />
  <Box children={ 'FlexBox3' } />
  </Flex>`
                      }
                    </Box>
                  </>
                },{
                  children: <>
                    <Flex
                      flexType='row'
                      gap={ 1 }
                      fontColor='theme'
                    >
                      <Box
                        padding={ 1 }
                        borderRadius={ 1 }
                        flexCenter
                        children={ 'FlexBox1' }
                        backgroundColor='tcOpLow'
                      />
                      <Box
                        padding={ 1 }
                        borderRadius={ 1 }
                        flexCenter
                        children={ 'FlexBox2' }
                        backgroundColor='tcOpMiddle'
                      />
                      <Box
                        padding={ 1 }
                        borderRadius={ 1 }
                        flexCenter
                        children={ 'FlexBox3' }
                        backgroundColor='tcOpHigh'
                      />
                    </Flex>
                  </>
                }
              ],[
                {
                  children: <>
                    <Box freeCSS={ { whiteSpace: 'pre-wrap' } } textAlign="left">
                      {
                        `<Flex
  flexType='col'
  flexChilds={ 'auto' }
>
  <Box />
  <Box />
  ...
</Flex>`
                      }
                    </Box>
                  </>
                },{
                  children: <>
                    <Flex
                      gap={ 1 }
                      flexCenter
                    >
                      <Box
                        flexCenter _width={ 3 } _height={ 3 } borderRadius={ 'sphere' }
                        boxShadow={ 1 }
                        backgroundColor='tcLightest'
                      />
                      <Box
                        flexCenter _width={ 3 } _height={ 3 } borderRadius={ 'sphere' }
                        boxShadow={ 1 }
                        backgroundColor='tcLighter'
                      />
                      <Box
                        flexCenter _width={ 3 } _height={ 3 } borderRadius={ 'sphere' }
                        boxShadow={ 1 }
                        backgroundColor='tcLighten'
                      />
                      <Box
                        flexCenter _width={ 3 } _height={ 3 } borderRadius={ 'sphere' }
                        boxShadow={ 1 }
                        backgroundColor='theme'
                      />
                      <Box
                        flexCenter _width={ 3 } _height={ 3 } borderRadius={ 'sphere' }
                        boxShadow={ 1 }
                        backgroundColor='tcDarken'
                      />
                      <Box
                        flexCenter _width={ 3 } _height={ 3 } borderRadius={ 'sphere' }
                        boxShadow={ 1 }
                        backgroundColor='tcDarker'
                      />
                      <Box
                        flexCenter _width={ 3 } _height={ 3 } borderRadius={ 'sphere' }
                        boxShadow={ 1 }
                        backgroundColor='tcDarkest'
                      />
                    </Flex>
                    <Flex
                      gap={ 1 }
                      flexCenter
                    >
                      <Box
                        flexCenter _width={ 3 } _height={ 3 } borderRadius={ 'sphere' }
                        boxShadow={ 1 }
                        backgroundColor='1.layer.base'
                      />
                      <Box
                        flexCenter _width={ 3 } _height={ 3 } borderRadius={ 'sphere' }
                        boxShadow={ 1 }
                        backgroundColor='2.layer.cloud'
                      />
                      <Box
                        flexCenter _width={ 3 } _height={ 3 } borderRadius={ 'sphere' }
                        boxShadow={ 1 }
                        backgroundColor='3.layer.canvas'
                      />
                      <Box
                        flexCenter _width={ 3 } _height={ 3 } borderRadius={ 'sphere' }
                        boxShadow={ 1 }
                        backgroundColor='4.layer.darken'
                      />
                      <Box
                        flexCenter _width={ 3 } _height={ 3 } borderRadius={ 'sphere' }
                        boxShadow={ 1 }
                        backgroundColor='5.layer.darker'
                      />
                      <Box
                        flexCenter _width={ 3 } _height={ 3 } borderRadius={ 'sphere' }
                        boxShadow={ 1 }
                        backgroundColor='6.layer.darkest'
                      />
                    </Flex>
                  </>
                }
              ],[
                {
                  children: <>
                    <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                      {
                        `<Flex gap={ 1 }>
  <Box flexGrid={ 2 } ... />
  <Box flexGrid={ 3 } ... />
  <Box flexGrid={ 4 } ... />
  </Flex>`
                      }
                    </Box>
                  </>
                },{
                  children: <>
                    <Flex
                      gap={ 1 }
                      fontColor='white'
                    >
                      <Box
                        padding={ 1 }
                        flexCenter
                        borderRadius={ 1 }
                        backgroundColor='posi'
                        flexGrid={ 2 }
                        children={ 'Box1' }
                      />
                      <Box
                        padding={ 1 }
                        flexCenter
                        borderRadius={ 1 }
                        backgroundColor='nega'
                        flexGrid={ 3 }
                        children={ 'Box2' }
                      />
                      <Box
                        padding={ 1 }
                        flexCenter
                        borderRadius={ 1 }
                        backgroundColor='warn'
                        flexGrid={ 4 }
                        children={ 'Box3' }
                      />
                    </Flex>
                  </>
                }
              ]
            ] }
          />
        </Box>
      </Box>
    );
  },
  Grid: () => {
    return (
      <Box ssCardBox>
        <Box
          ssCardBoxHeader
          children={ 'Grid' }
        />
        <Box
          ssCardBoxBody
          overflow='auto'
          padding={ 0 }
        >
          <Table.Normal
            ssCardBox={ false }
            colLength={ 2 }
            tone='cellBorder'
            _height={ '100%' }
            backgroundColor='nega'
            borderRadius={ 0 }
            head={ false }
            rows={ [
              [
                {
                  children: <>
                    <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                      {
                        `<Grid gridCols={ 3 } gap={ 1 }>
<Box children={ 'GridBox1' } />
<Box children={ 'GridBox2' } />
<Box children={ 'GridBox3' } />
<Box children={ 'GridBox4' } />
<Box children={ 'GridBox5' } />
<Box children={ 'GridBox6' } />
</Grid>`
                      }
                    </Box>
                  </>
                },
                {
                  children: <>
                    <Grid gridCols={ 3 } gap={ 1 }>
                      <Box border padding={ 1 } backgroundColor={ '1.layer.base' } children={ 'GridBox1' } />
                      <Box border padding={ 1 } backgroundColor={ '2.layer.cloud' } children={ 'GridBox2' } />
                      <Box border padding={ 1 } backgroundColor={ '3.layer.canvas' } children={ 'GridBox3' } />
                      <Box border padding={ 1 } backgroundColor={ '4.layer.darken' } children={ 'GridBox4' } />
                      <Box border padding={ 1 } backgroundColor={ '5.layer.darker' } children={ 'GridBox5' } />
                      <Box border padding={ 1 } backgroundColor={ '6.layer.darkest' } children={ 'GridBox6' } />
                    </Grid>
                  </>
                }
              ]
            ] }
          />
        </Box>
      </Box>
    );
  },
  Others: () => {
    return (
      <Box ssCardBox>
        <Box
          ssCardBoxHeader
          children={ 'Others' }
        />
        <Box
          ssCardBoxBody
          overflow='auto'
          padding={ 0 }
        >
          <Table.Normal
            ssCardBox={ false }
            colLength={ 2 }
            tone='cellBorder'
            _height={ '100%' }
            borderRadius={ 0 }
            head={ false }
            rows={ [
              [
                {
                  children: <>
                    <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                      { `<FontAwesomeIcon children='ufo' />
<FontAwesomeIcon children='cheese' />
<FontAwesomeIcon>user-circle</FontAwesomeIcon>
<FontAwesomeIcon>fab facebook</FontAwesomeIcon>`
                      }
                    </Box>
                  </>
                },
                {
                  children: <>
                    <FontAwesomeIcon d='ufo' />
                    <br />
                    <FontAwesomeIcon d='cheese' />
                    <br />
                    <FontAwesomeIcon d='user-circle' />
                    <br />
                    <FontAwesomeIcon d='fab facebook' />
                  </>
                }
              ],[
                {
                  children: <>
                    <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                      {
                        `
<Buttons.Label
htmlFor='testAccordion'
type='sub'
children={ 'ToggleButton' }
/>
<Accordion
id='testAccordion'
open
children={
  <>
    in Accordion Element
  </>
}
/>`
                      }
                    </Box>
                  </>
                },
                {
                  children: <>
                    <Buttons.Label.Sub
                      children={ 'ToggleButton' }
                      onClick={ () => {
                        Accordion.fn.toggle( 'testAccordion' );
                      } }
                    />
                    <Accordion
                      accordionId={ 'testAccordion' }
                      open
                      children={
                        <>
                          in Accordion Element
                        </>
                      }
                    />
                  </>
                }
              ],[
                {
                  children: <>
                    <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                      {
                        `
<Img
max_Height={ 8 }
maxWidth={ 8 }
src='...'
alt='noImage'
/>
                          `
                      }
                    </Box>
                  </>
                },
                {
                  children: <>
                    <Img
                      src={ Env.Images.usr.icon.R }
                      alt='noImage'
                      freeCSS={ {
                        maxHeight: 12 * 8,
                        maxWidth: 12 * 8
                      } }
                    />
                  </>
                }
              ]
            ] }
          />
        </Box>
      </Box>
    );
  }
}

const Logos = {
  _Origin: () => {
    return (
      <>
        <Logos.Minify />
        <Logos.Mingoo />
        <Logos.Google />
        <Logos.Facebook />
        <Logos.Line />
        <Logos.Twitter />
      </>
    );
  },
  Minify: () => {
    return (
      <Box ssCardBox>
        <Box
          ssCardBoxHeader
          children={ 'Minify' }
        />
        <Box
          ssCardBoxBody
          overflow='auto'
          padding={ 0 }
        >
          <Table.Normal
            ssCardBox={ false }
            colLength={ 2 }
            tone='cellBorder'
            _height='100%'
            borderRadius={ 0 }
            head={ false }
            rows={ [
              [
                {
                  children: <>
                    <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                      {
                        `<MinifyIcon size='S' />
<MinifyIcon size='R' />
<MinifyIcon size='L' /><MinifyIcon size='2L' />
<MinifyIcon size='3L' />`
                      }
                    </Box>
                  </>
                },
                {
                  children: <>
                    <Flex verticalAlign='center' gap={ 2 }>
                      <MinifyIcon size='S' />
                      <MinifyIcon size='R' />
                      <MinifyIcon size='L' />
                      <MinifyIcon size='2L' />
                      <MinifyIcon size='3L' />
                    </Flex>
                  </>
                }
              ],[
                {
                  children: <>
                    <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                      {
                        `<MinifyTitle size='S' />
<MinifyTitle size='R' />
<MinifyTitle size='L' />
<MinifyTitle size='2L' />
<MinifyTitle size='3L' />`
                      }
                    </Box>
                  </>
                },
                {
                  children: <>
                    <Flex verticalAlign='center' gap={ 2 }>
                      <MinifyTitle size='S' />
                      <MinifyTitle size='R' />
                      <MinifyTitle size='L' />
                      <MinifyTitle size='2L' />
                      <MinifyTitle size='3L' />
                    </Flex>
                  </>
                }
              ],[
                {
                  children: <>
                    <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                      {
                        `<MinifyTitle size='S' />
<MinifyTitle size='R' />
<MinifyTitle size='L' />
<MinifyTitle size='2L' />
<MinifyTitle size='3L' />`
                      }
                    </Box>
                  </>
                },
                {
                  children: <>
                    <Flex flexType='row' horizontalAlign='left' verticalAlign='center' gap={ 2 }>
                      <MinifyLogoH size='S' />
                      <MinifyLogoH size='R' />
                      <MinifyLogoH size='L' />
                      <MinifyLogoH size='2L' />
                      <MinifyLogoH size='3L' />
                    </Flex>
                  </>
                }
              ],[
                {
                  children: <>
                    <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                      {
                        `<MinifyLogoV size='S' />
<MinifyLogoV size='R' />
<MinifyLogoV size='L' />
<MinifyLogoV size='2L' />
<MinifyLogoV size='3L' />`
                      }
                    </Box>
                  </>
                },
                {
                  children: <>
                    <Flex flexType='row' gap={ 2 }>
                      <MinifyLogoV size='S' />
                      <MinifyLogoV size='R' />
                      <MinifyLogoV size='L' />
                      <MinifyLogoV size='2L' />
                      <MinifyLogoV size='3L' />
                    </Flex>
                  </>
                }
              ]
            ] }
          />
        </Box>
      </Box>
    );
  },
  Mingoo: () => {
    return (
      <Box ssCardBox>
        <Box
          ssCardBoxHeader
          children={ 'Mingoo' }
        />
        <Box
          ssCardBoxBody
          overflow='auto'
          padding={ 0 }
        >
          <Flex
            verticalAlign="center"
            horizontalAlign='center'
            gap={ 2 }
            padding={ 2 }
            flexType="col"
          >
            <MingooIcon size='S' />
            <MingooIcon size='R' />
            <MingooIcon size='L' />
            <MingooIcon size='2L' />
            <MingooIcon size='3L' />
          </Flex>
        </Box>
      </Box>
    );
  },
  Google: () => {
    return (
      <Box ssCardBox>
        <Box
          ssCardBoxHeader
          children={ 'Google' }
        />
        <Box
          ssCardBoxBody
          overflow='auto'
          padding={ 0 }
        >
          <Flex
            verticalAlign="center"
            horizontalAlign='center'
            gap={ 2 }
            padding={ 2 }
            flexType="col"
          >
            <GoogleIcon size='S' />
            <GoogleIcon size='R' />
            <GoogleIcon size='L' />
            <GoogleIcon size='2L' />
            <GoogleIcon size='3L' />
          </Flex>
        </Box>
      </Box>
    );
  },
  Facebook: () => {
    return (
      <Box ssCardBox>
        <Box
          ssCardBoxHeader
          children={ 'Facebook' }
        />
        <Box
          ssCardBoxBody
          overflow='auto'
          padding={ 0 }
        >
          <Flex
            verticalAlign="center"
            horizontalAlign='center'
            gap={ 2 }
            padding={ 2 }
            flexType="col"
          >
            <FaceBookIcon size='S' />
            <FaceBookIcon size='R' />
            <FaceBookIcon size='L' />
            <FaceBookIcon size='2L' />
            <FaceBookIcon size='3L' />
          </Flex>
        </Box>
      </Box>
    );
  },
  Line: () => {
    return (
      <Box ssCardBox>
        <Box
          ssCardBoxHeader
          children={ 'LINE' }
        />
        <Box
          ssCardBoxBody
          overflow='auto'
          padding={ 0 }
        >
          <Flex
            verticalAlign="center"
            horizontalAlign='center'
            gap={ 2 }
            padding={ 2 }
            flexType="col"
          >
            <LINEIcon size='S' />
            <LINEIcon size='R' />
            <LINEIcon size='L' />
            <LINEIcon size='2L' />
            <LINEIcon size='3L' />
          </Flex>
        </Box>
      </Box>
    );
  },
  Twitter: () => {
    return (
      <Box ssCardBox>
        <Box
          ssCardBoxHeader
          children={ 'Twitter' }
        />
        <Box
          ssCardBoxBody
          overflow='auto'
          padding={ 0 }
        >
          <Flex
            verticalAlign="center"
            horizontalAlign='center'
            gap={ 2 }
            padding={ 2 }
            flexType="col"
          >
            <TwitterIcon size='S' />
            <TwitterIcon size='R' />
            <TwitterIcon size='L' />
            <TwitterIcon size='2L' />
            <TwitterIcon size='3L' />
          </Flex>
        </Box>
      </Box>
    );
  }
}


const Effections = {
  _Origin: () => {
    return (
      <>
        <Effections.Ripple />
        <Effections.Shrink />
        <Effections.Pudding />
        <Effections.Expand />
        <Effections.Clipboard />
        <Effections.Loader />
        <Effections.Tooltips />
        <Effections.SnackBar />
      </>
    );
  },
  Ripple: () => {
    return (
      <Box ssCardBox>
        <Box
          ssCardBoxHeader
          children={ 'Ripple' }
        />
        <Box ssCardBoxBody
          overflow='auto'>
          <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
            {
              `<Button
  ssEffectsOnActive={ 'ripple.( cloud | theme | nega | posi | warn )' }
/>`
            }
          </Box>
        </Box>
        <Flex
          ssCardBoxFooter
          gap={ 1 }
        >
          <Buttons.Button.Prime
            ssEffectsOnActive={ [ 'ripple.cloud' ] }
            children={ 'Cloud' }
          />
          <Buttons.Button.Border
            children={ 'Theme' }
            ssEffectsOnActive={ [ 'ripple.theme' ] }
          />
          <Buttons.Button.Border
            children={ 'Nega' }
            ssEffectsOnActive={ 'ripple.nega' }
          />
          <Buttons.Button.Border
            children={ 'Posi' }
            ssEffectsOnActive={ 'ripple.posi' }
          />
          <Buttons.Button.Border
            children={ 'Warn' }
            ssEffectsOnActive={ 'ripple.warn' }
          />
        </Flex>
      </Box>
    );
  },
  Shrink: () => {
    return (
      <Box ssCardBox>
        <Box
          ssCardBoxHeader
          children={ 'Shrink' }
        />
        <Box ssCardBoxBody
          overflow='auto'>
          <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
            {
              `<Button
    ssEffectsOnActive={ 'shrink' }
/>`
            }
          </Box>
        </Box>
        <Box ssCardBoxFooter>
          <Buttons.Button.Prime
            children={ 'Button' }
            ssEffectsOnActive={ 'shrink' }
          />
        </Box>
      </Box>
    )
  },
  Pudding: () => {
    return (
      <Box ssCardBox>
        <Box
          ssCardBoxHeader
          children={ 'Pudding' }
        />
        <Box ssCardBoxBody
          overflow='auto'>
          <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
            {
              `<Button
  ssEffectsOnActive={ 'pudding' }
/>`
            }
          </Box>
        </Box>
        <Box ssCardBoxFooter>
          <Buttons.Button.Prime
            children={ 'Button' }
            ssEffectsOnActive={ 'pudding' }
          />
        </Box>
      </Box>
    )
  },
  Expand: () => {
    return (
      <Box ssCardBox>
        <Box
          ssCardBoxHeader
          children={ 'Expand' }
        />
        <Box ssCardBoxBody
          overflow='auto'>
          <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
            {
              `<Button
  ssEffectsOnActive={ 'expand' }
/>`
            }
          </Box>
        </Box>
        <Box ssCardBoxFooter>
          <Buttons.Button.Prime
            children={ 'Button' }
            ssEffectsOnActive={ 'expand' }
          />
        </Box>
      </Box>
    )
  },
  Clipboard: () => {
    return (
      <Box ssCardBox>
        <Box
          ssCardBoxHeader
          children={ 'ClipBoardCopy' }
        />
        <Box ssCardBoxBody
          overflow='auto'>
          <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
            {
              `<Buttons.Button.Prime
  copyToClipboard={ {
    data: () => {
      return { some string }
    }
  } }
/>`
            }
          </Box>
        </Box>
        <Box ssCardBoxFooter>
          <Buttons.Button.Prime
            children={ 'Button' }
            ssEffectsOnActive={ 'pudding' }
            copyToClipboard={ {
              data: () => {
                return 'helloWorld!!!' + $.Time().toFormatYMDHMS();
              }
            } }
          />
        </Box>
      </Box>
    )
  },
  Loader: () => {
    return (
      <Box ssCardBox>
        <Box
          ssCardBoxHeader
          children={ 'Loader( when call $.fetch() )' }
        />
        <Box ssCardBoxBody
          overflow='auto'>
          <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
            {
              `<Button
  type='main'
  children={ 'Button' }
  miniLoader={ 'theme' }
  onClick={ () => {
    Loader.fn.active( [ 'corner','mini' ] );
    setTimeout( () => {
      Loader.stop();
    },2500 );
  } }
/>`
            }
          </Box>
        </Box>
        <Flex
          ssCardBoxFooter
          gap={ 1 }
        >
          <Buttons.Button.Prime
            children={ 'mini Loader' }
            ssMiniLoader={ {
              color: 'white'
            } }
            onClick={ () => {
              Loader.fn.active( [ 'corner','mini' ] );
              setTimeout( () => {
                Loader.fn.stop();
              },2500 );
            } }
          />
          <Buttons.Button.Prime
            children={ 'top Loader' }
            onClick={ () => {
              Loader.fn.active( [ 'top' ] );
              setTimeout( () => {
                Loader.fn.stop();
              },3000 );
            } }
          />
        </Flex>
      </Box>
    )
  },
  Tooltips: () => {
    return (
      <Box ssCardBox>
        <Box ssCardBoxHeader>
          ToolTips
        </Box>
        <Flex
          gap={ [ 1,2 ] }
          flexChilds={ 'auto' }
          ssCardBoxBody
          overflow='auto'
        >
          <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
            {
              `ssTooltips={ {
  position: $Position,
  content: ReactElement,
  editable?: boolean
} }
$Position = topLeft | topRight |
bottomLeft | bottomRight |
centerLeft | centerRight
`
            }
          </Box>
        </Flex>
        <Box ssCardBoxFooter>
          <Flex gap={ 1 }>
            <Buttons.Button.Border
              ssTooltips={ {
                type: 'topLeft',
                backgroundColor: 'nega',
                fontSize: '3.paragraph',
                padding: 2,
                children: <>
                  <Flex flexType='col' gap={ 1 }>
                    Top Left Position
                    <Img
                      src={ Env.Images.usr.icon.R }
                      alt=''
                      freeCSS={ {
                        maxWidth: 12 * 12
                      } }
                    />
                  </Flex>
                </>
              } }
              children={ <FontAwesomeIcon d="arrow-up-left" /> }
            />
            <Buttons.Button.Border
              ssTooltips={ {
                type: 'topRight',
                children: 'Top Right position'
              } }
              children={ <FontAwesomeIcon d="arrow-up-right" /> }
            />
            <Buttons.Button.Border
              ssTooltips={ {
                type: 'bottomLeft',
                children: 'Bottom Left Position'
              } }
              children={ <FontAwesomeIcon d="arrow-down-left" /> }
            />
            <Buttons.Button.Border
              ssTooltips={ {
                type: 'bottomRight',
                children: 'Bottom Right position'
              } }
              children={ <FontAwesomeIcon d="arrow-down-right" /> }
            />
            <Buttons.Button.Border
              ssTooltips={ {
                type: 'centerLeft',
                children: 'Center Left position'
              } }
              children={ <FontAwesomeIcon d="arrow-left" /> }
            />
            <Buttons.Button.Border
              ssTooltips={ {
                type: 'centerRight',
                children: 'Center Right position'
              } }
              children={ <FontAwesomeIcon d="arrow-right" /> }
            />
          </Flex>
        </Box>
      </Box>
    )
  },
  SnackBar: () => {
    return (
      <Box ssCardBox>
        <Box
          ssCardBoxHeader
          children={ 'SnackBars' }
        />
        <Box
          ssCardBoxBody
          overflow='auto'
          padding={ 0 }
        >
          <Table.Normal
            ssCardBox={ false }
            colLength={ 2 }
            tone='cellBorder'
            _height='100%'
            borderRadius={ 0 }
            head={ false }
            rows={ [
              [
                {
                  children: <>
                    <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                      {
                        `SnackBar.add({
  children: 'hello World!!' + uuid
})`
                      }
                    </Box>
                  </>
                },{
                  children: <>
                    <Buttons.Button.Prime
                      children={ 'plain' }
                      onClick={ () => {
                        let uuid = $.uuidGen( 16 );
                        SnackBar.add( {
                          children: 'hello World!!' + uuid
                        } );
                      } }
                    />
                  </>
                }
              ],[
                {
                  children: <>
                    <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                      {
                        `SnackBar.add({
  secondsToClose: 30,
  disableCloseButton: true,
  children: ReactElement
})`
                      }
                    </Box>
                  </>
                },{
                  children: <>
                    <Buttons.Button.Prime
                      children={ 'plain' }
                      onClick={ () => {
                        SnackBar.add( {
                          secondsToClose: 30,
                          disableCloseButton: true,
                          children: <Flex
                            horizontalAlign='between'
                            verticalAlign='baseline'
                            gap={ 1 }
                            paddingLeft={ '2/3' }
                          >
                            予約時間が更新されました
                            <Buttons.Button.Clear
                              color='white'
                              size='S'
                              fontColor={ 'posi' }
                            >
                              元に戻す
                            </Buttons.Button.Clear>
                          </Flex>
                        } );
                      } }
                    />
                  </>
                }
              ],[
                {
                  type: 'td',
                  children: <>
                    <Box
                      freeCSS={ { whiteSpace: 'pre-wrap' } }
                      textAlign='left'
                    >
                      {
                        `SnackBar.add({
custom: true,
children: JSX.Element
});`
                      }
                    </Box>
                  </>
                },{
                  children: <>
                    <Buttons.Button.Prime
                      children={ 'message' }
                      onClick={ () => {
                        SnackBar.add( {
                          custom: true,
                          children: ( { onCloseCallBack } ) => {
                            return (
                              <Flex
                                flexType='col'
                                gap={ 1 }
                                padding={ 1 }
                              >
                                <Box>
                                  Some Text,
                                  Some Text,
                                  Some Text,
                                </Box>
                                <Flex
                                  gap={ 1 }
                                  horizontalAlign='between'
                                >
                                  <Buttons.Button.Clear
                                    backgroundColor={ 'lcOpLow' }
                                    fontColor={ 'white' }
                                    onClick={ onCloseCallBack }
                                    padding={ [ '2/3',1 ] }
                                    children={ '閉じる' }
                                  />
                                  <Buttons.Anchor.Prime
                                    href='https://google.com'
                                    padding={ [ '2/3',1 ] }
                                    children={ '詳細へ' }
                                  />
                                </Flex>
                              </Flex>
                            );
                          }
                        } );
                      } }
                    />
                  </>
                }
              ]
            ] }
          />
        </Box>
      </Box>
    )
  }
}

const Button = {
  _Origin: () => {
    return (
      <>
        <Button.Tone />
        <Button.Types />
        <Button.Segmented />
      </>
    );
  },
  Tone: () => {
    return (
      <Box ssCardBox>
        <Box
          ssCardBoxHeader
          children={ 'Tone' }
        />
        <Box
          ssCardBoxBody
          overflow='auto'
          padding={ 0 }
        >
          <Table.Normal
            ssCardBox={ false }
            colLength={ 2 }
            tone='cellBorder'
            _height='100%'
            borderRadius={ 0 }
            head={ false }
            rows={ [
              [
                {
                  children: <>
                    <Box
                      freeCSS={ { whiteSpace: 'pre-wrap' } }
                      textAlign="left"
                    >
                      <Box
                        fontSize={ '3.paragraph' }
                        fontWeight={ '3.bold' }
                        padding={ [ 1,0 ] }
                        children={ '・Prime' }
                      />
                      {
                        `<Buttons.Button.Prime
color={ $Color }
...
/>
<Buttons.Label.Prime ... />
<Buttons.Link.Prime ... />

$Color = theme | posi | nega | warn | cloud | mono`
                      }
                    </Box>
                  </>
                },{
                  children: <>
                    <Box
                      freeCSS={ {
                        display: 'inline-block'
                      } }
                    >
                      <Grid
                        gridCols={ 3 }
                        gap={ 1 }
                        padding={ 1 }
                      >
                        <Buttons.Button.Prime
                          color='theme'
                          children={ 'theme' }
                        />
                        <Buttons.Button.Prime
                          color='posi'
                          borderRadius={ 'sphere' }
                          children={ 'posi' }
                        />
                        <Buttons.Button.Prime
                          color='nega'
                          children={ 'nega' }
                        />
                        <Buttons.Button.Prime
                          color='warn'
                          children={ 'warn' }
                        />
                        <Buttons.Button.Prime
                          color='mono'
                          borderRadius={ 0 }
                          children={ 'mono' }
                        />
                      </Grid>
                    </Box>
                  </>
                }
              ],[
                {
                  children: <>
                    <Box
                      freeCSS={ { whiteSpace: 'pre-wrap' } }
                      textAlign="left"
                    >
                      <Box
                        fontSize={ '3.paragraph' }
                        fontWeight={ '3.bold' }
                        padding={ [ 1,0 ] }
                        children={ '・Sub' }
                      />
                      {
                        `<Buttons.Button.Sub
color={ $Color }
...
/>

$Color = theme | posi | nega | warn | mono`
                      }
                    </Box>
                  </>
                },{
                  children: <>
                    <Box
                      freeCSS={ {
                        display: 'inline-block'
                      } }
                    >
                      <Grid
                        gridCols={ 3 }
                        gap={ 1 }
                        padding={ 1 }
                      >
                        <Buttons.Button.Sub
                          color='theme'
                          children={ 'theme' }
                        />
                        <Buttons.Button.Sub
                          color='posi'
                          children={ 'posi' }
                        />
                        <Buttons.Button.Sub
                          color='nega'
                          children={ 'nega' }
                        />
                        <Buttons.Button.Sub
                          color='warn'
                          children={ 'warn' }
                        />
                        <Buttons.Button.Sub
                          color='cloud'
                          children={ 'cloud' }
                        />
                      </Grid>
                    </Box>
                  </>
                }
              ],[
                {
                  children: <>
                    <Box
                      freeCSS={ { whiteSpace: 'pre-wrap' } }
                      textAlign="left"
                    >
                      <Box
                        fontSize={ '3.paragraph' }
                        fontWeight={ '3.bold' }
                        padding={ [ 1,0 ] }
                        children={ '・Clear' }
                      />
                      {
                        `<Buttons.Button.Clear
color={ $Color }
...
/>

$Color = theme | posi | nega | warn | mono | white`
                      }
                    </Box>
                  </>
                },{
                  children: <>
                    <Box
                      freeCSS={ {
                        display: 'inline-block'
                      } }
                    >
                      <Grid
                        gridCols={ 3 }
                        gap={ 1 }
                        padding={ 1 }
                      >
                        <Buttons.Button.Clear
                          color='theme'
                          children={ 'theme' }
                        />
                        <Buttons.Button.Clear
                          color='posi'
                          children={ 'posi' }
                        />
                        <Buttons.Button.Clear
                          color='nega'
                          children={ 'nega' }
                        />
                        <Buttons.Button.Clear
                          color='warn'
                          children={ 'warn' }
                        />
                        <Buttons.Button.Clear
                          color='mono'
                          children={ 'mono' }
                        />
                      </Grid>
                    </Box>
                  </>
                }
              ],[
                {
                  children: <>
                    <Box
                      freeCSS={ { whiteSpace: 'pre-wrap' } }
                      textAlign="left"
                    >
                      <Box
                        fontSize={ '3.paragraph' }
                        fontWeight={ '3.bold' }
                        padding={ [ 1,0 ] }
                        children={ '・FillToOutLined' }
                      />
                      {
                        `<Buttons.Button.UniqueStyle.FillToOutLined
color={ $Color }
...
/>
<Buttons.Label.Prime ... />
<Buttons.Link.Prime ... />

$Color = theme | posi | nega | warn | mono | white`
                      }
                    </Box>
                  </>
                },{
                  children: <>
                    <Box freeCSS={ {
                      display: 'inline-block'
                    } }>
                      <Grid
                        gridCols={ 3 }
                        gap={ 1 }
                        padding={ 1 }
                      >
                        <Buttons.Button.UniqueStyle.FillToBorder
                          color='theme'
                          children={ 'theme' }
                        />
                        <Buttons.Button.UniqueStyle.FillToBorder
                          color='posi'
                          children={ 'posi' }
                        />
                        <Buttons.Button.UniqueStyle.FillToBorder
                          color='nega'
                          children={ 'nega' }
                        />
                        <Buttons.Button.UniqueStyle.FillToBorder
                          color='warn'
                          children={ 'warn' }
                        />
                        <Buttons.Button.UniqueStyle.FillToBorder
                          color='mono'
                          children={ 'mono' }
                        />
                      </Grid>
                    </Box>
                  </>
                }
              ],[
                {
                  children: <>
                    <Box
                      freeCSS={ { whiteSpace: 'pre-wrap' } }
                      textAlign="left"
                    >
                      <Box
                        fontSize={ '3.paragraph' }
                        fontWeight={ '3.bold' }
                        padding={ [ 1,0 ] }
                        children={ '・OutLinedToFill' }
                      />
                      {
                        `<Buttons.Button.UniqueStyle.OutLinedToFill
color={ $Color }
...
/>
<Buttons.Label.Prime ... />
<Buttons.Link.Prime ... />

$Color = theme | posi | nega | warn | mono | white`
                      }
                    </Box>
                  </>
                },{
                  children: <>
                    <Box freeCSS={ {

                    } }>
                      <Grid
                        gridCols={ 3 }
                        gap={ 1 }
                        padding={ 1 }
                      >
                        <Buttons.Button.UniqueStyle.BorderToFill
                          color='theme'
                          children={ 'theme' }
                        />
                        <Buttons.Button.UniqueStyle.BorderToFill
                          color='posi'
                          children={ 'posi' }
                        />
                        <Buttons.Button.UniqueStyle.BorderToFill
                          color='nega'
                          children={ 'nega' }
                        />
                        <Buttons.Button.UniqueStyle.BorderToFill
                          color='warn'
                          children={ 'warn' }
                        />
                        <Buttons.Button.UniqueStyle.BorderToFill
                          color='mono'
                          children={ 'mono' }
                        />
                      </Grid>
                    </Box>
                  </>
                }
              ],[
                {
                  children: <>
                    <Box
                      freeCSS={ { whiteSpace: 'pre-wrap' } }
                      textAlign="left"
                    >
                      <Box
                        fontSize={ '3.paragraph' }
                        fontWeight={ '3.bold' }
                        padding={ [ 1,0 ] }
                        children={ '・Others' }
                      />
                      {
                        `<Buttons.Button.OutLined ... />`
                      }
                    </Box>
                  </>
                },{
                  children: <>
                    <Box freeCSS={ {

                    } }>
                      <Grid
                        gridCols={ 3 }
                        gap={ 1 }
                        padding={ 1 }
                      >
                        <Buttons.Button.Border
                          children={ 'Border' }
                        />
                        <Buttons.Button.Link
                          children={ 'Link' }
                        />
                        <Buttons.Button.Plain
                          children={ 'Plain' }
                        />
                      </Grid>
                    </Box>
                  </>
                }
              ]
            ] }
          />
        </Box>
      </Box>
    );
  },
  Types: () => {
    return (
      <Flex
        gap={ 2 }
        flexChilds='auto'
      >
        <Box ssCardBox>
          <Box
            ssCardBoxHeader
            children={ '・Sizes' }
            padding={ 1 }
          />
          <Flex
            ssCardBoxBody
            overflow='auto'
            gap={ 2 }
            verticalAlign='center'
            horizontalAlign="center"
          >
            <Buttons.Button.Prime
              size='XS'
              children={ 'Size.XS' }
            />
            <Buttons.Button.Prime
              size='S'
              children={ 'Size.S' }
            />
            <Buttons.Button.Prime
              size='R'
              children={ 'Size.R' }
            />
            <Buttons.Button.Prime
              size='L'
              children={ 'Size.L' }
            />
          </Flex>
        </Box>
        <Box ssCardBox>
          <Box
            ssCardBoxHeader
            children={ '・Button' }
            padding={ 1 }
          />
          <Box ssCardBoxBody
            overflow='auto'>
            <List
              rowStyles={ {
                padding: [ 1,0 ],
                horizontalAlign: 'between',
                borderBottom: '2.normal'
              } }
              rows={ [
                {
                  children: <>
                    <Box>
                      { '<Buttons.Button.Prime ... />' }
                    </Box>
                    <Box>
                      <Buttons.Button.Prime
                        children={ 'Button.Prime' }
                      />
                    </Box>
                  </>
                },{
                  children: <>
                    <Box>
                      { '<Buttons.Button.Sub ... />' }
                    </Box>
                    <Box>
                      <Buttons.Button.Sub
                        children={ 'Button.Sub' }
                      />
                    </Box>
                  </>
                },{
                  children: <>
                    <Box>
                      { '<Buttons.Button.Border ... />' }
                    </Box>
                    <Box>
                      <Buttons.Button.Border
                        children={ 'Button.Border' }
                      />
                    </Box>
                  </>,
                  borderBottom: 'unset'
                }
              ] }
            />
          </Box>
        </Box>
        <Box ssCardBox>
          <Box
            ssCardBoxHeader
            children={ '・Label' }
            padding={ 1 }
          />
          <Box ssCardBoxBody
            overflow='auto'>
            <List
              rowStyles={ {
                padding: [ 1,0 ],
                horizontalAlign: 'between',
                borderBottom: '2.normal'
              } }
              rows={ [
                {
                  children: <>
                    <Box>
                      { '<Buttons.Label.Prime ... />' }
                    </Box>
                    <Box>
                      <Buttons.Label.Prime
                        children={ 'Label.Prime' }
                      />
                    </Box>
                  </>
                },{
                  children: <>
                    <Box>
                      { '<Buttons.Label.Sub ... />' }
                    </Box>
                    <Box>
                      <Buttons.Label.Sub
                        children={ 'Label.Sub' }
                      />
                    </Box>
                  </>
                },{
                  children: <>
                    <Box>
                      { '<Buttons.Label.Border ... />' }
                    </Box>
                    <Box>
                      <Buttons.Label.Border
                        children={ 'Label.Border' }
                      />
                    </Box>
                  </>,
                  borderBottom: 'unset'
                }
              ] }
            />
          </Box>
        </Box>
        <Box ssCardBox>
          <Box
            ssCardBoxHeader
            children={ '・Anchor' }
            padding={ 1 }
          />
          <Box ssCardBoxBody
            overflow='auto'>
            <List
              rowStyles={ {
                padding: [ 1,0 ],
                horizontalAlign: 'between',
                borderBottom: '2.normal'
              } }
              rows={ [
                {
                  children: <>
                    <Box>
                      { '<Buttons.Anchor.Prime ... />' }
                    </Box>
                    <Box>
                      <Buttons.Anchor.Prime
                        href=""
                        children={ 'Anchor.Prime' }
                      />
                    </Box>
                  </>
                },{
                  children: <>
                    <Box>
                      { '<Buttons.Anchor.Sub ... />' }
                    </Box>
                    <Box>
                      <Buttons.Anchor.Sub
                        href=""
                        children={ 'Anchor.Sub' }
                      />
                    </Box>
                  </>
                },{
                  children: <>
                    <Box>
                      { '<Buttons.Anchor.Border ... />' }
                    </Box>
                    <Box>
                      <Buttons.Anchor.Border
                        href=""
                        children={ 'Anchor.Border' }
                      />
                    </Box>
                  </>,
                  borderBottom: 'unset'
                }
              ] }
            />
          </Box>
        </Box>
        <Box ssCardBox>
          <Box
            ssCardBoxHeader
            children={ '・MFButton' }
            padding={ 1 }
          />
          <Box ssCardBoxBody
            overflow='auto'>
            <List
              rowStyles={ {
                padding: [ 1,0 ],
                horizontalAlign: 'between'
              } }
              rows={ [
                {
                  children: <>
                    <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                      {
                        `<MFButton
                  details={[{
                      content : 'ButtonA' ,
                      onClick : ( event,{ set_open } ) => {
                        set_open( false );
                      }
                    }, ...
                  ]}
                />`}

                    </Box>
                    <Box>
                      <Buttons.MFButton
                        color='theme'
                        type='prime'
                        content={ 'SubmitButton' }
                        onClick={ () => {
                          console.log( 'aaa' );
                        } }
                        padding={ 1 }
                        borderRadius={ 'sphere' }
                        detailsModal={ ( closeCallBack ) => {
                          return (
                            <Flex
                              flexType="col"
                              padding={ [ '2/3',0 ] }
                              backgroundColor={ '1.layer.base' }
                              borderRadius={ 2 }
                              boxShadow={ 1 }
                              overflow='hidden'
                            >
                              <Buttons.Button.Clear
                                size="S"
                                borderRadius={ 0 }
                                borderBottom={ '1.thin' }
                                children={ 'すべてを出力' }
                              />
                              <Buttons.Button.Clear
                                size="S"
                                borderRadius={ 0 }
                                borderBottom={ '1.thin' }
                                children={ 'このページのみ出力' }
                              />
                              <Buttons.Button.Clear
                                size="S"
                                borderRadius={ 0 }
                                children={ 'チェックした行のみ出力' }
                              />
                            </Flex>
                          );
                        } }
                      />
                    </Box>
                  </>
                }
              ] }
            />
          </Box>
        </Box>
      </Flex>
    );
  },
  Segmented: () => {
    return (
      <Box ssCardBox>
        <Box
          ssCardBoxHeader
          children={ 'Segmented' }
        />
        <Box
          ssCardBoxBody
          overflow='auto'
          padding={ 0 }
        >
          <Table.Normal
            ssCardBox={ false }
            colLength={ 2 }
            tone='cellBorder'
            _height='100%'
            borderRadius={ 0 }
            head={ false }
            rows={ [
              [
                {
                  children: <>
                    <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                      {
                        `<Input.Segmented.Cloud
  value={ 1 }
  list={[ ... ]}
  onChangeEvent={({ value,componentId }) => {
    alert( 'value is ' + value );
  }}
/>`
                      }
                    </Box>
                  </>
                },
                {
                  children: <>
                    <Input.Segmented.Cloud
                      name='SwitchList1'
                      value={ 1 }
                      list={ [
                        { value: 0,label: <FontAwesomeIcon d='text' /> },
                        { value: 1,label: <FontAwesomeIcon d='image' /> },
                        { value: 2,label: <FontAwesomeIcon d='code' /> },
                        { value: 3,label: <FontAwesomeIcon d='face-smile' /> }
                      ] }
                      onUpdateValidValue={ ( value ) => {
                        alert( 'value is ' + value );
                      } }
                    />
                  </>
                }
              ],[
                {
                  children: <>
                    <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                      {
                        `<Input.Segmented.Border.Plain
  ...
/>`
                      }
                    </Box>
                  </>
                },{
                  children: <>
                    <Input.Segmented.Border
                      name='SwitchList2'
                      value={ 1 }
                      list={ [
                        { value: 0,label: 'On' },
                        { value: 1,label: 'Off' }
                      ] }
                    />
                  </>
                }
              ],[
                {
                  children: <>
                    <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                      {
                        `<Input.Segmented
  ...
/>`
                      }
                    </Box>
                  </>
                },{
                  children: <>
                    <Input.Segmented.BottomLine
                      name='SwitchList3'
                      value={ 1 }
                      list={ [
                        { value: 0,label: 'Takana' },
                        { value: 1,label: 'Mentai' },
                        { value: 2,label: 'Mayo' },
                        { value: 3,label: 'Gyudon' }
                      ] }
                    />
                  </>
                }
              ]
            ] }
          />
        </Box>
      </Box>
    );
  }
}

const Inputs: FNC<{}> = () => {
  let defaultTabIndex = Number( localStorage.getItem( 'designInputTabHeader' ) ) | 0;

  let [ val_tabIndex,set_tabIndex ] = useState( defaultTabIndex );

  return (
    <>
      <Layout.TabBar
        tabIndex={ val_tabIndex }
        tabs={ [
          'Basic Params',
          'Text & TextArea',
          'Time',
          'Select & Search & Cell',
          'Radio & CheckBox',
          '... Others'
        ] }
        onTabChange={ ( index ) => {
          localStorage.setItem( 'designInputTabHeader',String( index ) );
          set_tabIndex( index );
        } }
        borderRadius='sphere'
        ssCardBox
      />
      <Layout.PageViewController
        swipeOptions={ {
          onSlide: ( index ) => {
            set_tabIndex( index );
          }
        } }
        viewIndex={ val_tabIndex }
        views={ [
          <>
            <Box ssCardBox>
              <Box ssCardBoxHeader>
                Parameters
              </Box>
              <Box
                ssCardBoxBody
                overflow='auto'
                padding={ 0 }
              >
                <Table.Normal
                  ssCardBox={ false }
                  colLength={ 2 }
                  tone='cellBorder'
                  _height='100%'
                  borderRadius={ 0 }
                  head={ false }
                  rows={ [
                    [
                      {
                        children: <>
                          <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                            {
                              `<Input.Text
          label={ 'textLabel' }`
                            }
                            <br />
                            { <Span fontColor='white' backgroundColor='theme'>{ '  required ' }</Span> }
                            <br />
                            { `/>` }
                          </Box>
                        </>
                      },{
                        children: <>
                          <Input.Wrapper.Normal
                            label='textLabel'
                            required
                          >
                            <Input.Text.Normal
                              form="testForm"
                              name='ParameterInput1'
                              required
                            />
                          </Input.Wrapper.Normal>
                        </>
                      }
                    ],[
                      {
                        children: <>
                          <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                            {
                              `<Input.Text
          restrict='number'
          value={ 'someString' }`
                            }
                            <br />
                            { <Span fontColor='white' backgroundColor='theme'>{ '  firstValidCheck ' }</Span> }
                            <br />
                            { `/>` }
                          </Box>
                        </>
                      },{
                        children: <>
                          <Input.Text.Number
                            form="testForm"
                            name='ParameterInput2'
                            value={ 'someString' }
                            checkValidationAtFirst
                          />
                        </>
                      }
                    ],[
                      {
                        children: <>
                          <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                            {
                              `<Input.Text
          value={ 'helloReact' }`
                            }
                            <br />
                            {
                              <Span
                                fontColor='white' backgroundColor='theme'>
                                {
                                  `  onChangeCallBack={(args) => { 
            console.log( args.value ); 
          }} `
                                }
                              </Span>
                            }
                            <br />
                            { `/>` }
                          </Box>
                        </>
                      },{
                        children: <>
                          <Input.Text.Normal
                            form="testForm"
                            name='ParameterInput3'
                            value={ 'helloReact' }
                            onUpdateValidValue={ ( args ) => {
                              console.log( args.value );
                            } }
                          />
                        </>
                      }
                    ],[
                      {
                        children: <>
                          <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                            {
                              `<Input.Text
          value={ 'helloReact' }`
                            }
                            <br />
                            {
                              <Span
                                fontColor='white' backgroundColor='theme'>
                                {
                                  `  onValidateCallBack={async ( { value } ) => {
            return { 
              result : false, 
              messages : [ 
                { type : 'warn',label : 'WarnMessage' }, 
                { type : 'invalid',label : 'InvalidMessage' },
                { type : 'valid',label : 'ValidMessage' } 
              ] 
            } 
          }} `
                                }
                              </Span>
                            }
                            <br />
                            { `/>` }
                          </Box>
                        </>
                      },{
                        children: <>
                          <Input.Text.Normal
                            form="testForm"
                            name='ParameterInput3'
                            value={ 'helloReact' }
                            autoComplete='off'
                            onUpdateValidValue={ async ( args ) => {
                              return {
                                result: false,
                                messages: [
                                  { type: 'warn',label: 'WarnMessage' },
                                  { type: 'invalid',label: 'InvalidMessage' },
                                  { type: 'valid',label: 'ValidMessage' }
                                ],
                                safeValue: args.value
                              }
                            } }
                          />
                        </>
                      }
                    ]
                  ] }
                />
              </Box>
            </Box>
          </>,<>
            <Box ssCardBox>
              <Box ssCardBoxHeader>
                TextInput
              </Box>
              <Box
                ssCardBoxBody
                overflow='auto'
                padding={ 0 }
              >
                <Table.Normal
                  ssCardBox={ false }
                  colLength={ 2 }
                  tone='cellBorder'
                  _height='100%'
                  borderRadius={ 0 }
                  head={ false }
                  rows={ [
                    [
                      {
                        children: <>
                          <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                            {
                              `<Input.Text
  name='textInput'
  label={ 'textInputLabel' }
  required
  value={ 'hello React!!' }
/>`
                            }
                          </Box>
                        </>
                      },
                      {
                        children: <>
                          <Input.Wrapper.Normal
                            label='testInputLabel'
                            required
                          >
                            <Input.Text.Normal
                              form="testForm"
                              name='textInput'
                              required
                              value={ 'helloReact' }
                            />
                          </Input.Wrapper.Normal>
                        </>
                      }
                    ],[
                      {
                        children: <>
                          <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                            <Box fontSize={ '4.thirdTitle' } fontWeight={ '3.bold' } padding={ [ 1,0 ] } children={ '・Tone' } />
                            {
                              `
<Input.Text tone='border' ... />
<Input.Text tone='cloud' ... />
<Input.Text tone='plain' ... />
`
                            }
                          </Box>
                        </>
                      },
                      {
                        children: <>
                          <Flex
                            flexType='col'
                            gap={ 1 }
                          >
                            <Input.Text.Normal
                              form="testForm"
                              tone='border'
                              name='textInput2'
                              value={ 'hello React!!' }
                            />
                            <Input.Text.Normal
                              form="testForm"
                              tone='cloud'
                              name='textInput3'
                              value={ 'hello React!!' }
                            />
                          </Flex>
                        </>
                      }
                    ]
                  ] }
                />
              </Box>
            </Box>


            <Box ssCardBox>
              <Box ssCardBoxHeader>
                Restricts
              </Box>
              <Box
                ssCardBoxBody
                overflow='auto'
                padding={ 0 }
              >
                <Table.Normal
                  ssCardBox={ false }
                  colLength={ 2 }
                  tone='cellBorder'
                  _height='100%'
                  borderRadius={ 0 }
                  head={ false }
                  rows={ [
                    [
                      {
                        children: <>
                          <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                            { `<Input.Text restrict='email' />` }
                          </Box>
                        </>
                      },{
                        children: <>
                          <Input.Text.Email
                            form="testForm"
                            autoComplete="off"
                            name='emailInput'
                            value={ '******@gmail.com' }
                          />
                        </>
                      }
                    ],[
                      {
                        children: <>
                          <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                            { `<Input.Text restrict='number' />` }
                          </Box>
                        </>
                      },{
                        children: <>
                          <Input.Text.Number
                            form="testForm"
                            name='numberInput'
                            value={ '324' }
                          />
                        </>
                      }
                    ],[
                      {
                        children: <>
                          <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                            { `<Input.Text restrict='tel' />` }
                          </Box>
                        </>
                      },{
                        children: <>
                          <Input.Text.Tel
                            form="testForm"
                            name='telInput'
                            value={ '080-6995-2229' }
                          />
                        </>
                      }
                    ],[
                      {
                        children: <>
                          <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                            { `<Input.Text.Money.JPY />` }
                          </Box>
                        </>
                      },{
                        children: <>
                          <Input.Text.Money.JPY
                            form="testForm"
                            name='priceInput'
                            value={ '3000' }
                          />
                        </>
                      }
                    ],[
                      {
                        children: <>
                          <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                            { `<Input.Text restrict='url' />` }
                          </Box>
                        </>
                      },
                      {
                        children: <>
                          <Input.Text.Url
                            form="testForm"
                            name='urlInput'
                            value={ 'http://google.com' }
                          />
                        </>
                      }
                    ],[
                      {
                        children: <>
                          <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                            { `<Input.Text
  restrict='postal'
  geocodingCallBack={(args) => {
    console.log( args );
  }}
/>`
                            }
                          </Box>
                        </>
                      },
                      {
                        children: <>
                          <Input.Text.Postal
                            form="testForm"
                            name='postalInput'
                            onGeoCoding={ ( args ) => {
                              $( '#postalResult' ).html( 'result : ' + args.addressArray.join( '' ) );
                            } }
                            enableCurrentGeoCoding
                          />
                          <Box
                            id="postalResult"
                            padding={ 1 }
                            textAlign='left'
                          />
                        </>
                      }
                    ],[
                      {
                        children: <>
                          <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                            { `<Input.Text restrict='password' />` }
                          </Box>
                        </>
                      },
                      {
                        children: <>
                          <Input.Text.Password
                            form="testForm"
                            name='passwordInput'
                            value={ 'onigiriUmai' }
                          />
                        </>
                      }
                    ],[
                      {
                        children: <>
                          <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                            { `<Input.TextArea />` }
                          </Box>
                        </>
                      },
                      {
                        children: <>
                          <Input.TextArea form="testForm"
                            name='textareaInput'
                            value={
                              `text1
text2
text3
text4
text5`
                            }
                            rows={ 5 }
                          />
                        </>
                      }
                    ]
                  ] }
                />
              </Box>
            </Box>
          </>,<>
            <Box ssCardBox>
              <Box ssCardBoxHeader>
                Time Input
              </Box>
              <Box
                ssCardBoxBody
                overflow='auto'
                padding={ 0 }
              >
                <Table.Normal
                  ssCardBox={ false }
                  colLength={ 2 }
                  tone='cellBorder'
                  _height='100%'
                  borderRadius={ 0 }
                  head={ false }
                  rows={ [
                    [
                      {
                        children: <>
                          <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                            { `<Input.Time type='clock' />` }
                          </Box>
                        </>
                      },{
                        children: <>
                          <Input.Time.Clock
                            name='clockInput'
                          // value={ '15-00' }

                          />
                        </>
                      }
                    ],[
                      {
                        children: <>
                          <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                            { `<Input.Time type='date' />` }
                          </Box>
                        </>
                      },{
                        children: <>
                          <Input.Time.Date
                            name='dateInput'
                            value={ '2022-04-01' }
                          />
                        </>
                      }
                    ],[
                      {
                        children: <>
                          <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                            { `<Input.Time type='week' />` }
                          </Box>
                        </>
                      },{
                        children: <>
                          <Input.Time.Week
                            name='weekInput'
                            value={ '2022-40' }
                          />
                        </>
                      }
                    ],[
                      {
                        children: <>
                          <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                            { `<Input.Time type='month' />` }
                          </Box>
                        </>
                      },{
                        children: <>
                          <Input.Time.Month
                            name='monthInput'
                            value={ '2022-04' }
                          />
                        </>
                      }
                    ],[
                      {
                        children: <>
                          <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                            { `<Input.Time type='year' />` }
                          </Box>
                        </>
                      },{
                        children: <>
                          <Input.Time.Year
                            name='yearInput'
                            value={ '2016' }
                            required
                          />
                        </>
                      }
                    ],[
                      {
                        children: <>
                          <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                            { `<Input.Time.Periods.Date />` }
                          </Box>
                        </>
                      },{
                        children: <>
                          <Input.Time.Periods.Date
                            name='datesInput'
                            value={ [ '2022-04-01','2022-04-20' ] }
                          />
                        </>
                      }
                    ],[
                      {
                        children: <>
                          <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                            { `<Input.Time type='months' />` }
                          </Box>
                        </>
                      },{
                        children: <>
                          <Input.Time.Periods.Month
                            name='monthsInput'
                            value={ [ '2022-02','2022-05' ] }
                          />
                        </>
                      }
                    ],[
                      {
                        children: <>
                          <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                            { `<Input.Time type='dateWareki' />` }
                          </Box>
                        </>
                      },{
                        children: <>
                          <Input.Time.DateWareki
                            name='dateEraInput'
                            value={ '2022-04-01' }
                            checkValidationAtFirst
                          />
                        </>
                      }
                    ]
                  ] }
                />
              </Box>
            </Box>
          </>,<>
            <Box ssCardBox>
              <Box ssCardBoxHeader>
                Select Input
              </Box>
              <Box
                ssCardBoxBody
                overflow='auto'
              >
                <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                  {
                    `<Input.Select
  value={ 3 }
  list={[
    { value : 1,label : 'option1' },
    { value : 2,label : 'option2' },
    { value : 3,label : 'option3' },
    ...
  ]}
/>`
                  }
                </Box>
              </Box>
              <Box
                ssCardBoxFooter
              >
                <Input.Select
                  form="testForm"
                  name='selectInput'
                  required
                  value={ 3 }
                  list={ [
                    { value: 1,label: 'option1' },
                    { value: 2,label: 'option2' },
                    { value: 3,label: 'option3a' },
                    { value: 4,label: 'option4' }
                  ] }
                />
              </Box>
            </Box>
            <Box ssCardBox>
              <Box ssCardBoxHeader>
                Search Input
              </Box>
              <Box ssCardBoxBody
                overflow='auto'>
                <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                  {
                    `<Input.Search
  value={ 3 }
  list={[
    { value : 1,label : 'option1' },
    { value : 2,label : 'option2' },
    { value : 3,label : 'option3' },
    ...
  ]}
/>`
                  }
                </Box>
              </Box>
              <Box ssCardBoxFooter>
                <Input.Wrapper.Normal
                  label='search'
                  required
                >
                  <Input.Search
                    form="testForm20"
                    name='selectInput'
                    placeholder="Placeholder"
                    required
                    optionGroups={ [
                      {
                        options: [
                          {
                            value: 1,
                            label: 'option1',
                            keyword: 'option1'
                          },
                          {
                            value: {
                              value1: 2,
                              value2: 3
                            },
                            label:
                              <>
                                option2
                                <br />
                                option3
                              </>,
                            keyword: 'option2'
                          },
                          { value: 3,label: 'option3',keyword: 'option3' },
                          { value: 4,label: 'option4',keyword: 'option4' },
                          { value: 5,label: 'option5',keyword: 'option5' },
                        ]
                      }
                    ] }
                    onDynamicSearch={ async ( ...args ) => {
                      let List: amotify.fn.Input.Chips.OptionParams[] = [];
                      for ( let i = 0; i < 100; i++ ) {
                        List.push( {
                          value: i,
                          icon: 'I',
                          label: `option${ i }`
                        } );
                      }
                      return [
                        {
                          label: <Box
                            padding={ 1 }
                            backgroundColor={ '3.layer.canvas' }
                            children={ 'title' + $.randomNumber( 5 ) }
                          />,
                          options: List
                        }
                      ];
                    } }
                  />
                </Input.Wrapper.Normal>
                <Buttons.Button.Prime
                  marginTop={ 2 }
                  submitOption={ {
                    formName: 'testForm20',
                    callback: ( form ) => {
                      console.log( form );
                    }
                  } }
                >
                  Submit
                </Buttons.Button.Prime>
              </Box>
            </Box>
            <Box ssCardBox>
              <Box ssCardBoxHeader>
                Chips Input
              </Box>
              <Box ssCardBoxBody
                overflow='auto'>
                <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                  {
                    `<Input.Chips
  onDynamicSearchCallBack={ async () => {
    return [
      { value : 1,label : 'option1' },
      { value : 2,label : 'option2' },
      ...
    ];
  }}
/>`
                  }
                </Box>
              </Box>
              <Box ssCardBoxFooter>
                <Input.Wrapper.Normal
                  label='AAA'
                >
                  <Input.Chips
                    form="testForm"
                    name='searchInput'
                    limit={ 5 }
                    value={ [
                      {
                        value: 3,
                        label: 'option3'
                      }
                    ] }
                    onUpdateValidValue={ ( { value } ) => {
                      console.log( value );
                    } }
                    optionGroups={ [
                      {
                        options: [
                          {
                            value: 1,
                            label: 'option1',
                            keyword: 'option1',
                            icon: <FontAwesomeIcon d="user" />
                          },
                          {
                            value: 2,
                            keyword: 'option2',
                            label: 'option2'
                          },
                          {
                            value: 3,
                            keyword: 'option3',
                            label: 'option3'
                          },
                          {
                            value: 4,
                            keyword: 'option4',
                            label:
                              <>
                                option4
                                <br />
                                <Span fontColor={ '4.thin' } fontSize={ '0.xs' }>
                                  ~~~~~opt4
                                </Span>
                              </>,
                            icon:
                              <>
                                <Img src={ Env.Images.usr.icon.R } borderRadius={ 'sphere' } alt='' />
                              </>
                          }
                        ]
                      }
                    ] }
                  />
                </Input.Wrapper.Normal>
              </Box>
            </Box>
          </>,<>
            <Box ssCardBox>
              <Box ssCardBoxHeader>
                Radio Input
              </Box>
              <Box ssCardBoxBody
                overflow='auto'>
                <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                  {
                    `<Input.Radio
  value={ [ 1 ] }
  list={[
    { value : 1,label : 'option1' },
    { value : 2,label : 'option2' },
    { value : 3,label : 'option3' },
    ...
  ]}
/>`
                  }
                </Box>
              </Box>
              <Box ssCardBoxFooter>
                <Input.List.Radio.Border
                  form="testForm"
                  name='radioInputSample'
                  value={ [ 1 ] }
                  list={ [
                    { value: 1,label: 'option1' },
                    { value: 2,label: 'option2' },
                    { value: 3,label: 'option3' }
                  ] }
                />
              </Box>
            </Box>
            <Box ssCardBox>
              <Box ssCardBoxHeader>
                Checkbox Input
              </Box>
              <Box ssCardBoxBody
                overflow='auto'>
                <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                  {
                    `<Input.List.Checkbox.IconCloud
  tone='icon'
  value={ [ 2,3 ] }
  list={[
    { value : 1,label : 'option1' },
    { value : 2,label : 'option2' },
    { value : 3,label : 'option3' },
    ...
  ]}
/>`
                  }
                </Box>
              </Box>
              <Box ssCardBoxFooter>
                <Input.List.Checkbox.IconCloud
                  form="testForm"
                  name='checkboxInput'
                  value={ [ 2,'3' ] }
                  list={ [
                    { value: '1',label: 'option1' },
                    { value: '2',label: 'option2' },
                    { value: '3',label: 'option3' }
                  ] }
                />
              </Box>
            </Box>
            <Box
              ssCardBox
              _width={ '100%' }
              flexSizing={ 'none' }
            >
              <Box ssCardBoxHeader>
                Tone
              </Box>
              <Box ssCardBoxBody
                overflow='auto'>
                <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                  border | cloud | icon | iconBorder | iconCloud | vivid | vividBorder
                </Box>
              </Box>
              <Box ssCardBoxFooter>
                <Flex flexType='col' gap={ 2 }>
                  <Input.List.Radio.Border
                    form="testForm"
                    name='ListAppearance1'
                    value={ [ 1 ] }
                    list={ [
                      { value: 1,label: 'option1111' },{ value: 2,label: 'option2' },{ value: 3,label: 'option3' }
                    ] }
                  />
                  <Input.List.Radio.Cloud
                    form="testForm"
                    name='ListAppearance2'
                    value={ [ 1 ] }
                    list={ [
                      { value: 1,label: 'option1' },{ value: 2,label: 'option2' },{ value: 3,label: 'option3' }
                    ] }
                  />
                  <Input.List.Radio.Icon
                    form="testForm"
                    name='ListAppearance3'
                    value={ [ 1 ] }
                    list={ [
                      { value: 1,label: 'option1' },{ value: 2,label: 'option2' },{ value: 3,label: 'option3' }
                    ] }
                  />
                  <Input.List.Radio.IconBorder
                    form="testForm"
                    name='ListAppearance4'
                    value={ [ 1 ] }
                    list={ [
                      { value: 1,label: 'option1' },{ value: 2,label: 'option2' },{ value: 3,label: 'option3' }
                    ] }
                  />
                  <Input.List.Radio.IconCloud
                    form="testForm"
                    name='ListAppearance5'
                    value={ [ 1 ] }
                    list={ [
                      { value: 1,label: 'option1' },{ value: 2,label: 'option2' },{ value: 3,label: 'option3' }
                    ] }
                  />
                  <Input.List.Radio.Vivid
                    form="testForm"
                    name='ListAppearance6'
                    value={ [ 1 ] }
                    list={ [
                      { value: 1,label: 'option1' },{ value: 2,label: 'option2' },{ value: 3,label: 'option3' }
                    ] }
                  />
                  <Input.List.Radio.VividBorder
                    form="testForm"
                    name='ListAppearance7'
                    value={ [ 1 ] }
                    list={ [
                      { value: 1,label: 'option1' },{ value: 2,label: 'option2' },{ value: 3,label: 'option3' }
                    ] }
                  />
                </Flex>
              </Box>
            </Box>
          </>,<>
            <Box ssCardBox>
              <Box ssCardBoxHeader>
                File Input
              </Box>
              <Box ssCardBoxBody
                overflow='auto'>
                <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                  {
                    `<Input.File
  limit={ 3 }
/>`
                  }
                </Box>
              </Box>
              <Box ssCardBoxFooter>
                <Input.File
                  limit={ 3 }
                />
              </Box>
            </Box>
            <Box ssCardBox>
              <Box ssCardBoxHeader>
                Switch Input
              </Box>
              <Box
                ssCardBoxBody
                overflow='auto'
                padding={ 0 }
              >
                <Table.Normal
                  ssCardBox={ false }
                  colLength={ 2 }
                  tone='cellBorder'
                  _height='100%'
                  borderRadius={ 0 }
                  head={ false }
                  rows={ [
                    [
                      {
                        children: <>
                          <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                            {
                              `<Input.Switch
  value
/>`
                            }
                          </Box>
                        </>
                      },{
                        children: <>
                          <Input.Switch
                            name='switchInput'
                            value
                          />
                        </>
                      }
                    ],[
                      {
                        children: <>
                          <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                            {
                              `・Color
<Input.Switch color='posi' />
<Input.Switch color='nega' />
<Input.Switch color='warn' />
`
                            }
                          </Box>
                        </>
                      },{
                        children: <>
                          <Flex
                            flexType='col'
                            gap={ 1 }
                            children={
                              <>
                                <Input.Switch
                                  form="testForm"
                                  name='switchInput'
                                  tone='posi'
                                  value
                                />
                                <Input.Switch
                                  form="testForm"
                                  name='switchInput'
                                  tone='nega'
                                  value
                                />
                                <Input.Switch
                                  form="testForm"
                                  name='switchInput'
                                  tone='warn'
                                  value
                                />
                              </>
                            }
                          />
                        </>
                      }
                    ]
                  ] }
                />
              </Box>
            </Box>
            <Box ssCardBox>
              <Box ssCardBoxHeader>
                Slider Input
              </Box>
              <Box ssCardBoxBody
                overflow='auto'>
                <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
                  {
                    `<Input.Slider
  name='sliderInput'
  value={ 40 }
  step={ 10 }
  min={ 0 }
  max={ 100 }
  showLabels
/>`
                  }
                </Box>
              </Box>
              <Box ssCardBoxFooter>
                <Input.Slider
                  name='sliderInput'
                  value={ 40 }
                  step={ 10 }
                  min={ 0 }
                  max={ 100 }
                />
              </Box>
            </Box>
          </>,
        ] }
        wrapTemplate={ ( View ) => {
          return (
            <Flex
              gap={ 2 }
              padding={ 1 }
              flexWrap
              flexChilds={ 'auto' }
              children={ View }
            />
          );
        } }
      />
    </>
  );
}
const Styling: FNC<{}> = () => {
  return (
    <>
      <Box ssCardBox>
        <Box ssCardBoxHeader>
          CardBox
        </Box>
        <Box ssCardBoxBody
          overflow='auto'>
          <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
            {
              `<Box ssCardBox>
  <Box ssCardBoxHeader>
    Header
  </Box>
  <Box ssCardBoxBody
  overflow='auto'>
    Body
  </Box>
  <Box ssCardBoxFooter>
    Footer
  </Box>
</Box>`
            }
          </Box>
        </Box>
        <Box ssCardBoxFooter>
          <Box ssCardBox={ 'border' }>
            <Box ssCardBoxHeader>
              Header
            </Box>
            <Box ssCardBoxBody
              overflow='auto'>
              Body
            </Box>
            <Box ssCardBoxFooter>
              Footer
            </Box>
          </Box>
        </Box>
      </Box>
      <Box ssCardBox>
        <Box ssCardBoxHeader>
          List
        </Box>
        <Box ssCardBoxBody
          overflow='auto'>
          <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
            {
              `<List
  list={ [
    {
      title?: LeftSideReactComponent,
      content: RightSideReactComponent
    }
  ] }
/>`
            }
          </Box>
        </Box>
        <Box ssCardBoxBody
          overflow='auto'>
          <List
            border
            rowStyles={ {
              padding: 1,
              borderBottom: true
            } }
            rows={ [
              {
                children: <>
                  <Box>
                    Title1
                  </Box>
                  <Box>
                    <Box children='Content1' />
                  </Box>
                </>,
                horizontalAlign: 'between'
              },{
                children: <>
                  <Box
                    flexGrid={ 1 }
                  >
                    Title2
                  </Box>
                  <Box
                    flexGrid={ 2 }
                  >
                    <Box children='Content2' />
                  </Box>
                </>
              },{
                children: <>
                  <Box>
                    Title3
                  </Box>
                  <Box>
                    <Box children='Content3' />
                  </Box>
                </>,
                flexType: 'col'
              },{
                children: <>
                  <Box>
                    <Box children='Content4' />
                  </Box>
                </>,
                borderBottom: 'unset'
              }
            ] }
          />
        </Box>
      </Box>

      <Box ssCardBox>
        <Box ssCardBoxHeader>
          Modal
        </Box>
        <Box ssCardBoxBody
          overflow='auto'>
          <Box freeCSS={ { whiteSpace: 'pre-wrap' } }>
            {
              `Modal.open( {
  modalId: 'modalId',
  header: ReactElement | FNC< { modalClose } >,
  body: ReactElement | FNC< { modalClose } >,
  footer: ReactElement | FNC< { modalClose } >
} );`
            }
          </Box>
        </Box>
        <Box ssCardBoxBody
          overflow='auto'>
          <Flex gap={ 1 } flexType='col'>
            <Buttons.Button.Border
              onClick={ () => {
                let modalId = 'testModal';
                Modal.open( {
                  modalId: modalId,
                  type: 'center',
                  size: 'R',
                  content: <>
                    <Box
                      padding={ 1 }
                      children={ 'Header' }
                    />
                    <Box padding={ 2 }>
                      Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br />
                      Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br />
                      Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br />
                      Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br />
                      Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br />
                      Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br />
                      <Buttons.Button.Prime
                        onClick={ () => {
                          let modalId = 'testModal2';
                          Modal.open( {
                            modalId: modalId,
                            // type: 'right',
                            type: 'center',
                            size: 'L',
                            content: <>
                              <Box
                                padding={ 1 }
                                children={ 'Header' }
                              />
                              <Box padding={ 2 }>
                                Hello
                              </Box>
                              <Flex
                                padding={ 1 }
                                horizontalAlign='between'
                              >
                                <Buttons.Button.Border
                                  onClick={ () => {
                                    Modal.close.pin( modalId );
                                  } }
                                  children={ 'Close' }
                                />
                                <Buttons.Button.Prime
                                  children='Submit'
                                />
                              </Flex>
                            </>
                          } );
                        } }
                      >
                        Click Here
                      </Buttons.Button.Prime>
                    </Box>
                    <Box
                      padding={ 1 }
                      children={
                        <Buttons.Button.Border
                          onClick={ () => {
                            Modal.close.pin( modalId );
                          } }
                          children={ '閉じる' }
                        />
                      }
                    />
                  </>
                } );
              } }
              children={ 'modalForCenterPosition' }
            />
            <Buttons.Button.Border
              onClick={ () => {
                let modalId = 'test2Modal';
                Modal.open( {
                  modalId: modalId,
                  type: 'right',
                  size: 'R',
                  content: <>
                    <Box
                      padding={ 1 }
                      children={ 'Header' }
                    />
                    <Box
                      padding={ 1 }
                      children={
                        <>
                          <Box padding={ 2 }>
                            Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br />
                            Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br />
                            Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br />
                            Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br /> Body <br />
                          </Box>
                        </>
                      }
                    />
                    <Box
                      padding={ 1 }
                      children={
                        <Buttons.Button.Border
                          onClick={ () => {
                            Modal.close.pin( modalId );
                          } }
                          children={ '閉じる' }
                        />
                      }
                    />
                  </>
                } );
              } }
              children={ 'modalForRightPosition' }
            />
            <Buttons.Button.Border
              onClick={ () => {
                let modalId = $.uuidGen();
                Modal.open( {
                  modalId: modalId,
                  type: 'left',
                  content: <>
                    <Box
                      padding={ 1 }
                      children={ 'Left' }
                    />
                    <Box
                      padding={ 1 }
                      children={
                        <Buttons.Button.Border
                          onClick={ () => {
                            Modal.close.pin( modalId );
                          } }
                          children={ '閉じる' }
                        />
                      }
                    />
                  </>
                } );
              } }
              children={ 'modalForLeftPosition' }
            />
            <Buttons.Button.Border
              onClick={ ( event ) => {
                Modal.open( {
                  modalId: 'test40',
                  type: 'free',
                  children: <Box
                    padding={ 1 }
                    border
                    borderRadius={ 2 }
                    backgroundColor={ 'dark' }
                    fontColor={ 'white' }
                    children={ 'Content' }
                  />,
                  parent: event.target
                } );
              } }
              children={ 'modalFreePosition' }
            />
            <Img
              src={ Env.Images.usr.icon.R }
              freeCSS={ {
                maxWidth: 12 * 12
              } }
              showExpand
            />
          </Flex>
        </Box>
      </Box>
    </>
  );
}

const Tables = {
  _Origin: () => {
    return (
      <>
        <Flex
          flexType="col"
          gap={ 1 }
        >
          <Tables.Data />
          <Tables.Normal />
          <Tables.Drag />
          <Tables.Spread />
        </Flex>
      </>
    );
  },
  Normal: () => {
    let PureData: amotify.fn.Tables.Normal.BodyRowParams[] = [];
    for ( var i = 0; i < 10; i++ ) {
      let Row: amotify.fn.Tables.Normal.BodyRowParams = [
        {
          type: 'th',
          children: 'head_' + i
        },{
          type: 'td',
          children: 'data_' + i
        },{
          type: 'td',
          children: 'data_' + i
        }
      ]
      PureData.push( Row );
    }

    return (
      <>
        <Box fontSize='5.subTitle'>
          Table.Normal
        </Box>
        <Table.Normal
          colLength={ 3 }
          head={ [
            { children: 'head1' },
            { children: 'head2' },
            { children: 'head3' }
          ] }
          rows={ PureData }
          ssCardBox
          onRowClick={ ( rowId ) => {
            console.log( rowId );
          } }
        />
      </>
    );
  },
  Drag: () => {
    let DragData: amotify.fn.Tables.Drag.BodyRowParams[] = [];
    for ( var i = 0; i < 4; i++ ) {
      let Row: amotify.fn.Tables.Drag.BodyRowParams = [
        {
          type: 'th',
          children: 'head_' + i
        },{
          type: 'td',
          children: 'data_' + i
        },{
          type: 'td',
          children: 'data_' + i
        }
      ]
      Row.rowId = 'rowId-' + i;
      DragData.push( Row );
    }

    return (
      <>
        <Box fontSize='5.subTitle'>
          Table.Drag
        </Box>
        <Table.Drag
          colLength={ 3 }
          head={ [
            { children: 'head1' },
            { children: 'head2' },
            { children: 'head3' }
          ] }
          rows={ DragData }
          ssCardBox
          onOrderChanged={ ( args ) => {
            console.log( args );
          } }
        />
      </>
    );
  },
  Data: () => {
    let [ val_order,set_order ] = useState( {
      eventId: $.uuidGen(),
      order: [ 0,'ASC' ],
    } );
    // useEffect( () => {
    //   setTimeout( () => {
    //     set_order( {
    //       eventId: $.uuidGen(),
    //       order: [ 1,'DESC' ]
    //     } );
    //   },2000 );
    // },[] );

    let DataData: amotify.fn.Tables.Data.BodyRowParams[] = [];
    for ( var i = 0; i < 100; i++ ) {
      let random1 = Math.round( Math.random() * 50 + 1 );
      let random2 = Math.round( Math.random() * 50 + 1 );
      let random3 = Math.round( Math.random() * 50 + 1 );

      let Data1 = 'name_' + random1;
      let Data2 = 'data_' + random2;
      let Data3 = 'data_' + random3;
      let Row: amotify.fn.Tables.Data.BodyRowParams = [
        {
          type: 'th',
          children: i + ':' + Data1,
          data: Data1,
          orderIndex: i
        },{
          type: 'td',
          children: Data2,
          data: Data2
        },{
          type: 'td',
          children: Data3,
          data: Data3,
        }
      ]
      DataData.push( Row );
    }
    DataData[ 1 ].checked = true;
    DataData[ 4 ].checked = true;
    DataData[ 10 ].checked = true;

    let tableId = 'testDataTable';
    return (
      <>
        <Flex
          horizontalAlign='between'
        >
          <Box
            fontSize='5.subTitle'
          >
            Table.Data
          </Box>
          <Buttons.MFButton
            type='prime'
            color='theme'
            key={ 'excelRegion' }
            UnderBreakPointStyles={ {
              display: 'none'
            } }
            content={ 'Export to Excel' }
            onClick={ () => {
              let Rows = Table.getData( tableId );
              console.log( Rows );

              // exportToSS( {
              //   type,
              //   fileName,
              //   head: head,
              //   body: PageRows
              // } );
            } }
            detailsModal={ ( closeCallBack ) => (
              <Flex
                flexType='col'
                padding={ [ '2/3',0 ] }
                backgroundColor={ '1.layer.base' }
                borderRadius={ 2 }
                boxShadow={ 1 }
                overflow='hidden'
              >
                <Buttons.Button.Clear
                  size="S"
                  borderRadius={ 0 }
                  borderBottom={ '1.thin' }
                  children={ '全ページを出力' }
                  onClick={ () => {
                    Table.getData( tableId );
                    // exportToSS( {
                    //   type,fileName,
                    //   head: head,
                    //   body: FilterRows
                    // } );
                  } }
                />
                <Buttons.Button.Clear
                  size="S"
                  borderRadius={ 0 }
                  borderBottom={ '1.thin' }
                  children={ 'このページのみ出力' }
                  onClick={ () => {
                    Table.getData( tableId );
                    // exportToSS( {
                    //   type,fileName,
                    //   head: head,
                    //   body: PageRows
                    // } );
                  } }
                />
              </Flex>
            ) }
          />
        </Flex>
        <Table.Data
          tableId={ tableId }
          tone='rowBorder'
          colLength={ 3 }
          head={ [
            { data: 'head1' },
            { data: 'head2' },
            { data: 'head3' }
          ] }
          rows={ DataData }
          ssCardBox
          options={ {
            eventId: val_order.eventId,
            defaultOrder: val_order.order as any,
            sizeFixed: false,
            filter: [ true ],
            checkerCell: true,
          } }
        />
      </>
    );
  },
  Spread: () => {
    return (
      <>
        <Box fontSize='5.subTitle'>
          Table.Spread
        </Box>
        <Table.Spread />
      </>
    );
  }
}

const Cropping: FNC<{}> = () => {
  let [ val_ImageUrl1,set_ImageUrl1 ] = useState( '' );
  let [ val_ImageUrl2,set_ImageUrl2 ] = useState( '' );
  let [ val_ImageUrl3,set_ImageUrl3 ] = useState( '' );

  return (
    <>
      <Box>
        <Cropper
          use='profile'
          triggerId='testLabel'
          develops={ [
            {
              size: 'S'
            },{
              size: 'R'
            },{
              size: 'L'
            }
          ] }
          onProcessFinished={ async ( develops ) => {
            set_ImageUrl1( await develops[ 0 ].toDataUrl() );
            set_ImageUrl2( await develops[ 1 ].toDataUrl() );
            set_ImageUrl3( await develops[ 2 ].toDataUrl() );
          } }
        />

        <Buttons.Label.Prime htmlFor="testLabel">
          <FontAwesomeIcon d='image' /> イメージを選択
        </Buttons.Label.Prime>

        <Flex verticalAlign="top" gap={ 1 }>
          {
            val_ImageUrl1 ? <Img
              borderRadius={ 'sphere' }
              src={ val_ImageUrl1 }
              alt=''
              showExpand
              freeCSS={ {
                maxWidth: 12 * 12
              } }
            /> : null
          }
          {
            val_ImageUrl2 ? <Img
              style={ {
                maxWidth: 24 * 12
              } }
              src={ val_ImageUrl2 }
              alt=''
              showExpand
            /> : null
          }
          {
            val_ImageUrl3 ? <Img
              style={ {
                maxWidth: 24 * 12
              } }
              src={ val_ImageUrl3 }
              alt=''
              showExpand
            /> : null
          }

          <Layout.SwipeView
            borderColor={ 'theme' }
            border
            padding={ [ 0,4 ] }
            margin={ 'auto' }
            freeCSS={ {
              maxWidth: 12 * 30
            } }
            slideIndex={ 0 }
            options={ {
              loop: true,
              swipeableOnMouseDrag: true,
              visibilitySurroundSlide: true,
              onSlideCB: ( index ) => {
              }
            } }
            wrapTemplate={ ( slide ) => {
              return (
                <Box
                  padding={ 4 }
                  flexCenter
                  borderRadius={ 3 }
                  border
                  margin={ [ 2,1 ] }
                  children={ slide }
                />
              );
            } }
            slides={ [
              'test1',
              'test2',
              'test3',
              'test4',
            ] }
          />
        </Flex>
      </Box>
    </>
  );
}

export const DesignBook: FNC<{}> = () => {
  let defaultTabIndex = Number( localStorage.getItem( 'designTabHeader' ) ) | 0;

  let [ val_tabIndex,set_tabIndex ] = useState( defaultTabIndex );

  return (
    <>
      <Flex
        flexType="col"
        minHeight={ 'contentHeight' }
      >
        <Layout.TabBar
          tabIndex={ val_tabIndex }
          tabs={ [
            <>
              <FontAwesomeIcon
                fontSize={ '3.paragraph' }
                marginRight={ '2/3' }
                d='gears'
              /> Basic
            </>,<>
              <FontAwesomeIcon
                fontSize={ '3.paragraph' }
                marginRight={ '2/3' }
                d='diagram-cells'
              /> Buttons
            </>,<>
              <FontAwesomeIcon
                fontSize={ '3.paragraph' }
                marginRight={ '2/3' }
                d='input-pipe'
              /> Inputs
            </>,<>
              <FontAwesomeIcon
                fontSize={ '3.paragraph' }
                marginRight={ '2/3' }
                d='chart-tree-map'
              /> Styling
            </>,<>
              <FontAwesomeIcon
                fontSize={ '3.paragraph' }
                marginRight={ '2/3' }
                d='gif'
              /> Effection
            </>,<>
              <FontAwesomeIcon
                fontSize={ '3.paragraph' }
                marginRight={ '2/3' }
                d='image'
              /> Logo
            </>,<>
              <FontAwesomeIcon
                d="chart-tree-map"
                fontSize={ '3.paragraph' }
                marginRight={ '2/3' }
              /> Tables
            </>,<>
              <FontAwesomeIcon
                fontSize={ '3.paragraph' }
                marginRight={ '2/3' }
                d='image'
              /> Croppie
            </>,<>
              <FontAwesomeIcon
                fontSize={ '3.paragraph' }
                marginRight={ '2/3' }
                d='cube'
              /> PlayGround
            </>
          ] }
          onTabChange={ ( index ) => {
            localStorage.setItem( 'designTabHeader',String( index ) );
            set_tabIndex( index );
          } }
          position='sticky'
          positionTop='topBase'
          UnderBreakPointStyles={ {
            position: 'static',
            positionTop: 0
          } }
        />
        <Box flexSizing={ 0 }>
          <Layout.PageViewController
            minHeight={ '100%' }
            swipeOptions={ {
              enable: true,
              mouseDrag: true,
              onSlide: ( index ) => {
                set_tabIndex( index );
              }
            } }
            viewIndex={ val_tabIndex }
            views={ [
              <Basic._Origin />,
              <Button._Origin />,
              <Inputs />,
              <Styling />,
              <Effections._Origin />,
              <Logos._Origin />,
              <Tables._Origin />,
              <Cropping />,
              <PlayGround />
            ] }
            wrapTemplate={ ( View ) => {
              return (
                <Layout.Plate>
                  <Flex
                    gap={ 2 }
                    padding={ 2 }
                    flexWrap
                    flexChilds={ 'auto' }
                    children={ View }
                  />
                </Layout.Plate>
              );
            } }
          />
        </Box>
      </Flex>
    </>
  );
}
