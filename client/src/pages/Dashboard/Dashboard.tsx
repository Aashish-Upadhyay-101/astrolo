import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Table, message } from "antd";
import { Button, Modal, notification } from "antd";
import {
  useGetAppointmentsQuery,
  useUpdateAppointmentStatusMutation,
} from "../../api/astroloApi";
import { useGetMeQuery } from "../../api/userApi";
import Navbar from "../../components/Navbar/Navbar";
import "./Dashboard.css";

const columns = [
  {
    title: "Client's Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Start Date",
    dataIndex: "start_date",
    key: "start_date",
  },
  {
    title: "Start Time",
    dataIndex: "start_time",
    key: "start_time",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientNameOnModal, setClientNameOnModal] = useState("");
  const [status, setStatus] = useState("");
  const [messageApi, messageContextHolder] = message.useMessage();
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();

  let { data: getAppointmentData } = useGetAppointmentsQuery();
  const {
    data: getMeData,
    isError: getMeIsError,
    error: getMeError,
  } = useGetMeQuery();

  const [UpdateAppointment] = useUpdateAppointmentStatusMutation();

  useEffect(() => {
    if (getMeIsError) {
      console.log(getMeError);
    }
    if (getAppointmentData) {
      console.log(getAppointmentData);
    }
  }, [getMeIsError, getMeError, getMeData]);

  const returnStatusColor = (status: string): string => {
    if (status == "pending") {
      return "#F29339";
    } else if (status == "approved") {
      return "#077E8C";
    } else {
      return "#d80000";
    }
  };

  const source = getAppointmentData?.map((item, index) => {
    return {
      key: index,
      name:
        getMeData?.profile_type == "Astrologer"
          ? item.customer.username
          : item.astrologer.username,
      start_date: new Date(item.start_date).toDateString().slice(4),
      start_time: item.start_time,
      location: item.location,
      status: (
        <Badge
          style={{ fontWeight: "600" }}
          color={`${returnStatusColor(status || item.status)}`}
          count={`${status || item.status}`}
        />
      ),
    };
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const createConversationName = (username: string) => {
    const name = [clientNameOnModal, username].sort();
    return `${name[0]}__${name[1]}`;
  };

  const handleApproved = () => {
    setStatus("approved");
    setClientNameOnModal(clientNameOnModal);
    UpdateAppointment({
      status: "approved",
      username: clientNameOnModal,
    });
    setIsModalOpen(false);

    // notification message
    messageApi.open({
      type: "success",
      content: "Appointment booked!",
    });

    notificationApi.open({
      message: "Message",
      description: `A chat inbox is created between you and ${clientNameOnModal}`,
      placement: "bottomRight",
    });

    navigate(
      `/dashboard/chats/${createConversationName(
        getMeData?.user.username || ""
      )}`
    );
  };

  const handleDeny = () => {
    setStatus("cancelled");
    setClientNameOnModal(clientNameOnModal);
    UpdateAppointment({
      status: "cancelled",
      username: clientNameOnModal,
    });
    setIsModalOpen(false);

    // notification message
    messageApi.open({
      type: "error",
      content: "Appointment cancelled!",
    });
  };

  return (
    <>
      {messageContextHolder}
      {notificationContextHolder}
      <Navbar />
      <div className="dashboard">
        <h1 className="dashboard__h1 text-2">Dashboard</h1>
        <div className="table">
          <h2 className="table__header text-1">Appointments</h2>
          <Table
            dataSource={source}
            columns={columns}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  showModal();
                  setClientNameOnModal(record.name);
                },
              };
            }}
          />
        </div>
      </div>

      {getMeData?.profile_type == "Astrologer" && (
        <Modal
          title="Appointment Detail"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={[
            <Button className="btn-normal" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button className="btn-success" onClick={handleApproved}>
              Approved
            </Button>,
            <Button className="btn-danger" onClick={handleDeny}>
              Deny
            </Button>,
          ]}
        >
          <p>Appointment with {clientNameOnModal}. Would like to accept?</p>
        </Modal>
      )}
    </>
  );
};

export default Dashboard;
