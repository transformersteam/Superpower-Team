$(function () {
  // 首页banner
  var bannerSwiper = new Swiper('#j-swiper-container-banner', {
    // effect: 'fade',
    // loop: true,       // 循环模式选项
    // autoplay: true,   // 自动滑动

    // 分页器
    // pagination: {
    //   el: '.swiper-pagination',
    //   clickable: true,
    // },

    // 前进后退按钮
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // },

    // 滚动条
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // },
  });

  // 登录框弹出
  $('#j-showlogin, #j-showlogin1').click(() => {
    layer.open({
      type: 1,
      title: false,
      area: '652px',
      content: $('.loginwrap')
    });

    $('#verifycode').trigger(verify_code());
  });

  function verify_code() {
    $('#verifycode').attr('src', '/index/verify_code.html?time=' + Math.random());
    // alert( $('#verifycode').attr('src'));
  }

  var instance = axios.create({
    // mmp
  });

  // 头部导航
  var vheadernav = new Vue({
    el: '#vheadernav',
    data: {
      navList: [
        { id: 1, name: '分类', href: '/a4.html', bid: null, list: [] },
        { id: 2, name: '手机回收', href: '', bid: 4, list: [] },
        { id: 3, name: '笔记本平板回收', href: '', bid: 1, list: [] },
        { id: 4, name: '全新机手机回收', href: '', bid: 5, list: [] },
        { id: 6, name: '智能数码回收', href: '', bid: 3, list: [] },
        // { id: 8, name: '大批量手机回收', href: '', bid: 380, list: [] },
      ],
    },
    mounted() {

    },
    methods: {
      getShopList(bid, e) {
        if (bid && !e.list.length) {
          jsonCall(__url__ + "Index/brandGroup", { p: 6, bid: bid }, "get", function (res) {
            e.list = res.body.body || [];
          });
        }
      }
    }
  });

  // 底部登录注册
  var footerapp = new Vue({
    el: '#footerapp',
    data: {
      loginPhone: '',
      loginVer: '',
      loginImgVer: '',
      loginImgVerStatus: false,
      startTimeOut: false,
      countTime: 60,
      links: []
    },
    mounted() {

    },
    created() {
      this.getlinks();
    },
    methods: {
      tooglelogin(flag) {
        switch (flag) {
          case 1:
            $('.mobileverloginwrap').hide();
            $('.accountpassloginwrap').show();
            break;
          case 2:
            $('.mobileverloginwrap').show();
            $('.accountpassloginwrap').hide();
            break;
          default: console.log('参数错误');
        }
      },
      forgetpasswordbtn() {
        let _this = this;
        layer.open({
          skin: 'customlayer',
          area: '650px',
          title: '温馨提示',
          content: '<div class="txtcen">忘记登录密码，建议您使用手机验证登录方式</div>',
          btn: ['手机验证登录'],
          yes(index, layero) {
            _this.tooglelogin(2);
            layer.close(index);
          },
          btnAlign: 'c'
        });
      },
      getVerCode() {
        if (!/^1[0-9]{10}$/.test(this.loginPhone)) {
          layer.msg('手机号码不正确！');
          return;
        }
        if (this.loginImgVer.length < 4) {
          layer.msg('请输入图形验证码！');
          return;
        }

        let _this = this;
        $.post("/login/sendSomethingToMyDear", { mobile: _this.loginPhone, yzm: _this.loginImgVer }, function (data) {
          if (data.code == 10000) {
            _this.timeOut();
            _this.loginImgVerStatus = true;
            layer.msg('验证码已发送！');
          } else {
            _this.$refs.loginImgVerIpt.focus();
            $('#verifycode').attr('src', '/index/verify_code.html?time=' + Math.random());
            layer.msg(data.msg);
          }
        }, 'json')
      },
      timeOut() {
        this.startTimeOut = true;
        var count = 60;
        var fn = () => {
          setTimeout(() => {
            this.countTime--;
            if (this.countTime >= 0) {
              fn();
            } else {
              this.startTimeOut = false;
              this.countTime = count;
            }
          }, 1000);
        }
        fn();
      },
      loginFn() {
        var loginType = $('#submit-login').attr('data-logintype')
        if (!this.loginImgVerStatus) {
          layer.msg('图形验证码未通过！');
          return;
        }
        if (!this.loginVer) {
          layer.msg('请输入短信验证码！');
          return;
        }
        var not_login = '';
        if ($("#notLogin").is(':checked')) {
          not_login = 10;
        }

        $.post("/Login/login", { new: loginType, code: this.loginVer, phone: this.loginPhone, not_login: not_login }, function (data) {
          if (data.code == 10000) {
            // window.location.href = '/index/pageIndex';
            window.location.replace(location.href);
          } else {
            layer.msg(data.msg);
          }
        }, 'json')
      },
      getlinks() {
        var _this = this;
        $.post('/Helpcenter/getCooperation', {}, function (res) {
          _this.links = JSON.parse(res)
        })
      }
    }
  });


  var alsorecycledSwiper = new Swiper('#j-swiper-alsorecycled', {
    // effect: 'fade',
    loop: true,       // 循环模式选项
    autoplay: true,   // 自动滑动
    slidesPerView: 5,
    spaceBetween: 14,

    // 分页器
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    // 前进后退按钮
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // },

    // 滚动条
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // },
  });

  $(".no_user").css("display", "block");
  $(".tab_nav li").on("click", function () {
    $(this).addClass("current").siblings().removeClass("current");
    var index = $(this).index();
    $(".coupon_list_wrap .coupons").eq(index).show().siblings().hide();
  });
  $(".restrictive_conditions i").hover(function () {
    $(this).parent(".restrictive_conditions_text").siblings(".service_details").fadeToggle();
  });

  $('.modify_info').on('click', function () {
    layer.open({
      type: 1,
      skin: 'customlayer',
      area: '650px',
      title: '温馨提示',
      content: $(".order_box1"),
      btn: ['残忍取消'],
      btnAlign: 'c'
    });
  });
});