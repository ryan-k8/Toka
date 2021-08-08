// the 2 imports below are import for transpiling async/await
import "core-js/stable";
import "regenerator-runtime/runtime";

import FirebaseHelper from "../db/firebase";
import { LocalStorage } from "../db/model";
import lazyReq from "../api/lazyreq";
import Views from "../views/views";

class Controller {
  constructor() {
    this.views = new Views();
    this.api = new lazyReq();
    this.model = new LocalStorage();
  }

  async sectionAClickHandler(e) {
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

        this.model.init(profile);

        console.log();

        this.views.renderAccountLogIn(profile);

        this.views.renderAlert("success", "You are Successfully logged in");

        this.views.renderSpinner("section-b");

        //firebase user's list
        const userList = await FirebaseHelper.getUserList(userEmail);
        if (!userList.exists) {
          await FirebaseHelper.setUserList(userEmail, {
            list: null,
          });
          this.views.sectionB.init();
        } else {
          this.views.renderUserAnimeList(userList.list);
        }
      } catch (err) {
        this.views.renderAlert("danger", err);
      }
    }
    if (e.target.id === "sign-out-btn") {
      try {
        const result = await FirebaseHelper.authSignOut();

        localStorage.clear();
        this.views.sectionB.init();
        this.views.sectionC.init();

        this.views.renderAlert("success", result);
      } catch (error) {
        console.log(error);
      }
      this.views.sectionA.init();
    }

    if (e.target.classList.contains("search-btn")) {
      if (this.views.searchInput.value.trim() === "") {
        this.views.renderAlert("danger", "please enter something :/");
      } else {
        try {
          const query = this.views.searchInput.value;
          this.views.clearFields();

          this.views.renderSpinner("section-c");
          const data = await this.api.get(
            `https://powerful-beach-14543.herokuapp.com/search/${query}`
          );
          if (data.length === 0) {
            this.views.renderAlert("danger", "ApiError : Nothing Found :( ");
            this.views.sectionC.default();
          } else {
            this.views.renderSearchResults(data);
          }
        } catch (err) {
          console.log(err);
          this.views.renderAlert("danger", err);
        }
      }
    }
  }

  async sectionAKeyUpHandler(e) {
    if (e.key === "Enter") {
      if (e.target.value.trim() === "") {
        this.views.renderAlert("danger", "please enter something :/");
      } else {
        try {
          const query = e.target.value;

          this.views.searchInput.value = null;

          this.views.renderSpinner("section-c");
          const data = await this.api.get(
            `https://powerful-beach-14543.herokuapp.com/search/${query}`
          );
          if (data.length === 0) {
            this.views.renderAlert("danger", "ApiError : Nothing Found : ( ");
            this.views.sectionC.default();
          } else {
            this.views.renderSearchResults(data);
          }
        } catch (err) {
          console.log(err);
          this.views.renderAlert("danger", err);
        }
      }
    }
  }

  async sectionBClickHandler(e) {
    e.preventDefault();

    if (
      e.target.classList.contains("item") ||
      e.target.classList.contains("item-name")
    ) {
      const animeid = e.target.getAttribute("data-anime-id");

      this.views.renderSpinner("section-c");

      let apiData = await this.api.get(
        `https://powerful-beach-14543.herokuapp.com/getdetails/${animeid}`
      );

      const animeData = { ...apiData, animeid: animeid };
      if (!localStorage.getItem("local")) {
        //logged out state
        this.views.renderAnimeTitle(animeData);
      } else {
        const userList = this.model
          .get()
          .data.list.find((anime) => anime.id === animeid);

        if (!userList) {
          this.views.renderAnimeTitle(animeData);
        } else {
          //extra param to render changed actions div
          this.views.renderAnimeTitle(animeData, {
            inList: true,
            status: `${userList.status}`,
          });
        }
      }
    }
  }

  async sectionCClickHandler(e) {
    e.preventDefault();

    const renderAnimeTitle = async (animeid) => {
      this.views.renderSpinner("section-c");

      let apiData = await this.api.get(
        `https://powerful-beach-14543.herokuapp.com/getdetails/${animeid}`
      );

      const animeData = { ...apiData, animeid: animeid };
      if (!localStorage.getItem("local")) {
        //logged out state
        this.views.renderAnimeTitle(animeData);
      } else {
        const userList = this.model
          .get()
          .data.list.find((anime) => anime.id === animeid);

        if (!userList) {
          this.views.renderAnimeTitle(animeData);
        } else {
          //extra param to render changed actions div
          this.views.renderAnimeTitle(animeData, {
            inList: true,
            status: `${userList.status}`,
          });
        }
      }
      // this.views.sectionC.default();
    };

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
        await renderAnimeTitle(animeid);
      }
    }
    if (e.target.className === "watch-btn") {
      const episodeNumber = this.views.getEpNumber().trim();
      if (episodeNumber === "") {
        this.views.clearFields();
        this.views.renderAlert("danger", "please enter something :/");
      } else {
        this.views.clearFields();
        const animeid = e.target.parentElement.getAttribute("data-anime-id");

        const data = await this.api.get(
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

          this.views.renderStreamPlayer(streamObj);

          this.views.renderAlert("success", "Episode found ! :)");
        } else {
          this.views.renderAlert(
            "danger",
            "Episode either doesn't exist or not found :-("
          );
        }
      }
    }
    if (e.target.classList.contains("btn-stream")) {
      const newSrc = e.target.getAttribute("data-video");

      this.views.renderChangedEpisodePlayer(newSrc);
    }

    if (e.target.classList.contains("btn-firestore")) {
      const { id, title } = JSON.parse(e.target.getAttribute("data-anime"));

      try {
        this.views.renderSpinner("section-b");

        await this.model.add(id, title);

        this.views.renderAlert("info", "Anime Added !");
        this.views.renderUserAnimeList(this.model.get().data.list);
      } catch (err) {
        this.views.renderAlert(
          "danger",
          "Error : can't add to list when not logged in"
        );
      }
    }

    if (e.target.classList.contains("btn-firestore-remove")) {
      const animeid =
        e.target.nextElementSibling.nextElementSibling.getAttribute(
          "data-anime-id"
        );

      this.views.renderSpinner("section-b");

      await this.model.remove(animeid);

      this.views.renderAlert("info", "Anime removed ! ");
      this.views.renderUserAnimeList(this.model.get().data.list);
    }
  }

  async sectionCChangeHandler(e) {
    if (e.target.id === "status-selector") {
      const animeid = e.target.nextElementSibling.getAttribute("data-anime-id");
      const status = e.target.value;

      console.log(animeid, " ", status);

      this.views.renderSpinner("section-b");

      await this.model.changeStatus(animeid, status);
      this.views.renderAlert("info", "Changed anime status !");
      this.views.renderUserAnimeList(this.model.get().data.list);
    }
  }

  run() {
    this.views.sectionA.selector.addEventListener("click", async (e) => {
      this.sectionAClickHandler(e);
    });
    this.views.sectionA.selector.addEventListener("keyup", async (e) => {
      this.sectionAKeyUpHandler(e);
    });

    this.views.sectionB.selector.addEventListener("click", async (e) => {
      this.sectionBClickHandler(e);
    });

    this.views.sectionC.selector.addEventListener("click", async (e) => {
      this.sectionCClickHandler(e);
    });
    this.views.sectionC.selector.addEventListener("change", async (e) => {
      this.sectionCChangeHandler(e);
    });
  }
}

export default Controller;
