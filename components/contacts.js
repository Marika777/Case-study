import { contactsData } from "../data/contactsData.js"

export const renderContacts = (contacts = contactsData) => {
  const list = document.getElementById('contacts-list')
  list.innerHTML = contacts.map(contact => `
    <li class="contacts__item">
      <span class="contacts__icon contacts__icon--${contact.icon}">
        <img src="icon/${contact.icon}.svg" alt="${contact.label}">
      </span>
      <div class="contacts__content">
        <span class="contacts__label">${contact.label}</span>
        <span class="contacts__value">${contact.value}</span>
      </div>
    </li>
  `).join('')
}