type ReactElement = React.ReactNode | React.ReactNode[]

type flexDirectionProp = 'row' | 'row-r' | 'col' | 'col-r'
type alignItemsProp = 'center' | 'top' | 'bottom' | 'unset'
type justifyContentProp = 'center' | 'left' | 'right' | 'between' | 'around' | 'even' | 'unset'

type GridNumberProp = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

type gapProp = -2 | -1 | 0 | 1 | 1.5 | 2 | 2.5 | 3 | 4 | 6 | 8 | 12
type gapProps = gapProp | [ gapProp,gapProp ]

type flexGrowProp = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

type PureTagProps = {
  style? : React.CSSProperties
  className? : string
  id? : string
}
type TagProps = PureTagProps & OriginalStyleProps

type PureStyleProps = {
  backgroundColor? : backgroundColorProp

  boxShadow? : boxShadowProps
  
  border? : BorderProps
  borderTop? : BorderProps
  borderRight? : BorderProps
  borderBottom? : BorderProps
  borderLeft? : BorderProps
  borderColor? : BorderColorProps
  borderWidth? : 0 | 1 | 2 | 3 | 4

  borderRadius? : BorderRadiusProps | 'LBMain' | 'LBSub1' | 'LBSub2'
  borderRadiusTopLeft? : BorderRadiusProp
  borderRadiusTopRight? : BorderRadiusProp
  borderRadiusBottomLeft? : BorderRadiusProp
  borderRadiusBottomRight? : BorderRadiusProp

  display? : DisplayProps
  fontColor? : FontColorProp
  fontSize? : FontSizeProp
  fontWeight? : FontWeightProp
  gap? : gapProps
  margin? : ParginProps
  marginTop? : ParginProp
  marginRight? : ParginProp
  marginBottom? : ParginProp
  marginLeft? : ParginProp
  overflow? : 'auto' | 'hidden' | 'scroll' | 'visible' | 'unset'
  position? : PositionProps
  padding? : ParginProps
  paddingTop? : ParginProp
  paddingRight? : ParginProp
  paddingBottom? : ParginProp
  paddingLeft? : ParginProp
  textAligin? : TextAliginProp
  whiteSpace? : WhiteSpaceProps

  top? : PositionProp
  right? : PositionProp
  bottom? : PositionProp
  left? : PositionProp


  flexCenter? : boolean
  flexWrap? : boolean
  flexDirection? : flexDirectionProp

  flex? : 'none' | 'auto' | 0
  flexChilds? : 'even' | 'auto'
  flexGrow? : flexGrowProp
  flexBasis? : 0 | 'auto'
  flexShirnk? : 0 | 1

  alignItems? : alignItemsProp
  justifyContent? : justifyContentProp

  zIndex? : zIndexProps

  gridCenter? : boolean
  gridCols? : GridNumberProp

  maxHeight? : SizeProps
  maxWidth? : SizeProps
  minHeight? : SizeProps
  minWidth? : SizeProps

  wordBreak? : 'break-all' | 'normal'

  transition? : 0 | 1 | 2 | 3 | 4

  width? : SizeProps
  height? : SizeProps
}

type ActiveEffectTypes =
'remark.theme' | 'remark.posi' | 'remark.nega' | 'remark.warn' | 'remark.mono' |
'ripple.cloud' | 'ripple.theme' | 'ripple.posi' | 'ripple.nega' | 'ripple.warn' | 'none' |
'expand' | 'shrink' | 'pudding'

type OriginalStyleProps = PureStyleProps & {
  tabletStyles? : PureStyleProps
  tabPhoneStyles? : PureStyleProps
  phoneStyles? : PureStyleProps

  customStyle? : React.CSSProperties

  activeEffect? : ActiveEffectTypes | ActiveEffectTypes[]

  miniLoader? : boolean | 'theme'

  customScroll? : boolean

  tipsEffect? : TipsEffectProps

  ssTitle? : boolean
  ssSubTitle? : boolean

  ssButton? : 'submit' | 'sub'

  ssCardBox? : true | 'border' | 'cloud' | 'plain'
  ssCardBoxHeader? : boolean
  ssCardBoxBody? : boolean
  ssCardBoxFooter? : boolean


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
type FontColorProp = ColorProps | 1 | 2 | 3 | 4 | 5 | 6 | 'mono'
type FontWeightProp = 1 | 2 | 3
type FontSizeProp = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
type WhiteSpaceProps = 'normal' | 'nowrap' | 'pre' |'preWrap'

type backgroundColorProp =
ColorProps |
1 | 2 | 3 | 4 | 5 | 6 | -1 | -2 | -3 |
'themeAlfa1' | 'themeAlfa2' | 'themeAlfa3' |
'negaAlfa1' | 'negaAlfa2' |
'trans' |
'mono' | 'none' | 'LBMain' | 'LBReverse'

type boxShadowProps = 1 | 2 | 3 | 4 | 5 | -1 | -2 | -3 | -4 | -5

type PositionProp = -3 | -2 | -1 | 0 | 1 | 1.5 | 2 | 2.5 | 3 | 4 | 6 | 8 | 10 | 12 | 'auto'

type zIndexProps = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'inherit'

type ParginProp = -3 | -2 | -1 | 0 | 1 | 1.5 | 2 | 2.5 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 'auto'
type ParginProps = ParginProp | [ ParginProp,ParginProp ] | [ ParginProp,ParginProp,ParginProp,ParginProp ]

type BorderRadiusProp = -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 50 | 100 | 'inherit'
type BorderRadiusProps = BorderRadiusProp |  [ BorderRadiusProp,BorderRadiusProp,BorderRadiusProp,BorderRadiusProp ]
type BorderProps = 'none' | 0 | 1 | 2 | 3
type BorderColorProps = 0 | 1 | 2 | 3 | ColorProps

type SizeProps = -3 | -2 | -1 | 0 | 1 | 1.5 | 2 | 2.5 | 3 | 4 | 6 | 8 | 10 | 12 | 18 | 24 | 30 | 36 | 42 | 48 | 60 | '25%' | '33%' | '50%' | '66%' | '75%' | '100%' | 'auto'

type TipsEffectProps = {
  position? : TipsEffectPositionProps
  content : ReactElement
  styles? : OriginalStyleProps
  editable? : boolean
}
type TipsEffectPositionProps = 'topCenter' | 'topLeft' | 'topRight' | 'bottomCenter' | 'bottomLeft' | 'bottomRight' | 'centerLeft' | 'centerRight'