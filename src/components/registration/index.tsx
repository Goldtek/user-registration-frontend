
import React, { useState } from "react"
import axios from "axios"
import isEmpty from "lodash/isEmpty"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifyError } from '../util';

/** 
 * declaration of state variables
 * @param {string} name
 * @param {string} email
 * @param {string} password
 *  @param {string} confirmPassword
 */ 
const Registration: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isLoading, SetLoading] = useState<boolean>(false);
    const [steps, setStepper] = useState<number>(1);
    const url = process.env.REACT_APP_BASEURL;

    /**
     * this function handles navigating to the next step by 
     * checking for the input fields if not empty navigates to the next step
     */
    const handleNextBtn = async () => {
        if (!isEmpty(name) && !isEmpty(email) && steps === 1) {
            setStepper(steps + 1);
        } else if((isEmpty(name) || isEmpty(email)) && steps === 1){
            notifyError('Please fill out the form');
        }

        if (!isEmpty(password) && !isEmpty(confirmPassword) && steps === 2) {
            if(confirmPassword === password){
                if(password.length < 6) {
                    return notifyError('lenght of password is too short');
                }
                SetLoading(true);
             
                try {
                    await axios.post(url as string, { name, email, password})
                    setStepper(steps + 1);
                    SetLoading(false);
                } catch (error){
                    notifyError(error as string);
                }
            } else {
                notifyError("Password doesn't match with confirm Password. ");
            }

        }  else if((isEmpty(password) || isEmpty(confirmPassword)) && steps === 2){
            notifyError('Please enter your password and confirm it');
        }
      
    }

    /**
     * handle going back to the previous screen
     */
    const handlePreviousButton = () => {
            setStepper(steps - 1);
    }
  

    return (
        <div
            className="container-fluid"
            style={{ padding: 0, overflow: "hidden" }}
        >
            <section className="wizard-section">
                <div className="row no-gutters">
                    <div
                        className="col-lg-7 col-md-7 col-xs-12 col-sm-12"
                        style={{ padding: 0 }}
                    >
                        <div className="wizard-content-left d-flex justify-content-center align-items-center center-block "></div>
                    </div>
                    
                    <div className="col-lg-5 col-md-5 col-xs-12 col-sm-12">
                        
                        <div className="form-wizard">
                                <div className="form-wizard-header">
                                    <ul className="list-unstyled form-wizard-steps clearfix">
                                        <li className={steps > 1 ? 'activated' : 'active'}>
                                            <span>1</span>
                                        </li>
                                        <li className={steps === 2 || steps === 3 ? 'activated' : ''}>
                                            <span>2</span>
                                        </li>
                                        <li className={steps === 3 ? 'activated ' : ''}>
                                            <span>3</span>
                                        </li>
                                        <li className={steps === 3 ? 'activated ' : ''}>
                                            <span>
                                                <i className="fa fa-user" />
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <fieldset className="wizard-fieldset show" style={steps === 1 ? { display: 'block' } : { display : 'none' }}>
                                    <h5>Personal Details</h5>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            name="Name"
                                            className="form-control wizard-required mb-20"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your Email"
                                        />
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control wizard-required"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter your name"
                                        />
                                        
                                        <div className="wizard-form-error" />
                                    </div>
                                    <div className="form-group clearfix">
                                        <button
                                            className="form-wizard-next-btn float-right"
                                            type="button"
                                                onClick={handleNextBtn}
                                        >
                                            Next &nbsp;
                                            <i
                                                className="fa fa-arrow-right"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </fieldset>
                                <fieldset className="wizard-fieldset"  style={steps === 2 ? { display: 'block' } : { display : 'none' }}>
                                    <h5>Create Password</h5>
                                    <div className="form-group">
                                        <input
                                            className="form-control wizard-required mb-20"
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                        />
                                        
                                        <div className="wizard-form-error" />
                                    </div>

                                    <div className="form-group">
                                        <input
                                            className="form-control wizard-required"
                                            id="confirmPassword"
                                            type="password"
                                            name="confirmPassword"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="confirm your password"
                                        />
                                        
                                        <div className="wizard-form-error" />
                                    </div>

                                    <div className="form-group clearfix">
                                        <button
                                            className="form-wizard-previous-btn float-left"
                                            type="button"
                                            onClick={handlePreviousButton}
                                        >
                                            {" "}
                                            <i
                                                className="fa fa-arrow-left"
                                                aria-hidden="true"
                                            >
                                                {" "}
                                                &nbsp;
                                            </i>
                                            Previous
                                        </button>
                                        &nbsp;&nbsp;&nbsp;
                                        <button
                                            className="form-wizard-next-btn float-right"
                                            type="button"
                                            onClick={handleNextBtn}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (<i className="fa fa-spinner fa-pulse fa-2x fa-fw" />): null} 
                                            Submit &nbsp;
                                            <i
                                                className="fa fa-paper-plane"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </fieldset>
                                
                                <fieldset className="wizard-fieldset"  style={steps === 3 ? { display: 'block' } : { display : 'none' }}>
                                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                                        <div className="image-kite center-block ">
                                            <img
                                                src="/images/download.png"
                                                alt="mine"
                                            />
                                            <h3>
                                                Registration has been Completed.
                                                
                                            </h3>
                                        </div>
                                    </div>
                                </fieldset>
            
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </div>
    )
}


export default Registration

