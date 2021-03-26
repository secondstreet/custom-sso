/**
 * Here is an example Classic JavaScript implementation of the interface.
 * This implementation assumes a client side workflow.
 * If you have any questions about the code below, feel free to reach out.
 */
function ClassicJavaScriptExample() {
  this.id = 2;

  this._loginHandlers = [];
  this._logoutHandlers = [];
  this._loginCanceledHandlers = [];

  var _this = this;
  function callLogoutHandlers() {
    for (var i = 0; i < _this._logoutHandlers.length; i++) {
      _this._logoutHandlers[i](_this._logoutData());
    }
  }
  function callLoginHandlers() {
    for (var i = 0; i < _this._loginHandlers.length; i++) {
      _this._loginHandlers[i](_this._loginData());
    }
  }
  function callLoginCanceledHandlers() {
    for (var i = 0; i < _this._loginCanceledHandlers.length; i++) {
      _this._loginCanceledHandlers[i](_this._logoutData());
    }
  }

  window.MyLoginSystem.on('login', callLoginHandlers);
  window.MyLoginSystem.on('logout', callLogoutHandlers);
  window.MyLoginSystem.on('userSessionExpired', callLogoutHandlers);
  window.MyLoginSystem.on('loginModalAborted', callLoginCanceledHandlers);
}

ClassicJavaScriptExample.prototype.isLoggedIn = function() {
  return window.MyLoginSystem.isLoggedIn ? this._loginData() : null;
};
ClassicJavaScriptExample.prototype.requestLogin = function() {
  window.MyLoginSystem.showLoginModal();
  return window.MyLoginSystem.isLoginModalVisible;
};
ClassicJavaScriptExample.prototype.addLoginHandler = function(fn) {
  if (this._loginHandlers.indexOf(fn) > -1) { return; }
  this._loginHandlers.push(fn);
};
ClassicJavaScriptExample.prototype.addLoginCanceledHandler = function(fn) {
  if (this._loginCanceledHandlers.indexOf(fn) > -1) { return; }
  this._loginCanceledHandlers.push(fn);
};
ClassicJavaScriptExample.prototype.addLogoutHandler = function(fn) {
  if (this._logoutHandlers.indexOf(fn) > -1) { return; }
  this._logoutHandlers.push(fn);
};

ClassicJavaScriptExample.prototype._loginData = function() {
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
    birthdate: '' + window.MyLoginSystem.currentUser.birthday.YYYY + window.MyLoginSystem.currentUser.birthday.MM + window.MyLoginSystem.currentUser.birthday.DD
  };
};
ClassicJavaScriptExample.prototype._logoutData = function() {
  return {
    thirdPartyId: this.id
  };
};

window.SecondStreetThirdPartyAuth = new ClassicJavaScriptExample();
