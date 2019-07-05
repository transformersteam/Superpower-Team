var DEFAULT_VERSION = 8.0;
var ua = navigator.userAgent.toLowerCase();
var isIE = ua.indexOf("msie")>-1;
var safariVersion;
if(isIE){
	safariVersion =  ua.match(/msie ([\d.]+)/)[1];
}
if(safariVersion <= DEFAULT_VERSION ){
	(function() {
		var model = {
			initial: function() {
				model.base_url = __url__;
				document.cookie = parseInt(Math.random() * 2000);
				setCookie("code", parseInt(Math.random() * 2000));
			},
			global: function() {

			},
			query: function() {
				jsonCall(__url__+"index/getAddress",{},"post",function (res) {

				});
			},
			searchHotQuery:function (keywords,num) {
				jsonCall(__url__+"goods/getSearchHotProduct ",{size:8,keywords:encodeURIComponent(keywords)},"post",function (res) {

				});
			},
			checkTop:function(){

			},
			bind: function() {

			}

		};
		model.initial();
	})();
}else{
	$(function() {
		var model = {
			initial: function() {
				model.base_url = __url__;
				model.username="";
				model.serviceList={
					sn:"",
					totPrice:""
				};
				model.loginQuery();
				document.cookie = parseInt(Math.random() * 2000);
				setCookie("code", parseInt(Math.random() * 2000));
				this.global();
				model.query();
				this.bind();
			},
			global: function () {

				if (localStorage.getItem("orderAmount") == null) {
					localStorage.setItem("orderAmount", 0);
				}
				$(window).scroll(function () {
					if ($(window).scrollTop() > 280) {
						/*$(".header-fixed").addClass("header-move");*/
						// $("#goTop").css("height", "84px");
						$("#goTop").css("height", "54px");
						$("#goTop").css("padding", "12px 14px");
						// $("#goTop i").css("height", "42px");
						$("#goTop i").css("height", "30px");
						$(".nav .search>.input-form>.dropdown").hide();
						$(".panda_img").css("top", "40px;")
					} else {
						/*$(".header-fixed").removeClass("header-move");*/
						$("#goTop").css("height", "0px");
						$("#goTop").css("padding", "0");
						$("#goTop i").css("height", "0px")
						$(".header-fixed .nav .search>.input-form>.dropdown").hide();
					}
				});
				// model.singleSelect1 = $('#single-select-1').citySelect({
				// 	dataJson: cityData,
				// 	multiSelect: false,
				// 	whole: true,
				// 	shorthand: false,
				// 	search: true,
				// 	onInit: function () {
				// 	},
				// 	onTabsAfter: function (target) {
				//          //console.log("asdf");

				// 	},
				// 	onCallerAfter: function (target, values) {

				//         $citystr=values.name+';'+values.id+';'+values.parentId+';';
				//         var start=$.cookie('citydata',$citystr,{ path: '/' });

				// 	}
				// });
				// 单选设置城市
				/*model.search = new Vue({
					el: '.header-main-search',
					data: {
						hotList:[],
						searchDetail:""
					},
					methods:{
						getHot:function (event) {
							var _this=event.currentTarget;
							event.stopPropagation();
							$(_this).siblings(".dropdown").show();
							model.searchHotQuery(this.searchDetail,1);
						},
						searchHot:function (evt) {
							evt = (evt) ? evt : ((window.event) ? window.event : ""); //兼容IE和Firefox获得keyBoardEvent对象
							var key = evt.keyCode?evt.keyCode:evt.which; //兼容IE和Firefox获得keyBoardEvent对象的键值
							if (key == 13){
								this.search_goods();
							}
							model.searchHotQuery(this.searchDetail,1);
						},
						search_goods:function () {
							if($.trim(this.searchDetail)==""){
								window.location.href= emptyUrl;
							}else{
								var searchKeyword={
									type:"search",
									val:$.trim(this.searchDetail)
								};
								sessionStorage.setItem("searchKeyword",JSON.stringify(searchKeyword));
								window.location.href= issetUrl;
							}
						}
					},
					created: function() {
						if(sessionStorage.getItem("searchKeyword")){
							if($("main").attr("id")=="select"){
								this.searchDetail=JSON.parse(sessionStorage.getItem("searchKeyword")).val;
							}
						}
					}
				});
				model.search2 = new Vue({
					el: '.header-main-search2',
					data: {
						hotList:[],
						searchDetail:""
					},
					methods:{
						getHot:function (event) {
							var _this=event.currentTarget;
							event.stopPropagation();
							$(_this).siblings(".dropdown").show();
							model.searchHotQuery(this.searchDetail,2);
						},
						searchHot:function (evt) {
							evt = (evt) ? evt : ((window.event) ? window.event : ""); //兼容IE和Firefox获得keyBoardEvent对象
							var key = evt.keyCode?evt.keyCode:evt.which; //兼容IE和Firefox获得keyBoardEvent对象的键值
							if (key == 13){
								this.search_goods();
							}
							model.searchHotQuery(this.searchDetail,2);
						},
						search_goods:function () {
							if($.trim(this.searchDetail)==""){
								window.location.href= emptyUrl;
							}else{
								var searchKeyword={
									type:"search",
									val:$.trim(this.searchDetail)
								};
								sessionStorage.setItem("searchKeyword",JSON.stringify(searchKeyword));
								window.location.href= issetUrl;
							}
						}
					},
					created: function() {
						if(sessionStorage.getItem("searchKeyword")){
							if($("main").attr("id")=="select"){
								this.searchDetail=JSON.parse(sessionStorage.getItem("searchKeyword")).val;
							}
						}
					}
				});*/
				model.search3 = new Vue({
					el: '.headercensearchwrap',
					data: {
						hotList:[],
						searchDetail:""
					},
					methods:{
						getHot:function (event) {
							var _this=event.currentTarget;
							event.stopPropagation();
							$('.headercensearchform').addClass('headercensearchformactive');
							model.searchHotQuery(this.searchDetail,1);
						},
						getHotBlur() {
							setTimeout(() => {
								$('.headercensearchform').removeClass('headercensearchformactive');
							}, 150);
						},
						searchHot:function () {
							model.searchHotQuery(this.searchDetail,1);
						},
						search_goods:function (e) {
							if(this.searchDetail == ""){

							}else{
								var searchKeyword={
									type:"search",
									val:$.trim(this.searchDetail)
								};
								sessionStorage.setItem("searchKeyword",JSON.stringify(searchKeyword));
								window.location.href= issetUrl;
							}
						}
					},
					created: function() {

					}
				});
			},
			query: function () {
				jsonCall(__url__ + "index/getAddress", {}, "post", function (res) {
					$('#single-select-1').text(res.body.city);
				});
				jsonCall(__url__ + "Index/getAddressAll", {}, "get", function (res) {
					if(res){
						var data = JSON.parse(res),
							html = [];
						for(var i=0;i<data.body.length;i++){
							html.push('<li>'+data.body[i].name+'</li>');
						}
						$('.hot-city ul').html(html.join(''));
					}
				});
			},
			loginQuery: function () {
				jsonCall(model.base_url + "/customer/doCheckLogin", {}, "get", function (res) {
					if(res.body !="未登录"){
						model.username=res.body.user_name;
					}
					if(JSON.parse(sessionStorage.getItem("serviceList"))){
						model.serviceList=JSON.parse(sessionStorage.getItem("serviceList"));
					}


					$.ajax({
						url: "//dl.ntalker.com/js/xn6/ntkfstat.js?siteid=kf_10263",
						dataType: 'script',
						method:'get',
						cache: true, // 必须
						success: function() {
							console.log('NTKF is success....')
						}
					});
					var ipaddress=getareacoding();
					var goodid=$.cookie('goodids');
					NTKF_PARAM = {
							siteid:"kf_10263",                    //企业ID，为固定值，必填
							settingid:ipaddress,    //接待组ID，为固定值，必填
							uid:model.username,                              //用户ID，支持字母、数字、下划线。未登录可以为空，但不能给null，uid赋予的值在显示到小能客户端上
							uname:model.username,                            //未登录可以为空，但不能给null，uname赋予的值显示到小能客户端上
							orderid:model.serviceList.sn,                //orderid：(选填)订单号
							orderprice:model.serviceList.totPrice,
							/*测试数据写死*/
							itemid:goodid
					};
				});
			},
			searchHotQuery:function (keywords,num) {
				jsonCall(__url__+"goods/getSearchHotProduct ",{size:8,keywords:encodeURIComponent(keywords)},"post",function (res) {
					if(num==1){
						model.search.hotList=res.body.body;
						model.search3.hotList=res.body.body;
					}else{
						model.search2.hotList=res.body.body;
					}
				});
			},
			checkTop:function(){
				var sc = $(window).scrollTop();
				if(sc > 400) {
					$("#goTop").removeClass('live')
				} else {
					$('.header-main-search input').siblings('.dropdown').css('display', 'none');
					$('.header-main-search input').blur();
					$("#goTop").addClass('live')
				}
			},
			bind: function() {
				setTimeout(function(){
					model.checkTop();
					$(window).scroll(function() {
						model.checkTop();
					});
					$("#goTop").click(function(){
						$('body,html').animate({
							"scrollTop": 0
						}, 300);
					});
				},1);
				$('.header-main-search > .input-form > input').on("keyup",function () {
					if($(this).val()==""){
						var _this=$(this);
						setTimeout(function () {
							_this.siblings(".dropdown").show();
						},300)
					}
				});
				$(document).click(function () {
					$(".header-main-search > .input-form > .dropdown").hide();
				})
			}

		};
		model.initial();
	});

	/*var recyclingCarVue = new Vue({
		el: '#recycling-car',
		data: {
			orderList: JSON.parse(localStorage.getItem("orderList")),
			orderAmount: 0,
			totalPrice: 0
		},
		watch: {
			orderList:function(val){
				var totalPrice = 0;
				$.each(val, function(index, value) {
					totalPrice += Number(value.price)
				});
				this.totalPrice = totalPrice;
				this.orderAmount=val.length;
				$(".recycling-car-detail").show();
				$(".recycling-car-empty").hide();
			}
		},
		created: function() {
			var totalPrice = 0;
			if(this.orderList) {
				$.each(this.orderList, function(index, value) {
					totalPrice += Number(value.price)
				});
				this.totalPrice = totalPrice;
				this.orderAmount=this.orderList.length;
			}

			if(this.orderAmount == 0) {
				$(".recycling-car-detail").hide();
				$(".recycling-car-empty").show();
			}
		}
	});*/
}
function refreshVerify(_this) {
	var ts = Date.parse(new Date())/1000;
	$("#refreshVerify").attr("src", url+"?id="+ts);
}
var searchList = [];
function GetRequest() {
	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if(url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}
function Base64() {
	// private property
	_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

	// public method for encoding
	this.encode = function(input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
		input = _utf8_encode(input);
		while(i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if(isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if(isNaN(chr3)) {
				enc4 = 64;
			}
			output = output +
				_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
				_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
		}
		return output;
	};
	// public method for decoding
	this.decode = function(input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		while(i < input.length) {
			enc1 = _keyStr.indexOf(input.charAt(i++));
			enc2 = _keyStr.indexOf(input.charAt(i++));
			enc3 = _keyStr.indexOf(input.charAt(i++));
			enc4 = _keyStr.indexOf(input.charAt(i++));
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			output = output + String.fromCharCode(chr1);
			if(enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if(enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
		}
		output = _utf8_decode(output);
		return output;
	}

	// private method for UTF-8 encoding
	_utf8_encode = function(string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";
		for(var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if(c < 128) {
				utftext += String.fromCharCode(c);
			} else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}
		return utftext;
	}

	// private method for UTF-8 decoding
	_utf8_decode = function(utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while(i < utftext.length) {
			c = utftext.charCodeAt(i);
			if(c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i + 1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i + 1);
				c3 = utftext.charCodeAt(i + 2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	}
}
String.prototype.str_replace = function(findstrs, replacestrs) {
	var len = findstrs.length;
	var str = this.toString();
	for(var i = 0; i < len; i++) {
		var temp = findstrs[i];
		if(temp == "+" || temp == "=" || temp == "/")
			eval("var re = /\\" + temp + "/g;");
		else
			eval("var re = /" + temp + "/g;");
		str = str.replace(re, replacestrs[i]);
	}
	return str;
};
String.prototype.str_split = function(len) {
	var strlen = this.length;
	var str = this.toString();
	if(typeof len == "undefined" || len == 0 || len == 1) {
		return this.split("");
	}
	var count = Math.ceil(strlen / len);
	var reArray = [];
	for(var i = 0; i < count; i++) {
		reArray[i] = str.slice(i * len, i * len + len);
	}
	return reArray;
};
function decode(str, key) {
	var strArr = str.str_replace(["O0O0O", "o000o", "oo00o"], ["=", "+", "/"]);
	strArr = strArr.str_split(2);
	var len = strArr.length;
	var keyArr = key.str_split();
	for(var k in keyArr) {
		if(k <= len && typeof(strArr[k]) != "undefined" && strArr[k][1] == keyArr[k]) {
			strArr[k] = strArr[k][0];
		}
	}
	strArr = strArr.join("");
	var Base = new Base64();
	var str = Base.decode(strArr);
	str = decodeURIComponent(str);
	return str;
}
function encode(str, key) {
	var Base = new Base64();
	var str = Base.encode(str);
	var strArr = str.str_split("");
	var len = strArr.length;
	var keyArr = key.str_split(0);
	for(var k in keyArr) {
		if(k < len) {
			strArr[k] += keyArr[k];
		}
	}
	strArr = strArr.join("");
	strArr = strArr.str_replace(["=", "+", "/"], ["O0O0O", "o000o", "oo00o"]);
	return strArr;
}
String.prototype.trim=function(){
	return this.replace(/(^\s*)|(\s*$)/g, "");
};
function jsonCall(url, data, type, successCallBack) {
	$.ajax({
		url: url,
		data: data,
		type: type,
		dataType: "text",
		success: function(res, status, xhr) {
			var code = xhr.getResponseHeader('content-text');
			if(code != null) {
				var str = decode(res, code).str_replace(["+","x2b","x2B"],[" ","+","+"]);
				res = JSON.parse(str);
			} else {
				res = JSON.parse(res);
			}
			successCallBack(res);
		},
		error: function(data) {
		}
	});
}
function setCookie(name, value, seconds) {
	seconds = seconds || 0; //seconds有值就直接赋值，没有为0，这个根php不一样。
	var expires = "";
	if(seconds != 0) { //设置cookie生存时间
		var date = new Date();
		date.setTime(date.getTime() + (seconds * 1000));
		expires = "; expires=" + date.toGMTString();
	}
	document.cookie = name + "=" + escape(value) + expires + "; path=/"; //转码并赋值
}
function getContentInfo(_this){
	var action = _this.attr("data-action");
	var _method =  _this.attr("data-method");
	var aid = _this.attr('data-id');
	window.location.href = __url__ + action + "/" + _method + "?id="+aid+".html";
}
(function(){
	var bp = document.createElement('script');
	var curProtocol = window.location.protocol.split(':')[0];
	if (curProtocol === 'https') {
		bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
	}
	else {
		bp.src = 'http://push.zhanzhang.baidu.com/push.js';
	}
	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(bp, s);
})();
var _hmt = _hmt || [];
/* (function() {
	var hm = document.createElement("script");
	hm.src = "https://hm.baidu.com/hm.js?4e2861c19c6869e5edd572d25b9cecb0";
	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(hm, s);
})(); */

(function(b,a,e,h,f,c,g,s){b[h]=b[h]||function(){(b[h].c=b[h].c||[]).push(arguments)};
	b[h].s=!!c;g=a.getElementsByTagName(e)[0];s=a.createElement(e);
	s.src="//s.union.360.cn/"+f+".js";s.defer=!0;s.async=!0;g.parentNode.insertBefore(s,g)
})(window,document,"script","_qha",279490,false);

(function(root) {
	root._tt_config = true;
	var ta = document.createElement('script'); ta.type = 'text/javascript'; ta.async = true;
	ta.src = document.location.protocol + '//' + 's1.pstatp.com/bytecom/resource/track_log/src/toutiao-track-log.js';
	ta.onerror = function () {
		var request = new XMLHttpRequest();
		var web_url = window.encodeURIComponent(window.location.href);
		var js_url  = ta.src;
		var url = '//ad.toutiao.com/link_monitor/cdn_failed?web_url=' + web_url + '&js_url=' + js_url + '&convert_id=1613809762779181';
		request.open('GET', url, true);
		request.send(null);
	};
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ta, s);
})(window);

// 登陆
$(".noDrop").click(function(){
	$(".login-frame").show();
	$(".mask").show();
});
$(".index-close").on("click",function(){
	$(".login-frame").hide();
	$(".mask").hide();
});
$(".phone").keyup(function(){
	var value = $(this).val();
	if(value.length==11){
		if(!check_mobile(value)){
			$(".errorphone").text("您输入的手机号码有误");
			$(".errorphone").parent().addClass("error-input");
			return false;
		}else{

			return false;
		}
	}
	var  iscode=$("#yzmcode").attr('iscode');

	if(iscode!=1){
        $("#sendmsg>input").removeClass("logintrue");
	}
	//$("#sendmsg>input").removeClass("logintrue");
	$(".errorphone").text("");
	$(".errorphone").parent().removeClass("error-input");

});

var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount;//当前剩余秒数
var code = ""; //验证码
var codeLength = 6;//验证码长度
var codeFlag=true;
$("#yzm").keyup(function () {
	var value=$(this).val();
	if(value.length==4){
		$("#sendmsg>input").addClass("logintrue");
	}else{
		$("#sendmsg>input").removeClass("logintrue");
	}
});
$('#sendmsg').click(function () {

	var phone = $(".phone").val();
	if(!phone){
		$(".errorphone").text("请输入您的手机号码");
		$(".errorphone").parent().addClass("error-input");
		return false;
	}
	if(!check_mobile(phone)){
		$(".errorphone").text("您输入的手机号码有误");
		$(".errorphone").parent().addClass("error-input");
		return false;
	}
	$(".errorphone").text("");
	$(".errorphone").parent().removeClass("error-input");
	if(code!=1){
		if(codeFlag){
			codeFlag=false;
			var  mobliesy = $(".phone").val();
			var  yzm = $.trim($("#yzm").val());
			var  iscode=$("#yzmcode").attr('iscode');


			if(iscode!=1){
				if(yzm == ''){
                    codeFlag=true;
                    code='';
                    alert('请输入验证码');
                    return false;
				}
			}
			$.ajax({
				type: "POST",
				url: "/login/sendSomethingToMyDear",
				data: {"mobile":mobliesy,'yzm':yzm},
				success: function (data) {
					codeFlag=true;
					//data.result && data.result.success
					if(data.code==10000){
						curCount = count;
						//设置button效果，开始计时
						$("#sendmsg").attr("disabled", "true");
						$("#sendmsg>input").removeClass("logintrue");
						$("#sendmsg>input").val( curCount + "秒");
						InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
						code=1;
						layer.msg('验证码已发送！');
					}else{
						code='';
						alert(data.msg);
						return false;
					}
				},
				dataType: 'json'
			});
		}
	}
	return false;
});


function SetRemainTime() {
	if (curCount == 0) {
		window.clearInterval(InterValObj);//停止计时器
		$("#sendmsg").removeAttr("disabled");//启用按钮
		$("#sendmsg>input").val( "重发验证码").addClass("logintrue");
		code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效
	}
	else {
		curCount--;
		$("#sendmsg>input").val( curCount + "秒");
	}
}

$(document).keyup(function(event){
	if(event.keyCode ==13){
		submitForm();
	}
});
function submitForm(){
	var code = $('#verifycode').val();
	var phone = $('.phone').val();
	if(code == ''){
		$(".errorcode").text("请输入验证码!");
		$(".errorcode").parent().addClass("error-input");
		return false;
	}
	if(phone == ''){
		$(".errorphone").text("请输入手机号!");
		$(".errorphone").parent().addClass("error-input");
		return false;
	}
	$(".errorcode").parent().removeClass("error-input");
	$(".errorphone").parent().removeClass("error-input");
	$.post("/Login/login",{code:code,phone:phone},function(data){
		//return false;
		if(data.code != 10000){
			alert(data.msg);
    } else{
			document.location = '/index/pageIndex';
		}
	},'json')
}

$("#verifycode").keyup(function(){
	checkMobile();
})

//手机号码登录
function checkMobile(){
	var url         =   "/Login/checkverifycode";
	var mobile      =   $('.phone').val();
	var verifycode  =   $.trim($("#verifycode").val());
	if(!check_mobile(mobile)){
		$(".errorphone").text("您输入的手机号码有误");
		$(".errorphone").parent().addClass("error-input");
		$(".phone").focus();
		return false;
	}
	$(".errorphone").text("");
	$(".errorphone").parent().removeClass("error-input");

	if(!verifycode){
		$(".errorcode").text("请输入正确的验证码");
		$(".errorcode").parent().addClass("error-input");
		$(".errorcode").focus();
		return false;
	}
	$(".errorcode").text("");
	$(".errorcode").parent().removeClass("error-input");
	var code_length = $("#verifycode").val().length;
	if(code_length==6){
		$.post(url,{'mobile':mobile,'code':verifycode},function(data){
			if(data.code!=10000){
				$(".errorcode").text("您输入的验证码有误");
				$(".errorcode").parent().addClass("error-input");
				return false;
			}else{
				$(".errorcode").text("");
				$(".errorcode").parent().removeClass("error-input");
				return true;
			}
		},"json");
	}
}

/*验证手机号*/
function	check_mobile(mobile){
	var flag	=	false;
	var value	=	$.trim(mobile);
	//myreg		=	/^(13[0-9]{9})|(14[0-9]{9})|(15[0-9]{9})|(18[0-9]{9})$/
	myreg		=	/^(1[3|4|5|6|8|7|9][0-9]{9})$/;
	if(myreg.test(value))	flag	=	true;

	return flag;
}

//头部选择城市切换
(function () {
	var cityCache = {};//缓存城市
	var regionSelect = $(".region-pop");//dom

	var refreshCityList = function (data) {//重置城市列表
		var container = regionSelect.find(".city-list");
		container.html("");
		$.each(data, function (i, city) {
			var liElement = $("<li />");
			liElement.data("id", city.Id);
			liElement.text(city.Name);
			liElement.click(function () {
				changeCity($(this).attr("data-area"));
			});
			if (i == 0) {
				liElement.addClass('selected');
			}
			liElement.appendTo(container);
		});
	};
	$(document).on('click','.hot-city li',function(){
		$('#single-select-1').text($(this).text());
        var areaname=$(this).text();
		var phparea=$('.li_selected').eq(0).html();
        $citystr=areaname+';'+phparea;
        $.cookie('citydata',$citystr,{ path: '/' })

	}).on('click','.city-list li',function(){
		$('#single-select-1').text($(this).text());
		var areaname=$(this).text();
        var phparea=$('.li_selected').eq(0).html();
        $citystr=areaname+';'+phparea;
        $.cookie('citydata',$citystr,{ path: '/' })

	});

	regionSelect.find(".alphabet-list").find("li").click(function () {
		var element = $(this);
		if (element.hasClass("li_selected"))
			return;
		else {
			element.siblings(".li_selected").removeClass("li_selected");
			element.addClass("li_selected");
			var character = element.text();
			if (cityCache[character]) {
				refreshCityList(cityCache[character]);
			}
			else {
				getAddressAllInfo($(this).text());
			}
		}
	});
	var getAddressAllInfo = function(area){
		var area = area?area:'a';
		jsonCall("/Index/getAddressAllInfo", {  'area': area.toLowerCase() }, "get", function (res) {
			if(res){
				var data = JSON.parse(res),
				html = [];
				for(var i=0;i<data.body.length;i++){
					html.push('<li>'+data.body[i].name+'</li>');
				}
				$('.city-list').html(html.join(''));
			}
		});
	}
	getAddressAllInfo('');
})();


