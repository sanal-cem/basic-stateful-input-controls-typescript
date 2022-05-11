import InputControllerObserver from "./Observers/InputControllerObserver";

export default interface InputControllerInterface {
  _type: string;
  _controlsEnabled?: boolean;
  _inputControllerObserver: InputControllerObserver;
}
