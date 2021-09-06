import {RandomPort} from "../port/RandomPort";

export type Point = {
    x: number;
    y: number;
}

export const getRandomPointInCircle = (gen: RandomPort) => (radiusMin: number, radiusMax: number): Point => {
    if (radiusMin <= 0 || radiusMax <= 0) {
        throw new Error("Radius cannot be lower or equal than/to zero");
    }
    const radius = getRandomArbitrary(gen)(radiusMin, radiusMax);

    const angle = gen.next() * Math.PI * 2;
    return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
    }
}

export const getRandomArbitrary = (gen: RandomPort) => (min: number, max: number) => {
    return gen.next() * (max - min) + min;
}