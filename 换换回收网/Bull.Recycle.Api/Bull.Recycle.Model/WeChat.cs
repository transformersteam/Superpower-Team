using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Bull.Recycle.Model
{
    /// <summary>
    /// 微信表
    /// </summary>
    public class WeChat
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
        /// 微信号
        /// </summary>
        public string WeChatNumber
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
