import React from 'react';
import UserDetails from "./UserDetails";
import UserPosts from './UserPosts';
import { withRouter } from "react-router";
import { UserDetailsProvider } from "../../context/UserDetails.Context";

const UserDetailsPage = ({ match, history}) => {
    return (
        <UserDetailsProvider>
            <UserDetails match={match} history={history} />
            <UserPosts match={match}/>
        </UserDetailsProvider>
    )
}

export default withRouter(UserDetailsPage);