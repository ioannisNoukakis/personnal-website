import {HolyCube} from "../../domain/port/HolyCube";
import * as THREE from "three";
import {Object3D, Vector3} from "three";

export class TestCube implements HolyCube {
    private _position: THREE.Vector3 | null = null;
    public _direction: THREE.Vector3 | null = null;
    public _speed: number | null = null;

    update(delta: number): void {
        this._position!.x += this._direction!.x * this._speed! * delta;
        this._position!.z += this._direction!.z * this._speed! * delta;
        this._position!.y += this._direction!.y * this._speed! * delta;
    }

    getX(): number {
        return this._position!.x;
    }

    getY(): number {
        return this._position!.y;
    }

    getZ(): number {
        return this._position!.z;
    }

    setDirection(direction: Vector3): void {
        this._direction = new Vector3(direction.x, direction.y, direction.z);
    }

    setPosition(pos: Vector3): void {
        this._position = new Vector3(pos.x, pos.y, pos.z);
    }

    setSpeed(speed: number): void {
        this._speed = speed;
    }

    getObject3D(): Object3D {
        return undefined as unknown as Object3D;
    }
}