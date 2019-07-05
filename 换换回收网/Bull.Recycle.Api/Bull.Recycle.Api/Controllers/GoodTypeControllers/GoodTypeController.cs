using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bull.Recycle.IRepository.IGoodTypeRepository;
using Bull.Recycle.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bull.Recycle.Api.Controllers.GoodTypeControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoodTypeController : ControllerBase
    {
        public IGoodTypeRepository iGoodTypeRepository;

        public GoodTypeController(IGoodTypeRepository _iGoodTypeRepository)
        {
            iGoodTypeRepository = _iGoodTypeRepository;
        }

        /// <summary>
        /// 获取商品类型列表
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetGoodsTypeList")]
        public List<GoodsType> GetGoodsTypeList(int id)
        {
            var list = iGoodTypeRepository.GetGoodsTypeList(id);
            return list;
        }
    }
}