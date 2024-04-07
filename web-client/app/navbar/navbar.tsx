'use client'

import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.css"
import { useEffect, useState } from "react";
import { User } from "@supabase/auth-js"
import { onAuthStateChangedHelper } from "../supabase/supabase";
import SignIn from "./signIn";

export default function Navbar() {
    // Initialize user state
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
    // Listen for changes in authentication state
    const { data: authListener } = onAuthStateChangedHelper(async (event, session) => {
        console.log(`Supabase auth event: ${event}`);
        setUser(session?.user ?? null);
      });
      return () => {
        // Unsubscribe when component unmounts
        authListener.subscription?.unsubscribe();
      };
        
    }, [])

    return (
        <nav className={styles.nav}>
            <Link href="/">
                <Image width={90} height={20}
                src="/youtube-logo.svg" alt="YouTube Logo">
                </Image>
            </Link>
            <SignIn user={user} />
        </nav>
    )
} 
