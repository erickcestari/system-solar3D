import { EARTHMASS, EARTHRADIUS } from "../constant";
import { Planet } from "../planet";

export class Sun extends Planet {
  name = "Sun"
  radius = EARTHRADIUS * 10
  mass = EARTHMASS
}