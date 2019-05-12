import styled from "styled-components";
import { API_credential } from "../../utils/API";

const AdminPersonMenuGrid = styled.div`
  width: 70vh;
  height: 70vh;
  display: grid;
  grid-template-rows: 1fr 5fr;
  grid-template-areas:
    "new-personnel"
    "personnel-list";
`;

const PersonnelListWrapper = styled.div`
  background-color: red;
  grid-area: personnel-list;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
