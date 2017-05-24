import * as ReactDOM from "react-dom";
import * as React from "react";
import {Navbar, Icon, ProgressBar, Row, Input, Tabs, Tab, Col, Card, CardPanel, CardTitle, SideNav, SideNavItem, NavItem, Chip, Button, Footer, Modal}  from 'react-materialize';
import * as $ from "jquery";
import { LoginData, LoginHandler, LOGINTYPES, Pages, CampaignConfig } from './api';
import { KeyWords, MenuItems } from './campaign_items';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

class Application extends React.Component<any,any> {
                constructor() {
                    super()
                    this.state = {
                        settings : {
                            hasStarted : false,
                        },
                        tutorial : {
                            stage : 0,
                            complete : false,
                        },
                        userData  : {
                        
                        },
                        botData : {
                            active  : false
                        },
                        pageImage : "",
                        pageName : "",
                        pageId : "",
                        pageLink : "",
                    }
                    var ph = new Pages();
                    ph.getManagedPage().then((rdata)=>{
                        console.log(rdata);
                        let pn = rdata.name;
                        let pi = rdata.image;
                        let pid = rdata.pageid;
                        let plk = rdata.link
                        this.setState({
                            pageImage: pi,
                            pageName : pn,
                            pageId : pid,
                            pageLink : plk
                        });
                    })
                    var lh = new LoginHandler();
                    lh.getUserDetails().then((rdata)=>{this.setState({userData:rdata})});
                }
                tutorialNext() {
                        var nextStage=this.state.tutorial.stage + 1
                        this.setState({tutorial : {stage : nextStage}})
                }
                render() {
                        var views = {
                            home : <Home tutorial={!this.state.tutorial.complete} stage={this.state.tutorial.stage} context={this} />,
                            radar : <Radar />,
                            campaigns : <Campaigns />
                        }
                        return <div>
                                        <SideNav    trigger={<div className="menu-button" style={{cursor:"pointer"}}><Icon>menu</Icon></div>}
                                                    options={{ draggable: true }}
                                                    className="showOnLarge fixed side-nav">
                                                <SideNavItem userView user={{
                                                        image : this.state.pageImage,
                                                        background : "static/img/blackBg.png",
                                                        name : this.state.pageName,
                                                }} />
                                                <SideNavItem id="home" href="#home" waves icon="home">Home</SideNavItem>
                                                <SideNavItem id="radar" href="#radar" waves icon="track_changes">Radar</SideNavItem>
                                                <SideNavItem href="#campaigns" waves icon="work">Campaigns</SideNavItem>
                                                <SideNavItem href="#conversations" waves icon="forum">Conversations</SideNavItem>
                                                <SideNavItem href="#contacts" waves icon="contacts">Contacts</SideNavItem>
                                                <SideNavItem href="#intergrations" waves icon="extension">Intergrations</SideNavItem>
                                                <br />
                                                <br />
                                                <br />
                                                <div className="menu-bottom">
                                                        <hr />
                                                        <SideNavItem href="#settings" waves icon="settings">Settings</SideNavItem>
                                                        <SideNavItem href="#bugreport" waves icon="bug_report">Bug Report</SideNavItem>
                                                </div>
                                        </SideNav>
                                        <div className="main">
                                                <Row>
                                                        <Col m={10} offset="m1" s={12}>
                                                            {views[this.props.location]}
                                                        </Col>
                                                </Row>
                                        </div>
                                        <Button floating large style={{position: 'fixed',bottom: '25px', right: '24px'}} onClick={()=>{document.location.href="#help";}} waves='light' icon="help"/>
                                </div>;
                }
}

// Home View
class Home extends React.Component<any,any> {
    constructor() {
        super();
    }
    render() {
        
        if(this.props.tutorial == true) {
            
            return  <Tutorial context={this.props.context} stage={this.props.stage} />
        } else {
            return  <Card title="Home" actions={[<a href="#">Next</a>]}>
                                                                        Use the Radar to see statistics on your
                                                                        <br />Current campaigns and how your bot is doing.
                </Card>
        }
    }
}

// Radar View
class Radar extends React.Component<any,any> {
    render() {
        return <Tabs className="z-depth-1">
        <Tab title="Today" active>
            <Card>
                Todays Data here
            </Card>
        </Tab>
        <Tab title="This Week">
            <Card>
            This Weeks data here
            </Card>
        </Tab>
        <Tab title="This Month">
            <Card>
                This Months Data here
            </Card>
        </Tab>
        <Tab title="All Time">
            <Card>
                All Data here
            </Card>
        </Tab>
        </Tabs>;
    }
}

// Tutorial
class Tutorial extends React.Component<any,any>{
    constructor() {
        super();
    }
    render(){
        var tutorial = [
            <Card title="Getting Started" actions={[<a href="#" onClick={()=>{
                var next =  this.props.context.state.tutorial.stage + 1;
                this.props.context.setState({tutorial : {
                    stage : next
                }})
                }}>Next</a>]}>
                        Welcome!
                        <br />Lets get started straight away by creating your
                        <br />very first bot. This will instantly be linked
                        <br />to your Facebook Page Account and you will be
                        <br />able to start putting it through its paces
                        <br />right away!
                    </Card>,
                <Card title="Getting Started" actions={[<a href="#" onClick={()=>{
                var next =  this.props.context.state.tutorial.stage + 1;
                this.props.context.setState({tutorial : {
                    stage : next
                }})
                }}>Next</a>]}>
                    First Go to the Campaign Section,

                    </Card>
                    ]
        return tutorial[this.props.stage]
    }
}
class Campaigns extends React.Component<any,any> {
    constructor() {
        super();
        this.state = {
            campaigns : [

            ]
        }
    }
    render() {
        var tabs = new Array<Object>();
        var count = 0;
        this.state.campaigns.forEach(campaign => {
            tabs.push(<Tab title={campaign.name} active={(count==0)?true:false}>
                <Campaign cid={campaign.id} />
            </Tab>);
            count+=1;
        });
        tabs.push(<Tab title="New" active={(count==0)?true:false}>
            <Campaign new />
        </Tab>);
        return <Tabs className="z-depth-1">{tabs}</Tabs>
    }
}

// The <Campaign> element, if new is set on the element
// It open an empty template otherwise it will load
// the data from the server for the campaign with the id
// taken from the cid prop
class Campaign extends React.Component<any,any> {
    constructor(props) {
        super(props);
        this.setEditing = this.setEditing.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.state = {
            loading : true,
            config : [<BotItem new first type="initial" removeItem={this.removeItem} addItem={this.addItem} saveChanges={this.saveChanges} setEditing={this.setEditing} id={0}/>],
            editing : "initial",
        }
        
    }
    removeItem(item) {
        var currentItems : Array<Object> = this.state.config;
    }
    saveChanges(event) {
        this.setState({editing : "none"})
    }
    setEditing(event) {
        // var itemNumber = event.target.id;
        // console.log("Editing",event.target.id);
        this.setState({editing : event.type});
    }
    addItem(event) {
        var currentItems : Array<Object> = this.state.config;
        currentItems = currentItems.reverse();
        currentItems.push(<BotItem new type="new" addItem={this.addItem} removeItem={this.removeItem} saveChanges={this.saveChanges} setEditing={this.setEditing} />);
        this.setState({config : currentItems});
    }
    render() {
        if(this.props.new) {
            return <Card actions={[<Button>Save Changes</Button>]}>
                <Row>
                    <Col s={12} m={9}>Active</Col>
                    <Col s={12} m={3}><Input name="active" type='switch' value='1' /></Col>
                </Row>
                <Row>
                    <Col s={12}>
                        <span className="card-subtitle">Campaign Settings</span>
                        <Input label="Campaign Name" s={12} name="campaign_name" id="campaign_name" required><Icon>work</Icon></Input>
                    </Col>
                </Row>
                <Row>
                    <Col s={12} m={6}>
                        <span className='card-subtitle'>Bot Configuration</span>
                    </Col>
                </Row>
                <Row>
                    <Col s={12} m={8}>
                        {this.state.config}
                    </Col>
                    <Col s={12} m={4}>
                        <CampaignHelp editing={this.state.editing}/>
                    </Col>
                </Row>
                </Card>;
        } else {
            return <Card actions={[(!this.state.loading)?<Button>Save Changes</Button> : ""]}>
                {(this.state.loading)?<ProgressBar />:""}
                </Card>
        }
    }
}

// the <CampaignHelp> Element, used to show help while creating a new campaign,
// Introduces items in the sequence and how to start a sequence
// Takes the prop editing taken from the Campaigns state 'editing' to show info on the
// Currently selected item
class CampaignHelp extends React.Component<any,any> {
    constructor(props){
        super(props);
    }
    render() {
        var help_items = {
            initial : "Create the path through which your user will first interact with this sequence.",
            keyword : "Add key words that will initiate the interaction with the bot, you can add whole sentences, phrases or single words",
            menu_item : "When the user chooses a menu item you created when you set up the bot (you can change these at any time in settings)",
            button_click: "",
            none : "Select an item to edit to see tips in this section",
        }
        return <Card style={{textAlign:"center"}} key="chelp">
            <div style={{textAlign:"center"}} className="card-subtitle"><Icon>help</Icon></div>
            {help_items[this.props.editing]}
            </Card>;
    }
}

// The <BotItem> Element, takes the props new if its from a new campaign and
// first if its the first item (so that only the items to start a sequence are shown)
class BotItem extends React.Component<any,any> {
    constructor(props) {
        super(props);
        this.state = {
            type : false,
            editing : false,
            settings : {

            }
        }

    }
    setEditing() {
        this.props.setEditing({type: this.state.type, id : this.props.id});
        this.setState({editing : true})
    }
    saveChanges() {
        this.props.saveChanges({id : this.props.id});
        this.setState({editing : false});
    }
    addItem(item : string) {
        this.setState({type:item})
        this.props.addItem();
    }
    removeItem() {
        this.props.removeItem(this.props.id);
    }
    render() {
        var editing = this.state.editing;
        // if(editing) {
        //     this.props.context.setEditing(this.state.type);
        // }
        var types = {
            keyword : <KeyWords editing={editing}/>,
            menu_item: <MenuItems editing={editing} />,
            button_click : ""
        }
        if(this.props.new && this.state.type == false) {
            if(this.props.first) {
                return <Card>
                <Row>
                    <Col s={12}>
                    Please choose an input method through which the user interaction is initiated.
                    </Col>
                </Row>
                <Row>
                    <Col m={3} s={4} className="bot-item-select z-depth-1" offset="m1" onClick={()=>{this.addItem("keyword")}}>
                        <Icon>short_text</Icon>
                        <br />Key Words
                    </Col>
                    <Col s={4} m={3} className="bot-item-select z-depth-1" offset="m1" onClick={()=>{this.addItem("menu_item")}}>
                        <Icon>dns</Icon>
                        <br />Menu Item
                    </Col>
                    <Col s={4} m={3} className="bot-item-select z-depth-1" offset="m1" onClick={()=>{this.addItem("button_click")}}>
                        <Icon>touch_app</Icon>
                        <br />Button Click
                    </Col>
                    </Row>
                </Card>;
            } else {
                return <Card>
                    <Row>
                        <Col s={12}>
                        Please choose an item to configure
                        </Col>
                    </Row>
                    <Card>
                    <Row>
                        <Col s={12}>
                            <span className="card-subtitle">Send Actions</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col s={4} m={3} offset="m1" className="bot-item-select z-depth-1" onClick={()=>{this.addItem("send_text")}}>
                        <Icon>message</Icon>
                        <br />Text
                        </Col>
                        <Col s={4} m={3} offset="m1" className="bot-item-select z-depth-1" onClick={()=>{this.addItem("send_buttons")}}>
                        <Icon>dns</Icon>
                        <br />Buttons
                        </Col>
                        <Col s={4} m={3} offset="m1" className="bot-item-select z-depth-1" onClick={()=>{this.addItem("send_image")}}>
                        <Icon>photo</Icon>
                        <br />Image
                        </Col>
                    </Row>
                    <Row>
                        <Col s={4} m={3} offset="m1" className="bot-item-select z-depth-1" onClick={()=>{this.addItem("send_file")}}>
                        <Icon>attach_file</Icon>
                        <br />File
                        </Col>
                        <Col s={4} m={3} offset="m1" className="bot-item-select z-depth-1" onClick={()=>{this.addItem("send_slider")}}>
                        <Icon>burst_mode</Icon>
                        <br />Gallery
                        </Col>
                        <Col s={4} m={3} offset="m1" className="bot-item-select z-depth-1" onClick={()=>{this.addItem("quick_reply")}}>
                        <Icon>reply</Icon>
                        <br />Quick Replies
                        </Col>
                    </Row>
                    </Card>
                    <Card>
                        <Row>
                            <Col s={12}>
                                <span className="card-subtitle">Other</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col s={4} m={3} offset="m1" className="bot-item-select z-depth-1" onClick={()=>{this.addItem("keyword")}}>
                            <Icon>short_text</Icon>
                            <br />Keyword(s)
                            </Col>
                            <Col s={4} m={3} offset="m1" className="bot-item-select z-depth-1" onClick={()=>{this.addItem("apply_tag")}}>
                            <Icon>bookmark</Icon>
                            <br />Apply Tag
                            </Col>
                            <Col s={4} m={3} offset="m1" className="bot-item-select z-depth-1" onClick={()=>{this.addItem("timer")}}>
                            <Icon>timer</Icon>
                            <br />Timer
                            </Col>
                        </Row>
                    </Card>
                </Card>
            }
        } else {
            return <Card actions={(this.state.editing)?[<Button onClick={()=>this.saveChanges()}>Done</Button>] : [<Button id={this.props.id} onClick={()=>this.setEditing()}>Edit</Button>]}>
                    {types[this.state.type]}
                    </Card>;
        }
    }
}

$(
    () => {
        // OfflinePluginRuntime.install();
        window.addEventListener("load",()=>{
            document.location.hash = "";
        });
        ReactDOM.render(<Application location="home"/>, $("#react_context")[0]);
        window.addEventListener("hashchange",()=>{
            var location = document.location.hash;
            if(location == undefined || location == null || location == "") {
                location = "home";
            } else {
                location = location.replace("#", "");
                location = location.replace("!", "");
            }
            ReactDOM.render(<Application location={location} />, $("#react_context")[0]);
        });
        
    }
)