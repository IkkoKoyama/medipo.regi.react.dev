namespace Modal {
  interface Method {
    contents: {
      [ key: string ]: {
        open: boolean
        index: number
        props: Modal.Props
      }
    }
    toggle( props: Modal.Props ): void
    hide( modalId: string | null,eventType?: CloseEventType ): void
    hideALL(): void
    show( modalId: string ): void
    update( props: Modal.Props ): void
    add( props: Modal.Props ): void
    remove( modalId: string ): void
    removeALL(): void
  }

  type Props = {
    modalId: string
    type: 'center' | 'left' | 'right' | 'image' | 'free'
    closeDelegationEscapeKey?: boolean
    closeDelegationAroundClick?: boolean
    openAfter?: {
      (): void
    }
    hideAfter?: {
      (): void
    }
    removeAfter?: {
      (): void
    }
  } & (
      CenterLeftRightProps | ImageProps | FreeProps
    )

  type ImageProps = {
    type: 'image'
    src: string
  }
  type CenterLeftRightProps = {
    type: 'center' | 'left' | 'right'
    className?: string
    styles?: OriginalStyleProps
    size?: 'S' | 'R' | 'L' | 'XL' | 'MAX'
    header: FNC<StateProps> | ReactElement | false
    body: FNC<StateProps> | ReactElement
    footer: FNC<StateProps> | ReactElement | false
  }
  type FreeProps = {
    type: 'free'
    body: FNC<StateProps> | ReactElement
    parent: string | EventTarget | HTMLElement
    styles?: OriginalStyleProps
  }

  type CloseEventType = 'escape'

  type StateProps = {
    modalClose: Atoms.Button.onClickProps
  }
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
        content : FNC< { onCloseCallBack: Atoms.Button.onClickProps } >
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

var Modal: Modal.Method
var Toast: Toast.Method
var Loader: Loader.Method
var Tips: Tips.Method