import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled, TextField } from "@mui/material";
import { addDocument } from "../../../services/firebaseService";
import { useContext } from "react";
import { AccountContext } from "../../../contexts/AccountProvider";
import { AuthContext } from "../../../contexts/AuthProvider";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiPaper-root": {
        backgroundColor: "#111111",        // nền tối sang trọng
        borderRadius: "20px",              // bo góc mềm mại
        width: "500px",
        maxWidth: "90%",
        border: "1px solid #333",
        boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
        padding: theme.spacing(3),
    },
}));

const textFieldStyle = {
  "& .MuiInputBase-input": { color: "white", fontWeight: 500 },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#555" },
    "&:hover fieldset": { borderColor: "#ff7de1" },
    "&.Mui-focused fieldset": { borderColor: "#ff4db0" },
  },
  "& input::placeholder": { color: "#aaa", opacity: 1 },
};
const inner = { email: "", password: "" }

function ModalLogin({ openLogin, handleCloseLogin, handleOpenRegister }) {
    const [showPassword, setShowPassword] = useState(false);
    const [isLogin, setIsLogin] = useState(inner);
    const [error, setError] = useState(inner);
    const accounts = useContext(AccountContext);
    const { saveLogin } = useContext(AuthContext);
    const handleChange = (e) => {
        setIsLogin({ ...isLogin, [e.target.name]: e.target.value });
    };
    const addLogin = async () => {

        if (!validation()) {
            console.log(error);
            return;
        }
        const checkAcc = accounts.find(e => e.password == isLogin.password && e.email == isLogin.email);
        if(!checkAcc) {
           alert("tai toan ko ton tai");
           return;
        }
        alert("dang nhap thanh cong");
        saveLogin(checkAcc);
        handleCloseLogin();
    }
    const validation = () => {
        const newError = {};
        newError.email = isLogin.email ? "" : "Email is required";
        newError.password = isLogin.password ? "" : "Password is required";
        setError(newError);
        return Object.values(newError).every(x => x === "");
    }


    if (!openLogin) return null;
    return (
        <>
            <React.Fragment>
                <BootstrapDialog
                    open={openLogin}
                    onClose={handleCloseLogin}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth="lg"
                >
                    <DialogTitle id="alert-dialog-title">

                        <h2 className="text-3xl font-extrabold mb-5 text-center 
                 bg-clip-text text-transparent 
                 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
                 drop-shadow-[0_2px_10px_rgba(255,0,200,0.7)]">
                            Đăng nhập QFILM
                        </h2>
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {/* Form */}

                            <TextField
                                value={isLogin.email}
                                error={!!error.email}
                                helperText={error.email}
                                onChange={handleChange}
                                type="email"
                                name="email"
                                sx={textFieldStyle}
                                placeholder="Email"
                                fullWidth

                            />
                            <div className="relative my-4">
                                <TextField
                                    value={isLogin.password}
                                    error={!!error.password}
                                    helperText={error.password}
                                    onChange={handleChange}
                                    sx={textFieldStyle}
                                    type="password"
                                    name="password"
                                    placeholder="Mật khẩu"
                                    fullWidth

                                />
                                {/* Show / hide password */}
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white select-none"
                                >
                                    {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                                </span>
                            </div>

                            {/* Quên mật khẩu */}
                            <div className="text-right">
                                <a href="#" className="text-sm text-blue-400 hover:underline">
                                    Quên mật khẩu?
                                </a>
                            </div>
                            {/* Login Button */}
                            <button onClick={addLogin}  className="w-full mt-6 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 hover:from-purple-700 hover:via-pink-600 hover:to-indigo-600 p-3 rounded-xl text-white font-bold shadow-xl shadow-pink-500/30 transition transform ">
                                Đăng nhập
                            </button>

                            {/* OR divider */}
                            <div className="flex items-center my-3">
                                <div className="flex-grow h-[1px] bg-gray-600"></div>
                                <span className="mx-2 text-gray-400 text-sm">hoặc</span>
                                <div className="flex-grow h-[1px] bg-gray-600"></div>
                            </div>

                            {/* Google Login */}
                            <button className="w-full flex items-center justify-center gap-2 border border-gray-600 p-3 rounded-xl hover:bg-gray-700 transition text-white font-medium">
                                <FcGoogle size={20} />
                                Đăng nhập với Google
                            </button>
                            {/* Switch to Register */}
                            <p className="text-center text-gray-400 mt-4 text-sm">
                                Chưa có tài khoản?
                                <span onClick={handleOpenRegister}
                                    className="cursor-pointer ml-1 px-2 py-1 rounded-lg bg-gradient-to-r from-purple-500/40 to-pink-500/40 hover:from-purple-600 hover:to-pink-600 text-white transition shadow-md hover:shadow-purple-500/40"
                                >
                                    Đăng ký ngay
                                </span>
                            </p>
                        </DialogContentText>
                    </DialogContent>


                </BootstrapDialog>
            </React.Fragment>

        </>
    );
}

export default ModalLogin;
