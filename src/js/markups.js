export function renderCountryList({ name, flags }) {
    return `
        <li class="country-list__item">
            <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 30px height = 30px>
            <h2 class="country-list__name">${name.official}</h2>
        </li>
        `
}

export function renderCountryInfo({ name, flags, capital, population, languages }) {
    return `
    <div class="country-info__container">
        <div class="country-info__wrapper">
          <img class="country-info__flags" src="${flags.svg}" alt="${name.official}" width="50" />
          <h2 class="country-info__name">${name.official}</h2>
        </div>
        <p class="country-info__capital"><span class="country-info__weight">Capital:</span> ${capital}</p>
        <p class="country-info__population"><span class="country-info__weight">Population:</span> ${population}</p>
        <p class="country-info__languages"><span class="country-info__weight">Languages:</span> ${Object.values(languages).join(', ')}</p>
   </div>
`
}