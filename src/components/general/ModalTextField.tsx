import React from "react";
import { TextField } from "@material-ui/core";

interface ModalTextFieldProps {
    value: any,
    onChange?: (event) => void,
    id: string,
    disabled?: boolean,
    label: string
}

export const ModalTextField = (props: ModalTextFieldProps) => (
    <TextField id={props.id}
               label={props.label}
               variant="filled"
               style={{width: '100%'}}
               disabled={props.disabled || false}
               value={props.value}
               onChange={props.onChange}
    />
);

export default ModalTextField;