namespace Modal {
  interface Method {
    contents : Modal.Props[]
    toggle: {
      ( props: Modal.Props ): void
    }
    add: {
      ( props: Modal.Props ): void
    }
    remove: {
      ( modalId: string | null,eventType?: CloseEventType ): void
    }
    open: {
      ( props: Modal.Props ): void
    }
    close: {
      (): void
    }
  }

  type Props = {
    modalId: string
    type: 'center' | 'left' | 'right' | 'image' | 'free'
    closeDelegationEscapeKey?: boolean
    closeDelgationAroundClick?: boolean
    openAfterCallBack?: {
      (): void
    }
  } & (
      CenterLeftRightProps | ImageProps | FreeProps
    )

  type ImageProps = {
    type : 'image'
    src: string
  }
  type CenterLeftRightProps = {
    type: 'center' | 'left' | 'right'
    className?: string
    styles?: OriginalStyleProps
    size?: 'S' | 'R' | 'L' | 'XL' | 'MAX'
    header: {
      ( callBackModalClose: Atoms.Button.onClickProps ): ReactElement
    } | ReactElement | false
    body: {
      ( callBackModalClose: Atoms.Button.onClickProps ): ReactElement
    } | ReactElement
    footer: {
      ( callBackModalClose: Atoms.Button.onClickProps ): ReactElement
    } | ReactElement | false
  }
  type FreeProps = {
    type : 'free'
    closeDelgationAroundClick? : void
    body : {
      ( callBackModalClose: Atoms.Button.onClickProps ): ReactElement
    } | ReactElement
    parent : string
  }

  type CloseEventType = 'escape'
}


namespace Toast {
  interface Method {
    add: {
      ( props: Toast.AddProps ): void
    },
    remove: {
      ( toastId: string ): void
    }
  }
  type AddProps = {
    toastId: string
    type: 'plain' | 'message' | 'custom'
    hideInterval?: boolean
    hideTime?: number
    appearance?: 'plain' | 'dark' | 'theme' | 'border' | 'posi' | 'nega' | 'warn'
    soundEffect?: 'dageki' | 'papo' | 'mokkin'
  } & (
      {
        type: 'message'
        senderImage?: string
        senderName: string
        message: ReactElement
        hideCloseButton?: boolean
      } | {
        type: 'plain'
        message: ReactElement
        hideCloseButton?: boolean
      } | {
        type: 'custom'
        closeButton: {
          ( callback: Atoms.Button.onClickProps ): ReactElement
        }
        content: {
          ( closeButton: ReactElement ): ReactElement
        }
      }
    )
}


namespace Loader {
  interface Method {
    active: {
      ( type?: Loader.TypeProps | Loader.TypeProps[] ): void
    }
    stop(): void
  }
  type Props = {

  }
  type TypeProps = 'ALL' | 'top' | 'corner' | 'mini';
}

namespace Tips {
  interface Method {
    launch: {
      (
        props: Tips.Props
      ): void
    }
    hide(): void
  }
  type Props = {
    type: TipsEffectPositionProps,
    styles: OriginalStyleProps,
    editable?: boolean,
    content: ReactElement,
    OriginalRect: DOMRect
  }
}

namespace Console {
  interface Method {
    launch: {
      (): void
    }
  }
}

var Modal: Modal.Method
var Toast: Toast.Method
var Loader: Loader.Method
var Tips: Tips.Method
var Console: Console.Method