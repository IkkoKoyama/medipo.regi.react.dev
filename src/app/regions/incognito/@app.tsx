const {
  glob: {
    React,
    Render
  },
  atoms: {
    Input,
    Box,
    Flex,
    Span,
    Buttons: {
      Anchor
    }
  },
  orgs: {
    PageRouter
  },
  xtraMinifyComponent : {
    logos: {
      MingooIcon,
      MinifyLogoH
    }
  }
} = AMOT;

import style from './style.module.scss';
style.launch;

import { SignLink } from './SignLink/page';

const IncognitoPlate: FNC<{ children: ReactElement }> = ( props ) => {
  let {
    children
  } = props;

  return (
    <Flex
      flexCenter={ true }
      className={ style.Wrap }
    >
      { children }
      <Box
        className={ style.Footer }
        phoneStyles={ {
          position: 'relative'
        } }
        children={
          <Flex
            justify='right'
            align='center'
            gap={ 1 }
            children={
              <>
                <Span fontColor={ 3 } fontSize={ 0 }>
                  Presented by
                </Span>
                <Anchor.Clear
                  size='S'
                  href="https://google.com"
                  tabIndex={ -1 }
                  newTab={ true }
                  padding={ -1 }
                  activeEffect={ 'ripple.theme' }
                >
                  <Flex gap={ -1 } flexCenter={ true }>
                    <MingooIcon size='S' /> mingoo
                  </Flex>
                </Anchor.Clear>
              </>
            }
          />
        }
      />
    </Flex>
  );
}

let Pages =
  <PageRouter
    list={
      [ {
        path: '*',
        body:
          <IncognitoPlate>
            <SignLink />
          </IncognitoPlate>
      } ]
    }
  />;

Render( {
  base: '#MAIN',
  content: Pages
} );