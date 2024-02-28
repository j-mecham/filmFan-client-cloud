import React, { useEffect, useState } from 'react';
import { UserInfo } from './user-info';
import { UpdateUser } from './update-user';
import { DeleteUser } from './delete-user';
import { FavoriteMovies } from './favorite-movies';
import { Posters } from './posters';
import { AddPoster } from './add-poster';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export function ProfileView({ token, user, setUser, movies }) {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("working")
        fetch(process.env.REACT_APP_APIURL+"/users", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                console.log(response)
                if (!response.ok) {
                    throw new Error('Failed to fetch profile');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data)
                console.log(user)
                const userProfile = data.find((u) => u._id === user._id);
                setProfile(userProfile);
            })
            .catch((error) => {
                console.log(error);
                setError('Something went wrong. Please try again later.');
            });
    }, [token, user]);

    if (error) {
        return <div>{error}</div>;
    }

    return profile ? (
        <>
            <Row className="mb-4">
                <Col>
                    <h1>Your Profile</h1>
                </Col>
            </Row>
            <Row>
                <Col className="mb-4" xs={12} sm={6} md={4}>
                    <Card
                        border="light"
                        className="card h-100">
                        <Card.Body className="flex-column">
                            <Card.Title style={{ color: "white" }}> Your Information</Card.Title>
                            <UserInfo profile={profile} />
                            <div className="align-right mt-auto">
                                <DeleteUser profile={profile} setUser={setUser} token={token} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="mb-4" xs={12} sm={6} md={8}>
                    <Card border="light" className="card">
                        <Card.Body>
                            <Card.Title className="mb-3" style={{ color: "white" }}>Update Your Information</Card.Title>
                            <UpdateUser profile={profile} setUser={setUser} token={token} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col className="mt-2">
                    <h2>Your Favorite Movies:</h2>
                </Col>
                <Row>
                    <FavoriteMovies
                        profile={profile}
                        movies={movies}
                        user={user}
                        setUser={setUser}
                        token={token}
                    />
                </Row>
            </Row>
            <Row>
                <AddPoster profile={profile} token={token} />
            </Row>
            <Row>
                <Col className="mt-2">
                    <h2>Your Posters:</h2>
                </Col>
                <Row>
                    <Posters
                        profile={profile}
                    />
                </Row>
            </Row>
        </>
    ) : (
        <div>Loading...</div>
    );
}