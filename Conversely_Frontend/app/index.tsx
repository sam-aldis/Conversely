import * as ReactDOM from "react-dom";
import * as React from "react";
import {Navbar, Icon, Row, Input, Col, Card, CardPanel, CardTitle, SideNav, SideNavItem, NavItem, Chip, Button, Footer, Modal, Breadcrumb, MenuItem, ProgressBar}  from 'react-materialize';
import FacebookLogin from 'react-facebook-login';
import {LoginData, LoginHandler, LOGINTYPES,Pages} from './api';
import * as $ from "jquery";

class Application extends React.Component<any,any> {
        constructor() {
                super();
                this.state = {
                        loggedIn : false,
                        fbLogin : false,
                        name : null,
                        error : null,
                        loading: false,
                        pages : [],
                }
        }
        facebookResponse(res) {
                if(res.name != undefined && res.name != ""){
                        this.context.setState({name:res.name,loggedIn:true,fbLogin:true,loading:true});
                        var email = "none@none.com";
                        if(res.email) {
                                email = res.email;
                        }
                        var userDetails = "{\"name\" : \"" + res.name  + "\",\"profile_image\" : \"" + res.picture.data.url + "\",\"id\" :\"" + res.id +"\",\"email\" : \"" +  email + "\"}";
                        var loginData : LoginData = {
                                type : LOGINTYPES.SET,
                                action : "accessToken",
                                accessToken : res.accessToken,
                                details : userDetails
                        };
                        var lh = new LoginHandler(loginData);
                        lh.update().catch(
                                ()=> {
                                        
                                }
                        );
                        var pages = new Pages(res.accessToken, res.userID);
                        var user_pages = pages.usersPages;
                        user_pages.then((rdata) => {
                                var pageNames = new Array();
                                rdata.data.forEach(element => {
                                        var card = pages.getPageImage(element.id)
                                        card.then((pdata)=> {
                                                var link = "#" + element.id
                                                pageNames.push(
                                                        <Chip>
                                                                <img src={pdata.picture.data.url} />
                                                                <a href={link} >{element.name}</a>
                                                        </Chip>
                                                )
                                                this.context.setState({loading: false,pages : pageNames});
                                        })
                                })
                        });
                }
        }
        render() {
                        
                        if(this.state.name != null) {
                                var welcomeMessage = "Welcome " + this.state.name.split(" ")[0]
                        }
                        return <div>
                                        <Navbar brand={<span><Icon className="headerText">record_voice_over</Icon>Conversely</span>} right>
                                                <NavItem href="/about">About</NavItem>
                                                {(this.state.loggedIn) ? <NavItem href="/app">Console</NavItem>  : ""}
                                        </Navbar>
                                        <Row className="preLoginContent">
                                                        <Row>  
                                                                <Col s={12} className="signupBox">
                                                                        <Col s={12} m={6} offset="m3">
                                                                        <Breadcrumb>
                                                                        <MenuItem>Login</MenuItem>
                                                                                <MenuItem>{(this.state.fbLogin) ?  "Select Page" : "" }</MenuItem>
                                                                        </Breadcrumb>
                                                                               {(this.state.fbLogin) ? <Card title={welcomeMessage} actions={(this.state.loading)? <ProgressBar /> : this.state.pages}>
                                                                                       Please Choose the page you want to use for
                                                                                       <br />your bot from the list below
                                                                                       </Card> : <Card title="Get Started"
                                                                                        actions={[<FacebookLogin
                                                                                        //TODO: remember to change this back to the correct app id
                                                                                        appId="1692607624102615"
                                                                                        autoLoad={true}
                                                                                        fields="name,email,picture"
                                                                                        scope="pages_show_list,public_profile,manage_pages,publish_pages,pages_messaging,pages_messaging_subscriptions"
                                                                                        callback={this.facebookResponse}
                                                                                        context={this}
                                                                                        cssClass="btn waves-effect waves-light btnFacebook"
                                                                                        icon="fa-facebook" />]} >
                                                                                        Create your first bot in 2 minutes.
                                                                                        <br />No credit card details required.
                                                                                </Card> }
                                                                        </Col>
                                                                </Col>
                                                        </Row>
                                                      
                                        </Row>
                                        <Row className="preLoginTopArea">
                                                              <Col s={12} m={4}>
                                                              <Card actions={[<Modal
                                                                header='Modal Header'
                                                                fixedFooter
                                                                trigger={
                                                                <a href='#'>Learn More</a>
                                                                }>
                                                                <LearnMore />
                                                                </Modal>]}>
                                                                <Icon>speaker_notes_off</Icon>
                                                                <br />
                                                                There are currently 34,000+ Facebook bots using the platform however most of these provide a very poor user experience and are unable to understand even the most basic of user messages
                                                                </Card>
                                                              </Col>
                                                              <Col s={12} m={4}>
                                                              <Card actions={[<Modal
                                                                header='Modal Header'
                                                                fixedFooter
                                                                trigger={
                                                                <a href='#'>Learn More</a>
                                                                }>
                                                                <LearnMore />
                                                                </Modal>]}>
                                                                <Icon>filter_drama</Icon>
                                                                <br />
                                                                We have created a Platform from which you can release intelligent and self learning bots.
                                                                This means your bot will get smarter the more it is used, more able to interact with your
                                                                clients and provide a more human experience. 
                                                                </Card>
                                                              </Col>
                                                              <Col s={12} m={4}>
                                                              <Card actions={[<Modal
                                                                header='Modal Header'
                                                                fixedFooter
                                                                trigger={
                                                                <a href='#'>Learn More</a>
                                                                }>
                                                                <LearnMore />
                                                                </Modal>]}>
                                                              <Icon>school</Icon>
                                                              <br />
                                                              You set your goals, targets and other important information about your business and the bot will attempt to understand
                                                              what your users are asking of it. If it can't understand it will pass it on to you and learn from the response you give.
                                                              </Card>
                                                              </Col>
                                        </Row>
                                        <Row className="extraInfo">
                                                                <Col s={12} m={12}>
                                                                        <Row>
                                                                                <Col s={0} m={1}>
                                                                                </Col>
                                                                                <Col s={12} m={10}>
                                                                                        <br /><Icon>track_changes</Icon>
                                                                                        <br />We provide an easy to use CRM software for our bots, 
                                                                                        It will track all of your page users and how they are interacting with your business
                                                                                        and allows you to connect to many different services to re-sell to your previous customers
                                                                                        and turn prospects into clients.
                                                                                </Col>
                                                                        </Row>
                                                                        <Row>
                                                                                <hr />
                                                                                <Col s={0} m={1}></Col>
                                                                                <Col s={12} m={10}>
                                                                                        <br /><Icon>money_off</Icon>
                                                                                        <br />Spend less money on advertising and staff, target Facebook adverts directly
                                                                                        to the messenger platform and let the bot handle all of the work for your business.
                                                                                        From booking clients into appointments and seminars to making purchases, you can configure
                                                                                        your bot to do what ever helps you the most and save money at the same time!
                                                                                </Col>
                                                                        </Row>
                                                                        <Row>
                                                                                <hr />
                                                                                <Col s={0} m={1}></Col>
                                                                                <Col s={12} m={10}>
                                                                                        <br /><Icon>extension</Icon>
                                                                                        <br />Highly extensible, intergrations with key services and if we haven't
                                                                                        got what you want or need yet feel free to ask us and we'll do the best we
                                                                                        can to get it created and running for you.
                                                                                </Col>
                                                                        </Row>
                                                                </Col>
                                        </Row>
                                        <Row>
                                                <Col s={12} m={6} offset="m3">
                                                        <Card actions={[<Modal
                                                                header='Modal Header'
                                                                fixedFooter
                                                                trigger={
                                                                <a href='#'>Learn More</a>
                                                                }>
                                                                <LearnMore />
                                                                </Modal>]}>
                                                        Harness the power of Facebook now with an ROI of over 300%, 
                                                        the ability to target the audience who really matters to you and 
                                                        in the location you choose and leave the bot to handle the enquries and bookings. 
                                                        Free up the ability to focus your energy where it really matters, your business.
                                                        <br />Try risk free today!
                                                        <br />
                                                        <br />
                                                        </Card>
                                                </Col>
                                        </Row>
                                        <Footer copyrights={<span><Icon>copyright</Icon> 2017 <a href='www.ukjp-design.com'>ukjp-design</a></span>}
                                                links={
                                                <ul>
                                                        <li><a className="grey-text text-lighten-3" href="#!">FAQ's</a></li>
                                                        <li><Modal
                                                                header='Contact Us'
                                                                fixedFooter
                                                                trigger={
                                                                <a className="grey-text text-lighten-3" href="#!">Contact Us</a>
                                                                }>
                                                                Contacting us:</Modal></li>
                                                </ul>
                                                }>
                                                <h5 style={{color:"white"}}>Created with <span style={{color:"red"}}><Icon>favorite</Icon></span></h5>
                                                <span style={{color:"white"}}>If your interested in working with us or connecting your services
                                                <br />with ours please use the contact us section to get in touch</span>
                                        </Footer>
                                </div>;
                }
}

class LearnMore extends React.Component<any,any>{
        constructor() {
                super();
        }
        render() {
                return <div>More info about conversely</div>
        }
}

// Renders content on page load
$( ()=>{
        window.addEventListener("load",()=>{
            document.location.hash = " ";
        });
        // Handle window hash Changes
        window.addEventListener("hashchange", ()=> {
                var hash = document.location.hash;
                hash = hash.replace("#","");
                var loginData : LoginData = {
                        type : LOGINTYPES.SET,
                        action : "pageid",
                        pageid : hash
                }
                var lh = new LoginHandler(loginData);
                var page_select = lh.update();
                page_select.then(
                ()=> {
                        document.location.href="/app";
                }
                ).catch(
                        ()=>{

                        }
                )
        })
        ReactDOM.render(<Application />, $("#react_context")[0]);
});