import React, { useState, useContext, useEffect } from "react";
 
const DeleteAccount = () => {
       

  return (
    <div>
   
        <div className=''>
          <div className=''>
            <div className='col-md-12 left-contact'>
              <h4> Request Account Delete</h4>
              <p>
                <b>Note:</b> Your account will be deleted withing the next 90
                days if there is no activity{' '}
              </p>
              <br />
              <br />
              <form
                className='form-inline form-contact-finance'
                name='contact'
                method='get'
                action=''
              >
                <div className='row'>
                  <div className='col-md-12 mb-4'>
                    <div className='form-group '>
                      <input
                        type='text'
                        className='form-control'
                        name='email'
                        id='email'
                        placeholder='Your Email Address'
                      />
                    </div>
                  </div>
                  <br />
                  <br />
                  <div className='col-md-12'>
                    <div className='form-group'>
                      <textarea
                        id='textarea'
                        className='form-control'
                        name='comments'
                        rows='6'
                        placeholder='Reason Why'
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                <button
                  className='btn large-btn btn-rounded  btn-main-color btn-submit'
                  id='send_message'
                  style={{ backgroundColor: '#1A7BB7', color:"#fff" }}
                >
                  Send Request
                </button>
                </div>
               
                <br /> <br />
                
              </form>
            </div>
          </div>
        </div>
 
    </div>
  )
}

export default DeleteAccount