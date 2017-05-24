
export var LOGINTYPES = {
    INITIAL : 100,
    GET : 200,
    SET : 300,
}


export interface LoginData {
    type : number;
    action  : string;
    pageid ? : string;
    firstname? : string;
    lastname? : string;
    accessToken? : string;
    details ? : string;
    cookie? : string;
}

export class LoginHandler {
    constructor(public loginData? : LoginData) {
    }
    update(data ?: LoginData) {
        if(data) {
            // add the new data passed to the function
        } else {
            // Update the user with the data from the constructor
            return new Promise((resolve,reject)=>{
                $.post("api",this.loginData).then((data)=>{
                    if(data != "200") {
                        reject(data);
                    } else {
                        resolve(data);
                    }
                })
            });
        }
    }
    getUserDetails() {
        return new Promise((resolve) => {
            var data : LoginData = {
                type : LOGINTYPES.GET,
                action : "userData"
            }
            $.getJSON("/api",data).then(
                (rdata)=> {
                    resolve(rdata);
                }
            )
        })
    }
}

export class CampaignConfig {
    constructor(private pageid? : string | number, private campaignid? : string | number) {

    }
    get menuItems() {
        if(this.pageid) {
            var returnObject = {
                type : "ok",
                items : []
            }
            return returnObject;
        } else {
            return {
                type : "error",
                items : [],
                message : "no page id was given"
            }
        }
    }
}

export class Pages {
    constructor(private accessToken? : string,private userId? : string) {

    }
    get usersPages() {
        var data = {
            //action : "getPages",
            access_token : this.accessToken
            //userId : this.userId
        }
        return new Promise((resolve,reject) => {
            var url = "https://graph.facebook.com/v2.9/me/accounts?type=page"
            $.getJSON(url,data).then((rdata)=>{
                resolve(rdata);
            });
        });
    }
    getManagedPage(){
        var data : LoginData = {
            type :  LOGINTYPES.GET,
            action : "userPage"
        }
        return new Promise((resolve)=>{
            $.getJSON("/api",data).then((rdata)=>{
                resolve(rdata);       
            })
        });
    }
    getPageImage(pageid) {
        var data = {
            access_token : this.accessToken
        }
        var url = "https://graph.facebook.com/v2.9/" + pageid + "?fields=picture"
        return new Promise((resolve)=>{
            $.getJSON(url,data).then((rdata)=> {
                resolve(rdata)
            });
        })
    }
}