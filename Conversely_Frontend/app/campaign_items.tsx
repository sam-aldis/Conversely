import * as React from 'react';
import * as ReactDom from 'react-dom';
import {Input, Chip, Button, Icon, Row, Col} from 'react-materialize';
import {CampaignConfig} from "./api";

export class KeyWords extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            current : "",
            keywords : new Array<any>(),
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }
    handleKeyDown(event) {
        if(event.keyCode==13) {
            this.handleChange(event);
            this.addItem();
        };
    }
    addItem() {
        var localKeywords : Array<any> = this.state.keywords;
        localKeywords.push(this.state.current);
        this.setState({keywords: localKeywords, current : ""});
    }
    handleChange(event) {
        this.setState({current : event.target.value});
    }
    removeItem(event) {
        var itemNumber : number = event.target.value;
        var localKeywords : Array<any> = this.state.keywords;
        localKeywords.splice(itemNumber, 1);
        this.setState({keywords :  localKeywords});
    }
    render() {
        var keywords = new Array<Object>();
        var stateKeywords = this.state.keywords;
        var counter = 0;
        stateKeywords.forEach(element=>{
            keywords.push(<Chip key={counter}>{element} {(this.props.editing)?<Button style={{cursor: "pointer"}} value={counter} className="removeButton" onClick={(event)=>this.removeItem(event)}>x</Button> : ""}</Chip>);
            counter += 1;
        })
        
        if(this.props.editing){
            return <div>
                    <span className="card-subtitle">Add or Remove Keywords</span>
                    <Row>
                    <Col s={12} >{keywords}</Col>
                    </Row>
                    <Row>
                        <Col s={12}>
                        <Input name="keyword" label="keyword(s)" s={5} onChange={this.handleChange} value={this.state.current} onKeyDown={this.handleKeyDown}/><Button onClick={()=>{this.addItem()}} style={{marginTop:"20px"}}><Icon>add</Icon></Button>
                        </Col>
                    </Row>
                </div>;
        } else {
            return <div>
                <span className="card-subtitle">Keywords</span>
                <br /> {keywords}
                </div>
        }
    }
}

export class MenuItems extends React.Component<any,any>{ 
    constructor(props) {
        super(props);
        this.state = {
            options : [],
            editing : false,
        }
    }
    componentDidMount() {
        var conf : CampaignConfig = new CampaignConfig();
        var menu = conf.menuItems;
        this.setState({
            options : menu.items
        });
    }
    render() {
        if(this.props.editing) {
        return <div>
                <span className="card-subtitle">Select A Menu Item to Use as Input</span>
                
            </div>;
        } else {
            return <div>
                    <span className="card-subtitle">Menu Item</span>
                </div>;
        }
    }
}