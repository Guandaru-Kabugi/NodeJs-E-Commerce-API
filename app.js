import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/users/userRoutes.js";
//import blogRouter from "./routes/blogRoutes.js";
//import authenticateUser from "./middlewares/auth.js";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./utils/swagger.js";


dotenv.config();

const app = express();

// ─── Middleware ───────────────────────────────────────────────
app.use(express.json());          // parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // parse form data
//app.use(cookieParser());          // needed to read req.cookies.refreshToken


//swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
// ─── Routes ──────────────────────────────────────────────────
app.use("/api/v1/users", userRouter);
//app.use("/api/blogs", authenticateUser, blogRouter); // all blog routes protected

// ─── 404 Handler ─────────────────────────────────────────────
app.use((req, res, next) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

// ─── Global Error Handler ─────────────────────────────────────
app.use((err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  console.error(err); // log unexpected errors server-side only
  res.status(500).json({ error: "Something went wrong. Please try again later." });
});

// ─── Start Server ─────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;