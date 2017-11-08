import Ember from 'ember';
import ENV from 'dummy/config/environment';
import Route from '@ember/routing/route';

const {
  getWithDefault,
} = Ember;

export default Route.extend({
  model() {
    const siteKey = getWithDefault(ENV, 'googleRecaptcha.siteKey', false),
      hasSiteKey = siteKey && /^[\w-]+$/.test(siteKey);

    return {
      hasSiteKey,
      urls: {
        admin: {
          text: 'Site/Key Administration',
          title: 'Google reCaptcha v2 Site/Key Administration',
          url: 'https://www.google.com/recaptcha/admin',
        },
        dev: {
          text: 'Documentation',
          title: 'Google reCaptcha v2 Documentation',
          url: 'https://developers.google.com/recaptcha/intro',
        },
        npm: {
          text: 'npm',
          title: 'ember-google-recaptcha on npm',
          url: 'https://www.npmjs.com/package/ember-google-recaptcha',
        },
        github: {
          text: 'GitHub',
          title: 'ember-google-recaptcha on GitHub',
          url: 'https://github.com/joshsearles/ember-google-recaptcha',
        },
      },
      isDefault: true,
      isStandard: false,
      isInvisble: false,
    };
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('model', model);
  },
});
