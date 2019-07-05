using Bull.Recycle.Model;
using Bull.Recycle.Model.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace Bull.Recycle.IRepository.IGoodRepository
{
    public interface IGoodRepository
    {
        /// <summary>
        /// 获取商品列表
        /// </summary>
        /// <returns></returns>
        List<GoodsImages> GetGoodsList(int id);

        /// <summary>
        /// 根据商品id获取详情
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        List<GoodsImages> GetGoodDetailById(int id);
    }
}
