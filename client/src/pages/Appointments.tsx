import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import {
  Button,
  DatePicker,
  DatePickerProps,
  Input,
  TimePicker,
  TimePickerProps,
} from "antd";
import { useGetAstrologerDetailsQuery } from "../api/userApi";
import { useCreateAppointmentMutation } from "../api/astroloApi";
import "./Appointments.css";
import Navbar from "../Components/Navbar";
import "../index.css";
import moment, { min } from "moment";

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

  useEffect(() => {
    if (appointmentIsError) {
      navigate("/page-not-found");
    }
  }, [appointmentIsError]);

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

  const appointmentBookingHandler = () => {
    const finalDetail = {
      ...appointmentDetail,
      astrologer_username: username || "",
    };

    CreateAppointment(finalDetail);

    if (CreateAppointmentIsError) {
      console.log(CreateAppointmentError);
    }
    if (CreateAppointmentIsSuccess) {
      navigate("/dashboard");
    }
  };

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
            onChange={onDateFieldChange}
            disabledDate={(current) => {
              let customDate = moment().format("YYYY-MM-DD");
              console.log(moment(customDate, "YYYY-MM-DD"));
              return current && current < moment(customDate, "YYYY-MM-DD");
            }}
          />
          <TimePicker
            placeholder="Expected time"
            onChange={onTimeFieldChange}
            defaultValue={dayjs("00:00:00", "HH:mm:ss")}
            hideDisabledOptions={true}
            showNow={false}
            showSecond={false}
            disabledHours={() => {
              const hours = [];
              for (let i = 0; i < moment().hour(); i += 1) hours.push(i);
              return hours;
            }}
            disabledMinutes={() => {
              const minutes = [];
              for (let i = 0; i < moment().minutes(); i++) {
                minutes.push(i);
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
        </div>
      </div>
    </>
  );
};

export default Appointments;
