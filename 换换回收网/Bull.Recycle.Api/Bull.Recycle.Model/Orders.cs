using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Bull.Recycle.Model
{
    /// <summary>
    /// 订单表
    /// </summary>
    public class Orders
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
        /// 商品id
        /// </summary>
        public int? GoodsId
        {
            get; set;
        }

        /// <summary>
        /// 订单金额
        /// </summary>
        public decimal? OrderMoney
        {
            get; set;
        }

        /// <summary>
        /// 是否启用
        /// </summary>
        public int? StateId
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
