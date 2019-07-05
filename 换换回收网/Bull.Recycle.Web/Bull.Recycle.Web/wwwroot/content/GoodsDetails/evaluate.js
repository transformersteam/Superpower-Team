(function () {
	var model = {
		initial: function () {
			model.base_url = __url__;
			model.global();
			model.bind();
		},
		global: function () {
			model.evaluate_page = new Vue({
				el: '#evaluate',
				data: {
					attrList: [],
					orderList: {},
					tipList: {},
					p_id: null,
					BID: null,
					bname: null,
					pname: null,
					goods_id: null,
					submitFlag: false,
					quick_valuation: "",
					situationFlag: false,
					baseFlag: true,
					checkList: [],
					disablesList: [],
					disables: []
				},
				watch: {
					orderList: function () {

					}
				},
				methods: {
					baseChoose: function (list2, index1) {
						if (list2.check) {
							var flag = true;
							$.each(this.checkList, function (index, val) {
								if (index1 == val.index) {
									val.id = list2.id;
									flag = false;
								}
							});
							if (flag) {
								this.checkList.push({
									id: list2.id,
									index: index1
								});
							}
							$.each(this.attrList, function (index, val) {
								$.each(val.child, function (index, val2) {
									$.each(val2.child, function (index, val3) {
										val3.check = true;
									})
								})
							});
							var checkList = this.checkList;
							var disablesList = [];
							$.each(this.disables, function (index, val) {
								var sameNum = 0;
								$.each(val, function (index, val2) {
									$.each(checkList, function (index, val3) {
										if (index1 >= val3.index) {
											if (val2 == val3.id) {
												sameNum++;
											}
										}
									});
								});
								if (sameNum == val.length - 1 && sameNum > 0) {
									$.each(val, function (index4, val4) {
										if (index4 == val.length - 1) {
											var sameFlag = false;
											$.each(checkList, function (index, val3) {
												if (index1 >= val3.index) {
													if (val4 == val3.id) {
														sameFlag = true;
													}
												}
											});
											if (!sameFlag) {
												disablesList.push(val4);
											}
										}
									});
								}
							});
							$.each(this.attrList, function (index, val) {
								$.each(val.child, function (index, val2) {
									$.each(val2.child, function (index, val3) {
										$.each(disablesList, function (index, val4) {
											if (val3.id == val4) {
												val3.check = false;
											}
										})
									})
								})
							});
						}
					},
					submit: function () {
						if (this.submitFlag) {
							var idList = [];
							var typeIdList = [];
							var paramList = [];
							$.each($(".base .attr-live>span"), function (index, val) {
								if ($(val).attr("data-id")) {
									paramList.push($(val).attr("data-id"));
								}
							});
							$.each($(".baseInfo .attr-live>span"), function (index, val) {
								if ($(val).attr("data-id")) {
									idList.push($(val).attr("data-id"));
									typeIdList.push($(val).attr("data-typeid"))
								}
							});
							$.each($(".info-yn .evaluate-situation>li>p"), function (index, val) {
								if ($(val).parent().hasClass("attr-live")) {
									idList.push($(val).attr("data-id"));
									typeIdList.push($(val).attr("data-typeid"))
								}
							});
							if ($(".multiChoice").hasClass("baseInfo")) {
								$.each($(".evaluate-item.imgactive"), function (index, val) {
									if ($(val).attr("data-id")) {
										idList.push($(val).attr("data-id"));
										typeIdList.push($(val).attr("data-typeid"))
									}
								});
							}
							if (this.situationFlag) {
								$.each($(".no-situation-detail .attr-live>span"), function (index, val) {
									if ($(val).attr("data-id")) {
										idList.push($(val).attr("data-id"));
										typeIdList.push($(val).attr("data-typeid"))
									}
								});
								$.each($(".evaluate-item.imgactive"), function (index, val) {
									if ($(val).attr("data-id")) {
										idList.push($(val).attr("data-id"));
										typeIdList.push($(val).attr("data-typeid"))
									}
								});
							}
							model.submitQuery(this.p_id, this.goods_id, typeIdList, idList, paramList)
						}
					},
					submitCheck: function (ispack) {
						if (model.packFlag) {
							if (ispack != 3) {
								this.submitFlag = true;
								this.situationFlag = false;
							} else if (ispack == 3) {
								this.submitFlag = false;
								this.situationFlag = true;
							}
						} else {
							this.submitFlag = true;
							if (ispack != 3) {
								this.situationFlag = false;
							} else if (ispack == 3) {
								this.situationFlag = true;
							}
						}
					}
				},
				created: function () {
					var id = location.pathname;
					id = id.substring(id.lastIndexOf("/") + 1, id.lastIndexOf("."));
					model.query(id);
				}
			});
		},
		query: function (id) {
			// console.log(id)
			jsonCall(model.base_url + "/Goods/getEvaluateData", { "goods_id": Number(id) }, "get", function (res) {

				if (res.body.disables) {
					model.evaluate_page.disables = res.body.disables;
				}
				if (res.body.childattr == undefined) {
					$(".evaluate-goods").hide();
					$(".evaluate-nogoods").show();
				} else {
					$(".evaluate-goods").show();
					$(".evaluate-nogoods").hide();
				}
				model.evaluate_page.p_id = res.body.pid;
				model.evaluate_page.pname = res.body.goods_name;
				model.evaluate_page.bname = res.body.childattr.list.banner;
				model.evaluate_page.goods_id = res.body.id;
				model.evaluate_page.orderList = res.body;

				
				$.each(res.body.childattr.list.list, function (index, val) {
					$.each(val.child, function (index, detail) {
						if (detail.checked == "true") {
							detail.checked = true;
						} else if (detail.checked == "false") {
							detail.checked = false;
						}
						$.each(detail.child, function (index, list) {
							if (list.check == "true") {
								list.check = true;
							} else if (list.check == "false") {
								list.check = false;
							}
						});
					});
				});

				$.each(res.body.childattr.list.list, function (index, val) {
					$.each(val.child, function (index, detail) {
						if (detail.checked == false) {
							val.child.splice(index, 1);
							val.child.push(detail);
						}
					});
				});

				var baseFlag = false;
				if (res.body.childattr.list.list[0].child) {
					$.each(res.body.childattr.list.list[0].child, function (index, val) {
						if (val.checked) {
							baseFlag = true;
						}
					});
				}
				if (!baseFlag) {
					model.evaluate_page.baseFlag = false;
					res.body.childattr.list.list[0].name = null;
					setTimeout(function () {
						$(".info-yn-title").css("color", "black");
						$(".info-yn-main").show();
					}, 1);
				}
				model.packFlag = false;
				$.each(res.body.childattr.list.list, function (index, val) {
					if (val.ischeck == "1" && val.ispack == "2") {
						if (val.child) {
							$.each(val.child, function (index, detail) {
								if (detail.checked) {
									model.packFlag = true;
								}
							});
						}
						if (!model.packFlag) {
							val.name = null;
							setTimeout(function () {
								$(".left-box .multiChoice>.attr-title").css("color", "black");
								$(".multiChoice>ul").show();
							}, 1);
						}
					}
					if (val.ischeck == 2) {
						if (val.child) {
							$.each(val.child, function (index, val) {
								setTimeout(function () {
									$(".icon" + index).css("background-image", 'url(' + val.images + ')');
								}, 100)
							});
						}
					}
				});
				model.evaluate_page.tipList = res.body.tip;
				model.evaluate_page.attrList = res.body.childattr.list.list;


				if (sessionStorage.getItem("reEvaluate")) {
					var reEvaluate = JSON.parse(sessionStorage.getItem("reEvaluate"));
					if (reEvaluate.id == res.body.id) {
						setTimeout(function () {
							var check_attr = reEvaluate.check_attr.split(",");
							$.each($(".left-box .attr-box .attr-info ul li"), function (index, val) {
								$.each(check_attr, function (index2, val2) {
									if (val2 == $(val).attr("data-id")) {
										$(val).addClass("change");
										$(val).parent().hide();
										$(val).parents(".attr-info").removeClass("default").addClass("livepro");
										$(val).parent().siblings(".top-title").children(".line-v").show();
										$(val).parent().siblings(".top-title").children(".attr-live").children("span").text($(val).children("span").text());
										$(val).parent().siblings(".top-title").children(".attr-live").children("span").attr("data-id", $(val).attr("data-id"));
										$(val).parents(".attr-box").show();
										if ($(val).parents(".attr-box").hasClass("no-situation-detail")) {
											model.evaluate_page.situationFlag = true;
											$(".multiChoice").show();
											$(".left-box .multiChoice>.attr-title").css("color", "black");
											$(".multiChoice>ul").show();
										}
									}
								})
							});
							$.each($(".info-yn-main ul li"), function (index, val) {
								$.each(check_attr, function (index2, val2) {
									if (val2 == $(val).children("p").attr("data-id")) {
										$(".info-yn-title").css("color", "black");
										$(val).addClass("attr-live");
										$(".info-yn-info").show();
										$(".info-yn-info").find(".attr-live").children().text($(val).children("p").text());
									}
								})
							});
							$.each($(".left-box .attr-box .evaluate-item"), function (index, val) {
								$.each(check_attr, function (index2, val2) {
									if (val2 == $(val).attr("data-id")) {
										$(val).addClass("imgactive")
									}
								})
							});
							model.evaluate_page.submitFlag = true;
						}, 1);
					}
				}
			})
		},
		// 立即询价
		submitQuery: function (pId, goodsid, typeId, id, param) {
			jsonCall(model.base_url + "/Goods/getParam", { 'p_id': pId, "goods_id": goodsid, 'radioAttrId': typeId, 'radioAttr': id, param: param }, "post", function (res) {
			    console.log(res);
				if (res.code == 10000) {
					sessionStorage.setItem("evaluate", res.body.pingid);
					window.location.href = res.apiurl + "?bid=" + model.evaluate_page.goods_id; //====05.27
				} else {
					alert("您选择的组合不存在，请联系客服")
				}
			})
		},
		bind: function () {
			$('.left-box').on('click', ".attr-info .top-title", function () {
				if (!$(this).parent().hasClass("default")) {
					if ($(this).parent().hasClass('livepro')) {
						$(this).parent().removeClass('livepro');
						$(this).parent().find('ul').slideToggle();
					} else {
						$(this).parent().removeClass('livepro');
						$(this).parent().addClass('livepro');
						$(this).parent().find('ul').slideToggle();
					}
				}
				if ($(this).siblings("ul").height() == 1) {
					$(this).children(".attr-more").show();
					$(this).children(".attr-live").hide();
				} else {
					$(this).children(".attr-more").hide();
					$(this).children(".attr-live").show();
				}
			});
			$('.left-box').on('click', ".base li", function () {
				if (!$(this).hasClass("default")) {
					var _index = $(this).parent().parent().index() - 1;
					$.each($(".base").children(".attr-info"), function (index, val) {
						if (index > _index) {
							$(val).addClass("default");
							$(val).find(".top-title .attr-live>span").text("");
							$(val).children("ul").children().removeClass("change");
							if (index > _index + 1) {
								$(val).children("ul").slideUp();
							}
						}
					});
				}
			});
			$('.left-box').on('click', ".attr-info li", function () {
				if (!$(this).hasClass("default")) {
					$(this).addClass('change');
					$(this).siblings().removeClass('change');
					$(".info-dalu").hide();
					$(this).parent().prev().find('.attr-live').show();
					$(this).parent().prev().find('.attr-live').children("span").text("");
					$(this).parent().prev().find('.attr-live').children("span").text($(this).children("span").text());
					$(this).parent().prev().find('.attr-live').children("span").attr("data-id", $(this).attr("data-id"));
					$(this).parent().prev().find('.line-v').show();
					$(this).parent().prev().find('.attr-more').hide();
					$(this).parent().parent().next(".default").find('ul').slideDown();
					$(this).parent().parent().removeClass('livepro').next(".default").addClass('livepro').removeClass("default");
					$(this).parent().parent().find('ul').slideUp();
					$(document).scrollTop($(document).scrollTop() + 75);
				}
			});
			$('.attr-box:first-child').on('click', ".attr-info:last-child li", function () {
				if (!$(this).hasClass("default")) {
					$(this).parent().parent().removeClass('livepro');
					$(this).parents('.attr-box').next().find('.attr-info:nth-child(2)').addClass('livepro');
					$(this).parents('.attr-box').next().find('.attr-info:nth-child(2) ul').slideDown()
				}

			});
			$(".left-box").on("click", ".info-yn .situation", function () {
				$(this).addClass("attr-live").siblings().removeClass("attr-live");
				$(".no-situation-detail").slideUp();
			});
			$(".left-box").on("click", ".info-yn .no-situation", function () {
				$(this).addClass("attr-live").siblings().removeClass("attr-live");
				$(".no-situation-detail>.attr-info").first().removeClass("default").children("ul").addClass("is-open");
				$(".no-situation-detail").slideDown();
			});
			$(".left-box").on("click", ".info-yn .info-yn-main li", function () {
				$(".info-yn-main").slideUp();
				model.evaluate_page.quick_valuation = $(this).find(".evaluate-situation-detail").text();
				$(".info-yn-info").show();
			});
			$(".left-box").on("click", ".attr-info:last-child ul li", function () {

				if (!$(this).hasClass("default")) {
					$(".info-yn-title").css("color", "black");
					$(".info-yn-main").show();
				}

			});
			$(".left-box").on("click", ".baseInfo .attr-info:last-child ul li", function () {
				if (!$(this).hasClass("default")) {
					$(this).parents(".baseInfo").next(".baseInfo").find(".attr-title").css("color", "black");
					$(this).parents(".baseInfo").next(".baseInfo").find(".attr-info").first().removeClass("default").children("ul").addClass("is-open");
					if ($(this).parents(".baseInfo").find(".attr-title").text() == "使用情况") {
						$(this).parents(".baseInfo").next(".baseInfo").children("ul").show();
						model.evaluate_page.submitFlag = true;
					}
				}

			});
			$(".left-box").on("click", ".no-situation-detail>.attr-info:last-child ul li", function () {
				$(".info-yn-main").hide();
				$(".multiChoice>.attr-title").css("color", "black");
				$(".multiChoice>ul").slideDown();
				model.evaluate_page.submitFlag = true;
			});
			$(".left-box").on("click", ".attr-box .evaluate-item", function () {
				$(this).toggleClass("imgactive");
			});
			$(".left-box").on("click", ".info-yn-info", function () {
				$(this).hide();
				$(".info-yn-main").slideDown();
			});
			$("#show-a").on("click", function () {
				// $(".model-more").css("top","60px")
				if ($("#show-a").parent().hasClass("livepro")) {
					$(".model-more").css("top", "540px");
					$(".model-more-neicun").css("top", "610px")
				} else {
					$(".model-more").css("top", "330px");
					$(".model-more-neicun").css("top", "400px")
				}
			});
			// $(".evaluate-item").on("click",function(){
			// $(this).addClass("imgactive").siblings().removeClass("imgactive")
			// });
			$("#show-b").on("click", function () {
				// $(".model-more").css("top","60px")
				if ($("#show-b").parent().hasClass("livepro")) {
					$(".model-more-neicun").css("top", "540px")
				} else {
					$(".model-more-neicun").css("top", "400px");
				}
			})
		}
	};
	model.initial();
})();
