import React from 'react';
import './Profile.css'


class Profile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      member: "",
      points: 0
    }
  }

  componentDidMount() {

    if (this.props.address != "") {
      fetch("http://127.0.0.1:5000/viewmember?address=0xcE337c810b9EA86975A765B6B7F9AdE6263cE936").then(res => res.json()).then(
        data => {
          this.setState( { "member": data.name, "points": data.points })
        }
      );
    } else {
      console.log(this.props.account);
    }
  };

  render() {
    return (
      <div className="profile">
          <div class="profileBox">
              <li class="about">
                  <article>
                      <div class="about-backimage"></div>
                      <div class="about-profileimage"></div>
                  </article>
                  <article class="about-text">
                    <h2 style={{fontWeight:"bolder", fontSize:"40px"}}>{ this.state.member }</h2>
                    <p style={{lineHeight:"10px"}}></p>
                    <p>Current points - { this.state.points }</p>
                    <p>Dobby</p>
                  </article>
              </li>
          </div>
      </div>
    )
  }
}

export default Profile;
