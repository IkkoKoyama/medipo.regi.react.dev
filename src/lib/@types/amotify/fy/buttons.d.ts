namespace amotify {
  namespace fn {
    namespace Buttons {
      type Methods = {
        Button: CoreTypes<ButtonInput>
        Label: CoreTypes<LabelInput>
        Anchor: CoreTypes<AnchorInput>
        MFButton: FNC<MultiFunction.Params>
      }
      namespace Tones {
        type Normal<T> = T & {
          color?: 'theme' | 'posi' | 'nega' | 'plain'
        }
        type Prime<T> = T & {
          color?: 'theme' | 'posi' | 'nega' | 'warn' | 'mono'
        }
        type Sub<T> = T & {
          color?: 'theme' | 'posi' | 'nega' | 'warn' | 'cloud'
        }
        type Clear<T> = T & {
          color?: 'theme' | 'posi' | 'nega' | 'warn' | 'mono' | 'white' | 'cloud'
        }
        type Border<T> = T & {
          color?: 'theme' | 'nega' | 'plain'
        }
        type FillToBorder<T> = T & {
          color?: 'theme' | 'posi' | 'nega' | 'warn' | 'mono' | 'white'
        }
        type BorderToFill<T> = T & {
          color?: 'theme' | 'posi' | 'nega' | 'warn' | 'mono' | 'white'
        }
      }

      type CoreTypes<T> = {
        Normal: ( props: Tones.Normal<T> ) => JSX.Element
        Prime: ( props: Tones.Prime<T> ) => JSX.Element
        Sub: ( props: Tones.Sub<T> ) => JSX.Element
        Clear: ( props: Tones.Clear<T> ) => JSX.Element
        Border: ( props: Tones.Border<T> ) => JSX.Element
        Link: ( props: T ) => JSX.Element
        Plain: ( props: T ) => JSX.Element
        UniqueStyle: {
          FillToBorder: ( props: Tones.FillToBorder<T> ) => JSX.Element
          BorderToFill: ( props: Tones.BorderToFill<T> ) => JSX.Element
        }
      }


      type UniParams = SizeProps & amotifyBasicElement & {
        tabIndex?: number
        children?: ReactElement
        'aria-label'?: string
        isLocked?: boolean
      }
      type delegateClickEventProps = 'auxEnter' | 'enter' | 'space'

      type SizeProps = {
        size?: 'XS' | 'S' | 'R' | 'L'
      }

      type ButtonInput = UniParams & {
        submitOption?: {
          formName: string
          acceptInvalidForm?: boolean
          inputKeyEventsSubmitDelegated?: delegateClickEventProps | delegateClickEventProps[]
          callback( form: plainObject,ok: boolean ): void
        }
      } & React.ButtonHTMLAttributes<HTMLButtonElement>
      type LabelInput = UniParams & {
        htmlFor?: string
      } & React.LabelHTMLAttributes<HTMLLabelElement>
      type AnchorInput = UniParams & {
        href: string
        newTab?: boolean
        sync?: boolean
        download?: any
        shiftQueryParams?: boolean
      } & React.ButtonHTMLAttributes<HTMLAnchorElement>

      namespace MultiFunction {
        type Params = amotifyBasicElement & SizeProps & {
          type: 'prime' | 'sub' | 'border'
          color: 'theme' | 'nega'
          content: ReactElement
          onClick: React.MouseEventHandler<HTMLButtonElement>
          detailsModal: {
            ( closeCallBack: Function ): ReactElement
          }
          closeModalDelegationAroundClick?: boolean
        }
      }
    }
  }
}