import { useEffect, useState, useContext } from "react";
import useConversation from "../zustand/useConversation";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import axios from "axios"
import VarificationRequest from '../VarificationRequest/VarificationRequest.js'
// import toast from "react-hot-toast";

const useGetMessages = () => {
	const {user} = useContext(AuthContext);
	const axiosPrivate = VarificationRequest();
	const userId = user.result._id;
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();
	const api = process.env.REACT_APP_API_KEY;
	console.log(messages);

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const data = await axios.get(`${api}/messages/${selectedConversation?._id}/?userId=${userId}`);
				// const data = await res.data.json();
				if (data.error) throw new Error(data.error);
				setMessages(data.data);

			} catch (error) {
				console.log(error.message);
				// toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};
export default useGetMessages;
