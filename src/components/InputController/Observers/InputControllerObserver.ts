import Calculator from "../Calculator/Calculator";

interface InputControllerObserverInterface {
  value: string | null;
  tempValue: string | null;
  calcResult: string | null;
  isValid?: boolean;
  text: string | null;
  tempText?: string | null;
}

export default class InputControllerObserver
  implements InputControllerObserverInterface
{
  _value: string | null;
  _tempValue: string | null;
  _calcResult: string | null;
  _isValid?: boolean;
  _text: string | null;
  _tempText?: string | null;

  constructor(
    value: string | null,
    tempValue: string | null,
    calcResult: string | null,
    isValid: boolean,
    text: string | null,
    tempText: string | null
  ) {
    this._value = value;
    this._tempValue = tempValue;
    this._calcResult = calcResult;
    this._isValid = isValid;
    this._text = text;
    this._tempText = tempText;
  }

  // Accessors
  public get value() {
    return this._value;
  }

  public set value(value) {
    this._value = value;
  }

  public get tempValue() {
    return this._tempValue;
  }

  public set tempValue(tempValue) {
    this._tempValue = tempValue;
  }

  public get calcResult() {
    return this._calcResult;
  }

  public set calcResult(calcResult) {
    this._calcResult = calcResult;
  }

  public get isValid() {
    return this._isValid;
  }

  public set isValid(isValid) {
    this._isValid = isValid;
  }

  public get text() {
    return this._text;
  }

  public set text(text) {
    this._text = text;
  }

  public get tempText() {
    return this._tempText;
  }

  public set tempText(tempText) {
    this._tempText = tempText;
  }

  tempValueChangedEventOnHTML = (
    val: string,
    type: string | null,
    controlsEnabled?: boolean
  ) => {
    this.tempValue = val;
    var elementContainer = this.getElementContainer(type, controlsEnabled);
    var elInput = elementContainer?.querySelector("#valueInput");
    (elInput as HTMLInputElement).value = this.tempValue;
  };

  setTextEventOnHTML = (type: string | null, controlsEnabled?: boolean) => {
    this.text = this.tempText ? this.tempText : "";
    var elementContainer = this.getElementContainer(type, controlsEnabled);
    var elDisplay = elementContainer?.querySelector("#displayText");
    (elDisplay as HTMLSpanElement).textContent = this.text;
  };

  textChangedEventOnHTML = (
    val: string,
    type: string | null,
    controlsEnabled?: boolean
  ) => {
    this.tempText = val;
    var elementContainer = this.getElementContainer(type, controlsEnabled);
    var elInput = elementContainer?.querySelector("#textInput");
    (elInput as HTMLInputElement).value = this.tempText;
  };

  getElementContainer = (type: string | null, controlsEnabled?: boolean) => {
    var containerCard = document.getElementById(
      controlsEnabled ? "controlsTrue" : "controlsFalse"
    );
    return containerCard?.querySelector("#" + type);
  };

  setValueEventOnHTML = (type: string | null, controlsEnabled?: boolean) => {
    this._value = this._tempValue ? this._tempValue : "";
    type === "CalcInput"
      ? this.calculateInputOnHTML(this._tempValue, type, controlsEnabled)
      : this.checkNumberOnHTML(this._tempValue, type);

    var elementContainer = this.getElementContainer(type, controlsEnabled);
    var elDisplay = elementContainer?.querySelector("#displayValue");
    var elMainInput = elementContainer?.querySelector("#mainInput");
    (elDisplay as HTMLSpanElement).textContent = this._value;
    (elMainInput as HTMLInputElement).value = this._value;
  };

  checkNumberOnHTML = (value: string | number | null, type: string | null) => {
    // used for calculations in NumericInput Container.
    this.checkIsValidOnHTML(this.convertNumericInput(value), type);
  };

  calculateInputOnHTML = (
    value: string | null,
    type: string | null,
    controlsEnabled?: boolean
  ) => {
    var result = null;
    var elContainer = this.getElementContainer(type, controlsEnabled);

    try {
      var calculator = new Calculator();
      if (value) {
        result = calculator.calculateExpression(value);
        if (result) {
          this.checkNumberOnHTML(result, type);
          var elInput = elContainer?.querySelector("#mainButton");
          this._isValid = this.checkNumber(result);
        } else {
          this.wrongInputOnHTML(type, elContainer);
        }
      } else this.wrongInputOnHTML(type, elContainer);

      if (this._isValid) {
        this._calcResult = result;
        (elInput as HTMLInputElement).value = this._calcResult?.toString()
          ? this._calcResult.toString()
          : "?";
      }
    } catch (error) {
      this.wrongInputOnHTML(type, elContainer);
    }
  };

  wrongInputOnHTML = (
    type: string | null,
    elContainer: Element | null | undefined
  ) => {
    this._isValid = false;
    var elementContainer = this.getIsValidElementContainer(type);
    var elDisplayIsValid = elementContainer?.querySelector("#displayIsValid");
    (elDisplayIsValid as HTMLSpanElement).textContent = "false";

    var elInput = elContainer?.querySelector("#mainButton");
    (elInput as HTMLInputElement).value = "?";
  };

  calculateInput = (value: string | null) => {
    try {
      if (value) return this.checkIsValid(eval(value));
      else return false;
    } catch (error) {
      return false;
    }
  };

  checkNumber = (value: string | number | null): boolean => {
    return this.checkIsValid(this.convertNumericInput(value));
  };

  convertNumericInput = (value: string | number | null) => {
    // used for calculations in NumericInput Container.
    let convertedNumber = isNaN(Number(value)) ? false : value; // isNaN(value) checks if the value is number or not.
    if (!value) convertedNumber = value; // convertedNumber field should include `undefined, null, ""`
    return convertedNumber;
  };

  // isValidChanged event
  checkIsValidOnHTML = (
    number: string | boolean | number | null,
    type: string | null
  ) => {
    var elementContainer = this.getIsValidElementContainer(type);
    var elDisplayIsValid = elementContainer?.querySelector("#displayIsValid");

    if (number || number === null || number === "") {
      this._isValid = true;
      (elDisplayIsValid as HTMLSpanElement).textContent = "true";
    } else {
      this._isValid = false;
      (elDisplayIsValid as HTMLSpanElement).textContent = "false";
    }
  };

  checkIsValid = (number: string | boolean | number | null): boolean => {
    return number || number === null || number === "" ? true : false;
  };

  getIsValidElementContainer = (type: string | null) => {
    // displayIsValid item is in <td id='controlsTrue'> item.
    var containerCard = document.getElementById("controlsTrue");
    return containerCard?.querySelector("#" + type);
  };
}
