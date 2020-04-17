import {readFileSync} from 'fs'
import {basename} from 'path'
import globby from 'globby'
import Schema from "./def"
import { schema2ts } from ".";

const tsPostfix = '.def.ts'
, jsPostfix = '.schema2ts.json'
, getJson = (entry: string) => require(`./${entry}${jsPostfix}`) as Schema  
, getTs = (entry: string) => readFileSync(`${entry}${tsPostfix}`).toString()
, nameExtractor = /[^/]+$/
, getDefaultName = (entry: string) => (nameExtractor.exec(entry) ?? [''])[0]

describe(schema2ts.name, () => {
  describe('falls', () => {
    it('empty', () => expect(() => schema2ts(
      {},
      "empty"
    )).toThrow())
    it('bad', () => expect(() => schema2ts(
      //@ts-ignore
      {"type": null},
      "bad"
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

