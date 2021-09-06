import {HolyCube} from "./HolyCube";

export interface ScenePort {
    add(cube: HolyCube): void;
    remove(cube: HolyCube[]): void;
}