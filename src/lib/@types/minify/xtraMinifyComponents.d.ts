namespace xtraMinifyCompSpace {
  namespace Logos {
    type BrandLogoProps = TagProps & Atoms.Logos.SizeProps
  }
}

namespace AMOT {
  interface xtraMinifyComps {
    logos: {
      MingooIcon: FNC<xtraMinifyCompSpace.Logos.BrandLogoProps>
      GoogleIcon: FNC<xtraMinifyCompSpace.Logos.BrandLogoProps>
      FaceBookIcon: FNC<xtraMinifyCompSpace.Logos.BrandLogoProps>
      TwitterIcon: FNC<xtraMinifyCompSpace.Logos.BrandLogoProps>
      LINEIcon: FNC<xtraMinifyCompSpace.Logos.BrandLogoProps>

      MinifyIcon: FNC<xtraMinifyCompSpace.Logos.BrandLogoProps>
      MinifyTitle: FNC<xtraMinifyCompSpace.Logos.BrandLogoProps>
      MinifyLogoH: FNC<xtraMinifyCompSpace.Logos.BrandLogoProps>
      MinifyLogoV: FNC<xtraMinifyCompSpace.Logos.BrandLogoProps>

    }
    UniConsole : FNC<{}>
    DisplayModeChanger : FNC<{}>
  }
}

interface AMOT {
  xtraMinifyComponent: AMOT.xtraMinifyComps
}