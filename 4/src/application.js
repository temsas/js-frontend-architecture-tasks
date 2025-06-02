// BEGIN
// Файл: application.js

export default function setupCompanies(companies) {
    const container = document.querySelector('.container.m-3')

    let descriptionElement = null
    let currentCompanyId = null

    companies.forEach(company => {
        const button = document.createElement('button')
        button.className = 'btn btn-primary mr-2' // Добавляем отступ между кнопками
        button.textContent = company.name

        button.addEventListener('click', () => {
            if (currentCompanyId === company.id) {
                if (descriptionElement) {
                    container.removeChild(descriptionElement)
                    descriptionElement = null
                }
                currentCompanyId = null
                return
            }

            if (descriptionElement) {
                container.removeChild(descriptionElement)
            }

            if (company.description) {
                descriptionElement = document.createElement('div')
                descriptionElement.className = 'mt-3 p-3 border rounded' // Добавляем стили
                descriptionElement.textContent = company.description
                container.appendChild(descriptionElement)
            } else {
                descriptionElement = null
            }
            currentCompanyId = company.id
        })
        container.appendChild(button)
    })
}
// END