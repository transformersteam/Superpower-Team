using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Bull.Recycle.Model
{
    /// <summary>
    /// 商品分类表
    /// </summary>
    public class GoodsType
    {
        /// <summary>
        /// 
        /// </summary>
        [Key]
        public int Id
        {
            get; set;
        }

        /// <summary>
        /// 商品分类名称
        /// </summary>
        public string GoodsTypeName
        {
            get; set;
        }
        
        /// <summary>
        /// 回收类型id
        /// </summary>
        public int? RecycleTypeId
        {
            get; set;
        }

        /// <summary>
        /// 是否启用
        /// </summary>
        public int? IsState
        {
            get; set;
        }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? CreateTime
        {
            get; set;
        }
    }
}
