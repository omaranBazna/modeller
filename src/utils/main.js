import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const texture = new THREE.TextureLoader().load("textures/texture1.jpg");
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(1, 2);
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.01,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  alpha: true,
});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.SphereGeometry(
  3,
  80,
  80,
  0,
  2 * Math.PI,
  0,
  2 * Math.PI
);

const geometry2 = new THREE.Mesh();
const material = new THREE.MeshStandardMaterial({
  color: "red",
});

const Obj = new THREE.Mesh(geometry, material);

const light = new THREE.PointLight(0xffffff);
light.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(light);
scene.add(ambientLight);

scene.add(Obj);
const control = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  Obj.rotation.y = 120;
  //Obj.position.x += 0.3;
  control.update();
  renderer.render(scene, camera);
}

animate();
