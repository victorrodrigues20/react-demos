import React, { useRef, useContext, useState } from 'react'
import { Form } from '@unform/web';
import { TextField } from 'unform-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import AuthContext from '../state/auth/Context'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
    'label' : {
      color: 'yellow'
    }
  },
  button : {
    width: '100%',
  },
  link : {
    textDecoration: 'none'
  },
  labelError : {
    fontSize: '12px',
    color: 'red'
  }
}));

function CriarLogin() {
  const formRef = useRef(null);  
  const classes = useStyles();
  const { manageSession } = useContext(AuthContext);
  let history = useHistory();
  const [ error, setError ] = useState(null)

  async function handleSubmit(data) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required("E-mail é obrigatório"),
        password: Yup.string()
          .required("Senha é obrigatória"),
      });

      await schema.validate(data, {
        abortEarly: false
      });

      // Validation passed
      //console.log(data);

       manageSession.create(data).then((erro) => {
         erro ? setError(erro) : history.push('/')
      })

    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <>
      <h1>Criar Novo Login</h1>
      <Form ref={formRef} className={classes.root} onSubmit={handleSubmit}>
        <TextField name="email" label="Novo E-mail" />
        <TextField name="password" label="Nova Senha" type="password" />

        {error && <label className={classes.labelError}>{error}</label>}
        <Button name="action" type="submit" variant="outlined" color="primary">
            Criar 
        </Button>
        <Link to="/" className={classes.link}>
          <Button name="action" variant="outlined" color="secondary" className={classes.button}>
            Cancelar
          </Button>
        </Link>
        
      </Form>
    </>
  )
}

export default CriarLogin