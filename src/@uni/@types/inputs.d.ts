namespace Input {
  type Types = {
    Hidden    :  (  props:Hidden.Props    ) => JSX.Element
    Text      :  (  props:Text.Props      ) => JSX.Element
    TextArea  :  (  props:TextArea.Props  ) => JSX.Element
    Select    :  (  props:Select.Props    ) => JSX.Element
    Search    :  (  props:Search.Props    ) => JSX.Element
    Time      :  (  props:Time.Props      ) => JSX.Element
    File      :  (  props:Filer.Props     ) => JSX.Element
    List      :  (  props:List.Props      ) => JSX.Element
    Switch    :  (  props:Switch.Props    ) => JSX.Element
    Slider    :  (  props:Slider.Props    ) => JSX.Element
  }

  namespace Uni {
    type Core = {
      componentId : string
    }
    type Grouping = {
      className? : string
      name? : string
      form? : string
      id? : string
    }
    type LifeCycle = {
      forceOverRide? : boolean
      firstValidCheck? : true
      onValidateCallBack? : Validation.CustomProps
      onChangeCallBack? : OnChangeCallBack
    }
  }
  namespace Hidden {
    type Props = Uni.Grouping & {

      required? : true

      value? : string | number
    }
  }
  namespace Text {
    type Props = Uni.Grouping & Uni.LifeCycle & {
      tabIndex? : -1

      required? : true
      hideRequiredSign? : boolean

      label? : ReactElement

      styles? : OriginalStyleProps

      delegationFormSubmit? : true

      value? : string
      placeholder? : string
      appearance? : 'border' | 'cloud' | 'themeCloud' | 'plain'

      autoComplete? : 'off'

      subIndicator? : ReactElement
      indicatorRightPosition? : ParginProp
      onKeydownCallBack? : {
        ( event:any ) : any
      }
    } & (
      OthersProps |
      PostalProps |
      PasswordProps
    )

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
          result : {
            addr : string,
            location : {
              lat : number,
              lng : number
            }
          }
        ) : void
      }
    }
    type PasswordProps = {
      restrict : 'password'
      clearButton? : void
      onGeoCodingCallBack? : never
    }
  }
  namespace TextArea {
    type Props = Uni.Grouping & Uni.LifeCycle & {
      tabIndex? : -1

      required? : true
      hideRequiredSign? : boolean

      label? : ReactElement

      styles? : OriginalStyleProps

      delegationFormSubmit? : true


      value? : string
      placeholder? : string
      appearance? : 'border' | 'cloud' | 'themeCloud' | 'plain'
      rows? : number
    }
  }
  namespace Select {
    type Props = Uni.Grouping & Uni.LifeCycle & {
      required? : true
      hideRequiredSign? : boolean

      label? : ReactElement

      styles? : OriginalStyleProps

      delegationFormSubmit? : true

      value? : string | number
      placeholder? : string
      appearance? : 'border' | 'cloud' | 'themeCloud' | 'plain'
      options : OptionProps[]

      indicator? : false
      indicatorRightPosition? : ParginProp
    }
    type OptionProps = {
      value : string | number
      label : string
    }
  }
  namespace Search {
    type Props = Uni.Grouping & Uni.LifeCycle & {
      required? : true
      hideRequiredSign? : boolean

      label? : ReactElement

      placeholder? : string
      multiple? : true
      appearance? : 'border' | 'cloud' | 'vivid' | 'alfa'
    } & (
      {
        dynamic : false
        list : OptionProps[]
        value? : ValueProps
      } | {
        dynamic : true
        list : onSearchCallBack
        value? : OptionCellProps[]
      }
    )

    type ValueProps = ( string | number )[]
    type OptionProps = OptionCellProps | OptionTitleProps
    type OptionCellProps = {
      value : string | number
      keyword : string
      icon? : ReactElement
      label : ReactElement

      type? : void
    }
    type OptionTitleProps = {
      type : 'title'
      content : ReactElement
      value? : void

      label? : void
      keyword? : void
    }
    type onSearchCallBack = {
      (
        value : string
      )
      : Promise< OptionProps[] >
    }
  }
  namespace Time {
    type Props = Uni.Grouping & Uni.LifeCycle & {
      required? : true
      hideRequiredSign? : boolean

      label? : ReactElement

      styles? : OriginalStyleProps
      delegationFormSubmit? : true

      appearance? : 'border' | 'cloud' | 'themeCloud'
    } & (
      {
        type : 'clock' | 'date' | 'week' | 'month' | 'year' | 'dateWareki'
        value? : string
      } | {
        type : 'clocks' | 'dates' | 'weeks' | 'months' | 'years'
        value? : [ string,string ]
      }
    )

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
  namespace Filer {
    type Props = Uni.Grouping & Uni.LifeCycle & {
      required? : true
      hideRequiredSign? : boolean

      label? : ReactElement

      custom? : boolean
      value? : CustomFile[]
      placeholder? : string
      appearance? : 'border' | 'cloud' | 'themeCloud' | 'plain'
      multiple? : true
      fileNameEdit? : boolean
      accept? : 'image'
    }
    type CustomFile = File & {
      fileId : string
      fileName : string
      dataUrl : string
    }
  }
  namespace List {
    type Props = Uni.Grouping & Uni.LifeCycle & {
      type : 'radio' | 'checkbox'

      required? : true
      hideRequiredSign? : boolean

      label? : ReactElement

      delegationFormSubmit? : true

      tabIndex? : -1

      value? : ( string | number )[]
      list : OptionProps[]
      align : 'col' | 'inlineCol' | 'row'
      justify? : 'center' | 'left' | 'right' | 'between' | 'around' | 'even'
      appearance? : 'border' | 'cloud' | 'vivid' | 'vividBorder' | 'icon' | 'iconBorder' | 'iconCloud' | 'plain'
      gap? : gapProp
      cellStyles? : OriginalStyleProps
      checkedCellStyles? : OriginalStyleProps
      cellClassName? : string
      checkedCellClassName? : string
    }
    type CellProps = {
      value : string | number
      label : ReactElement
      styles? : OriginalStyleProps
      checkedStyles? : OriginalStyleProps
    }
  }
  namespace Switch {
    type Props = Uni.Grouping & Uni.LifeCycle & {
      value? : boolean

      label? : ReactElement

      forceOverRide? : boolean
      onChangeCallBack? : OnChangeCallBack
    }
  }
  namespace Slider {
    type Props = Uni.Grouping & Uni.LifeCycle & {
      value? : number
      min : number
      max : number
      step : number
      showLabels? : true
      label? : ReactElement
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