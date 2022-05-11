import ControlCard from "../ControlCard";

interface DestroyTriggerInterface {
  _cc1: ControlCard;
  _cc2: ControlCard;
}

export default class DestroyTrigger implements DestroyTriggerInterface {
  _trigger: boolean;
  _cc1: ControlCard;
  _cc2: ControlCard;
  constructor(trigger: boolean, cc1: ControlCard, cc2: ControlCard) {
    this._trigger = trigger;
    this._cc1 = cc1;
    this._cc2 = cc2;
  }

  // Accessors
  get destroyTrigger() {
    return this._trigger;
  }

  set destroyTrigger(trigger) {
    this._trigger = trigger;
    this.destroyEverything();
    console.log("Destroy Trigger: " + this._trigger);
  }

  destroyEverything = () => {
    this.destroyOneSideOfCards("NumericInput");
    this.destroyOneSideOfCards("CalcInput");

    // Below two line destroys only variables and classes not HTML elements.
    this._cc1 = new ControlCard(true);
    this._cc2 = new ControlCard(false);
  };

  destroyOneSideOfCards = (sideString: string) => {
    const elControlsTrue = document.getElementById("controlsTrue");
    const elSideOfCardsControlsTrue = elControlsTrue?.querySelector(
      "#" + sideString
    );

    const elMainInputControllersTrue =
      elSideOfCardsControlsTrue?.querySelector("#mainInput");
    (elMainInputControllersTrue as HTMLInputElement).value = "";

    if (sideString === "CalcInput") {
      const elMainButtonControllersTrue =
        elSideOfCardsControlsTrue?.querySelector("#mainButton");
      (elMainButtonControllersTrue as HTMLInputElement).value = "?";
    }

    const elDisplayValue =
      elSideOfCardsControlsTrue?.querySelector("#displayValue");
    (elDisplayValue as HTMLSpanElement).textContent = null;

    const elDisplayText =
      elSideOfCardsControlsTrue?.querySelector("#displayText");
    (elDisplayText as HTMLSpanElement).textContent = null;

    const elDisplayIsValid =
      elSideOfCardsControlsTrue?.querySelector("#displayIsValid");
    (elDisplayIsValid as HTMLSpanElement).textContent = "true";

    const elValueInput =
      elSideOfCardsControlsTrue?.querySelector("#valueInput");
    (elValueInput as HTMLInputElement).value = "";

    const elTextInput = elSideOfCardsControlsTrue?.querySelector("#textInput");
    (elTextInput as HTMLInputElement).value = "";

    const elControlsFalse = document.getElementById("controlsFalse");
    const elSideOfCardsControlsFalse = elControlsFalse?.querySelector(
      "#" + sideString
    );
    const elMainInputControllersFalse =
      elSideOfCardsControlsFalse?.querySelector("#mainInput");
    (elMainInputControllersFalse as HTMLInputElement).value = "";

    if (sideString === "CalcInput") {
      const elMainButtonControllerFalse =
        elSideOfCardsControlsFalse?.querySelector("#mainButton");
      (elMainButtonControllerFalse as HTMLInputElement).value = "?";
    }
  };
}
