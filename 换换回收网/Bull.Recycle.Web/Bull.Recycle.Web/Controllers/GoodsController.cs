using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bull.Recycle.Catch;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Bull.Recycle.Web.Controllers
{
    public class GoodsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 商品详情页面
        /// </summary>
        /// <returns></returns>
        public IActionResult GoodDetails(int id)
        {
            ViewBag.id = id;
            return View();
        }

        /// <summary>
        /// 根据商品id获取详细信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public JsonResult GetGoodById(int id)
        {
            var list = RedisHelper.Get<List<GoodImages>>("good" + id);
            if (list == null)
            {
                var good = HelperHttpClient.GetAll("get", "Goods/GetGoodDetailById?id=" + id, null);
                var goodlist = JsonConvert.DeserializeObject<List<GoodsImages>>(good);
                return Json(goodlist);
            }
            return Json(list);
        }
    }
}