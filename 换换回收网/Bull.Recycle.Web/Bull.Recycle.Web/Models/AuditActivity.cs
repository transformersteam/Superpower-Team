using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Bull.Recycle.Web
{
    /// <summary>
    /// 审批活动表
    /// </summary>
    public class AuditActivity
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
        /// 配置表id
        /// </summary>
        public int? ConfigurationId
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

        /// <summary>
        /// 审批状态id   1或0
        /// </summary>
        public int? AuditStateId
        {
            get; set;
        }

        /// <summary>
        /// 是否通过
        /// </summary>
        public int? IsPass
        {
            get; set;
        }
    }
}
