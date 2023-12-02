import { AU, EARTHMASS, EARTHRADIUS, G } from "./constant"
import * as THREE from "three"

export class Planet {
  id = 0
  name = "Planet"
  x = 0
  y = 0
  z = 0
  xVelocity = 0
  yVelocity = 0
  zVelocity = 0
  xAcceleration = 0;
  yAcceleration = 0;
  zAcceleration = 0;
  planetMesh = null
  mass = EARTHMASS
  radius = EARTHRADIUS

  move(listPlanets) {
    for (let planet of listPlanets) {
      if (planet.id != this.id) {
        const dx = planet.x - this.x
        const dy = planet.y - this.y
        const dz = planet.z - this.z

        let distanceSquared = (dx * dx + dy * dy + dz * dz) * AU
        if(distanceSquared < 500) {
          distanceSquared = 500
        }
        let distance = Math.sqrt(distanceSquared)

        const force = (G * this.mass * planet.mass) / distanceSquared

        const ax = (force / this.mass) * (dx / distance)
        const ay = (force / this.mass) * (dy / distance)
        const az = (force / this.mass) * (dz / distance)

        this.xAcceleration = ax
        this.yAcceleration = ay
        this.zAcceleration = az

        this.xVelocity += this.xAcceleration
        this.yVelocity += this.yAcceleration
        this.zVelocity += this.zAcceleration
      }
    }
  }

  updatePosition() {
    this.x += this.xVelocity
    this.y += this.yVelocity
    this.z += this.zVelocity
  }

  init(scene) {
    const geometry = new THREE.SphereGeometry(this.radius, 24, 24)
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
    this.planetMesh = new THREE.Mesh(geometry, material);
    this.planetMesh.position.set(this.x, this.y, this.z);

    scene.add(this.planetMesh)
  }

  draw() {
    if (this.planetMesh) {
      this.planetMesh.position.set(this.x, this.y, this.z);
    }
  }
}