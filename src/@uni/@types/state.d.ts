type ReactElement = FC | JSX.Element | string | number
type GridNumberProp = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
type gapProp = -2 | -1 | 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12

type ComProps = {
  componentId? : string
}
type TagProps = {
  style? : React.CSSProperties
  // 'aria-label'? : string
  // styles? : OriginalStyleProps
} & OriginalComponentProps & ComProps & OriginalStyleProps

type OriginalComponentProps = {
  tabIndex? : number
  disabled? : boolean
  className? : string
  
  id? : string
}
type OriginalStyleProps = {
  customStyle? : React.CSSProperties

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
  
  flexColSize? : GridNumberProp | 'auto' | 'none'
  flexCenter? : true
  
  maxHeight? : MinMaxSizeProps
  maxWidth? : MinMaxSizeProps
  minHeight? : MinMaxSizeProps
  minWidth? : MinMaxSizeProps

  width? : SizeProps
  height? : SizeProps

  rippleEffect? : true
  rippleEffectThemeColor? : true
  expandEffect? : true
  puddingEffect? : true

  miniLoader? : boolean
  miniLoaderThemeColor? : boolean

  customScroll? : boolean

  hideWhenPhone? : boolean
  hideWhenTablet? : boolean
  showWhenPhone? : boolean
  showWhenTablet? : boolean
  
  flexColWhenPhone? : boolean
  flexColWhenTablet? : boolean
  
  tipsEffect? : {
    position? : TipsEffectPositionProps
    content : ReactElement
    styles? : OriginalStyleProps
    editable? : boolean
  }

  copyToClipBoard? : {
    type? : 'string' | 'image'
    data : string | {
      () : string
    }
  }
}

type ColorProps = 'inherit' | 'theme' | 'posi' | 'nega' | 'warn' | 'logo' | 'dark' | 'white' | 'black';

type DisplayProps = 'block' | 'none' | 'flex' | 'grid' | 'inline' | 'inlineFlex' | 'inlineBlock';
type PositionProps = 'relative' | 'absolute' | 'fixed' | 'sticky'
type TextAliginProp = 'center' | 'left' | 'right'
type FontColorProp = ColorProps | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
type FontWeightProp = 1 | 2 | 3
type FontSizeProp = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
type WhiteSpaceProps = 'normal' | 'nowrap' | 'pre' |'preWrap'

type backgroundColorProp = ColorProps | 1 | 2 | 3 | 4 | 5 | -1 | -2 | -3 | 'trans' | 'themeAlfa1' | 'themeAlfa2' | 'themeAlfa3'

type boxShadowProps = 1 | 2 | 3 | 4 | 5 | -1 | -2 | -3 | -4 | -5

type ParginProp = -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 6 | 8 | 10 | 12 | 'auto'
type ParginProps = ParginProp | [ ParginProp,ParginProp ] | [ ParginProp,ParginProp,ParginProp,ParginProp ]

type BorderRadiusProp = -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 50 | 100 | 'inherit'
type BorderRadiusProps = BorderRadiusProp |  [ BorderRadiusProp,BorderRadiusProp,BorderRadiusProp,BorderRadiusProp ]
type BorderProps = 'none' | 0 | 1 | 2 | 3
type BorderColorProps = ColorProps

type MinMaxSizeProps = -2 | -1 | 0 | 1 | 2 | 3 | 4 | 6 | 8 | 10 | 12 | 18 | 24 | 30 | 36 | 42 | 48 | 60 | '100%'
type SizeProps = 0 | 25 | 50 | 75 | 100 | 'auto'

type TipsEffectPositionProps = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'centerLeft' | 'centerRight'