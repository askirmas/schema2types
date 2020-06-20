import { TypesSchema } from "./type_array"
import { vStr1 } from "./__test__/_values"

const typevalue_empty = [] as const
, typevalue_number = ["number"] as const
, typevalue_string = ["string"] as const 
, typevalue_number_string = ["number", "string"] as const
, typevalue_string_number = ["string", "number"] as const
, typevalue_array = ["string", "number"]

const str_has_type
: typeof vStr1 extends TypesSchema<typeof typevalue_empty> ? true : false
= false

, str_is_not_number 
: typeof vStr1 extends TypesSchema<typeof typevalue_number> ? true : false
= false

, str_is_string 
: typeof vStr1 extends TypesSchema<typeof typevalue_string> ? true : false
= true

, str_in_string_number 
: typeof vStr1 extends TypesSchema<typeof typevalue_string_number> ? true : false
= true

, str_in_number_string 
: typeof vStr1 extends TypesSchema<typeof typevalue_number_string> ? true : false
= true

, str_of_unknown 
: typeof vStr1 extends TypesSchema<typeof typevalue_array> ? true : false
= true

export {
  str_has_type, str_in_number_string, str_in_string_number, str_is_not_number, str_is_string, str_of_unknown
}