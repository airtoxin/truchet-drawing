import React, { Component } from 'react';
import { connect } from 'react-redux';
import Hex, { gridPoint } from 'react-hex';
import truchet from './truchet.png';
import palago from './palago.png';

class Truchet extends Component {
  constructor() {
    super();
    this.state = {
      clickRotation: true,
      mouseOverRotation: true,
      autoRotation: false
    };
    this.interval = null;
  }

  componentDidUpdate() {
    if (!this.interval && this.state.autoRotation) {
      this.interval = setInterval(() => {
        const { hexes, rotate } = this.props;
        const { x, y } = hexes[Math.floor(Math.random() * (hexes.length - 1))]
        this.props.rotate(x, y)
      }, 100);
    }
    if (this.interval && !this.state.autoRotation) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.interval = null;
  }

  render() {
    const { hexes, rotate } = this.props;
    return (
      <div>
        <div>
          <label>Click Rotation</label>
          <input type="checkbox" checked={this.state.clickRotation} onChange={() => this.setState({ clickRotation: !this.state.clickRotation })}/>
          <label>Mouse Over Rotation</label>
          <input type="checkbox" checked={this.state.mouseOverRotation} onChange={() => this.setState({ mouseOverRotation: !this.state.mouseOverRotation })}/>
          <label>Auto Rotation</label>
          <input type="checkbox" checked={this.state.autoRotation} onChange={() => this.setState({ autoRotation: !this.state.autoRotation })}/>
        </div>
        <svg width="1500" height="880">
          <defs>
            <pattern id="truchet" width="100%" height="100%">
              <image xlinkHref={truchet} x="0" y="0" height={hexes[0].size * 2}/>
            </pattern>
            <pattern id="palago" width="100%" height="100%">
              <image xlinkHref={palago} x="0" y="0" height={hexes[0].size * 2}/>
            </pattern>
          </defs>
          {
            hexes.map(({ x, y, size, direction }) => {
              const hexProps = gridPoint('pointy-topped', 100, 100, size, x, y).props;
              return (
                <Hex
                  key={`${x}-${y}`}
                  fill="url(#palago)"
                  stroke="white"
                  strokeWidth="0"
                  transform={`rotate(${direction * 120} ${hexProps.x} ${hexProps.y})`}
                  onClick={() => this.state.clickRotation && rotate(x, y)}
                  onMouseEnter={() => this.state.mouseOverRotation && rotate(x, y)}
                  {...hexProps}
                />
              );
            })
          }
        </svg>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    hexes: state.truchet.hexes,
  }),
  dispatch => ({
    rotate: (x, y) => dispatch({ type: 'ROTATE', payload: { x, y } }),
  }),
)(Truchet)
