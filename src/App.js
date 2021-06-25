import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Contribution from "./components/Contribution";
import Contribution3D from "./components/Contribution3D";
import ContributionCircle from "./components/ContributionCircle";
import { Button } from "react-bootstrap";

function App() {
  // console.log(contributionVisualizer(contributionWeek));
  const [mode, setMode] = useState(0);
  let view = <Contribution />;

  if (mode === 0) view = <Contribution />;
  else if (mode === 1) view = <Contribution3D />;
  else if (mode === 2) view = <ContributionCircle />;

  return (
    <div className="App box">
      <h3>Github Contribution Visualizer</h3>
      <div className='triggers'>
        <Button variant="outline-success" onClick={() => setMode(0)}>
          Normal View
        </Button>
        {"   "}
        <Button variant="outline-success" onClick={() => setMode(1)}>
          3D View
        </Button>
        {"   "}
        <Button variant="outline-success" onClick={() => setMode(2)}>
          Circular View
        </Button>
        {"   "}
      </div>
      <div className='viewport'>{view}</div>
    </div>
  );
}

export default App;
