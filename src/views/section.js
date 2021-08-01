import { loggedOutState } from "./states/sectionA";

// the account part
class SectionA {
  constructor() {
    this.currentState = null;
  }

  init() {
    this.change(new loggedOutState());
  }

  change(state) {
    this.currentState = state;
  }
}

class SectionB {}

class sectionC {}

export { SectionA, SectionB, sectionC };
