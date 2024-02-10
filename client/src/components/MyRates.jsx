import React, { useEffect, useState } from 'react';
import { useUserContext } from '../hooks/useUserContext';
import axios from 'axios';

export default function MyRates() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUserContext();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/post/fetchposts');
        const userPosts = response.data.filter(
          (post) => post.author._id === user.user._id
        );
        setPosts(userPosts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to fetch posts. Please try again later.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const renderPosts = () => {
    return posts.map((post) => (
      <div key={post._id} className="post">
        <p>{post.content}</p>
        <img className="w-32 h-32" src={post.postPic} alt="" />
      </div>
    ));
  };

  const chunkPosts = (array, size) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  };

  const renderChunkedPosts = () => {
    const chunkedPosts = chunkPosts(posts, 3);
    return chunkedPosts.map((chunk, index) => (
      <div key={index} className="grid grid-cols-3 gap-4">
        {chunk.map((post) => (
          <div key={post._id} className="mt-4">
            <img className="w-20 h-20 rounded shadow-md shadow-black" src={post.postPic} alt="" />
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="w-full p-4">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {renderChunkedPosts()}
    </div>
  );
}
