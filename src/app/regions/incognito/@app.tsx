const {
  glob: {
    LaunchReactApplication
  },
  atoms: {
    Box,
    Flex,
    Span
  },
  fn: {
    Layout,
    Input,
    Buttons
  },
  minifyComponent: {
    logos: {
      MingooIcon,
      MinifyLogoH
    }
  }
} = amotify;

import style from './style.module.scss';
style.launch;

import { SignLink } from './SignLink/page';

const IncognitoPlate: FNC<{ children: ReactElement }> = ( props ) => {
  let {
    children
  } = props;

  return (
    <Flex
      flexCenter
      className={ style.Wrap }
      padding={ [ 4,2 ] }
      UnderBreakPointStyles={ {
        padding: 1
      } }
    >
      { children }
      <Box
        className={ style.Footer }
        UnderBreakPointStyles={ {
          position: 'relative'
        } }
      >
        <Flex
          verticalAlign='center'
          horizontalAlign='right'
          gap={ 1 }
        >
          <Span
            fontColor={ '3.blur' }
            fontSize={ '0.xs' }
          >
            Presented by
          </Span>
          <Buttons.Anchor.Clear
            disabled={ true }
            size='S'
            href={ '' }
            tabIndex={ -1 }
            newTab={ true }
            padding={ '2/3' }
            ssEffectsOnActive={ 'ripple.theme' }
          >
            <Flex gap={ '2/3' } flexCenter={ true }>
              <MingooIcon size='S' /> mingoo
            </Flex>
          </Buttons.Anchor.Clear>
        </Flex>
      </Box>
    </Flex>
  );
}

let Pages = <Layout.PageRouter
  pages={ [ {
    path: '*',
    content: <IncognitoPlate>
      <SignLink />
    </IncognitoPlate>
  } ] }
/>;

LaunchReactApplication( {
  baseElement: '#MAIN',
  reactElement: Pages
} );