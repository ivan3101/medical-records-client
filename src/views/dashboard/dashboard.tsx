import React from "react";
import patientsIcon from "../../assets/icons/patients.svg";
import DashboardLayout from "../../components/dashboardLayout/dashboardLayout";
import Sidebar from "../../components/sidebar/sidebar";
import SidebarItem from "../../components/sidebar/sidebarItem/sidebarItem";
import Icon from "../../components/sidebar/sidebarItem/sidebarLink/icon/icon";

const Dashboard = () => {
  return (
    <React.Fragment>
      <Sidebar>
        <SidebarItem to={"/"}>
          <Icon src={patientsIcon} />
          Paciente
        </SidebarItem>
      </Sidebar>

      <DashboardLayout>hello world</DashboardLayout>
    </React.Fragment>
  );
};

export default Dashboard;
