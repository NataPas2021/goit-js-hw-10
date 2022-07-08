import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from "notiflix";
import { fetchCountry } from './js/fetchcountry';
import {renderCountryList, renderCountryInfo} from './js/markups';
import {alertTooManyMatches, alertNoSuchCountry} from './js/alertsNotifications';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const listOFCountries = document.querySelector('.country-list')
const countryInfoContainer = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onInputCountryName, DEBOUNCE_DELAY));

function onInputCountryName() {
    const name = searchBox.value.trim()
    if (name === '') {
      return (listOFCountries.innerHTML = ''), (countryInfoContainer.innerHTML = '');
    }
  
    fetchCountry(name)
      .then(countries => {
        listOFCountries.innerHTML = '';
        countryInfoContainer.innerHTML = '';
        if (countries.length === 1) {
          listOFCountries.insertAdjacentHTML('beforeend', renderCountryList(countries));
          countryInfoContainer.insertAdjacentHTML('beforeend', renderCountryInfo(countries));
        } else if (countries.length >= 10) {
          alertTooManyMatches();
        } else {
          listOFCountries.insertAdjacentHTML('beforeend', renderCountryList(countries));
        }
      })
      .catch(alertNoSuchCountry);
  };  
  







 