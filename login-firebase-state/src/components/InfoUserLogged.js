import React, { useContext, useEffect } from 'react'
import AuthContext from '../state/auth/Context'

function InfoUserLogged() {

  const {isAuthenticated, user} = useContext(AuthContext)

  useEffect(() => {
    console.log(isAuthenticated)
    console.log(user)
  }, [isAuthenticated, user])

  return (
    <>
      <h5>Usuário: {(user && isAuthenticated) ? user.email : 'por favor, faça login'}</h5>

    </>)
}

export default InfoUserLogged