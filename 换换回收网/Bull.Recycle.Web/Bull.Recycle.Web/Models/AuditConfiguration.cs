using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Bull.Recycle.Web
{
    /// <summary>
    /// 审批配置表
    /// </summary>
    public class AuditConfiguration
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
        /// 节点id
        /// </summary>
        public int? NodeId
        {
            get; set;
        }

        /// <summary>
        /// 下一步节点id
        /// </summary>
        public int? NextId
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
