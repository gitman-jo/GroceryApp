import { Grid } from "@material-ui/core";
import React from "react";
import { useForm } from "../../Hooks/useForm";
import OrderedGroceryItems from "./OrderedGroceryItems";
import OrderForm from "./OrderForm";
import SearchGroceryItems from "./SearchGroceryItems";

const generateOrderNumber = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const getFreshModelObject = () => ({
  orderMasterId: 0,
  orderNumber: generateOrderNumber(),
  customerId: 0,
  pMethod: "none",
  gTotal: 0,
  deletedOrderItemIds: "",
  orderDetails: [],
});

export default function index() {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  } = useForm(getFreshModelObject);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <OrderForm
          {...{
            values,
            setValues,
            errors,
            setErrors,
            handleInputChange,
            resetFormControls,
          }}
        />
      </Grid>

      <Grid item xs={6}>
        <SearchGroceryItems />
      </Grid>
      <Grid item xs={6}>
        <OrderedGroceryItems />
      </Grid>
    </Grid>
  );
}
