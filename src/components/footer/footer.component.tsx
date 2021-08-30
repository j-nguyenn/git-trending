import React from "react";
import { css } from "@emotion/css";
const footerComponentStyle = () =>
  css`
    label: footer-wrapper;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    img {
      width: 30px;
      height: 30px;
      border-radius: 15px;
      padding-bottom: 8px;
    }
    a {
      text-decoration: none;
      padding-left: 4px;
      color: #a38e80;
    }
  `;
export const FooterComponent = () => {
  return (
    <footer className={footerComponentStyle()}>
      <img src="https://media0.giphy.com/media/mVJ5xyiYkC3Vm/giphy.gif?cid=790b7611ad2812b1ccf7f99cf2e9764d8ac87928c092140a&rid=giphy.gif" />
      <small>
        © 2021 by
        <a href="https://j-nguyenn.github.io/git-trending/">JASMINE NG </a>
      </small>
    </footer>
  );
};
