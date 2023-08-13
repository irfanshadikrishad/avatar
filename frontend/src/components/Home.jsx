import React, { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
    const navigate = useNavigate();
    const fileRef = useRef();
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');

    function successToast(tweet) {
        toast.success(`${tweet}`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    function errorToast(error) {
        toast.error(`${error}`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("name", name);
        formdata.append("avatar", avatar);
        const response = await fetch('http://localhost:3001/', {
            method: "POST",
            body: formdata
        })
        const data = await response.json();
        if (response.status === 201) {
            console.log('success', data);
            successToast(data.message);
            fileRef.current.value = "";
            setName('');
            navigate('/avatars');
        } else {
            errorToast(data.error);
        }
    }
    return (
        <div className="home">
            <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
                <input type="file" name="avatar"
                    onChange={(e) => {
                        setAvatar(e.target.files[0])
                    }} ref={fileRef} />
                <input value={name} type="text" name="name" placeholder="name"
                    onChange={(e) => {
                        setName(e.target.value)
                    }} />
                <input type="submit" value="Submit" />
            </form>
            <NavLink to="/avatars">avatars</NavLink>
            <ToastContainer />
        </div>
    )
}