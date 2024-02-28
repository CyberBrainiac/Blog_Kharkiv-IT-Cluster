import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";
import './home.scss';

const Home = () => {
  const [posts, setPosts] = useState([]);

  // Getting the current URL query string (if any) using the useLocation hook from react-router-dom
  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="home">
      <div className="home__container">
        <div className="home__posts-wrap">
          {posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="post__content">
                <h3 className="post__title">{post.title}</h3>
                <p className="post__date">            
                  <span>{post.username}</span> {" "}
                  <span>{post.usersurname}</span> {" "}
                  posted:{" "}
                  {moment(post.date).fromNow()}
                </p>
                <p>{getText(post.desc)}</p>
                <div className="post__btn">
                  <Link to={`/post/${post.id}`}>
                    <button>Read More</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;