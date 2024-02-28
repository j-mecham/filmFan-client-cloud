import { Button, Col, Row } from "react-bootstrap";
import { useState } from "react";

export function AddPoster({ profile, token }) {
    const [file, setFile] = useState(null);
    username = profile.Username;
    console.log("username:", username)

    const handleFileChange = async (e) => {
        setFile(e.target.files[0])
    }
    const handleUpload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(
                process.env.REACT_APP_APIURL+"/users/"+username+"/upload",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            if (response.ok) {
                const data = await response.json();
                setTimeout(window.location.reload(), 2000);
                console.log("Upload Successful:", data.message)
                alert("Upload Successful")
            } else {
                console.error("Error Uploading file:", error.message);
            }
        } catch (error) {
            console.error("Error uploading file: ", error.message);
        }
    };

    return (
        <Row className="justify-content-md-center">
            <Col>
                <h4>Upload a Poster to your wall!</h4>
                <form onSubmit={handleUpload}>
                    {/* <label>
                    Choose Image:
                    </label> */}
                    <input type="file" onChange={handleFileChange} />
                    

                    <Button type="submit">Upload File</Button>
                </form>
            </Col>
        </Row>
    );
}