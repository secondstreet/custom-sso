# Custom Single Sign-On Integration

If you would like for your embedded contests, interactive content, and promotions to use your website's existing login system rather than using Second Street's, you can implement a small amount of JavaScript and work with us to integrate with your login system's API to create a seamless Single Sign-On experience.

This can be done in three easy steps:

1. Write some JavaScript on your website that exposes a global object implementing [this interface](https://github.com/secondstreet/custom-sso/blob/master/interface.ts) so our embed script can integrate with it.

2. Write an API endpoint that allows Second Street to authenticate and confirm user logins.

3. Coordinate with Second Street so we can call that API endpoint and provide a seamless SSO experience.

## Writing the JavaScript

Second Street's embed script will check for a global object at `window.SecondStreetThirdPartyAuth`. If that object exists, it must implement [this interface](https://github.com/secondstreet/custom-sso/blob/master/interface.ts). Second Street will use it to integrate with your authentication system so logged in users don't need to log into our embedded content.

Once you have written the JavaScript, make sure it loads on all pages where you are embedding Second Street content (the `<script>` tag that points to `embed.js`). It needs to load and create the global object _before_ Second Street's embed script runs.

 ### Examples

 To illustrate what it might look like to write your JavaScript integration, Second Street has provided an example implementation. It is written to integrate with an imaginary existing login system, implemented as `window.MyLoginSystem`. This is purely illustrative, as `window.MyLoginSystem` does not exist. As you are implementing your own integration, replace it with similar functionality that exists in your own login system.

Example implementations:

 - [TypeScript](https://github.com/secondstreet/custom-sso/blob/master/examples/typescript.ts)
 - [Modern JavaScript](https://github.com/secondstreet/custom-sso/blob/master/examples/es6-plus.js)
 - [Classic JavaScript](https://github.com/secondstreet/custom-sso/blob/master/examples/classic-javascript.js)

## Writing the API endpoint

In addition to this implementation in your JavaScript, you'll need to coordinate with SecondStreet to inform us how to write our server-side integration. We will make authenticated network requests to your API over HTTPS. You may already have an API endpoint that does this, or you may have to write a new one.
