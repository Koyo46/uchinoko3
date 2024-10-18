import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'

const Post = () => {
    const [posts, setPosts] = useState([])

    const fetchPosts = async () => {
        try {
            const res = await axios.get('/api/post')
            setPosts(res.data)
        } catch (error) {
            console.error('投稿の取得に失敗しました:', error)
        }
    }

    useEffect(() => {
        fetchPosts()
        console.log(posts);
    }, [])

    const handleReply = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/api/reply', { conversation_id: e.target.value })
        console.log(res);
        window.location.href = '/dashboard'
    } catch (error) {
        console.error(error)
        }
    }

    return (
        <>
            {posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((post, index) => (
                <div key={index} className="bg-white shadow-md rounded p-4 mb-4">
                    <div className="mb-4">
                        <div className="flex items-center mb-2">
                            <img
                                className="w-10 h-10 rounded-full mr-2"
                                src="https://via.placeholder.com/150"
                                alt="ユーザーアバター"
                            />
                            <div>
                                <h2 className="font-semibold text-md">{post.user.name}</h2>
                                <p className="text-gray-500 text-sm">{new Date(post.created_at).toLocaleString()}</p>
                            </div>
                        </div>
                        <p className="text-gray-700">{post.content}</p>
                    </div>
                    <button onClick={handleReply} value={post.conversation_id} className="bg-gray-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        返信する
                    </button>
                </div>
            ))}
        </>
    )
}

export default Post