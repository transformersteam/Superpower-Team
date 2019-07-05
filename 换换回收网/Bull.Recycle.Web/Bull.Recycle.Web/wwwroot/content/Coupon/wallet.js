var userName = '';	//用户手机号码
var bind_num = 0;
var int;
(function () {
    var model = {
        initial: function () {
            model.base_url = __url__;
            model.global();
            model.bind();
        },
        global: function () {
            model.wallet_page = new Vue({
                el: '#wallet',
                data: {
                    user_id: null,
                    user_phone: null,
                    apiUrl: "",
                    username: null,
                    photo: null,
                    walletList: [],
                    statusList: {
                        1: "未提现",
                        2: "提现中",
                        3: "提现成功",
                        4: "提现失败"
                    },
                    count: null,
                    money: null,
                    true_money: null,
                    empty: true,
                    company: null,
                    open_id: null,
                    nick_name: null,
                    phone_codeFlag: true,
                    phone_code: null,
                    img: null,
                    hasCoupon: false,
                    couponList: [],
                    couponCount: 0,
                    couponCount2: 0,
                    is_use: 1,

                    usableCoupons: [], // 可用加价券
                    UnusableCoupons: [], // 不可用加价券
                    lookMores: false
                },
                created: function () {
                    model.query();
                },
                methods: {
                    toWallettx: function () {
                        if (this.true_money != 0) {
                            jsonCall(model.base_url + "customer/doCheckPayPass", { user_id: this.user_id }, "get", function (res) {
                                if (res.body.status == 2) {
                                    window.location.href = __url__ + "wallet/pageWallettxpay"
                                } else {
                                    $(".confirm-dialog").show();
                                }
                            });
                        }
                    },
                    confirmSet: function () {
                        window.location.href = __url__ + "customer/pageuser"
                    },
                    closeDialog: function () {
                        $(".confirm-dialog").hide();
                    },
                    untieBank: function () {
                        $(".unionPay-relieve").show();
                        $(".mask").show();
                    },
                    getWithdrawTime: function (sn) {
                        sessionStorage.setItem("checkSn", sn);
                        window.location.href = __url__ + "wallet/pageWallettx"
                    },
                    getCode: function () {
                        if (this.phone_codeFlag) {
                            this.phone_codeFlag = false;
                            jsonCall(__url__ + "customer/doSendMessageCode", { "user_id": this.user_id, mobile: this.user_phone, type: 2 }, "post", function (res) {
                                model.wallet_page.phone_code = res.body.code;
                                var num = 60;
                                $("#phone_code").text(num + "s").removeClass("codetrue");
                                var interval = setInterval(function () {
                                    if (num > 0) {
                                        num--;
                                        $("#phone_code").text(num + "s");
                                    } else {
                                        clearInterval(interval);
                                        $("#phone_code").text("发送验证码").addClass("codetrue");
                                        model.wallet_page.phone_codeFlag = true;
                                        model.wallet_page.phone_code = null;
                                    }
                                }, 1000)
                            })
                        }
                    },
                    confirmDelete: function () {
                        if (!this.phone_code) {
                            alert("请获取验证码")
                        } else if (!$("#code").val()) {
                            alert("请输入验证码")
                        } else if (this.phone_code != $("#code").val()) {
                            alert("验证码错误")
                        } else {
                            model.untieBankQuery();
                        }
                    },
                    couponTab: function (n, event) {
                        this.is_use = n;
                        var _this = event.currentTarget;
                        $(_this).addClass("active").siblings().removeClass("active");
                        if (n == 1 && this.couponCount == 0) {
                            $(".coupon-content .empty").show();
                        } else if (n == 2 && this.couponCount2 == 0) {
                            $(".coupon-content .empty").show();
                        } else {
                            $(".coupon-content .empty").hide();
                        }
                    },
                },
                computed: {
                    couponLists() {
                        if (this.lookMores == false) {
                            var couponLists = [];
                            if (this.couponList.length > 8) {
                                for (var i = 0; i < 8; i++) {
                                    couponLists.push(this.couponList[i])
                                }
                            } else {
                                couponLists = this.couponList
                            }
                            return couponLists;
                        } else {
                            return this.couponList;
                        }
                    },
                    word: function () {
                        if (this.lookMores == false) {
                            return '查看更多'
                        } else {
                            return '点击收起'
                        }
                    }
                },
            });
        },
        query: function () {
            jsonCall(model.base_url + "/customer/doCheckLogin", {}, "get", function (res) {
                if (res.body != "未登录") {
                    userName = res.body.user_name;
                    model.wallet_page.username = res.body.user_name;
                    model.wallet_page.user_phone = res.body.mobile;
                    model.wallet_page.photo = res.body.photo;
                    model.wallet_page.user_id = res.body.user_id;
                    model.pageQuery(res.body.user_id);
                    model.couponQuery(res.body.mobile);
                    model.bindQuery();	//判断是否绑定过第三方支付

                    // 用户登录,查询加价券
                    jsonCall(model.base_url + '/activity/getActivityByUser', { user: model.wallet_page.user_phone, type: 2 }, 'post', (res => {
                        if (res.code == 10000) {
                            model.wallet_page.couponList = res.body.body.couponlist;
                        }
                    }))

                } else {
                    window.location.href = __url__ + "login/index";
                }
            });
        },
        bindQuery: function () {
            var parmss = {
                phone: userName
            };
            $.ajax({
                url: "http://testpc.hhyp58.com/Authorland/getBindsucess",
                data: parmss,
                type: "post",
                dataType: "text",
                success: function (res, status, xhr) {
                    if (res != '' || res != null) {
                        var code = xhr.getResponseHeader('content-text');
                        if (code != null) {
                            var str = decode(res, code).str_replace(["+", "x2b", "x2B"], [" ", "+", "+"]);
                            res = JSON.parse(str);
                        } else {
                            res = JSON.parse(res);
                        }
                        if (bind_num == 0) {
                            var wx_id = res.body.wx_id;
                            var zfb_id = res.body.zfb_id;
                            bind_num = 1;
                        } else {
                            var wx_ids = res.body.wx_id;
                            var zfb_ids = res.body.zfb_id;
                        }
                        if (wx_id != undefined || wx_ids != undefined) {
                            $("#bind-wx").unbind();
                            $("#bind-wx").addClass("on");
                            $("#bind-wx").find("p").text("已绑定微信");
                            $("#bind-wx").find("img").attr("src", "/public/Content/Images/wallet/wx_on.png");
                        }
                        if (zfb_id != undefined || zfb_ids != undefined) {
                            $("#bind-zfb").unbind();
                            $("#bind-zfb").addClass("on");
                            $("#bind-zfb").find("p").text("已绑定支付宝");
                            $("#bind-zfb").find("img").attr("src", "/public/Content/Images/wallet/zfb_on.png");
                        }
                        if (wx_id != wx_ids || zfb_id != zfb_ids) {
                            clearInterval(int);
                        }
                    }
                },
                error: function (data) {
                }
            });
        },
        couponQuery: function (phone) {
            jsonCall(model.base_url + 'activity/getActivityByUser', { user: phone }, "POST", function (res) {
                if (res.body.length != 0) {
                    model.wallet_page.hasCoupon = true;
                    var couponCount = 0;
                    var couponCount2 = 0;
                    $.each(res.body, function (index, val) {
                        if (val.is_use == 1) {
                            couponCount++;
                        } else if (val.is_use == 2) {
                            couponCount2++;
                        }
                        (new Date(val.end_time).getTime() - new Date().getTime() < 0) ? val.dateout = true : val.dateout = false;
                    });
                    if (couponCount == 0) {
                        $(".coupon-content .empty").show();
                    }
                    model.wallet_page.couponCount = couponCount;
                    model.wallet_page.couponCount2 = couponCount2;
                    model.wallet_page.couponList = res.body;
                } else {
                    $(".coupon-content .empty").show();
                }
            })
        },
        pageQuery: function (id) {
            jsonCall(model.base_url + "/customer/doPageAccountBalance", { "user_id": id }, "post", function (res) {
                model.wallet_page.count = res.body.count;
                model.wallet_page.money = res.body.money ? res.body.money : 0.00;
                model.wallet_page.true_money = res.body.true_money ? res.body.true_money : 0.00;
                if (model.wallet_page.true_money == 0) {
                    $(".keyong-info button").addClass("default");
                }
                if (res.body.data) {
                    model.wallet_page.empty = false;
                    $.each(res.body.data, function (index, data) {
                        $.each(model.wallet_page.statusList, function (val, key, index) {
                            if (val == data.status) {
                                data.status = key;
                            }
                        })
                    });
                    model.wallet_page.walletList = res.body.data;
                }
                if (res.body.union_data != null) {
                    model.wallet_page.company = res.body.union_data.company;
                    model.wallet_page.nick_name = res.body.union_data.nick_name;
                    model.wallet_page.open_id = res.body.union_data.open_id;
                    model.wallet_page.img = res.body.union_data.img;
                }
            })
        },
        untieBankQuery: function () {
            jsonCall(model.base_url + "customer/doUnBindAnt", { "type": 'union' }, "post", function (res) {
                if (res.code == 10000) {
                    $(".unionPay-relieve-alert").show();
                    $(".unionPay-unionPay-true").hide();
                    $(".bank-add").show();
                    $(".unionPay-relieve").hide();
                } else {
                    alert("服务器异常");
                }
            });
        },
        bind: function () {
            $(".unionPay-close").click(function () {
                $(".unionPay-relieve-alert").hide();
                $(".unionPay-relieve").hide();
                $(".mask").hide();
            });
            $(".unionPay-true").click(function () {
                $(".unionPay-relieve").hide();
                $(".mask").hide();
            });
            $(".keyong").mouseenter(function () {
                $(".keyong-more").attr("src", '/public/Content/Images/wallet/icon_ts_sel.png')
            });
            $(".keyong").mouseleave(function () {
                $(".keyong-more").attr("src", '/public/Content/Images/wallet/icon_ts_nor.png')
            });
            $(".in-sure").mouseenter(function () {
                $(".in-sure-img").attr("src", '/public/Content/Images/wallet/icon_ts_sel.png')
            });
            $(".in-sure").mouseleave(function () {
                $(".in-sure-img").attr("src", '/public/Content/Images/wallet/icon_ts_nor.png')
            });
            $(".unionPay-close").on("click", function () {
                $(".unionPay-relieve").hide();
                $(".mask").hide();
            });
            var bind_i = 0;
            //          鼠标放在第三方支付上变色
            $(".J-escrow").mouseenter(function () {
                var id = $(this).attr("id");
                if ($(this).hasClass("on")) {

                } else {
                    bind_i = 1;
                    $(this).addClass("on");

                    if (id == "bind-wx") {
                        $("#bind-wx").find("img").attr("src", "/public/Content/Images/wallet/wx_on.png");
                    } else if (id == "bind-zfb") {
                        $("#bind-zfb").find("img").attr("src", "/public/Content/Images/wallet/zfb_on.png");
                    } else {
                        $(".isactive").find("img").attr("src", "/public/Content/Images/wallet/yl_on.png");
                    }
                }
            }).mouseleave(function () {
                var id = $(this).attr("id");
                if (bind_i == 1) {
                    bind_i = 0;
                    $(this).removeClass("on");

                    if (id == "bind-wx") {
                        $("#bind-wx").find("img").attr("src", "/public/Content/Images/wallet/wx.png");
                    } else if (id == "bind-zfb") {
                        $("#bind-zfb").find("img").attr("src", "/public/Content/Images/wallet/zfbs.png");
                    } else {
                        $(".isactive").find("img").attr("src", "/public/Content/Images/wallet/yl.png");
                    }
                }
            });
            //          点击退出第三方绑定弹出层
            $(".quit").on("click", function () {
                clearInterval(int);
                $("#popup-bind").hide();
                $("#popup-zfb").hide();
                $("#popup-wx").hide();
            });
            //         点击显示绑定第三方弹出层
            $(".J-escrow").on("click", function () {
                var parms;
                var parmss = {
                    phone: userName
                };
                var popupUrl;
                var id = $(this).attr("id");
                if (id == "bind-wx") {
                    $("#popup-wx").show();
                    popupUrl = $("#popup-wx");
                    parms = {
                        type: "wechat",
                        phone: userName
                    }
                } else if (id == 'bind-zfb') {
                    parms = {
                        type: "alipay",
                        phone: userName
                    }
                    popupUrl = $("#popup-zfb");
                    $("#popup-zfb").show();
                }
                //				获取二维码
                $.ajax({
                    url: "http://pc2.hhyp58.com/Authorland/getQRcode",
                    data: parms,
                    type: "post",
                    dataType: "text",
                    success: function (res, status, xhr) {
                        if (res != '' || res != null) {
                            var code = xhr.getResponseHeader('content-text');
                            if (code != null) {
                                var str = decode(res, code).str_replace(["+", "x2b", "x2B"], [" ", "+", "+"]);
                                res = JSON.parse(str);
                            } else {
                                res = JSON.parse(res);
                            }
                            var url = res.body.url;
                            popupUrl.find(".pm-left").find("img").attr("src", url);
                        }
                    },
                    error: function (data) {
                    }
                });
                $("#popup-bind").show();

                int = setInterval(model.bindQuery, "1000");//判断是否绑定过第三方支付
            });

        }
    };
    model.initial();
})();


