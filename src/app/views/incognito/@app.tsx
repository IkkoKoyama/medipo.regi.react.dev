const {
  glob : {
    React,
    Render
  },
  atoms : {
    Input,
    Box,
    Flex,
    Span,
    Link
  },
  orgs : {
    PageRouter
  },
  temps : {
    DesignBook
  },
  logos : {
    MingooIcon
  }
} = AMOT;

import style from './style.module.scss';
style.launch;

import { SignIn } from './SignIn/page';

const IncognitoPlate:FNC<{ children:ReactElement }> = ( props ) => {
  let {
    children
  } = props;

  return (
    <Flex
      center={ true }
      className={ style.Wrap }
      children={
        <>
          { children }
          <Box
            className={ style.Footer }
            hideWhenPhone={ false }
            children={
              <Flex
                justify='right'
                align='center'
                gap={ 1 }
                hideWhenPhone={ true }
                children={
                  <>
                    <Span
                      fontColor={ 3 }
                      fontSize={ 0 }
                    >
                      Presented by
                    </Span>
                    <Link
                      href="https://google.com"
                      tabIndex={ -1 }
                      type="clear"
                      target='_blank'
                      padding={ -1 }
                      rippleEffect={ true }
                      children={
                        <>
                          <Flex gap={ -1 } center={ true }>
                            <MingooIcon size='S' /> mingoo
                          </Flex>
                        </>
                      }
                    />
                  </>
                }
              />
            }
          />
        </>
      }
    />
  );
}

let root = $( '#root' )[ 0 ];
let Pages =
<PageRouter
  list={[
    {
      path : '/design',
      body : <DesignBook />
    },{
      path : '*',
      body : 
      <IncognitoPlate>
        <SignIn />
      </IncognitoPlate>
    }
  ]}
/>;

if ( root ) Render( {
  base : root,
  content : Pages
} );