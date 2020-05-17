import React, { useState } from "react";
import AuthContext from "./Context";
import { createUser, signIn, signOut } from '../../services/auth'

// Vamos criar uma constante  por enquanto, porém
// depois podemos pegar por um contexto
const authSession = {
  isAuthenticated: false,
  user: {},

  create(data) {
    let res = createUser(data)
    return res
  },  
  
  authenticate(data) {
    let erro = signIn(data)

    // Se não tiver mensagem de erro
    if (!erro) {
      authSession.isAuthenticated = true
      authSession.user = data
      return null
    }
    else {
      authSession.isAuthenticated = false
      authSession.user = {}
      return erro
    }      
  },

  signout() {
    authSession.isAuthenticated = false
    authSession.user = {}
    return signOut()
  }
};

function Provider({ children }) {
  const [ authUser ] = useState(authSession);

  return (
    <AuthContext.Provider value={authUser}>
      {children}
    </AuthContext.Provider>
  );
}

export default Provider;
