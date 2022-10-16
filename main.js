import "/style.css"
import * as THREE from "./three";
import {OrbitControls} from "./OrbitControls";
import { AmbientLight, Material } from 'three';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer({
  canvas:document.querySelector('#bg'),
});
camera.position.setZ(30);
renderer.render(scene,camera);


  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  


const geometry = new THREE.TorusGeometry(10,3,16,150);
const material = new THREE.MeshBasicMaterial({color:"red",wireframe:true});
const material2 = new THREE.MeshStandardMaterial({color:0xFF6347});
const torus = new THREE.Mesh( geometry, material);

// scene.add(torus)
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20)
const ambientlight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight,ambientlight)
const lighthelper = new THREE.PointLightHelper(pointLight);
const gridhelper = new THREE.GridHelper(200,50);
const controls = new OrbitControls(camera,renderer.domElement);
function addstar(){
  const geometry =new THREE.SphereGeometry(0.35,14,24);
  const material = new THREE.MeshStandardMaterial({color:0xffffff});
  const star = new THREE.Mesh(geometry,material);
   const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));
   star.position.set(x,y,z);
   scene.add(star,torus)
}
Array(200).fill().forEach(addstar)
scene.add(lighthelper)
function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x -= 0.02;
  torus.rotation.y -=0.002;
  torus.rotation.z -=0.02;
  controls.update();
  renderer.render(scene, camera)
}
animate()