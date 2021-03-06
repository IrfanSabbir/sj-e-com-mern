import React from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export default function DeleteContaier(props) {
  const deleteProduct = () => {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    axios
      .delete(
        process.env.REACT_APP_BASE_URL +
          `admin_api/product/${props.product._id}`,
        { headers: headers }
      )
      .then((res) => {
        alert("product is deleted");
        props.handleDeletedProduct(props.product._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Dialog
        onClose={() => props.handleClose(false)}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={() => props.handleClose(false)}
        />
        <DialogContent
          style={{
            color: "red",
            fontSize: "20px",
            paddingBottom: "20px",
            textAlign: "center",
          }}
        >
          <p>
            Are you sure you want to delete "<b>{props.product.title}</b>"?
          </p>
          <Button
            variant="contained"
            style={{ textTransform: "none" }}
            onClick={deleteProduct}
            color="warning"
          >
            Delete This Product
          </Button>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => props.handleClose(false)}
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
