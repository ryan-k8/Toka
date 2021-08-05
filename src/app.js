// the 2 imports below are import for transpiling async/await
import "core-js/stable";
import "regenerator-runtime/runtime";

import FirebaseHelper from "./db/firebase";
import { LocalStorage } from "./db/model";
import lazyReq from "./api/lazyreq";
import Views from "./views/views";

const views = new Views();
const api = new lazyReq();
const model = new LocalStorage();
//account login/logout

views.accountComponent.addEventListener("click", async (e) => {
  e.preventDefault();
  if (e.target.id === "sign-in-btn") {
    try {
      let profile = await FirebaseHelper.authSignIn();

      const {
        displayName: userName,
        photoURL: profileImage,
        email: userEmail,
      } = profile;

      profile = {
        userName: userName,
        profileImage: profileImage,
        userEmail: userEmail,
      };

      model.init(profile);

      views.accountlogInState(profile);

      views.showAlert("success", "You are Successfully logged in");

      views.renderSpinner("section-b");

      //firebase user's list
      const userList = await FirebaseHelper.getUserList(userEmail);
      if (!userList.exists) {
        await FirebaseHelper.setUserList(userEmail, {
          list: null,
        });
        views.sectionB.init();
      } else {
        views.renderUserAnimeList(userList.list);
      }
    } catch (err) {
      views.showAlert("danger", err);
    }
  }
  if (e.target.id === "sign-out-btn") {
    try {
      const result = await FirebaseHelper.authSignOut();

      localStorage.clear();
      views.sectionB.init();
      views.sectionC.init();

      views.showAlert("success", result);
    } catch (error) {
      console.log(error);
    }
    views.sectionA.init();
  }
});

// search
views.searchInput.addEventListener("keyup", async (e) => {
  if (e.key === "Enter") {
    if (e.target.value.trim() === "") {
      views.showAlert("danger", "please enter something :/");
    } else {
      try {
        const query = e.target.value;

        views.searchInput.value = null;

        views.renderSpinner("section-c");
        const data = await api.get(
          `https://powerful-beach-14543.herokuapp.com/search/${query}`
        );
        if (data.length === 0) {
          views.showAlert("danger", "ApiError : Nothing Found : ( ");
          views.sectionC.default();
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
  if (views.searchInput.value.trim() === "") {
    views.showAlert("danger", "please enter something :/");
  } else {
    try {
      const query = views.searchInput.value;
      views.clearFields();

      views.renderSpinner("section-c");
      const data = await api.get(
        `https://powerful-beach-14543.herokuapp.com/search/${query}`
      );
      if (data.length === 0) {
        views.showAlert("danger", "ApiError : Nothing Found : ( ");
        views.sectionC.default();
      } else {
        views.searchResultsState(data);
      }
    } catch (err) {
      console.log(err);
      views.showAlert("danger", err);
    }
  }
});

views.mainUI.addEventListener("click", async (e) => {
  e.preventDefault();

  async function renderAnimeTitle(animeid) {
    views.renderSpinner("section-c");

    let apiData = await api.get(
      `https://powerful-beach-14543.herokuapp.com/getdetails/${animeid}`
    );

    const animeData = { ...apiData, animeid: animeid };
    if (!localStorage.getItem("local")) {
      //logged out state
      views.renderAnimeTitle(animeData);
    } else {
      const userList = model
        .get()
        .data.list.find((anime) => anime.id === animeid);

      if (!userList) {
        views.renderAnimeTitle(animeData);
      } else {
        //extra param to render changed actions div
        views.renderAnimeTitle(animeData, {
          inList: true,
          status: `${userList.status}`,
        });
      }
    }

    //TODO : fix error on logged out state

    // views.sectionC.default();
  }

  if (e.target.classList.contains("anime-selection")) {
    e.preventDefault();

    if (e.target.hasAttribute("data-anime-id")) {
      const animeid = e.target.getAttribute("data-anime-id");
      await renderAnimeTitle(animeid);
    } else if (e.target.parentElement.hasAttribute("data-anime-id")) {
      const animeid = e.target.parentElement.getAttribute("data-anime-id");
      await renderAnimeTitle(animeid);
    } else if (
      e.target.parentElement.parentElement.parentElement.hasAttribute(
        "data-anime-id"
      )
    ) {
      const animeid =
        e.target.parentElement.parentElement.parentElement.getAttribute(
          "data-anime-id"
        );

      // checkIfinUserList(animeid);

      await renderAnimeTitle(animeid);
    }
  }
  if (e.target.className === "watch-btn") {
    const episodeNumber = views.getEpNumber().trim();
    if (episodeNumber === "") {
      views.clearFields();
      views.showAlert("danger", "please enter something :/");
    } else {
      views.clearFields();
      const animeid = e.target.parentElement.getAttribute("data-anime-id");

      const data = await api.get(
        `https://powerful-beach-14543.herokuapp.com/stream/${animeid}/ep/${episodeNumber}`
      );
      if (data.episode_exists === "true") {
        const {
          vidcdn: gogocdn = null,
          streamsb: streamsb = null,
          streamtape: streamtape = null,
          doodstream: doodstream = null,
          server: hydrax = null,
          mixdrop: mixdrop = null,
          streamhd: streamhd = null,
        } = data;

        const streamObj = {
          streamtape: streamtape,
          doodstream: doodstream,
          mixdrop: mixdrop,
          streamsb: streamsb,
          hydrax: hydrax,
          streamhd: streamhd,
          vidcdn: gogocdn,
        };

        views.renderStreamPlayer(streamObj);

        views.showAlert("success", "Episode found ! :)");
      } else {
        views.showAlert(
          "danger",
          "Episode either doesn't exist or not found :-("
        );
      }
    }
  }
  if (e.target.classList.contains("btn-stream")) {
    const newSrc = e.target.getAttribute("data-video");

    views.renderChangedEpisodePlayer(newSrc);
  }
});
