namespace Glob {
  type LaunchReactApplicationParams = {
    ( params: {
      baseElement: HTMLElement | string
      reactElement: ReactElement
      nonRouter?: boolean
      appearances?: {
        themeColor?: amotify.ThemeColorTypes
        tone?: amotify.ToneTypes
        darkMode?: amotify.DarkmodeTypes
      }
    } ): void
  }

  type useStoreProps = {
    ( props: {
      insertId: string,
      deleteId?: string,
      data?: plainObject
    } ): void
  }

  type StyleConvertParams = {
    <T>( params: T ): T & {
      className: string
    }
  }
}

namespace amotify {
  interface Glob {
    React: typeof React
    ReactRouterDom: typeof ReactRouterDom
    ReactDom: typeof ReactDom

    StyleConvert: Glob.StyleConvertParams

    useStore: Glob.useStoreProps
    LaunchReactApplication: Glob.LaunchReactApplicationParams
  }
}