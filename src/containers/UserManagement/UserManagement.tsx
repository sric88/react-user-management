import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { IState, IUser } from '../../interface/interface';
import * as actionTypes from '../../actions'
import FormDialog from '../FormDialog/FormDialog';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.background.default,
            },
        },
    }),
)(TableRow);


const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});


interface UserManagementProps {
    children?: React.ReactNode;
    LoadUserData: Function;
    addUserData: Function;
    deleteUserData: Function;
    users: Array<IUser>;
}

const UserManagement: React.FC<UserManagementProps> = (props) => {

    const { LoadUserData } = props;
    useEffect(() => {
        LoadUserData();
    }, [LoadUserData]);

    const classes = useStyles();

    const addUserHandler = (user: IUser) => {
        props.addUserData(user);
    }

    const onEditUser = (user: IUser) => {
        console.log(user);
    }

    const onDeleteUser = (user: IUser) => {
        props.deleteUserData(user);
    }

    return (
        <React.Fragment>
            <FormDialog onAddUser={addUserHandler}></FormDialog>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell><div>First Name</div></StyledTableCell>
                            <StyledTableCell><div>Last Name</div></StyledTableCell>
                            <StyledTableCell><div>Email</div></StyledTableCell>
                            <StyledTableCell><div>DOB</div></StyledTableCell>
                            <StyledTableCell><div>Gender</div></StyledTableCell>
                            <StyledTableCell><div>Is Admin</div></StyledTableCell>
                            <StyledTableCell><div>Business Unit</div></StyledTableCell>
                            <StyledTableCell><div>Actions</div></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(props.users || []).map((user: IUser) => (
                            <StyledTableRow key={user.id}>
                                <StyledTableCell component="th" scope="user">
                                    <div>{user.firstname}</div>
                                </StyledTableCell>
                                <StyledTableCell><div>{user.lastname}</div></StyledTableCell>
                                <StyledTableCell><div>{user.email}</div></StyledTableCell>
                                <StyledTableCell><div>{user.formattedDate}</div></StyledTableCell>
                                <StyledTableCell><div>{user.gender}</div></StyledTableCell>
                                <StyledTableCell><div>{user.isadmin ? "true" : "false"}</div></StyledTableCell>
                                <StyledTableCell><div>{user.businessunit}</div></StyledTableCell>
                                <StyledTableCell>
                                    <div className="action">
                                        <span onClick={() => onEditUser(user)}><EditIcon fontSize="small" /></span>
                                        <span onClick={() => onDeleteUser(user)}><DeleteIcon fontSize="small" /></span>
                                    </div>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}

const mapStateToProps = (state: IState) => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        LoadUserData: () => dispatch({ type: actionTypes.GET_USERLIST }),
        addUserData: (userInfo: IUser) => dispatch({ type: actionTypes.POST_USERLIST, payload: userInfo }),
        deleteUserData: (userInfo: IUser) => dispatch({ type: actionTypes.DELETE_USERLIST, payload: userInfo })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);