import React from "react";
import { Button } from "@mui/material";
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import Room from "./Room";
import { 
    BrowserRouter as Router, 
    Routes,
    Route,
    Link, 
    Redirect 
} from "react-router-dom";

const HomePage = () => {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={
                    <div>
                        <p>Я ебу собаку</p>
                        <Button variant="contained" color="primary" to="/join" component={Link}>
                            Join Room
                        </Button>
                    </div>
                } />
                <Route exact path='/join' element={<RoomJoinPage />} />
                <Route exact path='/create' element={<CreateRoomPage />} />
                <Route exact path='/room/:roomCode' element={<Room />} />
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