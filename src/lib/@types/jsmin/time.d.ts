namespace Time {
  type Input = any
  type ElementableValue = any

  interface Time {
    new( defaultValue: string | number ): Method
  }

  type DateTrimTypes = 'year' | 'month' | 'week' | 'date' | 'hours' | 'minutes' | 'seconds'

  interface Method {
    value: Date

    Time: Time.Time

    validate: boolean
    time: number
    weekday: number
    year: number
    month: number
    date: number
    hours: number
    minutes: number
    seconds: number

    addYear( v: number ): Time.Method
    addMonth( v: number ): Time.Method
    addWeek( v: number ): Time.Method
    addDate( v: number ): Time.Method
    addHours( v: number ): Time.Method
    addMinutes( v: number ): Time.Method
    addSeconds( v: number ): Time.Method


    toOrder( types: DateTrimTypes[] ): string[]
    toOrderJP( types: DateTrimTypes[] ): string
    toFormatYMD( lang?: 'JP' ): string
    toFormatHM( lang?: 'JP' ): string
    toFormatYMDHM( lang?: 'JP' ): string
    toFormatYMDHMS( lang?: 'JP' ): string

    getFirstDayOfTheYear(): Time.Method
    getLastDayOfTheYear(): Time.Method
    getFirstDayOfTheMonth(): Time.Method
    getLastDayOfTheMonth(): Time.Method
    getFirstDayOfTheWeek(): Time.Method
    getLastDayOfTheWeek(): Time.Method

    diff( v: Time.Method ): {
      years: number
      months: number
      dates: number
      hours: number
      minutes: number
      seconds: number
    }
  }
}
interface Time {
  fn: Time.Method | plainObject
  prototype: Time.Method | plainObject
  ( v?: Time.Input ): Time.Method
}

interface JsminExtension {
  Time: Time
}