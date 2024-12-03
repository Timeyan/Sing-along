import React, { useEffect } from "react";
import { Button, Grid2, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const Room = ({ leaveRoomCallback }) => {
    const { roomCode } = useParams();
    const [votesToSkip, setVotesToSkip] = React.useState(2);
    const [guestCanPause, setGuestCanPause] = React.useState(false);
    const [isHost, setIsHost] = React.useState(false);
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
        console.log(response);
        const data = await response.json();
        setGuestCanPause(data.guest_can_pause);
        setVotesToSkip(data.votes_to_skip);
        setIsHost(data.is_host);
    }

    const leaveButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        };
        console.log(`from useEffect HomePage:`, data);
        fetch("/api/leave-room", requestOptions).then((_response) => {
            leaveRoomCallback;
            navigate("/");
        });
    }

    return (
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
