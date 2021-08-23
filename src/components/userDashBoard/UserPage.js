import React from 'react';
import {UserDashBoardProvider} from "../../context/UserDashBoard.Context";
import UserDashBoard from "./UserDashBoard";

const UserPage = () => {
    return (
        <UserDashBoardProvider>
            <UserDashBoard/>
        </UserDashBoardProvider>
    )
}
export default UserPage;
