interface I1 {
  /**
   * interface prop title
   * @type {string}
   */
  p: string
}
const i1: I1 = {
  p: ""
}

/**
 * @interface I2
 * @property {string} p - interface top title
 */
interface I2 {
  p: string
}
/** @type {I2} */
const i2: I2 = {
  p: ""
}

/**
 * type top title
 * @typedef T1
 * @type {object}
 * @property {string} p - type top title
 */
type T1 = {
  p: string
}
/** @type {T1} */
const t1: T1 = {
  p: ""
}

type T2 = {
  /**
   * type prop title
   * @type {string}
   */
  p: string
}

/** @type {T2} */
const t2: T2 = {
  p: ""
}
