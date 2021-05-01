import React from "react";

const Home = () => {
  return (
    <div>
      <div className="">
        <div className="row  mt-1">
          <div className="col-sm-7 ">
            <img
              width="100%"
              height="600px"
              src="https://images-na.ssl-images-amazon.com/images/I/71NSKu56OrL.jpg"
            ></img>
          </div>
          <div className="offset-sm-1 col-sm-3 mt-4">
            <span
              style={{
                color: "lightgray",
                fontStyle: "italic",
                fontSize: "35px",
              }}
              className=""
            >
              Welcome to the platform where you can manage your money!
            </span>
            <br></br>
            <p
              className="mt-4 text-success"
              style={{
                fontWeight:"400",
                fontSize:"20px",
                fontStyle:"italic"
              }}
            >
              create your own custom categories, store your data safely on the
              server in your own format , fetch the details at anytime from
              anywhere , get Your saving options and much more!
            </p>
          </div>
          <div className="col-sm-1"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
