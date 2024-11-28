import React, { useState } from "react";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";

const RoomJoinPage = () => {
    const [roomCode, setRoomCode] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const _handleTextFieldhange = (e) => {
        setRoomCode(e.target.value);
        setError("");
    }

    const _roomButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                code: roomCode
            })
        };
        fetch("/api/join-room", requestOptions).then((response) => {
            if (response.ok) {
                navigate(`/room/${roomCode}`);
            } else {
                setError("Room not Found");
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <Grid2 container spacing={1}>
            <Grid2 size={{xs: 12}} align="center">
                <Typography variant="h4" component={"span"} element="h4">
                    Join a Room
                </Typography>
            </Grid2>
            <Grid2 size={{xs: 12}} align="center">
                <TextField
                    error={Boolean(error)}
                    label="Code"
                    placeholder="Enter a Room Code"
                    value={roomCode}
                    helperText={error}
                    variant="outlined"
                    onChange={_handleTextFieldhange}
                />
            </Grid2>
            <Grid2 size={{xs: 12}} align="center">
            </Grid2>
            <Grid2 size={{xs: 12}} align="center">
                <Button variant="contained" color="primary" onClick={_roomButtonPressed}>
                    Enter Room
                </Button>
            </Grid2>
            <Grid2 size={{xs: 12}} align="center">
                <Button variant="contained" color="secondary" to="/" component={Link}>
                    Back
                </Button>
            </Grid2>
        </Grid2>
    );

};

export default RoomJoinPage
// export default class RoomJoinPge extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             roomCode: "",
//             error: "",
//         }
//         this._handleTextFieldhange = this._handleTextFieldhange.bind(this);
//         this._roomButtonPressed = this._roomButtonPressed.bind(this);
//     }

//     render() {
//         return (
//             <Grid2 container spacing={1}>
//                 <Grid2 size={{xs: 12}} align="center">
//                     <Typography variant="h4" component={"span"} element="h4">
//                         Join a Room
//                     </Typography>
//                 </Grid2>
//                 <Grid2 size={{xs: 12}} align="center">
//                     <TextField
//                         error={this.state.error}
//                         label="Code"
//                         placeholder="Enter a Room Code"
//                         value={this.state.roomCode}
//                         helperText={this.state.error}
//                         variant="outlined"
//                         onChange={this._handleTextFieldhange}
//                     />
//                 </Grid2>
//                 <Grid2 size={{xs: 12}} align="center">
//                 </Grid2>
//                 <Grid2 size={{xs: 12}} align="center">
//                     <Button variant="contained" color="primary" onClick={this._roomButtonPressed}>
//                         Enter Room
//                     </Button>
//                 </Grid2>
//                 <Grid2 size={{xs: 12}} align="center">
//                     <Button variant="contained" color="secondary" to="/" component={Link}>
//                         Back
//                     </Button>
//                 </Grid2>
//             </Grid2>
//         );
//     }



   
// }
