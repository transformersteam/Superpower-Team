using Bull.Recycle.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Bull.Recycle.IRepository.IGoodTypeRepository
{
    public interface IGoodTypeRepository
    {
        /// <summary>
        /// 获取商品类型列表
        /// </summary>
        /// <returns></returns>
        List<GoodsType> GetGoodsTypeList();
    }
}
