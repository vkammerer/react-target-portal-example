import React, { Component } from "react";
import TargetPortal from "./TargetPortal";

class App extends Component {
  state = {};
  componentDidMount() {
    this.setState({ targetColor: "blue" });
    this.interval = setInterval(() => {
      this.setState({
        targetColor: this.state.targetColor === "red" ? "blue" : "red",
      });
    }, 2000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div>
        <TargetPortal
          predicate={this.state.targetColor}
          targets={[
            {
              case: "blue",
              ref: this.blueDiv,
            },
            {
              case: "red",
              ref: this.redDiv,
            },
          ]}
        >
          <div>TargetPortal child</div>
        </TargetPortal>
        <div
          style={{ color: "white", backgroundColor: "blue" }}
          ref={ref => (this.blueDiv = ref)}
        />
        <div>
          Target will switch from the blue div to the red div every 2 seconds
        </div>
        <div
          style={{ color: "white", backgroundColor: "red" }}
          ref={ref => (this.redDiv = ref)}
        />
      </div>
    );
  }
}

export default App;
