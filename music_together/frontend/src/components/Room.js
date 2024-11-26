//import { response } from "express";
import React from "react";
import { useParams } from "react-router-dom";

const Room = () => {
    const { roomCode } = useParams();
    const [votesToSkip] = React.useState(2);
    const [guestCanPause] = React.useState(false);
    const [isHost] = React.useState(false);

    const getRoomDetails = () => {
        fetch("/api/get-room" + "?code=" + roomCode).then((response) => 
            response.json()
        ).then((data) => {
            this.setState({
                votesToSkip: data.votes_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost: data.is_host,
            })
        });
    }

    return (
        <div>
            <h3>{roomCode}</h3>
            <p>Votes: {votesToSkip}</p>
            <p>Guest can{guestCanPause ? "" : "'t"} Pause</p>
            <p>Host is {isHost ? "" : "not "}me</p>
        </div>
    );
};

export default Room;
