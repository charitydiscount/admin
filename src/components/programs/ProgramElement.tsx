import React from "react";
import { ProgramDto, updateProgram } from "../../rest/ProgramService";
import { TextField } from '@material-ui/core';
import { emptyHrefLink, SourceTypes } from "../../Helper";
import Modal from '../modal';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { CategoryDto } from "../../rest/CategoriesService";

interface ProgramElementState {
    modalVisible: boolean
    program: ProgramDto
}

interface ProgramElementProps {
    program: ProgramDto
    categories: CategoryDto[]
}

class ProgramElement extends React.Component<ProgramElementProps, ProgramElementState> {

    constructor(props: ProgramElementProps) {
        super(props);
        this.state = {
            modalVisible: false,
            program: this.props.program
        };
        this.onModalSave = this.onModalSave.bind(this);
    }

    openModal() {
        this.setState({
            program: this.props.program,
            modalVisible: true,
        });
    }

    closeModal() {
        this.setState({
            modalVisible: false,
        });
    }

    async onModalSave() {
        try {
            let response = await updateProgram(this.props.program);
            if (response) {
                alert("Program successfully updated");
                window.location.reload();
            } else {
                alert("Something went wrong with update");
            }
        } catch (e) {
            alert(e);
        }
    }

    render(): React.ReactNode {
        let categories;
        if (this.props.categories && this.props.categories.length > 0) {
            categories = this.props.categories.map((value) => {
                return (
                    <MenuItem value={value.category}> {value.category} </MenuItem>
                );
            });
        }

        return (
            <React.Fragment>
                <Modal
                    visible={this.state.modalVisible}
                    onClose={() => this.closeModal()}
                    title="Update program"
                    onSave={() => this.onModalSave()}
                >
                    {this.state.modalVisible &&
                    <React.Fragment>
                        <TextField
                            id="uniqueCode" label={"Unique code"} variant="filled" style={{width: '100%'}}
                            value={this.state.program.uniqueCode} disabled={true}
                        />
                        {this.props.program.source === SourceTypes.TWO_PERFORMANT &&
                        <React.Fragment>
                            <TextField
                                id="name" label={"Name"} variant="filled" style={{width: '100%'}}
                                value={this.state.program.name} disabled={true}
                            />
                            <TextField
                                id="mainOrder" label={"Main Order"} type="number" variant="filled"
                                style={{width: '100%'}} value={this.props.program.mainOrder}
                                onChange={event => {
                                    let program = this.state.program;
                                    program.mainOrder = parseInt(event.target.value);
                                    this.setState({
                                        program: program
                                    });
                                }}
                            />
                            {this.props.program.defaultSaleCommissionType === 'variable' &&
                            <React.Fragment>
                                <TextField
                                    id="defaultSaleCommissionRate" label={"Default Sale Commission Rate"}
                                    variant="filled" style={{width: '100%'}}
                                    value={this.state.program.defaultSaleCommissionRate} disabled={true}
                                />
                                <TextField
                                    id="commissionVariableMin2perf"
                                    type="number" label={"Cashback min"}
                                    variant="filled" style={{width: '100%'}}
                                    value={this.state.program.commissionMin}
                                    onChange={event => {
                                        let program = this.state.program;
                                        program.commissionMin = event.target.value;
                                        this.setState({
                                            program: program
                                        })
                                    }
                                    }
                                />
                                <TextField
                                    id="commissionVariableMax2perf"
                                    label={"Cashback max"}
                                    type="number" variant="filled" style={{width: '100%'}}
                                    value={this.state.program.commissionMax}
                                    onChange={event => {
                                        let program = this.state.program;
                                        program.commissionMax = event.target.value;
                                        this.setState({
                                            program: program
                                        })
                                    }
                                    }
                                />
                            </React.Fragment>
                            }
                        </React.Fragment>
                        }
                        {this.props.program.source !== SourceTypes.TWO_PERFORMANT &&
                        <React.Fragment>
                            <TextField
                                id="name" label={"Name"} variant="filled"
                                style={{width: '100%'}} value={this.state.program.name}
                                onChange={event => {
                                    let program = this.state.program;
                                    program.name = event.target.value;
                                    this.setState({
                                        program: program
                                    })
                                }
                                }
                            />
                            <FormControl variant="filled" style={{width: '100%'}}>
                                <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
                                <Select
                                    MenuProps={{
                                        disableScrollLock: true,
                                        getContentAnchorEl: null,
                                        anchorOrigin: {
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        },
                                    }}
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={this.state.program.category}
                                    onChange={(event) => {
                                        let program = this.state.program;
                                        program.category = event.target.value as string;
                                        this.setState({
                                            program: program
                                        })
                                    }}
                                >
                                    {categories}
                                </Select>
                            </FormControl>
                            <FormControl variant="filled" style={{width: '100%'}}>
                                <InputLabel id="demo-simple-select-filled-label">Status</InputLabel>
                                <Select
                                    MenuProps={{
                                        disableScrollLock: true,
                                        getContentAnchorEl: null,
                                        anchorOrigin: {
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        },
                                    }}
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={this.state.program.status}
                                    onChange={event => {
                                        let program = this.state.program;
                                        program.status = event.target.value as string;
                                        this.setState({
                                            program: program
                                        })
                                    }}
                                >
                                    <MenuItem value={"active"}> Active </MenuItem>
                                    <MenuItem value={"inactive"}> Inactive </MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                id="source" label={"Source"} variant="filled"
                                style={{width: '100%'}} value={this.state.program.source}
                                onChange={event => {
                                    let program = this.state.program;
                                    program.source = event.target.value;
                                    this.setState({
                                        program: program
                                    })}
                                }
                            />
                            <TextField
                                id="logoPath" label={"Logo Path"} variant="filled"
                                style={{width: '100%'}} value={this.state.program.logoPath}
                                onChange={event => {
                                    let program = this.state.program;
                                    program.logoPath = event.target.value;
                                    this.setState({
                                        program: program
                                    })
                                }
                                }
                            />
                            <TextField
                                id="mainUrl" label={"Webite"} variant="filled"
                                style={{width: '100%'}} value={this.state.program.mainUrl}
                                onChange={event => {
                                    const program = this.state.program;
                                    program.mainUrl = event.target.value;
                                    this.setState({
                                        program: program
                                    })
                                }
                                }
                            />
                            <TextField
                                id="affiliateUrl" label={"Affiliate Link (use '{userId}' as a placeholder for the user)"} variant="filled"
                                style={{width: '100%'}} value={this.state.program.affiliateUrl}
                                onChange={event => {
                                    const program = this.state.program;
                                    program.affiliateUrl = event.target.value;
                                    this.setState({
                                        program: program
                                    })
                                }
                                }
                            />
                            <TextField
                                id="mainorder" label={"Main Order"} type="number" variant="filled"
                                style={{width: '100%'}} value={this.state.program.mainOrder}
                                onChange={event => {
                                    let program = this.state.program;
                                    program.mainOrder = parseInt(event.target.value);
                                    this.setState({
                                        program: program
                                    })
                                }
                                }
                            />
                            <TextField
                                id="averagePaymentTime" label={"Average Payment Time"} variant="filled" type="number"
                                style={{width: '100%'}} value={this.state.program.averagePaymentTime}
                                onChange={event => {
                                    let program = this.state.program;
                                    program.averagePaymentTime = parseInt(event.target.value);
                                    this.setState({
                                        program: program
                                    })
                                }
                                }
                            />
                            <TextField
                                id="commissionIntervalMinExternal"
                                label={"Cashback min"}
                                variant="filled" type="number"
                                style={{width: '100%'}} value={this.state.program.commissionMin}
                                onChange={event => {
                                    let program = this.state.program;
                                    program.commissionMin = event.target.value;
                                    this.setState({
                                        program: program
                                    })
                                }
                                }
                            />
                            <TextField
                                id="commissionIntervalMaxExternal"
                                label={"Cashback max"}
                                variant="filled" type="number"
                                style={{width: '100%'}} value={this.state.program.commissionMax}
                                onChange={event => {
                                    let program = this.state.program;
                                    program.commissionMax = event.target.value;
                                    this.setState({
                                        program: program
                                    })
                                }
                                }
                            />
                            <TextField
                                id="defaultLeadCommissionAmount" label={"Default Lead Commission Amount"}
                                type="number"
                                variant="filled"
                                style={{width: '100%'}} value={this.state.program.defaultLeadCommissionAmount}
                                onChange={event => {
                                    let program = this.state.program;
                                    program.defaultLeadCommissionAmount = event.target.value;
                                    this.setState({
                                        program: program
                                    })
                                }
                                }
                            />
                            <FormControl variant="filled" style={{width: '100%'}}>
                                <InputLabel id="demo-simple-select-filled-label">Default Lead Commission Type</InputLabel>
                                <Select
                                    MenuProps={{
                                        disableScrollLock: true,
                                        getContentAnchorEl: null,
                                        anchorOrigin: {
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        },
                                    }}
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={this.state.program.defaultLeadCommissionType}
                                    onChange={event => {
                                        let program = this.state.program;
                                        program.defaultLeadCommissionType = event.target.value as string;
                                        this.setState({
                                            program: program
                                        })
                                    }}
                                >
                                    <MenuItem value={""}> None </MenuItem>
                                    <MenuItem value={"variable"}> Variable </MenuItem>
                                    <MenuItem value={"fixed"}> Fixed </MenuItem>
                                    <MenuItem value={"percent"}> Percent </MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                id="defaultSaleCommissionRate" label={"Default Sale Commission Rate"} variant="filled"
                                type="number"
                                style={{width: '100%'}} value={this.state.program.defaultSaleCommissionRate}
                                onChange={event => {
                                    let program = this.state.program;
                                    program.defaultSaleCommissionRate = event.target.value;
                                    this.setState({
                                        program: program
                                    })
                                }
                                }
                            />
                            <FormControl variant="filled" style={{width: '100%'}}>
                                <InputLabel id="demo-simple-select-filled-label">Default Sale Commission Type</InputLabel>
                                <Select
                                    MenuProps={{
                                        disableScrollLock: true,
                                        getContentAnchorEl: null,
                                        anchorOrigin: {
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        },
                                    }}
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={this.state.program.defaultSaleCommissionType}
                                    onChange={event => {
                                        let program = this.state.program;
                                        program.defaultSaleCommissionType = event.target.value as string;
                                        this.setState({
                                            program: program
                                        })
                                    }}
                                >
                                    <MenuItem value={""}> None </MenuItem>
                                    <MenuItem value={"variable"}> Variable </MenuItem>
                                    <MenuItem value={"fixed"}> Fixed </MenuItem>
                                    <MenuItem value={"percent"}> Percent </MenuItem>
                                </Select>
                            </FormControl>
                        </React.Fragment>
                        }
                    </React.Fragment>
                    }
                </Modal>
                <tr className="tr-shadow">
                    <td>{this.props.program.uniqueCode}</td>
                    <td style={{maxWidth: 150, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                        <a href={emptyHrefLink} style={{
                            textDecoration: "underline",
                            color: "#007bff",
                            cursor: "pointer"
                        }} onClick={() => this.openModal()}>
                            {this.props.program.name}
                        </a>
                    </td>
                    <td>{this.props.program.order}</td>
                    <td>{this.props.program.mainOrder}</td>
                    <td>{this.props.program.commissionMin}</td>
                    <td>{this.props.program.commissionMax}</td>
                    <td>{this.props.program.defaultLeadCommissionAmount}</td>
                    <td>{this.props.program.defaultLeadCommissionType}</td>
                    <td>{this.props.program.defaultSaleCommissionRate}</td>
                    <td>{this.props.program.defaultSaleCommissionType}</td>
                </tr>
                <tr className="spacer"/>
            </React.Fragment>
        );
    }
}

export default ProgramElement;
