import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import "./App.css";

const useContribution = () => {
  const [totalContributions, setTotalContributions] = useState(0);
  const [contributionWeek, setContributionWeek] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY;
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
    fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(gql),
    })
      .then((response) => response.json()) //Converting the response to a JSON object
      .then((response) => response.data)
      .then((data) => {
        const totalCount =
          data.user.contributionsCollection.contributionCalendar
            .totalContributions;
        setTotalContributions(totalCount);
        setContributionWeek(
          data.user.contributionsCollection.contributionCalendar.weeks
        );
      })
      .catch((error) => console.error(error));
  }, []);

  return { totalContributions, contributionWeek };
};

const ContributionVisualizer = (props) => {
  const week = props.week;
  const contributionsAll = week.map((data) => data.contributionDays);
  const github = ["#eeeeee", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

  const r = contributionsAll.map((contributionsWeek) =>
    contributionsWeek.map((contrib) => {
      let color = '#ffffff';
      if (contrib.contributionCount >= 4) {
        color = github[4]
      } else {
        color = github[contrib.contributionCount]
      }
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: " 10px 10vw",
            backgroundColor: color,
          }}
        >
          <div>{contrib.date}</div>
          <div>{contrib.contributionCount}</div>
        </div>
      );
    })
  );

  var d = new Date("2021-06-21");
  console.log(d.getDay());
  return r;
};

function App() {
  const { totalContributions, contributionWeek } = useContribution();

  // console.log(contributionVisualizer(contributionWeek));
  return (
    <div className="App">
      <h1>Total Contributions : {totalContributions}</h1>
      <h3>specific</h3>
      <ContributionVisualizer week={contributionWeek} />
    </div>
  );
}

export default App;
