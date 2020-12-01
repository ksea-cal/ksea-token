import React from "react";

class Member extends React.Component { 
  constructor(props) {
    super(props)

    this.state = {
      member: "", 
      points: 0
    }
  }

  componentDidMount() {
    if (this.props.address != "") {
      fetch("http://127.0.0.1:5000/viewmember?address=".concat(this.props.account)).then(res => res.json()).then(
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
        <div>
          <h1> Hi { this.state.member }! </h1>
          <h3> You currently have { this.state.points } points </h3>
        </div>
    )    
  }
}

export default Member;
