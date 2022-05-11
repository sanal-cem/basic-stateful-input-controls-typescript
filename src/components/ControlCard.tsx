import InputController from "./InputController/InputController";

interface ControlCardInterface {
  _controlsEnabled: boolean;
}

export default class ControlCard implements ControlCardInterface {
  _controlsEnabled: boolean;

  constructor(controlsEnabled: boolean) {
    // if controlsEnabled is true, then there will be elements more than an input.
    this._controlsEnabled = controlsEnabled;
  }

  render() {
    return (
      <div style={{ flexDirection: "row" }}>
        {new InputController("NumericInput", this._controlsEnabled).render()}
        {new InputController("CalcInput", this._controlsEnabled).render()}
      </div>
    );
  }
}
