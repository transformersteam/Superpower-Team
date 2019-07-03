using System;
using System.ComponentModel.DataAnnotations;

namespace Bull.Recycle.Model
{
    /// <summary>
    /// 账户表
    /// </summary>
    public class Account
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
        /// 可用余额
        /// </summary>
        public decimal? AvailableBalance
        {
            get; set;
        }

        /// <summary>
        /// 待确认余额
        /// </summary>
        public decimal? WaitConfirmBalance
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
