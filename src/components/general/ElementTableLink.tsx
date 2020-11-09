import { emptyHrefLink } from "../../Helper";
import React from "react";

interface ElementLinkProps {
    text: string,
    withoutWidth?: boolean
    onClick: () => void,
}

export const ElementTableLink = (props: ElementLinkProps) => (
    <td style={
        props.withoutWidth ?
            {textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', verticalAlign : 'middle'} :
            {maxWidth: 150, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', verticalAlign : 'middle'}

    }>
        <a href={emptyHrefLink} style={{
            textDecoration: "underline",
            color: "#007bff",
            cursor: "pointer"
        }} onClick={props.onClick}>
            {props.text}
        </a>
    </td>
);

export default ElementTableLink;