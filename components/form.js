import { formFieldsData } from "../data/formFieldsData.js"

export const renderFormFields = (wrapperSelector, fields = formFieldsData) => {
  const wrapper = document.querySelector(wrapperSelector)
  const rows = {}

  fields.forEach(field => {
    if (!rows[field.row]) rows[field.row] = []
    rows[field.row].push(field)
  })

  let html = ''
  Object.keys(rows).sort().forEach(rowNum => {
    const rowFields = rows[rowNum]
    if (rowFields.length === 1 && rowFields[0].type === "textarea") {
      const field = rowFields[0]
      html += `
        <label>
          <span class="contacts__field-label">${field.label}</span>
          <div class="textarea-border-wrapper">
            <textarea name="${field.name}" placeholder="${field.placeholder}" ${field.required?'required':''}></textarea>
          </div>
        </label>
      `
    } else {
      html += `<div class="contacts__row">`
      rowFields.forEach(field => {
        html += `
          <label>
            <span class="contacts__field-label">${field.label}</span>
            <input name="${field.name}" type="${field.type}" placeholder="${field.placeholder}" ${field.required?'required':''} />
          </label>
        `
      })
      html += `</div>`
    }
  })
  html += `<button type="submit" class="contacts__form-submit">Send Message</button>`
  wrapper.innerHTML = html
}

export const setupFormValidation = (formSelector) => {
  document.querySelector(formSelector).addEventListener('input', function(e) {
    if(e.target.name === 'phone') {
      e.target.value = e.target.value.replace(/\D/g, '')
    }
  })
  document.querySelector(formSelector).addEventListener('submit', function(e){
    e.preventDefault()
    alert('Form submitted!')
    e.target.reset()
  })
}