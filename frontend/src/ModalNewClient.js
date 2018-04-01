import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card, CardBody, CardHeader, Label, Modal, ModalBody} from "reactstrap";
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import {AvFeedback, AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";
import ClientService from "./services/ClientService";

class ModalNewClient extends Component {


    constructor(props) {
        super(props)

        this.state = {
            showErrors: false,
            validationErrors: '',
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.saveClient = this.saveClient.bind(this);
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }


    saveClient(event, values) {
        console.log(values)

        let clientRequest = {
            name: values.name,
            cpf: values.cpf,
            birthDate: new Date(values.birthDate).toISOString(),

        }

        if (this.props.client.id) {

            this.edit(clientRequest);

        } else {
            this.createNew(clientRequest);
        }

    }


    createNew(clientRequest) {


        ClientService.create(clientRequest).then((response) => {
            if (response.status === 200) {
                this.props.onComplete();
            } else {
                response.json().then((json) => {
                    this.setState({
                        showErrors: true,
                        validationErrors: json.message
                    })
                });
            }
        });
    }


    edit(clientRequest) {
        ClientService.edit(clientRequest, this.props.client.id).then((response) => {
            if (response.status === 200) {
                this.props.onComplete();
            } else {

                response.json().then((json) => {
                    this.setState({
                        showErrors: true,
                        validationErrors: json.message
                    })
                });

            }
        });
    }


    render() {
        return (
            <div>
                <Modal isOpen={this.props.modal}>

                    <ModalBody>

                        <Card>
                            <CardHeader>
                                <strong>Dados Cliente</strong>
                            </CardHeader>
                            <CardBody>
                                <AvForm onValidSubmit={this.saveClient}>

                                    <AvGroup>

                                        <Label for="name">Nome</Label>
                                        <AvInput value={this.props.client.name} maxLength={80} id="name" name="name"
                                                 placeholder="Nome" required/>
                                        <AvFeedback>Por favor digite um nome.</AvFeedback>

                                    </AvGroup>

                                    <AvGroup>

                                        <Label for="cpf">CPF</Label>
                                        <AvInput value={this.props.client.cpf} id="cpf" name="cpf"
                                                 placeholder="000.000.000-00"
                                                 pattern='([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})'
                                                 required/>
                                        <AvFeedback>Por favor digite o CPF válido e no padrão
                                            000.000.000-00.</AvFeedback>

                                    </AvGroup>

                                    <AvGroup>

                                        <Label for="birthDate">Data Nascimento</Label>
                                        <AvInput id="birthDate" value={this.props.client.birthDate} name="birthDate"
                                                 placeholder="Data Nascimento" type="date" validate={{
                                            dateRange: {
                                                start: {value: -100, units: 'years',},
                                                end: {value: -5, units: 'years',}
                                            }
                                        }}
                                                 required/>
                                        <AvFeedback>Por favor preencha a Data Nascimento. (A partir dos 5 anos de
                                            idade)</AvFeedback>

                                    </AvGroup>
                                    <Button size="sm" color="primary">Salvar</Button>
                                </AvForm>
                                <Button size="sm" color="danger" onClick={this.props.onCancel}>Cancelar</Button>
                            </CardBody>
                        </Card>

                        <SweetAlert
                            show={this.state.showErrors}
                            title="Erros"
                            text={this.state.validationErrors}
                            onConfirm={() => this.setState({showErrors: false})}
                        />
                    </ModalBody>

                </Modal>


            </div>

        )
    }
}


export default ModalNewClient;