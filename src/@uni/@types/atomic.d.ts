type FNC<P> = React.FC<P>;

namespace Glob {
  /* glob.Props */
  type StyleConvertProps = {
    ( props: plainObject ): plainObject & {
      className: string
    }
  }
  /** glob.render  */
  type RenderProps = {
    (
      props: {
        base: Element,
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
    onClick?: {
      ( event: React.MouseEvent<HTMLDivElement,MouseEvent> ): void
    }
    onScroll?: {
      ( event: React.UIEvent<HTMLDivElement,UIEvent> ): void
    }
  }
  type SpanProps = TagProps & {
    children?: ReactElement
    onClick?: {
      ( event: React.MouseEvent<HTMLDivElement,MouseEvent> ): void
    }
  }
  type ParagraphProps = TagProps & {
    children?: ReactElement
  }
  type LoadingProps = {
    theme?: boolean
  }

  namespace Canvas {
    type Props = OriginalComponentProps & {
      width?: string
      height?: string
    }
  }
  /* atoms.button */
  namespace Button {
    type onClickProps = {
      (
        event: React.MouseEvent<HTMLElement>,
        option?: any
      ): void
    }
    type onFocusProps = {
      (
        event: React.FocusEvent<HTMLElement>,
        option?: any
      ): void
    }
    type onMouseOverProps = {
      (
        event: React.MouseEvent<HTMLElement>,
        option?: any
      ): void
    }
    type onKeyboardProps = {
      (
        event: React.KeyboardEvent<HTMLElement>,
        option?: any
      ): void
    }
    type UniProps = TagProps & {
      type?: 'main' | 'sub' | 'normal' | 'shy' | 'clear' | 'clearVivid' | 'pale' | 'paled' | 'cure' | 'cancel' | 'border' | 'trans' | 'borderVivid' | 'delete' | 'link' | 'plain'
      tabIndex?: number
      children?: ReactElement
      'aria-label'?: string
      disabled?: boolean

      onFocus?: onFocusProps
      onMouseOver?: onMouseOverProps
      onKeydown?: onKeyboardProps
      onKeyUp? : onKeyboardProps
      onClick?: onClickProps

      onClickDelegationKeyboardEvents?: delegateClickEventProps[]
    }
    type delegateClickEventProps = 'auxEnter' | 'enter' | 'space'
    type ButtonLabelProps = {
      onClickDelegationKeyboardEvents?: delegateClickEventProps[]
    }
    namespace Button {
      type Props = UniProps & {
        submitFormName?: string
      }
    }
    namespace Label {
      type Props = UniProps & {
        htmlFor?: string
      }
    }
    namespace Anchor {
      type Props = UniProps & {
        href: string
        target?: '_blank'
      }
    }
  }

  /* atoms.flex */
  type FlexProps = TagProps & {
    children?: ReactElement
    gap?: gapProp
    auto?: boolean
    center?: boolean
    wrap?: boolean
    even?: boolean

    type?: flexDirectionProp
    align?: alignItemsProp
    justify?: justifyContentProp

    onClick?: {
      ( event: React.MouseEvent<HTMLDivElement,MouseEvent> ): void
    }
  }
  type FlexBoxProps = TagProps & {
    children?: ReactElement
    cols?: flexColSizeProp
    center?: boolean
  }

  /* atoms.grid */
  type GridProps = TagProps & {
    children: any
    gap?: gapProp
    center?: boolean
    cols: GridNumberProp

    onClick?: {
      ( event: React.MouseEvent<HTMLDivElement,MouseEvent> ): void
    }
  }
  type GridBoxProps = TagProps & {
    children: any
  }

  /* atoms.icon */
  type IconProps = TagProps & {
    d: string
  }

  /* atoms.image */
  type ImageProps = TagProps & {
    src: string
    alt?: string
    showExpand?: boolean
  }

  /* atoms.logo */
  type LogoProps = TagProps & {
    size?: 'S' | 'R' | 'L' | '2L' | '3L'
  }

  /* atoms.switchList  */
  type SwitchsProps = {
    appearance?: 'plain' | 'cloud' | 'border'
    name: string
    form?: string
    value: string | number
    list: SwitchListProp[]
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

  /* mols.cardBox */
  type CardBoxProps = TagProps & {
    appearance?: 'plain' | 'cloud' | 'border' | 'inBorder'
    type?: string
    title?: string
    header?: string | JSX.Element
    body: string | JSX.Element
    footer?: string | JSX.Element
    space?: ParginProp
  }

  /* mols.list  */
  type ListPropsType = 'row' | 'col' | 'colStep'
  type ListProps = TagProps & {
    appearance?: 'plain' | 'border'
    type?: ListPropsType
    title?: ReactElement
    rowStyle?: OriginalStyleProps
    list: ( {
      type?: ListPropsType
      title?: ReactElement
      content: ReactElement
      style?: OriginalStyleProps
    } )[]
  }

  /** mols.MFButton */
  type MFButtonProps = TagProps & {
    content: ReactElement
    details: {
      content: ReactElement
      onClick: Atoms.Button.onClickProps
    }[]
    onClick: Atoms.Button.onClickProps
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
  type TabProps = {
    tabIndex: number
    tabIndexChangeCallBack?: {
      ( index: number ): void
    }
    header: {
      labelName: string
      freeSpace?: ReactElement
      id?: string
      stickyTarget?: string[] | true
      gap?: gapProp
      className?: string
      style?: OriginalStyleProps
      tabListJustify?: 'center' | 'left' | 'right' | 'between' | 'around' | 'even'
      label?: {
        className?: string
        style?: OriginalStyleProps
        checkedClassName?: string
        checkedStyle?: OriginalStyleProps
      }
    }
    wrapClassName?: string
    wrapStyle?: OriginalStyleProps
    contentTemplate?: {
      ( children: ReactElement ): ReactElement
    }
    contents: {
      label: ReactElement,
      content: ReactElement
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
      }
      type DataProps = {
        type?: 'th' | 'td'
        label: ReactElement
        style?: OriginalStyleProps
        className?: string
      }
      type RowProps = {
        rowId?: number | string
        columns: DataProps[]
      }

      type Props = UniProps & {
        head: HeadProps[] | false
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
      }
      type DataProps = {
        type?: 'th' | 'td'
        label: ReactElement
        data: string | number
        style?: OriginalStyleProps
        className?: string
      }
      type RowProps = {
        rowId?: number | string
        searchData?: string
        columns: DataProps[]
      }
      type Props = UniProps & {
        head: HeadProps[]
        rows: RowProps[]

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

        excelDownLoadable?: boolean
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
    }
    namespace Drag {
      type HeadProps = {
        label: ReactElement
        style?: OriginalStyleProps
        className?: string
      }
      type DataProps = {
        type?: 'th' | 'td'
        label: ReactElement
        style?: OriginalStyleProps
        className?: string
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
      use: 'profile' | 'head'
      triggerId?: string
      maxImageSize?: number
      onProcessFinished: {
        (
          args: {
            dataUrl: string,
            blob: Blob
          }
        ): any
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
      type: LayoutType
      color: ColorProp
      sticky: boolean
      border: BorderProp
      freeSpace?: ReactElement
      enableGlobalSearcher?: true
    }
    type NavProps = {
      appearance?: {
        format?: 'cell' | 'list' | 'listBorder',
        cell?: {
          className?: string
          style?: OriginalStyleProps
        }
      }
      type: LayoutType
      color: ColorProp
      sticky: boolean
      border: BorderProp | 'shadowInset'
      menus: NavMenuProp[]
    }
    type ContentProps = {
      color: 'plain' | 'cloud'
      body: ReactElement
    }

    type HNCProps = {
      responsiveNavBar: 'bottom' | 'left'
      contentProps: ContentProps
      headerProps: Omit<HeaderProps,'type'>
      navProps: Omit<NavProps,'type'>
    }

    type HCProps = {
      contentProps: ContentProps
      headerProps: Omit<HeaderProps,'type'>
    }
    type CProps = {
      contentProps: ContentProps
    }

    type NavMenuProp = {
      type: 'link' | 'label' | 'button' | 'border' | 'title'
      style?: OriginalStyleProps
      className?: string
    } & (
        {
          type: 'link'
          href: string
          icon: ReactElement
          label: ReactElement
          tipsContent?: ReactElement
        } | {
          type: 'label'
          htmlFor: string
          icon: ReactElement
          label: ReactElement
          tipsContent?: ReactElement
        } | {
          type: 'button'
          icon: ReactElement
          label: ReactElement
          tipsContent?: ReactElement
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
    Component: typeof React.Component
    __Routes: typeof ReactRouterDom.Switch
    __Route: typeof ReactRouterDom.Route
    __Link: typeof ReactRouterDom.Link

    StyleConvert: Glob.StyleConvertProps
    useStore: Glob.useStoreProps
    Render: Glob.RenderProps
  }
  interface Atoms {
    Flex: FNC<Atoms.FlexProps>
    FlexBr: FNC<{}>

    Loading: FNC<Atoms.Loading>

    Canvas: FNC<Atoms.Canvas.Props>

    Grid: FNC<Atoms.GridProps>
    GridBox: FNC<Atoms.GridBoxProps>

    Button: FNC<Atoms.Button.Button.Props>
    Link: FNC<Atoms.Button.Anchor.Props>
    Label: FNC<Atoms.Button.Label.Props>

    Icon: FNC<Atoms.IconProps>
    Box: FNC<Atoms.BoxProps>
    Span: FNC<Atoms.SpanProps>
    Paragraph: FNC<Atoms.ParagraphProps>
    Br: FNC<{}>
    Img: FNC<Atoms.ImageProps>
    Input: Input.Types
    Switchs: FNC<Atoms.SwitchsProps>
  }
  interface Mols {
    CardBox: FNC<Mols.CardBoxProps>
    List: FNC<Mols.ListProps>
    Accordion: FNC<Mols.AccordionProps>
    MFButton: FNC<Mols.MFButtonProps>
  }
  interface Orgs {
    Tab: FNC<Orgs.TabProps>
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
    DesignBook: FNC<{}>
  }
  interface Logos {
    MingooIcon: FNC<Atoms.LogoProps>
    GoogleIcon: FNC<Atoms.LogoProps>
    FaceBookIcon: FNC<Atoms.LogoProps>
    TwitterIcon: FNC<Atoms.LogoProps>
    LINEIcon: FNC<Atoms.LogoProps>

    MinifyIcon: FNC<Atoms.LogoProps>
    MinifyTitle: FNC<Atoms.LogoProps>
    MinifyLogoH: FNC<Atoms.LogoProps>
    MinifyLogoV: FNC<Atoms.LogoProps>

    AppIcon: FNC<Atoms.LogoProps>
    AppTitle: FNC<Atoms.LogoProps>
    AppLogoH: FNC<Atoms.LogoProps>
    AppLogoV: FNC<Atoms.LogoProps>
  }
  interface APP {
    logo: {
      icon: FNC<{}>
      title: FNC<{}>
    }
  }
}
interface AMOT {
  glob: AMOT.GLOB
  atoms: AMOT.Atoms
  mols: AMOT.Mols
  orgs: AMOT.Orgs
  temps: AMOT.Temps
  logos: AMOT.Logos
  app: AMOT.APP
}
var AMOT: AMOT;