import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AvatarCard from "./AvatarCard";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function Avatars() {
    const [users, setUsers] = useState(null);
    const [render, setRender] = useState(false);

    const callAvatars = async () => {
        const response = await fetch('https://avatar-4f5j.onrender.com/avatars', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();
        if (response.status === 200) {
            setUsers(data);
        }
    }
    useEffect(() => {
        callAvatars();
    }, [users, render])
    return (
        <div className="container">
            <div className="avatars">
                <NavLink to="/">{<ArrowBackIosIcon />}back</NavLink>
                <div className="avatar__cards">
                    {users ?
                        users.map((user) => {
                            return <AvatarCard
                                key={user._id}
                                id={user._id}
                                avatar={user.avatar}
                                name={user.name}
                                setRender={setRender}
                            />
                        })
                        : <img
                            style={{ width: "100px" }}
                            alt="loading"
                            src="https://media.tenor.com/A5bZOxkckTsAAAAC/akairo-azur-lane.gif" />}
                </div>
            </div>
        </div>
    )
}