using Bull.Recycle.IRepository.IRecycleTypeRepository;
using Bull.Recycle.Model;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

namespace Bull.Recycle.Repository.RecycleTypeRepository
{
    public class RecycleTypeRepository:IRecycleTypeRepository
    {
        /// <summary>
        /// 获取回收类型列表
        /// </summary>
        /// <returns></returns>
        public List<RecycleType> GetRecycleTypeList()
        {
            using(var con=new SqlConnection(BaseConnection.Constr))
            {
                string sql = "select * from RecycleType";
                var list = con.Query<RecycleType>(sql).AsList();
                return list;
            }
        }
    }
}
