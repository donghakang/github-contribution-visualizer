import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Contribution from "./components/Contribution";
import Contribution3D from "./components/Contribution3D";
import ContributionCircle from "./components/ContributionCircle";

import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";

function App() {
  // console.log(contributionVisualizer(contributionWeek));
  return (
    <div className="App">
      <h3>Contribution</h3>
      <div style={{ backgroundColor: "green" }}>
        <Contribution />
        <Contribution3D />
        <ContributionCircle />
      </div>
    </div>
  );
}

export default App;
