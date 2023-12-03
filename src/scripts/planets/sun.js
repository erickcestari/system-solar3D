import { EARTHMASS, EARTHRADIUS } from "../constant";
import { Planet } from "../planet";
import * as THREE from "three"

export class Sun extends Planet {
  name = "Sun"
  radius = EARTHRADIUS * 10
  mass = EARTHMASS * 333000
  image = 'sun.png'
  pointLight = null

  draw(){
    super.draw()
    this.pointLight.position.set(this.x, this.y, this.z)    
  }

  init(scene) {
    super.init(scene)

    this.pointLight = new THREE.PointLight(0xffffff)
    this.pointLight.intensity = 1000
    this.pointLight.decay = 1
    this.pointLight.position.set(this.x, this.y, this.z)
    scene.add(this.pointLight)
  }
}