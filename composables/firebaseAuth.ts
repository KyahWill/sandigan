import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  getRedirectResult,
  User,
  Auth
} from 'firebase/auth'

export const useFirebaseUser = () => useState('firebaseUser', () => null);

export const signInWithGoogle = async () => {
  const auth = getAuth()
  await getRedirectResult(auth)
    .then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result!)
      const token = credential!.accessToken
      // The signed-in user info.
      const user = result!.user
      return [user, token]
    }).catch((error) => {
    // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.customData.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      console.log(errorCode, errorMessage, email, credential)
    })
}

export const createUser = async (email:string, password:string) => {
  const auth = getAuth()
  const credentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  ).catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
    console.log(errorCode, errorMessage)
  })
  return credentials
}

export const signInUser = async (email, password) => {
  const auth = getAuth()
  const credentials = await signInWithEmailAndPassword(
    auth,
    email,
    password
  ).catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
    console.log(errorCode, errorMessage)
  })
  return credentials
}

export const initUser = () => {
  const auth: Auth = getAuth()
  if (auth.currentUser === null){
    return 
  }
  const firebaseUser = useFirebaseUser()

  firebaseUser.value = auth.currentUser

  const userCookie = useCookie('userCookie')

  const router = useRouter()

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
    } else {
      // if signed out
      router.push('/signup')
    }

    firebaseUser.value = user

    // @ts-ignore
    userCookie.value = user // ignore error because nuxt will serialize to json

    console.log(user)
    $fetch('/api/auth', {
      method: 'POST',
      body: { user }
    })
  })
}

export const signOutUser = async () => {
  const auth = getAuth()
  const result = await auth.signOut()
  return result
}
