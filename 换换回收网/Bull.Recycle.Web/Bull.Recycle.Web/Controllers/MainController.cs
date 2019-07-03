using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Bull.Recycle.Web.Controllers
{
    public class MainController : Controller
    {
        /// <summary>
        /// 首页
        /// </summary>
        /// <returns></returns>
        public IActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 手机回收
        /// </summary>
        /// <returns></returns>
        public IActionResult Recycle() 
        {
            return View();
        }
    }
}