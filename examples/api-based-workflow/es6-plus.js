/**
 * Here is an example ES6+ implementation of the interface. If you
 * This implementation assumes an API-based workflow.
 * have any questions about the code below, feel free to reach out.
 */
class ES6PlusExample {
  id = 2;

  isLoggedIn() {
    return window.MyLoginSystem.isLoggedIn ? this._loginData : null;
  }
  requestLogin() {
    window.MyLoginSystem.showLoginModal();
    return window.MyLoginSystem.isLoginModalVisible;
  }
  addLoginHandler(fn) {
    if (this._loginHandlers.includes(fn)) { return; }
    this._loginHandlers.push(fn);
  }
  addLoginCanceledHandler(fn) {
    if (this._loginCanceledHandlers.includes(fn)) { return; }
    this._loginCanceledHandlers.push(fn);
  }
  addLogoutHandler(fn) {
    if (this._logoutHandlers.includes(fn)) { return; }
    this._logoutHandlers.push(fn);
  }

  constructor() {
    const callLogoutHandlers = () =>
      this._logoutHandlers.forEach(fn => fn(this._logoutData));
    const callLoginHandlers = () =>
      this._loginHandlers.forEach(fn => fn(this._loginData));
    const callLoginCanceledHandlers = () =>
      this._loginCanceledHandlers.forEach(fn => fn(this._logoutData));

    window.MyLoginSystem.on('login', callLoginHandlers);
    window.MyLoginSystem.on('logout', callLogoutHandlers);
    window.MyLoginSystem.on('userSessionExpired', callLogoutHandlers);
    window.MyLoginSystem.on('loginModalAborted', callLoginCanceledHandlers);
  }

  _loginHandlers = [];
  _logoutHandlers = [];
  _loginCanceledHandlers = [];

  get _loginData() {
    return {
      thirdPartyId: this.id,
      uuid: window.MyLoginSystem.currentUser.uuid
    };
  }
  get _logoutData() {
    return {
      thirdPartyId: this.id
    };
  }
}
window.SecondStreetThirdPartyAuth = new ES6PlusExample();
