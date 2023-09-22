import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  Box,
} from "@mui/material";

const Buyuserdetails = ({ userOrder }) => {
  return (
    <div style={{ margin: "50px 0px" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order Date</TableCell>
              <TableCell>Payment Type</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userOrder.map((order) => (
              <React.Fragment key={order._id}>
                <TableRow>
                  <TableCell>
                    {new Date(order.orderDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{order.paymentType}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>{order.items[0].title}</TableCell>
                  <TableCell>{order.items[0].author}</TableCell>
                </TableRow>
                {order.items.slice(1).map((item) => (
                  <TableRow key={item._id}>
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.author}</TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Buyuserdetails;
