import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MuiPhoneNumber from 'material-ui-phone-number'
import { MenuItem, Button, Fab } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight'


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
});

const gender = [
    {
        value: 'Male',
        label: 'male',
    },
    {
        value: 'Female',
        label: 'female',
    },
];

class UserDetails extends React.Component {

    constructor(props) {
        super(props);
        this.handleOnchange = this.handleOnchange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    state = {
        name: '',
        email: '',
        dob: '',
        phone: '',
        gender: '',
        id:'',
        pin:'', 
        submit: false
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleOnchange(value) {
        this.setState({
            phone: value
        })
    }

    componentDidMount(){
        this.unPackUserPhone()
    }

    unPackUserPhone(){
        var person = this.props.person;
        console.log("From the details tab")
        this.setState({
            name: person.name,
            email: person.email,
            dob: person.dob,
            phone: person.phone,
            gender: person.gender,
            id: person.id,
            pin: person.pin,
        })
    }

    handleSubmit() {
        this.setState(
            { submit: true }
        )
        var person = {
            name: this.state.name,
            email: this.state.email,
            dob: this.state.dob,
            phone: this.state.phone,
            gender: this.state.gender,
            id: this.state.id,
            pin: this.state.pin,
        }

        this.props.userDetails(person)
    }

    render() {

        return (
            <form noValidate autoComplete="off">
                <TextField
                    error={this.state.name === '' && this.state.submit}
                    id="outlined-name"
                    label="Full Names"
                    fullWidth
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                    margin="normal"
                    variant="outlined"
                />

                <br />

                <TextField
                    error={this.state.email === '' && this.state.submit}
                    id="outlined-email"
                    label="Email"
                    type="Email"
                    fullWidth
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                    margin="normal"
                    variant="outlined"
                />

                <br />

                <TextField
                    error={this.state.dob === '' && this.state.submit}
                    id="outlined-full-width"
                    label="Date of Birth"
                    type="date"
                    placeholder="Placeholder"
                    fullWidth
                    margin="normal"
                    value={this.state.dob}
                    variant="outlined"
                    onChange={this.handleChange('dob')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <br />
                <br />

                <MuiPhoneNumber
                    error={this.state.phone === '' && this.state.submit}
                    id="outlined-email"
                    label="Phone Number"
                    fullWidth
                    value={this.state.phone}
                    onChange={this.handleOnchange}
                    defaultCountry={'ke'}
                    margin="normal"
                    variant="outlined"
                />

                <TextField
                    error={this.state.gender === '' && this.state.submit}
                    id="filled-select-gender"
                    select
                    fullWidth
                    label="Gender"
                    value={this.state.gender}
                    onChange={this.handleChange('gender')}
                    helperText="Please select your gender"
                    margin="normal"
                    variant="filled"
                    InputLabelProps={{
                        shrink: true,
                    }}
                >
                    {gender.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    error={this.state.id === '' && this.state.submit}
                    id="outlined-full-width"
                    label="I.D No."
                    type="integer"
                    fullWidth
                    margin="normal"
                    value={this.state.id}
                    variant="outlined"
                    onChange={this.handleChange('id')}

                />

                <br />

                <TextField
                    id="outlined-full-width"
                    label="KRA PIN"
                    type="integer"
                    fullWidth
                    value={this.state.pin}
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleChange('pin')}
                />

                <br />
                <div style={{ position: "absolute", bottom: 0, right: 0, padding: 30 }}>
                    <Button onClick={this.handleSubmit}  >
                        <Fab variant="extended" aria-label="Delete">
                            <ChevronRightIcon />
                            Next
                    </Fab>
                    </Button>
                </div>
            </form>
        );
    }
}

UserDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserDetails);