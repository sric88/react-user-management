import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FormLabel } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Switch from '@material-ui/core/Switch';
import MenuItem from '@material-ui/core/MenuItem';


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
    const [enteredGender, setenteredGender] = React.useState('male');
    const [selectedIsAdmin, setselectedIsAdmin] = React.useState({ checkedA: true });

    const [selectedbusinessunit, setselectedbusinessunit] = React.useState('IT Admin');

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setenteredGender((event.target as HTMLInputElement).value);
    };

    const handleIsAdminChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setselectedIsAdmin({ ...selectedIsAdmin, [name]: event.target.checked });
    };

    const selectBusinessChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setselectedbusinessunit(event.target.value as string);
    };

    const submitHandler = () => {
        setOpen(false);
        props.onAddUser(
            {
                firstname: enteredFN,
                lastname: enteredLN,
                email: enteredEmail,
                id: Math.floor(Math.random() * 10000).toString(),
                dob: selectedDate,
                gender: enteredGender,
                isAdmin: selectedIsAdmin.checkedA,
                businessunit: selectedbusinessunit
            });
    };

    return (
        <div>
            <Button className="add-user-btn" variant="outlined" color="primary" onClick={handleClickOpen}>
                Add User
            </Button>
            <Dialog maxWidth="lg" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" className="form-dialog-title">Add User</DialogTitle>
                <DialogContent>
                    <form>
                        <div className="form-control">
                            <TextField
                                fullWidth
                                autoFocus
                                id="firstname"
                                label="First Name"
                                type="text"
                                value={enteredFN}
                                onChange={event => {
                                    setenteredFN(event.target.value);
                                }}
                            />

                        </div>
                        <div className="form-control">
                            <TextField
                                fullWidth
                                id="lastname"
                                label="Last Name"
                                type="text"
                                value={enteredLN}
                                onChange={event => {
                                    setenteredLN(event.target.value);
                                }}
                            />

                        </div>
                        <div className="form-control">
                            <TextField
                                fullWidth
                                id="email"
                                label="Email"
                                type="email"
                                value={enteredEmail}
                                onChange={event => {
                                    setenteredEmail(event.target.value);
                                }}
                            />
                        </div>

                        <div className="form-control">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    fullWidth
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    id="dob"
                                    label="Date picker inline"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                        <div className="form-control">
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup aria-label="gender" name="gender" id="gender" value={enteredGender} onChange={handleChange}>
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </div>

                        <div className="form-control">
                            <FormLabel component="legend">Is Admin</FormLabel>
                            <Switch
                                checked={selectedIsAdmin.checkedA}
                                onChange={handleIsAdminChange('checkedA')}
                                value="selectedIsAdmin.checkedA"
                                id="isAdmin"
                            />
                        </div>

                        <div className="form-control">
                            <InputLabel id="demo-simple-select-label">Select Business Unit</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                fullWidth
                                id="businessunit"
                                value={selectedbusinessunit}
                                onChange={selectBusinessChange}
                            >
                                <MenuItem value={"IT Admin"}>IT Admin</MenuItem>
                                <MenuItem value={"Finance"}>Finance</MenuItem>
                                <MenuItem value={"Development"}>Development</MenuItem>
                            </Select>
                        </div>

                        <div className="button-wrap">
                            <DialogActions>
                                <Button variant="contained" onClick={handleClose}>Cancel</Button>
                                <Button variant="contained" onClick={submitHandler} color="primary">Save and close</Button>
                            </DialogActions>
                        </div>

                    </form>

                </DialogContent>
            </Dialog>
        </div>
    );
}

export default FormDialog;