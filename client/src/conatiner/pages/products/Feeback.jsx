import { useState } from "react"
import { Container, TextField, Button, Paper } from "@mui/material"
import axios from "axios";

const CreateFeebck = (props) => {
  const [feedback, setFeedback] = useState('')
  const authToken = localStorage.getItem("token");

  const feedbacHandler = () => {
    let headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + authToken
    };
    const inputData = { comment: feedback };
    axios
      .post(
        process.env.REACT_APP_BASE_URL + "user_api/product/feedback/" + props.product_id ,
        inputData,
        { headers: headers }
      )
      .then((result) => {
        if(!result.data.error) {
          setFeedback("");
          props.setFeedbacks(result.data.body)
        }
        alert(result.data.message)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Paper variant="elevation" elevation={3}
        style={{ padding: "20px 0", width: "70%", marginLeft: "15%" }}
        >

      <h2>
        <strong>Submit You feeedback</strong>
      </h2>
      <TextField
        variant="outlined"
        required
        multiline rows={2}
        type="text"
        size="small"
        value={feedback}
        style={{ width: "90%", margin: "10px" }}
        color="primary"
        onChange={(event) => setFeedback(event.target.value)}
        label="Feedback"
        InputProps={{ style: { fontSize: 20 } }}
        placeholder="enter you feedback..."
      /> <br />
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={feedbacHandler}
      >
        Submit
      </Button>
      </Paper>

    </div>
  )
}

export default CreateFeebck;
