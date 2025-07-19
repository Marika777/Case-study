import { cardsData } from './data/cardsData.js'
import { contactsData } from './data/contactsData.js'
import { formFieldsData } from './data/formFieldsData.js'

import { renderCards, initTabs } from './components/cards.js'
import { renderContacts } from './components/contacts.js'
import { renderFormFields, setupFormValidation } from './components/form.js'
import { initBurgerMenu } from './components/UI/burgerMenu.js'

document.addEventListener('DOMContentLoaded', () => {
  renderCards(cardsData)
  initTabs(cardsData)
  renderContacts(contactsData)
  renderFormFields('.contacts__form', formFieldsData)
  setupFormValidation('.contacts__form')
  initBurgerMenu()
})