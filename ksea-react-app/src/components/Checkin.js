import React from "react";
import { Button, Form } from "react-bootstrap";

function Checkin(props) {
  return (
    <Form>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="email" placeholder="Bumjin Jjang" />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>

      <Form.Group controlId="formKeyword">
        <Form.Label>Keyword</Form.Label>
        <Form.Control type="password" placeholder="keyword placeholder" />
      </Form.Group>
      <div className="form-group">
        <label for="exampleFormControlSelect1">Rate</label>
        <select className="form-control" id="exampleFormControlSelect1">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>

      <div class="form-group">
        <label for="exampleFormControlTextarea1">Feedback</label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="It suckedddd"
        ></textarea>
      </div>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Checkin;
