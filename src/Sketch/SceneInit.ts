import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

interface iSceneInit {
  canvasID: string;
  camera?: THREE.PerspectiveCamera;
  scene?: THREE.Scene;
  controls?: OrbitControls;
  renderer?: THREE.Renderer;
  fov?: number;
  clock?: THREE.Clock;
  init?: () => void;
  onWindowResize?: () => void;
  render?: () => void;
}

export default class SceneInit implements iSceneInit {
  canvasID: string;
  clock!: THREE.Clock;
  camera!: THREE.PerspectiveCamera;
  scene!: THREE.Scene;
  controls!: OrbitControls;
  renderer!: THREE.Renderer;
  fov: number;

  constructor({ canvasID, fov = 36 }: iSceneInit) {
    this.canvasID = canvasID;
    this.fov = fov;
  }

  init(): void {
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.z = 10;

    this.clock = new THREE.Clock();
    this.scene = new THREE.Scene();

    const canvas = document.getElementById(this.canvasID) as HTMLCanvasElement;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // LIGHTS
    let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.castShadow = true;
    this.scene.add(ambientLight);

    // if window resizes
    window.addEventListener("resize", () => this.onWindowResize(), false);

    this.scene.background = new THREE.Color("white");
  }

  animate(): void {
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.controls.update();
  }

  render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
