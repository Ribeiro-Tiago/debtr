export default {
  monthlyTabName: "Monthly expenses",
  allTabName: "All expenses",
  errTitle: "Error",
  errMsg: (err: string) => {
    return `An unexpected error ocurred retrieving your expenses. \n\nIf it persists contact support with the following message: \n\n${err}`;
  },
  close: "Close",
};
