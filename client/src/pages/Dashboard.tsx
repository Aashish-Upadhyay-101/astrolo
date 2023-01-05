import React, { useEffect } from "react";
import "./Dashboard.css";
import Navbar from "../Components/Navbar";
import { Badge, Table } from "antd";
import { useGetAppointmentsQuery } from "../api/astroloApi";

const columns = [
  {
    title: "Astrologer's name",
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
  let { data, isError, error } = useGetAppointmentsQuery();

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
  }, [isError, error]);

  const returnStatusColor = (status: string): string => {
    if (status == "pending") {
      return "#F29339";
    } else if (status == "approved") {
      return "#077E8C";
    } else {
      return "#d80000";
    }
  };

  const source = data?.map((item, index) => {
    return {
      key: index,
      name: item.astrologer.username,
      start_date: new Date(item.start_date).toDateString().slice(4),
      start_time: item.start_time,
      location: item.location,
      status: (
        <Badge
          style={{ fontWeight: "600" }}
          color={`${returnStatusColor(item.status)}`}
          count={`${item.status}`}
        />
      ),
    };
  });

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <h1 className="dashboard__h1 text-2">Dashboard</h1>
        <div className="table">
          <h2 className="table__header text-1">Appointments</h2>
          <Table dataSource={source} columns={columns} />;
        </div>
      </div>
    </>
  );
};

export default Dashboard;
