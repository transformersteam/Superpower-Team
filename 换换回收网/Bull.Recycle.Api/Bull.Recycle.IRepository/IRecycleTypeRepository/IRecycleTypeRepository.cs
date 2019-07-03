using Bull.Recycle.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Bull.Recycle.IRepository.IRecycleTypeRepository
{
    public interface IRecycleTypeRepository
    {
        /// <summary>
        /// 获取回收类型列表
        /// </summary>
        /// <returns></returns>
        List<RecycleType> GetRecycleTypeList();
    }
}
