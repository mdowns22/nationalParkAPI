'use strict';

const api_key = '2lRfNWgma8I3I2UedpaFWFlkhlZb4eAwp6FcDTiM';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function getParks(states, maxResults=10) {
  const params = {
    api_key:api_key,
    stateCode:[states],
    //q:query,
    limit:maxResults,
    fields:['addresses']
  };

  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;
  console.log(url);
  fetch(url)
  .then(response => response.json())
  .then(responseJson => displayData(responseJson))
  .catch(error => alert(error))
}

  function displayData(responseJson) {
    console.log(responseJson);
    for(let i = 0; i < responseJson.data.length; i++) {
      $('.results-list').append(`<h4>${responseJson.data[i].fullName}</h4>`);
      $('.results-list').append(`<p>States: ${responseJson.data[i].states}</p>`);
      $('.results-list').append(`<p>${responseJson.data[i].description}</p>`);
      $('.results-list').append(`<p><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</p>`);
      $('.results-list').append(`<p>${responseJson.data[i].addresses[0].line1}</p>`);
      $('.results-list').append(`<span>${responseJson.data[i].addresses[0].city}</span><span>, ${responseJson.data[i].addresses[0].stateCode}</span><span> ${responseJson.data[i].addresses[0].postalCode}</span>`);
     // $('.results-list').append(`<p>${responseJson.data[i].addresses[0].stateCode}</p>`);
      //$('.results-list').append(`<p>${responseJson.data[i].addresses[0].postalCode}</p>`);
    }
    $('#results').removeClass('hidden');
  }


  function watchForm() {
    $('#js-form').submit(event => {
      $('.results-list').empty();
      event.preventDefault();
      const searchTerm = $('#search-for-parks').val().toUpperCase();
      const maxResults = $('#maximum-number').val();
      getParks(searchTerm, maxResults);
    });
  }

  function ready() {
    console.log('App loaded watiting for submit');
    watchForm();
  }

  ready();


