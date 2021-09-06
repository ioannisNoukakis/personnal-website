import {ScenePort} from "../../domain/port/ScenePort";
import {HolyCube} from "../../domain/port/HolyCube";

export class TestScene implements ScenePort {
    private _cubes: HolyCube[];

    constructor() {
        this._cubes = [];
    }

    add(cube: HolyCube): void {
        this._cubes.push(cube);
    }

    remove(cubes: HolyCube[]): void {
        this._cubes = this._cubes.filter(c => cubes.includes(c));
    }

    getCubes() {
        return this._cubes;
    }
}