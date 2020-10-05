import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import './footer.css';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    clear: 'both',
    display: 'flex',
    flexDirection: 'column',
   
  },

  footer: {
    
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div className="conte">
      <footer className={classes.footer}>
        <div>
            <Container maxWidth="sm">
            <Typography variant="body1">Tienda de deportes HENRYSPORT</Typography>
            <Copyright />
            </Container>
        </div>  
        <div>
            <Container maxWidth="sm">
            <Typography variant="body1"><a href='/Home' className="nav-link-2" >Home </a></Typography>
            
            </Container>
        </div>    
        <div>
            <Container maxWidth="sm">
            <Typography variant="body1"><a href='/Contacto' className="nav-link-2" >Contacto</a></Typography>
            
            </Container>
        </div>   
        <div className="nav-link-3">
            <Container maxWidth="sm">
            <Typography variant="body1">ARGENTINA-Envios a todo el pais</Typography>
            
            </Container>
        </div>   
      </footer>
    </div>
  );
}