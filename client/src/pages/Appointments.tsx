import "./Appointments.css";
import Navbar from "../Components/Navbar";
import "../index.css";
import { Button, DatePicker, Input, TimePicker } from "antd";
import { useGetAstrologerDetailsQuery } from "../api/userApi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const Appointments = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { isError: appointmentIsError } = useGetAstrologerDetailsQuery(
    username || ""
  );

  useEffect(() => {
    if (appointmentIsError) {
      navigate("/page-not-found");
    }
  }, [appointmentIsError]);

  return (
    <>
      <Navbar />
      <div className="appointments">
        <h1>Book an Appointment</h1>
        <div className="appointment__box">
          <Input
            className="appointment__box-input"
            placeholder={`${username}`}
            disabled
          />
          <DatePicker
            className="primary"
            placeholder="Expected appointment date"
          />
          <TimePicker placeholder="Expected time" />
          <Button type="primary" className="btn-primary">
            Go to Payment
          </Button>
        </div>
      </div>
    </>
  );
};

export default Appointments;
