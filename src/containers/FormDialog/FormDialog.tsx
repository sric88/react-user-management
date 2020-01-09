import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import { FormLabel, Checkbox, MenuItem } from '@material-ui/core';
// import Select from '@material-ui/core/Select';
// import InputLabel from '@material-ui/core/InputLabel';

import '../../assets/Layout.scss';

interface FormProps {
    children?: React.ReactNode;
    onAddUser: Function
}

const FormDialog: React.FC<FormProps> = (props) => {
    const [open, setOpen] = React.useState(false);

    const [enteredFN, setenteredFN] = React.useState('');
    const [enteredLN, setenteredLN] = React.useState('');
    const [enteredEmail, setenteredEmail] = React.useState('');
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());
    // const [enteredGender, setenteredGender] = React.useState('male');
    // const [enteredAge, setenteredAge] = React.useState('');

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setValue((event.target as HTMLInputElement).value);
    // };

    // const selectHandleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    //     setAge(event.target.value as string);
    // };

    const submitHandler = () => {
        setOpen(false);
        props.onAddUser(
            {
                firstname: enteredFN,
                lastname: enteredLN,
                email: enteredEmail,
                id: Math.floor(Math.random() * 10000).toString(),
                dob: selectedDate
            });
    };

    return (
        <div>
            <Button className="add-user-btn" variant="outlined" color="primary" onClick={handleClickOpen}>
                Add User
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add User</DialogTitle>

                <DialogContent>
                    <form>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="firstname"
                            label="First Name"
                            type="text"
                            fullWidth
                            value={enteredFN}
                            onChange={event => {
                                setenteredFN(event.target.value);
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="lastname"
                            label="Last Name"
                            type="text"
                            fullWidth
                            value={enteredLN}
                            onChange={event => {
                                setenteredLN(event.target.value);
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="email"
                            label="Email"
                            type="email"
                            fullWidth
                            value={enteredEmail}
                            onChange={event => {
                                setenteredEmail(event.target.value);
                            }}
                        />

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="dob"
                                label="Date picker inline"
                                value={selectedDate}
                                onChange={handleDateChange}
                            />
                        </MuiPickersUtilsProvider>

                        {/* <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>

                        <FormControlLabel
                            value="true"
                            control={<Checkbox color="primary" />}
                            label="Is Admin"
                            labelPlacement="end"
                        />

                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            onChange={selectHandleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select> */}

                        <DialogActions>
                            <Button onClick={handleClose} color="primary">Cancel</Button>
                            <Button onClick={submitHandler} color="primary">Save and Close</Button>
                        </DialogActions>
                    </form>

                </DialogContent>
            </Dialog>
        </div>
    );
}

export default FormDialog;