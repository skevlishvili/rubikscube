import * as THREE from "three";
import Cubie from "./Cubie";

export default class Cube {
  cubeGroup: THREE.Group;
  Rmatrix;
  cubies: Cubie[];
  anchorCubie?: Cubie;

  constructor() {
    this.cubeGroup = new THREE.Group();
    this.cubies = [];
    this.anchorCubie;

    this.Rmatrix = [
      [-Math.cos(Math.PI / 2), Math.sin(Math.PI / 2)],
      [-Math.sin(Math.PI / 2), -Math.cos(Math.PI / 2)],
    ];
  }

  initCube() {
    this.cubies = [
      // Front face.
      new Cubie(1, 1, 1),
      new Cubie(1, 0, 1),
      new Cubie(1, -1, 1),
      new Cubie(-1, 1, 1),
      new Cubie(-1, 0, 1),
      new Cubie(-1, -1, 1),
      new Cubie(0, 1, 1),
      new Cubie(0, 0, 1),
      new Cubie(0, -1, 1),

      // Middle face.
      new Cubie(-1, 1, 0),
      new Cubie(0, 1, 0),
      new Cubie(1, 1, 0),
      new Cubie(-1, 0, 0),
      new Cubie(0, 0, 0),
      new Cubie(1, 0, 0),
      new Cubie(-1, -1, 0),
      new Cubie(0, -1, 0),
      new Cubie(1, -1, 0),

      // Back face.
      new Cubie(-1, 1, -1),
      new Cubie(0, 1, -1),
      new Cubie(1, 1, -1),
      new Cubie(-1, 0, -1),
      new Cubie(0, 0, -1),
      new Cubie(1, 0, -1),
      new Cubie(-1, -1, -1),
      new Cubie(0, -1, -1),
      new Cubie(1, -1, -1),
    ];

    this.cubies.forEach((cubie: any, i) => {
      this.cubeGroup.add(cubie.cubieGroup);
    });
  }

  applyRotation(axis: string) {
    type Axis = keyof THREE.Mesh["position"];
    this.cubeGroup.children.forEach((child) => {
      if (
        child.position[axis as Axis] ===
        this.anchorCubie?.cubieGroup.position[axis as Axis]
      ) {
        const pos = child.position;
        let rotatedMatrix;
        if (axis === "x") {
          rotatedMatrix = this.matrixMultiply([pos.y, pos.z]);
          child.position.set(
            child.position.x,
            rotatedMatrix[0],
            rotatedMatrix[1]
          );

          child.rotateOnWorldAxis(
            new THREE.Vector3(-1, 0, 0),
            THREE.MathUtils.degToRad(90)
          );
        } else if (axis === "y") {
          rotatedMatrix = this.matrixMultiply([pos.x, pos.z]);
          child.position.set(
            rotatedMatrix[0],
            child.position.y,
            rotatedMatrix[1]
          );
          child.rotateOnWorldAxis(
            new THREE.Vector3(0, 1, 0),
            THREE.MathUtils.degToRad(90)
          );
        } else if (axis === "z") {
          rotatedMatrix = this.matrixMultiply([pos.x, pos.y]);
          child.position.set(
            rotatedMatrix[0],
            rotatedMatrix[1],
            child.position.z
          );
          child.rotateOnWorldAxis(
            new THREE.Vector3(0, 0, -1),
            THREE.MathUtils.degToRad(90)
          );
        }
      }
    });
  }

  highlightSelectedCubie(selectedCubie: any) {
    this.cubies.forEach((cube) => {
      if (cube.cubieMesh.uuid === selectedCubie.uuid) {
        this.anchorCubie = cube;
        cube.uniforms.opacity.value = 0.7;
      } else {
        cube.uniforms.opacity.value = 1.0;
      }
    });
  }

  matrixMultiply(transformationMatrix: number[]) {
    let result: number[] = new Array(transformationMatrix.length).fill(0);
    for (let i = 0; i < this.Rmatrix.length; i++) {
      for (let j = 0; j < transformationMatrix.length; j++) {
        let mult = Math.round(this.Rmatrix[i][j] * transformationMatrix[j]);
        result[i] += mult;
      }
    }
    return result;
  }
}
