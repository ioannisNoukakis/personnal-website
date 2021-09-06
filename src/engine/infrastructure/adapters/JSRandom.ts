import {RandomPort} from "../../domain/port/RandomPort";

export class JSRandom implements RandomPort {
    next(): number {
        return Math.random();
    }

}