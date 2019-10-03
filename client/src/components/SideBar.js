import React, { Component } from "react";
import "./SideBar.css";

export class SideBar extends Component {
  render() {
    const { physicians, setPhysician, current } = this.props;
    return (
      <div className="SideBar">
        <div>NOTABLE</div>
        <div>PHYSICIANS</div>
        {physicians && (
          <ul>
            {physicians.map((physician, i) => (
              <li onClick={() => setPhysician(physician)} key={i + 1}>
                {physician.firstName} {physician.lastName}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default SideBar;
