import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';
import sample from './sample_video.mp4';
class Home extends Component {
    render() {
        return (
            <div>
                <video autoPlay loop muted
                style = {{
                    position: "absolute",
                    width: "100%",
                    left: "50%",
                    top: "49%",
                    height: "100%",
                    objectFit: "cover",
                    transform: "translate(-50%, -50%)",
                    zIndex: "-1"
                }}
                 >
                    
                    <source src= {sample} type="video/mp4" />
                </video>
            <h1 style={{ color: "white" }}>
                <center>
                    AllChat Ltd.
                </center>

            </h1>
            <center> 
            <MDBCard style={{ maxWidth: '12rem' }}>
            <MDBCardBody>                
                <MDBBtn href="/register" color="secondary">Join The Fun Now!!!</MDBBtn>
            </MDBCardBody>
            </MDBCard>
            </center>
            <center> 
            <MDBCard style={{ maxWidth: '16rem' }}>
            <MDBCardBody>                
                <MDBBtn href="/chat">Take me to the Chat Room!!</MDBBtn>
            </MDBCardBody>
            </MDBCard>
            </center>
        </div>
        );
    }
}

export default Home;