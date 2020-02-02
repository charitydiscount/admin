import React, { useState } from 'react';
import { CharityCase } from '../../models/CharityCase';
import { truncateText } from '../../Helper';

export interface CaseFormProps {
    case?: CharityCase;
    onChange: (field: string, value: any) => void;
    onAddImage: (imageUrl: string) => void;
    onRemoveImage: (imageUrl: string) => void;
}

const CaseForm = (props: CaseFormProps) => {
    const [image, setImage] = useState({ imageUrl: '' });

    return (
        <div className="card border-0">
            <div className="card-body card-block">
                <form>
                    <div className="form-group">
                        <label htmlFor="title" className=" form-control-label">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            placeholder="The charity case name"
                            className="form-control"
                            value={props.case ? props.case.title : ''}
                            onChange={event =>
                                props.onChange('title', event.target.value)
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label
                            htmlFor="description"
                            className=" form-control-label"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            placeholder="Case details"
                            className="form-control"
                            rows={5}
                            value={props.case ? props.case.description : ''}
                            onChange={event =>
                                props.onChange(
                                    'description',
                                    event.target.value
                                )
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label
                            htmlFor="website"
                            className=" form-control-label"
                        >
                            Website
                        </label>
                        <input
                            type="text"
                            id="website"
                            placeholder="https://new-case.com"
                            className="form-control"
                            value={props.case ? props.case.site : ''}
                            onChange={event =>
                                props.onChange('site', event.target.value)
                            }
                        />
                    </div>
                    <div className="row form-group">
                        <div className="col-8">
                            <div className="form-group">
                                <label
                                    htmlFor="images"
                                    className=" form-control-label"
                                >
                                    Images
                                </label>
                                <input
                                    type="text"
                                    id="images"
                                    placeholder="Add image links"
                                    className="form-control"
                                    onChange={event =>
                                        setImage({
                                            imageUrl: event.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-4 d-flex align-items-center">
                            <button
                                type="button"
                                className="btn btn-success mt-3"
                                aria-label="Add Image"
                                onClick={() => props.onAddImage(image.imageUrl)}
                            >
                                <span>+</span>
                            </button>
                        </div>
                    </div>
                    {props.case &&
                        props.case.images.map(image => (
                            <div className="row" key={image.url}>
                                <img
                                    src={image.url}
                                    className="img img-fluid col-8"
                                    alt={truncateText(image.url, 25, false)}
                                ></img>
                                <div className="col-4 d-flex align-items-center">
                                    <button
                                        type="button"
                                        className="btn btn-danger mt-3"
                                        aria-label="Add Image"
                                        onClick={() =>
                                            props.onRemoveImage(image.url)
                                        }
                                    >
                                        <span>-</span>
                                    </button>
                                </div>
                                <hr className="w-100" />
                            </div>
                        ))}
                </form>
            </div>
        </div>
    );
};

export default CaseForm;
