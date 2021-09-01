export interface Model {
    update(delta: number): void
    playAnimation(id: string): void
    getId(): string
    getUnsafeUnderlyingModelImpl(): any
}
