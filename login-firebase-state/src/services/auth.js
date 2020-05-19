
import {auth} from "./firebase";

// Sign Up
export const createUser = async function(user) {

  try {
    await auth.createUserWithEmailAndPassword(user.email, user.password)
  }
  catch(err) {
    console.log('auth.js ' + err.message)
    return 'Erro: ' + err.message
  }

  return null
}

// Sign In
export const signIn = async function(user) {

  try {
    await auth.signInWithEmailAndPassword(user.email, user.password)
  }
  catch(err) {
    console.log('auth.js ' + err.message)
    return 'Erro: ' + err.message
  }

  return null
}

// Sign Out
export const signOut = async function() {

  try {
    await auth.signOut()
  }
  catch(err) {
    console.log('auth.js ' + err.message)
    return 'Erro: ' + err.message
  }

  return null
}
