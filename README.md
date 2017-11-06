# ember-google-recaptcha
Utilize Google reCAPTCHA v2 as an Ember js component that handles both the standard and invisible versions. 

### Resources
* [Google reCAPTCHA v2 Site/Key Administration](https://www.google.com/recaptcha/admin/)
* [Google reCAPTCHA v2 Documentation](https://developers.google.com/recaptcha/intro)

## Install
From command line, run the following command
```
npm install ember-google-recaptcha
```

## Configuration
**Prerequisite**: Setup and generate the proper API keys from the [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)

In your app's `config/environment.js`'s ENV variable, add the following properties
```
var ENV = {
    ...
    
    googleRecaptcha: {
      siteKey: 'google_recaptcha_site_key',
    },
    
    ...
};
```

## Utilization

#### Standard Usage
For the traditional use of reCATPCHA, add the following to your template
```
{{google-recpatcha onSuccess=(action "onCaptchaResolved")}}
```

In the corresponding controller/component, have the following action
```
actions: {
    onCaptchaResolved(reCaptchaResponse) {
        // Pass reCaptchaResponse to the server to be validated
    },
},
```
[Documentation: Standard reCAPTCHA](https://developers.google.com/recaptcha/docs/display)

#### Invisible Usage
For the reCaptcha invisible to be used, add the following to your template
```
{{google-recaptcha 
    onSuccess=(action "onCaptchaResolved") 
    ref=(mut iGoogleRecaptcha) 
    size="invisible"
}}
// An element (or some piece of code) is required to instantiate the check, we'll use the following button.
<button {{action "onClickExecuteInvisible" click}}>Click me</button>
```

In the corresponding controller/component, have the following actions
```
actions: {
    onCaptchaResolved(reCaptchaResponse) {
        // Pass reCaptchaResponse to the server to be validated
    },
    onClickExecuteInvisible() {
        // Do any treatment and then instantiate the test (if Google deems neccessary)
        Ember.get(this, 'iGoogleRecaptcha').execute();
    },
},
```

[Documentation: Invisible reCAPTCHA](https://developers.google.com/recaptcha/docs/invisible)


### Advanced Usage

#### Handling Expiration (Standard Only)
If you would like to have custom code enacted if the reCAPTCHA expires (default: reset), you may pass a custom action using the `onExpired` property.
```
{{google-recaptcha 
    onSuccess=(action "onCaptchaResolved")
    onExpired=(action "onCaptchaExpired")
}}
```

In the corresponding controller/component, have the following actions
```
actions: {
    onCaptchaExpired() {
        // Custom logic here
    },
},
```
[Reference: expiration](https://developers.google.com/recaptcha/docs/display#js_api)

#### Triggering Reset
If you would like to reset the reCAPTCHA widget, you may do so by doing the following
```
{{google-recaptcha
    onSuccess=(action "onCaptchaResolved")
    ref=(mut googleRecaptcha)
}}
```

In the corresponding controller/component, have the following code
```
Ember.get(this, 'googleRecaptcha').resetReCaptcha();
```
[Reference (Standard): reset](https://developers.google.com/recaptcha/docs/display#js_api)

[Reference (Invisible): reset](https://developers.google.com/recaptcha/docs/invisible#js_api)

#### Executing the widget (Invisible Only)
If you are using invisible reCAPTCHA, you will want to trigger the challenge at whatever moment you'd like. 
```
{{google-recaptcha
    onSuccess=(action "onCaptchaResolved")
    ref=(mut iGoogleRecaptcha)
    size="invisible"
}}
// An element (or some piece of code) is required to instantiate the check, we'll use the following button.
<button {{action "onClickExecuteInvisible" click}}>Click me</button>
```

In the corresponding controller/component, have the following action
```
actions: {
    onClickExecuteInvisible() {
        // Do any treatment and then instantiate the test (if Google deems neccessary)
        Ember.get(this, 'iGoogleRecaptcha').execute();
    },
},
```
[Documentation: execute()](https://developers.google.com/recaptcha/docs/invisible#programmatic_execute)

#### Passable Properties
The following properties may be passed to the component
- badge [bottomright:default|bottomleft|inline] (invisible only)
- siteKey (using `config/environment.js` is recommended)
- size [invisible]
- theme [dark|light:default] (standard only)
- type [audio|image:default]
- tabindex

## Credit
Based off the code of [ember-g-recpatcha](https://github.com/algonauti/ember-g-recaptcha) by [algonauti](https://github.com/algonauti/)

## Change Log 
### v0.2.1
- Updated Documentation
- Updated contributed code

### v0.2.0
- Shortened component name to **google-recaptcha**
- Added _badge_ parameter able to be set on component (for reCaptcha invisible)
- Upgraded Ember version to 2.16.* and fixed deprecations
- Updated dummy app