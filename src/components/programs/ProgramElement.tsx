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
import { buildDynamicLink } from "../../rest/DynamicLinksService";
import { remoteConfig } from "../../index";

interface ProgramElementState {
    updateProgramModalVisible: boolean
    dynamicLinkModalVisible: boolean
    program: ProgramDto,
    dynamicLink: string
}

interface ProgramElementProps {
    program: ProgramDto
    categories: CategoryDto[]
}

class ProgramElement extends React.Component<ProgramElementProps, ProgramElementState> {

    constructor(props: ProgramElementProps) {
        super(props);
        this.state = {
            updateProgramModalVisible: false,
            dynamicLinkModalVisible: false,
            program: this.props.program,
            dynamicLink: ''
        };
        this.onModalSave = this.onModalSave.bind(this);
        this.openDynamicLinkModal = this.openDynamicLinkModal.bind(this);
    }

    async openDynamicLinkModal() {
        try {
            const dynamicLink = await buildDynamicLink(
                this.props.program.name,
                this.props.program.logoPath
            );
            this.setState({
                dynamicLink: dynamicLink,
                dynamicLinkModalVisible: true,
            });
        } catch (error) {
            console.log(error);
        }
    }

    openModal() {
        this.setState({
            program: this.props.program,
            updateProgramModalVisible: true,
        });
    }

    closeModal() {
        this.setState({
            updateProgramModalVisible: false,
            dynamicLinkModalVisible: false
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

        let normalLink =
            remoteConfig.getString('dynamic_link_target') ||
            'https://charitydiscount.ro';
        normalLink+= "/shop/" + this.props.program.name;

        return (
            <React.Fragment>
                <Modal
                    visible={this.state.dynamicLinkModalVisible}
                    onClose={() => this.closeModal()}
                    title="Dynamic link to access this shop"
                    onSave={() => this.closeModal()}
                >
                    {this.state.dynamicLinkModalVisible && this.state.dynamicLink &&
                    <React.Fragment>
                        <TextField
                            id="name" label={"Program name"} variant="filled" style={{width: '100%'}}
                            value={this.state.program.name} disabled={true}
                        />
                        <TextField
                            id="link" label={"Dynamic link"} variant="filled" style={{width: '100%'}}
                            value={this.state.dynamicLink} disabled={true}
                        />
                        <TextField
                            id="link" label={"Link normal"} variant="filled" style={{width: '100%'}}
                            value={normalLink} disabled={true}
                        />
                    </React.Fragment>
                    }
                </Modal>
                <Modal
                    visible={this.state.updateProgramModalVisible}
                    onClose={() => this.closeModal()}
                    title="Update program"
                    onSave={() => this.onModalSave()}
                >
                    {this.state.updateProgramModalVisible &&
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
                                    })
                                }
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
                                id="affiliateUrl"
                                label={"Affiliate Link (use '{userId}' as a placeholder for the user)"} variant="filled"
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
                                <InputLabel id="demo-simple-select-filled-label">Default Lead Commission
                                    Type</InputLabel>
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
                                <InputLabel id="demo-simple-select-filled-label">Default Sale Commission
                                    Type</InputLabel>
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
                    <td style={{maxWidth: 150, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                        <a href={emptyHrefLink} style={{
                            textDecoration: "underline",
                            color: "#007bff",
                            cursor: "pointer"
                        }} onClick={() => this.openDynamicLinkModal()}>
                            {this.props.program.uniqueCode}
                        </a>
                    </td>
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
