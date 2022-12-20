import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import MODEL from "../models/CuteKitty.glb";
import { regions } from "./regions";
let radius = 0.05;
let mouseClicked = false;
let Obj;
let scene;
let renderer;
let camera;
let control;
let raycaster;
let btnEl;
let canvas;
let ctx;
let h;
let w;
const pointer = new THREE.Vector2();
const setUpLight = () => {
  const light = new THREE.PointLight(0xffffff);
  light.position.set(10, 20, 10);
  light.intensity = 0.7;
  scene.add(light);
  const light2 = new THREE.PointLight(0xffffff);
  light2.position.set(-10, 20, 10);
  light2.intensity = 0.7;
  scene.add(light2);
  const light3 = new THREE.PointLight(0xffffff);
  light3.position.set(-10, 20, -10);
  light3.intensity = 0.7;
  scene.add(light3);
  const light4 = new THREE.PointLight(0xffffff);
  light4.position.set(10, 20, -10);
  light4.intensity = 0.7;
  scene.add(light4);
  const light5 = new THREE.PointLight(0xffffff);
  light5.position.set(10, -20, 10);
  light5.intensity = 0.4;
  scene.add(light5);
  const light6 = new THREE.PointLight(0xffffff);
  light6.position.set(-10, -20, 10);
  light6.intensity = 0.4;
  scene.add(light6);
  const light7 = new THREE.PointLight(0xffffff);
  light7.position.set(-10, -20, -10);
  light7.intensity = 0.4;
  scene.add(light7);
  const light8 = new THREE.PointLight(0xffffff);
  light8.position.set(10, -20, -10);
  light8.intensity = 0.4;
  scene.add(light8);
};
const updateObjTex = () => {
  let texture = new THREE.TextureLoader().load(
    document.querySelector("#draw").toDataURL("image/png")
  );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);
  const new_material = new THREE.MeshStandardMaterial({
    map: texture,
  });
  Obj.material = new_material;
};
const calculateMinArr = (
  raycaster,
  pointer,
  camera,
  minArr,
  Obj,
  radius,
  pos
) => {
  raycaster.setFromCamera(pointer, camera);
  const intersection = raycaster.intersectObject(Obj);
  if (intersection.length > 0) {
    let min = intersection[0];
    for (let el of intersection) {
      if (el.distance < min.distance) {
        min = el;
      }
    }
    pos[0] = min.uv.x;
    pos[1] = min.uv.y;

    for (let i = 0; i < 36; i++) {
      const point_i = new THREE.Vector2(0, 0);
      point_i.x = pointer.x + radius * Math.cos((i / 36) * Math.PI * 2);
      point_i.y = pointer.y + radius * Math.sin((i / 36) * Math.PI * 2) * 2;

      raycaster.setFromCamera(point_i, camera);

      const intersection1 = raycaster.intersectObject(Obj);

      let min = intersection1[0];
      for (let el of intersection1) {
        if (el.distance < min.distance) {
          min = el;
        }
      }
      // console.log(min.uv)
      if (min) {
        minArr.push([min.uv.x, min.uv.y]);
      }
    }
  }
};
const updateCopy = () => {
  document
    .getElementById("copy")
    .getContext("2d")
    .drawImage(document.getElementById("draw"), 0, 0);
};
const loadModel = () => {
  let Obj;
  const loader = new GLTFLoader();
  loader.load(
    MODEL,
    function (gltf) {
      gltf.scene.position.y = 0;

      gltf.scene.scale.set(50, 50, 50);

      for (let el = 0; el < 21; el++) {
        if (gltf.scene.children[el]) {
          Obj = gltf.scene.children[el];

          Obj.scale.set(14, 14, 14);

          scene.add(Obj);
        }
      }
      return Obj;
    },
    () => {
      console.log("loading");
    },
    (e) => {
      console.log(e);
    }
  );
};
const setUpListener = () => {
  btnEl.addEventListener("click", () => {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    updateCopy();
    updateObjTex();
  });
  window.addEventListener("mousewheel", (e) => {
    e.preventDefault();
    if (
      document.querySelector(".toolEl").getAttribute("data-tool") === "brush"
    ) {
      if (e.deltaY < 0 && radius < 0.5) {
        radius += 0.001;
        console.log(radius);
      } else if (e.deltaY > 0 && radius > 0.005) {
        radius -= 0.001;
        console.log(radius);
      }
    }
  });

  var onMouseMove = (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mousedown", () => {
    mouseClicked = true;
  });
  window.addEventListener("mouseup", () => {
    mouseClicked = false;
  });
};
const animate = () => {
  requestAnimationFrame(animate);

  if (!Obj) {
    return;
  }
  Obj.rotation.y = 120;

  renderer.render(scene, camera);
  const option = document.querySelector(".toolEl").getAttribute("data-tool");

  if (option === "brush") {
    control.enabled = false;

    if (mouseClicked) {
      const minArr = [];
      const pos = [0, 0];
      calculateMinArr(raycaster, pointer, camera, minArr, Obj, radius, pos);

      var ctx = canvas.getContext("2d");
      ctx.fillStyle = document
        .getElementById("colorEl")
        .getAttribute("data-color");

      if (minArr[0]) {
        ctx.beginPath();
        let xPos = minArr[0][0] * w;
        let yPos = h / 2 - (minArr[0][1] - 0.5) * h;

        for (let i = 1; i < 36; i++) {
          xPos = minArr[i][0] * w;
          yPos = h / 2 - (minArr[i][1] - 0.5) * h;
          let d = Math.sqrt(
            (minArr[i][0] - pos[0]) * (minArr[i][0] - pos[0]) +
              (minArr[i][1] - pos[1]) * (minArr[i][1] - pos[1])
          );

          if (d < 0.2) {
            ctx.arc(xPos, yPos, 0, 0, 2 * Math.PI);
          }
        }

        ctx.fill();
      }
      updateCopy();
    } else {
      /*minArr */
      const minArr = [];
      const pos = [0, 0];
      calculateMinArr(raycaster, pointer, camera, minArr, Obj, radius, pos);
      ctx.fillStyle = document
        .getElementById("colorEl")
        .getAttribute("data-color");

      if (minArr[0]) {
        ctx.beginPath();
        let xPos = minArr[0][0] * w;
        let yPos = h / 2 - (minArr[0][1] - 0.5) * h;
        ctx.drawImage(document.getElementById("copy"), 0, 0);
        for (let i = 1; i < 36; i++) {
          xPos = minArr[i][0] * w;
          yPos = h / 2 - (minArr[i][1] - 0.5) * h;
          let d = Math.sqrt(
            (minArr[i][0] - pos[0]) * (minArr[i][0] - pos[0]) +
              (minArr[i][1] - pos[1]) * (minArr[i][1] - pos[1])
          );

          if (d < 0.2) {
            ctx.arc(xPos, yPos, 0, 0, 2 * Math.PI);
          }
        }

        ctx.fill();
      }
    }
  } else if (option === "fill") {
    control.enabled = false;

    if (mouseClicked) {
      raycaster.setFromCamera(pointer, camera);

      const intersection = raycaster.intersectObject(Obj);

      if (intersection.length > 0) {
        let min = intersection[0];
        for (let el of intersection) {
          if (el.distance < min.distance) {
            min = el;
          }
        }
        const pos = [min.uv.x, min.uv.y];

        ctx.fillStyle = document
          .getElementById("colorEl")
          .getAttribute("data-color");

        //  ctx.arc((min.uv.x)*w-12.5, h/2 - (min.uv.y-0.5)*h-12.5,25, 0, 2 * Math.PI);

        let xPos = pos[0] * w;
        let yPos = h / 2 - (pos[1] - 0.5) * h;

        for (let region of regions) {
          if (
            xPos >= region[0] &&
            yPos >= region[1] &&
            xPos <= region[2] &&
            yPos <= region[3]
          ) {
            console.log(region);
            console.log(xPos, yPos);

            ctx.fillRect(
              region[0],
              region[1],
              region[2] - region[0],
              region[3] - region[1]
            );
            ctx.fill();
            break;
          }
        }
      }
      updateCopy();
    } else {
      raycaster.setFromCamera(pointer, camera);

      const intersection = raycaster.intersectObject(Obj);

      if (intersection.length > 0) {
        let min = intersection[0];
        for (let el of intersection) {
          if (el.distance < min.distance) {
            min = el;
          }
        }
        const pos = [min.uv.x, min.uv.y];

        ctx.fillStyle = document
          .getElementById("colorEl")
          .getAttribute("data-color");

        ctx.drawImage(document.getElementById("copy"), 0, 0);

        let xPos = pos[0] * w;
        let yPos = h / 2 - (pos[1] - 0.5) * h;

        for (let region of regions) {
          if (
            xPos >= region[0] &&
            yPos >= region[1] &&
            xPos <= region[2] &&
            yPos <= region[3]
          ) {
            console.log(region);
            console.log(xPos, yPos);

            ctx.fillRect(
              region[0],
              region[1],
              region[2] - region[0],
              region[3] - region[1]
            );
            ctx.fill();
            break;
          }
        }
      }
    }
  } else if (option === "rotate") {
    control.enabled = true;
  }

  updateObjTex();
};
export const setUpThree = () => {
  btnEl = document.getElementById("btn");
  canvas = document.getElementById("draw");
  h = canvas.height;
  w = canvas.width;
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  scene = new THREE.Scene();
  loadModel();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
  );
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
    alpha: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.setX(-5);
  camera.position.setZ(25);
  camera.position.setY(21);
  renderer.render(scene, camera);
  /*light here */
  setUpLight();
  control = new OrbitControls(camera, renderer.domElement);
  pointer.x = 200000;

  raycaster = new THREE.Raycaster();
  setUpListener();
  animate();
};
