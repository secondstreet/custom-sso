# Custom Single Sign-On Integration

If you would like for your embedded contests, interactive content, and promotions to use your website's existing login system rather than using Second Street's, you can implement a small amount of JavaScript and work with us to integrate with your login system's API to create a seamless Single Sign-On experience.

## API-Based Workflow
If after speaking with Second Street they recommend the API-Based Workflow, it can be done in three easy steps:

1. Write some JavaScript on your website that exposes a global object implementing [the `SecondStreetThirdPartyAuth` interface](https://github.com/secondstreet/custom-sso/blob/master/interface.ts) so Second Street's embed script can integrate with it.

2. Expose or write an API endpoint that allows Second Street to authenticate and confirm user logins.

3. Coordinate with Second Street so Second Street can call that API endpoint and provide a seamless SSO experience.

## Client-Side Workflow
If after speaking with Second Street they recommend the Client-Side Workflow, it can be done in three easy steps:

1. Write some JavaScript on your website that exposes a global object implementing [the `SecondStreetThirdPartyAuth` interface](https://github.com/secondstreet/custom-sso/blob/master/interface.ts) so Second Street's embed script can integrate with it.

2. Coordinate with Second Street they can integrate with custom user data you plan to expose in JavaScript.

3. Enhance the JavaScript you wrote in Step 1 to pass `ClientSideLoginData` where `LoginData` is required.


# Writing the JavaScript

Second Street's embed script will check for a global object at `window.SecondStreetThirdPartyAuth`. If that object exists, it must implement [this interface](https://github.com/secondstreet/custom-sso/blob/master/interface.ts). Second Street will use it to integrate with your authentication system so logged in users don't need to log into Second Street's embedded content.

Once you have written the JavaScript, make sure it loads on all pages where you are embedding Second Street content (the `<script>` tag that points to `embed.js`). It needs to load and create the global object _before_ Second Street's embed script runs.

## Login Strategy
One choice you will have to make during the implementation is which login strategy to use. There is a detailed description in [the interface](https://github.com/secondstreet/custom-sso/blob/master/interface.ts), but the quick summary is that if users can choose to log into and out of your website, choose `MyLoginUI` (1) but if logins and logouts are automatic and hidden from the user, choose `NoLoginUI` (0). For backwards compatibility purposes, if you don't choose a login strategy we'll assume you want `MyLoginUI` (1).

 ## Examples

 To illustrate what it might look like to write your JavaScript integration, Second Street has provided an example implementation. It is written to integrate with an imaginary existing login system, implemented as `window.MyLoginSystem`. This is purely illustrative, as `window.MyLoginSystem` does not exist. As you are implementing your own integration, replace it with similar functionality that exists in your own login system.

Example implementations for API-Based:

 - [TypeScript](https://github.com/secondstreet/custom-sso/blob/master/examples/api-based-workflow/typescript.ts)
 - [Modern JavaScript](https://github.com/secondstreet/custom-sso/blob/master/examples/api-based-workflow/es6-plus.js)
 - [Classic JavaScript](https://github.com/secondstreet/custom-sso/blob/master/examples/api-based-workflow/classic-javascript.js)

Example implementations for Client-Side:

 - [TypeScript](https://github.com/secondstreet/custom-sso/blob/master/examples/client-side-workflow/typescript.ts)
 - [Modern JavaScript](https://github.com/secondstreet/custom-sso/blob/master/examples/client-side-workflow/es6-plus.js)
 - [Classic JavaScript](https://github.com/secondstreet/custom-sso/blob/master/examples/client-side-workflow/classic-javascript.js)

# Exposing or Writing the API endpoint (API-Based Workflows)

In addition to this implementation in your JavaScript, you'll need to coordinate with SecondStreet to inform us how to write our server-side integration. Second Street will make authenticated network requests to your API over HTTPS. You may already have an API endpoint that does this, or you may have to write a new one.
