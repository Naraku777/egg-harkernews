//
// app/controller/home.js

module.exports = app => {
  class HomeControler extends app.Controller {
    * index() {
      this.ctx.body = 'Hello, world.'
    }
  }
  return HomeControler
}