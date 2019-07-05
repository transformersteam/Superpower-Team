(function () {
    var aliCodeQrCallback = ""
    var codeQrCount = 0
    var codeQrmax = 10
    var codeQrIntervalId = null
    var wechartTimeID = null

    var model = {
        initial: function () {
            model.base_url = __url__;
            model.global();
            model.bind();
        },
        global: function () {
            model.user_page = new Vue({
                el: '#userIndex',
                data: {
                    username: null, // 用户名
                    user_mobile: null, // 手机号
                    photo: null, //用户头像
                    apiUrl: "",
                    userList: {},
                    user: null,
                    user_mobile_show: null,
                    user_password: null,
                    change_phone_code: null,
                    user_zfb: null, // 支付宝是否绑定
                    change_phone_codeFlag: false,
                    new_phone_code: null,
                    new_phone_codeFlag: true,
                    newPhoneNum: "",
                    newPhoneCode: "",
                    purpose: null,
                    change_password_code: null,
                    change_password_codeFlag: false,
                    zfb_user_name: "",
                    zfb_true_name: "",
                    zfb_code: "",
                    change_zfb_code: null,
                    aliCodeQr: "",
                    codeCallback: "",
                    userWechart: null,// 微信绑定验证
                    isWechat: false, // 微信弹框
                    wechartImg: '', //微信扫码绑定
                    wechartError: false, //微信超时弹框
                    isWechatSuccess: false, // 微信绑定成功
                    wechat_key: false,// 微信是否已绑定
                },
                mounted: function () {
                    this.$nextTick(function () { })
                },
                methods: {
                    changeMobile: function () {
                        if ($("#change_phone_code").text() == "发送验证码") {
                            $(".user-detail-box-phonemodifymsg").show();
                            $(".user-mask").show();
                        } else {
                            $(".user-detail-box-phonemodifyyz").show();
                            $(".user-mask").show();
                        }
                    },
                    bindMobile: function () {
                        $(".user-detail-box-phonemodify").show();
                        $(".user-mask").show();
                    },
                    sentOldPhone: function (purpose) {
                        this.purpose = purpose;
                        model.sentMessageQuery(this.user, this.user_mobile, 2)
                    },
                    resentCode: function () {
                        if (this.change_phone_codeFlag) {
                            this.change_phone_codeFlag = false;
                            model.sentMessageQuery(this.user, this.user_mobile, 2)
                        }
                    },
                    setNewCode: function () {
                        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
                        if ($.trim(this.newPhoneNum) == "") {
                            alert("电话号码不能为空");
                            $(".phonemodify-new-input").css("border-color", "red");
                        } else if (!myreg.test(this.newPhoneNum)) {
                            alert("电话号码有误");
                            $(".phonemodify-new-input").css("border-color", "red");
                        } else if (this.new_phone_codeFlag) {
                            this.new_phone_codeFlag = false;
                            $(".phonemodify-new-input").css("border-color", "#ddd");
                            model.sentMessageQuery(this.user, this.newPhoneNum, 1)
                        }
                    },
                    confirmCode: function () {
                        if ($.trim($("#phonemodifyyz_code").val()) != this.change_phone_code) {
                            $("#phonemodifyyz_code").addClass("passettel-iserror").siblings(".passettel-error").show();
                        } else {
                            $("#phonemodifyyz_code").removeClass("passettel-iserror").siblings(".passettel-error").hide();
                            $(".user-detail-box-phonemodifyyz").hide();
                            $(".user-detail-box-phonemodify").show();
                        }
                    },
                    confirmPhone: function () {
                        if ($.trim(this.newPhoneCode) != this.new_phone_code) {
                            $(".passettel-error").show();
                            $("#confirm_phone_code").addClass("passettel-iserror");
                        } else {
                            $(".passettel-error").hide();
                            $("#confirm_phone_code").removeClass("passettel-iserror");

                            model.bindPhoneQuery(this.newPhoneCode, this.user, this.newPhoneNum);
                        }
                    },
                    changePassword: function () {
                        if ($("#change_password_code").text() == "发送验证码") {
                            $(".user-detail-box-msgpush").show();
                            $(".user-mask").show();
                        } else {
                            $(".user-detail-box-passettel").show();
                            $(".user-mask").show();
                        }
                    },
                    confirmPasswordCode: function () {
                        if ($.trim($("#passettel_code").val()) != this.change_password_code) {
                            $("#passettel_code").addClass("passettel-iserror").siblings(".passettel-error").show();
                        } else {
                            $("#passettel_code").removeClass("passettel-iserror").siblings(".passettel-error").hide();
                            $(".user-detail-box-passettel").hide();
                            $(".user-detail-box-passet").show();
                        }
                    },
                    confirmNewPassword: function () {
                        var myreg = /^\d{6}$/;
                        var newPassword = $("#newPassword").val();
                        if ($.trim(newPassword) == "") {
                            alert("提现密码不能为空")
                        } else if (!myreg.test(newPassword)) {
                            alert("提现密码必须为六位数字")
                        } else if (newPassword != $("#confirmPassword").val()) {
                            alert("确认提现密码错误")
                        } else {
                            model.bindPasswordQuery(newPassword, $("#confirmPassword").val(), this.change_password_code, this.user, this.user_mobile)
                        }
                    },

                    // 绑定支付宝
                    getAlipayCode: function () {
                        var _that = this
                        var phoneNumber = this.user_mobile;
                        if (!phoneNumber) {
                            return alert("请绑定手机号")
                        }
                        jsonCall(model.base_url + "/Alipay/alipayZhiMaCreateQRcode/", { phone: phoneNumber }, "POST", function (res) {
                            model.user_page.aliCodeQr = res.body.url;

                            this.zfb_user_name = "";
                            this.zfb_true_name = "";
                            this.zfb_code = "";
                            $(".user-mask").show();
                            $(".user-detail-box-zfbbind").show();

                            function timeInterval() {
                                _that.callbackAliCodeQr();
                                codeQrCount++
                                if (codeQrCount == codeQrmax) {
                                    $(".user-detail-box-zfbbind").hide()
                                    $("#user-detail-zfb-box-error").show()
                                    clearInterval(codeQrIntervalId)
                                }
                            }
                            codeQrIntervalId = setInterval(timeInterval, 5000)
                        });
                    },

                    // 绑定微信
                    getweChartCode() {
                        // 判定手机号是否绑定
                        if (!this.user_mobile) {
                            return alert("请绑定手机号")
                        }
                        jsonCall(model.base_url + "/Alipay/createWeChatQRCode", { phone: this.user_mobile }, "POST", (res => {
                            if (res.code == 10000) {
                                this.isWechat = true;
                                $(".user-mask").show();
                                this.wechartImg = res.body.url;

                                var that = this;
                                // 定时器轮询扫码结果
                                function wechartTime() {
                                    // 调用绑定结果
                                    that.callbackWechartCodeQr();
                                    codeQrCount++;
                                    if (codeQrCount == codeQrmax) {
                                        that.isWechat = false;
                                        that.wechartError = true;
                                        // 清除轮询
                                        clearInterval(wechartTimeID)
                                    }
                                }
                                wechartTimeID = setInterval(wechartTime, 5000)
                            }
                        }))
                    },
                    // 点击关闭绑定微信弹窗
                    close() {
                        this.isWechat = false;
                        $(".user-mask").hide();
                        clearInterval(wechartTimeID)
                    },
                    closechaoshi() {
                        this.wechartError = false;
                        $(".user-mask").hide();
                        clearInterval(wechartTimeID)
                    },
                    closesuess() {
                        this.isWechatSuccess = false;
                        $(".user-mask").hide();
                        clearInterval(wechartTimeID)
                    },
                    // 支付宝绑定结果
                    callbackAliCodeQr() {
                        jsonCall(model.base_url + "/Customer/getOpenId/", {}, "GET", function (res) {
                            if (res.code == 10000) {
                                if (res.body.body && res.body.body.open_id) {
                                    clearQrInterval()
                                    $(".user-detail-box-zfbbind").hide();
                                    $(".user-detail-box-zfb").show();
                                }
                            } else {
                                // clearQrInterval()
                            }
                        }, function (err) {
                            clearQrInterval()
                        });

                        function clearQrInterval() {
                            if (codeQrIntervalId) {
                                clearInterval(codeQrIntervalId)
                                wechartTimeID = null;
                            }
                        }
                    },

                    // 微信绑定结果
                    callbackWechartCodeQr() {
                        jsonCall(model.base_url + "/Customer/getWeChatOpenId/", {}, "GET", (res) => {
                            console.log(res, "callbackWechartCodeQr")
                            if (res.code == 10000) {
                                if (res.body.body && res.body.body.open_id) {
                                    this.isWechat = false;
                                    this.isWechatSuccess = true;
                                    clearWechartTime();
                                    setTimeout(function () {
                                        location.reload()
                                    }, 200)
                                }
                            }
                        }, (err => {
                            clearWechartTime();
                        }))

                        function clearWechartTime() {
                            if (wechartTimeID) {
                                clearInterval(wechartTimeID)
                            }
                        }
                    },

                    confirmBindzfb: function () {
                        if ($.trim(this.zfb_user_name) == "") {
                            alert("请输入支付宝账号")
                        } else if ($.trim(this.zfb_true_name) == "") {
                            alert("请输入真实姓名")
                        } else if (!this.change_zfb_code) {
                            alert("请获取手机验证码")
                        } else if (this.change_zfb_code != this.zfb_code) {
                            alert("验证码错误")
                        } else {
                            model.bindzfbQuery($.trim(this.zfb_user_name), $.trim(this.zfb_true_name));
                        }
                    },
                    confirm: function () {
                        $(".user-detail-box").siblings().hide();
                    }
                },
                created: function () {
                    model.query();
                }
            });
        },

        // 查询用户信息
        query() {
            jsonCall(model.base_url + "/customer/doCheckLogin", {}, "get", (res => {
                if (res.body != "未登录") {
                    model.user_page.username = res.body.user_name; //用户名
                    model.user_page.user = res.body.user_id; //用户id
                    model.user_page.photo = res.body.photo; //用户头像

                    model.pageQuery(res.body.user_id);
                } else {
                    window.location.href = __url__ + "login/index";
                }
            }));

        },
        // 查询用户绑定状态 如支付宝/微信
        pageQuery(id) {
            jsonCall(model.base_url + "customer/doPageCustomerCenter", { "user_id": id }, "post", (res => {
                // console.log(res,"pageQuery===")
                if (res.body.mobile != 0) {
                    model.user_page.user_mobile = res.body.mobile;
                    if (res.body.mobile) {
                        model.user_page.user_mobile_show = res.body.mobile.substring(0, 3) + "****" + res.body.mobile.substring(7, 11);
                    }
                }
                // 0表示未绑定,1表示绑定
                if (res.body.ali_key != 0) {
                    model.user_page.user_zfb = res.body.ali_key;
                }
                if (res.body.wechat_key != 0) {
                    model.user_page.wechat_key = res.body.wechat_key;
                }
            }));
        },
        sentMessageQuery(id, mobile, type, purpose) {
            jsonCall(model.base_url + "customer/doSendMessageCode", { "user_id": id, "mobile": mobile, "type": type }, "post", function (res) {
                if (res.msg == "请求成功") {
                    if (res.body.code == 0) {
                        model.user_page.new_phone_codeFlag = true;
                        alert(res.body.msg);
                        return false;
                    }
                    if (type == 2) {
                        if (model.user_page.purpose == "phone") {
                            model.user_page.change_phone_code = res.body.code;
                            $(".user-detail-box").siblings().hide();
                            $(".user-detail-box-phonemodifyyz").show();
                            $(".user-mask").show();
                            var num = 60;
                            $("#change_phone_code").text(num + "s").removeClass("click");
                            var interval = setInterval(function () {
                                if (num > 0) {
                                    num--;
                                    $("#change_phone_code").text(num + "s");
                                } else {
                                    clearInterval(interval);
                                    $("#change_phone_code").text("发送验证码").addClass("click");
                                    model.user_page.change_phone_codeFlag = true;
                                    model.user_page.change_phone_code = "";
                                }
                            }, 1000)
                        } else if (model.user_page.purpose == "password") {
                            model.user_page.change_password_code = res.body.code;
                            $(".user-detail-box").siblings().hide();
                            $(".user-detail-box-passettel").show();
                            $(".user-mask").show();
                            var num3 = 60;
                            $("#change_password_code").text(num3 + "s");
                            var interval3 = setInterval(function () {
                                if (num3 > 0) {
                                    num3--;
                                    $("#change_password_code").text(num3 + "s").removeClass("click");
                                } else {
                                    clearInterval(interval3);
                                    $("#change_password_code").text("发送验证码").addClass("click");
                                    model.user_page.change_password_codeFlag = true;
                                    model.user_page.change_phone_codeFlag = true;
                                    model.user_page.change_password_code = "";
                                }
                            }, 1000)
                        } else if (model.user_page.purpose == "zfb") {
                            model.user_page.change_zfb_code = res.body.code;
                            var num4 = 60;
                            $("#change_zfb_code").text(num4 + "s").removeClass("codetrue");
                            var interval4 = setInterval(function () {
                                if (num4 > 0) {
                                    num4--;
                                    $("#change_zfb_code").text(num4 + "s")
                                } else {
                                    clearInterval(interval4);
                                    $("#change_zfb_code").text("发送验证码").addClass("codetrue");
                                    model.user_page.change_zfb_codeFlag = true;
                                    model.user_page.change_zfb_code = null;
                                }
                            }, 1000)
                        }

                    } else if (type = 1) {
                        model.user_page.new_phone_code = res.body.code;
                        var num2 = 60;
                        $("#new_phone_code").text(num2 + "s").removeClass("phonemodify-button");
                        var interval2 = setInterval(function () {
                            if (num2 > 0) {
                                num2--;
                                $("#new_phone_code").text(num2 + "s");
                            } else {
                                clearInterval(interval2);
                                $("#new_phone_code").text("获取").addClass("phonemodify-button");
                                model.user_page.new_phone_codeFlag = true;
                                model.user_page.new_phone_code = "";
                            }
                        }, 1000)
                    }

                }
            });
        },
        bindPhoneQuery: function (code, user_id, phone) {
            jsonCall(model.base_url + "customer/doBindPhone", { code: code, user_id: user_id, mobile: phone }, "post", function (res) {
                model.user_page.user_mobile = phone;
                var mobile = phone;
                mobile = mobile.substring(0, 3) + "****" + mobile.substring(7, 11);
                model.user_page.user_mobile_show = mobile;
                $(".user-detail-box").siblings().hide();
            });
        },
        bindPasswordQuery: function (password1, password2, code, user_id, mobile) {
            jsonCall(model.base_url + "customer/doBindPassword", { password1: password1, password2: password2, code: code, user_id: user_id, mobile: mobile }, "post", function (res) {
                $(".user-detail-box-passet").hide();
                $(".user-detail-box-passuss").show();
            });
        },
        bindzfbQuery: function (account, name) {
            jsonCall(model.base_url + "customer/doAddPayInfo", { account: account, name: name }, "post", function (res) {
                if (res.body.body.code == 1) {
                    $(".user-detail-box-zfbbind").hide();
                    $(".user-detail-box-zfb").show();
                    this.pageQuery(model.user_page.user);
                } else {
                    $(".user-detail-box-zfbbind").hide();
                    $(".user-detail-box-zfberror").show();
                }
            });
        },
        bind: function () {
            $(".user-detail-title-r").on("click", function () {
                $(".user-detail-box").siblings().hide();
            });
            $(".user-detail-box-zfb button").on("click", function () {
                $(".user-detail-box-zfb").hide();
                $(".user-mask").hide();
                location.reload();
            })
            $(".user-zfb-box-error button").on("click", function () {
                $(".user-zfb-box-error").hide();
                $(".user-mask").hide();
                // window.reload()
            })
        }
    };
    model.initial();
})();