import React, { useCallback, useState, useContext } from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AuthContext from '../state/auth/Context'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  button : {
    width: '100%',
  },
}));

function TelaInicio () {
  const classes = useStyles();
  const [ error, setError ] = useState(null)
  const {manageSession} = useContext(AuthContext);

  let history = useHistory();

  const handleClick = useCallback(() => {
    manageSession.signout().then((erro) => {
      erro ? setError(erro) : history.push('/')
   })
  }, [manageSession, setError, history])
  
  return (
    <>
      <h1>Usuário Logado</h1>
      
      {error && <label className={classes.labelError}>{error}</label>}
      <Button name="action" variant="contained" color="primary" 
        className={classes.button} onClick={handleClick}>
          Sign Out
      </Button>
    </>)
}

export default TelaInicio