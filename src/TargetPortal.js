import { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class TargetPortal extends Component {
  static defaultProps = {
    nodeType: "div",
    targets: [],
  };
  static propTypes = {
    nodeType: PropTypes.string,
    targets: PropTypes.array,
  };
  constructor(props) {
    super(props);
    this.el = document.createElement(this.props.nodeType);
  }
  componentDidMount() {
    this.moveToTarget();
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.predicate !== this.props.predicate ||
      prevProps.targets !== this.props.targets
    )
      this.moveToTarget();
  }
  componentWillUnmount() {
    if (this.ref && this.ref.contains(this.el)) {
      this.ref.removeChild(this.el);
    }
  }
  moveToTarget = () => {
    const target = this.props.targets.find(
      t => t.case === this.props.predicate,
    );
    this.ref = target && target.ref ? target.ref : null;
    if (!this.ref || this.ref.contains(this.el)) return;
    this.ref.appendChild(this.el);
  };
  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default TargetPortal;
