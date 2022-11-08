interface JsminExtension {
  getFetch(
    params: JsminExtension.Fetch.params & JsminExtension.getFetch.params,
    callback?: JsminExtension.Fetch.callback
  ): Jsmin.Fetch.Res
  UpdateUsrImg( v: string ): void
  userIconImage: {
    ( value: string,size?: 'S' | 'R' | 'L' ): string
  }
}
namespace JsminExtension {
  namespace getFetch {
    type params = JsminExtension.Fetch.params & {
      type? : '' | 'master'
    }
  }
}