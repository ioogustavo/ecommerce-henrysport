import React, { useState } from "react";
import './starRating.css'
import { Rating } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { addReview } from '../../actions/index.js';
import swal from "sweetalert";

export const HalfRating = () => {

  const [star, setStar] = useState(null);
  const [hover, setHover] = useState(null);
  const [description, setDescription] = useState("");

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

  var url = window.location.href;
  //Esta variable separa la url conn "/", para luego tomar el ultimo valor 
  var separarUrl = url.split("/");
  //Esta variable toma el ultimo valor de la URL, para hacerla dinamica
  var tomarUltValor = separarUrl.pop();

  var usuariolog = JSON.parse(localStorage.user)

  function agregarReview(e) {
    e.preventDefault();
    addReview(star, description, usuariolog, tomarUltValor)
    console.log(star)
    swal({
      text: "Gracias por tu comentario!",
      icon: "success",
      timer: "3000",
    });
    window.location.reload();
  }

  function handleDescripChange(e) {
    e.preventDefault();
    setDescription(e.target.value)
  }

  function handleStarChange(e) {
    e.preventDefault();
    setStar(e.target.value)
  }

  return (
    <div id="addRw" className="contenedor">
      <h3>
        <strong> ¿Cuántas estrellas le darías?</strong>
      </h3>
      <form onSubmit={agregarReview}>
        <Rating
          name="half-rating"
          defaultValue={2.5}
          precision={1}
          onChange={handleStarChange} />

        <div>
          <TextField
            id="standard-textarea"
            label="Dejanos tu comentario..."
            placeholder="Escribe sobre sus características, materiales, color..."
            multiline
            onChange={handleDescripChange}
          />
        </div>
        <button className="btn btn-primary" type="submit" > Enviar Comentario </button>
      </form>
    </div>
  );
}

export default HalfRating;






