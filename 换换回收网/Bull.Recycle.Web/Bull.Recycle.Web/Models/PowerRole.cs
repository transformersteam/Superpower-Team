using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Bull.Recycle.Web
{
    /// <summary>
    /// 权限角色表
    /// </summary>
    public class PowerRole
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
        /// 权限id
        /// </summary>
        public int? PowerId
        {
            get; set;
        }

        /// <summary>
        /// 角色id
        /// </summary>
        public int? RoleId
        {
            get; set;
        }
    }
}
