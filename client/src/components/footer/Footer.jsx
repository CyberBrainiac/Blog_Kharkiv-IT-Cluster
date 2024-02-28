import React from "react";
import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__copyright">
          <p>Create by Arsenii Arkhypov</p>
          <p>Email: <a href="mailto:arsenij.arxipov.1998@gmail.com">arsenij.arxipov.1998@gmail.com</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;