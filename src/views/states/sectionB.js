const loggedOutState = function () {
  document.getElementById("section-b").innerHTML = null;
};

const spinnerState = function () {
  document.getElementById("section-b").innerHTML = `
    <div class="spinner-div">
      <div class="loader loader-b">Loading...</div>
    </div>
      `;
};

const userListState = function (userAnimeList) {
  const listItemsDiv = document.createElement("div");
  listItemsDiv.classList.add("saved-list-items");

  userAnimeList.forEach((anime) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item", "mt-2", "p-2");
    itemDiv.setAttribute("data-anime-id", anime.id);

    itemDiv.innerHTML = `
    <div class="item-photo">
      <i class="fas fa-tv fa-2x"></i>
    </div>
  <div class="item-name" data-anime-id="${anime.id}">
      ${anime.title}
    <span class="tooltip-text"> Status : ${anime.status} </span>
  </div>
  `;
    listItemsDiv.appendChild(itemDiv);
  });

  document.getElementById("section-b").innerHTML = null;
  document.getElementById("section-b").appendChild(listItemsDiv);
};

export { loggedOutState, spinnerState, userListState };
