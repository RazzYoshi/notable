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
            <div>
              Dr. {physician.firstName} {physician.lastName}
            </div>
            <div>{physician.email}</div>
            {appointments.length > 0 && (
              <ul>
                {appointments.map((curr, i) => (
                  <li key={i + 1}>
                    {curr.patient} {curr.time} {curr.kind}
                  </li>
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
