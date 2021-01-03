import React from "react";
import { Button, Form } from "react-bootstrap";

function Checkin(props) {

  function handlePassword(event) { 
    setPassword(event.target.value);
  }

  function handleAddress(event) { 
    setAddress(event.target.value);
  }

  function handleSubmitCheckin(event) { 
    let formData = new FormData();
    formData.append('password', password); 
    formData.append('address', address); 
    axios.post("http://127.0.0.1:5000/checkin", formData)
        .then(res => res.json()).then(
          data => { 
            setStatus(data.curr_status)
        })
    if (status == 'success') { 
      window.alert("Successfully Checked In")
    } else if (status == 'wrong_password') { 
      window.alert("Wrong Password")
    } else if (status == 'overtime') { 
      window.alert("Over time")
    } else { 
      window.alert("Failed for unknown reasons")
    }
  }

  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('');

  return (
    <Form>
      <div className="form-group">
          <Form.Group>
            <Form.Label>Create Check-In</Form.Label>
            <Form.Control type="text" onChange={handleAddress} placeholder="Address (e.g., 0x...)" /> 
            <Form.Control type="text" onChange={handlePassword} placeholder="Password" /> 
          </Form.Group>
          <Button onClick={handleSubmitCheckin}  variant="primary" type="submit">
            Create Check-In
          </Button>
      </div>
    </Form>
  );
}

export default Checkin;
