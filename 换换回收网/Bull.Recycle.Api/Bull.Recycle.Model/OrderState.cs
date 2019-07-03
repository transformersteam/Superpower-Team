using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Bull.Recycle.Model
{
    /// <summary>
    /// 订单状态
    /// </summary>
    public class OrderState
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
        /// 订单状态名称
        /// </summary>
        public string OrderStateName
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
