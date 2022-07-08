import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from "notiflix";
import { fetchCountry } from './js/fetchcountry';
import {renderCountryList, renderCountryInfo} from './js/markups';
import {alertTooManyMatches, alertNoSuchCountry} from './js/alertsNotifications';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const listOFCountries = document.querySelector('.country-list');
const countryInfoContainer = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onInputCountryName, DEBOUNCE_DELAY));

function onInputCountryName() {
    const name = searchBox.value.trim()
    if (name === '') {
       listOFCountries.innerHTML = '';
       countryInfoContainer.innerHTML = '';
       return;
    }
  
    fetchCountry(name)
      .then(countries => {
        listOFCountries.innerHTML = '';
        countryInfoContainer.innerHTML = '';
        if (countries.length > 10) {
            alertTooManyMatches();
        } 

        if (countries.length > 2 && countries.length <= 10) {
            const listMarkup = countries.map(country => renderCountryList(country));
            listOFCountries.innerHTML = listMarkup.join('');
    
           //listOFCountries.insertAdjacentHTML('beforeend', renderCountryList(country));
        }

        if (countries.length === 1) {
            const markupInfo = countries.map(country => renderCountryInfo(country));
            console.log(markupInfo)
            countryInfoContainer.innerHTML = markupInfo;
            
            
            //listOFCountries.insertAdjacentHTML('beforeend', renderCountryList(countries));
            //countryInfoContainer.insertAdjacentHTML('beforeend',renderCountryInfo(country));
        } 
      })
      .catch(alertNoSuchCountry);
  };  
  







 