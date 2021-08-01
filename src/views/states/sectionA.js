const loggedOutState = function () {
  document.querySelector(".account-div").innerHTML = `
    <i class="fas fa-user fa-2x">
    <div class="login-div">
      <a href="#" id="sign-in-btn" class="account-btn p-1"
        >Sign In <i class="fab fa-google"></i
      ></a>
    </div>
  </i>
    `;
};
const loggedInState = function (profile) {
  document.querySelector(".account-div").innerHTML = `
   <div class="profile-account">
  <div class="login-div">
    <a href="#" id="sign-out-btn" class="account-btn p-1"
      >Sign Out <i class="fas fa-sign-out-alt"></i
    ></a>
 </div>
 </div>
    `;
  document.querySelector(
    ".profile-account"
  ).style.background = `url(${profile.photoURL}) no-repeat center center/cover`;
};

export { loggedOutState, loggedInState };
