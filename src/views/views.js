import { SectionA, SectionB, SectionC } from "./section";
import * as statesA from "./states/sectionA";

class Views {
  constructor() {
    this.componentA = new SectionA();
    // this.componentB = new sectionB();
    // this.componentC = new sectionC();

    //setting up initial states
    this.componentA.init();
  }

  accountlogInState(profile) {
    this.componentA.change(new statesA.loggedInState(profile));
  }
}

export default Views;
