import { SectionA, SectionB, SectionC } from "./section";
import * as statesA from "./states/sectionA";
import * as statesB from "./states/sectionB";
import * as statesC from "./states/sectionC";

class Views {
  constructor() {
    // three below are only for changing states
    this.sectionA = new SectionA(); //account
    this.sectionB = new SectionB(); // section-b (firebase lists)
    this.sectionC = new SectionC(); // section-c (main ui)

    this.searchInput = document.getElementById("searchinput");
    this.searchBtn = document.querySelector(".search-btn");
    this.accountComponent = document.querySelector(".account-div");

    this.mainUI = document.getElementById("section-c");
    this.userList = document.getElementById("section-b");

    //setting up initial states
    this.sectionA.init();
    this.sectionB.init();
    this.sectionC.init();
  }

  showAlert(status, message) {
    const alertDiv = document.createElement("div");
    alertDiv.classList.add("alert", `${status}`, "p-1");
    alertDiv.innerHTML = `
    <p class="alert-message">${message}</p>
  <i class="alert-close-btn fas fa-times"></i>
    `;
    document.querySelector(".alert-parent").prepend(alertDiv);
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 2200);
  }

  accountlogInState(profile) {
    this.sectionA.change(new statesA.loggedInState(profile));
    this.sectionC.change(new statesC.loggedInState(profile));
  }

  renderSpinner(sectionId) {
    if (sectionId === "section-c") {
      this.sectionC.change(new statesC.spinnerState());
    }
    if (sectionId === "section-b") {
      this.sectionB.change(new statesB.spinnerState());
      // console.log("spinners on section-b hehe");
    }
  }

  searchResultsState(result) {
    this.sectionC.change(new statesC.searchResultState(result));
  }

  renderAnimeTitle(animeData, options = { inList: false }) {
    this.sectionC.change(new statesC.animeTitleState(animeData, options));
  }

  renderStreamPlayer(streamData) {
    this.sectionC.change(new statesC.streamPlayerState(streamData));
  }

  renderChangedEpisodePlayer(newSrc) {
    this.sectionC.change(new statesC.changedPlayerSourceState(newSrc));
  }

  renderUserAnimeList(animeListArr) {
    this.sectionB.change(new statesB.userListState(animeListArr));
  }

  clearFields() {
    this.searchInput.value = null;
    document.getElementById("episode-num-input").value = null;
  }

  getEpNumber() {
    return document.getElementById("episode-num-input").value;
  }
}

export default Views;
