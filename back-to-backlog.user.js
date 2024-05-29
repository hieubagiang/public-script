// ==UserScript==
// @name        Backto backlog.jp
// @namespace   Violentmonkey Scripts
// @match       https://welbyinc.backlog.jp/*
// @grant       none
// @version     1.0
// @author      hieupd
// @description 5/29/2024, 5:25:28 PM
// ==/UserScript==


var element = document.getElementById("naiIntegrator");
element.parentNode.removeChild(element);
