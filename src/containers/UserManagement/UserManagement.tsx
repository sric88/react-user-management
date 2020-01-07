import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { IState, IUserList } from '../../interface/interface';
import * as actionTypes from '../../actions'

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

const UserManagement: React.FC = (props: any) => {
    const { LoadUserData } = props
    useEffect(() => {
        LoadUserData();
    }, [LoadUserData]);

    const classes = useStyles();

    return (
        <React.Fragment>
            <Button variant="outlined" color="primary">Add Users</Button>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>First Name</StyledTableCell>
                            <StyledTableCell>Last Name</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>DOB</StyledTableCell>
                            <StyledTableCell>Gender</StyledTableCell>
                            <StyledTableCell>Is Admin</StyledTableCell>
                            <StyledTableCell>Business Unit</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(props.users || []).map((user: IUserList) => (
                            <StyledTableRow key={user.id}>
                                <StyledTableCell component="th" scope="user">
                                    {user.firstname}
                                </StyledTableCell>
                                <StyledTableCell>{user.lastname}</StyledTableCell>
                                <StyledTableCell>{user.email}</StyledTableCell>
                                <StyledTableCell>{user.DOB}</StyledTableCell>
                                <StyledTableCell>{user.gender}</StyledTableCell>
                                <StyledTableCell>{user.isadmin}</StyledTableCell>
                                <StyledTableCell>{user.businessunit}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}

const mapStateToProps = (state: IState) => {
    console.log(state);
    return {
        users: state.users
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        LoadUserData: () => dispatch({ type: actionTypes.GET_USERLIST })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);