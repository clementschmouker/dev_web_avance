/**
 * Main JS entry file
 */

// Enable HMR
if (module.hot) {
  module.hot.accept()
}

// Partials
import Foo from 'Foo'
import Bar from 'Bar'

console.info('Ready! 🚀');

const foo = new Foo();
const bar = new Bar();

foo.print();
bar.print();
