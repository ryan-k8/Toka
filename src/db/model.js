//local storage
import FirebaseHelper from "./firebase";

class LocalStorage {
  constructor() {
    this.clear();
  }

  init(profile) {
    localStorage.setItem(
      "local",
      JSON.stringify({
        credentials: profile,
        data: null,
      })
    );

    this.update();
  }

  get() {
    return JSON.parse(localStorage.getItem("local"));
  }

  async update() {
    const data = this.get();
    try {
      const updatedData = await FirebaseHelper.getUserList(
        data.credentials.userEmail
      );

      let Db = this.get();
      Db.data = updatedData;
      localStorage.setItem("local", JSON.stringify(Db));
    } catch (err) {
      console.log(err);
    }
  }

  clear() {
    localStorage.clear();
  }
}

export { LocalStorage };
