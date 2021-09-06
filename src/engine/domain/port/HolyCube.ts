import {Object3D, Vector3} from "three";

export interface HolyCube {
    update(delta: number): void;

    setPosition(pos: Vector3): void;
    setDirection(direction: Vector3): void;
    setSpeed(speed: number): void;

    getX(): number;

    getY(): number;

    getZ(): number;

    getObject3D(): Object3D;
}