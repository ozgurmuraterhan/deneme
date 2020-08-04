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

            console.log(response.data.role);
        });
    }

    const [permissions, seTpermissions] = useState({
        staffonlyyou: true,
        staffcreate: false,
        staffedit: false,
        stafflist: false,
        staffdelete: false,

        customersonlyyou: true,
        customerscreate: false,
        customersedit: false,
        customerslist: false,
        customersdelete: false,

        productsonlyyou: true,
        productscreate: false,
        productsedit: false,
        productslist: false,
        productsdelete: false,

        bankaccountsonlyyou: true,
        bankaccountscreate: false,
        bankaccountsedit: false,
        bankaccountslist: false,
        bankaccountsdelete: false,

        customersgrouponlyyou: true,
        customersgroupcreate: false,
        customersgroupedit: false,
        customersgrouplist: false,
        customersgroupdelete: false,

        invoicesonlyyou: true,
        invoicescreate: false,
        invoicesedit: false,
        invoiceslist: false,
        invoicesdelete: false,

        paymentsonlyyou: true,
        paymentscreate: false,
        paymentsedit: false,
        paymentslist: false,
        paymentsdelete: false,

        productsCategoriesonlyyou: true,
        productsCategoriescreate: false,
        productsCategoriesedit: false,
        productsCategorieslist: false,
        productsCategoriesdelete: false,
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
                        {console.log(permissions)}
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
                                                checked={
                                                    permissions.staffonlyyou
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        staffonlyyou: val,
                                                        stafflist: false,
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
                                                checked={permissions.stafflist}
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        stafflist: val,
                                                        staffonlyyou: false,
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
                                                    permissions.staffcreate
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        staffcreate: val,
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
                                                checked={permissions.staffedit}
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        staffedit: val,
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
                                                    permissions.staffdelete
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        staffdelete: val,
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
                                                checked={
                                                    permissions.customersonlyyou
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        customersonlyyou: val,
                                                        customerslist: false,
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
                                                    permissions.customerslist
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        customerslist: val,
                                                        customersonlyyou: false,
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
                                                    permissions.customerscreate
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        customerscreate: val,
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
                                                    permissions.customersedit
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        customersedit: val,
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
                                                    permissions.customersdelete
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        customersdelete: val,
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
                                                checked={
                                                    permissions.productsonlyyou
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        productsonlyyou: val,
                                                        productslist: false,
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
                                                    permissions.productslist
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        productslist: val,
                                                        productsonlyyou: false,
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
                                                    permissions.productscreate
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        productscreate: val,
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
                                                    permissions.productsedit
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        productsedit: val,
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
                                                    permissions.productsdelete
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        productsdelete: val,
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
                                                checked={
                                                    permissions.bankaccountsonlyyou
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        bankaccountsonlyyou: val,
                                                        bankaccountslist: false,
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
                                                    permissions.bankaccountslist
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        bankaccountslist: val,
                                                        bankaccountsonlyyou: false,
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
                                                    permissions.bankaccountscreate
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        bankaccountscreate: val,
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
                                                    permissions.bankaccountsedit
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        bankaccountsedit: val,
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
                                                    permissions.bankaccountsdelete
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        bankaccountsdelete: val,
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
                                                checked={
                                                    permissions.customersgrouponlyyou
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        customersgrouponlyyou: val,
                                                        customersgrouplist: false,
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
                                                    permissions.customersgrouplist
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        customersgrouplist: val,
                                                        customersgrouponlyyou: false,
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
                                                    permissions.customersgroupcreate
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        customersgroupcreate: val,
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
                                                    permissions.customersgroupedit
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        customersgroupedit: val,
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
                                                    permissions.customersgroupdelete
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        customersgroupdelete: val,
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
                                                checked={
                                                    permissions.invoicesonlyyou
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        invoicesonlyyou: val,
                                                        invoiceslist: false,
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
                                                    permissions.invoiceslist
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        invoiceslist: val,
                                                        invoicesonlyyou: false,
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
                                                    permissions.invoicescreate
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        invoicescreate: val,
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
                                                    permissions.invoicesedit
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        invoicesedit: val,
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
                                                    permissions.invoicesdelete
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        invoicesdelete: val,
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
                                                checked={
                                                    permissions.paymentsonlyyou
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        paymentsonlyyou: val,
                                                        paymentslist: false,
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
                                                    permissions.paymentslist
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        list: val,
                                                        paymentslist: false,
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
                                                    permissions.paymentscreate
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        paymentscreate: val,
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
                                                    permissions.paymentsedit
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        paymentsedit: val,
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
                                                    permissions.paymentsdelete
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        paymentsdelete: val,
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
                                                    permissions.productsCategoriesonlyyou
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        productsCategoriesonlyyou: val,
                                                        productsCategorieslist: false,
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
                                                    permissions.productsCategorieslist
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        productsCategorieslist: val,
                                                        productsCategoriesonlyyou: false,
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
                                                    permissions.productsCategoriescreate
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        productsCategoriescreate: val,
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
                                                    permissions.productsCategoriesedit
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        productsCategoriesedit: val,
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
                                                    permissions.productsCategoriesdelete
                                                }
                                                onChange={(e, val) => {
                                                    seTpermissions({
                                                        ...permissions,
                                                        productsCategoriesdelete: val,
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