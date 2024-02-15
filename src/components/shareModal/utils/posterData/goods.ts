import { formatImageUrlProtocol } from './index'

const goods = (poster: Recordable) => {
  const width = poster.width

  return {
    bgUrl: formatImageUrlProtocol(poster.shareInfo.goods_bg),
    list: [
      {
        name: 'nickname',
        type: 'text',
        val: '罗可乐',
        x: width * 0.22,
        y: width * 0.06,
        paintbrushProps: {
          fillStyle: '#333',
          font: {
            fontSize: 16,
            fontFamily: 'sans-serif'
          }
        }
      },
      {
        name: 'avatar',
        type: 'image',
        val: formatImageUrlProtocol(poster.shareInfo.avatarUrl),
        x: width * 0.04,
        y: width * 0.04,
        width: width * 0.14,
        height: width * 0.14,
        d: width * 0.14
      },
      {
        name: 'goodsImage',
        type: 'image',
        val: formatImageUrlProtocol(poster.shareInfo.goodsImage),
        x: width * 0.03,
        y: width * 0.21,
        width: width * 0.94,
        height: width * 0.94,
        r: 10
      },
      {
        name: 'goodsTitle',
        type: 'text',
        val: poster.shareInfo.title,
        x: width * 0.04,
        y: width * 1.18,
        maxWidth: width * 0.91,
        line: 2,
        lineHeight: 5,
        paintbrushProps: {
          fillStyle: '#333',
          font: {
            fontSize: 14
          }
        }
      },
      {
        name: 'goodsPrice',
        type: 'text',
        val: '￥' + poster.shareInfo.price,
        x: width * 0.04,
        y: width * 1.3,
        paintbrushProps: {
          fillStyle: '#ff0000',
          font: {
            fontSize: 20,
            fontFamily: 'OPPOSANS'
          }
        }
      },
      {
        name: 'goodsOriginalPrice',
        type: 'text',
        val: poster.shareInfo.original_price > 0 ? '￥' + poster.shareInfo.original_price : '',
        x: width * 0.3,
        y: width * 1.32,
        paintbrushProps: {
          fillStyle: '#999',
          font: {
            fontSize: 10,
            fontFamily: 'OPPOSANS'
          }
        },
        textDecoration: {
          line: 'line-through',
          style: 'solide'
        }
      },
      // #ifndef MP-WEIXIN
      {
        name: 'qrcode',
        type: 'qrcode',
        val: poster.shareInfo.link,
        x: width * 0.75,
        y: width * 1.3,
        size: width * 0.2
      },
      // #endif
      // #ifdef MP-WEIXIN
      {
        name: 'wxacode',
        type: 'image',
        val: formatImageUrlProtocol(
          'http://file.sheepjs.com/storage/test/20220822/8f232befa2dcbabb6ce69e7faa7d4df1.jpg'
        ),
        x: width * 0.75,
        y: width * 1.3,
        width: width * 0.2,
        height: width * 0.2
      }
      // #endif
    ]
  }
}

export default goods
