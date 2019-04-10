import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Home = props => (
  <div>
    Home page {props.message} <br />
    <Link to="/about">go to about</Link>
  </div>
);

export default connect(({ app }) => ({ message: app.message }))(Home);
