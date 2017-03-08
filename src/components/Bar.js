/**
 * Demo class
 *
 * @class Bar
 */
class Bar {
  /**
   * Creates an instance of Bar.
   *
   * @memberOf Bar
   */
  constructor() {
    this.info = 'I\'am Bar'
  }

  /**
   * Print info to the console
   *
   * @memberOf Bar
   * @returns {void}
   */
  print() {
    console.info(`info: ${this.info}`)
  }
}

export default Bar
