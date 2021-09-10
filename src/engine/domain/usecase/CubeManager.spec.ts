import {CubeManager, CubeManagerOptions} from "./CubeManager";
import {Vector3} from "three";
import {TestCube} from "../../infrastructure/adapters/TestCube";
import {Point} from "./utils";
import {TestScene} from "../../infrastructure/adapters/TestScene";
import {PerdictableRandom} from "../../infrastructure/adapters/PerdictableRandom";

describe("CubeSpawner.ts", () => {
    const staticOps: CubeManagerOptions =  {
        spawnPoint: new Vector3(0, 0, -1000),
        outOfBoundsX: (x) => x > 500,
        outOfBoundsY: (y) => y > 500,
        outOfBoundsZ: (z) => z > 500,
        intervalMS: 200,
        howManyPerBatch: 10,
        radiusMin: 300,
        radiusMax: 500,
        speed: 0.5,
        cubeFactory: () => new TestCube(),
        computeDirection: (randomPointInCircle: Point, spawnPoint: Vector3) => new Vector3(
            randomPointInCircle.x,
            randomPointInCircle.y,
            -spawnPoint.z
        ).normalize(),
        cubeNumberLimit: 6000,
    };
    let sut: CubeManager;
    let scene: TestScene;
    let random: PerdictableRandom;

    beforeEach(() => {
        random = new PerdictableRandom(0.4);
        scene = new TestScene();
        sut = new CubeManager(staticOps, scene, random);
    });

    it("Should not spawn cubes if delta was zero", () => {
        sut.update(0);
        expect(scene.getCubes().length).toStrictEqual(0);
    });

    it("Should not spawn cubes if cube limit has been reached - limit 1", () => {
        sut = new CubeManager({
            ...staticOps,
            cubeNumberLimit: 1,
        }, scene, random);
        sut.update(300);
        expect(scene.getCubes().length).toStrictEqual(1);
    });

    it("Should not spawn cubes if cube limit has been reached - limit 11", () => {
        sut = new CubeManager({
            ...staticOps,
            cubeNumberLimit: 11,
        }, scene, random);
        sut.update(500);
        expect(scene.getCubes().length).toStrictEqual(11);
    });

    it("Should spawn and move cubes if delta is positive", () => {
        sut.update(300);
        expect(scene.getCubes().length).toStrictEqual(10);
        scene.getCubes().forEach(c => {
            expect(c.getX()).toBe(-43.106580757242334);
            expect(c.getY()).toBe(31.318764157034103);
            expect(c.getZ()).toBe(-859.7824629117476);
        });
    });

    it("Should destroy cubes if they went beyond the position limit", () => {
        sut = new CubeManager({
            ...staticOps,
            spawnPoint: new Vector3(0, 0, 499),
            computeDirection: (_: Point, __: Vector3) => new Vector3(0, 0, 1),
        }, scene, random);
        sut.update(300);
        expect(scene.getCubes().length).toStrictEqual(0);
    });
});