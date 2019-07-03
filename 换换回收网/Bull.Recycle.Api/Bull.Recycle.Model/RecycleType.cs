using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Bull.Recycle.Model
{
    /// <summary>
    /// 回收类型id
    /// </summary>
    public class RecycleType
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
        /// 回收类型名称
        /// </summary>
        public string RecycleTypeName
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
