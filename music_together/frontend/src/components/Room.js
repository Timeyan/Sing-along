import React, { useEffect } from "react";
import { Button, Grid2, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";

const Room = ({ leaveRoomCallback }) => {
    const { roomCode } = useParams();
    const [votesToSkip, setVotesToSkip] = React.useState(2);
    const [guestCanPause, setGuestCanPause] = React.useState(false);
    const [isHost, setIsHost] = React.useState(false);
    const [showSettings, setShowSettings] = React.useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getRoomDetails();
    }, []);
    const getRoomDetails = async () => {
        const response = await fetch(`/api/get-room?code=${roomCode}`);
        if (!response.ok) {
            leaveRoomCallback;
            navigate("/");
            return;
        }
        const data = await response.json();
        setGuestCanPause(data.guest_can_pause);
        setVotesToSkip(data.votes_to_skip);
        setIsHost(data.is_host);
    }

    const updateShowSettings = (value) => {
        setShowSettings(value);
    }

    const renderSettings = () => {
        return (
            <Grid2 container spacing={1}>
                <Grid2 size={{xs:12}} align="center">
                    <CreateRoomPage 
                        Update={true} 
                        VotesToSkip={votesToSkip} 
                        GuestCanPause={guestCanPause} 
                        RoomCode={roomCode}
                        UpdateCallback={() => {}}
                    />
                </Grid2>
                <Grid2 size={{xs:12}} align="center">
                    <Button 
                        variant="contained"
                        color="secondary"
                        onClick={() => updateShowSettings(false)}
                    >
                        Close
                    </Button>
                </Grid2>
            </Grid2>
        );
    }

    const renderSettingsButton = () => {
        return (
            <Grid2 size={{xs: 12}} align="center">
                <Button 
                    variant="contained"
                    color="primary"
                    onClick={() => updateShowSettings(true)}
                >
                    Settings
                </Button>
            </Grid2>
        );
    }

    const leaveButtonPressed = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        };

        try {
            const response = await fetch("/api/leave-room", requestOptions);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            leaveRoomCallback();
            navigate("/");
        } catch (error) {
            console.error('Error leaving room:', error);
        }
    }

    return showSettings ? renderSettings() : (
        <Grid2 container spacing={1}>
        <Grid2 size={{xs:12}} align="center">
          <Typography variant="h4" compact="h4" component={'span'}>
            Code: {roomCode}
          </Typography>
        </Grid2>
        <Grid2 size={{xs:12}} align="center">
          <Typography variant="h6" compact="h6" component={'span'}>
            Votes: {votesToSkip}
          </Typography>
        </Grid2>
        <Grid2 size={{xs:12}} align="center">
          <Typography variant="h6" compact="h6" component={'span'}>
            Guest Can Pause: {guestCanPause.toString()}
          </Typography>
        </Grid2>
        <Grid2 size={{xs:12}} align="center">
          <Typography variant="h6" compact="h6" component={'span'}>
            Host: {isHost.toString()}
          </Typography>
        </Grid2>
        {isHost ? renderSettingsButton() : null}
        <Grid2 size={{xs:12}} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={leaveButtonPressed}
          >
            Leave Room
          </Button>
        </Grid2>
      </Grid2>
    );
};

export default Room;
