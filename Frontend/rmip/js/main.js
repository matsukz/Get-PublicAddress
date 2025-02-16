import { api_point } from "./environment.js";
$(document).ready(function(){

    document.getElementById("updateTime").innerText = "取得時間：" + new Date().toLocaleString({ timeZone: 'Asia/Tokyo' });

    $.ajax({
        type: "GET",
        url: api_point,
        contentType: "application/json",
        cache: false
    }).done(function(response){
        change_status("myIP",response.SrcIP);
        change_status("apiTime"," API時間：" + formatDate(response.Date.date));
    }).fail(function(response_status){
        console.log("myIP","API疎通エラー");
    })

    //テキスト置換用の関数（？）
    function change_status(id,msg){
        document.getElementById(id).innerText = msg;
    }

    //日付フォーマット変換用関数
    function formatDate(dateText) {
        // 日付文字列をパース
        let date = new Date(dateText.replace(" ", "T") + "Z"); // UTCとして扱う
    
        // 日本時間（Asia/Tokyo）でローカライズ
        return date.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
    }

})