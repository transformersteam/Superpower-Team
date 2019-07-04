using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Bull.Recycle.Web
{
    /// <summary>
    /// 回收车表
    /// </summary>
    public class RecycleCar
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
        /// 商品条件id
        /// </summary>
        public int? GoodsConditionId
        {
            get; set;
        }

        /// <summary>
        /// 用户id
        /// </summary>
        public int? UserId
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
