import React from 'react';
import { TextField } from '@material-ui/core';

interface ModalTextFieldProps {
    value: any;
    onChange?: (event) => void;
    disabled?: boolean;
    label: string;
    type?: string;
}

export const ModalTextField = (props: ModalTextFieldProps) => (
    <TextField
        label={props.label}
        variant="filled"
        style={{ width: '100%' }}
        disabled={props.disabled || false}
        value={props.value}
        onChange={props.onChange}
        type={props.type || 'text'}
    />
);

export default ModalTextField;
