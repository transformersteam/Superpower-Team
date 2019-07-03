using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Bull.Recycle.Model
{
    /// <summary>
    /// 账户资产明细表
    /// </summary>
    public class AccountDetail
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
        /// 交易时间
        /// </summary>
        public DateTime? DealTime
        {
            get; set;
        }

        /// <summary>
        /// 订单号
        /// </summary>
        public string OrderNumber
        {
            get; set;
        }

        /// <summary>
        /// 资金流向id
        /// </summary>
        public int? FundFlowId
        {
            get; set;
        }

        /// <summary>
        /// 提现金额 
        /// </summary>
        public decimal? TakeMoney
        {
            get; set;
        }
    }
}
