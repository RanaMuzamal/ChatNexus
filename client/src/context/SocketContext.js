import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  createContext,
} from "react";
import { io } from "socket.io-client";
import peer from "simple-peer";

const SocketContext = createContext();
const socket = io("http://localhost:5173/");
export const ContextProvider = ({ children }) => {
  const [stream, setStream] = uSeState(null);
  const [me, setMe] = useState("");
  const [name, setsetName] = useState("");
  const [callAccepted, setCallAccepted] = useState(false);
  const [callended, setCallEnded] = useState(false);
  const [call, setCall] = useState({});

  const myVedio = useRef();
  const userVedio = useRef();
  const connectionRef = useRef();
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVedio.current.srcObject = currentStream;
      });

    socket.on("me", (id) => setMe(id));
    socket.on("calluser", ({ from, name: callerName, signal }) => {
      setCall({ isRecievedCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answercall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVedio.current.srcObject = currentStream;
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signa;", (data) => {
      socket.emit("calluser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });
    peer.on("stream", (currentStream) => {
      userToCall.current.srcObject = currentStream;
    });

    socket.on("callaccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };
  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVedio,
        userVedio,
        stream,
        name,
        setName,
        callended,
        me,
        answerCall,
        callUser,
        leaveCall,
      }}
    ></SocketContext.Provider>
  );
};
