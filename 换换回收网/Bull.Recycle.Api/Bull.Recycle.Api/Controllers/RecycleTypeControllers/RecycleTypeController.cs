using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bull.Recycle.IRepository.IRecycleTypeRepository;
using Bull.Recycle.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bull.Recycle.Api.Controllers.RecycleTypeControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecycleTypeController : ControllerBase
    {
        public IRecycleTypeRepository iRecycleTypeRepository;

        public RecycleTypeController(IRecycleTypeRepository _iRecycleTypeRepository)
        {
            iRecycleTypeRepository = _iRecycleTypeRepository;
        }

        /// <summary>
        /// 获取回收类型列表
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetRecycleTypeList")]
        public List<RecycleType> GetRecycleTypeList()
        {
            var list = iRecycleTypeRepository.GetRecycleTypeList();
            return list;
        }
    }
}