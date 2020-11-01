import { FormControl } from "@material-ui/core";
import React from "react";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";


interface ModalSelectProps {
    id: string,
    title: string
    value: any,
    options: any,
    onChange: (event) => void,
}

export const ModalSelect = (props: ModalSelectProps) => (
    <FormControl variant="filled" style={{width: '100%'}}>
        <InputLabel id={"input" + props.id}>
            {props.title}
        </InputLabel>
        <Select
            MenuProps={{
                disableScrollLock: true,
                getContentAnchorEl: null,
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                },
            }}
            labelId={"label" + props.id}
            id={"select" + props.id}
            value={props.value}
            onChange={props.onChange}
        >
            {props.options}
        </Select>
    </FormControl>
);

export default ModalSelect;

