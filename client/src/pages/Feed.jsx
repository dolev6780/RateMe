import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using axios for HTTP requests
import {useUserContext} from '../hooks/useUserContext'
import Post from '../components/Post';
export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {user} = useUserContext();
  useEffect(() => {
    // Fetch posts from your API
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/post/fetchposts'); // Adjust the API endpoint accordingly
        // Assuming the response contains an array of posts
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
  }, [user?.user._id]); // Fetch posts only once on component mount

  return (
    <div className='w-full p-4 h-[150vh]'>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="posts">
        {posts.map(post => (
          <div key={post._id} className="mb-10">
            <Post post={post}/>
          </div>
        ))}
      </div>
    </div>
  );
}
