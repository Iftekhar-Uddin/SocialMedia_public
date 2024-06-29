import { useEffect, useState, useContext } from "react";
import axios from "axios"
import VarificationRequest from '../VarificationRequest/VarificationRequest.js'
// import toast from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext/AuthContext";

const useGetConversations = () => {
	const {user} = useContext(AuthContext)
	const axiosPrivate = VarificationRequest();
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);
	const userId = user.result._id;
	console.log(conversations);

	useEffect(() => {
		const getConversations = async () => {
		  setLoading(true);
		  try {
			const res = await axiosPrivate.get(`/users/friends/${userId}`);
			// const data = await res.json();
			setConversations(res.data);
		  } catch (err) {
			console.log(err);
		  }finally {
			setLoading(false);
			}
		};
		getConversations();
	}, []);

	return { conversations, loading };
};
export default useGetConversations;
