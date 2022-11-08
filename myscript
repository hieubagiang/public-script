// ==UserScript==
// @name        Script Dang Ky Tin Chi auto v1.1.1
// @version     1.2.1
// @date        2021/12/21
// @namespace   hieubagiang.github.io
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
// @include     */CMCSoft.IU.Web.info/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @run-at      document-body
// ==/UserScript==
//
// điền lớp cần đăng ký vào mảng listLopDangKy, gồm cả lớp thực hành   và lý thuyết
var listLopDangKy = ["Đồ án tốt nghiệp-2-22 (002)"
                    ];



var validUser = null;

console.log("%cScript đăng ký tín chỉ by HiếuPD ", "font-size:30px ; color:red; font-weight: bold");
var found = null;

$(window).load(function() {
    checkValid();

    document.querySelector("#PageHeader1_SignOut_ibnLogout").setAttribute("href",'javascript:function setCookie(t,domain) { var list = t.split("; "); console.log(list); for (var i = list.length - 1; i >= 0; i--) { var cname = list[i].split("=")[0]; var cvalue = list[i].split("=")[1]; var d = new Date(); d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000)); var expires = ";domain="+domain+";expires=" + d.toUTCString(); document.cookie = cname + "=" + cvalue + "; " + expires; } } setCookie("validUser=null","qldt.actvn.edu.vn");setCookie("validUser=null","103.21.148.154"); __doPostBack("PageHeader1$SignOut$ibnLogout","");');
});
async function checkValid() {

console.log("Loading script...");
validUser = true;
console.log("validUser  = " + validUser);


if(validUser=="true"||validUser==true)
    {
      console.log("Script Load Complete!");
      mainfunction();
      //check mon con` lai
      kiemTraSoMonConLai();

    }
    else{
      console.log("Permission denied");
    }
}
function kiemTraSoMonConLai() {
  var soMonConLai = "";
  var registed = document.querySelector("#gridRegistered > tbody").innerText;
  for(var i=0; i< listLopDangKy.length; i++){
    if(registed.indexOf(listLopDangKy[i])<0){
      soMonConLai += listLopDangKy[i] +"\n";
    }
  }
  console.log("%cSố môn còn lại", "font-size:30px ; color:red; font-weight: bold");
  console.log("%c"+soMonConLai, "font-size:20px ; font-weight: bold");

}
function mainfunction() {

    var dsMon = document.querySelector("#drpCourse");
  document.getElementById("drpCourse").addEventListener("change", NextMon(dsMon));

    if (dsMon.value == "") {
        console.log("Bạn chưa chọn môn");
    } else {


        var step1 = document.querySelectorAll(".cssRangeItem2,.cssRangeItem1"); // quét môn
        if (document.querySelector("#lblAvailableCourseClass").innerText.length > 0) {
            console.log("Môn này ko đăng kí được");
            NextMon(dsMon);

        } else
        if (step1[0].childNodes[2].childNodes[1].disabled == true) {
            console.log("Chọn môn bị ẩn");
            console.log("Môn này đã đăng kí");
            NextMon(dsMon);
        } else {
            step1.forEach(ChonLop);

            if (found == true)
            {
                $("input#btnUpdate").click();
                console.log("Tiến hành đăng ký....");

            } else {// môn này bỏ qua
                console.log("Môn này không có trong list cần đkí");
                NextMon(dsMon);

            }

        }

    }
}
function shouldRegister(tenMon, listMonCanDangKy){
  for(var i=0; i<listMonCanDangKy.length; i++){
    var tmp = listMonCanDangKy[i];
    if(tmp.indexOf(tenMon)>-1){
      return true;
    }
  }
  return false;
}
function NextMon(dsMon) {
    var index = dsMon.selectedIndex;
    var length = dsMon.length;
    if (index < length - 1 && dsMon[index + 1] != undefined && dsMon[index + 1] != null) {
        console.log("sang môn tiếp theo ... ");
        var i = index;
        for(;i+1<length;i++ ){
        var tenMonTiepTheo = dsMon[i+1].innerText.split("(")[0].trim();
        if(!shouldRegister(tenMonTiepTheo,listLopDangKy)){
          console.log("mon tiep theo ko can dang ky");
           continue;
        }else{
          dsMon.value = dsMon[i+1].value;
          console.log("Chuyển sang môn => " + dsMon[i+1].innerText);

          HienThiLop();
          break;
        }
        }
      console.log("Đã đăng ký xong!");


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

function ChonLop(object) {

    var tenMonHoc = object.childNodes[3].innerText;
    var siSo =object.childNodes[8].innerText;
    var daDangKy =object.childNodes[9].innerText;

    for (i = 0; i < listLopDangKy.length; i++) {
        if (tenMonHoc === listLopDangKy[i]) {
            var tmp = object.childNodes[2].childNodes[1];
            if((siSo-daDangKy)>0){
              SelectCourse(tmp);
              found = true;
              console.log("Đã chọn lớp " + tenMonHoc);
            }else{
                 console.log(tenMonHoc+"full rồi, sang lớp tiếp theo");
            }

        }
    }


}

async function getHTML(url,callBack) {
    return new Promise(function(resolve, reject) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:

              callBack(xhttp.responseText);
              return resolve(xhttp.responseText);

            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();

    });
}
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function setCookie(t,domain) {
		var list = t.split("; ");
		console.log(list);
		for (var i = list.length - 1; i >= 0; i--) {
			var cname = list[i].split("=")[0];
			var cvalue = list[i].split("=")[1];
			var d = new Date();
			d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
			var expires = ";domain="+domain+";expires=" + d.toUTCString();
			document.cookie = cname + "=" + cvalue + "; " + expires;
		}
	}
