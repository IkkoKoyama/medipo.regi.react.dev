namespace minifyComponentSpace {
  namespace Logos {
    type BrandLogoProps = TagProps & Atoms.Logos.SizeProps
  }
}

namespace amotify {
  interface minifyComponent {
    logos: {
      MingooIcon: FNC<minifyComponentSpace.Logos.BrandLogoProps>
      GoogleIcon: FNC<minifyComponentSpace.Logos.BrandLogoProps>
      FaceBookIcon: FNC<minifyComponentSpace.Logos.BrandLogoProps>
      TwitterIcon: FNC<minifyComponentSpace.Logos.BrandLogoProps>
      LINEIcon: FNC<minifyComponentSpace.Logos.BrandLogoProps>

      MinifyIcon: FNC<minifyComponentSpace.Logos.BrandLogoProps>
      MinifyTitle: FNC<minifyComponentSpace.Logos.BrandLogoProps>
      MinifyLogoH: FNC<minifyComponentSpace.Logos.BrandLogoProps>
      MinifyLogoV: FNC<minifyComponentSpace.Logos.BrandLogoProps>

    }
    UniConsole : FNC<{}>
    DarkModeChanger : FNC<{}>
  }
}

interface amotify {
  minifyComponent : amotify.minifyComponent
}