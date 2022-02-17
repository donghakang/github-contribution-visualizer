import React from "react";
import { useLocation } from "react-router-dom";
import View3D from "../../components/3d";

interface LocationState {
  user: string;
}

function ContributionView() {
  const location = useLocation();

  const state = location.state as LocationState;

  console.log(state);
  return <View3D username={state.user}/>;
}

export default ContributionView;
