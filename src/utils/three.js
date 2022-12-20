import * as THREE from "three";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import MODEL from "../models/CuteKitty.glb";
import { regions } from "./regions";

const setUpLight = (scene) => {
  const light = new THREE.PointLight(0xffffff);
  light.position.set(10, 20, 10);
  light.intensity = 0.7;
  const sphereSize = 1;
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

const updateObjTex = (Obj) => {
  texture = new THREE.TextureLoader().load(
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
export const setUpThree = () => {
  let mouseClicked = false;
  const btnEl = document.getElementById("btn");
  var canvas = document.getElementById("draw");
  var context = canvas.getContext("2d");

  btnEl.addEventListener("click", () => {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    document
      .getElementById("copy")
      .getContext("2d")
      .drawImage(document.getElementById("draw"), 0, 0);
    updateObjTex(Obj);
  });
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);

  const scene = new THREE.Scene();

  let Obj;
  const loader = new GLTFLoader();

  console.log(loader.load);
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
    },
    () => {
      console.log("loading");
    },
    (e) => {
      console.log(e);
    }
  );

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

  let radius = 0.05;
  window.addEventListener("mousewheel", (e) => {
    e.preventDefault();
    if (
      document.querySelector(".toolEl").getAttribute("data-tool") == "brush"
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
  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.setX(-5);
  camera.position.setZ(25);
  camera.position.setY(21);

  renderer.render(scene, camera);

  let texture = new THREE.TextureLoader().load(
    document.querySelector("#draw").toDataURL("image/png")
  );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);
  const material = new THREE.MeshStandardMaterial({
    map: texture,
  });

  /*light here */
  setUpLight(scene);

  const control = new OrbitControls(camera, renderer.domElement);
  const pointer = new THREE.Vector2();
  pointer.x = 200000;
  const raycaster = new THREE.Raycaster();

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

  document
    .getElementById("copy")
    .getContext("2d")
    .drawImage(document.getElementById("draw"), 0, 0);

  function animate() {
    requestAnimationFrame(animate);

    if (!Obj) {
      return;
    }
    Obj.rotation.y = 120;

    renderer.render(scene, camera);

    if (
      document.querySelector(".toolEl").getAttribute("data-tool") == "brush"
    ) {
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

          const minArr = [];

          for (let i = 0; i < 36; i++) {
            const point_i = new THREE.Vector2(0, 0);
            point_i.x = pointer.x + radius * Math.cos((i / 36) * Math.PI * 2);
            point_i.y =
              pointer.y + radius * Math.sin((i / 36) * Math.PI * 2) * 2;

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

          var canvas = document.getElementById("draw");
          var ctx = canvas.getContext("2d");

          ctx.fillStyle = document
            .getElementById("colorEl")
            .getAttribute("data-color");

          const h = canvas.height;
          const w = canvas.width;

          if (minArr[0]) {
            ctx.beginPath();

            //  ctx.arc((min.uv.x)*w-12.5, h/2 - (min.uv.y-0.5)*h-12.5,25, 0, 2 * Math.PI);

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

            document
              .getElementById("copy")
              .getContext("2d")
              .drawImage(document.getElementById("draw"), 0, 0);
          }
        }
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

          const minArr = [];

          for (let i = 0; i < 36; i++) {
            const point_i = new THREE.Vector2(0, 0);
            point_i.x = pointer.x + radius * Math.cos((i / 36) * Math.PI * 2);
            point_i.y =
              pointer.y + radius * Math.sin((i / 36) * Math.PI * 2) * 2;

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

          var canvas = document.getElementById("draw");
          var ctx = canvas.getContext("2d");

          ctx.fillStyle = document
            .getElementById("colorEl")
            .getAttribute("data-color");

          const h = canvas.height;
          const w = canvas.width;

          if (minArr[0]) {
            ctx.beginPath();

            //  ctx.arc((min.uv.x)*w-12.5, h/2 - (min.uv.y-0.5)*h-12.5,25, 0, 2 * Math.PI);

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
      }
    } else if (
      document.querySelector(".toolEl").getAttribute("data-tool") == "rotate"
    ) {
      control.enabled = true;
    } else if (
      document.querySelector(".toolEl").getAttribute("data-tool") == "fill"
    ) {
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

          var canvas = document.getElementById("draw");
          var ctx = canvas.getContext("2d");
          ctx.fillStyle = document
            .getElementById("colorEl")
            .getAttribute("data-color");

          const h = canvas.height;
          const w = canvas.width;

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

          document
            .getElementById("copy")
            .getContext("2d")
            .drawImage(document.getElementById("draw"), 0, 0);
        }
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

          var canvas = document.getElementById("draw");
          var ctx = canvas.getContext("2d");
          ctx.fillStyle = document
            .getElementById("colorEl")
            .getAttribute("data-color");

          const h = canvas.height;
          const w = canvas.width;

          ctx.drawImage(document.getElementById("copy"), 0, 0);
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
      }
    }

    updateObjTex(Obj);
  }

  animate();
};
