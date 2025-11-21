## cài dự án với vite
npm create vite@latest
## cài tailwincss 
npm install tailwindcss @tailwindcss/vite
- Sửa file vite.config.js như này ( code dán hết phần này thay vào )

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
})

- Coppy  @import "tailwindcss"; thay vào file index.css ( xoá tất cả phần cũ )
- App.css xoá hết css cũ của họ
## Cài Mui UI 
- npm install @mui/material @emotion/react @emotion/styled
## Cài React Icon 
- npm install react-icons --save
## Cài react router dom
- npm i react-router-dom
## Cài swiper
- npm i swiper