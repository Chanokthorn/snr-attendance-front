import styled from "styled-components";
import { API_credential } from "../../utils/API";
import PersonnelList from "../personnelList";

import AddImageDialog from "./addImageDialog";

const AdminPersonMenuGrid = styled.div`
  width: inherit;
  height: inherit;
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

const NewPersonnel = styled.div`
  background-color: purple;
  grid-area: new-personnel;
  margin: 1vh;
`;

class AdminPersonMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personnels: [],
      meeting_item_modal_open: false,
      new_image_open: false,
      personnel_to_add_image: null,
      add_image_dialog_open: false
    };
  }

  componentDidMount() {
    this.getPersonnels();
  }

  getPersonnels = async () => {
    const data = (await API_credential.get("/personnel")).data;
    this.setState({ personnels: data });
  };

  onAddImage = personnel => {
    this.setState({
      personnel_to_add_image: personnel,
      add_image_dialog_open: true
    });
  };

  onAddImageDialogClose = () => {
    this.setState({ add_image_dialog_open: false });
    this.getPersonnels();
  };

  render() {
    const {
      personnels,
      add_image_dialog_open,
      personnel_to_add_image
    } = this.state;
    return (
      <AdminPersonMenuGrid className="incoming-menu">
        <NewPersonnel className="new-meeting" />
        <PersonnelListWrapper>
          <PersonnelList
            personnels={personnels}
            addImage={true}
            onAddImage={this.onAddImage}
          />
        </PersonnelListWrapper>
        <AddImageDialog
          open={add_image_dialog_open}
          personnel={personnel_to_add_image}
          onClose={this.onAddImageDialogClose}
        />
        {/* <MeetingForm
          open={new_m_modal_open}
          handleClose={this.onNewMeetingClosed}
          getMeeting={this.getMeeting}
        /> */}
      </AdminPersonMenuGrid>
    );
  }
}

export default AdminPersonMenu;
