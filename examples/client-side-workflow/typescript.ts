import { SecondStreetThirdPartyAuth, LogoutData, LoginStrategy } from '../../interface';
import { ClientSideLoginData } from '../../docs/client-side-interface';

/**
 * Here is an example TypeScript implementation of the interface. If you
 * have any questions about the code below, feel free to reach out.
 * This implementation assumes a client side workflow.
 */
declare global {
  interface Window {
    MyLoginSystem: any;
    SecondStreetThirdPartyAuth?: SecondStreetThirdPartyAuth<LoginStrategy.MyLoginUI>;
  }
}

class TypeScriptExample implements SecondStreetThirdPartyAuth<LoginStrategy.MyLoginUI> {
  public readonly id = 4;
  public readonly loginStrategy = 1;

  public isLoggedIn(): ClientSideLoginData | null {
    return window.MyLoginSystem.isLoggedIn ? this.loginData : null;
  }
  public requestLogin(): boolean {
    window.MyLoginSystem.showLoginModal();
    return window.MyLoginSystem.isLoginModalVisible;
  }
  public addLoginHandler(fn: (data: ClientSideLoginData) => void): void {
    if (this.loginHandlers.includes(fn)) { return; }
    this.loginHandlers.push(fn);
  }
  public addLoginCanceledHandler(fn: (data: LogoutData) => void): void {
    if (this.loginCanceledHandlers.includes(fn)) { return; }
    this.loginCanceledHandlers.push(fn);
  }
  public addLogoutHandler(fn: (data: LogoutData) => void): void {
    if (this.logoutHandlers.includes(fn)) { return; }
    this.logoutHandlers.push(fn);
  }

  constructor() {
    const callLogoutHandlers = () =>
      this.logoutHandlers.forEach(fn => fn(this.logoutData));
    const callLoginHandlers = () =>
      this.loginHandlers.forEach(fn => fn(this.loginData));
    const callLoginCanceledHandlers = () =>
      this.loginCanceledHandlers.forEach(fn => fn(this.logoutData));

    window.MyLoginSystem.on('login', callLoginHandlers);
    window.MyLoginSystem.on('logout', callLogoutHandlers);
    window.MyLoginSystem.on('userSessionExpired', callLogoutHandlers);
    window.MyLoginSystem.on('loginModalAborted', callLoginCanceledHandlers);
  }

  private loginHandlers: Array<(ClientSideLoginData) => void> = [];
  private logoutHandlers: Array<(LogoutData) => void> = [];
  private loginCanceledHandlers: Array<(LogoutData) => void> = [];

  private get loginData(): ClientSideLoginData {
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

  private get logoutData(): LogoutData {
    return {
      thirdPartyId: this.id
    };
  }
}

window.SecondStreetThirdPartyAuth = new TypeScriptExample();
