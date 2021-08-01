// the 2 imports below are import for transpiling async/await
import "core-js/stable";
import "regenerator-runtime/runtime";

import FirebaseHelper from "./db/firebase";
import Views from "./views/views";

const views = new Views();

document.querySelector(".account-div").addEventListener("click", async (e) => {
  if (e.target.id === "sign-in-btn") {
    try {
      const profile = await FirebaseHelper.authSignIn();
      console.log(`
      name : ${profile.displayName}
      email : ${profile.email}
      profileImg : ${profile.photoURL} 
      `);
      views.accountlogInState(profile);
    } catch (err) {
      console.log(err);
    }
    e.preventDefault();
  }
  if (e.target.id === "sign-out-btn") {
    try {
      const result = await FirebaseHelper.authSignOut();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    views.componentA.init();
    e.preventDefault();
  }
});
