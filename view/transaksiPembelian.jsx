import { ApiClient } from "admin-bro";
import { Box } from "@admin-bro/design-system";

import React, { useState, useEffect } from "react";

const api = new ApiClient();

const TransaksiPembelian = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    api.getPage().then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <Box variant="grey">
      <Box variant="white">{data.text}</Box>
    </Box>
  );
};

export default TransaksiPembelian;
