namespace amotify {
  namespace fn {
    type Methods = {
      Table: amotify.fn.Tables.Methods
      Layout: amotify.fn.Layout.Methods
      Buttons: amotify.fn.Buttons.Methods
      Input: amotify.fn.Input.Methods
      Modal: amotify.fn.Modal.Method
      SnackBar: amotify.fn.SnackBar.Method
      Loader: amotify.fn.Loader.Method
      Tooltips: amotify.fn.Tooltips.Method
    }
  }
}
namespace amotify {
  type Functions = amotify.fn.Methods
}