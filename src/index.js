import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import API from './fetchCountries';


const search = document.querySelector('#search-box');
const countryCard = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

const DEBOUNCE_DELAY = 300;

search.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  e.preventDefault();

  const searchQuery = search.value;
  
  if (!searchQuery) {
    clearMarkup();
    return;
  }

  API.fetchCountries(searchQuery)
    .then(renderCountrys)
    .catch(onFetchError)
}

function onFetchError(error) {
  countryCard.innerHTML = "";
  countryList.innerHTML = "";
  Notiflix.Notify.failure(`❌ Oops, there is no country with that name`);
};

function clearMarkup() {
  countryCard.innerHTML = "";
  countryList.innerHTML = "";
}

function renderCountrys(country) {
  const quantity = country.length;
  
  if (quantity > 10) {
    Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`);
    countryCard.innerHTML = "";
    countryList.innerHTML = "";    
  }
  else if (quantity <= 1) {
    const markup = country
    .map(({ capital, population, languages, flags, name }) => {
      return `<svg width="24" height="24" viewBox="0 0 24 24">
  <image href="${flags.svg}" width="24" height="24"></image></svg>
  <span><b>${name.official}</b></span>
      <p><b>Capital</b>: ${capital}</p>
      <p><b>Population</b>: ${population}</p>
      <p><b>Languages</b>: ${Object.values(languages)}</p>`;
    })
    .join("");
    countryCard.innerHTML = markup;
    countryList.innerHTML = "";
  }
  else {
    const mark = country
    .map(({ flags, name }) => {
      return `<p><svg width="24" height="24" viewBox="0 0 24 24">
  <image href="${flags.svg}" width="24" height="24"></image></svg>
  <span><b>${name.official}</b></span></p>`;
    })
    .join("");
    countryList.innerHTML = mark;
    countryCard.innerHTML = "";
  }
}