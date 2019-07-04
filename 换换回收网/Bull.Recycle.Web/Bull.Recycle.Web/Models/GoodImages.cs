using System;
using System.Collections.Generic;
using System.Text;

namespace Bull.Recycle.Web
{
    /// <summary>
    /// 商品图片表
    /// </summary>
    public class GoodImages
    {
        public int Id { get; set; }

        /// <summary>
        /// 图片路径
        /// </summary>
        public string ImageUrl { get; set; }

        /// <summary>
        /// 商品id
        /// </summary>
        public int GoodId { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CreateTime { get; set; }
    }
}
