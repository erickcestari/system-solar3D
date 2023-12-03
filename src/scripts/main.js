import '../style.css'

import * as THREE from "three"

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Earth } from './planets/earth'
import { Sun } from './planets/sun'

const canvas = document.querySelector('#bg')

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(150)

const ambientLight = new THREE.AmbientLight(0xffffff)
ambientLight.intensity = 2.5
scene.add(ambientLight)

const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
  const geometry = new THREE.SphereGeometry(0.40, 24, 24)
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(1000))

  star.position.set(x, y, z)
  scene.add(star)
}

Array(400).fill().forEach(addStar)

const earth1 = new Earth
earth1.id = 1
earth1.x = 100
earth1.xVelocity = 0.01
earth1.zVelocity = 0.01
earth1.init(scene)

const earth2 = new Earth
earth2.id = 2
earth2.xVelocity = -0.01
earth2.init(scene)

const sun = new Sun
sun.id = 3
sun.x = 200
sun.init(scene)

const sun2 = new Sun
sun2.id = 4
sun2.y = 100
sun2.x = -200
sun2.init(scene)

const listPlanets = [earth1, earth2, sun, sun2]

function animate() {
  requestAnimationFrame(animate)
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  controls.update()

  for(const planet of listPlanets) {
    planet.move(listPlanets)
  }

  for(const planet of listPlanets) {
    planet.updatePosition()
    planet.draw()
  }

  renderer.render(scene, camera);
}

animate()