import {ThreeDEngine} from "../../3dEngine";
import {Model} from "../asset/Model";

export interface RendererPort {
    init(element: HTMLElement): void
    update(gameEngine: ThreeDEngine): void
    addCube(id: string, color: number): void
    addModel(id: string, model: Model): void;
}
