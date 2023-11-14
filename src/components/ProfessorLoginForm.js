// components/LoginForm.js
import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/LoginForm.module.css';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginError, setLoginError] = useState(false);
    const clearInputValues = () => {
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
      };

    const onSubmit = async (data) => {
        const response = await fetch('/api/loginProfessor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      
        const data2 = await response.json();
      
        if (data2.success) {
            console.log('Professor Logged in successfully:', data2.user.email_id);
            router.push(`/ProfProfile?professor_email_id=${data2.user.email_id}`);
          // User is logged in, handle success
        } else {
            console.log('Student Logged is Failure:');
            setLoginError(true);
            // Clear input fields on login failure
            clearInputValues();
          // Handle login failure
        }
      };
  return (
    <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.title}>Professor Log In</h1>
      <input 
        {...register('professor_email_id', { required: true })}
        type="text" 
        id="email" 
        placeholder="Enter email ID"
       />
      {errors.student_email_id && <p>Professor email Id is required</p>}
      <label htmlFor="password">Password:</label>
      <input 
        {...register('password', { required: true })}
        type="password" 
        id="password" 
        placeholder="Enter password" 
        />
      {errors.password && <p>Password is required</p>}
      <button type="submit" className={styles.button}>Submit</button>
      </form>
      {/* <Link href="/Projects.js" passHref>
        <button className={styles.button}>Continue</button>
      </Link> */}
      {loginError && (
        <p style={{ color: 'red' }}>Login failed. Please check your email and password.</p>
      )}
    </div>
    
  );
};

export default LoginForm;
