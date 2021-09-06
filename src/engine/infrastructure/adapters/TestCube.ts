import {HolyCube} from "../../domain/port/HolyCube";
import * as THREE from "three";
import {Object3D, Vector3} from "three";

export class TestCube implements HolyCube {
    public _position: THREE.Vector3 | null = null;
    public _direction: THREE.Vector3 | null = null;
    public _speed: number | null = null;

    update(delta: number): void {
        this._position!.x += this._direction!.x * this._speed!;
        this._position!.y += this._direction!.y * this._speed!;
        this._position!.z += this._direction!.z * this._speed!;
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
        this._direction = direction;
    }

    setPosition(pos: Vector3): void {
        this._position = pos;
    }

    setSpeed(speed: number): void {
        this._speed = speed;
    }

    getObject3D(): Object3D {
        return undefined as unknown as Object3D;
    }
}