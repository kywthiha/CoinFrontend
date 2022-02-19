import { TextField } from "@mui/material";
import styled from "styled-components";

const DateTimeTextField = styled(TextField)`
  & label.Mui-focused {
    color: white;
  }
  & .MuiInput-underline:after {
    border-bottom-color: rgb(8, 145, 178);
  }
  & .MuiOutlinedInput-root {
    background-color: #232a32;

    svg {
      color: #9488f0;
    }
    input {
      padding: 0.5rem;
      background-color: #232a32;
      color: white;
      border: none !important;
      &::placeholder{
          color:
      }
      &:focus,
      &:active {
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
      }
    }

    & fieldset {
      border-color: #6b7280 !important;
    }

    &:hover fieldset,
    &.Mui-focused fieldset {
      border-color: #6b7280 !important;
    }
  }
`;
export default DateTimeTextField;
