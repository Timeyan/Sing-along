import React, { Component } from "react";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { Link } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from '@mui/material/FormControlLabel';
//import { response } from "express";



export default class CreateRoomPage extends Component {

    defaultVotes = 2;

    constructor(props) {
        super(props);
        this.state = {
            guestCanPause: true,
            votesToSkip: this.defaultVotes,
        };

        this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
        this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
        this.handleVotesChange = this.handleVotesChange.bind(this)
    }

    handleVotesChange(e) {
        this.setState({
            votesToSkip: e.target.value,
        });
    }

    handleGuestCanPauseChange(e) {
        this.setState({
            guestCanPause: e.target.value === 'true' ? true : false,
        });
    }

    handleRoomButtonPressed() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause,

            })
        };
        fetch('api/create-room', requestOptions).then((response) => 
            response.json()
        ).then((data) => console.log(data));
    }

    render() {
        return (
            <Grid2 container spacing={4}>
                <Grid2 size={{xs: 12}} align='center'>
                    <Typography element="h4" component={'span'} variant="h4">
                        Create a room
                    </Typography>
                </Grid2>
                <Grid2 size={{xs: 12}} align='center'>
                    <FormControl component="fieldset">
                        <FormHelperText>
                            <span align="center">
                                Guest control of playback state.
                            </span>
                        </FormHelperText>
                        <RadioGroup 
                            row
                            defaultValue='true'
                            onChange={this.handleGuestCanPauseChange}
                        >
                            <FormControlLabel 
                                value='true' 
                                control={<Radio color="primary" />} 
                                label="Play/Pause"
                                labelPlacement="bottom"
                            />
                            <FormControlLabel 
                                value='false' 
                                control={<Radio color="secondary" />} 
                                label="No control"
                                labelPlacement="bottom"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid2>
                <Grid2 size={{xs: 12}} align='center'>
                    <FormControl>
                        <TextField 
                            required={true} 
                            type="number"
                            onChange={this.handleVotesChange} 
                            defaultValue={this.defaultVotes}
                            slotProps={{
                                htmlInput: {
                                    min: 1,
                                    style: {
                                        textAlign: "center"
                                    }
                                }
                            }}
                        />
                        <FormHelperText>
                            <span align="center">
                                Votes required to Skip Song
                            </span>
                        </FormHelperText>
                    </FormControl>
                </Grid2>
                <Grid2 size={{xs: 12}} align='center'>
                    <Button color="secondary" variant="contained" onClick={this.handleRoomButtonPressed}>
                        Create a room
                    </Button>
                </Grid2>
                <Grid2 size={{xs: 12}} align='center'>
                    <Button color="primary" variant="contained" to="/" component={ Link }>
                        Back
                    </Button>
                </Grid2>
            </Grid2>
        );
    }
}