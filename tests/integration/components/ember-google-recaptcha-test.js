import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('google-recaptcha', 'Integration | Component | google recaptcha', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{google-recaptcha}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#google-recaptcha}}
      template block text
    {{/google-recaptcha}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
