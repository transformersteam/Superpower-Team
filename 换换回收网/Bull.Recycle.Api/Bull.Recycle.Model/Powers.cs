using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Bull.Recycle.Model
{
    /// <summary>
    /// 权限表
    /// </summary>
    public class Powers
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
        /// 权限名称
        /// </summary>
        public string PowerName
        {
            get; set;
        }

        /// <summary>
        /// 父级id
        /// </summary>
        public int? ParentId
        {
            get; set;
        }

        /// <summary>
        /// 所属角色
        /// </summary>
        public string BelongRole
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
