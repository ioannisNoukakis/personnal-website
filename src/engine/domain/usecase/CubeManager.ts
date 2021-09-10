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
        if (howManyCycles > 0) {
            this._lastDelta = 0;
            let howMany = this._opts.howManyPerBatch * howManyCycles;
            if (this._opts.cubeNumberLimit < this._cubes.length + howMany) {
                howMany = this._opts.cubeNumberLimit - this._cubes.length;
            }
            const cubesToAdd: HolyCube[] = [];
            for (let i = 0; i < howMany; i++) {
                const toAdd = this._opts.cubeFactory();
                toAdd.setPosition(this._opts.spawnPoint);
                toAdd.setDirection(this._opts.computeDirection(
                    this._randomFn(this._opts.radiusMin, this._opts.radiusMax),
                    this._opts.spawnPoint)
                    .normalize()
                );
                toAdd.setSpeed(this._opts.speed);
                cubesToAdd.push(toAdd);
                this._cubes.push(toAdd);
            }
            // batch add is way more efficient.
            if (cubesToAdd.length > 0) {
                this._scene.add(cubesToAdd);
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
        // batch delete is way more efficient.
        if (toDelete.length > 0) {
            this._scene.remove(toDelete)
        }
    }
}