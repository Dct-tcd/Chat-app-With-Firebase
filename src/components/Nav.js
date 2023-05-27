import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <nav
        style={{
          backgroundColor: "lightslategray",
          padding: "2%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link to="#">
          <img
            src={
              "https://www.shareicon.net/data/2015/08/10/83196_chat_1024x1024.png"
            }
          />
        </Link>
        <Link
          to="/rooms"
          style={{ color: "floralwhite", marginLeft: "3%", marginRight: "1%" }}
        >
          {" "}
          Text Channels{" "}
        </Link>
        <Link
          to="/vrooms"
          style={{ color: "floralwhite", marginLeft: "1%", marginRight: "3%" }}
        >
          {" "}
          Voice Channels{" "}
        </Link>
      </nav>
    </div>
  );
}

export default Nav;
