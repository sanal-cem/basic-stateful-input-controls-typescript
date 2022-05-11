import ControlCard from "./components/ControlCard";
import DestroyTrigger from "./components/DestroyTriggerObserver/DestroyTrigger";
import "./app.css";

function App() {
  let cc1 = new ControlCard(true);
  let cc2 = new ControlCard(false);
  let trigger = new DestroyTrigger(false, cc1, cc2);

  return (
    <table className="custom-app-table">
      <tbody>
        <tr>
          <td>
            <h3 className="ms-2">Input Controls Test</h3>
          </td>
        </tr>
        <tr>
          <td id="controlsTrue">{cc1.render()}</td>
        </tr>
        <tr>
          <td>
            <h3 className="ms-2">Custom Style</h3>
          </td>
        </tr>
        <tr>
          <td id="controlsFalse">{cc2.render()}</td>
        </tr>
        <tr>
          <td>
            <button
              className="btn btn-outline-secondary ms-2"
              onClick={() => {
                trigger.destroyTrigger = true;
              }}
            >
              Destroy All
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default App;
