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
    resultDiv.classList.add("result-item", "anime-selection");
    resultDiv.setAttribute("data-anime-id", `${resultItem.animeid}`);
    resultDiv.innerHTML = `
        <img src="${resultItem.image}" alt="" />
        <div class="text anime-selection">
        <div class="text-wrap">
            <p class="text-title anime-selection">${resultItem.title}</p>
        </div>
        </div>
        `;
    searchResultsDiv.append(resultDiv);
  });
  document.getElementById("section-c").innerHTML = null;
  document.getElementById("section-c").append(searchResultsDiv);
};

const animeTitleState = function (animeData, id) {
  document.getElementById("section-c").innerHTML = `
  <div class="anime-div">
   <div class="anime-info">
      <div class="anime-img">
         <img
            src="${animeData.image_url}"
            alt="anime-img"
            />
      </div>
      <div class="anime-text-desc p-1 my-2">
         <h2>${animeData.title}</h2>
         <div class="anime-details my-1">
            <h4><span id="anime-other">${animeData.other_names}</span></h4>
            <h4>Year : <span id="anime-year">${animeData.year}</span></h4>
            <h4>Status : <span id="anime-status">${animeData.status}</span></h4>
            <h4>Episodes : <span id="anime-episodes">${animeData.episodes}</span></h4>
            <h4>
               Genre :
               <span id="anime-genre"
                  >${animeData.genre}</span
                  >
            </h4>
         </div>
         <p id="anime-plot">${animeData.plot_summary}</p>
      </div>
   </div>
   <div class="my-1 p-3" id="actions-div">
      <a href="#" class="btn btn-firestore">Add To List</a>
      <div id="episode-watcher" data-anime-id="${animeData.animeid}">
         <input
            type="text"
            id="episode-num-input"
            placeholder="enter episode num here"
            />
         <a href="#" class="watch-btn">Watch</a>
      </div>
   </div>
   </div>
  `;
};

const streamPlayerState = function (streamData) {
  //   <div class="episode-player-div p-1">
  //     <iframe id="player-iframe"
  //       src="https://streamtape.com/e/3Wd2JmlXQMFdqx7/naruto-episode-220.mp4"
  //       frameborder="0"
  //       allowfullscreen
  //     ></iframe>
  //     <div class="stream-selector-div my-1 p-1">
  //       <a href="#" class="btn btn-stream">streamtape</a>
  //       <a href="#" class="btn btn-stream">doodstream</a>
  //       <a href="#" class="btn btn-stream">vidcdn</a>
  //       <a href="#" class="btn btn-stream">streamsb</a>
  //       <a href="#" class="btn btn-stream">hydrax</a>
  //      <a href="#" class="btn btn-stream">hydrax</a>
  //      <a href="#" class="btn btn-stream">hydrax</a>
  //     </div>
  //   </div>
  const episodePlayerDiv = document.createElement("div");
  episodePlayerDiv.classList.add("episode-player-div", "p-1");
  const iframePlayer = document.createElement("iframe");
  iframePlayer.id = "player-iframe";
  iframePlayer.setAttribute("allowfullscreen", "");
  iframePlayer.setAttribute("frameborder", "0");

  if (streamData.doodstream) {
    iframePlayer.src = streamData.doodstream;
  } else {
    for (let key in streamData) {
      if (streamData[key]) {
        iframePlayer.src = streamData[key];
        break;
      }
    }
  }
  episodePlayerDiv.appendChild(iframePlayer);

  const streamSelectorDiv = document.createElement("div");
  streamSelectorDiv.classList.add("stream-selector-div", "my-1", "p-1");

  Object.entries(streamData).forEach(([key, value]) => {
    if (value) {
      const streamBtn = document.createElement("a");
      streamBtn.classList.add("btn", "btn-stream");
      streamBtn.href = `stream-${key}`;
      streamBtn.setAttribute(`data-${key}`, value);
      streamBtn.textContent = key;
      streamSelectorDiv.appendChild(streamBtn);
    }
  });

  episodePlayerDiv.appendChild(streamSelectorDiv);
  document.querySelector(".anime-div").appendChild(episodePlayerDiv);
};

export {
  loggedOutState,
  loggedInState,
  spinnerState,
  searchResultState,
  animeTitleState,
  streamPlayerState,
};
