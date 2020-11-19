import './styles/index.scss'
import GoodsFetch from './scripts/components/GoodsFetch'
import GoodsList from './scripts/components/GoodsList'

const menuToggle = document.querySelector('.header-navigation__burger')

menuToggle.onclick = function () {
  document
    .querySelector('.header-navigation__burger__icon')
    .classList.toggle('header-navigation__burger__icon_active')
  document
    .querySelector('.header-navigation__list-mobile')
    .classList.toggle('header-navigation__list-mobile_active')
}

const apiUrl =
  'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

const goodsFetch = new GoodsFetch({ apiUrl })
const goodsList = new GoodsList()

const promise = new Promise((resolve) => {
  resolve(goodsFetch.getGoods())
})

promise.then((res) => goodsList.render(res))
