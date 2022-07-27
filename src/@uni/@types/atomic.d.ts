type FNC< P > = React.FC<P>;

namespace Glob {
  /* glob.Props */
  type PropsLeveling = {
    ( props : plainObject ) : plainObject
  }
  /** glob.render  */
  type RenderProps = {
    (
      props : {
        base : Element,
        content : ReactElement,
        nonRouter? : boolean
      }
    ) : void;
  }
  
  /** glob.useStore */
  type useStoreProps = {
    ( props : {
      insertId : string,
      deleteId? : string,
      data? : plainObject
    } ) : void
  }
}
namespace Atoms {
  /* atoms.box */
  type BoxProps = TagProps & {
    children?:ReactElement
  }
  type SpanProps = TagProps & {
    children?:ReactElement
  }
  type ParagraphProps = TagProps & {
    children?:ReactElement
  }
  type LoadingProps = {
    theme? : boolean
  }
  
  namespace Canvas {
    type Props = OriginalComponentProps & {
      width? : string
      height? : string
    }
  }
  /* atoms.button */
  namespace Button {
    type OnCallBackProps = {
      ( element:HTMLElement,event:React.ChangeEvent< any > ):void
    }
    type UniProps = TagProps & {
      type? : 'main' | 'sub' | 'normal' | 'shy' | 'clear' | 'pale' | 'cancel' | 'border' | 'trans' | 'borderVivid' | 'delete' | 'link' | 'plain'
      tabIndex? : number
      onClickCallBack? : OnCallBackProps
      onMouseOverCallBack? : OnCallBackProps
      onFocusCallBack? : OnCallBackProps
      children? : ReactElement
      delegationClickEvent? : delegateClickEventProps[]
      'aria-label'? : string
    }
    type delegateClickEventProps = 'auxEnter' | 'enter' | 'space'
    namespace Button {
      type Props = UniProps & {
        submitFormName? : string
      }
    }
    namespace Label {
      type Props = UniProps & {
        htmlFor? : string
      }
    }
    namespace Anchor {
      type Props = UniProps & {
        href : string
        target? : '_blank'
      }
    }
  }

  /* atoms.flex */
  type FlexProps = TagProps & {
    children? : ReactElement
    gap? : gapProp
    auto? : boolean
    center? : boolean
    wrap? : boolean
  
    type? : 'row' | 'row-r' | 'col' | 'col-r'
    align? : 'center' | 'top' | 'bottom'
    justify? : 'center' | 'left' | 'right' | 'between' | 'around' | 'even'
  }
  type FlexBoxProps = TagProps & {
    children?:ReactElement
    cols?:GridNumberProp | 'auto' | 'none'
    center?:boolean
  }
  
  /* atoms.grid */
  type GridProps = TagProps & {
    children:any
    gap?:gapProp
    center?:boolean
    cols:GridNumberProp | string
  }
  type GridBoxProps = TagProps & {
    children:any
  }
  
  /* atoms.icon */
  type IconProps = TagProps & {
    children:string
  }
  
  /* atoms.image */
  type ImageProps = TagProps & {
    src : string
    alt : string
    showExpand? : boolean
  }
  
  /* atoms.logo */
  type LogoProps = TagProps & {
    size?:'S' | 'R' | 'L' | '2L' | '3L'
  }
  
  /* atoms.switchList  */
  type SwitchsProps = {
    appearance?:'plain' | 'cloud' | 'border'
    name:string
    form?:string
    value:string | number
    list:SwitchListProp[]
    onChangeEvent?:Input.OnChangeCallBack
  }
  type SwitchListProp = {
    value:string | number
    label:ReactElement
    id?:string
  }
}

namespace Mols {
  /* mols.accordion  */
  type AccordionProps = {
    open?:boolean
    id:string
    children:ReactElement
    onToggleEvent? : {
      ( open:boolean ) : void
    }
  }
  
  /* mols.cardBox */
  type CardBoxProps = TagProps & {
    appearance? : 'plain' | 'cloud' | 'border' | 'inBorder'
    type? : string
    title? : string
    header? : string | JSX.Element
    body : string | JSX.Element
    footer? : string | JSX.Element
    space? : ParginProp
  }
  
  /* mols.list  */
  type ListPropsType = 'row' | 'col' | 'colStep'
  type ListProps = TagProps & {
    appearance? : 'plain' | 'border'
    type? : ListPropsType
    title? : ReactElement
    rowStyle? : OriginalStyleProps
    list : ({
      type? : ListPropsType
      title? : ReactElement
      content : ReactElement
      style? : OriginalStyleProps
    })[]
  }

  /** mols.Table  */
  type TableProps = TagProps & {
    appearance? : 'plain' | 'borderCell' | 'border' | 'cloud'
    colLength : number
    data : {
      type? : 'th' | 'td'
      content : ReactElement
    }[][]

    colStyle? : OriginalStyleProps
  }
}


namespace Orgs {
  /** orgs.pageRouter */
  namespace PageRouter {
    type RoutesProps = {
      path:string,
      body:ReactElement
    }
    type Callbacks = {
      beforeCallBack?:{
        ( pathName:string ) : void
      }
      afterCallBack?:{
        ( pathName:string ) : void
      }
      afterFirstCallBack?:{
        ( pathName:string ) : void
      }
    }
    type RoutesSwitchProps = {
      routes:RoutesProps[]
    } & Callbacks
    type RouterProps = {
      list:RoutesProps[]
    } & Callbacks
  }
  
  /** orgs.tab  */
  type TabProps = ComProps & {
    tabIndex : number
    tabChangeCallBack? : {
      ( index : number ) : void
    }
    appearance? : 'border' | 'vivid' | 'simple'
    headerFreeSpace? : ReactElement
    headerLabelName : string
    headerBottomBorder? : boolean
    list : {
      title : any,
      content : any
    }[]
  } & (
    {
      headerSticky : true
      stickyTarget : string[]
    } | {
      headerSticky? : false
      stickyTarget? : void
    }
  )

  type LayoutContentProps = {
    size? : 'S' | 'R' | 'L' | 'XL' | 'MAX'
    children : ReactElement
    styles? : OriginalStyleProps
  }

  namespace DataTable {
    type Props = {
      appearance? : 'border' | 'cellBorder' | 'rowBorder'
      styles? : OriginalStyleProps
      colLength : number
  
      header : DataTable.HeadProps | false
      body : DataTable.DataProps[]
    } & (
      {
        dragable : true
        dragableCallBack? : DataTable.DragableCallBack
  
        disableConsole? : void
        info? : void
        search? : void
        searchKeyword? : void
        paging? : void
        lengthChange?: void
        defaultLength?: void
        filter? : void
        
        order? : void
        defaultOrder? : void
      } | {
        dragable? : void
        dragableCallBack? : void
        
        disableConsole? : true
        info? : boolean
        search? :boolean
        searchKeyword? : string
        paging? : boolean
        lengthChange?: number[]
        defaultLength?: number
        filter? : true | number[]
        
        order? : boolean | number[]
        defaultOrder? : DataTable.OrderProps
      }
    )
    type FilterColumnsProps = {
      index : number
      keyword : string
      enabled : boolean
    }[]
    type HeadProps = {
      data : {
        content : ReactElement
        styles? : OriginalStyleProps
        className? : string
      }[]
    } & (
      {
        sticky : true
        stickyTarget : string[]
      } | {
        sticky? : false
        stickyTarget? : void
      }
    )

    type DataProps = {
      searchKeyword? : string
      rowId? : number | string
      [ key : number ] : {
        type? : 'th' | 'td'
        content : ReactElement
        keyword : string
        styles? : OriginalStyleProps
        className? : string
      }
      [ Symbol.iterator ]()
    }
    type DragableCallBack = {
      ( orderList : any[] ) : void | number[]
    }
    type OrderProps = [ number,'ASC' | 'DESC' ]
  }

  namespace Cropper {
    type Props = {
      use : 'profile' | 'head'
      triggerId? : string
      maxImageSize? : number
      onProcessFinished : {
        (
          args : {
            dataUrl : string,
            blob : Blob
          }
        ) : any
      }
    }
  }
}

namespace Temps {
  /** temps.layout  */
  namespace Layout {
    type ColorProp = 'plain' | 'cloud' | 'theme' | 'dark'
    type BorderProp = 'border' | 'shadow' | 'none'
    type LayoutType = 'HNC' | 'NC' | 'HC';
  
    type HeaderProps = {
      type : LayoutType
      color : ColorProp
      sticky : boolean
      border : BorderProp
      freeSpace? : ReactElement
      enableGlobalSearcher? : true
    }
    type NavProps = {
      appearance? : 'cell' | 'list' | 'listBorder'
      type : LayoutType
      color : ColorProp
      sticky : boolean
      border : BorderProp | 'shadowInset'
      menus : NavMenuProp[]
    }
    
    type HNCProps = {
      responsiveNavBar:'bottom' | 'left'
      content:ReactElement
      headerProps:Omit<HeaderProps,'type'>
      navProps:Omit<NavProps,'type'>
    }
  
    type HCProps = {
      content:ReactElement
      headerProps:Omit<HeaderProps,'type'>
    }
    type CProps = {
      content:ReactElement
    }
  
    type NavMenuProp = {
      type : 'link' | 'label' | 'button' | 'border' | 'title'
    } & (
      {
        type : 'link'
        href : string
        icon : ReactElement
        title : ReactElement
        tipsContent? : ReactElement
      } | {
        type : 'label'
        htmlFor : string
        icon : ReactElement
        title : ReactElement
        tipsContent? : ReactElement
      } | {
        type : 'button'
        icon : ReactElement
        title : ReactElement
        tipsContent? : ReactElement
        ClickEvent : {
          ( element:HTMLElement,event:React.ChangeEvent<any>) : void
        }
      } | {
        type : 'border'
      } | {
        type : 'title'
        title : ReactElement
      }
    )
  }
}


namespace AMOT {
  interface GLOB {
    React : typeof React
    useState : typeof React.useState
    useEffect : typeof React.useEffect
    useRef : typeof React.useRef
    useLocation : typeof ReactRouterDom.useLocation
    Component : typeof React.Component
    __Routes : typeof ReactRouterDom.Switch
    __Route : typeof ReactRouterDom.Route
    __Link : typeof ReactRouterDom.Link

    Props : Glob.PropsLeveling
    useStore : Glob.useStoreProps
    Render : Glob.RenderProps
  }
  interface Atoms {
    Flex : FNC< Atoms.FlexProps >
    FlexBr : FNC< {} >

    Loading : FNC< Atoms.Loading >

    Canvas : FNC< Atoms.Canvas.Props >

    Grid : FNC< Atoms.GridProps >
    GridBox : FNC< Atoms.GridBoxProps >

    Button : FNC< Atoms.Button.Button.Props >
    Link : FNC< Atoms.Button.Anchor.Props >
    Label : FNC< Atoms.Button.Label.Props >

    Icon : FNC< Atoms.IconProps >
    Box : FNC< Atoms.BoxProps >
    Span : FNC< Atoms.SpanProps >
    Paragraph : FNC< Atoms.ParagraphProps >
    Br : FNC< {} >
    Img : FNC< Atoms.ImageProps >
    Input : Input.Types
    Switchs : FNC< Atoms.SwitchsProps >
  }
  interface Mols {
    CardBox : FNC< Mols.CardBoxProps >
    List : FNC< Mols.ListProps >
    Table : FNC< Mols.TableProps >
    Accordion : FNC< Mols.AccordionProps >
  }
  interface Orgs {
    Tab : FNC< Orgs.TabProps >
    DataTable : FNC< Orgs.DataTable.Props >
    PageRouter : FNC< Orgs.PageRouter.RouterProps >
    PageNotFound : FNC< {} >
    LayoutContent : FNC< Orgs.LayoutContentProps >
    Cropper : FNC< Orgs.Cropper.Props >
  }
  interface Temps {
    LayoutHNC : FNC< Temps.Layout.HNCProps >
    LayoutHC : FNC< Temps.Layout.HCProps >
    LayoutC : FNC< Temps.Layout.CProps >
    DesignBook : FNC< {} >
  }
  interface Logos {
    MingooIcon : FNC< Atoms.LogoProps >
    GoogleIcon : FNC< Atoms.LogoProps >
    FaceBookIcon : FNC< Atoms.LogoProps >
    TwitterIcon : FNC< Atoms.LogoProps >
    LINEIcon : FNC< Atoms.LogoProps >
    
    MinifyIcon : FNC< Atoms.LogoProps >
    MinifyTitle : FNC< Atoms.LogoProps >
    MinifyLogoH : FNC< Atoms.LogoProps >
    MinifyLogoV : FNC< Atoms.LogoProps >
    
    AppIcon : FNC< Atoms.LogoProps >
    AppTitle : FNC< Atoms.LogoProps >
    AppLogoH : FNC< Atoms.LogoProps >
    AppLogoV : FNC< Atoms.LogoProps >
  }
  interface APP {
    logo : {
      icon : JSX.Element | FC
      title : JSX.Element | FC
    }
  }
}
interface AMOT {
  glob : AMOT.GLOB
  atoms : AMOT.Atoms
  mols : AMOT.Mols
  orgs : AMOT.Orgs
  temps : AMOT.Temps
  logos : AMOT.Logos
  app : AMOT.APP
}
var AMOT : AMOT;