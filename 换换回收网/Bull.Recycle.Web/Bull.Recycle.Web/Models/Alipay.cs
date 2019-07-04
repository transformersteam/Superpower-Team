using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Bull.Recycle.Web
{
    /// <summary>
    /// 支付宝表
    /// </summary>
    public class Alipay
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
        /// 支付宝账号
        /// </summary>
        public string AlipayNumber
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
