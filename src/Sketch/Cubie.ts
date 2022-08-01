import * as THREE from "three";
import vertex from "./shaders/vertex.glsl";
import fragment from "./shaders/fragment.glsl";

interface iCubie {
  cubieGroup: THREE.Group;
  cubieMesh: THREE.Mesh;
  lineMesh: THREE.LineSegments;
  offsetX: number;
  offsetY: number;
  offsetZ: number;
}

export default class Cubie implements iCubie {
  cubieGroup: THREE.Group;
  cubieMesh: THREE.Mesh;
  lineMesh: THREE.LineSegments;
  offsetX!: number;
  offsetY!: number;
  offsetZ!: number;

  constructor(offsetX: number, offsetY: number, offsetZ: number) {
    this.cubieGroup = new THREE.Group();
    this.uniforms = {
      opacity: {
        type: "f",
        value: 1.0,
      },
    };

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
    });
    this.cubieMesh = new THREE.Mesh(geometry, material);

    const lineEdges = new THREE.EdgesGeometry(this.cubieMesh.geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: "#000000" });
    this.lineMesh = new THREE.LineSegments(lineEdges, lineMaterial);

    this.lineMesh.scale.set(1.01, 1.01, 1.01);

    this.cubieGroup.add(this.cubieMesh);
    this.cubieGroup.add(this.lineMesh);
    this.cubieGroup.position.x = offsetX;
    this.cubieGroup.position.y = offsetY;
    this.cubieGroup.position.z = offsetZ;
  }
}
