import Api from "../services/Api";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const ContributionCircle = () => {
  const github = ["#eeeeee", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
  const { totalCount, totalContributions } = Api();

  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

  function describeArc(x, y, radius, startAngle, endAngle) {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      arcSweep,
      0,
      end.x,
      end.y,
      "L",
      x,
      y,
      "L",
      start.x,
      start.y,
    ].join(" ");

    return d;
  }

  return (
    <svg width={500} height={500} style={{ background: "white" }}>
      {/* <circle cx="250" cy="250" r="100" fill={github[0]}> */}
      {totalContributions.map((contribution, index) =>
        contribution.map((contrib, idx) => {
          let color = "#eeeeee";
          if (contrib.contributionCount >= 4) {
            color = github[4];
          } else {
            color = github[contrib.contributionCount];
          }
          // return <line x1="0" x2="10" y1="0" y2="10" stroke="red" fillOpacity />;
          return (
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id="button-tooltip">
                  {contrib.date}
                  <br />
                  <strong>contribution </strong>: {contrib.contributionCount}
                </Tooltip>
              }
            >
              <path
                fill={color}
                d={describeArc(
                  250,
                  250,
                  100 + 10 * contrib.contributionCount,
                  idx + index * 7,
                  idx + index * 7 + 360.0 / (idx * index * 7)
                )}
              />
            </OverlayTrigger>
          );
        })
      )}
      {/* </circle> */}
    </svg>
  );
};

export default ContributionCircle;
