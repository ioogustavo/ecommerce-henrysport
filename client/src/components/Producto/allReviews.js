import React, { useState, useEffect } from "react";
import "./starRating.css";
import IconButton from "@material-ui/core/IconButton";
import { FaStar } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { deleteReview, edReview } from "../../actions/index.js";
import { connect } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import swal from "sweetalert";
import { createElement } from "react";
import { Rating } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const AllReviews = () => {
    const [state, setState] = useState({
        reviews: [],
        description: ""
    })

    const [ratingStar, setRatingStar] = useState(null);
    const [hover, setHover] = useState(null);

    var url = window.location.href;
    var separarUrl = url.split("/");
    var tomarUltValor = separarUrl.pop();
    var urlreal = `http://localhost:3000/product//${tomarUltValor}/review`;

    useEffect(() => {
        fetch(urlreal)
            .then(response => response.json())
            .then(reviews => {
                setState({
                    ...state,
                    reviews: reviews
                })
            });
    }, [])

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            '& > * + *': {
                marginTop: theme.spacing(1),
            },
        },
    }));
    const classes = useStyles();

    function cambiarColor() {
        var heart = document.getElementById("heart");
        heart.style.color = "red";
    }

    function modificarReview(rw) {
        if (localStorage.user) {
            var userLocal = JSON.parse(localStorage.user);
            if (userLocal.id === rw.user.id) {
                document.getElementById('ocu').style.display = 'block'
            } else {
                return swal({
                    text: "No puedes editar este comentario",
                    icon: "warning",
                    timer: "2000",
                });
            }
        } else {
            return swal({
                text: "No has iniciado sesión",
                icon: "warning",
                timer: "2000",
            });
        }
    }
    function handleDescripChange(e) {
        e.preventDefault();
        setState({
            ...state,
            description: e.target.value
        })
    }

    function editReview(rw) {
        var usuariolog = JSON.parse(localStorage.user)
        edReview(ratingStar, state.description, usuariolog, rw.id)
        swal({
            text: "Modificamos tu comentario!",
            icon: "success",
            timer: "3000",
        });
        window.location.reload();
    }

    function borrarRw(rw) {
        if (localStorage.user) {
            var userLocal = JSON.parse(localStorage.user);
            if (userLocal.id === rw.user.id) {
                deleteReview(rw.id);
                swal({
                    text: "Hemos eliminado su comentario!",
                    icon: "success",
                    timer: "1500",
                });
                window.location.reload();
            } else {
                return swal({
                    text: "No puedes eliminar este comentario",
                    icon: "warning",
                    timer: "2000",
                });
            }
        } else {
            return swal({
                text: "No has iniciado sesión",
                icon: "warning",
                timer: "2000",
            });
        }
    }

    return (
        <div className="opiniones">
            <h2 className="titleOp">Opiniones sobre el Producto</h2>
            <div id="myDIV" className="reviews">
                {state.reviews.map(rw => {
                    return (
                        <div id="rw" className="cadaOp">
                            <div className="elemRw">
                                <FaUserCircle size={25} />
                                <p> {rw.user.name}</p>
                            </div>
                            <div className="elemRw">
                                <div className='item_list_ranking'>
                                    {[...Array(rw.star)].map((star, i) => {
                                        return (
                                            <label>
                                                <FaStar
                                                    className="star"
                                                    color={"#ffc107"}
                                                    size={25}
                                                />
                                            </label>
                                        );
                                    })}
                                </div>

                            </div>
                            <div className="elemRw">
                                <p>{rw.description}</p>
                            </div>
                            <div className="elemRw" >
                                {localStorage.user && (
                                    <Tooltip title="Me Gusta">
                                        <IconButton className="butFav" aria-label="me gusta">
                                            <FavoriteIcon
                                                id="heart"
                                                size={20}
                                                /* href="edRw" */
                                                onClick={() => cambiarColor()}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                )}

                                {localStorage.user && (
                                    <Tooltip title="Editar">
                                        <IconButton aria-label="editar">
                                            <EditIcon size={20}
                                                onClick={() => modificarReview(rw)} />
                                        </IconButton>
                                    </Tooltip>
                                )}
                                {localStorage.user && (
                                    <Tooltip title="Borrar">
                                        <IconButton aria-label="borrar">
                                            <DeleteIcon
                                                size={20}
                                                onClick={() => borrarRw(rw)}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </div>
                            <div id='ocu' className='title' >
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    editReview(rw)
                                }}>
                                    <h3>
                                        <strong> Modifica tu comentario</strong>
                                    </h3>
                                    <div>
                                        {[...Array(5)].map((star, i) => {
                                            const ratingValue = i + 1;
                                            return (
                                                <label>

                                                    <FaStar
                                                        className="star"
                                                        color={ratingValue <= (hover || ratingStar) ? "#ffc107" : "#e4e5e9"}
                                                        size={30}
                                                        value={ratingValue}
                                                        onMouseEnter={() => setHover(ratingValue)}
                                                        onMouseLeave={() => setHover(null)}
                                                        onClick={() => setRatingStar(ratingValue)}
                                                    />
                                                </label>
                                            );
                                        })}
                                    </div>

                                    <div>
                                        <TextField
                                            id="standard-textarea"

                                            multiline
                                            onChange={handleDescripChange}
                                        />
                                    </div>
                                    <button className="btn btn-primary" type="submit" > Enviar Comentario </button>

                                </form>
                            </div>
                        </div>

                    )
                })}
            </div>

        </div>
    )
}
function mapDispatchToProps(dispatch) {
    return {
        deleteReview: (title) => dispatch(deleteReview(title)),
    };
}

export default connect(mapDispatchToProps)(AllReviews);