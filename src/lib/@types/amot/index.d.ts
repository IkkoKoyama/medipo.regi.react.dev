declare module "*.scss";
declare module "react-dom";

type FNC<P> = React.FC<P>;

interface plainObject {
  [ index: string ]: any;
}

namespace Glob {
  /** glob.render  */
  type RenderProps = {
    (
      props: {
        base: string,
        content: React.ReactNode,
        nonRouter?: boolean
      }
    ): void;
  }

  /** glob.useStore */
  type useStoreProps = {
    ( props: {
      insertId: string,
      deleteId?: string,
      data?: plainObject
    } ): void
  }
}
namespace Atoms {
  /* atoms.box */
  type BoxProps = TagProps & {
    children?: ReactElement
  } & React.DOMAttributes<HTMLDivElement>
  type SpanProps = TagProps & {
    children?: ReactElement
  } & React.DOMAttributes<HTMLSpanElement>
  type ParagraphProps = TagProps & {
    children?: ReactElement
  } & React.DOMAttributes<HTMLParagraphElement>
  type LoadingProps = TagProps & {
    theme?: boolean
  }

  namespace Canvas {
    type Props = PureTagProps & {
      width?: string
      height?: string
    } & React.DOMAttributes<HTMLCanvasElement>
  }
  namespace Iframe {
    type Props = TagProps & {
      src? : string
      frameBorder? : string
    } & React.DOMAttributes<HTMLIFrameElement>
  }
  /* atoms.button */
  namespace Buttons {
    type Types = {
      Button: CoreTypes<ButtonInput>
      Label: CoreTypes<LabelInput>
      Anchor: CoreTypes<AnchorInput>
      MFButton: FNC<MultiFunctionInput>
    }
    type CoreTypes<T> = {
      Prime: (
        props: T &
          SizeProps & PrimeColorProps
      ) => JSX.Element
      Sub: (
        props: T &
          SizeProps &
          TransProps & {
            color?: 'theme' | 'posi' | 'nega' | 'warn' | 'mono'
          }
      ) => JSX.Element
      Clear: ( props: T &
        SizeProps & {
          color?: 'theme' | 'posi' | 'nega' | 'warn' | 'trans'
        }
      ) => JSX.Element
      Border: ( props: T &
        SizeProps & {
          color?: 'theme' | 'nega'
        }
      ) => JSX.Element
      Link: ( props: T ) => JSX.Element
      Plain: ( props: T ) => JSX.Element
    }

    type UniProps = TagProps & {
      tabIndex?: number
      children?: ReactElement
      'aria-label'?: string
      disabled?: boolean
    }
    type delegateClickEventProps = 'auxEnter' | 'enter' | 'space'

    type SizeProps = {
      size?: 'S' | 'R' | 'L'
    }
    type PrimeColorProps = {
      color?: 'theme' | 'posi' | 'nega' | 'warn' | 'mono'
    }
    type TransProps = {
      transColorAtDefault?: boolean
    }

    type ButtonInput = UniProps & {
      formButton?: string
      submitDelegationFormInputKeydownEvents?: delegateClickEventProps[]
    } & React.DOMAttributes<HTMLButtonElement>
    type LabelInput = UniProps & {
      htmlFor?: string
    } & React.DOMAttributes<HTMLLabelElement>
    type AnchorInput = UniProps & {
      href: string
      newTab?: boolean
      sync?: boolean
      download?: any
      shiftQueryParams?: boolean
    } & React.DOMAttributes<HTMLAnchorElement>

    type MultiFunctionInput = TagProps & SizeProps & {
      type: 'prime' | 'sub' | 'border'
      color: 'theme' | 'nega'
      content: ReactElement
      onClick: Atoms.Button.onClickProps
      detailsModal: {
        ( closeCallBack: Function ): ReactElement
      }
      closeModalDelegationAroundClick?: boolean
    }
  }

  /* atoms.flex */
  type FlexProps = TagProps & {
    children?: ReactElement
    gap?: gapProps
    wrap?: boolean

    type?: flexDirectionProp
    align?: alignItemsProp
    justify?: justifyContentProp
  } & React.DOMAttributes<HTMLDivElement>

  /* atoms.grid */
  type GridProps = TagProps & {
    children: any
    gap?: gapProps
    center?: boolean
    cols: GridNumberProp

    onClick?: {
      ( event: React.MouseEvent<HTMLDivElement,MouseEvent> ): void
    }
  } & React.DOMAttributes<HTMLDivElement>

  /* atoms.icon */
  type IconProps = TagProps & {
    d: string
  } & React.DOMAttributes<HTMLDivElement>

  /* atoms.image */
  type ImageProps = TagProps & {
    src: string
    alt?: string
    showExpand?: boolean | string
  } & React.DOMAttributes<HTMLImageElement>

  /* atoms.logo */
  namespace Logos {
    type SizeProps = {
      size?: 'S' | 'R' | 'L' | '2L' | '3L'
    }
    type ITProps = TagProps & SizeProps & {
      children: ReactElement | FNC<any>
    }
    type HVProps = TagProps & SizeProps & {
      icon: FNC<SizeProps>
      title: FNC<SizeProps>
    }

    type LogoTypes = {
      Icon: ( props: ITProps ) => JSX.Element
      Title: ( props: ITProps ) => JSX.Element
      Horizon: ( props: HVProps ) => JSX.Element
      Vertical: ( props: HVProps ) => JSX.Element
    }
  }
  /* atoms.switchList  */
  type SwitchsProps = {
    appearance?: 'plain' | 'cloud' | 'border'
    name?: string
    form?: string
    value: string | number
    list: SwitchListProp[]
    cellStyles?: OriginalStyleProps
    onChangeEvent?: Input.OnChangeCallBack
  }
  type SwitchListProp = {
    value: string | number
    label: ReactElement
    id?: string
  }
}

namespace Mols {
  /* mols.accordion  */
  type AccordionProps = {
    appearance?: 'plain' | 'cloud' | 'border' | 'inBorder'
    open?: boolean
    toggleLabel?: ReactElement
    toggleId?: string
    children: ReactElement
    styles?: OriginalStyleProps
    headStyles?: OriginalStyleProps
    onToggleEvent?: {
      ( open: boolean ): void
    }
  }

  /* mols.list  */
  type ListPropsType = 'row' | 'sides' | 'col'
  type ListProps = TagProps & {
    appearance?: 'plain' | 'border'
    type?: ListPropsType
    title?: ReactElement
    rowStyle?: OriginalStyleProps
    rowColumnGap?: gapProp
    gridsRate?: [ flexGrowProp,flexGrowProp ]
    list: ( {
      type?: ListPropsType
      title?: ReactElement
      content: ReactElement
      style?: OriginalStyleProps
    } )[]
  }

  /** mols.SwipeContent */
  type SwipeContentProps = TagProps & {
    defaultSlideIndex?: index
    slides: ReactElement[]
    slideTemplate?: {
      ( slide: ReactElement ): ReactElement
    }
    option?: {
      onSlide?: {
        ( index: number ): void
      }
      indicator?: boolean
      showOtherSwipe?: boolean
      swipeOn?: {
        mouseDrag?: boolean
        touchMove?: boolean
        auto?: number
      }
      loop?: boolean
    }
  }

  /** mols.LinkifyText */
  type LinkifyTextProps = {
    text: string
    placeholder?: ReactElement
  }
}
namespace Orgs {
  /** orgs.pageRouter */
  namespace PageRouter {
    type RoutesProps = {
      path: string,
      body: ReactElement
    }
    type Callbacks = {
      beforeCallBack?: {
        ( pathName: string ): void
      }
      afterCallBack?: {
        ( pathName: string ): void
      }
      afterFirstCallBack?: {
        ( pathName: string ): void
      }
    }
    type RoutesSwitchProps = {
      routes: RoutesProps[]
    } & Callbacks
    type RouterProps = {
      list: RoutesProps[]
    } & Callbacks
  }

  /** orgs.tab  */
  type TabContentProps = {
    defaultTabIndex: number
    onTabChange?: {
      ( index: number ): void
    }
    Swipeable?: boolean
    tabBar: {
      freeSpace?: ReactElement
      id?: string
      sticky?: string[] | true
      stickyWhenPhone?: boolean
      gap?: gapProps
      justify?: 'center' | 'left' | 'right'
      className?: string
      styles?: OriginalStyleProps
    }
    bodyTemplate?: {
      ( body: ReactElement ): ReactElement
    }
    contents: {
      tab: ReactElement
      body: ReactElement
    }[]
  }

  type LayoutContentProps = {
    size?: 'S' | 'R' | 'L' | 'XL' | 'MAX'
    children: ReactElement
    styles?: OriginalStyleProps
  }

  namespace Tables {
    type UniProps = {
      colLength: number
      appearance?: {
        format?: 'border' | 'cellBorder' | 'rowBorder' | 'plain',
        base?: {
          className?: string
          style?: OriginalStyleProps
        },
        cell?: {
          className?: string
          style?: OriginalStyleProps
        },
      }
    }
    namespace Plain {
      type HeadProps = {
        label: ReactElement
        style?: OriginalStyleProps
        className?: string
        colSpan?: number
        rowSpan?: number
      }
      type DataProps = {
        type?: 'th' | 'td'
        label: ReactElement
        style?: OriginalStyleProps
        className?: string
        colSpan?: number
        rowSpan?: number
      }
      type RowProps = {
        rowId?: number | string
        columns: DataProps[]
      }

      type Props = UniProps & {
        head?: HeadProps[]
        rows: RowProps[]

        rowClickCallBack?: {
          ( rowIdOrIndex: string | number ): void
        }
      }
    }
    namespace Data {
      type HeadProps = {
        label: ReactElement
        data: string | number
        style?: OriginalStyleProps
        className?: string
        colSpan?: number
        rowSpan?: number
      }
      type DataProps = {
        type?: 'th' | 'td'
        label: ReactElement
        data: string | number
        orderIndex?: string | number
        style?: OriginalStyleProps
        className?: string
        colSpan?: number
        rowSpan?: number
      }
      type RowProps = {
        rowId?: number | string
        searchData?: string
        columns: DataProps[]
      }
      type Props = UniProps & {
        head: HeadProps[]
        rows: RowProps[]

        tableId?: string

        stickyHead?: boolean
        stickyLeft?: boolean
        stickyRight?: boolean

        option?: OptionProps

        rowClickCallBack?: RowClickCallBackProps
      }
      type OptionProps = {
        info?: boolean

        search?: boolean
        defaultSearchKeyword?: string

        filter?: boolean | boolean[]

        order?: boolean | boolean[]
        defaultOrder?: OrderProps

        paging?: boolean
        rowLengthChange?: boolean
        rowLengthList?: number[]
        defaultRowLength?: number

        exportToSpreadSheet?: ExportToSpreadSheetProps
      }
      type RowClickCallBackProps = {
        ( rowIdOrIndex: string | number ): void
      }
      type FilterColumnsProps = {
        index: number
        keyword: string
        enabled: boolean
      }[]
      type OrderProps = [ number,'ASC' | 'DESC' ]

      type ExportToSpreadSheetProps = {
        fileName: string
        type: 'xlsx' | 'csv'
      }
    }
    namespace Drag {
      type HeadProps = {
        label: ReactElement
        style?: OriginalStyleProps
        className?: string
        colSpan?: number
      }
      type DataProps = {
        type?: 'th' | 'td'
        label: ReactElement
        style?: OriginalStyleProps
        className?: string
        colSpan?: number
      }
      type RowProps = {
        rowId: number | string
        columns: DataProps[]
      }
      type Props = UniProps & {
        head: HeadProps[] | false
        rows: RowProps[]
        onDragCallBack: onDragCallBack
      }

      type onDragCallBack = {
        ( orderList: any[] ): void | number[]
      }
    }
    namespace Spread {

    }

    type Props = {
      Plain: ( props: Plain.Props ) => JSX.Element
      Data: ( props: Data.Props ) => JSX.Element
      Drag: ( props: Drag.Props ) => JSX.Element
      Spread: () => JSX.Element
    }
  }

  namespace Cropper {
    type Props = {
      use: 'profile' | 'header'
      triggerId?: string
      develops: {
        size: 'S' | 'R' | 'L'
        maxSize?: number
      }[]
      onProcessFinished: {
        ( files: File[] ): void
      }
    }
  }
}
namespace Temps {
  /** temps.layout  */
  namespace Layout {
    type LayoutType = 'HNC' | 'NC' | 'HC';

    type HeaderProps = {
      leftSpace?: ReactElement
      rightSpace?: ReactElement
      sticky?: boolean
      stickyWhenPhone?: boolean
    }

    type HNCProps = {
      content: ReactElement
      header: HeaderProps

      navMenus: NavMenuProp[]
      navBarPositionWhenPhone?: 'bottom' | 'left'
    }

    type HCProps = {
      content: ReactElement
      header: HeaderProps
    }
    type CProps = {
      content: ReactElement
    }

    type NavMenuProp = {
      type: 'anchor' | 'button' | 'border' | 'title'
    } & (
        {
          type: 'anchor'
          href: string
          icon: ReactElement
          label: ReactElement
          tipsContent?: ReactElement
          hideWhenPhone?: boolean
          hideWhenTablet?: boolean
        } | {
          type: 'button'
          icon: ReactElement
          label: ReactElement
          tipsContent?: ReactElement
          hideWhenPhone?: boolean
          hideWhenTablet?: boolean
          onClick: Atoms.Button.onClickProps
        } | {
          type: 'border'
        } | {
          type: 'title'
          content: ReactElement
        }
      )
  }
}

namespace AMOT {
  interface GLOB {
    React: typeof React
    useState: typeof React.useState
    useEffect: typeof React.useEffect
    useRef: typeof React.useRef
    useLocation: typeof ReactRouterDom.useLocation
    useHistory: typeof ReactRouterDom.useHistory
    Component: typeof React.Component
    __Routes: typeof ReactRouterDom.Switch
    __Route: typeof ReactRouterDom.Route
    __Link: typeof ReactRouterDom.Link

    StyleConvert<T extends any>( props: T ): T & {
      className: string
    }

    useStore: Glob.useStoreProps
    Render: Glob.RenderProps
  }
  interface Atoms {
    Flex: FNC<Atoms.FlexProps>
    FlexBr: FNC<{}>

    Loading: FNC<Atoms.LoadingProps>

    Canvas: FNC<Atoms.Canvas.Props>
    Iframe: FNC<Atoms.Iframe.Props>

    Grid: FNC<Atoms.GridProps>

    Buttons: Atoms.Buttons.Types

    Icon: FNC<Atoms.IconProps>
    Box: FNC<Atoms.BoxProps>
    Span: FNC<Atoms.SpanProps>
    Paragraph: FNC<Atoms.ParagraphProps>
    Img: FNC<Atoms.ImageProps>
    Input: Input.Types
    Switchs: FNC<Atoms.SwitchsProps>

    Logo: Atoms.Logos.LogoTypes
  }
  interface Mols {
    List: FNC<Mols.ListProps>
    Accordion: FNC<Mols.AccordionProps>
    SwipeContent: FNC<Mols.SwipeContentProps>
    LinkifyText: FNC<Atoms.LinkifyTextProps>
  }
  interface Orgs {
    TabContent: FNC<Orgs.TabContentProps>
    Table: Orgs.Tables.Props
    PageRouter: FNC<Orgs.PageRouter.RouterProps>
    PageNotFound: FNC<{}>
    LayoutContent: FNC<Orgs.LayoutContentProps>
    Cropper: FNC<Orgs.Cropper.Props>
  }
  interface Temps {
    LayoutHNC: FNC<Temps.Layout.HNCProps>
    LayoutHC: FNC<Temps.Layout.HCProps>
    LayoutC: FNC<Temps.Layout.CProps>
  }
  interface APP { }
}
interface AMOT {
  config: {
    version: string
    layoutStyle: number
    themeColor: number
    darkMode: boolean
    readonly device: {
      isWhat: string
      isMiniDisplay: boolean
      isPhone: boolean
      isMouseDevice: boolean
      isTouchDevice: boolean
      isIOS: boolean
    }
    foreignLibraryRequired( type: string ): void
    update: {
      layoutStyle( value: number ): void
      themeColor( value: number ): void
      darkMode( value: boolean ): void
    }
  }
  glob: AMOT.GLOB
  atoms: AMOT.Atoms
  mols: AMOT.Mols
  orgs: AMOT.Orgs
  temps: AMOT.Temps
  app: AMOT.APP
  inmemory: {
    [ key: string ]: plainObject
  }
}
var AMOT: AMOT;