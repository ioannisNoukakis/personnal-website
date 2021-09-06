import {CubeManager, CubeManagerOptions} from "./CubeManager";
import {Vector3} from "three";
import {TestCube} from "../../infrastructure/adapters/TestCube";
import {Point} from "./utils";
import {TestScene} from "../../infrastructure/adapters/TestScene";
import {PerdictableRandom} from "../../infrastructure/adapters/PerdictableRandom";

describe("CubeSpawner.ts", () => {
    let ops: CubeManagerOptions;
    let sut: CubeManager;
    let scene: TestScene;
    let random: PerdictableRandom;

    beforeEach(() => {
        random = new PerdictableRandom(0.4);
        scene = new TestScene();
        ops = {
            spawnPoint: new Vector3(0, 0, 5000),
            outOfBoundsX: (x) => x > Math.abs(100),
            outOfBoundsY: (y) => y > Math.abs(100),
            outOfBoundsZ: (z) => z < -100,
            intervalMS: 300,
            howManyPerBatch: 10,
            radiusMin: 50,
            radiusMax: 100,
            speed: 1,
            cubeFactory: () => new TestCube(),
            computeDirection: (randomPointInCircle: Point, spawnPoint: Vector3) => new Vector3(
                randomPointInCircle.x,
                randomPointInCircle.y,
                -spawnPoint.z
            ),
            cubeNumberLimit: 6000
        };
        sut = new CubeManager(ops, scene, random);
    });

    it("Should not spawn cubes if delta was zero", () => {
        sut.update(0);
        expect(scene.getCubes().length).toStrictEqual(0);
    });

    it("Should spawn cubes if delta is positive", () => {
        sut.update(300);
        expect(scene.getCubes().length).toStrictEqual(10);
    });

    it("Should destroy cubes if they went beyond the position limit", () => {
        throw new Error("UNIMPLEMENTED");
    });
})