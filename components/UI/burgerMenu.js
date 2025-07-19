export const initBurgerMenu = () => {
  const burger = document.querySelector('.tabs__burger')
  const menu = document.querySelector('.tabs__list')

  burger.addEventListener('click', () => {
    menu.classList.toggle('tabs__list--open')
  })
  document.querySelectorAll('.tabs__item').forEach(tab => {
    tab.addEventListener('click', () => {
      if(window.innerWidth <= 650) menu.classList.remove('tabs__list--open')
    })
  })
  document.addEventListener('click', e => {
    if(window.innerWidth > 650) return
    if(!menu.contains(e.target) && !burger.contains(e.target)) {
      menu.classList.remove('tabs__list--open')
    }
  })
  window.addEventListener('resize', ()=>{
    if(window.innerWidth > 650) menu.classList.remove('tabs__list--open')
  })
}
