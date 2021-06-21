
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Contribution from './components/Contribution'
import Contribution3D from './components/Contribution3D'

function App() {
  // console.log(contributionVisualizer(contributionWeek));
  return (
    <div className="App">
      <h3>Contribution</h3>
      <div style={{ backgroundColor: "green" }}>
        <Contribution />
        <Contribution3D />
      </div>
    </div>
  );
}

export default App;
