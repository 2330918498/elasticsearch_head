!function(r,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(r.LosslessJSON={})}(this,function(r){"use strict";function n(r){return r&&void 0!=r.circularRefs&&(P=!0===r.circularRefs),{circularRefs:P}}function e(r){if("string"==typeof r){if(!i(r))throw new Error('Invalid number (value: "'+r+'")');return r}if("number"==typeof r){if(t(r+"").length>15)throw new Error("Invalid number: contains more than 15 digits (value: "+r+")");if(isNaN(r))throw new Error("Invalid number: NaN");if(!isFinite(r))throw new Error("Invalid number: Infinity");return r+""}return e(r&&r.valueOf())}function t(r){return("string"!=typeof r?r+"":r).replace(/^-/,"").replace(/e.*$/,"").replace(/^0\.?0*|\./,"")}function o(r){return/^0*$/.test(r)}function i(r){return/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(r)}function u(r,n){return f({"":r},"",r,n)}function f(r,n,e,t){return Array.isArray(e)?t.call(r,n,c(e,t)):e&&"object"===(void 0===e?"undefined":T(e))&&!e.isLosslessNumber?t.call(r,n,a(e,t)):t.call(r,n,e)}function a(r,n){var e={};for(var t in r)r.hasOwnProperty(t)&&(e[t]=f(r,t,r[t],n));return e}function c(r,n){for(var e=[],t=0;t<r.length;t++)e[t]=f(r,t+"",r[t],n);return e}function l(r){return encodeURIComponent(r.replace(/\//g,"~1").replace(/~/g,"~0"))}function s(r){return decodeURIComponent(r).replace(/~1/g,"/").replace(/~0/g,"~")}function v(r){return"#/"+r.map(l).join("/")}function h(r){var n=r.split("/").map(s);if("#"!==n.shift())throw SyntaxError("Cannot parse JSON Pointer: no valid URI fragment");return""===n[n.length-1]&&n.pop(),n}function d(){V++,W=K.charAt(V)}function p(){for(Z=J.NULL,z="";" "==W||"\t"==W||"\n"==W||"\r"==W;)d();if(D[W])return Z=J.DELIMITER,z=W,void d();if(w(W)||"-"==W){if(Z=J.NUMBER,"-"==W){if(z+=W,d(),!w(W))throw m("Invalid number, digit expected",V)}else"0"==W&&(z+=W,d());for(;w(W);)z+=W,d();if("."==W){if(z+=W,d(),!w(W))throw m("Invalid number, digit expected",V);for(;w(W);)z+=W,d()}if("e"==W||"E"==W){if(z+=W,d(),"+"!=W&&"-"!=W||(z+=W,d()),!w(W))throw m("Invalid number, digit expected",V);for(;w(W);)z+=W,d()}}else if('"'!=W){if(!y(W)){for(Z=J.UNKNOWN;""!=W;)z+=W,d();throw m('Syntax error in part "'+z+'"')}for(Z=J.SYMBOL;y(W);)z+=W,d()}else{for(Z=J.STRING,d();""!=W&&'"'!=W;)if("\\"==W){d();var r=Y[W];if(void 0!==r)z+=r,d();else{if("u"!=W)throw m('Invalid escape character "\\'+W+'"',V);d();for(var n="",e=0;e<4;e++){if(!b(W))throw m("Invalid unicode character");n+=W,d()}z+=String.fromCharCode(parseInt(n,16))}}else z+=W,d();if('"'!=W)throw m("End of string expected");d()}}function y(r){return/^[a-zA-Z_]/.test(r)}function b(r){return/^[0-9a-fA-F]/.test(r)}function w(r){return r>="0"&&r<="9"}function m(r,n){void 0===n&&(n=V-z.length);var e=new SyntaxError(r+" (char "+n+")");return e.char=n,e}function g(){if("{"==z){p();var r=void 0,n={};if("}"==z)return p(),n;var e=H.length;for(H[e]=n;;){if(Z!=J.STRING)throw m("Object key expected");if(r=z,p(),":"!=z)throw m("Colon expected");if(p(),q[e]=r,n[r]=g(),","!=z)break;p()}if("}"!=z)throw m('Comma or end of object "}" expected');return p(),L(n)?O(n):(H.length=e,q.length=e,n)}return N()}function N(){if("["==z){p();var r=[];if("]"==z)return p(),r;var n=H.length;for(H[n]=r;;){if(q[n]=r.length+"",r.push(g()),","!=z)break;p()}if("]"!=z)throw m('Comma or end of array "]" expected');return p(),H.length=n,q.length=n,r}return I()}function I(){if(Z==J.STRING){var r=z;return p(),r}return S()}function S(){if(Z==J.NUMBER){var r=new G(z);return p(),r}return x()}function x(){if(Z==J.SYMBOL){if("true"===z)return p(),!0;if("false"===z)return p(),!1;if("null"===z)return p(),null;throw m('Unknown symbol "'+z+'"')}return E()}function E(){throw m(""==z?"Unexpected end of json string":"Value expected")}function L(r){return"string"==typeof r.$ref&&1===Object.keys(r).length}function O(r){if(!n().circularRefs)return r;for(var e=h(r.$ref),t=0;t<e.length;t++)if(e[t]!==q[t])throw new Error('Invalid circular reference "'+r.$ref+'"');return H[e.length]}function R(r,n,e){rr=[],X=[];var t="function"==typeof n?n.call({"":r},"",r):r,o=void 0;return"number"==typeof e?e>10?o=B(" ",10):e>=1&&(o=B(" ",e)):"string"==typeof e&&""!==e&&(o=e),k(t,n,o,"")}function k(r,n,e,t){if(!0===r||!1===r||r instanceof Boolean)return r+"";if(null===r)return"null";if("number"==typeof r||r instanceof Number)return isNaN(r)||!isFinite(r)?"null":r+"";if(r&&r.isLosslessNumber)return r.value;if("string"==typeof r||r instanceof String){for(var o="",i=0;i<r.length;i++){var u=r[i];o+=Q[u]||u}return'"'+o+'"'}return r instanceof Date?'"'+r.toISOString()+'"':Array.isArray(r)?U(r,n,e,t):r&&"object"===(void 0===r?"undefined":T(r))?C(r,n,e,t):void 0}function U(r,n,e,t){var o=e?t+e:void 0,i=e?"[\n":"[";if(j(r))return A(r,n,e,t);var u=rr.length;rr[u]=r;for(var f=0;f<r.length;f++){var a=f+"",c="function"==typeof n?n.call(r,a,r[f]):r[f];e&&(i+=o),void 0!==c&&"function"!=typeof c?(X[u]=a,i+=k(c,n,e,o)):i+="null",f<r.length-1&&(i+=e?",\n":",")}return rr.length=u,X.length=u,i+=e?"\n"+t+"]":"]"}function C(r,n,e,t){var o=e?t+e:void 0,i=!0,u=e?"{\n":"{";if("function"==typeof r.toJSON)return R(r.toJSON(),n,e);if(j(r))return A(r,n,e,t);var f=rr.length;rr[f]=r;for(var a in r)if(r.hasOwnProperty(a)){var c="function"==typeof n?n.call(r,a,r[a]):r[a];M(a,c,n)&&(i?i=!1:u+=e?",\n":",",u+=e?o+'"'+a+'": ':'"'+a+'":',X[f]=a,u+=k(c,n,e,o))}return rr.length=f,X.length=f,u+=e?"\n"+t+"}":"}"}function j(r){return-1!==rr.indexOf(r)}function A(r,e,t,o){if(!n().circularRefs)throw new Error('Circular reference at "'+v(X)+'"');var i=rr.indexOf(r);return C({$ref:v(X.slice(0,i))},e,t,o)}function M(r,n,e){return void 0!==n&&"function"!=typeof n&&(!Array.isArray(e)||_(e,r))}function _(r,n){for(var e=0;e<r.length;e++)if(r[e]==n)return!0;return!1}function B(r,n){for(var e="";n-- >0;)e+=r;return e}var P=!0,T="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},$=(function(){function r(r){this.value=r}function n(n){function e(o,i){try{var u=n[o](i),f=u.value;f instanceof r?Promise.resolve(f.value).then(function(r){e("next",r)},function(r){e("throw",r)}):t(u.done?"return":"normal",u.value)}catch(r){t("throw",r)}}function t(r,n){switch(r){case"return":o.resolve({value:n,done:!0});break;case"throw":o.reject(n);break;default:o.resolve({value:n,done:!1})}(o=o.next)?e(o.key,o.arg):i=null}var o,i;this._invoke=function(r,n){return new Promise(function(t,u){var f={key:r,arg:n,resolve:t,reject:u,next:null};i?i=i.next=f:(o=i=f,e(r,n))})},"function"!=typeof n.return&&(this.return=void 0)}"function"==typeof Symbol&&Symbol.asyncIterator&&(n.prototype[Symbol.asyncIterator]=function(){return this}),n.prototype.next=function(r){return this._invoke("next",r)},n.prototype.throw=function(r){return this._invoke("throw",r)},n.prototype.return=function(r){return this._invoke("return",r)}}(),function(r,n){if(!(r instanceof n))throw new TypeError("Cannot call a class as a function")}),F=function(){function r(r,n){for(var e=0;e<n.length;e++){var t=n[e];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(r,t.key,t)}}return function(n,e,t){return e&&r(n.prototype,e),t&&r(n,t),n}}(),G=function(){function r(n){$(this,r),this.value=e(n),this.type="LosslessNumber",this.isLosslessNumber=!0}return F(r,[{key:"valueOf",value:function(){var r=parseFloat(this.value),n=t(this.value);if(n.length>15)throw new Error("Cannot convert to number: number would be truncated (value: "+this.value+")");if(!isFinite(r))throw new Error("Cannot convert to number: number would overflow (value: "+this.value+")");if(Math.abs(r)<Number.MIN_VALUE&&!o(n))throw new Error("Cannot convert to number: number would underflow (value: "+this.value+")");return r}},{key:"toString",value:function(){return this.value}}]),r}(),J={NULL:0,DELIMITER:1,NUMBER:2,STRING:3,SYMBOL:4,UNKNOWN:5},D={"":!0,"{":!0,"}":!0,"[":!0,"]":!0,":":!0,",":!0},Y={'"':'"',"\\":"\\","/":"/",b:"\b",f:"\f",n:"\n",r:"\r",t:"\t"},K="",V=0,W="",z="",Z=J.NULL,q=[],H=[],Q={'"':'\\"',"\\":"\\\\","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t"},X=[],rr=[];r.config=n,r.parse=function(r,n){V=0,W=(K=r).charAt(0),z="",Z=J.NULL,H=[],q=[],p();var e=g();if(""!=z)throw m("Unexpected characters");return n?u(e,n):e},r.stringify=R,r.LosslessNumber=G,Object.defineProperty(r,"__esModule",{value:!0})});
//# sourceMappingURL=lossless-json.js.map
