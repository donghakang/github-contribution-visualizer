import { useState, useEffect, useContext, createContext } from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Contribution = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [totalContributions, setTotalContributions] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY;
  const github = ["#eeeeee", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
  const headers = {
    "Content-type": "application/json",
    Authorization: "token " + API_KEY,
  };
  const gql = {
    query: `
  {
    user(login: "donghakang") {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              weekday
              date
            }
          }
        }
      }
    }
  }
  `,
  };

  useEffect(() => {
    const fetchData = () => {
      fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(gql),
      })
        .then((response) => response.json()) //Converting the response to a JSON object
        .then(
          (response) =>
            response.data.user.contributionsCollection.contributionCalendar
        )
        .then((response) => {
          setTotalCount(response.totalContributions);
          return response.weeks;
        })
        .then((res) => {
          let result = [];
          for (let i = 0; i < res.length; i++) {
            result.push(res[i].contributionDays);
          }
          setTotalContributions(result);
        })
        .then((res) => console.log("Success"))
        .catch((error) => console.error(error));
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>{totalCount}</h1>
      <div style={{ width: "100vw", height: "100vh", background: "pink" }}>
        <svg style={{background: 'white', width: '200vh'}}>
          {totalContributions.map((contribution, idx) =>
            contribution.map((contrib, index) => {
              console.log(index, idx);
              let color = '#eeeeee';
              if (contrib.contributionCount >= 4) {
                color = github[4]
              } else {
                color = github[contrib.contributionCount]
              }
              return (
                <rect
                  x={14 * idx}
                  y={14 * index}
                  width={12}
                  height={12}
                  fill={color}
                />
              );
            })
          )}
        </svg>
      </div>
    </div>
  );
  // return <div>{!isLoading ? (<svg>{contribution}</svg>) : (<span> is .. loading ... </span>)}</div>;
};

function App() {
  // console.log(contributionVisualizer(contributionWeek));
  return (
    <div className="App">
      <h3>specific</h3>
      <Contribution />
    </div>
  );
}

export default App;
