import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

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
    <div className="add">
      <div className="content">
        <input
          className="content__title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="content__description"
          type="text"
          placeholder="write down what you're thinking about"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <div className="menu">
        <div className="buttons">
          <button onClick={handleClick}>Publish</button>
        </div>
      </div>
    </div>
  );
};

export default Write;