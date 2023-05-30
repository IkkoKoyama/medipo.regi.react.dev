namespace amotify {
  namespace fn {
    namespace Layout {
      type Methods = {
        PageViewController: FNC<PageViewController.Params>
        TabBar: FNC<TabBar.Params>
        Plate: FNC<Plate.Params>
        SwipeView: FNC<SwipeView.Params>
    
        PageRouter: FNC<PageRouter.RouterProps>
    
        PageNotFound: FNC<{}>
    
        RootViewController: RootViewController.Methods
      }
    
      namespace PageViewController {
        type Params = {
          viewIndex: number
          views: ReactElement[]
          swipeOptions?: {
            enable?: boolean
            mouseDrag?: boolean
            touchMove?: boolean
            onSlide?: {
              ( index: number ): void
            }
          }
          wrapTemplate?: {
            ( view: ReactElement ): ReactElement
          }
        } & amotifyUniStyleParams
      }
    
      namespace TabBar {
        type Params = {
          tabIndex: number
          tabs: ReactElement[]
          topSpace?: ReactElement
          leftSpace?: ReactElement
          rightSpace?: ReactElement
    
          tabsStyles?: amotifyUniStyleParams
          onTabChange?: {
            ( index: number ): void
          }
    
          componentDidMount?: {
            (): void
          }
        } & amotifyBasicElement
      }
    
      namespace Plate {
        type Params = {
          size?: 'XS' | 'S' | 'R' | 'L' | 'XL' | 'MAX'
        } & Atoms.BoxProps
      }
    
      namespace SwipeView {
        type Params = amotifyBasicElement & {
          slideIndex?: index
          slides: ReactElement[]
          wrapTemplate?: {
            ( slide: ReactElement ): ReactElement
          }
          options?: {
            onSlideCB?: {
              ( index: number ): void
            }
            visibilitySurroundSlide?: boolean
            swipeableOnMouseDrag?: boolean
            swipeableOnTouchMove?: boolean
            autoSwipeSeconds?: number
            loop?: boolean
          }
        }
      }
    
      namespace PageRouter {
        type RoutesProps = {
          path: string
          content: ReactElement
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
          pages: RoutesProps[]
        } & Callbacks
      }
    
      namespace RootViewController {
        type Methods = {
          Base: FNC<RootViewController.BaseParams>
          Attachs: {
            Link: FNC<RootViewController.Attachs.SideNav.LinkParams>
            Button: FNC<RootViewController.Attachs.SideNav.ButtonParams>
            Details: FNC<RootViewController.Attachs.SideNav.DetailsParams>
            Bar: FNC<Atoms.BoxProps>
          }
        }
    
        type BaseParams = Atoms.BoxProps & {
          topNav: Attachs.TopNav.BaseParams
          sideNav: Attachs.SideNav.BaseParams
        }
        namespace Attachs {
          namespace TopNav {
            type BaseParams = {
              enable?: boolean
              leftSpace?: ReactElement
              rightSpace?: ReactElement
              bottomSpace?: ReactElement
            } & Atoms.FlexProps
          }
          namespace SideNav {
            type BaseParams = {
              enable?: boolean
              transformWhenTabPhone?: 'footerNav' | 'leftDrawer'
              contents: ReactElement
            } & Atoms.BoxProps
            type LinkParams = {
              pathGroup?: string
              icon: ReactElement
              label: ReactElement
            } & Buttons.AnchorInput
            type DetailsParams = {
              pathGroup?: string
              icon: ReactElement
              label: ReactElement
              childs: any
            } & Buttons.ButtonInput
            type ButtonParams = {
              icon: ReactElement
              label: ReactElement
            } & Buttons.ButtonInput
          }
        }
      }
    }
  }
}