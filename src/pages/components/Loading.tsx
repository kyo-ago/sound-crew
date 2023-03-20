import {AbsoluteCenter, Box, CircularProgress} from "@chakra-ui/react";
import React from "react";

export const Loading = () => {
  return (
      <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={1000}
      >
        <AbsoluteCenter><CircularProgress isIndeterminate /></AbsoluteCenter>  );
      </Box>
  );
};