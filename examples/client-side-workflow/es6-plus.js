/**
 * Here is an example ES6+ implementation of the interface. If you
 * This implementation assumes a client side workflow.
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
      email: window.MyLoginSystem.currentUser.emailAddress,
      firstName: window.MyLoginSystem.currentUser.fName,
      lastName: window.MyLoginSystem.currentUser.lName,
      city: window.MyLoginSystem.currentUser.address.city,
      address1: window.MyLoginSystem.currentUser.address.addressFirstLine,
      address2: window.MyLoginSystem.currentUser.address.addressSecondLine,
      stateProvince: window.MyLoginSystem.currentUser.address.stateAbbreviation.toUpperCase(),
      postalCode: window.MyLoginSystem.currentUser.address.zipCode,
      country: window.MyLoginSystem.currentUser.address.countryTwoLetterAbbreviation.toUpperCase(),
      gender: ({ M: 1, F: 2, P: 3, O: 4, N: 5 })[window.MyLoginSystem.currentUser.genderIdentity],
      phone: window.MyLoginSystem.currentUser.phoneNumber,
      birthdate: `${window.MyLoginSystem.currentUser.birthday.YYYY}${window.MyLoginSystem.currentUser.birthday.MM}${window.MyLoginSystem.currentUser.birthday.DD}`
    };
  }
  get _logoutData() {
    return {
      thirdPartyId: this.id
    };
  }
}
window.SecondStreetThirdPartyAuth = new ES6PlusExample();
