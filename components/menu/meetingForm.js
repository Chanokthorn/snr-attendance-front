import React from "react";
import { API_credential } from "../../utils/API";

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

class MeetingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      committees: [],
      new_m_title: "",
      new_m_committee: "",
      new_m_starttime: "",
      new_m_endtime: ""
    };
  }

  componentDidMount = async () => {
    const data = (await API_credential.get("/committee")).data;
    this.setState({ committees: data });
  };

  handleTitleChange = e => {
    this.setState({ new_m_title: e.target.value });
  };

  handleCommitteeChange = e => {
    this.setState({ new_m_title: e.target.value });
  };

  handleStartTimeChange = e => {
    this.setState({ new_m_starttime: e.target.value });
  };

  handleEndTimeChange = e => {
    this.setState({ new_m_endtime: e.target.value });
  };

  render() {
    const {
      committees,
      new_m_title,
      new_m_committee,
      new_m_starttime,
      new_m_endtime
    } = this.state;
    const { open, handleClose, classes } = this.props;
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="lg"
        >
          <DialogTitle id="form-dialog-title">Create Meeting</DialogTitle>
          <DialogContent>
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
                <InputLabel htmlFor="age-simple">Title</InputLabel>
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
                    const { c_id, p_firstname, p_lastname } = committee;
                    return (
                      <MenuItem value={c_id} key={"committee-" + c_id + idx}>
                        {p_firstname} {p_lastname}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl>
                <TextField
                  id="starttime"
                  label="Start time"
                  type="datetime-local"
                  // defaultValue="2017-05-24T10:30"
                  value={new_m_starttime}
                  className={classes.datePicker}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={this.handleStartTimeChange}
                />
              </FormControl>
              <FormControl>
                <TextField
                  id="endtime"
                  label="End time"
                  type="datetime-local"
                  // defaultValue="2017-05-24T10:30"
                  value={new_m_endtime}
                  className={classes.datePicker}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={this.handleEndTimeChange}
                />
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

MeetingForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MeetingForm);
