import React, { useRef , useState , useEffect} from 'react';
import { Box } from "@mui/material";
import Header from "../../components/login/start/Header";
import LoginOverlay from "../../components/login/LoginOverlay";
import emailjs from '@emailjs/browser';
import styled from 'styled-components'


const ContactUs = () => {
  const form = useRef();
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(process.env.REACT_APP_SERVICE_KEY, process.env.REACT_APP_TEMPLATE_KEY, form.current, process.env.REACT_APP_API_KEY)
      .then((result) => {
        console.log(result.text);
        setSubmissionStatus('success'); // Set submission status to success
        resetForm(); // Reset the form fields after successful submission
      })
      .catch((error) => {
        console.log(error.text);
        setSubmissionStatus('error'); // Set submission status to error
      });
  };

  const resetForm = () => {
    form.current.reset();
  };

  useEffect(() => {
    if (submissionStatus === 'success') {
      const timeout = setTimeout(() => {
        setSubmissionStatus(null); // Hide the popout message after a certain time
      }, 3000); // 3000ms = 3 seconds

      return () => clearTimeout(timeout); // Clear the timeout when component unmounts
    }
  }, [submissionStatus]);

  return (
    <Box>
      <LoginOverlay />
      <Header />
      <Box
        paddingLeft={"50px"}>
      <StyledContactForm margin="20px">
            {submissionStatus === 'success' && (
            <PopoutMessage>Message sent</PopoutMessage>
            )}
            <form ref={form} onSubmit={sendEmail}>
            <label>Name</label>
            <input type="text" name="user_name" />
            <label>Email</label>
            <input type="email" name="user_email" />
            <label>Message</label>
            <textarea name="message" />
            <input type="submit" value="Send" />
            </form>
        </StyledContactForm>
      </Box>
        
    </Box>
  );
};

const StyledContactForm = styled.div`
  width: 400px;

  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 20px;

    input {
      width: 100%;
      height: 35px;
      padding: 20px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 5px solid #AEAEFF;
      }
    }

    textarea {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      max-height: 100px;
      min-height: 100px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 5px solid #AEAEFF;
      }
    }

    label {
      margin-top: 1rem;
    }

    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: #AEAEFF;
      color: black;
      border: none;
    }
  }
`;

const PopoutMessage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(0, 150, 60);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 9999;
  cursor: pointer;
`;

export default ContactUs;





// const ContactUs = () => {
//   const form = useRef();
//   const [submissionStatus, setSubmissionStatus] = useState(null);

//   const sendEmail = (e) => {
//     e.preventDefault();

//     emailjs.sendForm('service_mm', 'template_99mtl2p', form.current, '0-oGwSIJsRRisDUzi')
//       .then((result) => {
//         console.log(result.text);
//         setSubmissionStatus('success'); // Set submission status to success
//       })
//       .catch((error) => {
//         console.log(error.text);
//         setSubmissionStatus('error'); // Set submission status to error
//       });
//   };

//   const hideSubmissionMessage = () => {
//     setSubmissionStatus(null); // Reset submission status
//   };

//   return (
//     <Box>
//       <LoginOverlay />
//       <Header />
//       <StyledContactForm>
//         {submissionStatus === 'success' && (
//           <PopoutMessage onClick={hideSubmissionMessage}>Message sent</PopoutMessage>
//         )}
//         <form ref={form} onSubmit={sendEmail}>
//           {<form ref={form} onSubmit={sendEmail}>
//                 <label>Name</label>
//                 <input type="text" name="user_name" />
//                 <label>Email</label>
//                 <input type="email" name="user_email" />
//                 <label>Message</label>
//                 <textarea name="message" />
//             </form>}
//           <input type="submit" value="Send" />
//         </form>
//       </StyledContactForm>
//     </Box>
//   );
// };

// const PopoutMessage = styled.div`
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   background-color: rgb(0, 150, 60);
//   color: white;
//   padding: 10px 20px;
//   border-radius: 5px;
//   z-index: 9999;
//   cursor: pointer;
// `;

// const StyledContactForm = styled.div`
//   width: 400px;

//   form {
//     display: flex;
//     align-items: flex-start;
//     flex-direction: column;
//     width: 100%;
//     font-size: 16px;

//     input {
//       width: 100%;
//       height: 35px;
//       padding: 7px;
//       outline: none;
//       border-radius: 5px;
//       border: 1px solid rgb(220, 220, 220);

//       &:focus {
//         border: 2px solid rgba(0, 206, 158, 1);
//       }
//     }

//     textarea {
//       max-width: 100%;
//       min-width: 100%;
//       width: 100%;
//       max-height: 100px;
//       min-height: 100px;
//       padding: 7px;
//       outline: none;
//       border-radius: 5px;
//       border: 1px solid rgb(220, 220, 220);

//       &:focus {
//         border: 2px solid rgba(0, 206, 158, 1);
//       }
//     }

//     label {
//       margin-top: 1rem;
//     }

//     input[type="submit"] {
//       margin-top: 2rem;
//       cursor: pointer;
//       background: #AEAEFF;
//       color: black;
//       border: none;
//     }
//   }
// `;

// export default ContactUs;