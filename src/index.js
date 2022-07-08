import './css/styles.css';
import { fetchCountry } from './fetchcountry';
import debounce from 'lodash.debounce';
import { Notify } from "notiflix";

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const listOFCountries = document.querySelector('.country-list')
const countryInfoContainer = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onInputCountryName, DEBOUNCE_DELAY));

function onInputCountryName() {
    const name = searchBox.value.trim();
    if(name === '') {
        listOFCountries.innerHTML = '';
        countryInfoContainer.innerHTML = '';
        return;
    }

    fetchCountry(name)
       .then(countries => {
           if(countries.length === 1) {
            const markup = countries.map(country => renderCountryInfo(country));
            countryInfoContainer.innerHTML = markup.join('');
            listOFCountries.innerHTML = '';
           } 

           if (countries.length > 10) {
                tooManyMatchesCountriesName();
                countryInfoContainer.innerHTML = '';
                listOFCountries.innerHTML = '';
                return;
           } 
        
           if (countries.length < 10) {
                const listMarkup = countries.map(country => renderCountryList(country));
                listOFCountries.innerHTML = listMarkup.join('');
                countryInfoContainer.innerHTML = '';
           }
       })
       .catch(error => {
        Notify.failure('Oops, there is no country with that name');
        countryInfoContainer.innerHTML = '';
        listOFCountries.innerHTML = '';
        return error;
       });
}


function renderCountryList({ name, flags }) {
        return `
            <li class="country-list__item">
                <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 30px height = 30px>
                <h2 class="country-list__name">${name.official}</h2>
            </li>
            `
  }
  
  function renderCountryInfo({ capital, population, languages }) {
        return `
        <div class="country-info__container">
          <div class="country-info__wrapper">
            <img class="country-info__flags" src="${flags.svg}" alt="${name.official}" width="50" />
            <h2 class="country-info__name">${name.official}</h2>
          </div>
          <p class="country-info__capital"><span class="country-info__weight">Capital:</span> ${capital}</p>
          <p class="country-info__population"><span class="country-info__weight">Population:</span> ${population}</p>
          <p class="country-info__languages"><span class="country-info__weight">Languages:</span> ${Object.values(
          languages,)}</p>
        </div>
    `;
  }
  

function tooManyMatchesCountriesName() {
    Notify.info('Too many matches found. Please enter a more specific name.');
}

function notExistingCountryName() {
    Notify.failure('Oops, there is no country with that name');
    countryInfoContainer.innerHTML = '';
    listOFCountries.innerHTML = '';
}







 