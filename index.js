
const apiKey = 'VIaevRm5pb7dOoiWpjVMjft5z3I93acycZ6wvafc';

const searchURL = 'https://developer.nps.gov/api/v1/parks';

function displayResults(responseJson, maxResults) {
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length & i<maxResults ; i++){
    $('#results-list').append(
      `<li>
      <h3>${responseJson.data[i].fullName}</h3>
      <p><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></p>
      <p>${responseJson.data[i].description}</p>
      </li>`
    );}
  $('#results').removeClass('hidden');
}

function getParks(stateCode, maxResults=10) {
  const url = searchURL + '?stateCode=' + stateCode + '&limit='
   + maxResults + '&api_key=' + apiKey;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    console.log(searchTerm);
    getParks(searchTerm, maxResults);
  });
}

$(watchForm);