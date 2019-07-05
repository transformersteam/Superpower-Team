using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Bull.Recycle.Web
{
    /// <summary>
    /// 用户表
    /// </summary>
    public class Users
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
        /// 用户名称
        /// </summary>
        public string UserName
        {
            get; set;
        }

        /// <summary>
        /// 用户密码
        /// </summary>
        public string UserPassword
        {
            get; set;
        }

        /// <summary>
        /// 真实姓名
        /// </summary>
        public string UserRealName
        {
            get; set;
        }

        /// <summary>
        /// 用户状态id   0前台  1后台
        /// </summary>
        public int? UserTypeId
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
