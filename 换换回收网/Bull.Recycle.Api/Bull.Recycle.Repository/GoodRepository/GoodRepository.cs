using Bull.Recycle.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data.SqlClient;
using Dapper;
using Bull.Recycle.IRepository.IGoodRepository;
using Bull.Recycle.Model.Dto;

namespace Bull.Recycle.Repository.GoodRepository
{
    public class GoodRepository:IGoodRepository
    {
        /// <summary>
        /// 获取商品列表
        /// </summary>
        /// <returns></returns>
        public List<GoodsImages> GetGoodsList(int id)
        {
            using(var con=new SqlConnection(BaseConnection.Constr))
            {
                string sql = $"select Goods.Id,Goods.GoodsName,GoodImages.ImageUrl from Goods inner join GoodImages on Goods.Id=GoodImages.GoodId where Goods.GoodsTypeId={id}";
                var list =con.Query<GoodsImages>(sql).AsList();
                return list;
            }
        }

        /// <summary>
        /// 根据商品id获取详情
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<GoodsImages> GetGoodDetailById(int id)
        {
            using (var con = new SqlConnection(BaseConnection.Constr))
            {
                string sql = $"select Goods.Id,Goods.GoodsName,GoodImages.ImageUrl from Goods inner join GoodImages on Goods.Id=GoodImages.GoodId where Goods.Id={id}";
                var list = con.Query<GoodsImages>(sql).AsList();
                return list;
            }
        }
    }
}
