// ==UserScript==
// @name        Hotaru_Android
// @namespace   Violentmonkey Scripts
// @match       https://rikkei.org/redmine/projects/23009d1_clipho_app_2023/issues/new?back_url=%2Fredmine%2Fissues%2F507307&issue%5Bparent_issue_id%5D=507307&issue%5Btracker_id%5D=23
// @grant       none
// @version     1.0
// @author      -
// @description 7/15/2024, 11:46:30 AM
// @run-at      document-end
// ==/UserScript==

function fillInput(){
var screen = "Female Detail";
var device = "Pixel 5";
var os = "Android version 13";

document.querySelector("#issue_subject").value='[Hotaru_Android][Review_Mode]['+screen+'] Lỗi giao diện';
document.querySelector("#issue_description").value='I/ Môi trường test: \n\n- Thiết bị: '+device+', '+os+'\n\nII/ Tần suất: 1/1 \n\nIII/ Bug: \n\n>Step: \n\n1. Vào màn hình '+screen+' \n\n2. Kiểm tra hiển thị  \n\n>Actual: \n\n1. Nhập user_name nhưng vẫn báo error không nhập \n\n>Evidence: \n\n!! \n\n>Expect: \n\n 1. Đối ứng giống design ';
document.querySelector("#issue_assigned_to_id").selectedIndex=4;
document.querySelector("#issue_category_id").selectedIndex=10;
document.querySelector("#issue_custom_field_values_20").selectedIndex=6;
document.querySelector("#issue_custom_field_values_18").selectedIndex=3;
  document.querySelector("#issue_custom_field_values_5").selectedIndex=4;
}

document.querySelector("#issue_tracker_id").selectedIndex=4;
document.querySelector("#issue_tracker_id").onchange();
setTimeout(function() {
    fillInput();
}, 1000);
