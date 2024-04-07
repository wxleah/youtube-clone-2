// Initialize Supabase Client

import { AuthChangeEvent, Session, createClient } from "@supabase/supabase-js";
import { getURL } from "next/dist/shared/lib/utils";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl) throw new Error('Supabase URL not found.');
if (!supabaseAnonKey) throw new Error('Supabase Anon key not found.');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Implement authentication

/**
 * Signs the user in with a Google popup.
 * @returns A promise that resolves with the user's credentials.
 */

export function loginWithGoogle() {
    return supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            },
            redirectTo: getURL() // function to get your URL
        }
    })
}

/**
 * Signs the user out.
 * @returns A promise that resolves when the user is signed out.
 */

export function logout() {
    return supabase.auth.signOut()
}

/**
 * Trigger a callback when user auth state changes.
 * @returns A function to unsubscribe callback.
 */

export function onAuthStateChangedHelper(callback: ((event: AuthChangeEvent, session: Session | null) => void)) {

    return supabase.auth.onAuthStateChange(callback)
}

