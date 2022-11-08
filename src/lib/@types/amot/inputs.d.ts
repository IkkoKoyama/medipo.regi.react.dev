namespace Input {
  type Types = {
    Hidden: ( props: Hidden.BoxProps ) => JSX.Element
    Text: ( props: Text.BoxProps ) => JSX.Element
    Time: Time.Types
    TextArea: ( props: TextArea.BoxProps ) => JSX.Element
    Select: ( props: Select.BoxProps ) => JSX.Element
    Search: ( props: Search.BoxProps ) => JSX.Element
    Cell: ( props: Cell.BoxProps ) => JSX.Element
    Radio: ( props: List.BoxProps ) => JSX.Element
    CheckBox: ( props: List.BoxProps ) => JSX.Element
    File: ( props: Filer.BoxProps ) => JSX.Element
    Switch: ( props: Switch.BoxProps ) => JSX.Element
    Slider: ( props: Slider.BoxProps ) => JSX.Element
  }

  namespace Uni {
    type Grouping = {
      name?: string
      form?: string
    }
    type LifeCycle = {
      forceOverRide?: boolean
      firstValidCheck?: true
      onValidateCallBack?: Validation.CustomProps
      onChangeCallBack?: OnChangeCallBack
    }
  }
  namespace Hidden {
    type BoxProps = Uni.Grouping & {
      id?: string
      required?: boolean
      value?: string | number | plainObject
      onChange? : React.ChangeEventHandler<HTMLInputElement>
    }
    type Props = BoxProps & {
      componentId: string
    }
  }
  namespace Text {
    type BoxProps = Uni.Grouping & Uni.LifeCycle & {
      tabIndex?: -1

      id?: string

      disabled?: boolean
      required?: boolean
      hideRequiredSign?: boolean

      label?: ReactElement

      delegationFormSubmit?: boolean

      value?: string
      placeholder?: string

      indicator?: ReactElement
      autoComplete?: 'off' | 'none' | string
      autoCapitalize?: 'off' | 'none' | string
      onKeydown?: {
        ( event: React.KeyboardEvent<HTMLInputElement> ): void
      }
      onFocus?: {
        ( event: React.FocusEvent<HTMLInputElement,Element> ): void
      }
      onClick?: {
        ( event: React.MouseEvent<HTMLInputElement,MouseEvent> ): void
      }
      appearance?: {
        format?: 'border' | 'cloud' | 'plain'
        box?: {
          className?: string
          style?: OriginalStyleProps
        }
        input?: {
          className?: string
          style?: OriginalStyleProps
        }
        indicator?: {
          className?: string
          style?: OriginalStyleProps
        }
      }
    } & ( OthersProps | PostalProps | PasswordProps )

    type Props = BoxProps & {
      className: string
      indicatorClassName?: string
      componentId: string
    }

    type OthersProps = {
      restrict?: 'number' | 'tel' | 'price' | 'email' | 'url' | 'fileName'
      clearButton?: true
      onGeoCodingCallBack?: never
    }
    type PostalProps = {
      restrict: 'postal'
      clearButton?: true
      onGeoCodingCallBack: {
        (
          result: GeocodeResultBody
        ): void
      }
      disableGetCurrentLocation?: boolean
      onGetCurrentLocationCallBack: {
        (
          result: GeocodeResultBody
        ): void
      }
    }
    type PasswordProps = {
      restrict: 'password'
      clearButton?: void
      onGeoCodingCallBack?: never
    }
  }
  namespace Time {
    type Types = {
      Clock: ( props: ClockProps ) => JSX.Element
      Date: ( props: DateProps ) => JSX.Element
      Week: ( props: WeekProps ) => JSX.Element
      Month: ( props: MonthProps ) => JSX.Element
      Year: ( props: YearProps ) => JSX.Element
      DateWareki: ( props: DateWarekiProps ) => JSX.Element
      Dates: ( props: DatesProps ) => JSX.Element
      Months: ( props: MonthsProps ) => JSX.Element
    }

    type UniProps = Uni.Grouping & Uni.LifeCycle & {
      id?: string
      required?: boolean
      hideRequiredSign?: boolean

      label?: ReactElement

      tabIndex?: -1
      disabled?: boolean
      
      delegationFormSubmit?: boolean

      value?: string | [ string,string ]

      appearance?: {
        format?: 'border' | 'cloud' | 'plain'
        box?: {
          className?: string
          style?: OriginalStyleProps
        }
        input?: {
          className?: string
          style?: OriginalStyleProps
        }
      }
    }
    type ClockProps = UniProps & {
      value?: string
    }
    type DateProps = UniProps & {
      value?: string
    }
    type WeekProps = UniProps & {
      value?: string
    }
    type MonthProps = UniProps & {
      value?: string
    }
    type YearProps = UniProps & {
      value?: string
    }
    type DateWarekiProps = UniProps & {
      value?: string
    }
    type DatesProps = UniProps & {
      value?: [ string,string ]
    }
    type MonthsProps = UniProps & {
      value?: [ string,string ]
    }

    type BoxProps = UniProps & {
      type: 'clock' | 'date' | 'week' | 'month' | 'year' | 'dateWareki' | 'dates' | 'months'
    }

    type Props = BoxProps & {
      className: string
      componentId: string
    }

    type Series = 'clock' | 'date' | 'week' | 'month' | 'year' | 'dates' | 'months' | 'dateWareki'
    type Eras = 'year' | 'reiwa' | 'heisei' | 'shouwa' | 'taisho' | 'meiji'
    type FocusRanges = {
      type: 'year' | 'month' | 'week' | 'date' | 'hour' | 'minute' | 'dateWareki'
      from: number
      length: number
      region?: number
    }[]

    namespace Picker {
      type Props = {
        type: string
        value: string
        connectId: string
        callback: PropagateValueCallBack
        modalId: string
      }
      type PropagateValueCallBack = {
        ( value: string[] ): void
      }
      type CoreProps = Omit<Props,'type'>
    }
  }
  namespace TextArea {
    type BoxProps = Uni.Grouping & Uni.LifeCycle & {
      id?: string

      tabIndex?: -1

      disabled?: boolean

      required?: boolean
      hideRequiredSign?: boolean

      label?: ReactElement

      delegationFormSubmit?: boolean

      value?: string
      placeholder?: string

      rows?: number

      autoComplete?: 'off' | 'none' | string
      autoCapitalize?: 'off' | 'none' | string
      onKeydownCallBack?: {
        ( event: React.KeyboardEvent<HTMLTextAreaElement> ): void
      }
      appearance?: {
        format?: 'border' | 'cloud' | 'plain'
        box?: {
          className?: string
          style?: OriginalStyleProps
        }
        input?: {
          className?: string
          style?: OriginalStyleProps
        }
      }
    }

    type Props = BoxProps & {
      className: string
      componentId: string
    }
  }
  namespace List {
    type BoxProps = Uni.Grouping & Uni.LifeCycle & {
      required?: boolean
      hideRequiredSign?: boolean

      label?: ReactElement

      delegationFormSubmit?: boolean

      tabIndex?: -1

      value?: ( string | number | plainObject )[]
      list: CellProps[]

      hideInput?: boolean

      gap?: gapProps
      wrap?: boolean
      align?: 'col' | 'inlineCol' | 'row' | 'rowFlex'
      justify?: 'center' | 'left' | 'right' | 'between' | 'around' | 'even'

      appearance?: {
        format?: 'border' | 'cloud' | 'vivid' | 'vividBorder' | 'icon' | 'iconBorder' | 'iconCloud' | 'plain'
        box?: {
          className?: string
          style?: OriginalStyleProps
        }
        cell?: {
          className?: string
          style?: OriginalStyleProps
        }
        checked?: {
          className?: string
          style?: OriginalStyleProps
        }
      }
    }
    type Props = BoxProps & {
      type: 'radio' | 'checkbox'
      cellClassName: string
      checkedClassName: string
      componentId: string
    }
    type CellProps = {
      value: string | number | plainObject
      label: ReactElement
      disabled? : boolean
      appearance?: {
        style?: OriginalStyleProps
        checkedStyle?: OriginalStyleProps
        className?: string
        checkedClassName?: string
      }
    }
  }
  namespace Select {
    type BoxProps = Uni.Grouping & Uni.LifeCycle & {
      id?: string
      required?: boolean
      hideRequiredSign?: boolean

      label?: ReactElement

      tabIndex?: -1

      disabled?: boolean

      delegationFormSubmit?: boolean

      value?: string | number | plainObject
      placeholder?: string
      appearance?: {
        format?: 'border' | 'cloud' | 'plain'
        box?: {
          className?: string
          style?: OriginalStyleProps
        }
        input?: {
          className?: string
          style?: OriginalStyleProps
        }
        indicator?: {
          className?: string
          style?: OriginalStyleProps
        }
      }

      list: OptionProps[]

      indicator?: ReactElement | false
    }
    type Props = BoxProps & {
      className: string
      componentId: string
    }

    type OptionProps = {
      value: string | number | plainObject
      label: string
      displayLabel?: ReactElement
    }
  }
  namespace Search {
    type BoxProps = Uni.Grouping & Uni.LifeCycle & {
      id?: string
      required?: boolean
      hideRequiredSign?: boolean

      label?: ReactElement

      indicator?: ReactElement

      placeholder?: string
      limit?: number
      appearance?: {
        format?: 'border' | 'cloud' | 'plain'
        box?: {
          className?: string
          style?: OriginalStyleProps
        }
        input?: {
          className?: string
          style?: OriginalStyleProps
        }
        indicator?: {
          className?: string
          style?: OriginalStyleProps
        }
      }

      value? : OptionCellProps
      list: OptionProps[]
      onDynamicSearchCallBack?: onSearchCallBack
    }
    type Props = BoxProps & {
      inputClassName: string
      cellClassName: string
      componentId: string
    }

    type OptionProps = OptionCellProps | OptionTitleProps
    type OptionCellProps = {
      type?: 'cell'
      value: string | number | plainObject
      keyword?: string
      icon?: ReactElement
      label: ReactElement
      opt?: plainObject
    }
    type OptionTitleProps = {
      type: 'title'
      content: ReactElement
    }
    type onSearchCallBack = {
      ( keyword: string )
        : Promise<OptionProps[]>
    }
  }
  namespace Cell {
    type BoxProps = Uni.Grouping & Uni.LifeCycle & {
      required?: boolean
      hideRequiredSign?: boolean

      label?: ReactElement

      placeholder?: string
      limit?: number
      appearance?: {
        format?: 'border' | 'cloud'
        box?: {
          className?: string
          style?: OriginalStyleProps
        }
        cell?: {
          className?: string
          style?: OriginalStyleProps
          flexChilds?: 'auto' | 'even'
        }
      }
      searchCell? : {
        selectList : CustomListProps
        addButton : {
          ( callback : Function ) : ReactElement
        }
      }

      value?: OptionCellProps[]
      list: OptionProps[]
      onDynamicSearchCallBack?: onSearchCallBack
    }

    type Props = BoxProps & {
      cellClassName: string
      componentId: string
    }

    type CustomListProps = {
      ( props: {
        props: Cell.OptionCellProps,
        deleteCallBack: Atoms.Button.onClickProps
      } ): ReactElement
    }

    type OptionProps = OptionCellProps | OptionTitleProps
    type OptionCellProps = {
      type?: 'cell'
      value: string | number | plainObject
      keyword?: string
      icon?: ReactElement
      label: ReactElement
      opt?: plainObject
    }
    type OptionTitleProps = {
      type: 'title'
      content: ReactElement
    }
    type onSearchCallBack = {
      ( keyword: string )
        : Promise<OptionProps[]>
    }
  }
  namespace Filer {
    type BoxProps = Uni.Grouping & Uni.LifeCycle & {
      required?: boolean
      hideRequiredSign?: boolean
      id?: string

      label?: ReactElement

      displayFileInfo?: boolean

      value?: CustomFile[]
      placeholder?: string
      limit?: number

      appearance?: {
        format?: 'border' | 'cloud' | 'plain'
        box?: {
          className?: string
          style?: OriginalStyleProps
        }
        cell?: {
          className?: string
          style?: OriginalStyleProps
        }
      }

      fileNameEdit?: boolean
      accept?: 'image'
    }
    type Props = BoxProps & {
      cellClassName: string
      componentId: string
    }
  }
  namespace Switch {
    type BoxProps = Uni.Grouping & Uni.LifeCycle & {
      id?: string

      value?: boolean

      label?: ReactElement

      tabIndex?: -1

      color?: 'theme' | 'posi' | 'nega' | 'warn'

      forceOverRide?: boolean
      onChangeCallBack?: OnChangeCallBack
    }
    type Props = BoxProps & {
      componentId: string
    }
  }
  namespace Slider {
    type BoxProps = Uni.Grouping & Uni.LifeCycle & {
      id?: string

      value?: number
      min: number
      max: number
      step: number
      showLabels?: true
      label?: ReactElement
    }
    type Props = BoxProps & {
      componentId: string
    }
  }
  namespace Validation {
    type EventType = 'init' | 'update' | 'override' | 'refresh' | 'foreign'
    type Reason = {
      type: 'valid' | 'invalid' | 'warn',
      label: ReactElement
    }
    type FormatResult = {
      messages: Reason[]
      safeValue: any
    }
    type CustomResultProps = {
      result: boolean
      messages?: Reason[]
      safeValue?: any
    }
    type CustomProps = {
      (
        state: {
          eventType: EventType,
          value: any,
          props: plainObject
        }
      ): Promise<CustomResultProps>
    }
    type ResultProps = {
      eventType: EventType
      result: true | false
      messages: ReactElement | null
      safeValue?: any
    }
  }

  type OnChangeCallBack = {
    (
      data: {
        value: any,
        componentId?: string,
        storeData?: plainObject,
        element?: HTMLElement,
        eventType?: Validation.EventType,
        event?: React.ChangeEvent<any>
      }
    ): void
  }
}