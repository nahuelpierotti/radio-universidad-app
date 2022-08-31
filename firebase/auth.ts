import { errorPrefix } from '@firebase/util';
import auth from '@react-native-firebase/auth';
import { Toast } from 'native-base';
import { ToastAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { REACT_APP_API_URL as  url} from "@env" 



export const signIn = async (email: string, password: string) => {
    try {
        const { user } = await auth().signInWithEmailAndPassword(email.trim(), password.trim())
        if (!user.emailVerified) {
            await auth().signOut()
            return { ok: false, mensaje: "Por favor verifique su casilla de correo para validar la cuenta." }
        }
        sendToken(user.uid);
        return { ok: true, mensaje: "Bienvenido" }
    } catch (error) {
        return { ok: false, mensaje: "Verifique el email y la contraseña." }
    }
};

export const signUp = async (email: string, password: string) => {
    try {
        const user = await auth().createUserWithEmailAndPassword(email.trim(), password.trim());
        user.user.sendEmailVerification();
        await auth().signOut()
        return { ok: true, mensaje: "Usuario creado con exito! Por favor verifique su casilla de correo para confirmar la cuenta." }
    }
    catch (err) {
        return parseError(err.code);
    }
}

export const signOut = () => {
    auth().signOut()
        .then(() => {
            ToastAndroid.show("Sesion cerrada!", ToastAndroid.SHORT);
        }).catch(err => {
            console.log(err);
        })
}

export const resetPassword = async (email: string) => {
    try{
        await auth().sendPasswordResetEmail(email.trim())
        return { ok: true, mensaje: "Se ha enviado un correo para restablecer su contraseña." }
    }
    catch(err){
        return parseError(err.code);
    }
       
}

const parseError = (code: string) => {
    switch (code) {
        case 'auth/email-already-in-use':
            return { ok: false, mensaje: "El Email ya se encuentra en uso." }
        case 'auth/invalid-email':
            return { ok: false, mensaje: "El Email no es valido." }
        case 'auth/operation-not-allowed':
            return { ok: false, mensaje: "No se puede registrar." }
        case 'auth/weak-password':
            return { ok: false, mensaje: "La contraseña debe tener al menos 6 caracteres." }
        case 'auth/user-not-found':
            return { ok: false, mensaje: "El usuario no existe." }
        default:
            return { ok: false, mensaje: "Error desconocido." }
    }
}

export const sendToken=(uid)=>{
    messaging().getToken()
    .then(fcmToken => {
        if (fcmToken) {
            console.log({
                uid:uid,
                token:fcmToken
            });
           fetch(url+"/api/notification/token", {
                method: 'POST',
                body:JSON.stringify({
                    uid:uid,
                    token:fcmToken
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
           }).then(res=>{
               const ok = res.ok;
               if(ok){
                   console.log("Token saved");
               }else{
                     console.log("Token not saved");
               }
           })
        } else {
            console.log("fcmToken no disponible")
        }
    })
    .catch(err => console.log("error al obtener el token", err));
}