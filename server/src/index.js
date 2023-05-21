import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";
import { emit } from "process";

dotenv.config();
const app = express();
app.use(
    cors({
        origin: "*",
    })
);
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
    socket.emit("me", socket.id);

    socket.on("disconnect", () => {
        socket.broadcast.emit("callended");
    });

    socket.on("calluser", ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit("calluser", { signal: signalData, from, name });
    });

    socket.on("answercall", (data) => {
        io.to(data.to).emit("callaccepted", data.signal);
    });
});

const port = process.env.CHATNEXUS_PORT ?? 3000;
app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});
