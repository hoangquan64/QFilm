import React, { useState } from "react";
import { styled, TextField, Dialog, DialogTitle, DialogContent, DialogContentText } from "@mui/material";
import { addDocument } from "../../../services/firebaseService";
import { ROLES } from "../../../untils/Contanst";

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
  mb: 2,
  "& .MuiInputBase-input": { color: "white", fontWeight: 500 },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#555" },
    "&:hover fieldset": { borderColor: "#ff7de1" },
    "&.Mui-focused fieldset": { borderColor: "#ff4db0" },
  },
  "& input::placeholder": { color: "#aaa", opacity: 1 },
};

const inner = { name: "", email: "", password: "", confirm: "" ,roler : ROLES.USER };

export default function ModalRegister({ openRegister, handleCloseRegister, handleOpenLogin }) {
  const [isRegister, setIsRegister] = useState(inner);
  const [error, setError] = useState(inner);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsRegister({ ...isRegister, [name]: value });
  };

  const validation = () => {
    const newError = {};
    newError.name = isRegister.name ? "" : "Tên không được để trống";
    newError.email = isRegister.email ? "" : "Email không được để trống";
    newError.password = isRegister.password ? "" : "Mật khẩu không được để trống";
    newError.confirm = isRegister.confirm ? "" : "Vui lòng nhập lại mật khẩu";
    setError(newError);
    return Object.values(newError).every(x => x === "");
  };

  const addRegister = async () => {
    if (!validation()) return;
    await addDocument("accounts", isRegister);
    handleCloseRegister();
  };

  return (
    <BootstrapDialog open={openRegister} onClose={handleCloseRegister} > 
     <DialogTitle>
  <h2 className="text-3xl font-extrabold text-center 
                 text-transparent bg-clip-text 
                 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
                 drop-shadow-[0_4px_20px_rgba(255,0,200,0.7)] 
                 animate-pulse">
    Tạo tài khoản QFILM
  </h2>
</DialogTitle>


      <DialogContent>
        <DialogContentText>
          <div className="space-y-4 mt-4">
            <TextField
              name="name"
              placeholder="Tên hiển thị"
              value={isRegister.name}
              onChange={handleChange}
              error={!!error.name}
              helperText={error.name}
              fullWidth
              sx={textFieldStyle}
            />
            <TextField
              name="email"
              placeholder="Email"
              value={isRegister.email}
              onChange={handleChange}
              error={!!error.email}
              helperText={error.email}
              fullWidth
              sx={textFieldStyle}
            />
            <TextField
              name="password"
              type="password"
              placeholder="Mật khẩu"
              value={isRegister.password}
              onChange={handleChange}
              error={!!error.password}
              helperText={error.password}
              fullWidth
              sx={textFieldStyle}
            />
            <TextField
              name="confirm"
              type="password"
              placeholder="Nhập lại mật khẩu"
              value={isRegister.confirm}
              onChange={handleChange}
              error={!!error.confirm}
              helperText={error.confirm}
              fullWidth
              sx={textFieldStyle}
            />
          </div>

          <button
            onClick={addRegister}
            className="w-full mt-6 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 hover:from-purple-700 hover:via-pink-600 hover:to-indigo-600 p-3 rounded-xl text-white font-bold shadow-xl shadow-pink-500/30 transition transform hover:scale-105"
          >
            Đăng ký tài khoản
          </button>

          <p className="text-center text-gray-400 mt-4 text-sm">
            Đã có tài khoản?
            <span
              onClick={handleOpenLogin}
              className="ml-1 cursor-pointer px-3 py-1 rounded-lg bg-gradient-to-r from-purple-500/30 to-pink-500/30 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition shadow-md hover:shadow-pink-500/50"
            >
              Đăng nhập
            </span>
          </p>
        </DialogContentText>
      </DialogContent>
    </BootstrapDialog>
  );
}
