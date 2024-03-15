import React from "react";

function Header({mentor}) {
  console.log(mentor.name);
  return (
    <>
      <div className="navbar bg-slate-500">
        <div className="btn btn-ghost text-xl text-white hover:bg-slate-500">Welcome {mentor.name}</div>
      </div>
    </>
  );
}

export default Header;
