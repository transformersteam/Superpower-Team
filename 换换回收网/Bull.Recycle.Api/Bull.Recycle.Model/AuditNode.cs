using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Bull.Recycle.Model
{
    /// <summary>
    /// 审批节点表
    /// </summary>
    public class AuditNode
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
        /// 节点名称
        /// </summary>
        public string NodeName
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
