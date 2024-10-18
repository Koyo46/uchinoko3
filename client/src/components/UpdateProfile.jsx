'use client'

import axios from '@/lib/axios'
import { redirect } from 'next/dist/server/api-utils'
import React, { useEffect, useState } from 'react'

const UpdateProfile = () => {
    const [mbti, setMbti] = useState('')

    useEffect(() => {
        fetchProfile()
    }, [])
    const fetchProfile = async () => {
        const res = await axios.get('/api/profile')
        setMbti(res.data.mbti)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const mbti = e.target.mbti.value
        const favorite = e.target.favorite.value
        try {
            const res = await axios.post('/api/profile', {
                mbti,
                favorite,
            })
            window.location.href = '/dashboard'
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <form className="p-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="mbti" className="block mb-2 font-bold text-gray-700">MBTI</label>
                    <select id="mbti" name="mbti" defaultValue={mbti} className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none">
                        <option value="">選択してください</option>
                        <option value="ISTJ">ISTJ</option>
                        <option value="ISFJ">ISFJ</option>
                        <option value="INFJ">INFJ</option>
                        <option value="INTJ">INTJ</option>
                        <option value="ISTP">ISTP</option>
                        <option value="ISFP">ISFP</option>
                        <option value="INFP">INFP</option>
                        <option value="INTP">INTP</option>
                        <option value="ESTP">ESTP</option>
                        <option value="ESFP">ESFP</option>
                        <option value="ENFP">ENFP</option>
                        <option value="ENTP">ENTP</option>
                        <option value="ESTJ">ESTJ</option>
                        <option value="ESFJ">ESFJ</option>
                        <option value="ENFJ">ENFJ</option>
                        <option value="ENTJ">ENTJ</option>
                    </select>
                <div className="mb-4">
                    <label htmlFor="favorite" className="block mb-2 font-bold text-gray-700">お気に入りのもの</label>
                    <input
                        type="text"
                        id="favorite"
                        name="favorite"
                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                        placeholder="お気に入りのものを入力してください"
                    />
                </div>
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">
                    送信
                </button>
            </form>
        </>
    )
}

export default UpdateProfile