// core
import React from "react";
// components
import ViewPage from "../../../UI/ViewPage";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <ViewPage title="Something went wrong.">
          <section className="col-md-6 card p-3">
            <details style={{ whiteSpace: "pre-wrap" }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
          </section>
        </ViewPage>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
