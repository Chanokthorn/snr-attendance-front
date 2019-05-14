import React from "react";
import { API_credential } from "../../utils/API";
import { toDatetimeLocal } from "../../utils/helper";
import styled from "styled-components";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { withStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  datePicker: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

const MeetingFormWrapper = styled.div`
  width: 50vw;
  height: 30vh;
`;

class MeetingForm extends React.Component {
  constructor(props) {
    super(props);
    const date = new Date();
    const date_placeholder = toDatetimeLocal(date);
    this.state = {
      committees: [],
      new_m_title: "",
      new_m_committee: "",
      new_m_start_schedule: date_placeholder,
      new_m_end_schedule: date_placeholder
    };
  }

  createMeeting = async () => {
    const {
      new_m_title,
      new_m_committee,
      new_m_start_schedule,
      new_m_end_schedule
    } = this.state;
    const { getMeeting, handleClose } = this.props;
    var bodyFormData = new FormData();
    bodyFormData.set("c_id", new_m_committee);
    bodyFormData.append("m_start_schedule", new_m_start_schedule);
    bodyFormData.append("m_end_schedule", new_m_end_schedule);
    const result = (await API_credential.put(
      "/meeting/" + new_m_title,
      bodyFormData
    )).data;
    if (result == "success") {
      getMeeting();
      handleClose();
    } else {
      console.log("fail");
    }
  };

  componentDidMount = async () => {
    const data = (await API_credential.get("/committee")).data;
    this.setState({ committees: data });
  };

  handleTitleChange = e => {
    this.setState({ new_m_title: e.target.value });
  };

  handleCommitteeChange = e => {
    this.setState({ new_m_committee: e.target.value });
  };

  handleStartTimeChange = e => {
    this.setState({ new_m_start_schedule: e.target.value });
  };

  handleEndTimeChange = e => {
    this.setState({ new_m_end_schedule: e.target.value });
  };

  render() {
    const {
      committees,
      new_m_title,
      new_m_committee,
      new_m_start_schedule,
      new_m_end_schedule
    } = this.state;
    const { open, handleClose, classes } = this.props;
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
      >
        <DialogTitle id="form-dialog-title">Create Meeting</DialogTitle>
        <DialogContent>
          <MeetingFormWrapper>
            <form className={classes.root} autoComplete="off">
              <FormControl className={classes.formControl}>
                <TextField
                  value={new_m_title}
                  autoFocus
                  label="Title"
                  margin="dense"
                  id="name"
                  type="email"
                  fullWidth
                  onChange={this.handleTitleChange}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-simple">Committee</InputLabel>
                <Select
                  value={new_m_committee}
                  onChange={this.handleCommitteeChange}
                  inputProps={{
                    name: "age",
                    id: "age-simple"
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {committees.map((committee, idx) => {
                    const { c_id, c_title } = committee;
                    return (
                      <MenuItem value={c_id} key={"committee-item-" + c_id}>
                        {c_title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <div>
                <FormControl>
                  <TextField
                    id="start_schedule"
                    label="Start time"
                    type="datetime-local"
                    // defaultValue="2017-05-24T10:30"
                    value={new_m_start_schedule}
                    className={classes.datePicker}
                    onChange={this.handleStartTimeChange}
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    id="end_schedule"
                    label="End time"
                    type="datetime-local"
                    // defaultValue="2017-05-24T10:30"
                    value={new_m_end_schedule}
                    className={classes.datePicker}
                    onChange={this.handleEndTimeChange}
                  />
                </FormControl>
              </div>
            </form>
          </MeetingFormWrapper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.createMeeting} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

MeetingForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MeetingForm);
