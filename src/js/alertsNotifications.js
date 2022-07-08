import { Notify } from "notiflix";
export function alertNoSuchCountry() {
    Notify.failure('Oops, there is no country with that name')
  }
  
export function alertTooManyMatches() {
    Notify.info('Too many matches found. Please enter a more specific name.')
  }