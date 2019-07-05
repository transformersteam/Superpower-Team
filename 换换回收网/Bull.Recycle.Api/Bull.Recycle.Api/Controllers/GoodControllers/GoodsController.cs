using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bull.Recycle.IRepository.IGoodRepository;
using Bull.Recycle.Model;
using Bull.Recycle.Model.Dto;
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
        public List<GoodsImages> GetGoodsList(int id)
        {
            var list = iGoodRepository.GetGoodsList(id);
            return list;
        }

        /// <summary>
        /// 根据商品id获取详情
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("GetGoodDetailById")]
        public List<GoodsImages> GetGoodDetailById(int id)
        {
            var list = iGoodRepository.GetGoodDetailById(id);
            return list;
        }
    }
}