import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, ButtonGroup, Card, CardBody, Row} from "reactstrap";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import ClientService from "./services/ClientService";
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import ModalNewClient from "./ModalNewClient";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalNewEditClient: false,
            clients: [],
            showDeleteDialog: false,
            showGenericDialogError: false,
            row: null,
            clientSelected: {
                id: null,
                name: '',
                cpf: '',
                birthDate: '',
            },
        }
    }

    componentDidMount() {
        this.pullData();
    }

    pullData() {
        ClientService.listAll().then((jsonResponse) => {

            this.setState({
                clients: jsonResponse
            })

        });
    }

    complete() {
        this.pullData();
        this.setState({modalNewEditClient: false})
    }

    deleteClient(row) {

        this.setState({showDeleteDialog: true, row: row});
    }

    confirmDelete() {
        this.setState({showDeleteDialog: false,});
        ClientService.delete(this.state.row.id).then((response) => {
            if (response.status === 200) {
                this.pullData();
            } else {
                this.setState({
                    showGenericDialogError: true,
                })
            }
        });
    }

    openFormClientDialog = () => {
        this.setState({
            clientSelected: {
                id: null,
                name: '',
                cpf: '',
                birthDate: '',
            },
            modalNewEditClient: true,
        });
    }

    openFormClientDialogEditMode(row) {
        this.setState({
            clientSelected: row,
            modalNewEditClient: true,
        });
    }

    render() {

        const options = {
            noDataText: 'Nenhum cliente cadastrado'

        };
        return (
            <div className="animated fadeIn">
                <Row>
                    <Button color="primary" onClick={this.openFormClientDialog}>Cadastrar Cliente</Button>
                </Row>

                <Row>
                    <Card className="card">
                        <CardBody>
                            <BootstrapTable data={this.state.clients} striped hover pagination
                                            exportCSV options={options}>
                                <TableHeaderColumn isKey dataField='id'>id</TableHeaderColumn>
                                <TableHeaderColumn dataField='cpf'>CPF</TableHeaderColumn>
                                <TableHeaderColumn dataField='name'>Nome</TableHeaderColumn>
                                <TableHeaderColumn dataField='birthDate' dataFormat={this.dateFormater}>Data
                                    Nascimento</TableHeaderColumn>
                                <TableHeaderColumn dataField='action'
                                                   dataFormat={this.actionFormatter.bind(this)}>X</TableHeaderColumn>
                            </BootstrapTable>
                        </CardBody>
                    </Card>
                </Row>

                <ModalNewClient client={this.state.clientSelected}
                                onCancel={() => this.setState({modalNewEditClient: false})}
                                modal={this.state.modalNewEditClient} onComplete={() => this.complete()}/>

                <SweetAlert
                    show={this.state.showDeleteDialog}
                    title="Excluir"
                    showCancelButton={true}
                    onCancel={() => this.setState({showDeleteDialog: false})}
                    confirmButtonText={'Excluir'}
                    text="Deseja realmente excluir o registro?"
                    onConfirm={() => this.confirmDelete()}
                />

                <SweetAlert
                    show={this.state.showGenericDialogError}
                    title="Erro"
                    showCancelButton={true}
                    confirmButtonText={'Ok'}
                    text="Opss! Ocorreu um erro!"
                    onConfirm={() => this.setState({showGenericDialogError: false})}
                />

            </div>


        );
    }

    actionFormatter(cell, row, rowIndex, formatExtraData) {

        return (
            <ButtonGroup>

                <Button color='danger' onClick={() => this.deleteClient(row)}
                        className="px-2"><img src={'img/ic_delete_forever_white_24dp_1x.png'}/>
                </Button>

                <Button color='primary' onClick={() => this.openFormClientDialogEditMode(row)}
                        className="px-2"><img src={'img/ic_mode_edit_white_24dp_1x.png'}/>
                </Button>

            </ButtonGroup>

        );
    }

    dateFormater(cell, row) {
        let date = null;
        if (cell) {
            date = new Date(cell + 'T00:00:00-03:00');
        }

        return (
            date ?

                <div>
                    <span>{date.toLocaleDateString()}</span>
                </div>
                :
                <div>
                    <span>-</span>

                </div>
        );
    }
}


export default App;
