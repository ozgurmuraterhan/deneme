import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { withSnackbar, useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withNamespaces, useTranslation } from "react-i18next";
import ImageUploader from "react-images-upload";

import {
    FormControl,
    DialogContentText,
    FormGroup,
    InputLabel,
    Input,
    FormHelperText,
    Card,
    Button,
    Typography,
    TextField,
    Tooltip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Checkbox,
    FormControlLabel,
    Grid,
} from "@material-ui/core";

import { AddBox, GroupAdd, Delete, Save } from "@material-ui/icons";

import "../../assets/css/style.css";

export default function ProductEdit(props) {
    const [t] = useTranslation();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const [openalert, seTopenalert] = useState(false);

    const [state, seTstate] = useState({
        username: "",
        username: "",
        name: "",
        surname: "",
        password: "",
        phone: "",
        _id: "",
    });

    function getUserData() {
        axios.get(`/staff/${props.match.params.id}`).then((response) => {
            seTstate({
                ...state,
                username: response.data.username,
                username: response.data.username,
                name: response.data.name,
                surname: response.data.surname,
                password: response.data.password,
                phone: response.data.phone,
                _id: response.data._id,
            });
        });
    }

    const [staff, seTstaff] = useState({
        onlyyou: true,
        create: false,
        edit: false,
        list: false,
        delete: false,
    });

    const [customers, seTcustomers] = useState({
        onlyyou: true,
        create: false,
        edit: false,
        list: false,
        delete: false,
    });

    const [products, seTproducts] = useState({
        onlyyou: true,
        create: false,
        edit: false,
        list: false,
        delete: false,
    });

    const [bankaccounts, seTbankaccounts] = useState({
        onlyyou: true,
        create: false,
        edit: false,
        list: false,
        delete: false,
    });

    const [customersgroup, seTcustomersgroup] = useState({
        onlyyou: true,
        create: false,
        edit: false,
        list: false,
        delete: false,
    });

    const [invoices, seTinvoices] = useState({
        onlyyou: true,
        create: false,
        edit: false,
        list: false,
        delete: false,
    });

    const [payments, seTpayments] = useState({
        onlyyou: true,
        create: false,
        edit: false,
        list: false,
        delete: false,
    });

    const [productsCategories, seTproductsCategories] = useState({
        onlyyou: true,
        create: false,
        edit: false,
        list: false,
        delete: false,
    });

    // componentDidMount = useEffect
    useEffect(() => {
        getUserData();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        const Product = {
            username: state.username,
            name: state.name,
            surname: state.surname,
            password: state.password,
            phone: state.phone,
        };
        axios
            .post(`/staff/${props.match.params.id}`, Product)
            .then((res) => {
                if (res.data.variant == "error") {
                    enqueueSnackbar(
                        t("Staff Not Updated") + res.data.messagge,
                        { variant: res.data.variant }
                    );
                } else {
                    enqueueSnackbar(t("Staff Updated"), {
                        variant: res.data.variant,
                    });
                    history.push("/stafflist");
                }
            })
            .catch((err) => console.log(err));
    };

    const deleteData = (id) => {
        axios.delete(`/staff/${id}`).then((res) => {
            enqueueSnackbar(t("Staf Deleted"), {
                variant: res.data.variant,
            });
            history.push("/stafflist");
        });
    };

    return (
        <div className="containerP">
            <ValidatorForm autoComplete="off" onSubmit={onSubmit}>
                <Grid item container spacing={3}>
                    <Grid item container md={3} className="panelGridRelative">
                        <Card className="panelLargeIcon">
                            <GroupAdd fontSize="large" />
                        </Card>
                        <div className="listViewPaper">
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                style={{ width: "100%" }}
                                className="typography"
                            >
                                {t("Edit User")}
                                <Tooltip title={t("Delete User")}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        style={{
                                            float: "right",
                                            marginRight: "115px",
                                        }}
                                        onClick={() => {
                                            seTopenalert(true);
                                        }}
                                    >
                                        <Delete />
                                    </Button>
                                </Tooltip>
                                <Dialog
                                    open={openalert}
                                    onClose={() => {
                                        seTopenalert(false);
                                    }}
                                >
                                    <DialogTitle>
                                        {t("Delete User")}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            {t("deleteInfoText1")}
                                            <br />
                                            {t("deleteInfoText2")}
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button
                                            onClick={() => {
                                                seTopenalert(false);
                                            }}
                                            color="primary"
                                        >
                                            {t("cancel")}
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                deleteData(state._id);
                                            }}
                                            color="primary"
                                            autoFocus
                                        >
                                            {t("delete")}
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </Typography>
                            <Grid item container sm={12}>
                                <div style={{ clear: "both" }}></div>

                                <Grid container item sm={12} spacing={0}>
                                    <FormGroup className="FormGroup">
                                        <FormControl>
                                            <TextValidator
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                                margin="dense"
                                                label={t("Name")}
                                                value={state.name}
                                                onChange={(e) => {
                                                    seTstate({
                                                        ...state,
                                                        name: e.target.value,
                                                    });
                                                }}
                                                required
                                            />
                                            <FormHelperText>
                                                {t("You need Name")}
                                            </FormHelperText>
                                        </FormControl>
                                    </FormGroup>
                                </Grid>

                                <Grid container item sm={12} spacing={0}>
                                    <FormGroup className="FormGroup">
                                        <FormControl>
                                            <TextValidator
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                                margin="dense"
                                                label={t("Surname")}
                                                value={state.surname}
                                                onChange={(e) => {
                                                    seTstate({
                                                        ...state,
                                                        surname: e.target.value,
                                                    });
                                                }}
                                                required
                                            />
                                            <FormHelperText>
                                                {t("You need Surname")}
                                            </FormHelperText>
                                        </FormControl>
                                    </FormGroup>
                                </Grid>

                                <Grid container item sm={12} spacing={0}>
                                    <FormGroup className="FormGroup">
                                        <FormControl>
                                            <TextValidator
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                                margin="dense"
                                                label={t("E-mail")}
                                                value={state.username}
                                                onChange={(e) => {
                                                    seTstate({
                                                        ...state,
                                                        username:
                                                            e.target.value,
                                                    });
                                                }}
                                                required
                                            />
                                            <FormHelperText>
                                                {t("You need E-mail")}
                                            </FormHelperText>
                                        </FormControl>
                                    </FormGroup>
                                </Grid>

                                <Grid container item sm={12} spacing={0}>
                                    <FormGroup className="FormGroup">
                                        <FormControl>
                                            <TextValidator
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                                margin="dense"
                                                label={t("Phone")}
                                                value={state.phone}
                                                onChange={(e) => {
                                                    seTstate({
                                                        ...state,
                                                        phone: e.target.value,
                                                    });
                                                }}
                                                required
                                            />
                                            <FormHelperText>
                                                {t("You need Phone")}
                                            </FormHelperText>
                                        </FormControl>
                                    </FormGroup>
                                </Grid>

                                <Grid container item sm={12} spacing={0}>
                                    <FormGroup className="FormGroup">
                                        <FormControl>
                                            <TextValidator
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                                margin="dense"
                                                label={t("Password")}
                                                value=""
                                                onChange={(e) => {
                                                    seTstate({
                                                        ...state,
                                                        password:
                                                            e.target.value,
                                                    });
                                                }}
                                                required
                                            />
                                            <FormHelperText>
                                                {t(
                                                    "Note: if you populate this field, password will be changed on this member."
                                                )}
                                            </FormHelperText>
                                        </FormControl>
                                    </FormGroup>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="saveButtonPlace">
                            <Button
                                type="submit"
                                onClick={onSubmit}
                                className="glow-on-hover"
                            >
                                <Save
                                    fontSize="small"
                                    style={{ marginRight: "15px" }}
                                />
                                {t("save")}
                            </Button>
                        </div>
                    </Grid>
                    <Grid item container md={5} className="panelGridRelative">
                        <div className="listViewPaperPadding">
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                style={{ width: "100%" }}
                            >
                                {t("Permissions")}
                            </Typography>
                            <Grid
                                item
                                container
                                sm={12}
                                className="permissions"
                            >
                                <div className="permissions_div">
                                    <b>{t("Staff")}</b>

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={staff.onlyyou}
                                                onChange={(e, val) => {
                                                    seTstaff({
                                                        ...staff,
                                                        onlyyou: val,
                                                        list: false,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("View (Own)")}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={staff.list}
                                                onChange={(e, val) => {
                                                    seTstaff({
                                                        ...staff,
                                                        list: val,
                                                        onlyyou: false,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("View (Global)")}
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={staff.create}
                                                onChange={(e, val) => {
                                                    seTstaff({
                                                        ...staff,
                                                        create: val,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("Create")}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={staff.edit}
                                                onChange={(e, val) => {
                                                    seTstaff({
                                                        ...staff,
                                                        edit: val,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("Edit")}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={staff.delete}
                                                onChange={(e, val) => {
                                                    seTstaff({
                                                        ...staff,
                                                        delete: val,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("Delete")}
                                    />
                                </div>

                                <div className="permissions_div">
                                    <b>{t("Customers")}</b>

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={customers.onlyyou}
                                                onChange={(e, val) => {
                                                    seTcustomers({
                                                        ...customers,
                                                        onlyyou: val,
                                                        list: false,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("View (Own)")}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={customers.list}
                                                onChange={(e, val) => {
                                                    seTcustomers({
                                                        ...customers,
                                                        list: val,
                                                        onlyyou: false,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("View (Global)")}
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={customers.create}
                                                onChange={(e, val) => {
                                                    seTcustomers({
                                                        ...customers,
                                                        create: val,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("Create")}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={customers.edit}
                                                onChange={(e, val) => {
                                                    seTcustomers({
                                                        ...customers,
                                                        edit: val,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("Edit")}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={customers.delete}
                                                onChange={(e, val) => {
                                                    seTcustomers({
                                                        ...customers,
                                                        delete: val,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("Delete")}
                                    />
                                </div>

                                <div className="permissions_div">
                                    <b>{t("Products")}</b>

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={products.onlyyou}
                                                onChange={(e, val) => {
                                                    seTproducts({
                                                        ...products,
                                                        onlyyou: val,
                                                        list: false,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("View (Own)")}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={products.list}
                                                onChange={(e, val) => {
                                                    seTproducts({
                                                        ...products,
                                                        list: val,
                                                        onlyyou: false,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("View (Global)")}
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={products.create}
                                                onChange={(e, val) => {
                                                    seTproducts({
                                                        ...products,
                                                        create: val,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("Create")}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={products.edit}
                                                onChange={(e, val) => {
                                                    seTproducts({
                                                        ...products,
                                                        edit: val,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("Edit")}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={products.delete}
                                                onChange={(e, val) => {
                                                    seTproducts({
                                                        ...products,
                                                        delete: val,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("Delete")}
                                    />
                                </div>

                                <div className="permissions_div">
                                    <b>{t("Bank Accounts")}</b>

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={bankaccounts.onlyyou}
                                                onChange={(e, val) => {
                                                    seTbankaccounts({
                                                        ...bankaccounts,
                                                        onlyyou: val,
                                                        list: false,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("View (Own)")}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={bankaccounts.list}
                                                onChange={(e, val) => {
                                                    seTbankaccounts({
                                                        ...bankaccounts,
                                                        list: val,
                                                        onlyyou: false,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("View (Global)")}
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={bankaccounts.create}
                                                onChange={(e, val) => {
                                                    seTbankaccounts({
                                                        ...bankaccounts,
                                                        create: val,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("Create")}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={bankaccounts.edit}
                                                onChange={(e, val) => {
                                                    seTbankaccounts({
                                                        ...bankaccounts,
                                                        edit: val,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("Edit")}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={bankaccounts.delete}
                                                onChange={(e, val) => {
                                                    seTbankaccounts({
                                                        ...bankaccounts,
                                                        delete: val,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("Delete")}
                                    />
                                </div>

                                <div className="permissions_div">
                                    <b>{t("Customers Group")}</b>

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={customersgroup.onlyyou}
                                                onChange={(e, val) => {
                                                    seTcustomersgroup({
                                                        ...customersgroup,
                                                        onlyyou: val,
                                                        list: false,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("View (Own)")}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={customersgroup.list}
                                                onChange={(e, val) => {
                                                    seTcustomersgroup({
                                                        ...customersgroup,
                                                        list: val,
                                                        onlyyou: false,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("View (Global)")}
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={customersgroup.create}
                                                onChange={(e, val) => {
                                                    seTcustomersgroup({
                                                        ...customersgroup,
                                                        create: val,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("Create")}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={customersgroup.edit}
                                                onChange={(e, val) => {
                                                    seTcustomersgroup({
                                                        ...customersgroup,
                                                        edit: val,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("Edit")}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={customersgroup.delete}
                                                onChange={(e, val) => {
                                                    seTcustomersgroup({
                                                        ...customersgroup,
                                                        delete: val,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("Delete")}
                                    />
                                </div>

                                <div className="permissions_div">
                                    <b>{t("Invoices")}</b>

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={invoices.onlyyou}
                                                onChange={(e, val) => {
                                                    seTinvoices({
                                                        ...invoices,
                                                        onlyyou: val,
                                                        list: false,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("View (Own)")}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={invoices.list}
                                                onChange={(e, val) => {
                                                    seTinvoices({
                                                        ...invoices,
                                                        list: val,
                                                        onlyyou: false,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("View (Global)")}
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={invoices.create}
                                                onChange={(e, val) => {
                                                    seTinvoices({
                                                        ...invoices,
                                                        create: val,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("Create")}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={invoices.edit}
                                                onChange={(e, val) => {
                                                    seTinvoices({
                                                        ...invoices,
                                                        edit: val,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("Edit")}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={invoices.delete}
                                                onChange={(e, val) => {
                                                    seTinvoices({
                                                        ...invoices,
                                                        delete: val,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("Delete")}
                                    />
                                </div>

                                <div className="permissions_div">
                                    <b>{t("Payments")}</b>

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={payments.onlyyou}
                                                onChange={(e, val) => {
                                                    seTpayments({
                                                        ...payments,
                                                        onlyyou: val,
                                                        list: false,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("View (Own)")}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={payments.list}
                                                onChange={(e, val) => {
                                                    seTpayments({
                                                        ...payments,
                                                        list: val,
                                                        onlyyou: false,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("View (Global)")}
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={payments.create}
                                                onChange={(e, val) => {
                                                    seTpayments({
                                                        ...payments,
                                                        create: val,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("Create")}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={payments.edit}
                                                onChange={(e, val) => {
                                                    seTpayments({
                                                        ...payments,
                                                        edit: val,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("Edit")}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={payments.delete}
                                                onChange={(e, val) => {
                                                    seTpayments({
                                                        ...payments,
                                                        delete: val,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("Delete")}
                                    />
                                </div>

                                <div className="permissions_div">
                                    <b>{t("Products Categories")}</b>

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={
                                                    productsCategories.onlyyou
                                                }
                                                onChange={(e, val) => {
                                                    seTproductsCategories({
                                                        ...productsCategories,
                                                        onlyyou: val,
                                                        list: false,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("View (Own)")}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={
                                                    productsCategories.list
                                                }
                                                onChange={(e, val) => {
                                                    seTproductsCategories({
                                                        ...productsCategories,
                                                        list: val,
                                                        onlyyou: false,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("View (Global)")}
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={
                                                    productsCategories.create
                                                }
                                                onChange={(e, val) => {
                                                    seTproductsCategories({
                                                        ...productsCategories,
                                                        create: val,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("Create")}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={
                                                    productsCategories.edit
                                                }
                                                onChange={(e, val) => {
                                                    seTproductsCategories({
                                                        ...productsCategories,
                                                        edit: val,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("Edit")}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={
                                                    productsCategories.delete
                                                }
                                                onChange={(e, val) => {
                                                    seTproductsCategories({
                                                        ...productsCategories,
                                                        delete: val,
                                                    });
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label={t("Delete")}
                                    />
                                </div>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </ValidatorForm>
        </div>
    );
}
