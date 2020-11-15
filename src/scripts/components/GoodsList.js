import GoodsItem from './GoodsItem'

export default class GoodsList {
  constructor() {
    this.goods = []
  }

  fetchGoods() {
    this.goods = [
      { title: 'Shirt', price: 150 },
      { title: 'Socks', price: 50 },
      { title: 'Jacket', price: 350 },
      { title: 'Shoes', price: 250 },
    ]
  }

  sum() {
    let sumPrice = null

    for (let el of this.goods) {
      sumPrice += el.price
    }

    return sumPrice
  }

  render() {
    let listHtml = ''

    this.goods.forEach((good) => {
      const goodItem = new GoodsItem(good.title, good.price)

      listHtml += goodItem.render()
    })

    document.querySelector('.fetured-container').innerHTML = listHtml
  }
}
