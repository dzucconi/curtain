import parameters from 'queryparams';
import fps from 'frame-interval';

import randomColor from './lib/random_color';
import times from './lib/times';

window.parameters = parameters;

const DOM = {
  app: document.getElementById('app'),
};

const CONFIG = parameters({
  size: 2,
  gap: 2,
  axes: ['x', 'y'],
  fps: 60,
  bgcolor: 'black',
});

const init = () => {
  DOM.app.style.backgroundColor = CONFIG.bgcolor;

  const width = DOM.app.width = window.innerWidth;
  const height = DOM.app.height = window.innerHeight;

  const ctx = DOM.app.getContext('2d');

  const nY = Math.floor(height / (CONFIG.size * CONFIG.gap));
  const nX = Math.floor(width / (CONFIG.size * CONFIG.gap));

  const map = i => CONFIG.size * i * CONFIG.gap;

  const mapping = {
    x: times(nX)(map),
    y: times(nY)(map),
  };

  const draw = {
    x: p => {
      ctx.fillStyle = randomColor();
      ctx.fillRect(p, 0, CONFIG.size, height);
    },
    y: p => {
      ctx.fillStyle = randomColor();
      ctx.fillRect(0, p, width, CONFIG.size);
    }
  };

  fps(requestAnimationFrame)(CONFIG.fps, () => {
    CONFIG.axes.forEach(axis => {
      mapping[axis].forEach(draw[axis]);
    });
  })();
};

export default init;
