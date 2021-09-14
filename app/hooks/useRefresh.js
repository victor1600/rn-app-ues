import React, { useState } from "react";

export default useRefresh = (api, ...args) => {
  const [refreshing, setOnRefreshing] = useState(false);

  const onRefresh = async () => {
    console.log("Fetching data from server...");
    setOnRefreshing(true);
    await api.request(...args);
    setOnRefreshing(false);
  };

  return { refreshing, onRefresh };
};
