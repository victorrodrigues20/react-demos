import React, { useState, useContext, useRef } from 'react'
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

function Login() {
  const formRef = useRef(null);  
  const classes = useStyles();
  const authUser = useContext(AuthContext);
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
      console.log(authUser);

      authUser.authenticate(data).then((erro) => {

        if (erro)
          setError(erro)
        else
         history.push('/inicio')
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
      <h1>Login c/ Firebase</h1>
      <Form ref={formRef} className={classes.root} onSubmit={handleSubmit}>
        <TextField name="email" label="E-mail" />
        <TextField name="password" label="Senha" type="password" />

        {error && <label className={classes.labelError}>{error}</label>}
        <Button type="submit" name="action" variant="contained" color="secondary">
          Login
        </Button>
        <Link to="/new" className={classes.link}>
          <Button name="action" variant="contained" color="primary" className={classes.button}>
              Criar Conta
          </Button>
        </Link>

      </Form>
    </>
  )
}

export default Login