import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert, Button } from "react-bootstrap";
import {
  initialSearch,
  setError,
  setTextSearch,
  setDateSearch
} from "../../Actions/SearchEngine";
import moment from "moment";
class Alerts extends Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    this.props.initialSearch();
    this.props.setError(null);
    this.props.setTextSearch("");
  }
  render() {
    const { ErrorReducer } = this.props;
    if (!ErrorReducer.error_description) return null;
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 1000,
          width: "auto"
        }}
      >
        <Alert variant="danger" dismissible>
          <Alert.Heading>{ErrorReducer.error_description}</Alert.Heading>
          <div className="d-flex justify-content-end">
            <Button onClick={() => this.handleClick()} variant="outline-danger">
              Effacer la recherche
            </Button>
          </div>
        </Alert>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ErrorReducer: state.ErrorReducer
});

export default connect(mapStateToProps, {
  initialSearch,
  setError,
  setTextSearch,
  setDateSearch
})(Alerts);
