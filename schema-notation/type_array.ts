export type schemaType = "string"|"number"|"integer"|"boolean"|"null" 
export type iType = {type: schemaType}
export type iTypes = {type: schemaType[]}


export type TypesSchema<T extends string[] | readonly schemaType[]>
= (
  "null" extends T[number] ? null : never
) | (
  "boolean" extends T[number] ? boolean : never
) | (
  "integer" extends T[number] ? number : never
) | (
  "number" extends T[number] ? number : never
) | (
  "string" extends T[number] ? string : never
) | (
  "array" extends T[number] ? any[] : never
) | (
  "object" extends T[number] ? Record<string,any> : never
) 
