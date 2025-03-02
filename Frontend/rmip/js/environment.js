//環境変数もどき
var schema = "";
var domain = "";
var port = "";

if(location.hostname == "localhost" || location.hostname == "127.0.0.1"){
    //localhostの場合はスキーマをhttpにする
    schema = "http://";
    domain = "localhost";
    port = "80"
} else {
    //運用するドメインをセットする
    schema = "https://";
    domain = "remotemyip.ma2kz.net";
    port = "443";
}

const api_schema = schema;
const api_domain = domain;
const api_port = port;
const api_path = "/rmip/api/get-pubip";

export const api_point = api_schema + api_domain + ":" + api_port + api_path;