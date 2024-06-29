import { useContext } from "react";
import { AuthContext } from "../src/Context/AuthContext/AuthContext";


const FormSource = () => {
  const {user, dispatch} = useContext(AuthContext);

  return (
     [
      {
        id: "username",
        label: "Username",
        type: "text",
        placeholder: (user.result.username),
      },
      {
        id: "email",
        label: "Email",
        type: "email",
        placeholder: (user.result.email),
      },
      {
        id: "phone",
        label: "Phone",
        type: "text",
        placeholder: (user.result.phone),
      },
      {
        id: "password",
        label: "Password",
        type: "password",
      },
      {
        id: "date_of_birth",
        label: "Date of Birth",
        type: "text",
        placeholder: (user.result.date_of_birth),
      },
      {
          id: "city",
          label: "City",
          type: "text",
          placeholder: (user.result.city),
      },
      {
          id: "country",
          label: "Country",
          type: "text",
          placeholder: (user.result.country),
      },
      {
          id: "relationship",
          label: "Relationship",
          type: "text",
          placeholder: (user.result.relationship),
      },
      {
          id: "religion",
          label: "Religion",
          type: "text",
          placeholder: (user.result.religion),
      },
      {
          id: "home",
          label: "Home",
          type: "text",
          placeholder: (user.result.home),
      },
  
      {
        id: "post_code",
        label: "Post_code",
        type: "text",
        placeholder: (user.result.post_code),
      },
      {
          id: "village",
          label: "Village",
          type: "text",
          placeholder: (user.result.village),
        },
        {
          id: "secondary_study",
          label: "Secondary_study",
          type: "text",
          placeholder: (user.result.secondary_study),
        },
        {
          id: "higher_study",
          label: "Higher_study",
          type: "text",
          placeholder: (user.result.higher_study),
        },
        {
          id: "idol",
          label: "Idol",
          type: "text",
          placeholder: (user.result.idol),
        },
        {
          id: "job_institution",
          label: "Job_institution",
          type: "text",
          placeholder: (user.result.job_institution),
        },
        {
          id: "job_location",
          label: "Job_location",
          type: "text",
          placeholder: (user.result.job_location),
        },
    ]
  )
}

export default FormSource


// const access = () => {
//   const {user} = useContext(AuthContext);
// }
// export const userInputs = [

//     {
//       id: "username",
//       label: "Username",
//       type: "text",
//       placeholder: (access.user),
//     },
//     {
//       id: "email",
//       label: "Email",
//       type: "email",
//       placeholder: "iftekharuddin720@gmail.com",
//     },
//     {
//       id: "phone",
//       label: "Phone",
//       type: "text",
//       placeholder: "01731615141",
//     },
//     {
//       id: "password",
//       label: "Password",
//       type: "password",
//     },
//     {
//         id: "city",
//         label: "City",
//         type: "text",
//         placeholder: "Noaklhali",
//     },
//     {
//         id: "country",
//         label: "Country",
//         type: "text",
//         placeholder: "Bangladesh",
//     },
//     {
//         id: "relationship",
//         label: "Relationship",
//         type: "number",
//         placeholder: "1",
//     },
//     {
//         id: "religion",
//         label: "Religion",
//         type: "text",
//         placeholder: "Islam",
//     },
//     {
//         id: "home",
//         label: "Home",
//         type: "text",
//         placeholder: "Ismail_Monzil_534",
//     },

//     {
//       id: "post_code",
//       label: "Post_code",
//       type: "text",
//       placeholder: "3807",
//     },
//     {
//         id: "village",
//         label: "Village",
//         type: "text",
//         placeholder: "Narashinghapur",
//       },
//       {
//         id: "secondary_study",
//         label: "Secondary_study",
//         type: "text",
//         placeholder: "Kabirhat Model High School",
//       },
//       {
//         id: "higher_study",
//         label: "Higher_study",
//         type: "text",
//         placeholder: "Daffodil International University",
//       },
//       {
//         id: "idol",
//         label: "Idol",
//         type: "text",
//         placeholder: "Hz. Muhammad (sm)",
//       },
//       {
//         id: "job_institution",
//         label: "Job_institution",
//         type: "text",
//         placeholder: "Iftekhar_IT_Solution Ltd.",
//       },
//       {
//         id: "job_location",
//         label: "Job_location",
//         type: "text",
//         placeholder: "Dhaka",
//       },
//   ];