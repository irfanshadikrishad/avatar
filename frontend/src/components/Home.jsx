import React, { useState } from "react"

export default function Home() {
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3001/', {
            method: "POST",
            body: JSON.stringify({
                name, avatar
            })
        })
        const data = await response.json();
        if (response.status === 200) {
            console.log('success', data);
        } else {
            console.log('failed', data);
        }
    }
    return (
        <div className="home">
            <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
                <input type="file" name="avatar"
                    onChange={(e) => {
                        setAvatar(e.target.files[0])
                    }} />
                <input value={name} type="text" name="name" placeholder="name"
                    onChange={(e) => {
                        setName(e.target.value)
                    }} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}