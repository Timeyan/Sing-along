import React, { useState, useEffect } from "react";
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import Room from "./Room";
import { Button, Grid2, Typography, ButtonGroup } from "@mui/material";
import { 
    BrowserRouter as Router, 
    Routes,
    Route,
    Link, 
    Navigate, 
    data
} from "react-router-dom";

const HomePage = () => {

    const [roomCode, setRoomCode] = useState(null);

    useEffect(() => {
        const fetchUserInRoom = async () => {
            const response = await fetch('/api/user-in-room');
            const data = await response.json();
            setRoomCode(data.code);
        };
        fetchUserInRoom();

    }, []);

    const clearRoomCode = () => {
        setRoomCode(null);
    }


    const RenderHomePage = () => {
        return (
            <Grid2 container spacing={3}>
                <Grid2 size={{xs:12}} align="center">
                    <Typography compact="h3" component={'span'} variant="h3">
                        House Party
                    </Typography>
                </Grid2>
                <Grid2 size={{xs:12}} align="center">
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button color="primary" to="/join" component={ Link }>
                            Join a Room
                        </Button>
                        <Button color="secondary" to="/create" component={ Link }>
                            Create a Room
                        </Button>
                    </ButtonGroup>
                </Grid2>
                <Grid2 size={{xs:12}} align="center">
                    
                </Grid2>
                <Grid2 size={{xs:12}} align="center">
                    
                </Grid2>
            </Grid2>
        );
    };

    return (
        <Router>
            <Routes>
                <Route
                    exact path='/'
                    element={
                        roomCode ? (
                          <Navigate to={`/room/${roomCode}`} />
                        ) : (
                          <RenderHomePage />
                        )
                    }
                />
                <Route 
                    exact path='/join' 
                    element={<RoomJoinPage />} 
                />
                <Route 
                    exact path='/create' 
                    element={<CreateRoomPage />} 
                />
                <Route 
                    exact path='/room/:roomCode' 
                    element={<Room leaveRoomCallback={clearRoomCode} />} 
                />
            </Routes>
        </Router>
    );
}

export default HomePage;
