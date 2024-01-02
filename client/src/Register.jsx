import { useState } from "react";
import logo from "./assets/logo.svg";
import register from "./assets/register.svg";
import { Link } from "react-router-dom";
import user from "./assets/defaultUser.png";
import axios from "axios";
import { useRef } from "react";
import { fb, storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Loader } from "./Loader";
import { useNavigate } from "react-router-dom";

export const Register = ({ setCookie }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [stage, setStage] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showError, setShowError] = useState(true);
  const [username, setusername] = useState(null);
  const [email, setEmail] = useState(null);
  const fileInputRef = useRef(null);
  const [file, setfile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [obj, setObj] = useState({
    username: null,
    email: null,
    profilepic: null,
    password: null,
  });
  const [password, setPassword] = useState(null);
  const [password2, setPassword2] = useState(null);

  const handleFileInputChange = async (e) => {
    setSelectedFile(e.target.files[0]);
    setfile(e.target.files[0]);
  };

  const handleAuth1 = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/checkusername", {
        username: username,
        email: email,
      })
      .then((res) => {
        console.log(res.status);
        let temp = obj;
        temp.username = username;
        temp.email = email;
        setObj(temp);
        setStage(1);
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrorMessage(err.response.data);
        setShowError(true);
      });
  };

  const handleFileAdd = async () => {
    if (file != null) {
      console.log(file);
      setIsLoading(true);
      const imageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(imageRef, file).then((response) => {
        console.log(response);
      });
      try {
        const downloadURL = await getDownloadURL(imageRef);
        console.log(downloadURL);
        let temp = obj;
        temp.username = username;
        temp.email = email;
        temp.profilepic = downloadURL;
        setObj(temp);
        setStage(2);
        setIsLoading(false);
      } catch (error) {
        console.error("Error getting download URL:", error);
      }
    } else {
      const imageRef = ref(storage, `images/defaultUser.png`);
      await uploadBytes(imageRef, file).then((response) => {
        console.log(response);
      });
      try {
        const downloadURL = await getDownloadURL(imageRef);
        console.log(downloadURL);
        let temp = obj;
        temp.username = username;
        temp.email = email;
        temp.profilepic = downloadURL;
        setObj(temp);
        setStage(2);
        setIsLoading(false);
      } catch (error) {
        console.error("Error getting download URL:", error);
      }
    }

    try {
      const downloadURL = await getDownloadURL(imageRef);
      console.log(downloadURL);
      let temp = obj;
      temp.username = username;
      temp.email = email;
      temp.profilepic = downloadURL;
      setObj(temp);
      setStage(2);
      setIsLoading(false);
    } catch (error) {
      console.error("Error getting download URL:", error);
    }
  };

  const handleAuth2 = (e) => {
    e.preventDefault();
    if (password != null && password2 != null) {
      if (password != password2) {
        setErrorMessage("Passwords should match.");
        setShowError(true);
      } else {
        let temp = obj;
        temp.password = password;
        setObj(temp);
        console.log(obj);
        axios.post("http://127.0.0.1:8000/api/register", obj).then((res) => {
          console.log(res);
          if (res.status === 200) {
            setCookie("userId", res.data.rows[0].userid, {
              path: "/",
              secure: true,
            });
            setCookie("email", res.data.rows[0].email, {
              path: "/",
              secure: true,
            });
            setCookie("profilepic", res.data.rows[0].profilepic, {
              path: "/",
              secure: true,
            });
            setCookie("userName", res.data.rows[0].username, {
              path: "/",
              secure: true,
            });
            navigate("/");
          }
        });
      }
    } else {
      setErrorMessage("Password required");
      setShowError(true);
    }
  };
  return isLoading === false ? (
    stage === 0 ? (
      <main>
        <div className="w-screen h-screen flex justify-center items-center bg-background">
          <div className="h-fit w-[25vw] flex flex-col items-center bg-padding form-dark rounded-2xl gap-4 ">
            <div className="w-full border-b-2 flex flex-col items-center border-yellow ">
              <img src={logo} alt="" />
            </div>
            <div>
              <img src={register} alt="" className="w-[100%] h-[5vh]" />
            </div>
            <div className=" flex flex-col w-full p-4 gap-4">
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => {
                  setusername(e.target.value);
                  setShowError(false);
                }}
                className="h-[50px] p-4 bg-[rgb(0,0,0,0.4)]  outline-none text-text rounded-xl active:bg-[rgb(rgb(0,0,0,0.2))]"
              />
              <input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setShowError(false);
                }}
                placeholder="Email"
                className="h-[50px] p-4 bg-[rgb(0,0,0,0.4)] outline-none text-text rounded-xl active:bg-[rgb(rgb(0,0,0,0.2))]"
              />
            </div>
            <div className="w-[100%]">
              <button
                className="bg-highlight p-3  w-[40%] mx-[30%] rounded-xl"
                onClick={(e) => {
                  handleAuth1(e);
                }}
              >
                Next
              </button>
            </div>
            <div className="text-text peer-hover:-translate-y-1">
              <span>
                Already a user?{" "}
                <Link to="/login" className="text-highlight hover:underline ">
                  Login
                </Link>
              </span>
            </div>
            <div className="text-red-800 mb-4">
              <span>{showError ? errorMessage : null}</span>
            </div>
          </div>
        </div>
      </main>
    ) : stage === 1 ? (
      <main>
        <div className="w-screen h-screen flex justify-center items-center bg-background">
          <div className="h-fit w-[25vw] flex flex-col items-center bg-padding form-dark rounded-2xl gap-4 ">
            <div className="w-full border-b-2 flex flex-col items-center border-yellow ">
              <img src={logo} alt="" />
            </div>
            <div>
              <img src={register} alt="" className="w-[100%] h-[5vh]" />
            </div>
            <div className=" flex flex-col justify-center items-center w-full p-4 gap-4">
              <img
                src={selectedFile ? URL.createObjectURL(selectedFile) : user}
                alt="Profile"
                className="w-[200px] h-[200px] relative rounded-[50%]"
              />
              <input
                type="file"
                name=""
                ref={fileInputRef}
                accept="image/"
                onChange={handleFileInputChange}
                className="hidden"
              />
              <button
                onClick={(e) => fileInputRef.current.click(e)}
                className="bg-primarytext w-[70%] px-4 py-2 rounded-2xl text-button"
              >
                {selectedFile ? "Change File" : "Choose file"}
              </button>
            </div>
            <div className=" w-[100%]">
              <button
                className="bg-highlight p-3  w-[40%] mx-[30%] rounded-xl "
                onClick={(e) => {
                  // setStage(2);
                  handleFileAdd();
                  // handleAuth(e);
                }}
              >
                {selectedFile ? "Done" : "Skip"}
              </button>
            </div>

            <div className="text-red-800 mb-4">
              <span>{showError ? errorMessage : null}</span>
            </div>
          </div>
        </div>
      </main>
    ) : (
      <main>
        <div className="w-screen h-screen flex justify-center items-center bg-background">
          <div className="h-fit w-[25vw] flex flex-col items-center bg-padding form-dark rounded-2xl gap-4 ">
            <div className="w-full border-b-2 flex flex-col items-center border-yellow ">
              <img src={logo} alt="" />
            </div>
            <div>
              <img src={register} alt="" className="w-[100%] h-[5vh]" />
            </div>
            <div className=" flex flex-col w-full p-4 gap-4">
              <input
                type="password"
                placeholder="Enter password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setShowError(false);
                }}
                className="h-[50px] p-4 bg-[rgb(0,0,0,0.4)]  outline-none text-text rounded-xl active:bg-[rgb(rgb(0,0,0,0.2))]"
              />
              <input
                type="password"
                onChange={(e) => {
                  setPassword2(e.target.value);
                  setShowError(false);
                }}
                placeholder="Reenter password"
                className="h-[50px] p-4 bg-[rgb(0,0,0,0.4)] outline-none text-text rounded-xl active:bg-[rgb(rgb(0,0,0,0.2))]"
              />
            </div>
            <div className="w-[100%]">
              <button
                className="bg-highlight p-3  w-[40%] mx-[30%] rounded-xl"
                onClick={(e) => {
                  handleAuth2(e);
                }}
              >
                Register
              </button>
            </div>

            <div className="text-red-800 mb-4">
              <span>{showError ? errorMessage : null}</span>
            </div>
          </div>
        </div>
      </main>
    )
  ) : (
    <Loader />
  );
};
