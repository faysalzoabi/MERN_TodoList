import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, Alert, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import {register} from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';

class RegisterModal extends React.Component {
   
    state = {
      modal: false,
      name:'',
      email:'',
      password:'',
      msg: null
    }

 componentDidUpdate(prevProps) {
    const {error, isAuthenticated} = this.props;
    if(error !== prevProps.error) {
        //check for error
        if(error.id === 'REGISTER_FAIL') {
            this.setState({msg: error.msg.msg})
        } else {
            this.setState({msg:null});
        }
    }

    // if authenticated close the modal
    if(this.state.modal){
        if(isAuthenticated){
            this.toggle();
        }
    }
 }

  toggle = () => {
    //clear errors
    this.props.dispatch(clearErrors());
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  onChange = e => {
      this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = e => {
      e.preventDefault();
      
      const {name, email, password} = this.state;

      // Create user object
      const newUser = {
          name,
          email,
          password
      }
     //register user
      this.props.dispatch(register(newUser));

      // close modal
    //   this.toggle();
  }

  render() {

    return (
      <div>
        <Button color="danger" onClick={this.toggle}>Register</Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
              {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}
              <Form onSubmit={this.onSubmit}>
                  <FormGroup>
                        <Label for="name">Name</Label>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            className="mb-3"
                            placeholder="Name"
                            onChange={this.onChange}
                        />

                        <Label for="email">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            className="mb-3"
                            placeholder="Email"
                            onChange={this.onChange}
                        />

                        <Label for="password">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            className="mb-3"
                            placeholder="Password"
                            onChange={this.onChange}
                        />
                        <Button color='dark' style={{marginTop: '2rem'}} block>
                            Register
                        </Button>
                  </FormGroup>
              </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated,
    error:state.error
})

export default connect(mapStateToProps)(RegisterModal);