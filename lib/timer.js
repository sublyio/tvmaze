/**
 * Timer class
 */
export default class Timer {
  /**
   * Creates a instance of Timer.
   * @param  {Number} [maxRequestNum=20] - Maximum request number
   * @param  {Number} [requestNum=0]     - Current request number.
   * @return {Void}
   */
  constructor(maxRequestNum = 20, requestNum = 0) {
    this.requestNum = requestNum;
    this.maxRequestNum = maxRequestNum;

    this.maxTime = 10 * 1000;
    this.time = () => {
      return new Promise(resolve => setTimeout(resolve, this.maxTime));
    };
  }

  /**
   * Increase the number of requests
   * @param {Number} [num=1] - Increase value
   */
  add(num = 1) {
    this.requestNum += num;
  }

  /**
   * Checks to have reached the maximum value. If so, then wait or else
   * increase requestNum.
   * @return {Promise} [description]
   */
  async check() {
    if (this.maxRequestNum > this.requestNum) {
      this.add();
      return;
    }

    await this.time();

    this.reset();
  }

  /**
   * Clear Timer
   */
  reset() {
    this.requestNum = 0;
    clearTimeout(this.time);
  }
};
