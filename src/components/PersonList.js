import React, { Component } from "react";
import axios from "axios";
import "./PersonList.css";

export default class PersonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
    };
  }

  componentDidMount() {
    axios.get(`https://randomuser.me/api/?results=10`).then((res) => {
      console.log(res.data);
      const persons = res.data.results;
      this.setState({ persons });
    });
  }

  fetchUsers = async () => {
    try {
      const res = await axios.get(`https://randomuser.me/api/?results=10`);
      this.setState({ ...this.state, persons: res.data.results });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div>
        <nav className="green-nav">User List</nav>
        <div className="user-list">
          {this.state.persons.map((person) => (
            <div className="user-section">

              <div className="user-img-con">
                <img
                  className="user-picture"
                  src={`${person.picture.large}`}
                  alt={`Profile of ${person.name}`}
                />
                <button className="details-button">Details</button>
              </div>

              <div className="user-info">
                <h2>
                  {person.name.first} {person.name.last}
                </h2>
                <p>username: <strong>{person.login.username}</strong></p>
                <p>Gender: {person.gender}</p>
                <p>Time Zone Description: {person.location.timezone.description}</p>
                <p>Address: {person.location.street.number} {person.location.street.name},
                  {person.location.city}, {person.location.state} {person.location.country} - {person.location.postcode}
                </p>
                <p>Email: {person.email}</p>
                <p>Birth Date & Age: {person.dob.date} ({ person.dob.age}) </p>
                <p>Phone: {person.phone}</p>
                <p>Cell: { person.cell} </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
