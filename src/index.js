import './styles/index.scss'
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

const goodsList = new GoodsList()
goodsList.fetchGoods()
goodsList.render()
goodsList.sum()
