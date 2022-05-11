import "bootstrap/dist/css/bootstrap.min.css";
import "./input-control.css";
import InputControllerInterface from "./InputControllerInterface";
import InputControllerObserver from "./Observers/InputControllerObserver";

export default class InputController implements InputControllerInterface {
  _type!: string;
  _controlsEnabled?: boolean;
  _inputControllerObserver: InputControllerObserver;

  constructor(type: string, controlsEnabled?: boolean) {
    this._type = type;
    this._controlsEnabled = controlsEnabled;
    this._inputControllerObserver = new InputControllerObserver(
      null,
      null,
      null,
      true,
      null,
      null
    );
  }

  setInputBackgroundColorOnInit = () => {
    return {
      boxShadow: "none",
      backgroundColor: this._controlsEnabled ? "#FFFFFF" : "#FFFF92",
    };
  };

  setAllInputBorders = () => {
    var elementContainer = this._inputControllerObserver.getElementContainer(
      "NumericInput",
      this._controlsEnabled
    );
    this.setAllInputBordersCss(
      "NumericInput",
      elementContainer,
      this._controlsEnabled
    );
    elementContainer = this._inputControllerObserver.getElementContainer(
      "NumericInput",
      !this._controlsEnabled
    );
    this.setAllInputBordersCss(
      "NumericInput",
      elementContainer,
      !this._controlsEnabled
    );
    elementContainer = this._inputControllerObserver.getElementContainer(
      "CalcInput",
      this._controlsEnabled
    );
    this.setAllInputBordersCss(
      "CalcInput",
      elementContainer,
      this._controlsEnabled
    );
    elementContainer = this._inputControllerObserver.getElementContainer(
      "CalcInput",
      !this._controlsEnabled
    );
    this.setAllInputBordersCss(
      "CalcInput",
      elementContainer,
      !this._controlsEnabled
    );
  };

  setAllInputBordersCss = (
    type: string,
    elementContainer: Element | null | undefined,
    controlsEnabled?: boolean
  ) => {
    var elMainInputDiv = elementContainer?.querySelector("#mainInputDiv");
    var elMainInput = elMainInputDiv?.querySelector("#mainInput");
    var inputValue = (elMainInput as HTMLInputElement).value;

    var isValid = false;
    if (type === "CalcInput")
      isValid = this._inputControllerObserver.calculateInput(inputValue);
    else isValid = this._inputControllerObserver.checkNumber(inputValue);

    (elMainInputDiv as HTMLDivElement).style.border = `3px solid ${
      controlsEnabled && isValid ? "#BEBEBE" : "#FBB0A9"
    }`;
  };

  setNewSelectedInputBorder = () => {
    var elementContainer = this._inputControllerObserver.getElementContainer(
      this._type,
      this._controlsEnabled
    );
    var elMainInputDiv = elementContainer?.querySelector("#mainInputDiv");
    (elMainInputDiv as HTMLDivElement).style.border = `3px solid ${
      this._controlsEnabled
        ? this._inputControllerObserver.isValid
          ? "#0000FF"
          : "#FF0000"
        : this._inputControllerObserver.isValid
        ? "#00FF00"
        : "#FF0000"
    }`;
  };

  render() {
    return (
      <div
        id={this._type}
        className="container-fluid custom-input-container m-1"
      >
        <div className="row">
          <div className="col-xs-12">
            <span>{this._type}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div id="mainInputDiv" className="input-group">
              <input
                id="mainInput"
                type="text"
                style={this.setInputBackgroundColorOnInit()}
                onFocus={() => {
                  this.setAllInputBorders();
                  this.setNewSelectedInputBorder();
                }}
                className="form-control"
                onChange={(e) => {
                  this._inputControllerObserver.value = e?.target?.value;
                  this._type === "CalcInput"
                    ? this._inputControllerObserver.calculateInputOnHTML(
                        this._inputControllerObserver.value,
                        this._type,
                        this._controlsEnabled
                      )
                    : this._inputControllerObserver.checkNumberOnHTML(
                        this._inputControllerObserver.value,
                        this._type
                      );

                  this.setNewSelectedInputBorder();
                }}
              />
              {this._type === "CalcInput" && (
                <input
                  id="mainButton"
                  type="text"
                  value="?"
                  className="input-group-text result-textbox"
                  onChange={() => {}}
                ></input>
              )}
            </div>
          </div>
        </div>
        {this._controlsEnabled && (
          <>
            <div className="row">
              <div className="col-xs-12">
                <div>
                  <b>Value:</b>{" "}
                  <span id="displayValue">
                    {this._inputControllerObserver.value}
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <div>
                  <b>Text:</b>{" "}
                  <span id="displayText">
                    {this._inputControllerObserver.text}
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <div>
                  <b>Valid:</b>{" "}
                  <span id="displayIsValid">
                    {this._inputControllerObserver.isValid?.toString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <div className="input-group">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      this.setAllInputBorders();
                      this._inputControllerObserver.setValueEventOnHTML(
                        this._type,
                        this._controlsEnabled
                      );
                      this.setNewSelectedInputBorder();
                    }}
                  >
                    Set Value
                  </button>
                  <input
                    id="valueInput"
                    type="text"
                    className="form-control"
                    onFocus={this.setAllInputBorders}
                    onChange={(e) => {
                      this._inputControllerObserver.tempValueChangedEventOnHTML(
                        e?.target?.value,
                        this._type,
                        this._controlsEnabled
                      );
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <div className="input-group">
                  <button
                    style={{ width: "90px" }}
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      this.setAllInputBorders();
                      this._inputControllerObserver.setTextEventOnHTML(
                        this._type,
                        this._controlsEnabled
                      );
                    }}
                  >
                    Set Text
                  </button>
                  <input
                    id="textInput"
                    type="text"
                    className="form-control"
                    onFocus={this.setAllInputBorders}
                    onChange={(e) => {
                      this._inputControllerObserver.textChangedEventOnHTML(
                        e?.target?.value,
                        this._type,
                        this._controlsEnabled
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}
