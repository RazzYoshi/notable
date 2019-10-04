import React, { Component } from "react";
import "./Appointments.css";

export class Appointments extends Component {
  state = {
    appointments: []
  };

  shouldComponentUpdate = ({ physician: { id } }) => {
    const {
      physician: { id: oldId }
    } = this.props;
    return id !== oldId;
  };

  componentDidUpdate = async () => {
    const {
      physician: { id }
    } = this.props;
    const apps = await this.getAppointments(id).catch(err =>
      console.error(err)
    );
    this.setState({ appointments: apps });
  };

  componentDidMount = async () => {
    const {
      physician: { id }
    } = this.props;
    const apps = await this.getAppointments(id).catch(err =>
      console.error(err)
    );
    this.setState({ appointments: apps });
  };

  getAppointments = async id => {
    const { getAppointments } = this.props;
    const currAppointments = await getAppointments(id);
    return currAppointments.currentAppointments;
  };

  render() {
    const { physician } = this.props;
    let { appointments = [] } = this.state;
    appointments = appointments.filter(
      appointment => appointment.doctor === physician.id
    );

    return (
      <div className="Appointments">
        {physician.id ? (
          <div>
            <div className="app-title">
              Dr. {physician.firstName} {physician.lastName}
            </div>
            <div className="app-subtitle">{physician.email}</div>
            {appointments.length > 0 && (
              <ul>
                <div className="appointment app-header" id={0}>
                  <span className="app-count">#</span>
                  <span className="app-name">Name</span>
                  <span className="app-time">Time</span>
                  <span className="app-kind">Kind</span>
                </div>
                {appointments.map((curr, i) => (
                  <div className="appointment" id={i + 1}>
                    <span className="app-count">{i}</span>
                    <span className="app-name">{curr.patient}</span>
                    <span className="app-time">{curr.time}</span>
                    <span className="app-kind">{curr.kind}</span>
                  </div>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div>Please Select a Physician</div>
        )}
      </div>
    );
  }
}

export default Appointments;
