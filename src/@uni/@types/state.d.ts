type ReactElement = React.ReactNode | React.ReactNode[]

type flexDirectionProp = 'row' | 'row-r' | 'col' | 'col-r'
type flexColSizeProp = GridNumberProp | 'auto' | 'none'
type alignItemsProp = 'center' | 'top' | 'bottom'
type justifyContentProp = 'center' | 'left' | 'right' | 'between' | 'around' | 'even'

type GridNumberProp = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

type gapProp = -2 | -1 | 0 | 1 | 1.5 | 2 | 2.5 | 3 | 4 | 6 | 8 | 12

type TagProps = {
  style? : React.CSSProperties
  className? : string
  id? : string
} & OriginalStyleProps

type PureStyleProps = {
  gap? : gapProp

  display? : DisplayProps
  position? : PositionProps
  overflow? : 'auto' | 'hidden' | 'scroll' | 'visible' | 'none'
  textAligin? : TextAliginProp
  fontColor? : FontColorProp
  fontSize? : FontSizeProp
  fontWeight? : FontWeightProp
  whiteSpace? : WhiteSpaceProps
  
  backgroundColor? : backgroundColorProp

  boxShadow? : boxShadowProps

  padding? : ParginProps
  paddingTop? : ParginProp
  paddingRight? : ParginProp
  paddingBottom? : ParginProp
  paddingLeft? : ParginProp
  
  margin? : ParginProps
  marginTop? : ParginProp
  marginRight? : ParginProp
  marginBottom? : ParginProp
  marginLeft? : ParginProp

  top? : PositionProp
  right? : PositionProp
  bottom? : PositionProp
  left? : PositionProp

  border? : BorderProps
  borderTop? : BorderProps
  borderRight? : BorderProps
  borderBottom? : BorderProps
  borderLeft? : BorderProps
  borderColor? : BorderColorProps

  borderRadius? : BorderRadiusProps
  borderRadiusTopLeft? : BorderRadiusProp
  borderRadiusTopRight? : BorderRadiusProp
  borderRadiusBottomLeft? : BorderRadiusProp
  borderRadiusBottomRight? : BorderRadiusProp
  
  flexCenter? : true
  flexWrap? : boolean
  flexDirection? : flexDirectionProp
  flexColSize? : flexColSizeProp
  alignItems? : alignItemsProp
  justifyContent? : justifyContentProp

  gridCenter? : true
  gridCols? : GridNumberProp

  maxHeight? : MinMaxSizeProps
  maxWidth? : MinMaxSizeProps
  minHeight? : MinMaxSizeProps
  minWidth? : MinMaxSizeProps

  width? : SizeProps
  height? : SizeProps
}

type OriginalStyleProps = PureStyleProps & {
  phoneStyles? : PureStyleProps

  customStyle? : React.CSSProperties

  rippleEffect? : boolean | 'theme' | 'posi' | 'nega' | 'warn'
  activeEffect? : 'expand' | 'shrink' | 'pudding'

  miniLoader? : boolean | 'theme'

  customScroll? : boolean
  
  tipsEffect? : TipsEffectProps

  copyToClipBoard? : {
    type? : 'string' | 'image'
    data : string | {
      () : string
    }
  }
}

type ColorProps = 'inherit' | 'theme' | 'posi' | 'nega' | 'warn' | 'logo' | 'dark' | 'white' | 'black'

type DisplayProps = 'block' | 'none' | 'flex' | 'grid' | 'inline' | 'inlineFlex' | 'inlineBlock';
type PositionProps = 'relative' | 'absolute' | 'fixed' | 'sticky'
type TextAliginProp = 'center' | 'left' | 'right'
type FontColorProp = ColorProps | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
type FontWeightProp = 1 | 2 | 3
type FontSizeProp = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
type WhiteSpaceProps = 'normal' | 'nowrap' | 'pre' |'preWrap'

type backgroundColorProp = ColorProps | 1 | 2 | 3 | 4 | 5 | 6 | -1 | -2 | -3 | 'trans' | 'themeAlfa1' | 'themeAlfa2' | 'themeAlfa3' | 'none'

type boxShadowProps = 1 | 2 | 3 | 4 | 5 | -1 | -2 | -3 | -4 | -5

type PositionProp = -3 | -2 | -1 | 0 | 1 | 1.5 | 2 | 2.5 | 3 | 4 | 6 | 8 | 10 | 12 | 'auto'

type ParginProp = -3 | -2 | -1 | 0 | 1 | 1.5 | 2 | 2.5 | 3 | 4 | 6 | 8 | 10 | 12 | 'auto'
type ParginProps = ParginProp | [ ParginProp,ParginProp ] | [ ParginProp,ParginProp,ParginProp,ParginProp ]

type BorderRadiusProp = -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 50 | 100 | 'inherit'
type BorderRadiusProps = BorderRadiusProp |  [ BorderRadiusProp,BorderRadiusProp,BorderRadiusProp,BorderRadiusProp ]
type BorderProps = 'none' | 0 | 1 | 2 | 3
type BorderColorProps = 0 | 1 | 2 | 3 | ColorProps

type MinMaxSizeProps = -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 6 | 8 | 10 | 12 | 18 | 24 | 30 | 36 | 42 | 48 | 60 | '100%'
type SizeProps = -3 | -2 | -1 | 0 | 1 | 1.5 | 2 | 2.5 | 3 | 4 | 6 | 8 | 10 | 12 | '25%' | '50%' | '75%' | '100%' | 'auto'

type TipsEffectProps = {
  position? : TipsEffectPositionProps
  content : ReactElement
  styles? : OriginalStyleProps
  editable? : boolean
}
type TipsEffectPositionProps = 'topCenter' | 'topLeft' | 'topRight' | 'bottomCenter' | 'bottomLeft' | 'bottomRight' | 'centerLeft' | 'centerRight'