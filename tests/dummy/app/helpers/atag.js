import Helper from '@ember/component/helper';
import Ember from 'ember';

const {
  typeOf,
} = Ember;

export default Helper.extend({
  compute(args) {
    if (args.length < 2 || typeOf(args[0]) !== 'object') {
      return '';
    }

    const urls = args[0];

    let clss = '';

    if (typeOf(args[2]) == 'string') {
      clss = `class="${args[2]}"`;
    }

    for ( let i in urls ) {
      if (i === args[1]) {
        const {
          url,
          title,
          text,
        } = urls[i];
        return `<a href="${url}" title="${title}" target="_blank" ${clss}>${text}</a>`
      }
    }

    return '';
  }
});

