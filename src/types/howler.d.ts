declare module "howler" {
  export interface HowlOptions {
    src: string | string[];
    volume?: number;
    loop?: boolean;
    preload?: boolean | "metadata";
    autoplay?: boolean;
    mute?: boolean;
    html5?: boolean;
    onloaderror?: (id: number, error: unknown) => void;
    onplayerror?: (id: number, error: unknown) => void;
  }

  export class Howl {
    constructor(options: HowlOptions);
    play(spriteOrId?: string | number): number;
    pause(id?: number): this;
    stop(id?: number): this;
    mute(muted?: boolean, id?: number): this;
    volume(vol?: number, id?: number): number | this;
    unload(): void;
  }
}
