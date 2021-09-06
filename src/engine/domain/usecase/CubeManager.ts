import {Vector3} from "three";
import {HolyCube} from "../port/HolyCube";
import {ScenePort} from "../port/ScenePort";
import {getRandomPointInCircle, Point} from "./utils";
import {RandomPort} from "../port/RandomPort";

export interface CubeManagerOptions {
    outOfBoundsX: (x: number) => boolean;
    outOfBoundsY: (y: number) => boolean;
    outOfBoundsZ: (z: number) => boolean;
    computeDirection: (randomPointInCircle: Point, spawnPoint: Vector3) => Vector3;
    intervalMS: number;
    howManyPerBatch: number;
    spawnPoint: Vector3;
    radiusMin: number;
    radiusMax: number;
    speed: number;
    cubeFactory: () => HolyCube;
    cubeNumberLimit: number;
}

export class CubeManager {
    private _cubes: HolyCube[];
    private _lastDelta: number;
    private _randomFn: (radiusMin: number, radiusMax: number) => Point;

    constructor(private _opts: CubeManagerOptions, private _scene: ScenePort, randomPort: RandomPort) {
        this._cubes = [];
        this._lastDelta = 0;
        this._randomFn = getRandomPointInCircle(randomPort)
    }

    update(deltaMs: number) {
        // Spawn new cubes
        this._lastDelta += deltaMs;
        const howManyCycles = Math.floor(this._lastDelta / this._opts.intervalMS);
        if (howManyCycles > 0 && this._cubes.length < this._opts.cubeNumberLimit) {
            this._lastDelta = 0;
            for (let i = 0; i < howManyCycles; i++) {
                for (let j = 0; j < this._opts.howManyPerBatch; j++) {
                    const toAdd = this._opts.cubeFactory();
                    toAdd.setPosition(this._opts.spawnPoint);
                    toAdd.setDirection(this._opts.computeDirection(
                        this._randomFn(this._opts.radiusMin, this._opts.radiusMax),
                        this._opts.spawnPoint)
                        .normalize()
                    );
                    toAdd.setSpeed(this._opts.speed);
                    this._scene.add(toAdd);
                    this._cubes.push(toAdd);
                }
            }
        }
        // Update all cubes
        for (let i = 0; i < this._cubes.length; i++) {
            this._cubes[i].update(deltaMs)
        }
        const toDelete: HolyCube[] = [];
        // Delete all cubes beyond limits
        this._cubes = this._cubes.filter(cube => {
            if (this._opts.outOfBoundsX(cube.getX())
                || this._opts.outOfBoundsY(cube.getY())
                || this._opts.outOfBoundsZ(cube.getZ())) {
                toDelete.push(cube);
                return false;
            }
            return true;
        });
        if (toDelete.length > 0) {
            this._scene.remove(toDelete)
        }
    }
}