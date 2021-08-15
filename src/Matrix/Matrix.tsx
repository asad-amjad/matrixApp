import React from "react";
import "../App.css";
import SquareBlock from "../Shared/SquareBlock";
import { MatrixProps, MatrixState } from "./definations";

class Matrix extends React.Component<MatrixProps, MatrixState> {
  constructor(props: MatrixProps) {
    super(props);
    this.state = {
      value: [],
      r1: "",
      r2: "",
      gen_matrix: [],
      gen_transpose: [],
      rowLength: "",
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any) {
    if (event.target.name === "r1") {
      this.setState({ r1: event.target.value });
    } else {
      this.setState({ r2: event.target.value });
    }
  }

  handleValidation() {
    let errors: any = {};
    let formIsValid = true;

    if (!this.state.r1) {
      formIsValid = false;
      errors["r1"] = "Cannot be empty";
    } else if (typeof this.state.r1 !== "undefined") {
      if (!this.state.r1.match(/^([-+] ?)?[0-9]+(,[0-9]+)?$/)) {
        formIsValid = false;
        errors["r1"] = "Please enter correct value";
      }
    }

    if (!this.state.r2) {
      formIsValid = false;
      errors["r2"] = "Cannot be empty";
    } else if (typeof this.state.r2 !== "undefined") {
      if (!this.state.r2.match(/^([-+] ?)?[0-9]+(,[0-9]+)?$/)) {
        formIsValid = false;
        errors["r2"] = "Please enter correct value";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.state.gen_transpose.length !== 0) {
      if (this.state.gen_matrix !== prevState.gen_matrix) {
        this.transposeArray(this.state.gen_matrix);
      }
    }
  }

  handleSubmit(event: any) {
    event.preventDefault();
    let row1 = this.state.r1.split(",");
    let row2 = this.state.r2.split(",");

    if (this.handleValidation()) {
      let errors: any = {};
      errors.rowLength = "Columns not matched";
      if (row1.length === 2 && row2.length === 2) {
        this.setState({ gen_matrix: [row1, row2] });
      } else {
        this.setState({ errors: errors });
      }
    } else {
      // console.log("not true");
    }
  }

  transposeArray(matrix: never[] = []) {
    let arrayLength = matrix.length;
    var newArray = [];
    for (var i = 0; i < matrix.length; i++) {
      newArray.push([]);
    }

    for (let i = 0; i < matrix.length; i++) {
      for (var j = 0; j < arrayLength; j++) {
        newArray[j].push(matrix[i][j]);
      }
    }
    this.setState({ gen_transpose: newArray });
    return newArray;
  }

  render() {
    // console.log(this.state)
    return (
      <div className="container" style={{ marginTop: "10%" }}>
        <div className="row">
          <div className="col-sm">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  name="r1"
                  type="text"
                  className="form-control"
                  placeholder="Enter any number seprate by , (comma)"
                  value={this.state.value.r1}
                  onChange={this.handleChange}
                />
              </div>
              <small className="form-text text-danger">
                {this.state.errors["r1"]}
              </small>

              <br />
              <br />
              <div className="form-group">
                <input
                  type="text"
                  name="r2"
                  className="form-control"
                  placeholder="Enter any number seprate by , (comma)"
                  value={this.state.value.r2}
                  onChange={this.handleChange}
                />
                <small className="form-text text-danger">
                  {this.state.errors["r2"]}
                </small>
              </div>
              <div>
                <small className="form-text text-danger">
                  {this.state.errors["rowLength"]}
                </small>
              </div>
              <br />

              <input
                type="submit"
                className="btn btn-primary"
                value="Generate Matrix"
              />
            </form>
            <br />
            <button
              className="btn btn-primary"
              onClick={() => this.transposeArray(this.state.gen_matrix)}
            >
              Get Transpose
            </button>
          </div>

          <div className="col-sm">
            Matrix Block:
            <SquareBlock data={this.state.gen_matrix} />
          </div>
          <div className="col-sm">
            Transpose of matrix:
            <SquareBlock data={this.state.gen_transpose} />
          </div>
        </div>
      </div>
    );
  }
}

export default Matrix;
