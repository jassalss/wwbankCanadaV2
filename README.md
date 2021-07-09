# wwbankCanada

### It is React + Redux + Firebase web app. Redux manages state of the app.

### App is deployed at following address

#### https://wwbankcanada.web.app/

This app consists of 7 different routes which are defined below.

## 1. "/" home page

This page is an intro to the web app.

## 2. /create-account

On this page, the user can create a bank account. Customer name, customer Id, account number, and initial balance are four inputs on this page. Initial balance can be empty. But other inputs are required. When user submit a form on this page, It creates a new account. If there is an account already exist in the database with the same account number, then it returns an error. This page made for admin user

## 3. /deposit

There is a form on this page. Ask for required input like account number, customer name and Id of person who is depositing the money. User is allowed to deposit in MXN, USD or CAD. It returns an error message if there is no account in the database with the same account number.

## 4. /withdraw

There is a form on this page. Ask for required input like account number, customer name and Id, of person who is withdrawing the money. User is allowed to withdraw in MXN, USD or CAD. It returns an error message if there is no account in the database with the same account number. It also returns an error if customer name or Id don't match to the customer name and Id attached to the withdrawing account.

## 5. /transfer

There is a form on this page. Ask for required input like To account, From  account, customer name and Id, of the user who is trying a transfer. Id and customer name should be matched to the From account 's customer name and Id otherwise it returns an error. User is allowed to transfer in MXN, USD or CAD. 

## 6. /account

This page asks for the account number and displays the balance and other info related to the account. It is made for the admin user.

## 7. /allAccunts

This page display all the accounts in database. It is made for the admin user.

#### Thanks
