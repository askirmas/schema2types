import {readFileSync} from 'fs'
import globby from 'globby'

import schema2ts, {Schema} from "."

const tsPostfix = '.def.ts'
, jsPostfix = '.schema2ts.json'
, getJson = (entry: string) => require(`./${entry}${jsPostfix}`) as Schema  
, getTs = (entry: string) => readFileSync(`${entry}${tsPostfix}`).toString()
, nameExtractor = /[^/]+$/
, getDefaultName = (entry: string) => (nameExtractor.exec(entry) ?? [''])[0]

describe(schema2ts.name, () => {
  describe('falling', () => {
    it('undefined', () => expect(() => schema2ts(
      undefined as unknown as Schema,
      "falling"
    )).toThrow())
    
    it('empty', () => expect(() => schema2ts(
      {},
      "falling"
    )).toThrow())

    it('bad type', () => expect(() => schema2ts(
      {"type": null as unknown as string},
      "falling"
    )).toThrow())

    it('bad definition', () => expect(() => schema2ts(
      {"definitions": {
        "falling": undefined as unknown as Schema
      }},
      "falling"
    )).toThrow())
  })
  
  describe('examples', () => {
    globby.sync(`**/*${jsPostfix}`, {gitignore: true})
    .forEach(entryJson => {
      const entry = entryJson.replace(/(\.[^.]+)+$/, '')
      if (!entry)
        throw new Error(`No file title for '${entryJson}'`)
    
      it(entryJson, () => expect(schema2ts(
        getJson(entry),
        getDefaultName(entry))
      ).toBe(
        getTs(entry)
      ))
    })  
  })
})

