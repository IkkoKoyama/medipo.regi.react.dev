namespace amotify {
  namespace fn {
    namespace Input {
      type Methods = {
        Plain: FNC<amotifyUniStyleParams & React.InputHTMLAttributes<HTMLInputElement>>
        Hidden: ( props: Hidden.PlainParams ) => JSX.Element
        Text: Text.Methods
        TextArea: ( props: TextArea.PlainParams ) => JSX.Element
        DigitCharacters: ( props: DigitCharacters.PlainParams ) => JSX.Element
        Time: Time.Methods
        Select: ( props: Select.PlainParams ) => JSX.Element
        List: List.Methods
        Chips: ( props: Chips.PlainParams ) => JSX.Element
        Search: ( props: Search.PlainParams ) => JSX.Element
        File: ( props: Filer.PlainParams ) => JSX.Element
        Slider: ( props: Slider.PlainParams ) => JSX.Element
        Switch: ( props: Switch.PlainParams ) => JSX.Element
        Checker: ( props: Checker.PlainParams ) => JSX.Element

        Segmented: Segmented.Types

        Wrapper: {
          _: FNC<WrapperParams>
          Normal: FNC<WrapperParams>
          Row: FNC<WrapperParams>
        }
        Attachment: {
          RequiredSign: FNC<{ type: boolean | 'plain' | 'omit' }>
          LeftIndicator: FNC<LeftIndicatorParams>
          RightIndicator: FNC<RightIndicatorParams>
          RightIcon: FNC<RightIndicatorParams>
        }
      }

      type WrapperParams = Atoms.BoxProps & {
        label?: ReactElement
        labelStyles?: amotifyUniStyleParams
        required?: boolean | 'plain' | 'omit'
      }

      type UniParams = {
        name?: string
        form?: string

        statusId?: string
        componentId?: string

        override?: 'force' | 'beforeModified' | 'never'

        required?: boolean

        checkValidationAtFirst?: boolean
        onValidate?: Validation.OnValidate
        onUpdateValue?: OnUpdateValue
        onUpdateValidValue?: OnUpdateValue
      }
      type CoreParams = UniParams & {
        className?: string
        wrapStyles?: amotifyUniStyleParams
      } & amotifyUniStyleParams
      type OnUpdateValue = {
        ( data: {
          value: any
          componentId: string
          storeData?: plainObject
          eventType: Validation.EventType
        } ): void
      }

      type BoxToneTypes = 'auto' | 'border' | 'cloud' | 'plain'

      namespace Hidden {
        type PlainParams = React.DOMAttributes<HTMLInputElement> & {
          componentId?: string
          name?: string
          form?: string

          id?: string
          value?: string | number | plainObject
        }
      }
      namespace Text {
        type Methods = {
          Validate( value: any,restrict: RestrictTypes ): {
            ok: boolean
            body: any
          }
          Normal: ( props: OriginParams ) => JSX.Element
          Number: ( props: PlainParams ) => JSX.Element
          DigitNumber: ( props: PlainParams ) => JSX.Element
          Tel: ( props: PlainParams ) => JSX.Element
          CreditCard: ( props: PlainParams ) => JSX.Element
          Email: ( props: PlainParams ) => JSX.Element
          Url: ( props: PlainParams ) => JSX.Element
          Postal: ( props: PostalParams ) => JSX.Element
          Password: ( props: PlainParams ) => JSX.Element
          Money: {
            JPY: ( props: PlainParams ) => JSX.Element
          }
        }

        type RestrictTypes = 'text' | 'number' | 'digitNumber' | 'tel' | 'email' | 'url' | 'fileName' | 'password' | 'postal' | 'creditCard'

        type PlainParams = CoreParams & React.DOMAttributes<HTMLInputElement> & {
          tone?: BoxToneTypes

          tabIndex?: -1
          id?: string

          disabled?: boolean

          maxLength?: number | null

          enableFormSubmit?: boolean

          autoComplete?: 'off' | 'none' | string
          autoCapitalize?: 'off' | 'none' | string

          clearButton?: boolean

          value?: string | number

          placeholder?: string

          leftIndicator?: ReactElement | false
          rightIndicator?: ReactElement | false
          rightIcon?: ReactElement | false
        }

        type OriginParams = PlainParams & {
          restrict?: RestrictTypes
        }

        type PostalParams = PlainParams & {
          onGeoCoding?( result: JsminExtension.Googlemaps.Geocode.ResultBody ): void
          enableInitGeocoding?: boolean
          enableCurrentGeoCoding?: boolean
        }
      }
      namespace TextArea {
        type PlainParams = CoreParams & React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
          tone?: BoxToneTypes

          tabIndex?: -1
          id?: string

          disabled?: boolean

          enableFormSubmit?: boolean

          value?: string | number

          placeholder?: string

          leftIndicator?: ReactElement | false
          rightIndicator?: ReactElement | false
          rightIcon?: ReactElement | false
        }
      }
      namespace DigitCharacters {
        type PlainParams = CoreParams & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>,HTMLInputElement> & {
          tone?: BoxToneTypes

          combineInput?: boolean
          digits: number
          numericOnly?: boolean

          tabIndex?: -1
          id?: string

          enableFormSubmit?: boolean

          value?: string | number

          listStyles?: amotifyUniStyleParams
        }
      }
      namespace Time {
        type Methods = {
          Clock: ( props: PlainParams ) => JSX.Element
          Date: ( props: PlainParams ) => JSX.Element
          Week: ( props: PlainParams ) => JSX.Element
          Month: ( props: PlainParams ) => JSX.Element
          Year: ( props: PlainParams ) => JSX.Element
          DateWareki: ( props: DateWarekiParams ) => JSX.Element
          Periods: {
            Date: ( props: PeriodParams ) => JSX.Element
            Month: ( props: PeriodParams ) => JSX.Element
          }
          fn: FNTypes
        }

        type FNTypes = {
          picker: {
            launch( params: {
              parent: string
              modalId: string
              defaultValue: string | [ string,string ]
              restrict: RestrictTypes
              gravityPoint?: number
              onValueUpdate( value: string | [ string,string ] ): void
            } ): void
            remove( modalId: string ): void
          }
        }
        type EraTypes = 'clock' | 'year' | 'meiji' | 'taisho' | 'shouwa' | 'heisei' | 'reiwa'
        type RestrictTypes = 'clock' | 'date' | 'week' | 'month' | 'year' | 'dates' | 'months' | 'dateWareki'

        type PlainParams = CoreParams & React.DOMAttributes<HTMLInputElement> & {
          tone?: BoxToneTypes

          tabIndex?: -1
          id?: string

          disabled?: boolean

          enableFormSubmit?: boolean

          value?: string | [ string,string ]

          leftIndicator?: ReactElement | false
          rightIndicator?: ReactElement | false
        }

        type OriginParams = PlainParams & {
          restrict: RestrictTypes
          era?: EraTypes
        }
        type DateWarekiParams = PlainParams & {
          value?: string
          defaultEra?: 'year' | 'wareki'
        }

        type PeriodParams = Omit<PlainParams,'value'> & {
          value?: [ string,string ]
        }

        type RangeProps = {
          type: 'hour' | 'minute' | 'date' | 'month' | 'year' | 'week' | 'dateWareki'
          from: number
          length: number
          region?: number
        }

        namespace Picker {
          type Params = {
            restrict: RestrictTypes
            defaultValue: string | string[]
            onValueUpdate: PropagateValueCallBack
            modalId: string
          }
          type PropagateValueCallBack = {
            ( value: string | [ string,string ] ): void
          }
        }
      }
      namespace Select {
        type PlainParams = CoreParams & React.DOMAttributes<HTMLSelectElement> & {
          tone?: BoxToneTypes

          tabIndex?: -1

          id?: string

          disabled?: boolean

          enableFormSubmit?: boolean

          value?: ValueProps
          list: OptionProps[]

          placeholder?: string

          leftIndicator?: ReactElement | false
          rightIndicator?: ReactElement | false
          rightIcon?: ReactElement | false

          enableUnSelected?: boolean

          rightIconStyles?: amotifyUniStyleParams
        }

        type ValueProps = string | number | boolean | plainObject | void | null

        type OptionProps = {
          value: ValueProps
          label: string
          displayLabel?: ReactElement
        }
      }
      namespace List {
        type ListToneTypes = 'border' | 'cloud' | 'vivid' | 'vividBorder' | 'icon' | 'iconBorder' | 'iconCloud' | 'iconVivid' | 'plain'

        type Methods = {
          Radio: Types
          Checkbox: Types
        }
        type Types = {
          Border: ( props: PlainParams ) => JSX.Element
          Cloud: ( props: PlainParams ) => JSX.Element
          Vivid: ( props: PlainParams ) => JSX.Element
          VividBorder: ( props: PlainParams ) => JSX.Element

          Icon: ( props: PlainParams ) => JSX.Element
          IconBorder: ( props: PlainParams ) => JSX.Element
          IconCloud: ( props: PlainParams ) => JSX.Element
          IconVivid: ( props: PlainParams ) => JSX.Element

          Plain: ( props: PlainParams ) => JSX.Element
        }

        type PlainParams = CoreParams & {
          tabIndex?: -1
          id?: string

          iconType?: 'radio' | 'checkbox'

          enableFormSubmit?: boolean

          disabled?: boolean
          value?: any | any[]
          list: OptionParams[]

          hideInput?: boolean

          leftIndicator?: ReactElement | false
          rightIndicator?: ReactElement | false

          cellStyles?: amotifyUniStyleParams
          cellClassName?: string
          cellCheckedStyles?: amotifyUniStyleParams
          cellCheckedClassName?: string
        }
        type OriginParams = PlainParams & {
          type: 'radio' | 'checkbox' | 'checker'
          tone: ListToneTypes
        }

        type OptionParams = {
          value: any
          label: ReactElement
          disabled?: boolean
          className?: string
          checkedStyles?: amotifyUniStyleParams
          checkedClassName?: string
        } & amotifyUniStyleParams
      }
      namespace Chips {
        type PlainParams = CoreParams & {
          tabIndex?: -1

          id?: string

          disabled?: boolean

          inputType?: 'chips' | 'search'

          value?: OptionParams[]
          limit?: number

          modalGravityPoint?: number

          optionGroups: {
            label?: ReactElement
            options: DefaultOptionParams[]
          }[]
          onDynamicSearch?: onDynamicSearch
          showSelected?: boolean

          leftIndicator?: ReactElement | false
          rightIndicator?: ReactElement | false

          selectedStyles?: amotifyUniStyleParams
          selectStyles?: amotifyUniStyleParams

          appearances?: {
            modalBottomSpace?: ReactElement
            addButton?: {
              ( callback: any ): ReactElement
            }
            selectedChip?: {
              ( props: {
                params: OptionParams
                status: Input.Status.Chips
                deleteCallback: any
              } ): ReactElement
            }
            selectChip?: {
              ( props: {
                params: OptionParams
              } ): ReactElement
            }
          }
        }
        type onDynamicSearch = {
          ( keyword: string ): Promise<OptionGroupParams[]>
        }

        type OptionGroupParams = {
          label?: ReactElement
          options: OptionParams[]
        }
        type DefaultOptionParams = OptionParams & {
          keyword: string
        }
        type OptionParams = {
          value: any
          icon?: ReactElement
          label: ReactElement
        }
      }
      namespace Search {
        type PlainParams = CoreParams & React.DOMAttributes<HTMLInputElement> & {
          tone?: BoxToneTypes

          tabIndex?: -1
          id?: string

          disabled?: boolean

          enableFormSubmit?: boolean

          modalGravityPoint?: number

          value?: Chips.OptionParams[]
          placeholder?: string

          optionGroups: {
            label?: ReactElement
            options: ( Chips.OptionParams & {
              keyword: string
            } )[]
          }[]
          onDynamicSearch?: Chips.onDynamicSearch

          leftIndicator?: ReactElement | false
          rightIndicator?: ReactElement | false
          rightIcon?: ReactElement | false

          rightIconStyles?: amotifyUniStyleParams

          selectedStyles?: amotifyUniStyleParams
          selectStyles?: amotifyUniStyleParams

          appearances?: {
            modalBottomSpace?: ReactElement
            addButton?: {
              ( openModalFN: any ): Buttons.ButtonInput
            }

            selectedChip?: {
              ( props: {
                params: Chips.OptionParams
                status: Input.Status.Chips
                deleteCallback: any
              } ): Buttons.ButtonInput
            }
            selectChip?: {
              ( props: {
                params: Chips.OptionParams
              } ): ReactElement
            }
          }
        }
      }
      namespace Filer {
        type PlainParams = CoreParams & React.DOMAttributes<HTMLInputElement> & {
          tone?: BoxToneTypes
          tabIndex?: -1

          id?: string
          disabled?: boolean

          value?: CustomFile[]
          limit?: number

          fileNameEdit?: boolean
          systemOnly?: boolean
          accept?: 'image'

          cellStyles?: amotifyUniStyleParams
          cellClassName?: string
        }
        type CustomFile = File & {
          id: string
        }
      }
      namespace Slider {
        type PlainParams = CoreParams & React.DOMAttributes<HTMLInputElement> & {
          tabIndex?: -1

          id?: string

          disabled?: boolean

          value?: number

          tone?: BoxToneTypes

          min: number
          max: number
          step: number
          legends?: {
            enable?: boolean
            custom?: LegendsCallback
            showAlways?: boolean
          }

          enableFormSubmit?: boolean
        }

        type LegendsCallback = {
          ( value: number ): ReactElement
        }
      }
      namespace Switch {
        type PlainParams = UniParams & React.DOMAttributes<HTMLInputElement> & {
          tone?: SwitchToneTypes

          id?: string
          tabIndex?: -1

          disabled?: boolean
          value?: boolean

          enableFormSubmit?: boolean
        }

        type SwitchToneTypes = 'theme' | 'posi' | 'nega' | 'warn'
      }
      namespace Segmented {
        type Tones = 'Border' | 'ThemeBorder' | 'BottomLine' | 'Cloud' | 'ThemeCloud'
        type Types = {
          Cloud: ( params: Params ) => JSX.Element
          ThemeCloud: ( params: Params ) => JSX.Element
          Border: ( params: Params ) => JSX.Element
          ThemeBorder: ( params: Params ) => JSX.Element
          BottomLine: ( params: Params ) => JSX.Element
        }

        type Params = List.PlainParams
        type ListParams = List.OptionParams[]
      }
      namespace Checker {
        type PlainParams = CoreParams & {
          label: ReactElement

          id?: string
          tabIndex?: -1

          disabled?: boolean
          value?: boolean

          enableFormSubmit?: boolean

          cellStyles?: amotifyUniStyleParams
          cellClassName?: string
          cellCheckedStyles?: amotifyUniStyleParams
          cellCheckedClassName?: string
        }
      }

      namespace Status {
        type Plain = {
          componentId: string
          dataValue: any
          eventType: Validation.EventType
          eventId: string
        }
        type Text = Plain & {
          formatValue: any
          prevValue: any
          caretFrom: number
          caretTo: number
        }
        type DigitCharacters = Plain & {
          formatValue: any
        }
        type Time = Plain & {
          formatValue: any
          ranges: Time.RangeProps[]
        }
        type Chips = Plain & {
          formatValue: any
        }
        type Slider = Plain & {
          min: number
          max: number
          step: number
        }
      }
      namespace Validation {
        type EventType = 'init' | 'update' | 'override' | 'refresh'
        type NoticeTypes = {
          type: 'valid' | 'invalid' | 'warn'
          label: ReactElement
        }
        type Result = {
          ok: boolean
          notice: NoticeTypes[]
        }
        type SystemCheck = {
          ( props: {
            value: any
            params: any
          } ): Result
        }
        type OnValidate = {
          ( state: {
            eventType: EventType,
            value: any,
            props: plainObject
          } ): Promise<Result>
        }
      }

      type LeftIndicatorParams = amotifyUniStyleParams & {
        tone?: BoxToneTypes
        className?: string
        children: ReactElement
      }
      type RightIndicatorParams = amotifyUniStyleParams & {
        tone?: BoxToneTypes
        className?: string
        children: ReactElement
      }
    }
  }
}