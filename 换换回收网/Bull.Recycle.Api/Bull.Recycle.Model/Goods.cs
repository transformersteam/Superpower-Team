using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Bull.Recycle.Model
{
    /// <summary>
    /// 商品表
    /// </summary>
    public class Goods
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
        /// 商品名称
        /// </summary>
        public string GoodsName
        {
            get; set;
        }
        
        /// <summary>
        /// 商品类型id
        /// </summary>
        public int? GoodsTypeId
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
