import Ember from 'ember';

const {
  get,
  Logger: {
    log,
  },
  setProperties,
} = Ember

export default Ember.Controller.extend({
  /***********
   * Actions *
   ***********/
  actions: {
    /**
     * Executes the check for the invisible reCaptcha
     * @action
     * @public
     * @return {undefined}
     */
    onClickInvisibleExecute() {
      log('[Google reCAPTCHA - Invisible] Executing challange...');
      get(this, 'iGoogleRecaptcha').execute();
    },

    /**
     * If the Invisible reCaptcha successfully calls the callback
     * @param {string} challengeToken
     * @action
     * @public
     * @return {undefined}
     */
    onSuccessInvisibleCallback(challengeToken) {
      log('[Google reCAPTCHA - Invisible] Challenge successfully completed!');
      log(`[Google reCAPTCHA - Invisible] Token: ${challengeToken}`);
    },

    /**
     * If the Standard reCaptcha successfully calls the callback
     * @param {string} challengeToken
     * @action
     * @public
     * @return {undefined}
     */
    onSuccessStandardCallback(challengeToken) {
      log('[Google reCAPTCHA - Standard] Challenge successfully completed!');
      log(`[Google reCAPTCHA - Standard] Token: ${challengeToken}`);
    },

    /**
     * Changes the menu
     * @action
     * @public
     * @return {undefined}
     */
    onClickMenu(goto) {
      const model = get(this, 'model');

      setProperties(model, {
        isDefault: goto === 'default',
        isInvisible: goto === 'invisible',
        isStandard: goto === 'standard',
      });
    },

  }
});