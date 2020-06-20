"use strict";
exports.__esModule = true;
exports.union = void 0;
//@ts-ignore Type '{}' is not assignable to type 'tUnion'
var empty = {};
//no ts-error
var union = {
    a: '',
    b: 0,
    c: false
};
exports.union = union;
union.b;
