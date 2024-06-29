import { createContext, useState, useEffect, useContext } from "react";
import {AuthContext} from "./AuthContext/AuthContext"
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const {user} = useContext(AuthContext);
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	console.log(onlineUsers);

	useEffect(() => {
		if (user) {
			const socket = io(process.env.REACT_APP_API_BASE_KEY, {
				query: {
					userId: user?.result?._id,
				},
			});

			setSocket(socket);

			// socket.on() is used to listen to the events. can be used both on client and server side
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [user]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
