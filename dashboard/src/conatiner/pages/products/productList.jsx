import React, { useState, useEffect } from "react";
import {
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import DeleteContaier from "./deleteProduct";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "thumbnail", label: "Thumb", minWidth: 70 },
  { id: "title", label: "Title", minWidth: 70 },

  { id: "description", label: "Description", minWidth: 150 },

  {
    id: "status",
    label: "Status",
    minWidth: 20,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "action",
    label: "Action",
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];

const ProductList = () => {
  const [loader, setLoader] = useState(false);
  const [products, setProducts] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [product, setProduct] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      setLoader(true);
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      };
      const result = await axios.get(
        process.env.REACT_APP_BASE_URL + `admin_api/product/list/`,
        { headers: headers }
      );
      setProducts(result.data.body);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      setProducts([]);

      alert(error.response.data.message);
    }
  };

  const createData = (product) => {
    const title = product.title;
    const status = product.status ? "Active" : "Unactive";
    const description = product.description;
    const thumbnail = product.thumbnail ? (
      <img
        src={process.env.REACT_APP_BASE_URL + product.thumbnail}
        alt={product.title}
        width="70px"
        height="70px auto"
        style={{ borderRadius: "50%", border: "1px solid blue" }}
      />
    ) : (
      "No Thumbnail"
    );

    const action = (
      <div style={{ display: "flex" }}>
        <Button
          color="success"
          onClick={() => navigate("/update/" + product._id)}
        >
          Update
        </Button>
        <Button
          color="warning"
          onClick={() => {
            setProduct(product);
            setDeleteModal(true);
          }}
        >
          Delete
        </Button>
      </div>
    );

    return { thumbnail, title, description, status, action };
  };

  const rows = [];

  products &&
    products.map((product, index) => {
      return (
        <div key={index}>
          {product && rows.push(createData({ ...product, key: index }))}
        </div>
      );
    });
  if (loader) return <p>Loading....</p>;

  return (
    <div style={{ marginTop: "20px", width: "100%" }}>
      <h2>
        <strong>Products List</strong>
      </h2>
      {deleteModal && (
        <DeleteContaier
          open={deleteModal}
          handleClose={setDeleteModal}
          product={product}
        />
      )}
      {!loader && (
        <Paper>
          <TableContainer style={{ minWidth: "500px" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        backgroundColor: "#007bff",
                        color: "white",
                        fontSize: "20px",
                        fontWeight: "bolder",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column, index) => {
                        const value = row[column.id];

                        return (
                          <TableCell key={index} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </div>
  );
};

export default ProductList;
