import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function UpdateUser({ profile, setUser, token }) {
    const [username, setUsername] = useState(profile.Username);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(profile.Email);
    const [bday, setBday] = useState(profile.Birthday);
    const [error, setError] = useState(null);

    const handleUpdate = (e) => {
        e.preventDefault();
        fetch(
            `https://filmfanattic-8d1d52c1e608.herokuapp.com/users/${profile.Username}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    Username: username,
                    Password: password,
                    Email: email,
                    Birthday: bday,
                }),
            }
        )
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 422) {
                        response.json().then((errorResponse) => {
                            const errors = errorResponse.errors.map((err) => err.msg);
                            throw new Error(errors.join("\n"));
                        })
                            .catch((error) => {
                                setError(error.message);
                            });
                    } else {
                        throw new Error('Failed to update profile');
                    }
                }
                return response.json();
            })
            .then((data) => {
                setUser(data);
                setError(null);
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <div>
            {error && <div>{error}</div>}
            <Form onSubmit={handleUpdate}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        style={{ color: "white" }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        style={{ color: "white" }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        style={{ color: "white" }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formDob">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                        type="date"
                        style={{ color: "white" }}
                        value={bday}
                        onChange={(e) => setBday(e.target.value)}
                    />
                </Form.Group>

                <Button variant="success" type="submit">
                    Update
                </Button>
            </Form>
        </div>
    );
}