using Bull.Recycle.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data.SqlClient;
using Dapper;
using Bull.Recycle.IRepository.IGoodRepository;

namespace Bull.Recycle.Repository.GoodRepository
{
    public class GoodRepository:IGoodRepository
    {
        /// <summary>
        /// 获取商品列表
        /// </summary>
        /// <returns></returns>
        public List<Goods> GetGoodsList()
        {
            using(var con=new SqlConnection(BaseConnection.Constr))
            {
                string sql = "select * from Goods";
                var list =con.Query<Goods>(sql).AsList();
                return list;
            }
        }
    }
}
