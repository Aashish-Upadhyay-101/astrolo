import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  TimePicker,
} from "antd";
import { useGetAstrologerDetailsQuery } from "../api/userApi";
import {
  useCreateAppointmentMutation,
  useCreateCheckoutSessionMutation,
} from "../api/astroloApi";
import "./Appointments.css";
import Navbar from "../Components/Navbar";
import "../index.css";
import moment from "moment";

const Appointments = () => {
  const [appointmentDetail, setAppointmentDetail] = useState({
    start_date: "",
    start_time: "",
  });
  const { username } = useParams();
  const navigate = useNavigate();
  const { isError: appointmentIsError } = useGetAstrologerDetailsQuery(
    username || ""
  );

  const [
    CreateAppointment,
    {
      isError: CreateAppointmentIsError,
      error: CreateAppointmentError,
      isSuccess: CreateAppointmentIsSuccess,
    },
  ] = useCreateAppointmentMutation();

  const [
    CreateCheckoutSession,
    {
      data,
      isError: isErrorCreateCheckoutSession,
      error: errorCreateCheckoutSession,
    },
  ] = useCreateCheckoutSessionMutation();

  useEffect(() => {
    if (appointmentIsError) {
      navigate("/page-not-found");
    }
  }, [appointmentIsError]);

  // stripe integration redirection
  useEffect(() => {
    if (CreateAppointmentIsSuccess) {
      CreateCheckoutSession(username || "");
    }

    if (data) {
      window.location.href = data;
    }
  }, [data, CreateAppointmentIsSuccess]);

  const appointmentBookingHandler = () => {
    const finalDetail = {
      ...appointmentDetail,
      astrologer_username: username || "",
    };

    CreateAppointment(finalDetail);

    if (CreateAppointmentIsError) {
      console.log(CreateAppointmentError);
    }
  };

  const onDateFieldChange: DatePickerProps["onChange"] = (date, dateString) => {
    setAppointmentDetail({
      ...appointmentDetail,
      start_date: dateString,
    });
  };

  const onTimeFieldChange = (time: Dayjs | null, timeString: string) => {
    setAppointmentDetail({
      ...appointmentDetail,
      start_time: timeString,
    });
  };

  return (
    <>
      <Navbar />
      <div className="appointments">
        <h1>Book an Appointment</h1>

        <Form className="appointment__box">
          <Input
            className="appointment__box-input"
            placeholder={`${username}`}
            disabled
            name="username"
          />
          <DatePicker
            className="primary"
            placeholder="Expected appointment date"
            onChange={onDateFieldChange}
            disabledDate={(current) => {
              let customDate = moment().format("YYYY-MM-DD");
              return current && current < moment(customDate, "YYYY-MM-DD");
            }}
            name="start_date"
          />
          <TimePicker
            placeholder="Expected time"
            onChange={onTimeFieldChange}
            defaultValue={dayjs("00:00:00", "HH:mm:ss")}
            hideDisabledOptions={true}
            showNow={false}
            showSecond={false}
            name="start_time"
            disabledHours={() => {
              const hours = [];
              if (
                moment().format("YYYY-MM-DD") == appointmentDetail.start_date
              ) {
                for (let i = 0; i < moment().hour(); i++) hours.push(i);
              }
              return hours;
            }}
            disabledMinutes={() => {
              const minutes = [];
              if (
                moment().format("YYYY-MM-DD") == appointmentDetail.start_date
              ) {
                for (let i = 0; i < moment().minutes(); i++) minutes.push(i);
              }
              return minutes;
            }}
          />

          <Button
            type="primary"
            className="btn-primary"
            onClick={appointmentBookingHandler}
          >
            Go to Payment
          </Button>
        </Form>
      </div>
    </>
  );
};
export default Appointments;
