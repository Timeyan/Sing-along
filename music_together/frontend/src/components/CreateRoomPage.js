import React, { useState } from "react";
import { 
    TextField, 
    Button, 
    Grid2, 
    Typography, 
    FormHelperText, 
    FormControl, 
    Radio, 
    RadioGroup, 
    FormControlLabel
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";


const CreateRoomPage = ({ 
    Update,
    RoomCode,
    UpdateCallback,
    VotesToSkip=2,
    GuestCanPause=true
}) => {
    const defaultVotes = 2;
    const [guestCanPause, setGuestCanPause] = useState(GuestCanPause);
    const [votesToSkip, setVotesToSkip] = useState(VotesToSkip);
    const navigate = useNavigate();
    console.log(VotesToSkip, votesToSkip);

    const handleVotesChange = (e) => {
        setVotesToSkip(e.target.value);
    }

    const handleGuestCanPauseChange = (e) => {
        setGuestCanPause(e.target.value === 'true' ? true : false);
    }

    const handleRoomButtonPressed = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause,

            })
        };
        fetch('api/create-room', requestOptions).then((response) => 
            response.json()
        ).then((data) => navigate(`/room/${data.code}`));
    }

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
                        defaultValue={GuestCanPause}
                        onChange={handleGuestCanPauseChange}
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
                        onChange={handleVotesChange} 
                        defaultValue={VotesToSkip}
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
                <Button color="secondary" variant="contained" onClick={handleRoomButtonPressed}>
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

export default CreateRoomPage;