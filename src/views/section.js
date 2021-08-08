import * as statesA from "./states/sectionA";
import * as statesB from "./states/sectionB";
import * as statesC from "./states/sectionC";

// the account part
class SectionA {
  constructor() {
    this.currentState = null;
    this.selector = document.getElementById("section-a");
  }

  init() {
    this.change(new statesA.loggedOutState());
  }

  change(state) {
    this.currentState = state;
  }
}

class SectionB {
  constructor() {
    this.currentState = null;
    this.selector = document.getElementById("section-b");
  }

  init() {
    this.change(new statesB.loggedOutState());
  }

  change(state) {
    this.currentState = state;
  }
}

class SectionC {
  constructor() {
    this.currentState = null;
    this.selector = document.getElementById("section-c");
  }

  default() {
    this.currentState = (() => {
      document.getElementById("section-c").innerHTML = null;
    })();
  }

  init() {
    this.change(new statesC.loggedOutState());
  }

  change(state) {
    this.currentState = state;
  }
}

export { SectionA, SectionB, SectionC };
