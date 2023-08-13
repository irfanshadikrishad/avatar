export default function AvatarCard({ name, avatar }) {
    return (
        <div className="avatar__card">
            <img
                src={`http://localhost:3001/${avatar}`}
                alt="avatar images of the users"
                draggable="false" />
            <p>{name}</p>
        </div>
    )
}