import React, { useState, useEffect } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import Form from "../../Layouts/Form";
import {
  Button as MuiButton,
  ButtonGroup,
  Grid,
  InputAdornment,
  makeStyles,
} from "@material-ui/core";
import Input from "../../Controls/Input";
import Select from "../../Controls/Select";
import Button from "../../Controls/Button";
import ReplayIcon from "@material-ui/icons/Replay";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ReorderIcon from "@material-ui/icons/Reorder";

const pMethods = [
  { id: "none", title: "Select" },
  { id: "Cash", title: "Cash" },
  { id: "Card", title: "Card" },
];

const useStyles = makeStyles((theme) => ({
  adornmentText: {
    "& .MuiTypography-root": {
      color: "#118C4F",
      fontWeight: "bolder",
      fontSize: "1.5em",
    },
  },
  submitButtonGroup: {
    backgroundColor: "#11AF4F",
    color: "#000",
    margin: theme.spacing(1),
    "& .MuiButton-label": {
      textTransform: "none",
    },
    "&:hover": {
      backgroundColor: "#11AF4F",
    },
  },
}));

export default function OrderForm(props) {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  } = props;
  const classes = useStyles();

  const [customerList, setCustomerList] = useState([]);
  const [orderId, setOrderId] = useState(0);

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.CUSTOMER)
      .fetchAll()
      .then((res) => {
        let customerList = res.data.map((item) => ({
          id: item.customerId,
          title: item.customerName,
        }));
        customerList = [{ id: 0, title: "Select" }].concat(customerList);
        setCustomerList(customerList);
      })
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   let gTotal = values.orderDetails.reduce((tempTotal, item) => {
  //     return tempTotal + item.quantity * item.foodItemPrice;
  //   }, 0);
  //   setValues({
  //     ...values,
  //     gTotal: roundTo2DecimalPoint(gTotal),
  //   });
  // }, [JSON.stringify(values.orderDetails)]);

  useEffect(() => {
    if (orderId == 0) resetFormControls();
    else {
      createAPIEndpoint(ENDPOINTS.ORDER)
        .fetchById(orderId)
        .then((res) => {
          setValues(res.data);
          setErrors({});
        })
        .catch((err) => console.log(err));
    }
  }, [orderId]);

  return (
    <Form>
      <Grid container>
        <Grid item xs={6}>
          <Input
            disabled={true}
            label="Order Number"
            name="orderNumber"
            value={values.orderNumber}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  className={classes.adornmentText}
                  position="start"
                >
                  #
                </InputAdornment>
              ),
            }}
          />
          <Select
            label="Customer"
            name="customerId"
            value={values.customerId}
            onChange={handleInputChange}
            options={customerList}
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            label="Payment Method"
            name="pMethod"
            values={values.pMethod}
            onChange={handleInputChange}
            options={pMethods}
          />
          <Input
            disabled={true}
            label="Grand Total"
            name="gTotal"
            value={values.gTotal}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  className={classes.adornmentText}
                  position="start"
                >
                  $
                </InputAdornment>
              ),
            }}
          />
          <ButtonGroup className={classes.submitButtonGroup}>
            <MuiButton
              size="large"
              endIcon={<ShoppingCartIcon />}
              type="submit"
            >
              Submit
            </MuiButton>
            <MuiButton size="small" startIcon={<ReplayIcon />} />
          </ButtonGroup>
          <Button size="large" startIcon={<ReorderIcon />}>
            Orders
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
}
