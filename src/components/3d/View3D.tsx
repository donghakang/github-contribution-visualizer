import React, { useState, useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import useGetContribution from "../../api/useGetContribution";
import Grass from "./Grass";

interface BoxInterface {
  position: [number, number, number];
  contributionCount: number;
  color: string;
}

const Box: React.FC<BoxInterface> = (props) => {
  // This reference will give us direct access to the THREE.Mesh object
  const mesh = useRef();

  const [hovered, setHover] = useState(false);

  //   useFrame((state, delta) => (mesh.current.rotation.x += 0.01));
  return (
    <mesh
      position={props.position}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, props.contributionCount, 1]} />
      <meshStandardMaterial color={hovered ? "pink" : props.color} />
    </mesh>
  );
};

const Boxes = ({ username }: { username: string }) => {
  const github = ["#eeeeee", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

  console.log("Boxes", username);
  const { totalCount, totalContributions } = useGetContribution(username);

  return (
    <>
      {totalContributions.map((contribution: any[], index: number) =>
        contribution.map((contrib: any, idx: number) => {
          let color = "#eeeeee";
          if (contrib.contributionCount >= 4) {
            color = github[4];
          } else {
            color = github[contrib.contributionCount];
          }
          return (
            <Box
              position={[index - 53.0 / 2.0, 1, idx - 3.5]}
              contributionCount={contrib.contributionCount}
              color={color}
            />
          );
        })
      )}
    </>
  );
};

const Jandi = ({ username }: { username: string }) => {
  const github = ["#eeeeee", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
  const { totalCount, totalContributions } = useGetContribution(username);

  return (
    <>
      {totalContributions.map((contribution: any[], index: number) =>
        contribution.map((contrib: any, idx: number) => {
          let color = "#eeeeee";
          if (contrib.contributionCount >= 4) {
            color = github[4];
          } else {
            color = github[contrib.contributionCount];
          }
          return (
            contrib.contributionCount !== 0 && <Grass
              scale={[0.3, 0.03 * (contrib.contributionCount + 0.01), 0.3]}
              position={[index - 53.0 / 2.0, 1 + (contrib.contributionCount * 0.3), idx - 3.5]}
              // contributionCount={contrib.contributionCount}
              rotation={[0, 2 * Math.PI * Math.random(), 0]}
              color={color}
            />
          );
        })
      )}
    </>
  );
};

const Contribution3D = ({ username }: { username: string }) => {
  console.log("Contribution 3d", username);

  return (
    <Suspense fallback={null}>
      <Canvas
        style={{ width: "100vw", height: "100vh" }}
        camera={{ fov: 70, position: [25, 17, 25] }}
      >
        {/* <Grass color={"#00ff00"}/> */}
        <Jandi username={username} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {/* <Boxes username={username} /> */}
        <OrbitControls enableZoom={false} />
      </Canvas>
    </Suspense>
  );
};

export default Contribution3D;
