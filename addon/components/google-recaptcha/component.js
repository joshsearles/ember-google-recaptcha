import Ember from 'ember';

const {
  assign,
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

    if (!isPresent(get(this, 'sitekey'))) {
      let config = getWithDefault(
        getOwner(this).resolveRegistration('config:environment'),
        'googleRecaptcha',
        {}
      );

      config = assign({
        pollForGlobalInterval: 500
      }, config)

      set(this, 'config', config);
      set(this, 'sitekey', get(this, 'config.siteKey'));
    }

    const grecaptcha = window.grecaptcha;

    if (isNone(grecaptcha) || typeof grecaptcha.render !== 'function') {
      later(() => {
        this.renderReCaptcha();
      }, get(this, 'config.pollForGlobalInterval'));
    } else {
      const container = this.$()[0];
      let properties = getProperties(this, [
                          'badge',
                          'sitekey',
                          'theme',
                          'type',
                          'size',
                          'tabindex',
                        ]);
      const parameters = merge(properties, {
        callback: get(this, 'successCallback').bind(this),
        'expired-callback': get(this, 'expiredCallback').bind(this)
      });
      const widgetId = grecaptcha.render(container, parameters);

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
