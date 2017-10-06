/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-google-recaptcha',

  contentFor: function(type, config) {
    let content = '';
    if (type === 'body-footer') {
      const src = 'https://www.google.com/recaptcha/api.js?render=explicit';
      content = `<script type="text/javascript" src="${src}" async defer></script>`;
    }
    return content;
  },
  included: function() {
    this._super.included.apply(this, arguments);
  }
};
