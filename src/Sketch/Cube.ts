import * as THREE from "three";
import Cubie from "./Cubie";

export default class Cube {
  cubeGroup: THREE.Group;
  Rmatrix;
  constructor() {
    this.cubeGroup = new THREE.Group();

    this.Rmatrix = [
      [-Math.cos(Math.PI / 2), Math.sin(Math.PI / 2)],
      [-Math.sin(Math.PI / 2), -Math.cos(Math.PI / 2)],
    ];
  }

  initCube() {
    let cubies = [
      // Front face.
      // new Cubie(1, 1, 1),
      // new Cubie(1, 0, 1),
      // new Cubie(1, -1, 1),
      // new Cubie(-1, 1, 1),
      // new Cubie(-1, 0, 1),
      // new Cubie(-1, -1, 1),
      // new Cubie(0, 1, 1),
      // new Cubie(0, 0, 1),
      // new Cubie(0, -1, 1),

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
      // new Cubie(-1, 1, -1),
      // new Cubie(0, 1, -1),
      // new Cubie(1, 1, -1),
      // new Cubie(-1, 0, -1),
      // new Cubie(0, 0, -1),
      // new Cubie(1, 0, -1),
      // new Cubie(-1, -1, -1),
      // new Cubie(0, -1, -1),
      // new Cubie(1, -1, -1),
    ];

    cubies.forEach((cubie: any, i) => {
      this.cubeGroup.add(cubie.cubieGroup);
    });
  }

  rotateMatrix() {
    this.cubeGroup.children.forEach((child) => {
      const pos = child.position;
      const rotatedMatrix = this.matrixMultiply([pos.x, pos.y]);
      child.position.set(rotatedMatrix[0], rotatedMatrix[1], 0);
      child.rotateOnWorldAxis(
        new THREE.Vector3(0, 0, -1),
        THREE.MathUtils.degToRad(90)
      );
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
