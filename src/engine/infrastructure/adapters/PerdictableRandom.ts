import {RandomPort} from "../../domain/port/RandomPort";

export class PerdictableRandom implements RandomPort {
    constructor(private _output: number) {
    }

    next(): number {
        return this._output;
    }
}