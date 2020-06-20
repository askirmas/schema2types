import { ConstSchema } from ".."
import { vStr, vStr1, obj_abc, obj_abstring } from "./_values"

const const_null = {
  "const": null
}
, const_str_noVals = {
  "const": "str"
}
, const_str_asConst = {
  "const": "str"
} as const

, const_emptyObj = {
  "const": {}
}
, const_obj_noVals = {
  "const": {"a": {"b": "c"}}
}
, const_obj_asConst = {
  "const": {"a": {"b": "c"}}
} as const

type t_str_noVals = typeof const_str_noVals
type t_emptyObj = typeof const_emptyObj
type t_null = typeof const_null
type t_str_asConst = typeof const_str_asConst
type t_obj_noVals = typeof const_obj_noVals
type t_obj_asConst = typeof const_obj_asConst

// Checks

const null_is_null
: null extends ConstSchema<t_null> ? true : never
= true

// Strings

, str1_is_not_str
: typeof vStr1 extends ConstSchema<t_str_asConst> ? never : false
= false

, str_as_str1
: typeof vStr extends ConstSchema<t_str_noVals> ? true : never
= true
, str1_is_str1
: typeof vStr1 extends ConstSchema<t_str_noVals> ? true : never
= true
, str_is_str
: typeof vStr extends ConstSchema<t_str_asConst> ? true : never
= true

// Objects 

, emptyObject_is_empty
: typeof emptyObject extends ConstSchema<t_emptyObj> ? true : never
= true

, obj2_like_empty
: typeof obj_abstring extends ConstSchema<t_emptyObj> ? true : never
= true

, obj1_like_strict
: typeof obj_abc extends ConstSchema<t_obj_asConst> ? true : never
= true

, obj2_not_like_strict
: typeof obj_abstring extends ConstSchema<t_obj_asConst> ? never : false
= false

, empty_not_like_obj
: typeof emptyObject extends ConstSchema<t_obj_noVals> ? never : false
= false

// Mixes

, null_is_not_emptyObject
: null extends ConstSchema<t_emptyObj> ? never : false
= false
, emptyObject_is_not_null
: typeof emptyObject extends ConstSchema<t_null> ? never : false
= false


export {  
  null_is_null,
  str1_is_not_str, str1_is_str1, str_as_str1, str_is_str,
  obj1_like_strict, emptyObject_is_empty, empty_not_like_obj, obj2_like_empty, obj2_not_like_strict,
  null_is_not_emptyObject, emptyObject_is_not_null,
}