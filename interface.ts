import { ApiBasedLoginData } from './docs/api-based-interface';
import { ClientSideLoginData } from './docs/client-side-interface';

/**
 * After coordinating your Custom SSO integration with Second Street,
 * we will suggest either an API-based workflow or a client-side workflow.
 * Based on which workflow you are using, the LoginData you'll need to provide
 * will change. Provide ApiBasedLoginData for the API-based workflow, or provide
 * ClientSideLoginData for the client-side workflow.
 */
export type LoginData = ApiBasedLoginData | ClientSideLoginData;

export enum ThirdParty {
  // Your ThirdParty ID will be provided by Second Street.
}

export interface LogoutData {
  thirdPartyId: ThirdParty;
}

export enum LoginStrategy {
  /*
   * If your login system does not expose a way for users to log into and out of
   * your website, choose NoLoginUI. In this case, when a visitor to the page
   * upon which the promotion is embedded is not logged into your website, the
   * promotion will ask them for their email address and other fields that you
   * configured on the promotion's form. If the user is logged into your
   * website, we'll skip the fields that your custom SSO implementation has
   * already sent to Second Street.
   */
  NoLoginUI = 0,
  /*
   * If your login system exposes a way for users to log into and out of your
   * website, choose MyLoginUI. In this case, when a visitor to the page upon
   * which the promotion is embedded is not logged into your website, the
   * promotion will not allow the user to proceed with registration and/or entry
   * until they have logged into your website's authentication system. If the
   * user is logged into your website, we'll skip the fields that your custom
   * SSO implementation has already sent to Second Street.
   */
  MyLoginUI = 1
}

/**
 * Implement this interface if using LoginStrategy.NoLoginUI.
 */
export interface CustomSSOWithoutLoginUI {
  /**
   * Second Street will inform you what your ThirdParty ID is.
   */
  id: ThirdParty;

  /**
   * purpose: A configuration setting that will change the behavior of embedded
   *          promotions. If it is not set, LoginStrategy.MyLoginUI is assumed.
   * 
   * context: See LoginStrategy.
   */
  loginStrategy: LoginStrategy.NoLoginUI;

  /**
   * purpose: A method that, when called, informs Second Street if the user
   *          is currently logged into your authentication system. If the user
   *          is logged in, it should return their data. If the user is
   *          not logged in, it should return null. For logged in users, the type
   *          of data you should return is based on the workflow you're using.
   *
   * context: Second Street will call this method when its embed code starts
   *          up, so that it can know the initial user login state before
   *          attaching event handlers. Second Street may call this method
   *          one or more times.
   */
  isLoggedIn(): LoginData | null;

  /**
   * purpose: A method that, when called, registers a function to be called
   *          when the user logs into your authentication system. The function
   *          should provide the data of the user logging in as an argument, and
   *          the type of data to return is based on the workflow you're using.
   *
   * context: Second Street will call this method when its embed code starts
   *          up, so that it can log the user into the embedded content when
   *          they log into your site. Second Street may attach one or more
   *          handlers.
   */
  addLoginHandler(fn: (data: LoginData) => void): void;

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

/**
 * Implement this interface if using LoginStrategy.MyLoginUI.
 */
export interface CustomSSOWithMyLoginUI extends Omit<CustomSSOWithoutLoginUI, 'loginStrategy'> {
  /**
   * purpose: A configuration setting that will change the behavior of embedded
   *          promotions. If it is not set, LoginStrategy.MyLoginUI is assumed.
   * 
   * context: See LoginStrategy.
   */
  loginStrategy?: LoginStrategy.MyLoginUI;

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
   *          when your website's login UI (the same one requestLogin() shows)
   *          is aborted by the user without logging into your website.
   *
   * context: Second Street will call this method when its embed code starts
   *          up, so that it is aware when the user chooses not to log in.
   *          Second Street may attach one or more handlers.
   */
  addLoginCanceledHandler(fn: (data: LogoutData) => void): void;
}

export type SecondStreetThirdPartyAuth<T> = T extends LoginStrategy.NoLoginUI ? CustomSSOWithoutLoginUI : CustomSSOWithMyLoginUI;