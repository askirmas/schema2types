import { including } from "./utils";

describe(including.name, () => {
  it('primitive', () => expect(including(
    null, null
  )).toBe(true))
  it('array', () => expect(including(
    [null], null
  )).toBe(true))
})