webpackJsonp([1],{

/***/ 100:
/***/ (function(module, exports, __webpack_require__) {

window.$ = window.jQuery = __webpack_require__(15);
$( document ).ready(function() {
      $(".menu-button").sideNav();
});

/***/ }),

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(108);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(64)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./app.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./app.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 104:
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
var $ = __webpack_require__(15);
var api_1 = __webpack_require__(99);
var campaign_items_1 = __webpack_require__(248);
var Application = (function (_super) {
    __extends(Application, _super);
    function Application() {
        var _this = this;
        _super.call(this);
        this.state = {
            settings: {
                hasStarted: false,
            },
            tutorial: {
                stage: 0,
                complete: false,
            },
            userData: {},
            botData: {
                active: false
            },
            pageImage: "",
            pageName: "",
            pageId: "",
            pageLink: "",
        };
        var ph = new api_1.Pages();
        ph.getManagedPage().then(function (rdata) {
            console.log(rdata);
            var pn = rdata.name;
            var pi = rdata.image;
            var pid = rdata.pageid;
            var plk = rdata.link;
            _this.setState({
                pageImage: pi,
                pageName: pn,
                pageId: pid,
                pageLink: plk
            });
        });
        var lh = new api_1.LoginHandler();
        lh.getUserDetails().then(function (rdata) { _this.setState({ userData: rdata }); });
    }
    Application.prototype.tutorialNext = function () {
        var nextStage = this.state.tutorial.stage + 1;
        this.setState({ tutorial: { stage: nextStage } });
    };
    Application.prototype.render = function () {
        var views = {
            home: React.createElement(Home, {tutorial: !this.state.tutorial.complete, stage: this.state.tutorial.stage, context: this}),
            radar: React.createElement(Radar, null),
            campaigns: React.createElement(Campaigns, null)
        };
        return React.createElement("div", null, React.createElement(react_materialize_1.SideNav, {trigger: React.createElement("div", {className: "menu-button", style: { cursor: "pointer" }}, React.createElement(react_materialize_1.Icon, null, "menu")), options: { draggable: true }, className: "showOnLarge fixed side-nav"}, React.createElement(react_materialize_1.SideNavItem, {userView: true, user: {
            image: this.state.pageImage,
            background: "static/img/blackBg.png",
            name: this.state.pageName,
        }}), React.createElement(react_materialize_1.SideNavItem, {id: "home", href: "#home", waves: true, icon: "home"}, "Home"), React.createElement(react_materialize_1.SideNavItem, {id: "radar", href: "#radar", waves: true, icon: "track_changes"}, "Radar"), React.createElement(react_materialize_1.SideNavItem, {href: "#campaigns", waves: true, icon: "work"}, "Campaigns"), React.createElement(react_materialize_1.SideNavItem, {href: "#conversations", waves: true, icon: "forum"}, "Conversations"), React.createElement(react_materialize_1.SideNavItem, {href: "#contacts", waves: true, icon: "contacts"}, "Contacts"), React.createElement(react_materialize_1.SideNavItem, {href: "#intergrations", waves: true, icon: "extension"}, "Intergrations"), React.createElement("br", null), React.createElement("br", null), React.createElement("br", null), React.createElement("div", {className: "menu-bottom"}, React.createElement("hr", null), React.createElement(react_materialize_1.SideNavItem, {href: "#settings", waves: true, icon: "settings"}, "Settings"), React.createElement(react_materialize_1.SideNavItem, {href: "#bugreport", waves: true, icon: "bug_report"}, "Bug Report"))), React.createElement("div", {className: "main"}, React.createElement(react_materialize_1.Row, null, React.createElement(react_materialize_1.Col, {m: 10, offset: "m1", s: 12}, views[this.props.location]))), React.createElement(react_materialize_1.Button, {floating: true, large: true, style: { position: 'fixed', bottom: '25px', right: '24px' }, onClick: function () { document.location.href = "#help"; }, waves: 'light', icon: "help"}));
    };
    return Application;
}(React.Component));
var Home = (function (_super) {
    __extends(Home, _super);
    function Home() {
        _super.call(this);
    }
    Home.prototype.render = function () {
        if (this.props.tutorial == true) {
            return React.createElement(Tutorial, {context: this.props.context, stage: this.props.stage});
        }
        else {
            return React.createElement(react_materialize_1.Card, {title: "Home", actions: [React.createElement("a", {href: "#"}, "Next")]}, "Use the Radar to see statistics on your", React.createElement("br", null), "Current campaigns and how your bot is doing.");
        }
    };
    return Home;
}(React.Component));
var Radar = (function (_super) {
    __extends(Radar, _super);
    function Radar() {
        _super.apply(this, arguments);
    }
    Radar.prototype.render = function () {
        return React.createElement(react_materialize_1.Tabs, {className: "z-depth-1"}, React.createElement(react_materialize_1.Tab, {title: "Today", active: true}, React.createElement(react_materialize_1.Card, null, "Todays Data here")), React.createElement(react_materialize_1.Tab, {title: "This Week"}, React.createElement(react_materialize_1.Card, null, "This Weeks data here")), React.createElement(react_materialize_1.Tab, {title: "This Month"}, React.createElement(react_materialize_1.Card, null, "This Months Data here")), React.createElement(react_materialize_1.Tab, {title: "All Time"}, React.createElement(react_materialize_1.Card, null, "All Data here")));
    };
    return Radar;
}(React.Component));
var Tutorial = (function (_super) {
    __extends(Tutorial, _super);
    function Tutorial() {
        _super.call(this);
    }
    Tutorial.prototype.render = function () {
        var _this = this;
        var tutorial = [
            React.createElement(react_materialize_1.Card, {title: "Getting Started", actions: [React.createElement("a", {href: "#", onClick: function () {
                    var next = _this.props.context.state.tutorial.stage + 1;
                    _this.props.context.setState({ tutorial: {
                            stage: next
                        } });
                }}, "Next")]}, "Welcome!", React.createElement("br", null), "Lets get started straight away by creating your", React.createElement("br", null), "very first bot. This will instantly be linked", React.createElement("br", null), "to your Facebook Page Account and you will be", React.createElement("br", null), "able to start putting it through its paces", React.createElement("br", null), "right away!"),
            React.createElement(react_materialize_1.Card, {title: "Getting Started", actions: [React.createElement("a", {href: "#", onClick: function () {
                    var next = _this.props.context.state.tutorial.stage + 1;
                    _this.props.context.setState({ tutorial: {
                            stage: next
                        } });
                }}, "Next")]}, "First Go to the Campaign Section,")
        ];
        return tutorial[this.props.stage];
    };
    return Tutorial;
}(React.Component));
var Campaigns = (function (_super) {
    __extends(Campaigns, _super);
    function Campaigns() {
        _super.call(this);
        this.state = {
            campaigns: []
        };
    }
    Campaigns.prototype.render = function () {
        var tabs = new Array();
        var count = 0;
        this.state.campaigns.forEach(function (campaign) {
            tabs.push(React.createElement(react_materialize_1.Tab, {title: campaign.name, active: (count == 0) ? true : false}, React.createElement(Campaign, {cid: campaign.id})));
            count += 1;
        });
        tabs.push(React.createElement(react_materialize_1.Tab, {title: "New", active: (count == 0) ? true : false}, React.createElement(Campaign, {new: true})));
        return React.createElement(react_materialize_1.Tabs, {className: "z-depth-1"}, tabs);
    };
    return Campaigns;
}(React.Component));
var Campaign = (function (_super) {
    __extends(Campaign, _super);
    function Campaign(props) {
        _super.call(this, props);
        this.setEditing = this.setEditing.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.state = {
            loading: true,
            config: [React.createElement(BotItem, {new: true, first: true, type: "initial", removeItem: this.removeItem, addItem: this.addItem, saveChanges: this.saveChanges, setEditing: this.setEditing, id: 0})],
            editing: "initial",
        };
    }
    Campaign.prototype.removeItem = function (item) {
        var currentItems = this.state.config;
    };
    Campaign.prototype.saveChanges = function (event) {
        this.setState({ editing: "none" });
    };
    Campaign.prototype.setEditing = function (event) {
        this.setState({ editing: event.type });
    };
    Campaign.prototype.addItem = function (event) {
        var currentItems = this.state.config;
        currentItems = currentItems.reverse();
        currentItems.push(React.createElement(BotItem, {new: true, type: "new", addItem: this.addItem, removeItem: this.removeItem, saveChanges: this.saveChanges, setEditing: this.setEditing}));
        this.setState({ config: currentItems });
    };
    Campaign.prototype.render = function () {
        if (this.props.new) {
            return React.createElement(react_materialize_1.Card, {actions: [React.createElement(react_materialize_1.Button, null, "Save Changes")]}, React.createElement(react_materialize_1.Row, null, React.createElement(react_materialize_1.Col, {s: 12, m: 9}, "Active"), React.createElement(react_materialize_1.Col, {s: 12, m: 3}, React.createElement(react_materialize_1.Input, {name: "active", type: 'switch', value: '1'}))), React.createElement(react_materialize_1.Row, null, React.createElement(react_materialize_1.Col, {s: 12}, React.createElement("span", {className: "card-subtitle"}, "Campaign Settings"), React.createElement(react_materialize_1.Input, {label: "Campaign Name", s: 12, name: "campaign_name", id: "campaign_name", required: true}, React.createElement(react_materialize_1.Icon, null, "work")))), React.createElement(react_materialize_1.Row, null, React.createElement(react_materialize_1.Col, {s: 12, m: 6}, React.createElement("span", {className: 'card-subtitle'}, "Bot Configuration"))), React.createElement(react_materialize_1.Row, null, React.createElement(react_materialize_1.Col, {s: 12, m: 8}, this.state.config), React.createElement(react_materialize_1.Col, {s: 12, m: 4}, React.createElement(CampaignHelp, {editing: this.state.editing}))));
        }
        else {
            return React.createElement(react_materialize_1.Card, {actions: [(!this.state.loading) ? React.createElement(react_materialize_1.Button, null, "Save Changes") : ""]}, (this.state.loading) ? React.createElement(react_materialize_1.ProgressBar, null) : "");
        }
    };
    return Campaign;
}(React.Component));
var CampaignHelp = (function (_super) {
    __extends(CampaignHelp, _super);
    function CampaignHelp(props) {
        _super.call(this, props);
    }
    CampaignHelp.prototype.render = function () {
        var help_items = {
            initial: "Create the path through which your user will first interact with this sequence.",
            keyword: "Add key words that will initiate the interaction with the bot, you can add whole sentences, phrases or single words",
            menu_item: "When the user chooses a menu item you created when you set up the bot (you can change these at any time in settings)",
            button_click: "",
            none: "Select an item to edit to see tips in this section",
        };
        return React.createElement(react_materialize_1.Card, {style: { textAlign: "center" }, key: "chelp"}, React.createElement("div", {style: { textAlign: "center" }, className: "card-subtitle"}, React.createElement(react_materialize_1.Icon, null, "help")), help_items[this.props.editing]);
    };
    return CampaignHelp;
}(React.Component));
var BotItem = (function (_super) {
    __extends(BotItem, _super);
    function BotItem(props) {
        _super.call(this, props);
        this.state = {
            type: false,
            editing: false,
            settings: {}
        };
    }
    BotItem.prototype.setEditing = function () {
        this.props.setEditing({ type: this.state.type, id: this.props.id });
        this.setState({ editing: true });
    };
    BotItem.prototype.saveChanges = function () {
        this.props.saveChanges({ id: this.props.id });
        this.setState({ editing: false });
    };
    BotItem.prototype.addItem = function (item) {
        this.setState({ type: item });
        this.props.addItem();
    };
    BotItem.prototype.removeItem = function () {
        this.props.removeItem(this.props.id);
    };
    BotItem.prototype.render = function () {
        var _this = this;
        var editing = this.state.editing;
        var types = {
            keyword: React.createElement(campaign_items_1.KeyWords, {editing: editing}),
            menu_item: React.createElement(campaign_items_1.MenuItems, {editing: editing}),
            button_click: ""
        };
        if (this.props.new && this.state.type == false) {
            if (this.props.first) {
                return React.createElement(react_materialize_1.Card, null, React.createElement(react_materialize_1.Row, null, React.createElement(react_materialize_1.Col, {s: 12}, "Please choose an input method through which the user interaction is initiated.")), React.createElement(react_materialize_1.Row, null, React.createElement(react_materialize_1.Col, {m: 3, s: 4, className: "bot-item-select z-depth-1", offset: "m1", onClick: function () { _this.addItem("keyword"); }}, React.createElement(react_materialize_1.Icon, null, "short_text"), React.createElement("br", null), "Key Words"), React.createElement(react_materialize_1.Col, {s: 4, m: 3, className: "bot-item-select z-depth-1", offset: "m1", onClick: function () { _this.addItem("menu_item"); }}, React.createElement(react_materialize_1.Icon, null, "dns"), React.createElement("br", null), "Menu Item"), React.createElement(react_materialize_1.Col, {s: 4, m: 3, className: "bot-item-select z-depth-1", offset: "m1", onClick: function () { _this.addItem("button_click"); }}, React.createElement(react_materialize_1.Icon, null, "touch_app"), React.createElement("br", null), "Button Click")));
            }
            else {
                return React.createElement(react_materialize_1.Card, null, React.createElement(react_materialize_1.Row, null, React.createElement(react_materialize_1.Col, {s: 12}, "Please choose an item to configure")), React.createElement(react_materialize_1.Card, null, React.createElement(react_materialize_1.Row, null, React.createElement(react_materialize_1.Col, {s: 12}, React.createElement("span", {className: "card-subtitle"}, "Send Actions"))), React.createElement(react_materialize_1.Row, null, React.createElement(react_materialize_1.Col, {s: 4, m: 3, offset: "m1", className: "bot-item-select z-depth-1", onClick: function () { _this.addItem("send_text"); }}, React.createElement(react_materialize_1.Icon, null, "message"), React.createElement("br", null), "Text"), React.createElement(react_materialize_1.Col, {s: 4, m: 3, offset: "m1", className: "bot-item-select z-depth-1", onClick: function () { _this.addItem("send_buttons"); }}, React.createElement(react_materialize_1.Icon, null, "dns"), React.createElement("br", null), "Buttons"), React.createElement(react_materialize_1.Col, {s: 4, m: 3, offset: "m1", className: "bot-item-select z-depth-1", onClick: function () { _this.addItem("send_image"); }}, React.createElement(react_materialize_1.Icon, null, "photo"), React.createElement("br", null), "Image")), React.createElement(react_materialize_1.Row, null, React.createElement(react_materialize_1.Col, {s: 4, m: 3, offset: "m1", className: "bot-item-select z-depth-1", onClick: function () { _this.addItem("send_file"); }}, React.createElement(react_materialize_1.Icon, null, "attach_file"), React.createElement("br", null), "File"), React.createElement(react_materialize_1.Col, {s: 4, m: 3, offset: "m1", className: "bot-item-select z-depth-1", onClick: function () { _this.addItem("send_slider"); }}, React.createElement(react_materialize_1.Icon, null, "burst_mode"), React.createElement("br", null), "Gallery"), React.createElement(react_materialize_1.Col, {s: 4, m: 3, offset: "m1", className: "bot-item-select z-depth-1", onClick: function () { _this.addItem("quick_reply"); }}, React.createElement(react_materialize_1.Icon, null, "reply"), React.createElement("br", null), "Quick Replies"))), React.createElement(react_materialize_1.Card, null, React.createElement(react_materialize_1.Row, null, React.createElement(react_materialize_1.Col, {s: 12}, React.createElement("span", {className: "card-subtitle"}, "Other"))), React.createElement(react_materialize_1.Row, null, React.createElement(react_materialize_1.Col, {s: 4, m: 3, offset: "m1", className: "bot-item-select z-depth-1", onClick: function () { _this.addItem("keyword"); }}, React.createElement(react_materialize_1.Icon, null, "short_text"), React.createElement("br", null), "Keyword(s)"), React.createElement(react_materialize_1.Col, {s: 4, m: 3, offset: "m1", className: "bot-item-select z-depth-1", onClick: function () { _this.addItem("apply_tag"); }}, React.createElement(react_materialize_1.Icon, null, "bookmark"), React.createElement("br", null), "Apply Tag"), React.createElement(react_materialize_1.Col, {s: 4, m: 3, offset: "m1", className: "bot-item-select z-depth-1", onClick: function () { _this.addItem("timer"); }}, React.createElement(react_materialize_1.Icon, null, "timer"), React.createElement("br", null), "Timer"))));
            }
        }
        else {
            return React.createElement(react_materialize_1.Card, {actions: (this.state.editing) ? [React.createElement(react_materialize_1.Button, {onClick: function () { return _this.saveChanges(); }}, "Done")] : [React.createElement(react_materialize_1.Button, {id: this.props.id, onClick: function () { return _this.setEditing(); }}, "Edit")]}, types[this.state.type]);
        }
    };
    return BotItem;
}(React.Component));
$(function () {
    window.addEventListener("load", function () {
        document.location.hash = "";
    });
    ReactDOM.render(React.createElement(Application, {location: "home"}), $("#react_context")[0]);
    window.addEventListener("hashchange", function () {
        var location = document.location.hash;
        if (location == undefined || location == null || location == "") {
            location = "home";
        }
        else {
            location = location.replace("#", "");
            location = location.replace("!", "");
        }
        ReactDOM.render(React.createElement(Application, {location: location}), $("#react_context")[0]);
    });
});


/***/ }),

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(42)(undefined);
// imports


// module
exports.push([module.i, "html {\n  height: 100%; }\n  html body {\n    margin: 0;\n    background-color: #ECECEC; }\n    html body #react_context {\n      height: 100%; }\n\n.bot-item-select {\n  text-align: center;\n  cursor: pointer;\n  transition: 0.2s; }\n\n.bot-item-select:hover {\n  border: 1px solid #AAAAAA; }\n\n.card-subtitle {\n  font-size: 15px;\n  color: #AAAAAA; }\n\n.menu-bottom {\n  position: absolute;\n  width: 100%;\n  bottom: 0px;\n  padding-bottom: 60px; }\n\n.menu-button {\n  padding: 10px; }\n\n.main {\n  padding: 10px; }\n\n.removeButton {\n  background: none !important;\n  box-shadow: none !important;\n  color: #3b5998 !important;\n  padding: 0px !important;\n  width: 20px !important;\n  font-size: 9pt !important;\n  margin: 0px !important; }\n\n@media (min-width: 993px) {\n  .headerText {\n    padding-left: 10px; }\n  header, main, .footer, .main {\n    margin-left: 300px; }\n  .menu-button {\n    display: none !important; } }\n\n.sidebar {\n  background-color: #FCFCFC; }\n", ""]);

// exports


/***/ }),

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = __webpack_require__(1);
var react_materialize_1 = __webpack_require__(61);
var api_1 = __webpack_require__(99);
var KeyWords = (function (_super) {
    __extends(KeyWords, _super);
    function KeyWords() {
        _super.call(this);
        this.state = {
            current: "",
            keywords: new Array(),
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }
    KeyWords.prototype.handleKeyDown = function (event) {
        if (event.keyCode == 13) {
            this.handleChange(event);
            this.addItem();
        }
        ;
    };
    KeyWords.prototype.addItem = function () {
        var localKeywords = this.state.keywords;
        localKeywords.push(this.state.current);
        this.setState({ keywords: localKeywords, current: "" });
    };
    KeyWords.prototype.handleChange = function (event) {
        this.setState({ current: event.target.value });
    };
    KeyWords.prototype.removeItem = function (event) {
        var itemNumber = event.target.value;
        var localKeywords = this.state.keywords;
        localKeywords.splice(itemNumber, 1);
        this.setState({ keywords: localKeywords });
    };
    KeyWords.prototype.render = function () {
        var _this = this;
        var keywords = new Array();
        var stateKeywords = this.state.keywords;
        var counter = 0;
        stateKeywords.forEach(function (element) {
            keywords.push(React.createElement(react_materialize_1.Chip, {key: counter}, element, " ", (_this.props.editing) ? React.createElement(react_materialize_1.Button, {style: { cursor: "pointer" }, value: counter, className: "removeButton", onClick: function (event) { return _this.removeItem(event); }}, "x") : ""));
            counter += 1;
        });
        if (this.props.editing) {
            return React.createElement("div", null, React.createElement("span", {className: "card-subtitle"}, "Add or Remove Keywords"), React.createElement(react_materialize_1.Row, null, React.createElement(react_materialize_1.Col, {s: 12}, keywords)), React.createElement(react_materialize_1.Row, null, React.createElement(react_materialize_1.Col, {s: 12}, React.createElement(react_materialize_1.Input, {name: "keyword", label: "keyword(s)", s: 5, onChange: this.handleChange, value: this.state.current, onKeyDown: this.handleKeyDown}), React.createElement(react_materialize_1.Button, {onClick: function () { _this.addItem(); }, style: { marginTop: "20px" }}, React.createElement(react_materialize_1.Icon, null, "add")))));
        }
        else {
            return React.createElement("div", null, React.createElement("span", {className: "card-subtitle"}, "Keywords"), React.createElement("br", null), " ", keywords);
        }
    };
    return KeyWords;
}(React.Component));
exports.KeyWords = KeyWords;
var MenuItems = (function (_super) {
    __extends(MenuItems, _super);
    function MenuItems(props) {
        _super.call(this, props);
        this.state = {
            options: [],
            editing: false,
        };
    }
    MenuItems.prototype.componentDidMount = function () {
        var conf = new api_1.CampaignConfig();
        var menu = conf.menuItems;
        this.setState({
            options: menu.items
        });
    };
    MenuItems.prototype.render = function () {
        if (this.props.editing) {
            return React.createElement("div", null, React.createElement("span", {className: "card-subtitle"}, "Select A Menu Item to Use as Input"));
        }
        else {
            return React.createElement("div", null, React.createElement("span", {className: "card-subtitle"}, "Menu Item"));
        }
    };
    return MenuItems;
}(React.Component));
exports.MenuItems = MenuItems;


/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(100);
__webpack_require__(104);
__webpack_require__(41);
__webpack_require__(40);
module.exports = __webpack_require__(102);


/***/ })

},[261]);