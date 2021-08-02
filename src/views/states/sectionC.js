const loggedOutState = function () {
  document.getElementById("section-c").innerHTML = `
    <div class="dom-loaded-div">
        <h2 class="dom-loaded-text">Please log in to fully  use the app.</h2>
    </div>
    `;
};
const loggedInState = function (profile) {
  document.getElementById("section-c").innerHTML = `
  <div class="dom-loaded-div">
  <h2 class="dom-loaded-text">Hi <strong>${profile.displayName}</strong> you are logged in . Try it out! :)</h2>
  </div>
    `;
};

const spinnerState = function () {
  document.getElementById("section-c").innerHTML = `
    <div class="spinner-div-c">
      <div class="loader loader-c">Loading...</div>
    </div>
    `;
};

const searchResultState = function (searchData) {
  const searchResultsDiv = document.createElement("div");
  searchResultsDiv.classList.add("search-results-div");
  searchData.forEach((resultItem) => {
    const resultDiv = document.createElement("div");
    resultDiv.classList.add("result-item");
    resultDiv.setAttribute("data-anime-id", `${resultItem.animeid}`);
    resultDiv.innerHTML = `
        <img src="${resultItem.image}" alt="" />
        <div class="text">
        <div class="text-wrap">
            <p class="text-title">${resultItem.title}</p>
        </div>
        </div>
        `;
    searchResultsDiv.append(resultDiv);
  });
  document.getElementById("section-c").innerHTML = null;
  document.getElementById("section-c").append(searchResultsDiv);
};

export { loggedOutState, loggedInState, spinnerState, searchResultState };
