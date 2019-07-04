using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Bull.Recycle.Web
{
    /// <summary>
    /// 银行卡表
    /// </summary>
    public class BankCard
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
        /// 银行卡账号
        /// </summary>
        public string BankNumber
        {
            get; set;
        }

        /// <summary>
        /// 所属银行
        /// </summary>
        public string BelongBank
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
