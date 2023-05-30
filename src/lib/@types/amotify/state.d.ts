type ReactElement = React.ReactNode | React.ReactNode[]
type amotifyBasicElement = amotify.UniStyles.BasicTagParams & amotifyUniStyleParams
type amotifyUniStyleParams = amotify.UniStyles.Params & {
  freeCSS?: React.CSSProperties

  UnderBreakPointStyles?: amotify.UniStyles.Params
  UnderPhonePointStyles?: amotify.UniStyles.Params
  hoverStyles?: amotify.UniStyles.Params

  ssEffectsOnActive?: amotify.UniStyles.Others.EffectsOnActiveTypes | amotify.UniStyles.Others.EffectsOnActiveTypes[] | false
  ssPushable?: boolean
  ssMiniLoader?: {
    color?: 'theme' | 'white'
    size?: 'S' | 'R' | 'L'
  }
  ssChildsPointerEvents?: 'none' | 'all'
  ssLastChildLossBorder?: 'bottom' | 'right' | false
  ssChildsBottomBorder?: BorderProps

  ssTooltips?: amotify.UniStyles.Others.ToolTipsEffect | false

  urlPathTrigger?: string
  copyToClipboard?: {
    type?: 'string' | 'image'
    data: string | {
      (): string
    }
  }
}
namespace amotify {
  namespace UniStyles {
    type BasicTagParams = {
      className?: string
      id?: string
      componentId?: string
    }

    type Params = Pargins.Params & Fonts.Params & Borders.Params & FlexGrids.Params & Sizes.Params & StyleSets.Params & {
      backgroundColor?: Others.BackgroundColorParams

      boxShadow?: 1 | 2 | 3 | 4 | -1 | -2 | 'none'

      display?: 'block' | 'none' | 'flex' | 'grid'

      gap?: Others.gapParams
      overflow?: Others.overflowParams
      position?: 'relative' | 'absolute' | 'fixed' | 'sticky' | 'static'

      positionTop?: Others.TRBLParams | 'topBase' | 'topNavigationHeight'
      positionRight?: Others.TRBLParams
      positionBottom?: Others.TRBLParams
      positionLeft?: Others.TRBLParams

      opacity?: 'trans' | 'low' | 'middle' | 'high' | 'most'

      transition?: 'none' | 'short' | 'middle' | 'long'
    }
    namespace Pargins {
      type Params = {
        margin?: GroupParams
        marginTop?: UnitParams
        marginRight?: UnitParams
        marginBottom?: UnitParams
        marginLeft?: UnitParams

        padding?: GroupParams
        paddingTop?: UnitParams
        paddingRight?: UnitParams
        paddingBottom?: UnitParams
        paddingLeft?: UnitParams
      }

      type UnitParams =
        0 | '1/12' | '1/6' | '1/4' | '1/3' | '1/2' | '2/3' | '3/4' |
        1 | 1.5 | 2 | 3 | 4 | 6 |
        'auto' | 'safeAreaTop' | 'safeAreaBottom'
      type GroupParams = UnitParams | [ UnitParams,UnitParams ] | [ UnitParams,UnitParams,UnitParams,UnitParams ]
    }
    namespace Borders {
      type Params = {
        border?: BorderParams
        borderTop?: BorderParams
        borderRight?: BorderParams
        borderBottom?: BorderParams
        borderLeft?: BorderParams

        borderWidth?: WidthParams
        borderTopWidth?: WidthParams
        borderRightWidth?: WidthParams
        borderBottomWidth?: WidthParams
        borderLeftWidth?: WidthParams

        borderColor?: ColorParams
        borderTopColor?: ColorParams
        borderRightColor?: ColorParams
        borderBottomColor?: ColorParams
        borderLeftColor?: ColorParams

        borderStyle?: StyleParams
        borderTopStyle?: StyleParams
        borderRightStyle?: StyleParams
        borderBottomStyle?: StyleParams
        borderLeftStyle?: StyleParams

        borderRadius?: RadiusParams | [ RadiusParams,RadiusParams,RadiusParams,RadiusParams ]
        borderTopLeftRadius?: RadiusParams
        borderTopRightRadius?: RadiusParams
        borderBottomLeftRadius?: RadiusParams
        borderBottomRightRadius?: RadiusParams
      }
      type BorderParams = boolean | '0.trans' | '1.thin' | '2.normal' | '3.strong' | 'unset'
      type WidthParams = 0 | 1 | 2 | 3 | 4
      type ColorParams = '0.trans' | '1.thin' | '2.normal' | '3.strong' | 'theme' | 'posi' | 'nega' | 'warn' | 'mono' | 'white'
      type StyleParams = 'solid' | 'dashed' | 'double' | 'dotted'
      type RadiusParams = 0 | '1/3' | '2/3' | 1 | 2 | 3 | 4 | 'sphere' | 'inherit' |
        '1.tone.primary' | '2.tone.secondary' | '3.tone.tertiary'
    }
    namespace FlexGrids {
      type Params = {
        flexSizing?: 'none' | 'auto' | 0
        flexWrap?: boolean
        flexCenter?: boolean
        flexType?: TypeParams
        flexChilds?: 'even' | 'auto'
        flexGrid?: GridParams
        flexNewLine?: boolean
        verticalAlign?: VerticalAlignParams
        horizontalAlign?: HorizontalAlignParams

        gridCenter?: boolean
        gridCols?: GridColsParams
      }

      type TypeParams = 'row' | 'row-r' | 'col' | 'col-r'
      type VerticalAlignParams = 'center' | 'top' | 'bottom' | 'baseline' | 'unset'
      type HorizontalAlignParams = 'center' | 'left' | 'right' | 'between' | 'around' | 'even' | 'unset'
      type GridParams = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'unset'

      type GridColsParams = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    }
    namespace Fonts {
      type Params = {
        fontColor?: ColorParams
        fontSize?: SizeParams
        fontWeight?: WeightParams

        lineHeight?: 0 | 1 | 2 | 3
        textAlign?: 'left' | 'center' | 'right'
      }
      type WeightParams = '1.lighter' | '2.normal' | '3.bold'
      type ColorParams =
        Others.UniColors |
        '1.clear' | '2.normal' | '3.blur' | '4.thin' | '5.translucent' |
        'mono' | 'monoSecond' | 'logo'
      type SizeParams =
        '0.xs' |
        '1.mini' |
        '2.normal' |
        '3.paragraph' |
        '4.thirdTitle' |
        '5.subTitle' |
        '6.title' |
        '7.landing' |
        '8.xl' | 'inherit'
    }
    namespace Sizes {
      type Params = {
        maxHeight?: 0 | '100%' | 'viewHeight' | 'topNavigationHeight' | 'sideNavigationHeight' | 'contentHeight' | 'unset'
        maxWidth?: 0 | '100%' | 'unset'
        minHeight?: 0 | '100%' | 'viewHeight' | 'topNavigationHeight' | 'sideNavigationHeight' | 'contentHeight' | 'unset'
        minWidth?: 0 | '100%' | 'unset'

        sWidth?: SizeParams | '1/4%' | '1/3%' | '1/2%' | '2/3%' | '3/4%' | '100%' | 'viewWidth' | 'auto'
        sHeight?: SizeParams | '1/4%' | '1/3%' | '1/2%' | '2/3%' | '3/4%' | '100%' | 'viewHeight' | 'topNavigationHeight' | 'sideNavigationHeight' | 'contentHeight' | 'auto'
        _width?: SizeParams | '1/4%' | '1/3%' | '1/2%' | '2/3%' | '3/4%' | '100%' | 'viewWidth' | 'auto'
        _height?: SizeParams | '1/4%' | '1/3%' | '1/2%' | '2/3%' | '3/4%' | '100%' | 'viewHeight' | 'topNavigationHeight' | 'sideNavigationHeight' | 'contentHeight' | 'auto'
      }

      type SizeParams = 0 | '1/12' | '1/6' | '1/4' | '1/3' | '1/2' | '2/3' | '3/4' | 1 | 1.5 | 2 | 3 | 4 | 6 | 8 | 12
    }
    namespace StyleSets {
      type Params = {
        ssCardBox?: boolean | 'border' | 'cloud' | 'plain'
        ssCardBoxHeader?: boolean
        ssCardBoxBody?: boolean
        ssCardBoxFooter?: boolean

        ssAbsoluteCovered?: boolean
        ssTextEllipsis?: boolean
      }
    }
    namespace Others {
      type gapUnitParams = 0 | '1/12' | '1/6' | '1/4' | '1/3' | '1/2' | '2/3' | '3/4' | 1 | 1.5 | 2 | 2.5 | 3 | 4
      type gapParams = gapUnitParams | [ gapUnitParams,gapUnitParams ]

      type overflowUnitParams = 'auto' | 'hidden' | 'scroll' | 'visible' | 'unset'
      type overflowParams = overflowUnitParams | [ overflowUnitParams,overflowUnitParams ]

      type UniColors = 'inherit' | 'theme' | 'posi' | 'nega' | 'warn' | 'white' | 'black'
      type BackgroundColorParams =
        UniColors |
        '1.layer.base' | '2.layer.cloud' | '3.layer.canvas' | '4.layer.darken' | '5.layer.darker' | '6.layer.darkest' |
        '1.tone.primary' | '2.tone.reverse' |

        'boxCloud' |

        'lcOpFew' | 'lcOpLow' | 'lcOpMiddle' | 'lcOpHigh' |
        'tcOpFew' | 'tcOpLow' | 'tcOpMiddle' | 'tcOpHigh' |
        'tcLighten' | 'tcLighter' | 'tcLightest' |
        'tcDarken' | 'tcDarker' | 'tcDarkest' |
        'negaOpLow' | 'negaOpMiddle' |
        'posiOpLow' | 'posiOpMiddle' |
        'trans' | 'dark' | 'monoPrime' | 'monoSecond' | 'none'


      type TRBLParams =
        0 | '1/12' | '1/6' | '1/4' | '1/3' | '1/2' | '2/3' | '3/4' |
        1 | 2 | 3 | 4 | 6 |
        '50%' | '100%'

      type EffectsOnActiveTypes =
        'ripple.white' | 'ripple.cloud' | 'ripple.theme' | 'ripple.posi' | 'ripple.nega' | 'ripple.warn' | 'none' |
        'expand' | 'shrink' | 'pudding' | 'fade'

      type ToolTipsEffect = {
        type?: 'topCenter' | 'topLeft' | 'topRight' | 'bottomCenter' | 'bottomLeft' | 'bottomRight' | 'centerLeft' | 'centerRight'
        children: ReactElement
        conditions?(): boolean
      } & Atoms.BoxProps
    }
  }
}