export { }

declare global {
  var appEnv: {

  }
}

global.appEnv = {} as any

declare global {
  namespace AMOT {
    interface APP {
      logo: {
        icon: FNC<Atoms.Logos.SizeProps>
        title: FNC<Atoms.Logos.SizeProps>
      }
    }
  }
}

const {
  glob: { React },
  atoms: { Logo },
  minifyGlobalComponent: {
    logos: {
      MinifyIcon,
      MinifyTitle
    }
  }
} = AMOT;

global.AMOT.app.logo = {
  // icon: ( props ) => ( <Logo.Icon { ...props } children={
  //   <img
  //     src={ Env.CDN.static + 'racco/@logo/Rotaract_Icon.svg' }
  //     alt=''
  //     style={ {
  //       padding: '.25rem'
  //     } }
  //   />
  // } /> ),
  icon : MinifyIcon,
  title: ( props ) => ( <Logo.Title { ...props } children={ 'medipo' } /> )
}