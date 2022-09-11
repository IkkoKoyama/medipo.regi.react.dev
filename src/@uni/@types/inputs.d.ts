namespace Input {
  type Types = {
    Hidden    :  (   props : Hidden.BoxProps    ) => JSX.Element
    Text      :  (   props : Text.BoxProps      ) => JSX.Element
    Time      :  (   props : Time.BoxProps      ) => JSX.Element
    TextArea  :  (   props : TextArea.BoxProps  ) => JSX.Element
    Select    :  (   props : Select.BoxProps    ) => JSX.Element
    Search    :  (   props : Search.BoxProps    ) => JSX.Element
    Cell      :  (   props : Cell.BoxProps      ) => JSX.Element
    Radio     :  (   props : List.BoxProps      ) => JSX.Element
    CheckBox  :  (   props : List.BoxProps      ) => JSX.Element
    File      :  (   props : Filer.BoxProps     ) => JSX.Element
    Switch    :  (   props : Switch.BoxProps    ) => JSX.Element
    Slider    :  (   props : Slider.BoxProps    ) => JSX.Element
  }

  namespace Uni {
    type Grouping = {
      name? : string
      form? : string
    }
    type LifeCycle = {
      forceOverRide? : boolean
      firstValidCheck? : true
      onValidateCallBack? : Validation.CustomProps
      onChangeCallBack? : OnChangeCallBack
    }
  }
  namespace Hidden {
    type BoxProps = Uni.Grouping & {
      id? : string
      required? : true
      value? : string | number
    }
    type Props = BoxProps & {
      componentId : string
    }
  }
  namespace Text {
    type BoxProps = Uni.Grouping & Uni.LifeCycle & {
      tabIndex? : -1

      id? : string

      disabled? : boolean
      required? : true
      hideRequiredSign? : boolean

      label? : ReactElement

      delegationFormSubmit? : boolean

      value? : string
      placeholder? : string

      indicator? : ReactElement
      autoComplete? : 'off' | 'none' | string
      autoCapitalize? : 'off' | 'none' | string
      onKeydown? : {
        ( event:React.KeyboardEvent < HTMLInputElement > ) : void
      }
      onFocus? : {
        ( event:React.FocusEvent < HTMLInputElement,Element > ) : void
      }
      onClick? : {
        ( event:React.MouseEvent < HTMLInputElement,MouseEvent > ) : void
      }
      appearance? : {
        format? : 'border' | 'cloud' | 'themeCloud' | 'plain'
        box? : {
          className? : string
          style? : OriginalStyleProps
        }
        input? : {
          className? : string
          style? : OriginalStyleProps
        }
        indicator? : {
          className? : string
          style? : OriginalStyleProps
        }
      }
    } & ( OthersProps | PostalProps | PasswordProps )

    type Props = BoxProps & {
      className : string
      indicatorClassName? : string
      componentId : string
    }

    type OthersProps = {
      restrict? : 'number' | 'tel' | 'price' | 'email' | 'url' | 'fileName'
      clearButton? : true
      onGeoCodingCallBack? : never
    }
    type PostalProps = {
      restrict : 'postal'
      clearButton? : true
      onGeoCodingCallBack : {
        (
          result : GeocodeResultBody
        ) : void
      }
      disableGetCurrentLocation? : boolean
      onGetCurrentLocationCallBack : {
        (
          result : GeocodeResultBody
        ) : void
      }
    }
    type PasswordProps = {
      restrict : 'password'
      clearButton? : void
      onGeoCodingCallBack? : never
    }
  }
  namespace Time {
    type BoxProps = Uni.Grouping & Uni.LifeCycle & {
      id? : string
      required? : true
      hideRequiredSign? : boolean

      label? : ReactElement

      delegationFormSubmit? : boolean

      appearance? : {
        format? : 'border' | 'cloud' | 'themeCloud' | 'plain'
        box? : {
          className? : string
          style? : OriginalStyleProps
        }
        input? : {
          className? : string
          style? : OriginalStyleProps
        }
      }
    } & (
      {
        type : 'clock' | 'date' | 'week' | 'month' | 'year' | 'dateWareki'
        value? : string
      } | {
        type : 'clocks' | 'dates' | 'weeks' | 'months' | 'years'
        value? : [ string,string ]
      }
    )
    type Props = BoxProps & {
      className : string
      componentId : string
    }

    type Series = 'clock' | 'date' | 'week' | 'month' | 'year' | 'clocks' | 'dates' | 'weeks' | 'months' | 'years' | 'dateWareki'
    type Eras = 'year' | 'reiwa' | 'heisei' | 'shouwa' | 'taisho' | 'meiji'
    type FocusRanges = {
      type : 'year' | 'month' | 'week' | 'date' | 'hour' | 'minute' | 'dateWareki'
      from : number
      length : number
      region? : number
    }[]

    namespace Picker {
      type Props = {
        type : string
        value : string
        connectId : string
        callback : PropagateValueCallBack
        set_open : React.Dispatch< React.SetStateAction< boolean > >
      }
      type PropagateValueCallBack = {
        ( value : string[] ) : void
      }
      type CoreProps = Omit< Props,'type' >
    }
  }
  namespace TextArea {
    type BoxProps = Uni.Grouping & Uni.LifeCycle & {
      tabIndex? : -1

      disabled? : boolean

      required? : true
      hideRequiredSign? : boolean

      label? : ReactElement

      delegationFormSubmit? : boolean

      value? : string
      placeholder? : string

      rows? : number

      autoComplete? : 'off' | 'none' | string
      autoCapitalize? : 'off' | 'none' | string
      onKeydownCallBack? : {
        ( event:React.KeyboardEvent< HTMLTextAreaElement > ) : void
      }
      appearance? : {
        format? : 'border' | 'cloud' | 'themeCloud' | 'plain'
        box? : {
          className? : string
          style? : OriginalStyleProps
        }
        input? : {
          className? : string
          style? : OriginalStyleProps
        }
      }
    }

    type Props = BoxProps & {
      className : string
      componentId : string
    }
  }
  namespace Select {
    type BoxProps = Uni.Grouping & Uni.LifeCycle & {
      id? : string
      required? : true
      hideRequiredSign? : boolean

      label? : ReactElement

      tabIndex? : -1

      delegationFormSubmit? : boolean

      value? : string | number
      placeholder? : string
      appearance? : {
        format? : 'border' | 'cloud' | 'themeCloud' | 'plain'
        box? : {
          className? : string
          style? : OriginalStyleProps
        }
        input? : {
          className? : string
          style? : OriginalStyleProps
        }
      }

      list : OptionProps[]

      indicator? : boolean
    }
    type Props = BoxProps & {
      className : string
      componentId : string
    }

    type OptionProps = {
      value : string | number
      label : string
    }
  }
  namespace Search {
    type BoxProps = Uni.Grouping & Uni.LifeCycle & {
      id? : string
      required? : true
      hideRequiredSign? : boolean

      label? : ReactElement

      delegationFormSubmit? : boolean

      placeholder? : string
      limit? : number
      appearance? : {
        format? : 'border' | 'cloud' | 'themeCloud' | 'plain'
        box? : {
          className? : string
          style? : OriginalStyleProps
        }
        input? : {
          className? : string
          style? : OriginalStyleProps
        }
        cell? : {
          className? : string
          style? : OriginalStyleProps
          custom? : CustomCellProps
          flexAuto? : boolean
        }
        indicator? : {
          className? : string
          style? : OriginalStyleProps
        }
      }

      value? : OptionCellProps[]
      list : OptionProps[]
      onDynamicSearchCallBack? : onSearchCallBack
    }
    type Props = BoxProps & {
      inputClassName : string
      cellClassName : string
      componentId : string
    }

    type CustomCellProps = {
      ( props : {
        props : OptionCellProps,
        deleteCallBack : Atoms.Button.onClickCallBackProps
      } ) : ReactElement
    }

    type OptionProps = OptionCellProps | OptionTitleProps
    type OptionCellProps = {
      type? : 'cell'
      value : string | number
      keyword : string
      icon? : ReactElement
      label : ReactElement
      opt? : plainObject
    }
    type OptionTitleProps = {
      type : 'title'
      content : ReactElement
    }
    type onSearchCallBack = {
      ( keyword : string )
      : Promise< OptionProps[] >
    }
  }
  namespace Cell {
    type BoxProps = Uni.Grouping & Uni.LifeCycle & {
      required? : true
      hideRequiredSign? : boolean

      label? : ReactElement

      placeholder? : string
      limit? : number
      appearance? : {
        format? : 'border' | 'cloud'
        box? : {
          className? : string
          style? : OriginalStyleProps
        }
        cell? : {
          className? : string
          style? : OriginalStyleProps
          custom? : CustomCellProps
          flexAuto? : boolean
        }
      }
      addButton? : {
        ( onActiveCallBack : Button.onChangeCallBack ) : ReactElement
      }

      value? : OptionCellProps[]
      list : OptionProps[]
      onDynamicSearchCallBack? : onSearchCallBack
    }

    type Props = BoxProps & {
      cellClassName : string
      componentId : string
    }

    type CustomCellProps = {
      ( props : {
        props : OptionCellProps,
        deleteCallBack : Atoms.Button.onClickCallBackProps
      } ) : ReactElement
    }

    type OptionProps = OptionCellProps | OptionTitleProps
    type OptionCellProps = {
      type? : 'cell'
      value : string | number
      keyword : string
      icon? : ReactElement
      label : ReactElement
      opt? : plainObject
    }
    type OptionTitleProps = {
      type : 'title'
      content : ReactElement
    }
    type onSearchCallBack = {
      ( keyword : string )
      : Promise< OptionProps[] >
    }
  }
  namespace List {
    type BoxProps = Uni.Grouping & Uni.LifeCycle & {
      required? : true
      hideRequiredSign? : boolean

      label? : ReactElement

      delegationFormSubmit? : boolean

      tabIndex? : -1

      value? : ( string | number )[]
      list : CellProps[]

      hideInput? : boolean

      gap? : gapProp
      wrap? : boolean
      align? : 'col' | 'inlineCol' | 'row' | 'rowFlex'
      justify? : 'center' | 'left' | 'right' | 'between' | 'around' | 'even'

      appearance? : {
        format? : 'border' | 'cloud' | 'vivid' | 'vividBorder' | 'icon' | 'iconBorder' | 'iconCloud' | 'plain'
        box? : {
          className? : string
          style? : OriginalStyleProps
        }
        cell? : {
          className? : string
          style? : OriginalStyleProps
        }
        checked? : {
          className? : string
          style? : OriginalStyleProps
        }
      }
    }
    type Props = BoxProps & {
      type : 'radio' | 'checkbox'
      cellClassName : string
      checkedClassName : string
      componentId : string
    }
    type CellProps = {
      value : string | number
      label : ReactElement
      appearance? : {
        style? : OriginalStyleProps
        checkedStyle? : OriginalStyleProps
        className? : string
        checkedClassName? : string
      }
    }
  }
  namespace Filer {
    type BoxProps = Uni.Grouping & Uni.LifeCycle & {
      required? : true
      hideRequiredSign? : boolean
      id? : string

      label? : ReactElement

      displayFileInfo? : boolean

      value? : CustomFile[]
      placeholder? : string
      limit? : number

      appearance? : {
        format? : 'border' | 'cloud' | 'themeCloud' | 'plain'
        box? : {
          className? : string
          style? : OriginalStyleProps
        }
        cell? : {
          className? : string
          style? : OriginalStyleProps
        }
      }

      fileNameEdit? : boolean
      accept? : 'image'
    }
    type Props = BoxProps & {
      cellClassName : string
      componentId : string
    }

    type CustomFile = File & {
      fileId : string
      fileName : string
      dataUrl : string
      dataUrlEncoding : 'base64'
      key? : string
    }
  }
  namespace Switch {
    type BoxProps = Uni.Grouping & Uni.LifeCycle & {
      id? : string

      value? : boolean

      label? : ReactElement

      tabIndex? : -1

      color? : 'theme' | 'posi' | 'nega' | 'warn'

      forceOverRide? : boolean
      onChangeCallBack? : OnChangeCallBack
    }
    type Props = BoxProps & {
      componentId : string
    }
  }
  namespace Slider {
    type BoxProps = Uni.Grouping & Uni.LifeCycle & {
      id? : string

      value? : number
      min : number
      max : number
      step : number
      showLabels? : true
      label? : ReactElement
    }
    type Props = BoxProps & {
      componentId : string
    }
  }
  namespace Validation {
    type EventType = 'init' | 'update' | 'override' | 'refresh' | 'foreign'
    type Reason = {
      type:'valid' | 'invalid' | 'warn',
      label : ReactElement
    }
    type FormatResult = {
      messages : Reason[]
      safeValue : any
    }
    type CustomResultProps = {
      result : boolean
      messages? : Reason[]
      safeValue? : any
    }
    type CustomProps = {
      (
        state : {
          eventType : EventType,
          value : string | number | boolean | undefined,
          props : plainObject
        }
      ) : Promise< CustomResultProps >
    }
    type ResultProps = {
      eventType : EventType
      result : true | false
      messages : ReactElement | null
      safeValue? : any
    }
  }

  type OnChangeCallBack = {
    (
      data : {
        value : any,
        componentId? : string,
        storeData? : plainObject,
        element? : HTMLElement,
        eventType? : Validation.EventType,
        event? : React.ChangeEvent< any >
      }
    ) : void
  }
}