import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import useGetContribution from "../../api/useGetContribution";

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

const Contribution3D = ({ username }: { username: string }) => {
  return (
    <>
      <Canvas
        style={{ width: "100vw", height: "100vh" }}
        camera={{ fov: 70, position: [25, 17, 25] }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Boxes username={username} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </>
  );
};

export default Contribution3D;
