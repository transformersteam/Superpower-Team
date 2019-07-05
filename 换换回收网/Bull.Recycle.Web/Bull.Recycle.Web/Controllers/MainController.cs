using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bull.Recycle.Catch;
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
        public JsonResult GetGoodType(int id)
        {
            var datatype = RedisHelper.Get<List<GoodsType>>("goodtype");
            if (datatype == null)
            {
                var goodtype = HelperHttpClient.GetAll("get", "GoodType/GetGoodsTypeList?id=" + id, null);
                var list = JsonConvert.DeserializeObject<List<GoodsType>>(goodtype);
                RedisHelper.Set("goodtype", list);
                return Json(list);
            }
            return Json(datatype);      
        }

        /// <summary>
        /// 获取回收类型
        /// </summary>
        /// <returns></returns>
        public JsonResult GetRecycleType()
        {
            var datarecycle= RedisHelper.Get<List<RecycleType>>("recycletype");
            if (datarecycle==null)
            {
                var recycle = HelperHttpClient.GetAll("get", "RecycleType/GetRecycleTypeList", null);
                var list = JsonConvert.DeserializeObject<List<RecycleType>>(recycle);
                RedisHelper.Set("recycletype", list);
                return Json(list);
            }
            return Json(datarecycle);
        }

        /// <summary>
        /// 根据商品类型id获取商品数据
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public JsonResult GetGoods(int id)
        {
            var data= HelperHttpClient.GetAll("get", "Goods/GetGoodsList?id="+id, null);
            var list = JsonConvert.DeserializeObject<List<GoodsImages>>(data);
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