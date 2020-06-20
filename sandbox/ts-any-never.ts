type p1 = {p: any} & {p?: number}

const empty: p1 = {}
, v1: p1 = {p: 1}
, v2: p1 = {p: "1"}

, b1_true: boolean | never = false
, b1_false: boolean | never = "false"

, b1_true: boolean & any = false
// no error
, b2_false: boolean & any = "false"

, b3: boolean & Object = false
, b3_false_1: boolean & Object = {}
, b3_false_2: boolean & Object = []
, b3_false_3: boolean & Object = undefined
, b3_false_4: boolean & Object = null
, b3_false_5: boolean & Object = 0
, b3_false_6: boolean & Object = ""

, vnull: null & Object = null
, vundefined: undefined & Object = undefined

, vnumber_false_0: number & Object = false
, vnumber_false_1: number & Object = {}
, vnumber_false_2: number & Object = []
, vnumber_false_3: number & Object = undefined
, vnumber_false_4: number & Object = null
, vnumber: number & Object = 0
, vnumber_false_6: number & Object = ""

, varray_false_0: Array<any> & Object = false
, varray_false_1: Array<any> & Object = {}
, varray: Array<any> & Object = []
, varray_false_3: Array<any> & Object = undefined
, varray_false_4: Array<any> & Object = null
, varray_false_5: Array<any> & Object = 0
, varray_false_6: Array<any> & Object = ""



