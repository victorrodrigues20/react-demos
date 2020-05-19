import React, { useState } from "react";
import AuthContext from './Context'
import * as authService from "../../services/auth";


function Provider({ children }) {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Vamos criar uma constante  por enquanto, porém
  // depois podemos pegar por um contexto
  const manageSession = {

    async create(data) {
      let res = await authService.createUser(data)
      return res
    },  
    
    async authenticate(data) {
      let erro = await authService.signIn(data)

      console.log(erro)

      // Se não tiver mensagem de erro
      if (!erro) {
        setIsAuthenticated(true)
        setUser(data)
        return null
      }
      else {
        setIsAuthenticated(false)
        setUser(null)
        return erro
      }      
    },

    async signout() {
      setIsAuthenticated(false)
      setUser(null)
      return await authService.signOut()
    }
  };

  return (
    <AuthContext.Provider value={{isAuthenticated, user, manageSession}}>
      {children}
    </AuthContext.Provider>
  );
}

export default Provider;
