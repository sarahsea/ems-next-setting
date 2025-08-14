import { Button, ButtonProps } from "@mui/material";

const TestCommonButton = (
  props: { children: React.ReactNode } & ButtonProps
) => {
  return (
    <Button variant="contained" color="primary" {...props}>
      {props.children}
    </Button>
  );
};

export default TestCommonButton;
