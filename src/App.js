import React, { useState, useContext } from "react";
import {
    BrowserRouter as Router,
    Route, 
} from "react-router-dom";

import PrivateRoute from "./Hocs/PrivateRoute";
import UnPrivateRoute from "./Hocs/UnPrivateRoute";

import AuthService from "./Services/AuthService";
import { AuthContext } from "./Context/AuthContext";

import { useTranslation } from "react-i18next";
import SideNav, { 
    NavItem,
    NavIcon,
    NavText,
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "./assets/css/style.css";

import {
    SupervisedUserCircle,
    Receipt,
    MonetizationOn,
    Ballot,
    InsertChart,
    ArrowDropDownCircle,
    PowerSettingsNew,
 } from "@material-ui/icons";
import i18n from "./i18n";

/* import UserEdit from './components/users/edit.component';
import UsersList from './components/users/list.component';
import UserCreate from './components/users/create.component';
*/

import CustomersEdit from "./components/customers/edit.component";
import CustomersCreate from "./components/customers/create.component";
import CustomersList from "./components/customers/list.component";

import InvoicesList from "./components/invoices/list.component";
import InvoicesCreate from "./components/invoices/create.component";
import InvoicesEdit from "./components/invoices/edit.component";

import ExpensesList from "./components/expenses/list.component";
import ExpensesCreate from "./components/expenses/create.component";
import ExpensesEdit from "./components/expenses/edit.component";

import ProductsList from "./components/products/list.component";
import ProductsCreate from "./components/products/create.component";
import ProductsEdit from "./components/products/edit.component";

import UsersList from "./components/users/list.component";
import UsersCreate from "./components/users/create.component";
import UsersEdit from "./components/users/edit.component";


import PaymentsAccountsList from "./components/paymentsaccounts/list.component";
import PaymentsAccountsCreate from "./components/paymentsaccounts/create.component";
import PaymentsAccountsEdit from "./components/paymentsaccounts/edit.component";
import PaymentsAccountsView from "./components/paymentsaccounts/view.component";



import Login from "./components/register/login";
import ForgotPassword from "./components/register/forgotpassword";
import ResetPassword from "./components/register/resetpassword";

/*
import CreateExercise from './components/exercises/create.component';
import EditExercise from './components/exercises/edit.component';
import ExercisesList from './components/exercises/list.component';
*/

import PPimage from "./assets/images/pp2.jpeg";

export default function App() {
    const { t } = useTranslation();

    const [nowDate, seTnowDate] = useState(new Date());
    const [open, seTopen] = useState(false);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };


    const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);

    const onClickLogoutHandler = () => {
        AuthService.logout().then((data) => {
            if (data.success) {
                setUser(data.user);
                setIsAuthenticated(false);
            }
        });
    };

    const unauthenticatedNavBar = () => {
        return (
            <>
                <Route
                    render={({ location, history }) => (
                        <>
                            {location.pathname === "/" ? history.push("/login") : ""}
                            <main style={{ height: "100%" }}>
                                <div style={{ height: "100%" }}>
                                    <UnPrivateRoute
                                        path="/login"
                                        component={Login}
                                    />
                                    <UnPrivateRoute
                                        path="/reset/:token"
                                        component={ResetPassword}
                                    />
                                    <UnPrivateRoute
                                        path="/forgotPassword"
                                        component={ForgotPassword}
                                    />
                                </div>
                            </main>
                        </>
                    )}
                />
            </>
        );
    };

    const customersMenu = (

        <SideNav.Nav defaultSelected="customerslist">
            <NavItem eventKey="Paymentarea">
                <NavIcon>
                    <InsertChart
                        fontSize="large"
                        style={{ marginTop: "7px" }}
                    />
                </NavIcon>
                <NavText>Payment Area</NavText>
            </NavItem>
        </SideNav.Nav>
    )

    const adminMenu = (

        <SideNav.Nav defaultSelected="customerslist">
            <NavItem eventKey="invoiceslist">
                <NavIcon>
                    <Receipt
                        fontSize="large"
                        style={{ marginTop: "7px" }}
                    />
                </NavIcon>
                <NavText>Invoices</NavText>
            </NavItem>

            <NavItem eventKey="customerslist">
                <NavIcon>
                    <SupervisedUserCircle
                        fontSize="large"
                        style={{ marginTop: "7px" }}
                    />
                </NavIcon>
                <NavText>Customers</NavText>
            </NavItem>

            <NavItem eventKey="productslist">
                <NavIcon>
                    <Ballot
                        fontSize="large"
                        style={{ marginTop: "7px" }}
                    />
                </NavIcon>
                <NavText>Products</NavText>
            </NavItem>

            <NavItem eventKey="expenseslist">
                <NavIcon>
                    <MonetizationOn
                        fontSize="large"
                        style={{ marginTop: "7px" }}
                    />
                </NavIcon>
                <NavText>Expenses</NavText>
            </NavItem>
            <NavItem eventKey="paymentsaccountslist">
                <NavIcon>
                    <InsertChart
                        fontSize="large"
                        style={{ marginTop: "7px" }}
                    />
                </NavIcon>
                <NavText>Payment Account</NavText>
            </NavItem>

            <NavItem eventKey="reports">
                <NavIcon>
                    <InsertChart
                        fontSize="large"
                        style={{ marginTop: "7px" }}
                    />
                </NavIcon>
                <NavText>Reports</NavText>
            </NavItem>

            <NavItem eventKey="charts">
                <NavIcon>
                    <ArrowDropDownCircle
                        fontSize="large"
                        style={{ marginTop: "7px" }}
                    />
                </NavIcon>
                <NavText>Drowdown</NavText>
                <NavItem eventKey="stafflist">
                    <NavText>Staff </NavText>
                </NavItem>
                <NavItem eventKey="charts/barchart">
                    <NavText>Bar Chart</NavText>
                </NavItem>
            </NavItem>

            <NavItem
                eventKey="login"
                onClick={onClickLogoutHandler}
            >
                <NavIcon>
                    <PowerSettingsNew
                        fontSize="large"
                        style={{ marginTop: "7px" }}
                    />
                </NavIcon>
                <NavText>Logout</NavText>
            </NavItem>
        </SideNav.Nav>
    )


    const authenticatedNavBar = () => {
        return (
            <>
                <Route
                    render={({ location, history }) => (
                        <>
                            <SideNav
                                onMouseOver={() => seTopen(true)}
                                onMouseOut={() => seTopen(false)}
                                onToggle={() => { }}
                                expanded={open}
                                onSelect={(selected) => {
                                    const to = `/${selected}`;
                                    if (location.pathname !== to) {
                                        history.push(to);
                                    }
                                }}
                            >
                                <SideNav.Toggle />



                                {user.isCustomer ? customersMenu : adminMenu}



                            </SideNav>
                            <main style={{ marginLeft: "63px" }}>
                                <div>
                                    Lang:
                                    <button
                                        onClick={() => changeLanguage("tr")}
                                    >
                                        tr
                                    </button>
                                    <button
                                        onClick={() => changeLanguage("en")}
                                    >
                                        en
                                    </button>
                                    <span />
                                </div>
                                <div>
                                    <PrivateRoute
                                        roles={[
                                            "customerslist",
                                            "customersonlyyou",
                                        ]}
                                        path="/CustomersList"
                                        component={CustomersList}
                                    />
                                    <PrivateRoute
                                        roles={[
                                            "customerscreate",
                                            "customersonlyyou",
                                        ]}
                                        path="/CustomerCreate"
                                        component={CustomersCreate}
                                    />
                                    <PrivateRoute
                                        roles={[
                                            "customersedit",
                                            "customersonlyyou",
                                        ]}
                                        path="/Customers/edit/:id"
                                        component={CustomersEdit}
                                    />

                                    <PrivateRoute
                                        roles={["invoicescreate"]}
                                        path="/invoicecreate"
                                        component={InvoicesCreate}
                                    />
                                    <PrivateRoute
                                        roles={[
                                            "invoiceslist",
                                            "invoicesonlyyou",
                                        ]}
                                        path="/invoiceslist"
                                        component={InvoicesList}
                                    />
                                    <PrivateRoute
                                        roles={[
                                            "invoicesedit",
                                            "invoicesonlyyou",
                                        ]}
                                        path="/invoices/edit/:id"
                                        component={InvoicesEdit}
                                    />

                                    <PrivateRoute
                                        roles={["expensescreate"]}
                                        path="/expensecreate"
                                        component={ExpensesCreate}
                                    />
                                    <PrivateRoute
                                        roles={[
                                            "expenseslist",
                                            "expensesonlyyou",
                                        ]}
                                        path="/expenseslist"
                                        component={ExpensesList}
                                    />
                                    <PrivateRoute
                                        roles={[
                                            "expensesedit",
                                            "expensesonlyyou",
                                        ]}
                                        path="/expenses/edit/:id"
                                        component={ExpensesEdit}
                                    />

                                    <PrivateRoute
                                        roles={[
                                            "productslist",
                                            "productsonlyyou",
                                        ]}
                                        path="/productslist"
                                        component={ProductsList}
                                    />

                                    <PrivateRoute
                                        roles={["productscreate"]}
                                        path="/productcreate"
                                        component={ProductsCreate}
                                    />
                                    <PrivateRoute
                                        roles={[
                                            "productsedit",
                                            "productsonlyyou",
                                        ]}
                                        path="/products/edit/:id"
                                        component={ProductsEdit}
                                    />

                                    <PrivateRoute
                                        roles={["paymentsaccountslist", "paymentsaccountsonlyyou"]}
                                        path="/paymentsaccountslist"
                                        component={PaymentsAccountsList}
                                    />

                                    <PrivateRoute
                                        roles={["paymentsaccountscreate"]}
                                        path="/paymentsaccountscreate"
                                        component={PaymentsAccountsCreate}
                                    />
                                    <PrivateRoute
                                        roles={["paymentsaccountsedit", "paymentsaccountsfonlyyou"]}
                                        path="/paymentsaccounts/edit/:id"
                                        component={PaymentsAccountsEdit}
                                    />


                                    <PrivateRoute
                                        roles={["paymentsaccountsedit", "paymentsaccountsfonlyyou"]}
                                        path="/paymentsaccounts/view/:id"
                                        component={PaymentsAccountsView}
                                    />



                                    <PrivateRoute
                                        roles={["stafflist", "staffonlyyou"]}
                                        path="/stafflist"
                                        component={UsersList}
                                    />

                                    <PrivateRoute
                                        roles={["staffcreate"]}
                                        path="/staffcreate"
                                        component={UsersCreate}
                                    />
                                    <PrivateRoute
                                        roles={["staffedit", "staffonlyyou"]}
                                        path="/staff/edit/:id"
                                        component={UsersEdit}
                                    />

                                    <UnPrivateRoute
                                        path="/login"
                                        component={Login}
                                    />
                                </div>
                            </main>
                        </>
                    )}
                />
            </>
        );
    };
    return (
        <Router>
            {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
        </Router>
    );
}
