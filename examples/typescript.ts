/**
 * Here is an example TypeScript implementation of the interface. If you
 * have any questions about the code below, feel free to reach out.
 */
declare global {
  interface Window {
    MyLoginSystem: any;
    SecondStreetThirdPartyAuth?: SecondStreetThirdPartyAuth;
  }
}

class TypeScriptExample implements SecondStreetThirdPartyAuth {
  public readonly id = 2;

  public isLoggedIn(): LoginData | null {
    return window.MyLoginSystem.isLoggedIn ? this.loginData : null;
  }
  public requestLogin(): boolean {
    window.MyLoginSystem.showLoginModal();
    return window.MyLoginSystem.isLoginModalVisible;
  }
  public addLoginHandler(fn: (data: LoginData) => void): void {
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

  private loginHandlers: Array<(LoginData) => void> = [];
  private logoutHandlers: Array<(LogoutData) => void> = [];
  private loginCanceledHandlers: Array<(LogoutData) => void> = [];

  private get loginData(): LoginData {
    return {
      thirdPartyId: this.id,
      uuid: window.MyLoginSystem.currentUser.uuid
    };
  }

  private get logoutData(): LogoutData {
    return {
      thirdPartyId: this.id
    };
  }
}

window.SecondStreetThirdPartyAuth = new TypeScriptExample();
