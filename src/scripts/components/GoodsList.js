import GoodsItem from './GoodsItem'

export default class GoodsList {
  render(goods) {
    let listHtml = ''

    goods.forEach((good) => {
      const goodItem = new GoodsItem(good.product_name, good.price)

      listHtml += goodItem.render()
    })

    document.querySelector('.fetured-container').innerHTML = listHtml
  }
}
