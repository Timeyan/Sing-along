import React from "react";
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import Room from "./Room";
import { Button, Grid2, Typography, ButtonGroup } from "@mui/material";
import { 
    BrowserRouter as Router, 
    Routes,
    Route,
    Link, 
    Redirect, 
    data
} from "react-router-dom";

const HomePage = () => {

    const ComponentDidMount = async () => {
        fetch('/api/user-in-room').then(
            (response) => response.json()
        ).then(
            (data) => {}
        );
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
                    element={<RenderHomePage />}
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
                    element={<Room />} 
                />
            </Routes>
        </Router>
    );
}

export default HomePage;

// export default class HomePge extends Component {
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         return (
//             <Router>
//                 <Routes>
//                     <Route exact path='/' element={
//                         <div>
//                             <p>Я ебу собаку</p>
//                             <Button variant="contained" color="primary" to="/join" component={Link}>
//                                 Join Room
//                             </Button>
//                         </div>
//                     } />
//                     <Route exact path='/join' element={<RoomJoinPage />} />
//                     <Route exact path='/create' element={<CreateRoomPage />} />
//                     <Route exact path='/room/:roomCode' element={<Room />} />
//                 </Routes>
//             </Router>
//         );
//     }
// }