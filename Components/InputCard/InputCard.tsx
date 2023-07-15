import {  Form } from "react-bootstrap";

interface InputValue {
  Heading: String;
  xeta: String;
  paragraph: String;
  data: String;
}
const InputCard = ({ Heading, xeta, paragraph, data }: InputValue) => {
  return (
    <Form>
      <Form.Group className="" controlId="formBasicEmail">
        <div className="input-wrapper">
          <div className="input-inner-text">
            <span className="ticket-per-day small-text">{Heading}</span>
            <div className="input-field">
              <Form.Control type="email" placeholder="0000"/>
              <span className="input-xeta">{xeta}</span>
            </div>
          </div>
          <div className="input-field-bottom-text-wrapper">
            <p className="small-text left">{paragraph}</p>
            <p className="small-text right">{data}</p>
          </div>
        </div>
      </Form.Group>
    </Form>
  );
};

export default InputCard;
