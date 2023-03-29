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
  console.log("🚀  searchQuery", searchQuery)

  API.fetchCountries(searchQuery)
    .then(renderCountrys)
    .catch(onFetchError)
  // .finally(() => reset());
  
}

function onFetchError(error) {
return Notiflix.Notify.failure(`❌ Oops, there is no country with that name`);
};


function renderCountrys(country) {
  const quantity = country.length;
  
  if (quantity > 10) {
    return Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`);
  } else if(quantity <= 1) {const markup = country
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
  } else {
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
  



// const fetchPostsBtn = document.querySelector(".btn");
// const userList = document.querySelector(".posts");

// fetchPostsBtn.addEventListener("click", () => {
//   fetchPosts()
//     .then((posts) => renderPosts(posts))
//     .catch((error) => console.log(error));
// });

// function fetchPosts() {
//   // Change the number of items in the group here  
//   return fetch("https://jsonplaceholder.typicode.com/posts?_limit=5").then(
//     (response) => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     }
//   );
// }

// function renderPosts(posts) {
//   const markup = posts
//     .map(({ id, title, body, userId }) => {
//       return `<li>
//           <h2 class="post-title">${title.slice(0, 30)}</h2>
//           <p><b>Post id</b>: ${id}</p>
//           <p><b>Author id</b>: ${userId}</p>
//           <p class="post-body">${body}</p>
//         </li>`;
//     })
//     .join("");
//   userList.innerHTML = markup;