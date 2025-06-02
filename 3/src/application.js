// BEGIN
const renderLaptops = (laptops) => {
    const resultDiv = document.querySelector('.result');
    resultDiv.innerHTML = ''
    if (laptops.length === 0) {
        return
    }
    const ul = document.createElement('ul')
    laptops.forEach(laptop => {
        const li = document.createElement('li')
        li.textContent = laptop.model
        ul.appendChild(li)
    })
    resultDiv.appendChild(ul)
}
const applyFilters = (laptops, filters) => {
    return laptops.filter(laptop => {
        return Object.entries(filters).every(([key, value]) => {
            if (!value) return true;
            if (key.endsWith('_eq')) {
                const prop = key.split('_')[0]
                return laptop[prop] === value || laptop[prop] === parseInt(value, 10)
            }
            if (key.endsWith('_gte')) {
                const prop = key.split('_')[0]
                return laptop[prop] >= parseFloat(value)
            }
            if (key.endsWith('_lte')) {
                const prop = key.split('_')[0]
                return laptop[prop] <= parseFloat(value)
            }
            return true
        })
    })
}

const run = (laptops) => {
    const form = document.querySelector('form')
    const filters = {
        processor_eq: '',
        memory_eq: '',
        frequency_gte: '',
        frequency_lte: ''
    }

    const handleFilterChange = () => {
        const filteredLaptops = applyFilters(laptops, filters)
        renderLaptops(filteredLaptops)
    }
    form.addEventListener('input', (event) => {
        const { name, value } = event.target
        filters[name] = value
        handleFilterChange()
    })
    form.addEventListener('change', (event) => {
        const { name, value } = event.target
        filters[name] = value
        handleFilterChange()
    })
    renderLaptops(laptops)
}

export default run;
// END