import { api_point } from "./environment.js";
$(document).ready(function(){

    $.ajax({

        type: "GET",
        url: api_point,
        contentType: "application/json",
        cache: false

    }).done(function(response){

        console.log(response);

        change_status("myIP",response["cf-connecting-ip"]);
        change_status("updateTime",new Date().toLocaleString({ timeZone: 'Asia/Tokyo' }));

        document.getElementById("spinner01").hidden = true;
        document.getElementById("myIP").hidden = false;

        document.getElementById("spinner02").hidden = true;
        document.getElementById("updateTime").hidden = false;      

    }).fail(function(response_status){

        change_status("myIP","API疎通エラー");
        change_status("updateTime",new Date().toLocaleString({ timeZone: 'Asia/Tokyo' }));

        document.getElementById("spinner01").hidden = true;
        document.getElementById("myIP").hidden = false;

        document.getElementById("spinner02").hidden = true;
        document.getElementById("table").hidden = false;

    })

    //テキスト置換用の関数（？）
    function change_status(id,msg){
        document.getElementById(id).innerText = msg;
    }
})