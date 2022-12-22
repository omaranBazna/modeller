import { isRouteErrorResponse } from "react-router-dom";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import MODEL from "../models/food.glb";
import { regions } from "./regions";
import Shadow from "../textures/shadow.png";
export const setUpThree = (url) => {
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

  btnEl = document.getElementById("btn");
  canvas = document.getElementById("draw");

  h = canvas.height;
  w = canvas.width;
  ctx = canvas.getContext("2d");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (url) {
    var img = new Image();

    img.setAttribute("crossOrigin", "anonymous");
    img.onload = function () {
      document.getElementById("copy").getContext("2d").drawImage(img, 0, 0);
      ctx.drawImage(img, 0, 0);
    };

    img.src = url;
  }
  const pointer = new THREE.Vector2();
  const setUpLight = () => {
    const light = new THREE.PointLight(0xffffff);
    light.position.set(15, 30, 15);
    light.intensity = 0.7;
    scene.add(light);
    const light2 = new THREE.PointLight(0xffffff);
    light2.position.set(-15, 30, 15);
    light2.intensity = 0.7;
    scene.add(light2);
    const light3 = new THREE.PointLight(0xffffff);
    light3.position.set(-15, 30, -15);
    light3.intensity = 0.7;
    scene.add(light3);
    const light4 = new THREE.PointLight(0xffffff);
    light4.position.set(15, 30, -15);
    light4.intensity = 0.7;
    scene.add(light4);
    const light5 = new THREE.PointLight(0xffffff);
    light5.position.set(15, -30, 15);
    light5.intensity = 0.4;
    scene.add(light5);
    const light6 = new THREE.PointLight(0xffffff);
    light6.position.set(-15, -30, 15);
    light6.intensity = 0.4;
    scene.add(light6);
    const light7 = new THREE.PointLight(0xffffff);
    light7.position.set(-15, -30, -15);
    light7.intensity = 0.4;
    scene.add(light7);
    const light8 = new THREE.PointLight(0xffffff);
    light8.position.set(15, -30, -15);
    light8.intensity = 0.4;
    scene.add(light8);
  };
  const updateObjTex = () => {
    let texture = new THREE.TextureLoader().load(canvas.toDataURL("image/png"));
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    const new_material = new THREE.MeshStandardMaterial({
      map: texture,
    });
    Obj.material = new_material;
  };
  const calculateMinArr = (minArr, pos) => {
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

  const loadShadow = () => {
    const geometry = new THREE.PlaneGeometry(14, 14);

    const loader = new THREE.TextureLoader();

    const texture2 = loader.load(Shadow);

    texture2.wrapS = THREE.RepeatWrapping;
    texture2.wrapT = THREE.RepeatWrapping;
    texture2.repeat.set(1, 1);
    const new_material = new THREE.MeshStandardMaterial({
      map: texture2,

      transparent: true,
    });

    const plane = new THREE.Mesh(geometry, new_material);
    plane.rotation.x = -Math.PI / 2;
    plane.rotation.y = 0;
    plane.rotation.z = 0;
    plane.position.y = -0.1;
    plane.position.z = -0.7;
    plane.position.x = -0.7;
    scene.add(plane);
  };
  const loadModel = () => {
    const loader = new GLTFLoader();
    loader.load(
      MODEL,
      function (gltf) {
        gltf.scene.position.y = 0;

        gltf.scene.scale.set(50, 50, 50);
        let obj;

        if (gltf.scene.children[0]) {
          obj = gltf.scene.children[0];

          obj.scale.set(14, 14, 14);
        }

        Obj = obj;
        scene.add(Obj);
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
      if (
        document.querySelector(".toolEl").getAttribute("data-tool") === "brush"
      ) {
        if (e.deltaY < 0 && radius < 0.5) {
          radius += 0.001;
        } else if (e.deltaY > 0 && radius > 0.005) {
          radius -= 0.001;
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
    if (document.querySelector(".toolEl") == undefined) {
      return;
    }
    const option = document.querySelector(".toolEl").getAttribute("data-tool");

    if (option === "brush") {
      control.enabled = false;

      if (mouseClicked) {
        const minArr = [];
        const pos = [];
        calculateMinArr(minArr, pos);

        ctx.fillStyle = document
          .getElementById("colorEl")
          .getAttribute("data-color");

        if (minArr[0]) {
          ctx.beginPath();
          let xPos = minArr[0][0] * w;
          let yPos = h / 2 - (minArr[0][1] - 0.5) * h;

          for (let i = 1; i < 36; i++) {
            if (minArr[i]) {
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
          }

          ctx.fill();
          updateCopy();
        }
      } else {
        /*minArr */
        const minArr = [];
        const pos = [];
        calculateMinArr(minArr, pos);

        ctx.fillStyle = document
          .getElementById("colorEl")
          .getAttribute("data-color");

        if (minArr.length > 0) {
          ctx.beginPath();
          let xPos = minArr[0][0] * w;
          let yPos = h / 2 - (minArr[0][1] - 0.5) * h;
          ctx.drawImage(document.getElementById("copy"), 0, 0);
          for (let i = 1; i < 36; i++) {
            if (minArr[i]) {
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
          }

          ctx.fill();
        } else {
          ctx.drawImage(document.getElementById("copy"), 0, 0);
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

          for (let i = 0; i < regions.length; i++) {
            if (
              xPos >= regions[i] * 1200 &&
              yPos >= regions[i + 1] * 1200 &&
              xPos <= regions[i + 2] * 1200 &&
              yPos <= regions[i + 3] * 1200
            ) {
              ctx.fillRect(
                regions[i + 0] * 1200,
                regions[i + 1] * 1200,
                (regions[i + 2] - regions[i + 0]) * 1200,
                (regions[i + 3] - regions[i + 1]) * 1200
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
        } else {
          ctx.drawImage(document.getElementById("copy"), 0, 0);
        }
      }
    } else if (option === "rotate") {
      control.enabled = true;
    }

    updateObjTex();
  };

  scene = new THREE.Scene();

  loadShadow();
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
  updateCopy();
  animate();
};
