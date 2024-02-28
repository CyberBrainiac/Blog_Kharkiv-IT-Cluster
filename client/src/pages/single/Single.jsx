import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import DeleteImage from "../../assets/images/delete.png";
import { AuthContext } from "../../context/authContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import EditImage from "../../assets/images/edit.png";
import './single.scss';

const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="single">
      <div className="single__container">
        <div className="user">
          <div className="user__info">
            <span>{post.username}</span> {" "}
            <span>{post.usersurname}</span>
            <p className="user__date">Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (
            <div className="user__control">
              <Link to={`/write?edit=2`} state={post}>
                <img src={EditImage} alt="edit" />
              </Link>
              <img onClick={handleDelete} src={DeleteImage} alt="delete" />
            </div>
          )}
        </div>
        <h3 className="single__title">{post.title}</h3>
        <p className="single__description">{post.desc}</p>
      </div>
    </div>
  );
};

export default Single;