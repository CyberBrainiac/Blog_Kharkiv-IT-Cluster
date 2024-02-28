import React, { useState } from "react";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import './write.scss';

const Write = () => {
  const state = useLocation().state;
  const [desc, setDesc] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: desc,
          })
        : await axios.post(`/posts/`, {
            title,
            desc: desc,
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="write">
      <div className="write__container">
        <div className="content">
          <div className="content__elem">
            <p>Title:</p>
            <input
              className="content__title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="content__elem">
            <p>Description:</p>
            <textarea
              className="content__description"
              type="text"
              placeholder="write down what you're thinking about"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
        </div>
        <div className="menu">
          <div className="menu__buttons">
            <button onClick={handleClick}>Publish post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;