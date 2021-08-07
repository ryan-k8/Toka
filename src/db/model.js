//local storage for current user management
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
    // for keeping in sync with firestore
    try {
      const updatedData = await FirebaseHelper.getUserList(
        this.get().credentials.userEmail
      );

      let Db = this.get();
      Db.data = updatedData;
      localStorage.setItem("local", JSON.stringify(Db));
    } catch (err) {
      console.log(err);
    }
  }

  async add(animeid, title) {
    const {
      credentials: { userEmail },
      data: { list: userList },
    } = this.get();

    const newUserList = {
      list: [...userList, { id: animeid, title: title, status: "none" }],
    };

    await FirebaseHelper.setUserList(userEmail, newUserList);
    await this.update();
  }

  async remove(animeid) {
    const newUserList = {
      list: this.get().data.list.filter((anime) => anime.id !== animeid),
    };

    const {
      credentials: { userEmail },
    } = this.get();

    await FirebaseHelper.setUserList(userEmail, newUserList);
    await this.update();
  }

  async changeStatus(animeid, status) {
    const {
      credentials: { userEmail },
      data: { list: userList },
    } = this.get();

    const newUserList = {
      list: userList.map((anime) => {
        if (anime.id === animeid) {
          return {
            id: anime.id,
            title: anime.title,
            status: status,
          };
        }
      }),
    };

    await FirebaseHelper.setUserList(userEmail, newUserList);
    await this.update();
  }
  clear() {
    localStorage.clear();
  }
}

export { LocalStorage };
