(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[4],{75:function(e,t,a){"use strict";function n(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}a.d(t,"a",(function(){return n}))},76:function(e,t,a){"use strict";function n(e){return(n=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function r(e){return(r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){return!t||"object"!==r(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function i(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,r=n(e);if(t){var i=n(this).constructor;a=Reflect.construct(r,arguments,i)}else a=r.apply(this,arguments);return s(this,a)}}a.d(t,"a",(function(){return i}))},77:function(e,t,a){"use strict";function n(e,t){return(n=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function r(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&n(e,t)}a.d(t,"a",(function(){return r}))},78:function(e,t,a){"use strict";var n=a(3),r=a(5),s=a(75),i=a(8),o=a(0),c=a.n(o),l=a(1),d=a.n(l),u=a(11),f=a.n(u),b=a(6),p={children:d.a.node,inline:d.a.bool,tag:b.c,innerRef:d.a.oneOfType([d.a.object,d.a.func,d.a.string]),className:d.a.string,cssModule:d.a.object},h=function(e){function t(t){var a;return(a=e.call(this,t)||this).getRef=a.getRef.bind(Object(s.a)(a)),a.submit=a.submit.bind(Object(s.a)(a)),a}Object(i.a)(t,e);var a=t.prototype;return a.getRef=function(e){this.props.innerRef&&this.props.innerRef(e),this.ref=e},a.submit=function(){this.ref&&this.ref.submit()},a.render=function(){var e=this.props,t=e.className,a=e.cssModule,s=e.inline,i=e.tag,o=e.innerRef,l=Object(r.a)(e,["className","cssModule","inline","tag","innerRef"]),d=Object(b.b)(f()(t,!!s&&"form-inline"),a);return c.a.createElement(i,Object(n.a)({},l,{ref:o,className:d}))},t}(o.Component);h.propTypes=p,h.defaultProps={tag:"form"},t.a=h},79:function(e,t,a){"use strict";var n=a(3),r=a(5),s=a(0),i=a.n(s),o=a(1),c=a.n(o),l=a(11),d=a.n(l),u=a(6),f={children:c.a.node,row:c.a.bool,check:c.a.bool,inline:c.a.bool,disabled:c.a.bool,tag:u.c,className:c.a.string,cssModule:c.a.object},b=function(e){var t=e.className,a=e.cssModule,s=e.row,o=e.disabled,c=e.check,l=e.inline,f=e.tag,b=Object(r.a)(e,["className","cssModule","row","disabled","check","inline","tag"]),p=Object(u.b)(d()(t,!!s&&"row",c?"form-check":"form-group",!(!c||!l)&&"form-check-inline",!(!c||!o)&&"disabled"),a);return"fieldset"===f&&(b.disabled=o),i.a.createElement(f,Object(n.a)({},b,{className:p}))};b.propTypes=f,b.defaultProps={tag:"div"},t.a=b},80:function(e,t,a){"use strict";var n=a(3),r=a(5),s=a(0),i=a.n(s),o=a(1),c=a.n(o),l=a(11),d=a.n(l),u=a(6),f=c.a.oneOfType([c.a.number,c.a.string]),b=c.a.oneOfType([c.a.bool,c.a.string,c.a.number,c.a.shape({size:f,order:f,offset:f})]),p={children:c.a.node,hidden:c.a.bool,check:c.a.bool,size:c.a.string,for:c.a.string,tag:u.c,className:c.a.string,cssModule:c.a.object,xs:b,sm:b,md:b,lg:b,xl:b,widths:c.a.array},h={tag:"label",widths:["xs","sm","md","lg","xl"]},m=function(e,t,a){return!0===a||""===a?e?"col":"col-"+t:"auto"===a?e?"col-auto":"col-"+t+"-auto":e?"col-"+a:"col-"+t+"-"+a},j=function(e){var t=e.className,a=e.cssModule,s=e.hidden,o=e.widths,c=e.tag,l=e.check,f=e.size,b=e.for,p=Object(r.a)(e,["className","cssModule","hidden","widths","tag","check","size","for"]),h=[];o.forEach((function(t,n){var r=e[t];if(delete p[t],r||""===r){var s,i=!n;if(Object(u.a)(r)){var o,c=i?"-":"-"+t+"-";s=m(i,t,r.size),h.push(Object(u.b)(d()(((o={})[s]=r.size||""===r.size,o["order"+c+r.order]=r.order||0===r.order,o["offset"+c+r.offset]=r.offset||0===r.offset,o))),a)}else s=m(i,t,r),h.push(s)}}));var j=Object(u.b)(d()(t,!!s&&"sr-only",!!l&&"form-check-label",!!f&&"col-form-label-"+f,h,!!h.length&&"col-form-label"),a);return i.a.createElement(c,Object(n.a)({htmlFor:b},p,{className:j}))};j.propTypes=p,j.defaultProps=h,t.a=j},81:function(e,t,a){"use strict";var n=a(3),r=a(5),s=a(75),i=a(8),o=a(0),c=a.n(o),l=a(1),d=a.n(l),u=a(11),f=a.n(u),b=a(6),p={children:d.a.node,type:d.a.string,size:d.a.oneOfType([d.a.number,d.a.string]),bsSize:d.a.string,valid:d.a.bool,invalid:d.a.bool,tag:b.c,innerRef:d.a.oneOfType([d.a.object,d.a.func,d.a.string]),plaintext:d.a.bool,addon:d.a.bool,className:d.a.string,cssModule:d.a.object},h=function(e){function t(t){var a;return(a=e.call(this,t)||this).getRef=a.getRef.bind(Object(s.a)(a)),a.focus=a.focus.bind(Object(s.a)(a)),a}Object(i.a)(t,e);var a=t.prototype;return a.getRef=function(e){this.props.innerRef&&this.props.innerRef(e),this.ref=e},a.focus=function(){this.ref&&this.ref.focus()},a.render=function(){var e=this.props,t=e.className,a=e.cssModule,s=e.type,i=e.bsSize,o=e.valid,l=e.invalid,d=e.tag,u=e.addon,p=e.plaintext,h=e.innerRef,m=Object(r.a)(e,["className","cssModule","type","bsSize","valid","invalid","tag","addon","plaintext","innerRef"]),j=["radio","checkbox"].indexOf(s)>-1,v=new RegExp("\\D","g"),g=d||("select"===s||"textarea"===s?s:"input"),O="form-control";p?(O+="-plaintext",g=d||"input"):"file"===s?O+="-file":"range"===s?O+="-range":j&&(O=u?null:"form-check-input"),m.size&&v.test(m.size)&&(Object(b.d)('Please use the prop "bsSize" instead of the "size" to bootstrap\'s input sizing.'),i=m.size,delete m.size);var x=Object(b.b)(f()(t,l&&"is-invalid",o&&"is-valid",!!i&&"form-control-"+i,O),a);return("input"===g||d&&"function"===typeof d)&&(m.type=s),m.children&&!p&&"select"!==s&&"string"===typeof g&&"select"!==g&&(Object(b.d)('Input with a type of "'+s+'" cannot have children. Please use "value"/"defaultValue" instead.'),delete m.children),c.a.createElement(g,Object(n.a)({},m,{ref:h,className:x,"aria-invalid":l}))},t}(c.a.Component);h.propTypes=p,h.defaultProps={type:"text"},t.a=h},82:function(e,t,a){"use strict";var n=a(3),r=a(5),s=a(75),i=a(8),o=a(0),c=a.n(o),l=a(1),d=a.n(l),u=a(11),f=a.n(u),b=a(6),p={active:d.a.bool,"aria-label":d.a.string,block:d.a.bool,color:d.a.string,disabled:d.a.bool,outline:d.a.bool,tag:b.c,innerRef:d.a.oneOfType([d.a.object,d.a.func,d.a.string]),onClick:d.a.func,size:d.a.string,children:d.a.node,className:d.a.string,cssModule:d.a.object,close:d.a.bool},h=function(e){function t(t){var a;return(a=e.call(this,t)||this).onClick=a.onClick.bind(Object(s.a)(a)),a}Object(i.a)(t,e);var a=t.prototype;return a.onClick=function(e){if(!this.props.disabled)return this.props.onClick?this.props.onClick(e):void 0;e.preventDefault()},a.render=function(){var e=this.props,t=e.active,a=e["aria-label"],s=e.block,i=e.className,o=e.close,l=e.cssModule,d=e.color,u=e.outline,p=e.size,h=e.tag,m=e.innerRef,j=Object(r.a)(e,["active","aria-label","block","className","close","cssModule","color","outline","size","tag","innerRef"]);o&&"undefined"===typeof j.children&&(j.children=c.a.createElement("span",{"aria-hidden":!0},"\xd7"));var v="btn"+(u?"-outline":"")+"-"+d,g=Object(b.b)(f()(i,{close:o},o||"btn",o||v,!!p&&"btn-"+p,!!s&&"btn-block",{active:t,disabled:this.props.disabled}),l);j.href&&"button"===h&&(h="a");var O=o?"Close":null;return c.a.createElement(h,Object(n.a)({type:"button"===h&&j.onClick?"button":void 0},j,{className:g,ref:m,onClick:this.onClick,"aria-label":a||O}))},t}(c.a.Component);h.propTypes=p,h.defaultProps={color:"secondary",tag:"button"},t.a=h},86:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return q}));var n=a(2),r=a(17),s=a.n(r),i=a(25),o=a(20),c=a(12),l=a(22),d=a(23),u=a(77),f=a(76),b=a(0),p=a.n(b),h=a(21),m=a(78),j=a(79),v=a(80),g=a(81),O=a(3),x=a(5),y=a(1),w=a.n(y),k=a(11),N=a.n(k),R=a(6),z={children:w.a.node,tag:R.c,className:w.a.string,cssModule:w.a.object,valid:w.a.bool,tooltip:w.a.bool},C={tag:"div",valid:void 0},S=function(e){var t=e.className,a=e.cssModule,n=e.valid,r=e.tooltip,s=e.tag,i=Object(x.a)(e,["className","cssModule","valid","tooltip","tag"]),o=r?"tooltip":"feedback",c=Object(R.b)(N()(t,n?"valid-"+o:"invalid-"+o),a);return p.a.createElement(s,Object(O.a)({},i,{className:c}))};S.propTypes=z,S.defaultProps=C;var P=S,M=a(82),E=a(26),T=a.n(E),q=function(e){Object(u.a)(a,e);var t=Object(f.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).handleChange=function(e,t){n.setState((function(a){return Object(o.a)({},e,Object(c.a)(Object(c.a)({},a[e]),{},{text:t.target.value}))}),(function(){this.valid(e)}))},n.valid=function(){var e=Object(i.a)(s.a.mark((function e(t){var a,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=n.state[t].text,e.t0=t,e.next="email"===e.t0?4:"name"===e.t0?20:"password"===e.t0?22:"confirm"===e.t0?24:26;break;case 4:if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(a).toLowerCase())){e.next=18;break}return e.prev=6,e.next=9,T.a.get("http://localhost:5000"+"/teachers/exists/".concat(a));case 9:r=e.sent,n.setState((function(e){return Object(o.a)({},t,Object(c.a)(Object(c.a)({},e[t]),{},{valid:!r.data,msg:r.data?"Email already exist":""}))})),e.next=16;break;case 13:e.prev=13,e.t1=e.catch(6),console.error(e.t1);case 16:e.next=19;break;case 18:n.setState((function(e){return Object(o.a)({},t,Object(c.a)(Object(c.a)({},e[t]),{},{valid:!1,msg:"Please enter a valid email"}))}));case 19:return e.abrupt("break",27);case 20:return n.setState((function(e){return Object(o.a)({},t,Object(c.a)(Object(c.a)({},e[t]),{},{valid:a.length>=1}))})),e.abrupt("break",27);case 22:return n.setState((function(e){return Object(o.a)({},t,Object(c.a)(Object(c.a)({},e[t]),{},{valid:a.length>=8,msg:a.length>=8?"* Required":"Password must have at least 8 characters"}))})),e.abrupt("break",27);case 24:return n.setState((function(e){return Object(o.a)({},t,Object(c.a)(Object(c.a)({},e[t]),{},{valid:a===e.password.text&&a.length>0,msg:a===e.password.text&&a.length>0?"* Required":"Password must match"}))})),e.abrupt("break",27);case 26:return e.abrupt("break",27);case 27:case"end":return e.stop()}}),e,null,[[6,13]])})));return function(t){return e.apply(this,arguments)}}(),n.handleSignUp=function(){var e=Object(i.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),e.prev=1,!(n.state.email.valid&&n.state.name.valid&&n.state.password.valid&&n.state.confirm.valid)){e.next=6;break}return e.next=5,T.a.post("http://localhost:5000/teachers/signup",{email:n.state.email.text,password:n.state.password.text,name:n.state.name.text});case 5:h.a.login(n.state.email.text,n.state.password.text,(function(){n.props.history.push("/home")}));case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),console.error(e.t0);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}(),n.state={email:{text:"",valid:!1,msg:"* Required"},name:{text:"",valid:!1,msg:"* Required"},password:{text:"",valid:!1,msg:"* Required"},confirm:{text:"",valid:!1,msg:"* Required"}},n}return Object(d.a)(a,[{key:"render",value:function(){return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsxs)(m.a,{children:[Object(n.jsxs)(j.a,{className:"mt-5",row:!0,children:[Object(n.jsx)(v.a,{for:"emailId",hidden:!0,children:"Email"}),Object(n.jsx)(g.a,{type:"email",name:"email",id:"emailId",placeholder:"Email",className:"rounded-0",bsSize:"lg",value:this.state.email.text,onChange:this.handleChange.bind(this,"email"),invalid:!this.state.email.valid,required:!0}),Object(n.jsx)(P,{invalid:!0,children:this.state.email.msg})]}),Object(n.jsxs)(j.a,{className:"mb-5",row:!0,children:[Object(n.jsx)(v.a,{for:"nameId",hidden:!0,children:"Name"}),Object(n.jsx)(g.a,{type:"text",name:"name",id:"nameId",placeholder:"Name",className:"rounded-0",bsSize:"lg",value:this.state.name.text,onChange:this.handleChange.bind(this,"name"),invalid:!this.state.name.valid,required:!0}),Object(n.jsx)(P,{invalid:!0,children:this.state.name.msg})]}),Object(n.jsxs)(j.a,{row:!0,children:[Object(n.jsx)(v.a,{for:"passwordId",hidden:!0,children:"Password"}),Object(n.jsx)(g.a,{type:"password",name:"password",id:"passwordId",className:"rounded-0",placeholder:"Password",bsSize:"lg",value:this.state.password.text,onChange:this.handleChange.bind(this,"password"),invalid:!this.state.password.valid,required:!0}),Object(n.jsx)(P,{invalid:!0,children:this.state.password.msg})]}),Object(n.jsxs)(j.a,{row:!0,children:[Object(n.jsx)(v.a,{for:"confirmId",hidden:!0,children:"Confirm Password"}),Object(n.jsx)(g.a,{type:"password",name:"confirm",id:"confirmId",className:"rounded-0",placeholder:"Confirm Password",bsSize:"lg",value:this.state.confirm.text,onChange:this.handleChange.bind(this,"confirm"),invalid:!this.state.confirm.valid,required:!0}),Object(n.jsx)(P,{invalid:!0,children:this.state.confirm.msg})]}),Object(n.jsx)(j.a,{className:"mt-5",row:!0,children:Object(n.jsx)(M.a,{className:"theme-color rounded-0 border-0 shadow",onClick:this.handleSignUp,size:"lg",block:!0,children:"Sign Up"})})]}),Object(n.jsxs)("h5",{className:"text-center",children:["Already have an Account?",Object(n.jsx)("a",{href:"/",className:"text-dark",children:" Login"})]})]})}}]),a}(p.a.Component)}}]);
//# sourceMappingURL=4.97c93de6.chunk.js.map