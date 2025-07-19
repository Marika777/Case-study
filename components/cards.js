import { cardsData } from '../data/cardsData.js'

let swiperInstance = null

export const createCardHTML = (card) => {
  return `
    <div class="card" data-type="${card.type}" tabindex="0">
      <div class="card__image-wrap">
        <img class="card__image" src="${card.src}" alt="${card.title}"/>
        <button type="button"  class="card__btn-add"><img src="icon/plus.svg" alt="plus"></button>
        <div class="card__overlay">
          <div class="card__text-glow">
            <span class="card__title">${card.title}</span>
            <span class="card__category">${card.category}</span>
          </div>
        </div>
      </div>
    </div>
  `
}

export const renderCardsGrid = (cards) => {
  document.querySelector('.card-list__grid').innerHTML = cards.map(createCardHTML).join('')
}

export const renderCardsSwiper = (cards) => {
  document.querySelector('.card-list__slider .swiper-wrapper').innerHTML = cards.map(card => `
    <div class="swiper-slide">${createCardHTML(card)}</div>
  `).join('')
}

export const renderCards = (cards) => {
  const grid = document.querySelector('.card-list__grid')
  const slider = document.querySelector('.card-list__slider')

  if(window.innerWidth < 800) {
    grid.style.display = 'none'
    slider.style.display = 'block'
    renderCardsSwiper(cards)
    if(!swiperInstance) {
      swiperInstance = new Swiper('.card-list__slider', {
        slidesPerView: 3,
        centeredSlides: true,
        spaceBetween: 24,
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          800: { slidesPerView: 2, spaceBetween: 18 },
          650: { slidesPerView: 1.5, spaceBetween: 12 },
          0:   { slidesPerView: 1, spaceBetween: 8 }
        }
      })
    } else {
      swiperInstance.update()
    }
  } else {
    slider.style.display = 'none'
    grid.style.display = 'grid'
    renderCardsGrid(cards)
    if(swiperInstance) {
      swiperInstance.destroy(true, true)
      swiperInstance = null
    }
  }
}

export const initTabs = () => {
  document.querySelectorAll('.tabs__item').forEach(tab => {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.tabs__item').forEach(t => t.classList.remove('tabs__item--active'))
      tab.classList.add('tabs__item--active')
      const type = tab.dataset.tab
      const filtered = type === 'all' ? cardsData : cardsData.filter(c => c.type === type)
      renderCards(filtered)
    })
  })
}

window.addEventListener('resize', () => {
  const activeTab = document.querySelector('.tabs__item--active').dataset.tab
  const filtered = (activeTab === 'all') ? cardsData : cardsData.filter(c => c.type === activeTab)
  renderCards(filtered)
})