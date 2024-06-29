import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
// import multer from 'multer';
// import path from 'path';
// import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { app, server } from "./socket/socket.js";
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import messagesRoutes from './routes/messages.js';
import verify from './middleware/middleware.js'
// import conversationsRoutes from './routes/conversations.js';


// const app = express();
// app.use(express.json());
// app.use(cors());

app.use(express.json());
const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use("/images", express.static(path.join(__dirname, "public/images")));
dotenv.config();


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "public/images");
//     },
//     filename: (req, file, cb) => {
//       cb(null, req.body.name);
//     },
// });
  
// const upload = multer({ storage: storage });
//   app.post("/api/upload", upload.single("file"), (req, res) => {
//     try {
//       return res.status(200).json("File uploded successfully");
//     } catch (error) {
//       console.error(error);
//     }
// });


// app.use('/api/conversations', conversationsRoutes);
app.use('/api/auth', authRoutes);
app.use('/posts', verify, postRoutes);
app.use('/users', verify, userRoutes);
app.use('/api/messages', messagesRoutes);

const CONNECTION_URL = (process.env.MONGODB_SERVER);

const PORT = process.env.PORT || 5000;
mongoose.connect(CONNECTION_URL)
  .then(()=> server.listen(PORT, ()=> console.log(`Server is running on port: ${PORT}`)))
  .catch((error) =>console.log(error.message));
