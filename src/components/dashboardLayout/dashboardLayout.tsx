import styled from "styled-components/macro";
import tw from "tailwind.macro";

const DashboardLayout = styled.div`
  ${tw`bg-grey-light w-full`};

  display: grid;
  grid-template-columns: 200px 1fr;
  height: 100vh;
  overflow: hidden;
  margin-top: -80px;
  padding-top: 80px;
`;

export default DashboardLayout;
