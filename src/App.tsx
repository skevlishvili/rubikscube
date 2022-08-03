import { useEffect, useState } from "react";
import SceneInit from "./Sketch/SceneInit";
import Cube from "./Sketch/Cube";
import * as THREE from "three";

function App() {
  useEffect(() => {
    const mainScene = new SceneInit({ canvasID: "rubiksCubeCanvas" });
    mainScene.init();
    mainScene.animate();

    const cube = new Cube();
    cube.initCube();
    mainScene.scene.add(cube.cubeGroup);

    const onKeyDown = (event: any) => {
      if (event.repeat) {
        return;
      }

      if (event.key === "s") cube.applyRotation("x");
      if (event.key === "t") cube.applyRotation("y");
      if (event.key === "f") cube.applyRotation("z");
    };

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseDown = (event: any) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, mainScene.camera);
      const objects = raycaster.intersectObjects(cube.cubeGroup.children);

      const cubeObjects = objects.filter((c) => {
        return c.object.type === "Mesh";
      });

      if (cubeObjects.length > 0) {
        cube.highlightSelectedCubie(cubeObjects[0].object);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onMouseDown);
  }, []);

  return (
    <div>
      <canvas id="rubiksCubeCanvas"></canvas>
    </div>
  );
}

export default App;
