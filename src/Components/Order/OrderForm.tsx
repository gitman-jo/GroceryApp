import React, { useState, useEffect } from "react";
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
  const { values, errors, handleInputChange } = props;
  const classes = useStyles();

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
            options={[
              { id: 0, title: "Select" },
              { id: 1, title: "Customer 1" },
              { id: 2, title: "Customer 2" },
              { id: 3, title: "Customer 3" },
              { id: 4, title: "Customer 4" },
            ]}
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
