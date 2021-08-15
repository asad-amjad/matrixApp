import React from "react";
import { SquareBlockProps, SquareBlockState } from "./definations";

class SquareBlock extends React.Component<SquareBlockProps, SquareBlockState> {
  render() {
    return (
      <div className="blockShape" >
        {this.props.data.map((row: any, i: any) => (
          <div key={i}>
            {row.map((col: any, j: any) => (
              <span style={{fontSize:"18px", padding:"15px"}} key={j}> {col}</span>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default SquareBlock;
