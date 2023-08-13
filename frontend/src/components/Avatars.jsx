import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AvatarCard from "./AvatarCard";

export default function Avatars() {
    const [users, setUsers] = useState(null);

    const callAvatars = async () => {
        const response = await fetch('http://localhost:3001/avatars', {
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
    }, [users])
    return (
        <div className="container">
            <div className="avatars">
                <NavLink to="/">back</NavLink>
                <div className="avatar__cards">
                    {users ?
                        users.map((user) => {
                            return <AvatarCard
                                key={user._id}
                                avatar={user.avatar}
                                name={user.name}
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