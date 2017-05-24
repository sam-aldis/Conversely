webpackJsonp([0],{

/***/ 101:
/***/ (function(module, exports, __webpack_require__) {

window.$ = window.jQuery = __webpack_require__(15);
$( document ).ready(function() {
$(".sidebar-button").sideNav();
});

/***/ }),

/***/ 103:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(110);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(64)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./index.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./index.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 105:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ReactDOM = __webpack_require__(32);
var React = __webpack_require__(1);
var react_materialize_1 = __webpack_require__(61);
var react_facebook_login_1 = __webpack_require__(200);
var api_1 = __webpack_require__(99);
var $ = __webpack_require__(15);
var Application = (function (_super) {
    __extends(Application, _super);
    function Application() {
        _super.call(this);
        this.state = {
            loggedIn: false,
            fbLogin: false,
            name: null,
            error: null,
            loading: false,
            pages: [],
        };
    }
    Application.prototype.facebookResponse = function (res) {
        var _this = this;
        if (res.name != undefined && res.name != "") {
            this.context.setState({ name: res.name, loggedIn: true, fbLogin: true, loading: true });
            var email = "none@none.com";
            if (res.email) {
                email = res.email;
            }
            var userDetails = "{\"name\" : \"" + res.name + "\",\"profile_image\" : \"" + res.picture.data.url + "\",\"id\" :\"" + res.id + "\",\"email\" : \"" + email + "\"}";
            var loginData = {
                type: api_1.LOGINTYPES.SET,
                action: "accessToken",
                accessToken: res.accessToken,
                details: userDetails
            };
            var lh = new api_1.LoginHandler(loginData);
            lh.update().catch(function () {
            });
            var pages = new api_1.Pages(res.accessToken, res.userID);
            var user_pages = pages.usersPages;
            user_pages.then(function (rdata) {
                var pageNames = new Array();
                rdata.data.forEach(function (element) {
                    var card = pages.getPageImage(element.id);
                    card.then(function (pdata) {
                        var link = "#" + element.id;
                        pageNames.push(React.createElement(react_materialize_1.Chip, null, React.createElement("img", {src: pdata.picture.data.url}), React.createElement("a", {href: link}, element.name)));
                        _this.context.setState({ loading: false, pages: pageNames });
                    });
                });
            });
        }
    };
    Application.prototype.render = function () {
        if (this.state.name != null) {
            var welcomeMessage = "Welcome " + this.state.name.split(" ")[0];
        }
        return React.createElement("div", null, React.createElement(react_materialize_1.Navbar, {brand: React.createElement("span", null, React.createElement(react_materialize_1.Icon, {className: "headerText"}, "record_voice_over"), "Conversely"), right: true}, React.createElement(react_materialize_1.NavItem, {href: "/about"}, "About"), (this.state.loggedIn) ? React.createElement(react_materialize_1.NavItem, {href: "/app"}, "Console") : ""), React.createElement(react_materialize_1.Row, {className: "preLoginContent"}, React.createElement(react_materialize_1.Row, null, React.createElement(react_materialize_1.Col, {s: 12, className: "signupBox"}, React.createElement(react_materialize_1.Col, {s: 12, m: 6, offset: "m3"}, React.createElement(react_materialize_1.Breadcrumb, null, React.createElement(react_materialize_1.MenuItem, null, "Login"), React.createElement(react_materialize_1.MenuItem, null, (this.state.fbLogin) ? "Select Page" : "")), (this.state.fbLogin) ? React.createElement(react_materialize_1.Card, {title: welcomeMessage, actions: (this.state.loading) ? React.createElement(react_materialize_1.ProgressBar, null) : this.state.pages}, "Please Choose the page you want to use for", React.createElement("br", null), "your bot from the list below") : React.createElement(react_materialize_1.Card, {title: "Get Started", actions: [React.createElement(react_facebook_login_1.default, {appId: "1692607624102615", autoLoad: true, fields: "name,email,picture", scope: "pages_show_list,public_profile,manage_pages,publish_pages,pages_messaging,pages_messaging_subscriptions", callback: this.facebookResponse, context: this, cssClass: "btn waves-effect waves-light btnFacebook", icon: "fa-facebook"})]}, "Create your first bot in 2 minutes.", React.createElement("br", null), "No credit card details required."))))), React.createElement(react_materialize_1.Row, {className: "preLoginTopArea"}, React.createElement(react_materialize_1.Col, {s: 12, m: 4}, React.createElement(react_materialize_1.Card, {actions: [React.createElement(react_materialize_1.Modal, {header: 'Modal Header', fixedFooter: true, trigger: React.createElement("a", {href: '#'}, "Learn More")}, React.createElement(LearnMore, null))]}, React.createElement(react_materialize_1.Icon, null, "speaker_notes_off"), React.createElement("br", null), "There are currently 34,000+ Facebook bots using the platform however most of these provide a very poor user experience and are unable to understand even the most basic of user messages")), React.createElement(react_materialize_1.Col, {s: 12, m: 4}, React.createElement(react_materialize_1.Card, {actions: [React.createElement(react_materialize_1.Modal, {header: 'Modal Header', fixedFooter: true, trigger: React.createElement("a", {href: '#'}, "Learn More")}, React.createElement(LearnMore, null))]}, React.createElement(react_materialize_1.Icon, null, "filter_drama"), React.createElement("br", null), "We have created a Platform from which you can release intelligent and self learning bots." + ' ' + "This means your bot will get smarter the more it is used, more able to interact with your" + ' ' + "clients and provide a more human experience.")), React.createElement(react_materialize_1.Col, {s: 12, m: 4}, React.createElement(react_materialize_1.Card, {actions: [React.createElement(react_materialize_1.Modal, {header: 'Modal Header', fixedFooter: true, trigger: React.createElement("a", {href: '#'}, "Learn More")}, React.createElement(LearnMore, null))]}, React.createElement(react_materialize_1.Icon, null, "school"), React.createElement("br", null), "You set your goals, targets and other important information about your business and the bot will attempt to understand" + ' ' + "what your users are asking of it. If it can't understand it will pass it on to you and learn from the response you give."))), React.createElement(react_materialize_1.Row, {className: "extraInfo"}, React.createElement(react_materialize_1.Col, {s: 12, m: 12}, React.createElement(react_materialize_1.Row, null, React.createElement(react_materialize_1.Col, {s: 0, m: 1}), React.createElement(react_materialize_1.Col, {s: 12, m: 10}, React.createElement("br", null), React.createElement(react_materialize_1.Icon, null, "track_changes"), React.createElement("br", null), "We provide an easy to use CRM software for our bots," + ' ' + "It will track all of your page users and how they are interacting with your business" + ' ' + "and allows you to connect to many different services to re-sell to your previous customers" + ' ' + "and turn prospects into clients.")), React.createElement(react_materialize_1.Row, null, React.createElement("hr", null), React.createElement(react_materialize_1.Col, {s: 0, m: 1}), React.createElement(react_materialize_1.Col, {s: 12, m: 10}, React.createElement("br", null), React.createElement(react_materialize_1.Icon, null, "money_off"), React.createElement("br", null), "Spend less money on advertising and staff, target Facebook adverts directly" + ' ' + "to the messenger platform and let the bot handle all of the work for your business." + ' ' + "From booking clients into appointments and seminars to making purchases, you can configure" + ' ' + "your bot to do what ever helps you the most and save money at the same time!")), React.createElement(react_materialize_1.Row, null, React.createElement("hr", null), React.createElement(react_materialize_1.Col, {s: 0, m: 1}), React.createElement(react_materialize_1.Col, {s: 12, m: 10}, React.createElement("br", null), React.createElement(react_materialize_1.Icon, null, "extension"), React.createElement("br", null), "Highly extensible, intergrations with key services and if we haven't" + ' ' + "got what you want or need yet feel free to ask us and we'll do the best we" + ' ' + "can to get it created and running for you.")))), React.createElement(react_materialize_1.Row, null, React.createElement(react_materialize_1.Col, {s: 12, m: 6, offset: "m3"}, React.createElement(react_materialize_1.Card, {actions: [React.createElement(react_materialize_1.Modal, {header: 'Modal Header', fixedFooter: true, trigger: React.createElement("a", {href: '#'}, "Learn More")}, React.createElement(LearnMore, null))]}, "Harness the power of Facebook now with an ROI of over 300%," + ' ' + "the ability to target the audience who really matters to you and" + ' ' + "in the location you choose and leave the bot to handle the enquries and bookings." + ' ' + "Free up the ability to focus your energy where it really matters, your business.", React.createElement("br", null), "Try risk free today!", React.createElement("br", null), React.createElement("br", null)))), React.createElement(react_materialize_1.Footer, {copyrights: React.createElement("span", null, React.createElement(react_materialize_1.Icon, null, "copyright"), " 2017 ", React.createElement("a", {href: 'www.ukjp-design.com'}, "ukjp-design")), links: React.createElement("ul", null, React.createElement("li", null, React.createElement("a", {className: "grey-text text-lighten-3", href: "#!"}, "FAQ's")), React.createElement("li", null, React.createElement(react_materialize_1.Modal, {header: 'Contact Us', fixedFooter: true, trigger: React.createElement("a", {className: "grey-text text-lighten-3", href: "#!"}, "Contact Us")}, "Contacting us:")))}, React.createElement("h5", {style: { color: "white" }}, "Created with ", React.createElement("span", {style: { color: "red" }}, React.createElement(react_materialize_1.Icon, null, "favorite"))), React.createElement("span", {style: { color: "white" }}, "If your interested in working with us or connecting your services", React.createElement("br", null), "with ours please use the contact us section to get in touch")));
    };
    return Application;
}(React.Component));
var LearnMore = (function (_super) {
    __extends(LearnMore, _super);
    function LearnMore() {
        _super.call(this);
    }
    LearnMore.prototype.render = function () {
        return React.createElement("div", null, "More info about conversely");
    };
    return LearnMore;
}(React.Component));
$(function () {
    window.addEventListener("load", function () {
        document.location.hash = " ";
    });
    window.addEventListener("hashchange", function () {
        var hash = document.location.hash;
        hash = hash.replace("#", "");
        var loginData = {
            type: api_1.LOGINTYPES.SET,
            action: "pageid",
            pageid: hash
        };
        var lh = new api_1.LoginHandler(loginData);
        var page_select = lh.update();
        page_select.then(function () {
            document.location.href = "/app";
        }).catch(function () {
        });
    });
    ReactDOM.render(React.createElement(Application, null), $("#react_context")[0]);
});


/***/ }),

/***/ 110:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(42)(undefined);
// imports


// module
exports.push([module.i, "html {\n  height: 100%; }\n  html body {\n    margin: 0;\n    background-color: #ECECEC; }\n    html body #react_context {\n      height: 100%; }\n\n.menu-bottom {\n  position: absolute;\n  width: 100%;\n  bottom: 0px; }\n\n.menu-button {\n  padding: 10px; }\n\n.main {\n  padding: 10px; }\n\n@media (min-width: 993px) {\n  .headerText {\n    padding-left: 10px; }\n  header, main, .footer, .main {\n    margin-left: 300px; }\n  .menu-button {\n    display: none !important; } }\n\n.sidebar {\n  background-color: #FCFCFC; }\n\n.preLoginContent {\n  padding-top: 20px; }\n\n.preLoginTopArea {\n  padding-top: 100px;\n  text-align: center; }\n  .preLoginTopArea i {\n    font-size: 100px; }\n\n.extraInfo {\n  text-align: center;\n  font-size: 20px;\n  background-color: #3b5998;\n  color: white;\n  min-height: 200px;\n  padding: 20px; }\n  .extraInfo i {\n    font-size: 200px; }\n\n.signupBox {\n  text-align: center; }\n\n.btnFacebook {\n  background-color: #3b5998 !important; }\n", ""]);

// exports


/***/ }),

/***/ 200:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t(__webpack_require__(1)):"function"==typeof define&&define.amd?define(["react"],t):"object"==typeof exports?exports.FacebookLogin=t(require("react")):e.FacebookLogin=t(e.react)}(this,function(e){return function(e){function t(n){if(o[n])return o[n].exports;var i=o[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var o={};return t.m=e,t.c=o,t.p="",t(0)}([function(e,t,o){e.exports=o(2)},function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},c=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),l=o(6),p=n(l),u=o(4),f=n(u),d=o(3),y=n(d),b=function(){var e=!1;try{e=window.navigator&&window.navigator.standalone||navigator.userAgent.match("CriOS")||navigator.userAgent.match(/mobile/i)}catch(t){}return e},h=function(e){function t(){var e,o,n,s;i(this,t);for(var c=arguments.length,l=Array(c),p=0;p<c;p++)l[p]=arguments[p];return o=n=r(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),n.state={isSdkLoaded:!1,isProcessing:!1},n.responseApi=function(e){window.FB.api("/me",{fields:n.props.fields},function(t){a(t,e),n.props.callback(t)})},n.checkLoginState=function(e){n.setStateIfMounted({isProcessing:!1}),e.authResponse?n.responseApi(e.authResponse):n.props.callback&&n.props.callback({status:e.status})},n.checkLoginAfterRefresh=function(e){"connected"===e.status?n.checkLoginState(e):window.FB.login(function(e){return n.checkLoginState(e)},!0)},n.click=function(){if(n.state.isSdkLoaded&&!n.state.isProcessing&&!n.props.isDisabled){n.setState({isProcessing:!0});var e=n.props,t=e.scope,o=e.appId,i=e.onClick,r=e.reAuthenticate,s=e.redirectUri,a=e.disableMobileRedirect;"function"==typeof i&&i();var c={client_id:o,redirect_uri:s,state:"facebookdirect",scope:t};r&&(c.auth_type="reauthenticate"),n.props.isMobile&&!a?window.location.href="//www.facebook.com/dialog/oauth?"+(0,y["default"])(c):window.FB.login(n.checkLoginState,{scope:t,auth_type:c.auth_type})}},s=o,r(n,s)}return s(t,e),c(t,[{key:"componentDidMount",value:function(){if(document.getElementById("facebook-jssdk"))return void this.sdkLoaded();this.setFbAsyncInit(),this.loadSdkAsynchronously();var e=document.getElementById("fb-root");e||(e=document.createElement("div"),e.id="fb-root",document.body.appendChild(e)),this._isMounted=!0}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"setStateIfMounted",value:function(e){this._isMounted&&this.setState(e)}},{key:"setFbAsyncInit",value:function(){var e=this,t=this.props,o=t.appId,n=t.xfbml,i=t.cookie,r=t.version,s=t.autoLoad;window.fbAsyncInit=function(){window.FB.init({version:"v"+r,appId:o,xfbml:n,cookie:i}),e.setStateIfMounted({isSdkLoaded:!0}),(s||window.location.search.includes("facebookdirect"))&&window.FB.getLoginStatus(e.checkLoginAfterRefresh)}}},{key:"sdkLoaded",value:function(){this.setState({isSdkLoaded:!0})}},{key:"loadSdkAsynchronously",value:function(){var e=this.props.language;!function(t,o,n){var i=t.getElementsByTagName(o)[0],r=i,s=i;t.getElementById(n)||(s=t.createElement(o),s.id=n,s.src="//connect.facebook.net/"+e+"/all.js",r.parentNode.insertBefore(s,r))}(document,"script","facebook-jssdk")}},{key:"style",value:function(){var e=this.constructor.defaultProps.cssClass;return this.props.cssClass===e&&p["default"].createElement("style",{dangerouslySetInnerHTML:{__html:f["default"]}})}},{key:"containerStyle",value:function(){var e={transition:"opacity 0.5s"};return(this.state.isProcessing||!this.state.isSdkLoaded||this.props.isDisabled)&&(e.opacity=.6),a(e,this.props.containerStyle)}},{key:"render",value:function(){var e=this.props,t=e.cssClass,o=e.size,n=e.icon,i=e.textButton,r=e.typeButton,s=e.buttonStyle,a="string"==typeof n;return p["default"].createElement("span",{style:this.containerStyle()},a&&p["default"].createElement("link",{rel:"stylesheet",href:"//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"}),p["default"].createElement(this.props.tag,{type:r,className:t+" "+o,style:s,onClick:this.click},n&&a&&p["default"].createElement("i",{className:"fa "+n}),n&&!a&&n,i),this.style())}}]),t}(p["default"].Component);h.propTypes={isDisabled:l.PropTypes.bool,callback:l.PropTypes.func.isRequired,appId:l.PropTypes.string.isRequired,xfbml:l.PropTypes.bool,cookie:l.PropTypes.bool,reAuthenticate:l.PropTypes.bool,scope:l.PropTypes.string,redirectUri:l.PropTypes.string,textButton:l.PropTypes.string,typeButton:l.PropTypes.string,autoLoad:l.PropTypes.bool,disableMobileRedirect:l.PropTypes.bool,isMobile:l.PropTypes.bool,size:l.PropTypes.string,fields:l.PropTypes.string,cssClass:l.PropTypes.string,version:l.PropTypes.string,icon:l.PropTypes.any,language:l.PropTypes.string,onClick:l.PropTypes.func,containerStyle:l.PropTypes.object,buttonStyle:l.PropTypes.object,tag:l.PropTypes.oneOfType([l.PropTypes.node,l.PropTypes.func])},h.defaultProps={textButton:"Login with Facebook",typeButton:"button",redirectUri:"undefined"!=typeof window?window.location.href:"/",scope:"public_profile,email",xfbml:!1,cookie:!1,reAuthenticate:!1,size:"metro",fields:"name",cssClass:"kep-login-facebook",version:"2.3",language:"en_US",disableMobileRedirect:!1,isMobile:b(),tag:"button"},t["default"]=h},function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=void 0;var i=o(1),r=n(i);t["default"]=r["default"]},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=function(e){var t="";for(var o in e)""!==t&&(t+="&"),t+=o+"="+encodeURIComponent(e[o]);return t}},function(e,t,o){t=e.exports=o(5)(),t.push([e.id,".kep-login-facebook{font-family:Helvetica,sans-serif;font-weight:700;-webkit-font-smoothing:antialiased;color:#fff;cursor:pointer;display:inline-block;font-size:calc(.27548vw + 12.71074px);text-decoration:none;text-transform:uppercase;transition:background-color .3s,border-color .3s;background-color:#4c69ba;border:calc(.06887vw + .67769px) solid #4c69ba;padding:calc(.34435vw + 13.38843px) calc(.34435vw + 18.38843px)}.kep-login-facebook.small{padding:calc(.34435vw + 3.38843px) calc(.34435vw + 8.38843px)}.kep-login-facebook.medium{padding:calc(.34435vw + 8.38843px) calc(.34435vw + 13.38843px)}.kep-login-facebook.metro{border-radius:0}.kep-login-facebook .fa{margin-right:calc(.34435vw + 3.38843px)}",""]),t.locals={"kep-login-facebook":"kep-login-facebook",small:"small",medium:"medium",metro:"metro",fa:"fa"}},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var o=this[t];o[2]?e.push("@media "+o[2]+"{"+o[1]+"}"):e.push(o[1])}return e.join("")},e.i=function(t,o){"string"==typeof t&&(t=[[null,t,""]]);for(var n={},i=0;i<this.length;i++){var r=this[i][0];"number"==typeof r&&(n[r]=!0)}for(i=0;i<t.length;i++){var s=t[i];"number"==typeof s[0]&&n[s[0]]||(o&&!s[2]?s[2]=o:o&&(s[2]="("+s[2]+") and ("+o+")"),e.push(s))}},e}},function(t,o){t.exports=e}])});

/***/ }),

/***/ 262:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(101);
__webpack_require__(105);
__webpack_require__(103);
__webpack_require__(41);
module.exports = __webpack_require__(40);


/***/ })

},[262]);