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

  console.log(totalContributions.slice(-4))
  return (
    <div style={{ width:'100%', height: "100%", display: "flex", alignItems: "center" }}>
      <svg width={500} height={500} style={{ background: "white", margin: 'auto' }}>
        {/* <circle cx="250" cy="250" r="100" fill={github[0]}> */}
        {totalContributions.slice(-5).map((contribution, index) =>
          contribution.map((contrib, idx) => {
            let color = "#eeeeee";
            if (contrib.contributionCount >= 4) {
              color = github[4];
            } else {
              color = github[contrib.contributionCount];
            }

            let sz = 0
            for (var i = 0; i < totalContributions.slice(-5).length; i++) {
                sz += totalContributions[i].length
            }


            
            console.log( sz, (index * 7.0 + idx ) * (365.0 / sz ), (index * 7.0 + idx ) * (365.0 / sz ) + (365.0 / sz))
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
                    (index * 7 + idx ) * (365 / sz ), 
                    (index * 7 + idx ) * (365 / sz ) + (365 / sz)
                  )}
                />
              </OverlayTrigger>
            );
          })
        )}
      </svg>
    </div>
  );
};

export default ContributionCircle;
