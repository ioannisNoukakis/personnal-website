import {Model} from "./Model";

export interface AssetDescriptor {
    id: string,
    modelPath: string,
    scale?: number
}

export interface AssetToLoad {
    animationsScale: number,
    main: AssetDescriptor,
    additionalAnimationsPaths: AssetDescriptor[],
}

export interface TreeDModelLoaderPort {
    load(asset: AssetToLoad): Promise<Model>
}
