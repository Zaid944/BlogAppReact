import React from "react";
import Button from "@mui/material/Button";
import { signInWithGoogle,signOutWithGoogle } from "../../firebase_setup/firebase";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div
      className='flex justify-between w-full'
      style={{
        backgroundColor: "rgb(84, 68, 123)",
      }}
    >
      <Link to='/'>
        <div
          className='p-4 px-5 ml-10 font-bold text-xl font-mono pt-4'
          style={{ color: "rgb(242, 252, 252)" }}
        >
          BlogApp
        </div>
      </Link>
      <div className='flex space-x-4 p-4 px-5 mr-10'>
        <div>
          <Button
            onClick={signInWithGoogle}
            variant='contained'
            className='text-black'
            style={{ backgroundColor: "rgb(242, 252, 252)" }}
          >
            Sign In
          </Button>
        </div>
        <div>
          <Button
            onClick={signOutWithGoogle}
            variant='contained'
            className='text-black'
            style={{ backgroundColor: "rgb(242, 252, 252)" }}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
