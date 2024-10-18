'use client';

import React from 'react'
import Post from './Post'
import axios from '@/lib/axios';

const Timeline = () => {
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
        const res = await axios.post('/api/post')
        console.log(res);
        window.location.href = '/dashboard'
    } catch (error) {
        console.error(error)
    }
  }
  return (
    <div className="min-h-screen bg-gray-100">
    <main className="container mx-auto py-4">
      <div className="bg-white shadow-md rounded p-4 mb-4">
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="What's on your mind?"
          ></textarea>
          <button
            type="submit"
            className="mt-2 bg-gray-700 hover:bg-green-700 duration-200 text-white font-semibold py-2 px-4 rounded"
          >
            投稿
          </button>
        </form>
      </div>
      <Post/>
    </main>
  </div>
  )
}

export default Timeline