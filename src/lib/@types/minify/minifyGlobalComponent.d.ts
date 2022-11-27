namespace minifyGlobalComponentSpace {
  namespace Logos {
    type BrandLogoProps = TagProps & Atoms.Logos.SizeProps
  }
}

namespace AMOT {
  interface minifyGlobalComponent {
    logos: {
      MingooIcon: FNC<minifyGlobalComponentSpace.Logos.BrandLogoProps>
      GoogleIcon: FNC<minifyGlobalComponentSpace.Logos.BrandLogoProps>
      FaceBookIcon: FNC<minifyGlobalComponentSpace.Logos.BrandLogoProps>
      TwitterIcon: FNC<minifyGlobalComponentSpace.Logos.BrandLogoProps>
      LINEIcon: FNC<minifyGlobalComponentSpace.Logos.BrandLogoProps>

      MinifyIcon: FNC<minifyGlobalComponentSpace.Logos.BrandLogoProps>
      MinifyTitle: FNC<minifyGlobalComponentSpace.Logos.BrandLogoProps>
      MinifyLogoH: FNC<minifyGlobalComponentSpace.Logos.BrandLogoProps>
      MinifyLogoV: FNC<minifyGlobalComponentSpace.Logos.BrandLogoProps>

    }
    UniConsole : FNC<{}>
    DarkModeChanger : FNC<{}>
  }
}

interface AMOT {
  minifyGlobalComponent : AMOT.minifyGlobalComponent
}