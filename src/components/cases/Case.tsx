import React from 'react';
import { CharityCase } from '../../models/CharityCase';
import { truncateText } from '../../Helper';

interface CaseProps {
    case: CharityCase;
}

export const Case = (props: CaseProps) => (
    <>
        <tr className="tr-shadow">
            <td>{props.case.title}</td>
            <td
                dangerouslySetInnerHTML={{
                    __html: truncateText(props.case.description, 100, true),
                }}
            ></td>
            <td>
                <a
                    href={props.case.site}
                    rel="noreferrer noopener"
                    target="_blank"
                >
                    {props.case.site}
                </a>
            </td>
            <td>
                {props.case.images.map(img => (
                    <img
                        key={img.url}
                        src={img.url}
                        alt={props.case.title}
                        width="50px"
                    ></img>
                ))}
            </td>
            <td>{props.case.funds}</td>
            <td className="text-center">
                <div className="table-data-feature">
                    <button
                        className="item"
                        data-placement="top"
                        title="Delete"
                        data-toggle="modal"
                        data-target="#mediumModal"
                    >
                        <i className="zmdi zmdi-edit"></i>
                    </button>
                    <button
                        className="item"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Delete"
                    >
                        <i className="zmdi zmdi-delete"></i>
                    </button>
                </div>
            </td>
        </tr>
        <tr className="spacer"></tr>
    </>
);

export default Case;
