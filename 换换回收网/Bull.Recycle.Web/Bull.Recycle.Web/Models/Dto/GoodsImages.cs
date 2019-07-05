using System;
using System.Collections.Generic;
using System.Text;

namespace Bull.Recycle
{
    /// <summary>
    /// 商品图片表
    /// </summary>
    public class GoodsImages
    {
        /// <summary>
        /// 商品主键id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// 商品名称
        /// </summary>
        public string GoodsName { get; set; }

        /// <summary>
        /// 图片路径
        /// </summary>
        public string ImageUrl { get; set; }
    }
}
