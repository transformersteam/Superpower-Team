using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Bull.Recycle.Web
{
    /// <summary>
    /// 用户角色表
    /// </summary>
    public class UserRole
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
        /// 用户id
        /// </summary>
        public int? UserId
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
