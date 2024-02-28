import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function Posters({ profile, movies, user, setUser, token }) {
    const posters = profile.Posters
    console.log("posters ", posters)

    var imgUrls = [];

    for (let i = 0; i < posters.length; i++) {
        imgUrls.push('https://s3.amazonaws.com/resized-image-bucket-jm/' + posters[i])
      };
    console.log("urls: ", imgUrls)

    return (
        <Row>
            {imgUrls.map((poster, index) => (
                <Col key={index} md={3}>
                    <Card
                        // className="h-100"
                        style={{ borderRadius: 0 }}
                        // border="light"
                    >
                        <Link
                            to={'https://s3.amazonaws.com/exercise-2-4-bucket/'+ posters[index]}
                            target="_blank"
                        >
                            <Card.Img variant="top" src={poster} />
                        </Link>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}