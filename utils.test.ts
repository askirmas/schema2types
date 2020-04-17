import { including, stringify } from "./utils";

describe(including.name, () => {
  it('primitive', () => expect(including(
    null, null
  )).toBe(true))

  it('array', () => expect(including(
    [null], null
  )).toBe(true))
})

describe(stringify.name, () => {
  it('undefined not stringified', () => expect(stringify(
    undefined
  )).toBe(
    undefined
  ))
})