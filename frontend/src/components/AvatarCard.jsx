import CancelIcon from '@mui/icons-material/Cancel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AvatarCard({ name, avatar, id, setRender }) {
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
        const response = await fetch('https://avatar-production-5577.up.railway.app/delete', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id
            })
        })
        const data = await response.json();
        if (response.status === 200) {
            successToast(data.message);
            setRender(prev => !prev);
        } else {
            errorToast(data.error);
        }
    }
    return (
        <form className="avatar__card" onSubmit={handleSubmit}>
            <img
                src={`https://avatar-production-5577.up.railway.app/avatars/${avatar}`}
                alt="avatar images of the users"
                draggable="false" />
            <p>{name}</p>
            <button type='submit' className='delete'>
                {<CancelIcon />}
            </button>
            <ToastContainer />
        </form>
    )
}