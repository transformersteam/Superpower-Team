/**
 * Created by AS on 2018/3/29.
 * update by AS on 2019/3/5
 */
var currentAjax = null;
function jsonCall2(url, data, type, successCallBack) {
	if (currentAjax) {
		currentAjax.abort();
	}
	currentAjax = $.ajax({
		url: url,
		data: data,
		type: type,
		dataType: "text",
		success: function (res, status, xhr) {
			var code = xhr.getResponseHeader('content-text');
			if (code != null) {
				var str = decode(res, code).str_replace(["+", "x2b", "x2B"], [" ", "+", "+"]);
				res = JSON.parse(str);
			} else {
				res = JSON.parse(res);
			}
			successCallBack(res);
		},
		error: function (data) {
		}
	});
}
var currentAjax2 = null;
function jsonCall3(url, data, type, successCallBack) {
	if (currentAjax2) {
		currentAjax2.abort();
	}
	currentAjax2 = $.ajax({
		url: url,
		data: data,
		type: type,
		dataType: "text",
		success: function (res, status, xhr) {
			var code = xhr.getResponseHeader('content-text');
			if (code != null) {
				var str = decode(res, code).str_replace(["+", "x2b", "x2B"], [" ", "+", "+"]);
				res = JSON.parse(str);
			} else {
				res = JSON.parse(res);
			}
			successCallBack(res);
		},
		error: function (data) {
		}
	});
};
(function () {
	var model = {
		initial: function () {
			model.base_url = __url__;
			this.bindVue();
			this.global();
			this.bind();
		},
		bindVue: function () {
			model.index_page = new Vue({
				el: '#index_page',
				data: {
					apiUrl: {},
					listId: null,
					brandId: null,
					hotlistId: null,
					hotbrandId: null,
					goodsList: [],
					goodsNameList: {}, //品牌缓存对象
					goodsNameListshow: [], //界面渲染变量
					goodsDetailNameList: {},
					goodsDetailNameListshow: [],
					hotNameList: {}, //热门品牌缓存对象
					hotNameListShow: [], //热门界面渲染变量
					hotDetailList: {},
					hotDetailListShow: [],
					goodsId: null,
					type: "click",
					userReviewsList: [],
					userNum: '50,009,527',
					phoneNum: '70,006,556',
					priceNum: '30,000,000,345',
					mediaList: [],
					mediaHotList: [],
					moreUrl: "",
					// new
					pinpaiBigNav: [],
					curPinpaiBigNavId: '',
					curPinpaiSmallNavId: '',
					iPhoneList: [],
					pingbanList: [],
					bijibenList: [],
					quanxinjiList: [],
					shumaList: [],
					sideBanner: {},
					chinaPhoneList: [],
					topSideNav: {
						'手机': [],
						'全新机': [],
						'苹果': [],
						'国产': [],
						'3G': [],
						'尾货': [],
						'统货': [],
						'平板': [],
						'笔记本': [],
						'数码': [],
					},
					curTopSideSmallNavId: '',
					sangList: [],
					tonghuoList: [],
					weihuoList: [],
					bannerList: {},
					ishowpackage: false,
					NewPersonResult: [] // 新人大礼包
				},
				computed: {

				},
				beforeMount() {
					this.getPinpaiBigNav();
					this.getIPhoneList();
					this.getPingbanList();
					this.getBijibenList();
					this.getQuanxinjiList();
					this.getShumaList();
					this.getSideBanner();
					this.getBanner();
					this.getChinaPhoneList();
					this.getSangTel();
				},
				methods: {
					//品牌
					getGoodsList: function (id, event, type) {
						this.type = type;
						this.listId = id;
						var _this = event.currentTarget;

						//展开右边样式
						$(".banner-phone-detail").show();

						$('.banner-phone-rec-tab').hover(function () {
							$('.banner-phone-detail').show();
							$('.banner-phone-detail-content').show();
						});

						$(_this).addClass("active").siblings().removeClass("active");
						//获取品牌数据并进行缓存
						if (id) {
							var _id = "_id" + id;
							var first = $(".banner-phone-detail-tab > ul > li").eq(0);
							first.addClass("active").siblings().removeClass("active");
							if (typeof this.goodsNameList[_id] == "undefined") {
								model.brandGroupQuery(id, _id, type);
							} else {
								model.index_page.goodsNameListshow = model.index_page.goodsNameList[_id];

								var next_id = model.index_page.goodsNameList[_id][0].id;
								model.index_page.goodsDetailNameListshow = model.index_page.goodsDetailNameList["_id" + next_id]
							}
						}
						this.goodsId = id;
					},

					//商品列表
					getGoodsDetailList: function (id, event, url) {
						var _this = event.currentTarget;
						$(_this).addClass("active").siblings().removeClass("active");
						if (id) {
							this.moreUrl = url;
							var _id = "_id" + id;
							if (typeof this.goodsDetailNameList[_id] == "undefined") {
								model.goodsDetailQuery(id, _id);
							} else {
								model.index_page.goodsDetailNameListshow = model.index_page.goodsDetailNameList[_id];
							}
						}
					},

					//回收热门 tab  id event click
					hotGoodsList: function (id, event, type) {
						model.index_page.hotlistId = id;
						this.type = type;
						var _this = event.currentTarget;
						$(_this).addClass("active").siblings().removeClass("active");
						//var first=$(".equipment-recovery-detail-tab .tab-item").eq(0);
						if (id) {
							var _id = "_id" + id;
							if (typeof model.index_page.hotNameList[_id] == "undefined") {
								model.brandGroupCenterQuery(id, _id, type);
							} else {
								model.index_page.hotNameListShow = model.index_page.hotNameList[_id];
								var next_id = model.index_page.hotNameList[_id][0].id;
								model.index_page.hotDetailListShow = model.index_page.hotDetailList["_id" + next_id];
								if (model.index_page.hotDetailListShow.length == 0) {
									$(".noGoods").show();
									$("#equipment-recovery").hide();
								} else {
									$(".noGoods").hide();
									$("#equipment-recovery").show();
								}

							}
							model.index_page.goodsId = id;
						}
					},

					//热门回收 左侧商品列表
					hotGoodsDetailList: function (id, event) {
						var _this = event.currentTarget;
						$(_this).addClass("active").siblings().removeClass("active");
						$(".tab-item img").each(function (i) {
							var _src = $(this).parent().attr("data-default-img");
							$(this).attr("src", _src);
						});
						$(_this).find("img").attr("src", $(_this).find(".show_img_data").attr("data-click-img"));
						if (id) {
							var _id = id;
							if (typeof this.hotDetailList[_id] == 'undefined') {
								model.getHotGoodsQuery(id, _id);
							} else {
								this.hotDetailListShow = this.hotDetailList[_id];

								if (this.hotDetailList[_id].length == 0) {
									$("#equipment-recovery").hide();
									$(".noGoods").show();
								} else {
									$("#equipment-recovery").show();
									$(".noGoods").hide();
								}

							}
						}
					},
					videoShow: function () {
						$(".mask").show();
						$(".video_dialog").show();
						$(".video_dialog>video").get(0).play();
					},
					videoClose: function () {
						$(".mask").hide();
						$(".video_dialog").hide();
						$(".video_dialog>video").get(0).pause();
					},

					// 品牌设备回收 start
					getPinpaiBigNav() {
						jsonCall(model.base_url + "Index/cateGroup", { limit: 1 }, "get", res => {
							// 检索关键字,抽取对应数据
							let filterArr = ['手机', '平板电脑', '笔记本', '数码产品', '全新机']
							let tempArr = res.body.filter(e => filterArr.includes(e.name));
							tempArr.forEach(e => {
								e.smallPinpai = [];
							});
							this.pinpaiBigNav = tempArr;
							// 手机分类,id=4 加上active
							this.curPinpaiBigNavId = this.pinpaiBigNav[0].id;
							// 默认传入id为4 分类为手机
							this.getPinpaiSmallNav(this.curPinpaiBigNavId, this.pinpaiBigNav[0]);
						});
					},
					getPinpaiSmallNav(bid, item) {
						if (item.smallPinpai.length) {
							this.curPinpaiSmallNavId = item.smallPinpai[0].id;
							this.getPinpaiShop(this.curPinpaiSmallNavId, item.smallPinpai[0]);
							return;
						}
						jsonCall(model.base_url + "Index/brandGroup", { p: 10, bid: bid }, "get", res => {
							res.body.body.forEach(e => {
								e.shopList = [];
							});
							item.smallPinpai = res.body.body;
							this.curPinpaiSmallNavId = item.smallPinpai[0].id;
							this.getPinpaiShop(this.curPinpaiSmallNavId, item.smallPinpai[0]);
						});
					},
					getPinpaiShop(pid, item) {
						if (item.shopList.length) {
							return;
						}
						jsonCall(model.base_url + "Index/getGoods", { pid: pid }, "get", res => {
							item.shopList = res.body instanceof Array ? res.body : [];
						});
					},
					tooglePinpaiBigNav(item) {
						if (item.id != this.curPinpaiBigNavId) {
							this.curPinpaiBigNavId = item.id;
							this.getPinpaiSmallNav(this.curPinpaiBigNavId, item);
						}
					},
					tooglePinpaiSmallNav(item) {
						if (item.id != this.curPinpaiSmallNavId) {
							this.curPinpaiSmallNavId = item.id;
							this.getPinpaiShop(this.curPinpaiSmallNavId, item);
						}
					},
					// 品牌设备回收
					getIPhoneList() {
						jsonCall(model.base_url + "goods/getApples", {}, "get", res => {
							this.iPhoneList = res.body.body instanceof Array ? res.body.body : [];
						});
					},

					getPingbanList() {
						jsonCall(model.base_url + "Index/brandGroup", { p: 4, bid: 2 }, "get", res => {
							this.pingbanList = res.body.body;
						});
					},
					getBijibenList() {
						jsonCall(model.base_url + "Index/brandGroup", { p: 4, bid: 1 }, "get", res => {
							this.bijibenList = res.body.body;
						});
					},
					getQuanxinjiList() {
						jsonCall(model.base_url + "Index/brandGroup", { p: 8, bid: 5 }, "get", res => {
							this.quanxinjiList = res.body.body;
						});
					},
					getShumaList() {
						jsonCall(model.base_url + "Index/brandGroup", { p: 8, bid: 3 }, "get", res => {
							this.shumaList = res.body.body;
						});
					},
					getSideBanner() {
						jsonCall(model.base_url + "goods/getSideBanner", {}, "get", res => {
							this.sideBanner = res.body.body;
						});
					},
					getBanner() {
						jsonCall(model.base_url + "Index/getBanner", {}, "get", res => {
							this.bannerList = res;
						});
					},
					getChinaPhoneList() {
						jsonCall(model.base_url + "Index/brandGroup", { bid: 4, c: '1' }, "get", res => {
							this.chinaPhoneList = res.body.body;
						});
					},
					getTopSideNav(obj, bid, filter) {
						if (!this.topSideNav[obj].length) {
							jsonCall(model.base_url + "Index/brandGroup", { p: 10000, bid: bid }, "get", res => {
								if (filter) {
									res.body.body = res.body.body.filter(e => e.name.includes(filter));
								}
								res.body.body.forEach(e => {
									e.shopList = [];
								});
								this.topSideNav[obj] = res.body.body;
								this.curTopSideSmallNavId = this.topSideNav[obj][0].id;
								this.getTopSideShop(this.curTopSideSmallNavId, this.topSideNav[obj][0]);
							});
						} else {
							this.curTopSideSmallNavId = this.topSideNav[obj][0].id;
							this.getTopSideShop(this.curTopSideSmallNavId, this.topSideNav[obj][0]);
						}
					},
					getTopSideShop(pid, item) {
						this.curTopSideSmallNavId = pid;
						if (item.shopList.length) {
							return;
						}
						jsonCall(model.base_url + "Index/getGoods", { p: 17, pid: pid }, "get", res => {
							item.shopList = res.body instanceof Array ? res.body : [];
						});
					},
					getTopGuochanSideNav(obj, bid) {
						if (!this.topSideNav[obj].length) {
							jsonCall(model.base_url + "Index/brandGroup", { bid: bid, c: '1' }, "get", res => {
								res.body.body.forEach(e => {
									e.shopList = [];
								});
								this.topSideNav[obj] = res.body.body;
								this.curTopSideSmallNavId = this.topSideNav[obj][0].id;
								this.getTopSideShop(this.curTopSideSmallNavId, this.topSideNav[obj][0]);
							});
						} else {
							this.curTopSideSmallNavId = this.topSideNav[obj][0].id;
							this.getTopSideShop(this.curTopSideSmallNavId, this.topSideNav[obj][0]);
						}
					},
					/**
					 * create 2019/3/5
					 */
					// 获取3g,统货,尾货的商品
					getSangTel() {
						//3G
						jsonCall(model.base_url + "Index/brandGroup", { p: 4, bid: 382 }, "get", res => {
							// 检索关键字,抽取对应数据
							this.sangList = res.body.body;
						});
						//统货
						jsonCall(model.base_url + "Index/brandGroup", { p: 4, bid: 381 }, "get", res => {
							// 检索关键字,抽取对应数据
							// let filterArr2 = ['苹果', '三星', '黑莓', '多普达']
							// let tempArr2 = res.body.body.filter(e => filterArr2.includes(e.name));
							this.tonghuoList = res.body.body;
						});
						//尾货
						jsonCall(model.base_url + "Index/brandGroup", { p: 4, bid: 380 }, "get", res => {
							// 检索关键字,抽取对应数据
							// let filterArr3 = ['OPPO', '荣耀', 'VIVO', '小米']
							// let tempArr3 = res.body.body.filter(e => filterArr3.includes(e.name));
							this.weihuoList = res.body.body;
						});

					},

					getCouponByNewPersonResult() {
						var _that = this
						jsonCall(model.base_url + "/Activity/getCouponByNewPersonResult", { come_in: 3 }, "post", function (res) {
							// is_getCoupon :2 未领取
							console.log(res.body.body)
							if (res.code == 10000) {
								_that.NewPersonResult = res.body.body
								if (res.body.body.is_getCoupon == 2) { //未领取
									// _that.ishowpackage = true
									// 记录用户关闭新人大礼包状态
									if (sessionStorage.getItem("newpackage")) {
										_that.ishowpackage = false
									} else {
										_that.ishowpackage = true
									}
								} else {
									_that.ishowpackage = false
								}
							}
						})
					},

					closepackage() {
						sessionStorage.setItem("newpackage", "1") // 记录用户关闭新人大礼包状态
						this.ishowpackage = false
					},
					goPackage() {
						window.location.href = this.NewPersonResult.pc_url
					}
				},
				created: function () {
					this.goodsId = 1;
					setTimeout(function () {
						model.goodsQuery();
					}, 1);
					model.userReviewsQuery();
					model.mediaQuery();

					if (sessionStorage.getItem("newpackage")) {
						this.ishowpackage = false
					}
					this.getCouponByNewPersonResult()
				}
			});
			// vue结束
		},
		goodsQuery: function () {

			//初始化请求到对应的分类
			//获取大分类	 cateGroup
			jsonCall(model.base_url + "Index/cateGroup", {}, "get", function (res) {
				var returnArr = [];
				if (res.code == "10000") {
					var i = 0;
					$.each(res.body, function (index, val) {
						var obj = {};
						obj["id"] = val.id;
						obj["name"] = val.name;
						obj["hot"] = val.hot;
						obj["tid"] = val.tid;
						obj["img"] = val.img;
						obj["mimg"] = val.mimg;
						obj["pcid"] = val.pcid;
						obj["url"] = val.url;
						obj["hightprice"] = val.hightprice;
						returnArr.push(obj);
					});
					model.index_page.goodsList = returnArr;
					model.index_page.apiUrl.toclassification = res.apiurl;
					var new_id = "_id" + res.body[0].id;
					model.index_page.hotlistId = res.body[0].id;
					model.brandGroupCenterQuery(res.body[0].id, new_id, "click");
				}
			});

			//热门商品 获取商品列表  getGoods

		},
		//首页导航侧边栏
		brandGroupQuery: function (id, _id, type) {
			jsonCall2(model.base_url + "Index/brandGroup", {
				"bid": id,
				"p": 7
			}, "get", function (res) {
				model.index_page.apiUrl.toselect = res.apiurl;
				if (typeof res.body.signData != "undefined") {
					return false;
				}
				var new_id = "_id" + res.body.body[0].id;

				if (type == "hover") {
					model.index_page.goodsNameList[_id] = res.body.body;
					model.index_page.goodsNameListshow = res.body.body;
					model.goodsDetailQuery(res.body.body[0].id, new_id);

				}
			});
		},
		//首页中间导航侧边栏
		brandGroupCenterQuery: function (id, _id, type) {

			jsonCall(model.base_url + "Index/brandGroup", {
				"bid": id,
				"ishot": 1,
				"p": 10
			}, "get", function (res) {
				model.index_page.apiUrl.toselect = res.apiurl;
				if (typeof res.body.signData != "undefined") {
					return false;
				}
				if (res.body.body.length < 1) {
					return false;
				}
				var new_id = "_id" + res.body.body[0].id;
				if (type == "hover") {
					model.index_page.goodsNameList[_id] = res.body.body;
					model.index_page.goodsNameListshow = res.body.body;
					model.goodsDetailQuery(res.body[0].id, new_id);
				}
				if (type == "click") {
					model.index_page.hotNameList[_id] = res.body.body;
					model.index_page.hotNameListShow = res.body.body;
					model.getHotGoodsQuery(res.body.body[0].id, new_id)
				}
			});
		},
		goodsDetailQuery: function (id, _id) {
			model.index_page.brandId = id;
			jsonCall3(model.base_url + "Index/getGoods", { 'pid': id, 'p': 14 }, "get", function (res) {
				if (res.body.signData == undefined) {
					model.index_page.goodsDetailNameList[_id] = res.body;
					model.index_page.goodsDetailNameListshow = res.body;
					model.index_page.apiUrl.toevaluate = res.apiurl;
				} else {
					model.index_page.goodsDetailNameList[_id] = [];
					model.index_page.goodsDetailNameListshow = []
				}
			});
		},
		getHotGoodsQuery: function (id, _id) {
			model.index_page.hotbrandId = id;
			jsonCall(model.base_url + "Index/getHotGoods", {
				'pid': id
			}, "get", function (res) {
				if (typeof res.body.body.signData != "undefined") {
					model.index_page.hotDetailList[_id] = [];
					model.index_page.hotDetailListShow = [];
					$("#equipment-recovery").hide();
					$(".noGoods").show();
					return false;
				}
				var returnArr = [];
				if (res.code == "10000") {
					var i = 0;
					$.each(res.body.body, function (index, val) {
						var obj = {};
						obj["ishot"] = val.ishot;
						obj["goods"] = val.goods;
						obj["cid"] = val.cid;
						obj["mprice"] = val.mprice;
						obj["lprice"] = val.lprice;
						obj["cpicture"] = val.cpicture;
						obj["url"] = val.url;
						obj["indexUrl"] = val.indexUrl;
						returnArr.push(obj);
					});
					model.index_page.hotDetailList[_id] = res.body.body;
					model.index_page.hotDetailListShow = returnArr;
					model.index_page.apiUrl.toevaluate = res.apiurl;
					$("#equipment-recovery").show();
					$(".noGoods").hide();

				} else if (res.code == 403) {
					$("#equipment-recovery").hide();
					$(".noGoods").show();
					$(".index-gomore").hide();
				}
			});
		},
		//评论
		userReviewsQuery: function () {
			jsonCall(model.base_url + "order/doGetReplay", { page: 1, size: null }, "post", function (res) {
				$.each(res.body, function (index, val) {
					if (val.mobile) {
						var mobile = val.mobile;
						mobile = mobile.substring(0, 3) + "****" + mobile.substring(7, 11);
						val.mobile = mobile;
					}
				});
				model.index_page.userReviewsList = res.body;

				setTimeout(() => {
					var hotComment = new Swiper('.swiper-container-hotcomment', {
						slidesPerView: 4,
						spaceBetween: 13,
						autoplay: {
							disableOnInteraction: false,
						},
						navigation: {
							nextEl: '.swiper-container-hotcomment .swiper-button-prev',
							prevEl: '.swiper-container-hotcomment .swiper-button-next',
						},
					});
				}, 200);
			});
		},
		//媒体
		mediaQuery: function () {
            model.index_page.mediaHotList = [];
            model.index_page.mediaList = [];
			/*jsonCall(model.base_url + "index/getHomeNews", {}, "post", function (res) {
				model.index_page.mediaHotList = res.body;
			});
			jsonCall(model.base_url + "index/getHomeMedia", {}, "post", function (res) {
				model.index_page.mediaList = res.body;
			});*/
		},
		global: function () {
			setTimeout(function () {
				model.bannerSwiper = new Swiper('#banner', {
					loop: true,
					autoplay: 5000,
					autoplayDisableOnInteraction: false,
					pagination: '.swiper-pagination',
					paginationClickable: true,
					paginationElement: 'li'
				});
				//热门机型
				model.equipmentRecovery = new Swiper('#equipment-recovery', {
					autoplayDisableOnInteraction: false,
					prevButton: '.swiper-button-prev',
					nextButton: '.swiper-button-next',
					observer: true
				});
				// 用户评价
				model.userReviewsSwiper = new Swiper('#user-reviews', {
					autoplay: 5000,
					loop: true,
					autoplayDisableOnInteraction: false,
					slidesPerView: 5,
					slidesPerGroup: 5,
					prevButton: '.swiper-button-prev',
					nextButton: '.swiper-button-next',
					observer: true,
					spaceBetween: 9
				});
				$("#user-reviews").find(".swiper-button-prev").removeClass("swiper-button-disabled");
				$("#user-reviews").find(".swiper-button-next").removeClass("swiper-button-disabled");

				// 媒体报道
				model.mediaCoverageSwiper = new Swiper('#media-coverage', {
					loop: true,
					autoplay: 5000,
					autoplayDisableOnInteraction: false,
					width: 640,
					height: 440,
					prevButton: '.swiper-button-prev',
					nextButton: '.swiper-button-next',
					slidesPerView: 2,
					slidesPerGroup: 2,
					spaceBetween: 15,
					observer: true
				});
				$("#media-coverage").find(".swiper-button-prev").removeClass("swiper-button-disabled");
				$("#media-coverage").find(".swiper-button-next").removeClass("swiper-button-disabled");
			}, 1000);

		},
		bind: function () {
			$(".banner-phone-rec").on("mouseleave", function () {
				$(".banner-phone-detail").hide();
				$(".banner-phone-rec-tab > ul > li").removeClass("active");
			});

			$(".pinpaiitem").click(function () {
				$(this).addClass('active').siblings().removeClass('active');
			})
		}
	};
	model.initial();
})();