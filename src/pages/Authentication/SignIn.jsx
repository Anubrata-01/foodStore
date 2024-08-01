/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import supabase from '../../utilities/supabase';
import { useAtom } from 'jotai';
import { userDetailsAtom } from "../../storeAtom/Atom";

const SignInForm = () => {
  const navigate = useNavigate();
  const [, setUserDetailsAtom] = useAtom(userDetailsAtom);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage(''); // Reset error message
    const { email, password } = data;

    try {
      const { data: user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(`Error signing in: ${error.message}`);
      } else {
        console.log('User signed in:', user);
        setUserDetailsAtom(user);
        navigate('/');
      }
    } catch (error) {
      setErrorMessage('Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleProviderSignIn = async (provider) => {
    setLoading(true);
    setErrorMessage(''); // Reset error message

    try {
      const { error } = await supabase.auth.signIn({
        provider,
      });

      if (error) {
        setErrorMessage(`Error signing in with ${provider}: ${error.message}`);
      }
    } catch (error) {
      setErrorMessage('Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">Sign In</h2>
        
        {errorMessage && <div className="mb-4 text-red-500 text-center">{errorMessage}</div>}
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            {...register('email', { 
              required: 'Email is required', 
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Enter a valid email address'
              }
            })}
            className={`mt-1 block w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500`}
          />
          {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long'
              },
            })}
            className={`mt-1 block w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500`}
          />
          {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>}
        </div>

        <button 
          type="submit" 
          className={`w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-700">Don't have an account? <NavLink to="/signup" className="text-orange-600 hover:underline">Sign Up Now</NavLink></p>
        </div>

        <div className="mt-4 flex flex-col items-center">
          <button
            type="button"
            onClick={() => handleProviderSignIn('google')}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
            disabled={loading}
          >
            Sign In with Google
          </button>
          <button
            type="button"
            onClick={() => handleProviderSignIn('facebook')}
            className="w-full bg-blue-800 text-white py-3 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-700 mt-2"
            disabled={loading}
          >
            Sign In with Facebook
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;




// Anubrata@3604
// amon:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2cGJuZ3poaXZjbXFqaHV2enpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIzOTg1OTYsImV4cCI6MjAzNzk3NDU5Nn0.DpFUOM6Oxy5S43SAdbf0r1TzTkcrQBxDxBC88XBQSbM
// apikey:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2cGJuZ3poaXZjbXFqaHV2enpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIzOTg1OTYsImV4cCI6MjAzNzk3NDU5Nn0.DpFUOM6Oxy5S43SAdbf0r1TzTkcrQBxDxBC88XBQSbM
// passkey:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2cGJuZ3poaXZjbXFqaHV2enpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMjM5ODU5NiwiZXhwIjoyMDM3OTc0NTk2fQ.5lniRsXXpr0KPfa_xI-euoffNoJoLc3vhjQNO6wVUJ4
// url:https://gvpbngzhivcmqjhuvzzg.supabase.co

