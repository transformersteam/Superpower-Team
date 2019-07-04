using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bull.Recycle.IRepository.IGoodRepository;
using Bull.Recycle.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bull.Recycle.Api.Controllers.GoodControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoodsController : ControllerBase
    {
        public IGoodRepository iGoodRepository;

        public GoodsController(IGoodRepository _iGoodRepository)
        {
            iGoodRepository = _iGoodRepository;
        }

        /// <summary>
        /// 获取商品列表
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetGoodsList")]
        public List<Goods> GetGoodsList()
        {
            var list = iGoodRepository.GetGoodsList();
            return list;
        }
    }
}