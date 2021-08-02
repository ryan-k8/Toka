// the 2 imports below are import for transpiling async/await
import "core-js/stable";
import "regenerator-runtime/runtime";

import FirebaseHelper from "./db/firebase";
import lazyReq from "./db/lazyreq";
import Views from "./views/views";

const views = new Views();
const api = new lazyReq();
//account login/logout


views.accountComponent.addEventListener("click", async (e) => {
  if (e.target.id === "sign-in-btn") {
    try {
      const profile = await FirebaseHelper.authSignIn();

      views.accountlogInState(profile);
      views.showAlert("success", "You are Successfully logged in");
    } catch (err) {
      console.log(err);
    }
    e.preventDefault();
  }
  if (e.target.id === "sign-out-btn") {
    try {
      const result = await FirebaseHelper.authSignOut();
      views.componentC.init();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    views.componentA.init();
    e.preventDefault();
  }
});

// search
views.searchInput.addEventListener("keyup", async (e) => {
  if (e.key === "Enter") {
    if (e.target.value.trim() === '') {
      views.showAlert('danger','please enter something :/')
    } else {
      try {
        const query = e.target.value;

        views.searchInput.value = null;

        views.spinnerState("section-c");
        const data = await api.get(
          `https://powerful-beach-14543.herokuapp.com/search/${query}`
        );
        if (data.length === 0) {
          views.showAlert("danger", "ApiError : Nothing Found : ( ");
          views.componentC.default()
        } else {
          views.searchResultsState(data);
        }
      } catch (err) {
        console.log(err);
        views.showAlert("danger", err);
      }
    }
  }
});
views.searchBtn.addEventListener("click", async (e) => {

  if (views.searchInput.value.trim() === '') {
    views.showAlert('danger','please enter something :/')
  } else {
    try {
      
      const query = views.searchInput.value;
      views.searchInput.value = null;
  
      views.spinnerState("section-c");
      const data = await api.get(
        `https://powerful-beach-14543.herokuapp.com/search/${query}`
      );
      if (data.length === 0) {
        views.showAlert("danger", "ApiError : Nothing Found : ( ");
        views.componentC.default()
      } else {
        views.searchResultsState(data);
      }
    } catch (err) {
      console.log(err);
      views.showAlert("danger", err);
    }

  }
});
