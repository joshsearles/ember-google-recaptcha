import Ember from 'ember';

const {
  computed: {
    alias,
  },
  get,
  getOwner,
  getProperties,
  getWithDefault,
  isNone,
  isPresent,
  merge,
  run: {
    later,
    next,
  },
  set,
  setProperties,
} = Ember;


export default Ember.Component.extend({

  classNames: ['g-recaptcha'],

  config: null,

  sitekey: null,

  tabindex: alias('tabIndex'),

  /**
   * Renders the reCaptcha
   * @public
   * @memberOf {g-recaptcha}
   * @return {undefined}
   */
  renderReCaptcha() {
    if (get(this, 'isDestroyed')) {
      return;
    }
    
    if (!this.get('sitekey')) {
      set(this, 'config', getWithDefault(getOwner(this).resolveRegistration('config:environment'), 'googleRecaptcha', {}));
      set(this, 'sitekey', get(this, 'config.siteKey'));
    }

    const grecaptcha = window.grecaptcha;
    if (isNone(grecaptcha)) {
      later(() => {
        this.renderReCaptcha();
      }, 500);
    } else {
      let container = this.$()[0],
        properties = getProperties(this, [
            'sitekey',
            'theme',
            'type',
            'size',
            'tabindex',
          ]
        ),
        parameters = merge(properties, {
          callback: get(this, 'successCallback').bind(this),
          'expired-callback': get(this, 'expiredCallback').bind(this)
        }),
        widgetId = grecaptcha.render(container, parameters);

      setProperties(this, {
        widgetId: widgetId,
        ref: this,
      });
    }
  },

  /**
   * Resets the reCaptcha
   * @public
   * @memberOf {g-recaptcha}
   * @return {undefined}
   */
  resetReCaptcha() {
    if (isPresent(get(this, 'widgetId'))) {
      window.grecaptcha.reset(get(this, 'widgetId'));
    }
  },

  /**
   * Calls the success Callback with the reCaptcha response token
   * @public
   * @memberOf {g-recaptcha}
   * @param {String} reCaptchaResponse
   * @return {undefined}
   */
  successCallback(reCaptchaResponse) {
    let action = get(this, 'onSuccess');
    if (isPresent(action)) {
      action(reCaptchaResponse);
    }
  },

  /**
   * Calls a callback for an expired Captcha
   * @public
   * @memberOf {g-recaptcha}
   * @return {undefined}
   */
  expiredCallback() {
    let action = get(this, 'onExpired');
    if (isPresent(action)) {
      action();
    } else {
      this.resetReCaptcha();
    }
  },

  /**
   * Manually Executes the Captcha
   * @public
   * @memberOf {g-recaptcha}
   * @return {undefined}
   */
  execute() {
    if (isPresent(get(this, 'widgetId'))) {
      window.grecaptcha.execute(get(this, 'widgetId'));
    }
  },


  // Lifecycle Hooks

  /**
   * Handles passed arguments to the g-captcha
   * @public
   * @memberOf {g-recaptcha}
   * @return {undefined}
   */
  didInsertElement() {
    this._super(...arguments);
    next(() => {
      this.renderReCaptcha();
    });
  },


});
