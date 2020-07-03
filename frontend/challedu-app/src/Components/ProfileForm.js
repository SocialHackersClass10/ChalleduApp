import React from "react";

const ProfileForm = () => {
    return (
        <div>
            <h1>User profile creation</h1>
            <p>
                Logged-in users, both administrators and regular ones, will be able to create their own profile with
                the following data:
        <ul>
                    <li>Full name</li>
                    <li>Picture</li>
                    <li>Brief description</li>
                    <li>Public contact details</li>
                </ul>
            </p>
            <p>
                Upon creation, a user profile is hidden from public view until approved by the administrator.
                Administrator users will be able to approve, edit and delete all user profiles.
                NGO profile creation
                Logged-in users with the NGO representative role, will be able to create a profile for their affiliate
                NGO with the following data:
                Name
                Description
                Picture
                Document(s)
                Upon creation, a NGO profile is hidden from public view until approved by the administrator.
                Administrator users will be able to approve, edit and delete all NGO profiles.
    </p>
            <h1>NGO profile creation</h1>
        <p>
        Logged-in users with the NGO representative role, will be able to create a profile for their affiliate NGO with the 
        following data:
            <ul>
                <li>Name</li>
                <li>Description</li>
                <li>Picture</li>
                <li>Document(s)</li>
            </ul>
        <p>
        Upon creation, a NGO profile is hidden from public view until approved by the administrator.
        Administrator users will be able to approve, edit and delete all NGO profiles.
    </p>
    </p>


        </div>
    )
}

export default ProfileForm;
