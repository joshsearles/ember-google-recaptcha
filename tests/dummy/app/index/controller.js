import Ember from 'ember';

const {
  get,
} = Ember

export default Ember.Controller.extend({
  actions: {
    clickButton() {
      get(this, 'googleRecaptcha').execute();
    },
  }
});