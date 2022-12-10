// ==UserScript==
// @name        Script Dang Ky Tin Chi auto
// @version     1.0.1
// @date        2021/07/25
// @namespace   https://hieuit.design
// @author      Phạm Doãn Hiếu || fb.com/phamdoanhieu || phamdoanhieu@gmail.coma
// @copyright   DHieu
// @homepage    https://fb.com/phamdoanhieu
// @supportURL
// @icon        https://i.imgur.com/6SaS8VR.png
// @description Dang ky tinh chi nhanh
// @description:vi Dang ky tinh chi nhanh by Hieu
// @contributionURL
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_openInTab
// @grant       GM_registerMenuCommand
// @include     *://qldt.actvn.edu.vn/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @run-at      document-end
// ==/UserScript==
// điền lớp cần đăng ký vào mảng listLopDangKy, gồm cả lớp thực hành   và lý thuyết
var listLopDangKy = ["Giám sát và ứng phó sự cố an toàn mạng-2-22 (002)",
"Kiểm thử và đánh giá an toàn hệ thống thông tin-2-22 (002)",
"Kiểm thử và đánh giá an toàn hệ thống thông tin-2-22 (002.1)",
"Quản lý an toàn thông tin-2-22 (002)",
"An toàn thương mại điện tử-2-22 (002)",
"Phân tích thiết kế an toàn mạng máy tính-2-22 (002)",
"Điều tra số-2-22 (002)",
"Điều tra số-2-22 (002.1)",
"Chứng thực điện tử-2-22 (002)",
"Công nghệ blockchain-2-22 (002)"];

var validUser = false;

console.log("%cScript đăng ký tín chỉ by HiếuPD ", "font-size:30px ; color:red; font-weight: bold");
document.getElementById("drpCourse").addEventListener("change", HienThiLop);
var found = null;

$(window).load(function() {
    console.log("Loading script...");
      console.log("Script Load Complete!");
      mainfunction();


});

function mainfunction() {
    var monHienTai = document.querySelector("#drpCourse");

    if (monHienTai.value == "") {
        console.log("Bạn chưa chọn môn");
    } else {


        var step1 = document.querySelectorAll(".cssRangeItem2,.cssRangeItem1"); // quét môn
        if (document.querySelector("#lblAvailableCourseClass").innerText.length > 0) {
            console.log("Môn này ko đăng kí được");
            NextMon(monHienTai);

        } else
        if (step1[0].childNodes[2].childNodes[1].disabled == true) {
            console.log("Chọn môn bị ẩn");
            console.log("Môn này đã đăng kí");
            NextMon(monHienTai);
        } else {
            step1.forEach(ChonMon);

            if (found == true) // môn này bỏ qua
            {
                $("input#btnUpdate").click();
            } else {
                console.log("Môn này không có trong list cần đkí");
                NextMon(monHienTai);

            }

        }

    }
}

function NextMon(monHienTai) {
    var index = monHienTai.selectedIndex;
    var length = monHienTai.length;
    if (index < length - 1 && monHienTai[index + 1] != undefined && monHienTai[index + 1] != null) {
        console.log("sang môn tiếp theo ... ");
        monHienTai.value = monHienTai[index + 1].value;
        HienThiLop();
    } else {

        console.log("%cĐã đăng ký xong môn của khóa " + document.getElementById("drpAcademicYear").innerText, "font-size:20px ; color:red;");

        nganhHienTai = document.querySelector("#drpAcademicYear");
        if (nganhHienTai.selectedIndex < nganhHienTai.length - 1 && nganhHienTai[nganhHienTai.selectedIndex + 1] != undefined) {
            console.log("sang ngành tiếp theo ... ");
            nganhHienTai.value = nganhHienTai[nganhHienTai.selectedIndex + 1].value;
            setTimeout('__doPostBack(\'drpAcademicYear\',\'\')', 0);
        }
    }
}

function HienThiLop() {
    $("input#btnViewCourseClass").click();
}

function ChonMon(object) {

    var o = object.childNodes[3];
    var tenMonHoc = o.innerText;
    for (i = 0; i < listLopDangKy.length; i++) {
        if (tenMonHoc === listLopDangKy[i]) {
            var tmp = object.childNodes[2].childNodes[1];
            SelectCourse(tmp);

            found = true;
            console.log("Đã chọn lớp " + tenMonHoc);
        }
    }


}

function getHTML(url,callBack) {
    return new Promise(function() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
              return callBack(xhttp.responseText);
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();

    });
}
