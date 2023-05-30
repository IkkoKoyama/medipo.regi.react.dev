namespace amotify {
  namespace fn {
    namespace Modal {
      interface Method {
        contents: {
          [ key: string ]: {
            open: boolean
            closeType: CloseType
            index: number
            params: Modal.Params
          }
        }
        open( props: Modal.Params ): void
        update: {
          size( modalId: string,size: SizeParams ): void
          refresh( params: Modal.Params ): void
        }
        toggle( props: Modal.Params ): void
        close: {
          pin( modalId: string | null,eventType?: CloseEventType ): void
          group( modalGroup: string ): void
          all( pageTransition?: boolean ): void
        }
        Attachment: {
          Header: FNC<Atoms.BoxProps>
          Body: FNC<Atoms.BoxProps>
          Footer: FNC<Atoms.FlexProps>
        }
      }
    
      type CloseType = 'hide' | 'remove'
      type Params = ImageParams | CenterLeftRightParams | Free.Params | BottomParams
    
      type UniParams = {
        modalId: string
        modalGroup?: string
        type: 'center' | 'left' | 'right' | 'bottom' | 'image' | 'free'
        closeOption?: {
          type?: CloseType
          pageTransition?: false | 'hide' | 'remove'
          escapeKeyDown?: boolean
          aroundClick?: boolean
        }
        openAfter?: {
          (): void
        }
        closeAfter?: {
          (): void
        }
      }
    
      type SizeParams = 'S' | 'R' | 'L' | 'XL' | 'MAX'
      type ImageParams = UniParams & {
        type: 'image'
        src: string
      }
      type CenterLeftRightParams = UniParams & {
        type: 'center' | 'left' | 'right'
        className?: string
        size?: SizeParams
        content: ReactElement | {
          (): JSX.Element
        }
      } & amotifyUniStyleParams
    
      namespace Free {
        type Params = UniParams & {
          type: 'free'
          children: ReactElement
          closeOption?: {
            type?: CloseType
            delegateEscapeKeyDown?: boolean
            delegateAroundClick?: boolean
          }
        } & setPositionParams & amotifyUniStyleParams
    
        type setPositionParams = {
          parent: string | EventTarget | HTMLElement
          gravityPoint?: number | false
          gravityPointUnderBreakPoint?: number | false
          setReposition?: boolean
        }
      }
      type BottomParams = UniParams & {
        type: 'bottom'
        viewHeights?: BottomSizeParams | BottomSizeParams[]
        content: ReactElement
      }
      type BottomSizeParams = 'S' | 'R' | 'L'
    
      type CloseEventType = 'escape' | 'pageTransition'
    }
    
    namespace SnackBar {
      interface Method {
        add( props: AddParams ): SnackBar.Method
        remove( componentId: string ): SnackBar.Method
      }
      type AddParams = Omit<Atoms.BoxProps,'children'> & {
        componentId?: string
        secondsToClose?: number
        custom?: boolean
      } & ( {
        custom?: false
        children: ReactElement
        disableCloseButton?: boolean
      } | {
        custom: true
        children: FNC<{ onCloseCallBack: any }>
      } )
    }
    
    namespace Loader {
      type Method = FNC<ComponentParams> & FNs
    
      type ComponentParams = amotifyBasicElement & {
        theme?: boolean
        size?: 'S' | 'R' | 'L'
      }
    
      type FNs = {
        fn: {
          active: {
            ( type?: Loader.TypeProps | Loader.TypeProps[] ): void
          }
          stop(): void
        }
      }
      type TypeProps = 'ALL' | 'top' | 'corner' | 'mini';
    }
    
    namespace Tooltips {
      interface Method {
        launch( params: Params ): void
        hide(): void
      }
      type Params = ToolTipsEffect & {
        OriginalRect: DOMRect
      }
    }
  }
}