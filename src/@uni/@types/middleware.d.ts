namespace Modal {
  interface Method {
    deploy : {
      ( props : Modal.Props ) : Modal.Method
    },
    toggle : {
      () : Modal.Method
    },
    open : {
      ( props : Modal.Props ) : void
    },
    close : {
      ( eventType?:CloseEventType ) : void
    }  
    imageOpen : {
      ( src:string ) : void
    }
  }

  type Props = {
    modalId : string
    position : 'center' | 'left' | 'right'
    custom? : boolean
    toggle? : boolean
    className? : string
    size? : 'S' | 'R' | 'L' | 'XL'
    delegationAroundClickClose? : boolean
    delegationEscapeKeyClose? : boolean
  } & (
    {
      custom? : false
      header? : ReactElement | false
      body : ReactElement
      footer : {
        ( callBackModalClose : Atoms.Button.OnCallBackProps ) : ReactElement
      } | false
    } | {
      custom : true
      header? : undefined
      body? : undefined
      footer? : undefined
      content : {
        ( callBackModalClose : Atoms.Button.OnCallBackProps ) : ReactElement
      }
    }
  )
  type ImageProps = {
    src : string
  }

  type CloseEventType = 'escape'
}


namespace Toast {
  interface Method {
    add : {
      ( props : Toast.Props ) : void
    },
    remove : {
      ( toastId : string ) : void
    }
  }
  type Props = {
    toastId : string
    type : 'plain' | 'message' | 'custom'
    hideInterval? : boolean
    hideTime? : number
    appearance? : 'plain' | 'dark' | 'theme' | 'border' | 'posi' | 'nega' | 'warn'
    soundEffect? : 'dageki' | 'papo' | 'mokkin'
  } & (
    {
      type : 'message'
      senderImage? : string
      senderName : string
      message : ReactElement
      hideCloseButton? : boolean
    } | {
      type : 'plain'
      message : ReactElement
      hideCloseButton? : boolean
    } | {
      type : 'custom'
      closeButton : {
        ( callback : Atoms.Button.OnCallBackProps ) : ReactElement
      }
      content : {
        ( closeButton:ReactElement ) : ReactElement
      }
    }
  )
}


namespace Loader {
  interface Method {
    active : {
      ( type? : Loader.TypeProps | Loader.TypeProps[] ) : void
    }
    stop() : void
  }
  type Props = {

  }
  type TypeProps = 'ALL' | 'top' | 'corner' | 'mini';
}

namespace Tips {
  interface Method {
    launch : {
      (
        props : Tips.Props
      ) : void
    }
    hide() : void
  }
  type Props = {
    type : TipsEffectPositionProps,
    styles : OriginalStyleProps,
    editable? : boolean,
    content : ReactElement,
    OriginalRect : DOMRect
  }
}


var Modal : Modal.Method
var Toast : Toast.Method
var Loader : Loader.Method
var Tips : Tips.M