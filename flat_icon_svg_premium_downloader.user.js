// ==UserScript==
// @name        FlatIcon SVG Premium Downloader
// @version     1.0.1
// @date        2022/06/22
// @namespace   hieubagiang.github.io
// @author      Phạm Doãn Hiếu || fb.com/phamdoanhieu || phamdoanhieu@gmail.coma
// @copyright   HieuPD
// @homepage    https://fb.com/phamdoanhieu
// @supportURL  https://fb.com/phamdoanhieu
// @icon        https://i.imgur.com/6SaS8VR.png
// @description A tool for download SVG icon on FlatIcon
// @description:vi Dang ky tinh chi nhanh by Hieu
// @contributionURL 
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_openInTab
// @grant       GM_registerMenuCommand
// @include     *://*.flaticon.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @run-at      document-end
// ==/UserScript==
//
function downloadSvg() {
    var url = window.location.href.split("?")[0];
    var filename = url.split("/")[url.split("/").length - 1];
    var id = filename.split("_")[1];
    if (!id) {
        alert("You can only download svg icon while viewing an icon.");
        return;
    }
    var onlyName = filename.split("_")[0];
    function downloadURI(uri, name) {
        var link = document.createElement("a");
        link.setAttribute("download", name);
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
    var loggedin = document.getElementById("gr_connected");
    if (!loggedin) {
        alert("Please login before clicking on me.");
        return;
    }
    fetch("https://www.flaticon.com/editor/icon/svg/" + id + "?type=standard").then(function (response) {
        return response.json();
    }).then((data) => {
        downloadURI(data.url, onlyName + ".svg");
    }).catch((error) => {
        alert("Somethingwentwrong>.<");
    })
};
var downloadButton = document.querySelector("#download > a");
downloadButton.removeAttribute("data-format");
downloadButton.setAttribute("title","SVG Premium Download by HieuPD");
downloadButton.setAttribute("class","btn-svg not-mobile btn bj-button bj-button--primary btn-primary");
downloadButton.setAttribute("style","background-color: #007bff");
downloadButton.onclick=  downloadSvg;
