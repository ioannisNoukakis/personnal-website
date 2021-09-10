import {ScenePort} from "../../domain/port/ScenePort";
import {Scene} from "three";
import {HolyCube} from "../../domain/port/HolyCube";

export class ThreeJSScene implements ScenePort {
    constructor(private _scene: Scene) {
    }

    add(cube: HolyCube[]): void {
        this._scene.add(...cube.map(c => c.getObject3D()));
    }

    remove(cube: HolyCube[]): void {
        this._scene.remove(...cube.map(e => e.getObject3D()));
    }
}