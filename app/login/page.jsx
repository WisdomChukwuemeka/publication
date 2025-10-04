"use client"

import Link from "next/link";

import { useState } from "react"
import { AuthAPI } from "../services/api";
import {toast, ToastContainer } from "react-toastify";
export default function Login ({onLogin}) {
    const [credientials, setCrediential] = useState(
        {
            email: "",
            password: ""
        }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCrediential((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }


    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthAPI.login(credientials);
      const token = response.data.access;
      localStorage.setItem("access_token", token);
      toast.success("Login successful!");
        setTimeout(() => {
            window.location.href = "/";
        }, 1000);
        console.log("Login response:", response);
        onLogin(response.data); // Notify parent component
    } catch (error) {
      if (error.response) {
        const errors = error.response.data;
        let delay = 0;
        for (const key in errors) {
          if (Array.isArray(errors[key])) {
            errors[key].forEach((msg) => {
              setTimeout(() => {
                toast.error(` ${msg}`);
              }, delay);
                delay += 1000; // show next message after 2s
            });
          } else {
            setTimeout(() => {
              toast.error(`${key}: ${errors[key]}`);
            }, delay);
            delay += 1000;
          }
        }
      }
    }
    }

    return(
        <>
        <div className="max-w-md mx-auto mt-10 p-6 bg-white text-black rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" id="email" name="email" value={credientials.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="" required />
            </div>
            <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" name="password" value={credientials.password} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="" required />
            </div>
            <div className="flex items-center justify-between">
        
            <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Forgot your password?</a>
            </div>
            </div>
            <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Login</button>
            </div>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">Don't have an account? <Link href={"/register"} className="font-medium text-blue-600 hover:text-blue-500">Sign Up</Link></p>
        </div>

         {/* Toast Container */}
              <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}