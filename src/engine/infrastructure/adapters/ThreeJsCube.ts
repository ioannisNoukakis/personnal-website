import * as THREE from "three";
import {HolyCube} from "../../domain/port/HolyCube";
import {Object3D, Vector3} from "three";

export class ThreeJsCube implements HolyCube {
    private _direction: THREE.Vector3 | null = null;
    private _speed: number | null = null;

    constructor(private _mesh: THREE.Mesh) {
        this._mesh.rotation.x = Math.random() * Math.PI;
        this._mesh.rotation.y = Math.random() * Math.PI;
        this._mesh.rotation.z = Math.random() * Math.PI;
    }

    update(delta: number): void {
        if (!this._direction || !this._speed) {
            throw new Error("Direction and speed must be initialized.");
        }
        this._mesh.position.x += this._direction.x * this._speed * delta;
        this._mesh.position.y += this._direction.y * this._speed * delta;
        this._mesh.position.z += this._direction.z * this._speed * delta;
    }

    getX(): number {
        return this._mesh.position.x;
    }

    getY(): number {
        return this._mesh.position.y;
    }

    getZ(): number {
        return this._mesh.position.z;
    }

    setDirection(direction: Vector3): void {
        this._direction = new Vector3(direction.x, direction.y, direction.z);
    }

    setPosition(pos: Vector3): void {
        this._mesh.position.x = pos.x;
        this._mesh.position.y = pos.y;
        this._mesh.position.z = pos.z;
    }

    setSpeed(speed: number): void {
        this._speed = speed;
    }

    getObject3D(): Object3D {
        return this._mesh;
    }
}