import { combineReducers } from 'redux';
import lodash from 'lodash';
import dp from 'dot-prop-immutable';

const defaultHexes =
  lodash.range(10).map(y => {
    const isEaven = y % 2 == 0;
    const q = Math.floor(y / 2);
    return lodash.range(isEaven ? 16 : 17).map(x => ({
      x: isEaven ? x - q : x - q - 1,
      y,
      size: 50,
      direction: Math.floor(Math.random() * 3),
    }));
  })
  .reduce((a, l) => a.concat(l), []);

const getHexIndex = (hexes, x, y) => lodash.findIndex(
  hexes,
  (h) => h.x === x && h.y === y,
);

const hexesReducer = (state = defaultHexes, { type, payload }) => {
  switch (type) {
    case 'ROTATE': {
      const { x, y } = payload;
      const idx = getHexIndex(state, x, y);
      return dp.set(state, `${idx}.direction`, d => (d + 1) % 6);
    }
  }
  return state;
}

export default combineReducers({
  hexes: hexesReducer,
});
