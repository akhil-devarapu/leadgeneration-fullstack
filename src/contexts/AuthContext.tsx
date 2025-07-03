
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  signup: (name: string, email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session);
        
        // Only allow authenticated sessions for verified users
        if (session?.user?.email_confirmed_at) {
          setSession(session);
          setUser(session.user);
          console.log('User authenticated with verified email');
        } else {
          // Clear session for unverified users
          setSession(null);
          setUser(null);
          
          // If someone tries to sign in without verification, sign them out
          if (event === 'SIGNED_IN' && session?.user && !session.user.email_confirmed_at) {
            console.log('Email not verified, signing out user');
            supabase.auth.signOut();
          }
        }
        
        setLoading(false);
      }
    );

    // Get initial session and check verification status
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session);
      
      // Only allow session if email is verified
      if (session?.user?.email_confirmed_at) {
        setSession(session);
        setUser(session.user);
        console.log('Initial session: User has verified email');
      } else {
        setSession(null);
        setUser(null);
        console.log('Initial session: User email not verified or no session');
        
        // If there's a session but email isn't verified, sign out
        if (session?.user && !session.user.email_confirmed_at) {
          console.log('Signing out user with unverified email');
          supabase.auth.signOut();
        }
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    console.log('Login attempt for:', email);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.log('Login error:', error.message);
        return { error: error.message };
      }

      // Strict verification check after login
      if (!data.user?.email_confirmed_at) {
        console.log('Login blocked: Email not verified');
        await supabase.auth.signOut();
        return { error: 'Please verify your email before signing in. Check your inbox for the verification link.' };
      }

      console.log('Login successful for verified user');
      return { error: null };
    } catch (error) {
      console.error('Login error:', error);
      return { error: 'An unexpected error occurred' };
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    console.log('Signup attempt for:', email);
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: name
          }
        }
      });

      if (error) {
        console.log('Signup error:', error.message);
        return { error: error.message };
      }

      // Ensure user is signed out after signup to prevent auto-login
      await supabase.auth.signOut();
      console.log('Signup successful, user signed out to await verification');

      return { error: null };
    } catch (error) {
      console.error('Signup error:', error);
      return { error: 'An unexpected error occurred' };
    }
  };

  const logout = async () => {
    console.log('Logging out user');
    await supabase.auth.signOut();
  };

  const value: AuthContextType = {
    user,
    session,
    login,
    signup,
    logout,
    isAuthenticated: !!session && !!user?.email_confirmed_at,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
