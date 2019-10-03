import React, { Component } from "react";
import Sidebar from "./components/SideBar";
import { Appointments } from "./components/Appointments";
import "./App.css";

class App extends Component {
  state = {
    physicians: [],
    currentPhysician: {}
  };
  componentDidMount = () => {
    this.getPhysicians()
      .then(resp => {
        this.setState({ physicians: resp.physicians });
      })
      .catch(err => console.error(err));
  };

  getPhysicians = async () => {
    const response = await fetch("/api/physicians");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  setPhysician = physician => {
    this.setState({ currentPhysician: physician });
  };

  getAppointments = async physician => {
    const response = await fetch("/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ physicianId: physician })
    });
    const appointments = await response.json();
    return appointments;
  };

  render() {
    const { physicians = [], currentPhysician = {} } = this.state;
    return (
      <div className="App">
        <Sidebar
          id="SideBar"
          physicians={physicians}
          current={currentPhysician}
          setPhysician={this.setPhysician}
        />
        <Appointments
          id="Appointments"
          physician={currentPhysician}
          getAppointments={this.getAppointments}
        />
      </div>
    );
  }
}

export default App;
