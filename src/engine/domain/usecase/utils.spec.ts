import {getRandomPointInCircle} from "./utils";
import {PerdictableRandom} from "../../infrastructure/adapters/PerdictableRandom";

describe("ThreeDEngine utilities tests", () => {

    describe("getRandomPointInCircle", () => {
        it("Should throw if the circle is of radius zero or lower", () => {
            expect(() => getRandomPointInCircle(new PerdictableRandom(0.5))(0, 1))
                .toThrow(new Error("Radius cannot be lower or equal than/to zero"));
            expect(() => getRandomPointInCircle(new PerdictableRandom(0.5))(-1, 1))
                .toThrow(new Error("Radius cannot be lower or equal than/to zero"));
            expect(() => getRandomPointInCircle(new PerdictableRandom(0.5))(1, -1))
                .toThrow(new Error("Radius cannot be lower or equal than/to zero"));
            expect(() => getRandomPointInCircle(new PerdictableRandom(0.5))(1, 0))
                .toThrow(new Error("Radius cannot be lower or equal than/to zero"));
        });

        it("Should give a random number in a circle", () => {
            const res = getRandomPointInCircle(new PerdictableRandom(0.5))(500, 700);
            const distance = Math.sqrt(Math.pow(res.x, 2) + Math.pow(res.y, 2));
            expect(distance >= 500 || distance <= -500).toBeTruthy();
            expect(distance <= 700 || distance >= -700).toBeTruthy();
            expect(res.x).toBe(-600);
        });
    })
});