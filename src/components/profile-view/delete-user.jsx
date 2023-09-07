import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export function DeleteUser({ profile, setUser, token }) {
    const navigate = useNavigate();

    const handleDelete = () => {
        fetch(
            `https://filmfanattic-8d1d52c1e608.herokuapp.com/users/${profile.Username}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        ).then(() => {
            setUser(null);
            navigate('/signup');
        });
        alert('Your Account was deleted succesfully');
    };

    return (
        <div>
            <Button variant="danger" onClick={handleDelete}>
                Delete Profile
            </Button>
        </div>
    );
}