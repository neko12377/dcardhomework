import React, { Suspense } from "react";
import * as Module from "./module";

export const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Module.PostsWall />
    </Suspense>
  );
};
