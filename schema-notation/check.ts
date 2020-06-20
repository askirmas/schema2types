import { SchemaNotation } from "."

const sch_t_s = {
  "type": "string"
} as const
, sch_c_1 = {
  "const": "1"
} as const
, sch_p = {
  "properties": {
    "a": {
      "type": "number"
    },
    "b": {
      "type": "string"
    }
  }
} as const


const v1_true: SchemaNotation<typeof sch_t_s> = "1"
, v1_false: SchemaNotation<typeof sch_t_s> = 1
, v2_true: SchemaNotation<typeof sch_c_1> = "1"
, v2_false: SchemaNotation<typeof sch_c_1> = 1
, v3_true: SchemaNotation<typeof sch_p> = {
  "a": 1,
  "b": "1"
}
, v3_false: SchemaNotation<typeof sch_p> = {
  "a": "1",
  "b": 1
}

const v: SchemaNotation<typeof sch_p>["a"] = 1

export {
  v1_false, v1_true,
  v2_false, v2_true,
  v3_false, v3_true
}
