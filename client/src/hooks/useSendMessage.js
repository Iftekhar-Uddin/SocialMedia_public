import { useState, useContext} from "react";
import useConversation from "../zustand/useConversation";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import VarificationRequest from '../VarificationRequest/VarificationRequest.js'
// import toast from "react-hot-toast";

const useSendMessage = () => {
	const {user} = useContext(AuthContext);
	const axiosPrivate = VarificationRequest();
	const userId = user.result._id;
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();
	const api = process.env.REACT_APP_API_KEY;
	console.log(selectedConversation)

	const sendMessage = async (message) => {
		setLoading(true);
		try {
			const data = await axiosPrivate.post(`${api}/messages/send/${selectedConversation?._id}`, {message, userId });
			// 	method: "POST",
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 	},
			// 	body: JSON.stringify({ message, userId }),
			// });
			// const data = await res.data.json();
			if (data.error) throw new Error(data.error);
			setMessages([...messages, data?.data]);

		} catch (error) {
			console.log(error.message);
			// toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};
export default useSendMessage;
