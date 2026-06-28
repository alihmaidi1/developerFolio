import { camera } from "./core/camera";
import { renderer } from "./core/renderer";
import { objects } from "./objects";
import { renderTarget } from "./core/renderTarget";
import { threeSizes } from "./utils/sizes";
import { resources } from "../utils/resources";
import { raycast } from "./utils/raycast";

let canvas: HTMLCanvasElement | null = null;
let initToken = 0;

const init = (_canvas: HTMLCanvasElement) => {
  canvas = _canvas;
  const token = ++initToken;

  const setup = () => {
    if (token !== initToken || canvas !== _canvas || !_canvas.isConnected)
      return;
    threeSizes.init(_canvas);
    camera.init();
    renderTarget.init();
    renderer.init(_canvas);

    objects.init();
    raycast.init();
  };

  if (resources.isReady) {
    setup();
  } else {
    resources.once("ready", setup);
  }
};

const destroy = () => {
  initToken++;
  threeSizes.destroy();
  renderTarget.destroy();
  renderer.destroy();
  objects.destroy();
  camera.destroy();
  canvas = null;
};

export const three = { init, destroy };
