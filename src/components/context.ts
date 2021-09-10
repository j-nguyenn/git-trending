import React from "react";

const RepoContextProvider = React.createContext({
  repoResults: [{}],
  toggleStar: (id: string) => {},
});

export default RepoContextProvider;
