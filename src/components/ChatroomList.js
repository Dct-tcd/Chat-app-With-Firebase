import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
function ChatroomList() {
  const List = [
    { id: "Programming", title: "🐶 Programming 🐶" },
    { id: "food", title: "🍔 Food 🍔" },
    { id: "general", title: "💬 General 💬" },
    { id: "news ", title: "🗞 News 🗞   " },
    { id: "music", title: "🎹 Music 🎹" },
    { id: "Cricket", title: " 🏏 Cricket 🏏"},
  ];
  return (
    <div style={{
        display: "flex",
          justifyContent:"center",
          flexWrap: "wrap",
          padding: "200px",
          color: "lavender",
        }}>
      {List.map((e) => {
        return (
          <>
            <div
              style={{
                color: "lavender",
              }}
            >
              <div className="op" style={{ width:"170px", border: "solid", padding: "25px", margin: "5px" , }}>
                {/* <h5 className="card-title">{e.title}</h5> */}
                <Link style={{ color: "cyan" }} to={`/room/${e.id}}`}>
                  {e.title}
                </Link>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default ChatroomList;
