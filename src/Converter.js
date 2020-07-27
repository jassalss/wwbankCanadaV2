const returnCanadianDollars = (amount, currency) => {
  if (currency === "USD") {
    return amount * 2.0;
  } else if (currency === "MXN") {
    return amount / 10.0;
  }
};
export default returnCanadianDollars;
