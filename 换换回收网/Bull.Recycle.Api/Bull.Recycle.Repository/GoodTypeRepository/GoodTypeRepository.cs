using Bull.Recycle.IRepository.IGoodTypeRepository;
using Bull.Recycle.Model;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

namespace Bull.Recycle.Repository.GoodTypeRepository
{
    public class GoodTypeRepository: IGoodTypeRepository
    {
        /// <summary>
        /// 获取商品类型列表
        /// </summary>
        /// <returns></returns>
        public List<GoodsType> GetGoodsTypeList()
        {
            using (var con = new SqlConnection(BaseConnection.Constr))
            {
                string sql = "select * from GoodsType";
                var list = con.Query<GoodsType>(sql).AsList();
                return list;
            }
        }
    }
}
