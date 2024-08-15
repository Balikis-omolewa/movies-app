import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from "prop-types";

const MovieCard = ({ title, img, description, rating, func }) => {
    const styles = {
        image: {
            width: "100%",
            height: "200px",
            objectFit: "cover",
        },
        card: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            backgroundColor: "#0e1729",
            color: "#fff",
            border: "1px solid #050d16",
            borderRadius: "10px",
            boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px",
        },
        cardBody: {
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
        },
        buttonContainer: {
            marginTop: "auto",
            textAlign: "center",
            boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px",
        },
        btn: {
            backgroundColor: "#050d16",
            color: "#fff",
            width: "100%",
            fontSize: "16px",
            border: "none",
            outline: "none",
            marginTop: "15px",
        }
    };

    return (
        <Card style={styles.card} onClick={func}>
            <Card.Img 
                variant="top" 
                src={img || "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_QL75_UX380_CR0,1,380,562_.jpg"} 
                alt="image"
                style={styles.image} 
            />
            <Card.Body style={styles.cardBody}>
                <Card.Title>{title || "Movie Title"}</Card.Title>
                <Card.Text style={{ fontSize: "12px"}}>{description.slice(0, 35)}...</Card.Text>
                <Card.Text>Rating: {rating || "198"}</Card.Text>
                <div style={styles.buttonContainer}>
                    <Button style={styles.btn}>Watch Now!</Button>
                </div>
            </Card.Body>
        </Card>
    )
}

MovieCard.propTypes = {
    title: PropTypes.any,
    poster_path: PropTypes.string,
    description: PropTypes.string,
    rating: PropTypes.any,
    func: PropTypes.func
}

export default MovieCard;
