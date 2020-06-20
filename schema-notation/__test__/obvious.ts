import { SchemaNotation } from "..";

const true_is_any
: SchemaNotation<true>
= null

, false_is_never
: SchemaNotation<false> extends never ? true : never
= true

, emptySchema_is_any
: SchemaNotation<{}>
= null 

, boolean_is_not_schema
: SchemaNotation<boolean> extends never ? true : never
= true

export {
  false_is_never, true_is_any, emptySchema_is_any, boolean_is_not_schema
}