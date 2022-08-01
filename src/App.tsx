import { useEffect, useState } from "react";
import SceneInit from "./Sketch/SceneInit";
import Cube from "./Sketch/Cube";

function App() {
  useEffect(() => {
    const mainScene = new SceneInit({ canvasID: "rubiksCubeCanvas" });
    mainScene.init();
    mainScene.animate();

    const cube = new Cube();
    cube.initCube();
    mainScene.scene.add(cube.cubeGroup);

    // cube.matrixMultiply([-1, -1]);

    setTimeout(() => {}, 2000);

    const onKeyDown = (event) => {
      if (event.repeat) {
        return;
      }

      if (event.key === "w") cube.rotateMatrix();
    };

    window.addEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div>
      <canvas id="rubiksCubeCanvas"></canvas>
    </div>
  );
}

export default App;
