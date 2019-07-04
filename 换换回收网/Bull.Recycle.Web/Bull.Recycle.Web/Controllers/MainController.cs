using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

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
        /// 获取商品类型
        /// </summary>
        /// <returns></returns>
        public JsonResult GetGoodType()
        {
            var goodtype = HelperHttpClient.GetAll("get", "GoodType/GetGoodsTypeList", null);
            var list = JsonConvert.DeserializeObject<List<GoodsType>>(goodtype);
            return Json(list);
        }

        /// <summary>
        /// 获取回收类型
        /// </summary>
        /// <returns></returns>
        public JsonResult GetRecycleType()
        {
            var recycle = HelperHttpClient.GetAll("get", "RecycleType/GetRecycleTypeList", null);
            var list = JsonConvert.DeserializeObject<List<RecycleType>>(recycle);
            return Json(list);
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