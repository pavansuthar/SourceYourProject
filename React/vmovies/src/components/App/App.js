// css
import React from "react";
import "./../../assets/css/App.scss";
// components
import Header from "./../Header/Header";
import Content from "./../Content/Content";
import Footer from "./../Footer/Footer";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Header />
          </div>
          <div className="col-md-12 mt-2">
            <Content />
          </div>
          <div className="col-md-12">
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
