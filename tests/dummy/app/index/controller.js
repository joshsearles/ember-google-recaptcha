import Ember from 'ember';

const {
  get,
} = Ember

export default Ember.Controller.extend({
  actions: {
    /**
     * Executes the check for the invisible reCaptcha
     * @action
     * @public
     * @returns {undefined}
     */
    invisibleClickToExecute() {
      get(this, 'iGoogleRecaptcha').execute();
    },
  }
});