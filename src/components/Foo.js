/**
 * Demo class
 *
 * @class Foo
 */
class Foo {
  /**
   * Creates an instance of Foo.
   *
   * @memberOf Foo
   */
  constructor() {
    this.info = 'I\'am Foo'
  }

  /**
   * Print info to the console
   *
   * @memberOf Foo
   * @returns {void}
   */
  print() {
    document.body.innerHTML = 'Hello world!'
    console.info(`info: ${this.info}`)
  }
}

export default Foo
