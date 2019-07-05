(function () {
    var model = {
        initial: function () {
            model.base_url = __url__;
            model.global();
            model.bind();
        },
        global: function () {
            model.order_page = new Vue({
                el: '#orderDetail',
                data: {
                    apiUrl: "",
                    orderList: {},
                    statusList: {
                        97: '已下单',
                        98: '已发货',
                        99: '已取消',
                        100: '已签收',
                        101: '已签收',
                        102: '已签收',
                        103: '已签收',
                        104: '已签收',
                        105: '已签收',
                        106: '已质检',
                        107: '已质检',
                        108: '已质检',
                        109: '已质检',
                        110: '已取消',
                        111: '已质检',
                        112: '已质检',
                        113: '已质检',
                        114: '已质检',
                        115: '已质检',
                        116: '已质检',
                        117: '已质检'
                    },
                    deleteList: {},
                    username: null,
                    photo: null,
                    user: null,
                    totPrice: '',
                },
                mounted: function () {
                    this.$nextTick(function () {
                        setTimeout(function () {
                            $.each($(".right-box"), function (index, val) {
                                $(val).height($(val).siblings(".left-box").height())
                            });
                        }, 500)
                    })
                },
                methods: {
                    openDialog: function (list) {
                        $(".orderdetail-main-total").show();
                        $(".orderdetail-mask").show();
                        this.deleteList = list;
                    },
                    confirmDelete: function () {
                        var sn = this.deleteList.sn;
                        var note = "";
                        $.each($(".orderdetail-main-total-main ul li input:checked"), function (index, val) {
                            var text = $(val).siblings("label").text();
                            note += "," + text;
                        });
                        note = note.substring(1, note.length);
                        model.deleteQuery(this.user, sn, note);
                    },
                    toDetail: function (list) {
                        var serviceList = { sn: list.sn, totPrice: list.sum };
                        sessionStorage.setItem("serviceList", JSON.stringify(serviceList));
                        sessionStorage.setItem("sn", list.sn);
                        window.location.href = __url__ + "order/orderDetail";
                    },
                    toComment: function (val) {
                        sessionStorage.setItem("commentList", JSON.stringify(val));
                    }
                },

                created: function () {
                    model.query();
                    // if (sessionStorage.getItem('serviceList')) {
                    //     console.log(JSON.parse(sessionStorage.getItem('serviceList')).totPrice)
                    //     this.totPrice = JSON.parse(sessionStorage.getItem('serviceList')).totPrice
                    // }
                }
            });
        },
        query: function () {
            jsonCall(model.base_url + "/customer/doCheckLogin", {}, "get", function (res) {
                if (res.body != "未登录") {
                    model.order_page.username = res.body.user_name;
                    model.order_page.photo = res.body.photo;
                    model.pageQuery(res.body.user_id);
                } else {
                    window.location.href = __url__ + "login/index";
                }
            });
        },
        pageQuery: function (id) {
            jsonCall(model.base_url + "/order/pageOrderList", { "user_id": id }, "post", function (res) {
                console.log(res)
                $.each(res.body, function (key2, val2) {
                    if (val2.pay_status == 1) {
                        val2.status = '已付款'
                    }
                });
                $.each(res.body, function (key, val) {
                    var sum = 0;
                    $.each(val.detail, function (index, detail) {
                        sum += Number(detail.qc_price);
                    });
                    val.sum = (sum + Number(val.hd_price) + Number(val.yj_price)).toFixed(2);
                });
                model.order_page.orderList = res.body;
                console.log(res.body)
            });
        },
        deleteQuery: function (user, sn, note) {
            jsonCall(model.base_url + "/order/doCustomerCancel", { "user_id": '', "sn": sn, "note": note }, "post", function (res) {
                $(".orderdetail-main-total").hide();
                $(".orderdetail-mask").hide();
                model.query(this.user)
            });
        },
        bind: function () {
            $(".orderdetail-main-total-title-r").on("click", function () {
                $(".orderdetail-main-total").hide();
                $(".orderdetail-mask").hide();
            });

        }
    };
    model.initial();
})();
