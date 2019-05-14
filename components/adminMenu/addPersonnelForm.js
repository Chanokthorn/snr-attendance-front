import React from "react";
import { API_credential } from "../../utils/API";
import { toDatetimeLocal } from "../../utils/helper";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { withStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";

const styles = theme => ({
  root: {
    width: "50vw",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column"
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

class AddPersonnelForm extends React.Component {
  constructor(props) {
    super(props);
    const date = new Date();
    const date_placeholder = toDatetimeLocal(date);
    this.state = {
      committees: [],
      p_title: "",
      p_firstname: "",
      p_lastname: "",
      p_phone: "",
      p_email: "",
      p_note: ""
    };
  }

  handleTitleChange = e => {
    this.setState({ p_title: e.target.value });
  };
  handleFirstNameChange = e => {
    this.setState({ p_firstname: e.target.value });
  };
  handleLastNameChange = e => {
    this.setState({ p_lastname: e.target.value });
  };
  handlePhoneChange = e => {
    this.setState({ p_phone: e.target.value });
  };
  handleEmailChange = e => {
    this.setState({ p_email: e.target.value });
  };
  handleNoteChange = e => {
    this.setState({ p_note: e.target.value });
  };

  handleClose = async () => {
    const { onClose } = this.props;
    const {
      p_title,
      p_firstname,
      p_lastname,
      p_phone,
      p_email,
      p_note
    } = this.state;
    var bodyFormData = new FormData();
    bodyFormData.set("p_title", p_title);
    bodyFormData.append("p_firstname", p_firstname);
    bodyFormData.append("p_lastname", p_lastname);
    bodyFormData.append("p_phone", p_phone);
    bodyFormData.append("p_email", p_email);
    bodyFormData.append("p_note", p_note);
    const data = (await API_credential.post("/personnel", bodyFormData)).data;
    if (data != "failure") {
      this.setState({
        p_title: "",
        p_firstname: "",
        p_lastname: "",
        p_phone: "",
        p_email: "",
        p_note: ""
      });
      onClose(data);
    }
    onClose();
  };

  renderTextField = (value, label, onChange) => {
    const { classes } = this.props;
    return (
      <FormControl className={classes.formControl}>
        <TextField
          value={value}
          autoFocus
          label={label}
          margin="dense"
          id="name"
          fullWidth
          onChange={onChange}
          key="text-feild-label"
        />
      </FormControl>
    );
  };

  render() {
    const {
      p_title,
      p_firstname,
      p_lastname,
      p_phone,
      p_email,
      p_note
    } = this.state;
    const { open, classes, onClose } = this.props;
    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
      >
        <DialogTitle id="form-dialog-title">Add new personnel</DialogTitle>
        <DialogContent>
          <form className={classes.root} autoComplete="off">
            {this.renderTextField(p_title, "Title", this.handleTitleChange)}
            {this.renderTextField(
              p_firstname,
              "First name",
              this.handleFirstNameChange
            )}
            {this.renderTextField(
              p_lastname,
              "Last name",
              this.handleLastNameChange
            )}
            {this.renderTextField(p_phone, "Phone", this.handlePhoneChange)}
            {this.renderTextField(p_email, "Email", this.handleEmailChange)}
            {this.renderTextField(p_note, "Note", this.handleNoteChange)}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

AddPersonnelForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddPersonnelForm);
