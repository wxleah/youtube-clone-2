import { loginWithGoogle, logout } from "../supabase/supabase";
import styles from './signIn.module.css'
import { User } from "@supabase/auth-js"

interface SignInProps {
    user: User | null;
}

export default function SignIn({ user }: SignInProps) {
    return (
           <div>
        {user ? (
            <button className={styles.signbtn}
                onClick={logout}>Sign Out</button>
        ) : (
            <button className={styles.signbtn}
                onClick={loginWithGoogle}>Sign In</button>
        )}
    </div> 
    )

}