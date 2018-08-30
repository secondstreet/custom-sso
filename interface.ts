export enum ThirdParty {
  // Your ThirdParty ID will be provided by Second Street.
}

export type uuid = string | number;

export interface LoginData {
  uuid: uuid;
  thirdPartyId: ThirdParty;
}

export interface LogoutData {
  thirdPartyId: ThirdParty;
}

export interface SecondStreetThirdPartyAuth {
  /**
   * Second Street will inform you what your ThirdParty ID is.
   */
  id: ThirdParty;

  /**
   * purpose: A method that, when called, informs Second Street if the user
   *          is currently logged into your authentication system. If the user
   *          is logged in, it should return their LoginData. If the user is
   *          not logged in, it should return null.
   *
   * context: Second Street will call this method when its embed code starts
   *          up, so that it can know the initial user login state before
   *          attaching event handlers. Second Street may call this method
   *          one or more times.
   */
  isLoggedIn(): LoginData | null;

  /**
   * purpose: A method that, when called, shows your website's login UI. If the
   *          login UI was successfully shown (or was successfully queued to be
   *          shown), it should return true. Otherwise, it should return false.
   *
   * context: Second Street will call this method when the user tries to take
   *          an action that requires the user to be authenticated. Second
   *          Street may call this method one or more times.
   */
  requestLogin(): boolean;

  /**
   * purpose: A method that, when called, registers a function to be called
   *          when the user logs into your authentication system.
   *
   * context: Second Street will call this method when its embed code starts
   *          up, so that it can log the user into the embedded content when
   *          they log into your site. Second Street may attach one or more
   *          handlers.
   */
  addLoginHandler(fn: (data: LoginData) => void): void;

  /**
   * purpose: A method that, when called, registers a function to be called
   *          when your website's login UI (the same one requestLogin() shows)
   *          is aborted by the user without logging into your website.
   *
   * context: Second Street will call this method when its embed code starts
   *          up, so that it is aware when the user chooses not to log in.
   *          Second Street may attach one or more handlers.
   */
  addLoginCanceledHandler(fn: (data: LogoutData) => void): void;

  /**
   * purpose: A method that, when called, registers a function to be called
   *          when the user logs out of your authentication system.
   *
   * context: Second Street will call this method when its embed code starts
   *          up, so that it can log the user out of the embedded content when
   *          they log out of your site. Second Street may attach one or more
   *          handlers.
   */
  addLogoutHandler(fn: (data: LogoutData) => void): void;
}
