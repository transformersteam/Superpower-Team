using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Bull.Recycle.Web.Controllers
{
    public class MyCenterController : Controller
    {
        /// <summary>
        /// 个人中心
        /// </summary>
        /// <returns></returns>
        public IActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// 订单详情
        /// </summary>
        /// <returns></returns>
        public IActionResult OrderList()
        {
            return View();
        }
        /// <summary>
        /// 优惠卷
        /// </summary>
        /// <returns></returns>
        public IActionResult Coupon()
        {
            return View();
        }
    }
}