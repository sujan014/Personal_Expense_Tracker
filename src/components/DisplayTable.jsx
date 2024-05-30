import React, { useEffect, useState } from "react"
import { Button, Col, Modal, Row } from "react-bootstrap";
import CashFlowSelect from "./CashFlowSelect";

const DisplayTable = ({item, ackEdit, onDelete}) => {
  const [editForm, setEditForm] = useState(false);

  const handleEdit = () => {
    if (!editForm){
      setEditForm(true);
    }
    //ackEdit();
  }
  const handleDelete = () => {
    onDelete();
  }
  return (
    <div className="container-md border border-dark border-1 rounded my-2 bg-primary-subtle">
      <Row className="justify-content-around">
        <Col className="border-dark border-bottom border-end py-1 text-center"><strong className="mx-auto">{item.date}</strong></Col>
        <Col className="border-dark border-bottom border-end py-1 text-center">{item.category}</Col>
        <Col className="border-dark border-bottom border-end  py-1 text-center">{item.item}</Col>
        <Col className="border-dark border-bottom py-1 text-center">{item.amount}</Col>
      </Row>
      <Row>
        <Col className="d-grid gap-1 px-md-5 px-sm-1 px-xs-1 ms-5 me-5 ms-sm-1 me-sm-1 ms-xs-1 me-xs-1 my-1">
            <Button 
              variant='primary'
              onClick={handleEdit} 
            >
              Edit
            </Button>            
        </Col>
        <Col className="d-grid gap-1 px-md-5 px-sm-1 px-xs-1 ms-5 me-5 ms-sm-1 me-sm-1 ms-xs-1 me-xs-1 my-1">
        {/* <Col className="d-grid gap-1 px-5 ms-5 me-5 ms-sm-1 me-sm-1 ms-xs-1 me-xs-1 my-1"> */}
            <Button 
              variant='warning'
              onClick={handleDelete} 
            >
              Delete
            </Button>            
        </Col>
      </Row>
      {editForm ?
      <EditDataForm 
        data={item}
        closeAction={() => {setEditForm(false)}}
        ackEdit={ackEdit}
      /> :
      null
      }
    </div>
  )
};

const EditDataForm = ({data, closeAction, ackEdit}) => {
  //const {closeAction} = props;
  var dateInit = data !== undefined ? data.date : '';
  var categoryInit = data !== undefined ? data.category : '';
  var itemInit = data !== undefined ? data.item : '';
  var amountActual = data !== undefined ? data.amount : 0;
  var selectExpense = amountActual < 0 ? true : false;
  var amountInit = Math.abs(amountActual);
  //const [selectExpense, setSelectExpense] = useState(false);
  
  const [expdate, setExpDate] = useState(dateInit);
  const [category, setCategory] = useState(categoryInit);    
  const [item, setItem] = useState(itemInit);
  const [amount, setAmount] = useState(amountInit);
  const [depositState, setDepositState] = useState(amountActual < 0 ? false : true);   // true: deposit, false: expense
  //const [depositState, setDepositState] = useState(!selectExpense);   // true: deposit, false: expense
  
  useEffect(()=>{
    if (amountInit < 0){
      console.log(`${amountInit} is negative`);
      setSelectExpense(true);
      setDepositState(false);
      amountInit *= -1;      
    }
  }
  , []);

  const handleDeposit = () => {
      setDepositState(true);
      //console.log('depositState: ' + depositState);
  }
  const handleExpense = () => {
      setDepositState(false);
      //console.log('depositState: ' + depositState);
  }
  const handleSaveData = () => {
      console.log('date: '+ expdate);
      console.log('category: '+ category);
      console.log('item: '+ item);
      var exactAmount = amount;
      if (!depositState){
          exactAmount = -1*amount
      }
      console.log('amount($): '+ exactAmount);
      var cashObject = {
          id: data.id,
          date: expdate,
          category: category,
          item: item,
          amount: exactAmount
      }
      var itemList = JSON.parse(localStorage.getItem('NewEntry')) || []
      console.log('GET ITEMS:');
      console.log(itemList);
      //get index of ID to change
      const index = itemList.findIndex(element => element.id === data.id);
      console.log(`index to edit: ${index}`);
      itemList[index] = cashObject;
      // items.push(cashObject);        
      localStorage.setItem('NewEntry', JSON.stringify(itemList));
      ackEdit();
      closeAction();
  }

  return(
      <div 
          className="modal show"
          style={
              {
                  display: 'block', 
                  position: 'initial'
              }
          }
      >
          <Modal.Dialog>
              <Modal.Header>
                  <Modal.Title>Edit data</Modal.Title>
              </Modal.Header>
              <Modal.Body>                    
                  <Row>
                      <Col>
                          <label>Date</label>
                      </Col>
                      <Col>
                          <input id="date" type="date" value={expdate} onChange={(event) => setExpDate(event.target.value)} required />
                      </Col>
                  </Row>
                  <Row>
                      <Col>
                          <label>Category</label>
                      </Col>
                      <Col>
                          <input id="category" type="text" value={category} onChange={(event) => setCategory(event.target.value)} required placeholder="Enter category"/>
                      </Col>
                  </Row>
                  <Row>
                      <Col>
                          <label>Item</label>
                      </Col>
                      <Col>
                          <input id="item" type="text" value={item} onChange={(event) => setItem(event.target.value)} required placeholder="Enter Item"/>
                      </Col>
                  </Row>                    
                  <Row>
                      <Col>
                          <label>Amount</label>
                      </Col>
                      <Col>
                          <input id="amount" type="number" value={amount} onChange={(event) => setAmount(event.target.value)} required placeholder="Enter Amount"/>
                      </Col>
                      <CashFlowSelect 
                        callbackDeposit = {handleDeposit} 
                        callbackExpense={handleExpense} 
                        AltDefault={selectExpense}
                      />
                  </Row>                                      
              </Modal.Body>
              <Modal.Footer>
                  <Button variant='secondary' onClick={closeAction}>
                      Close
                  </Button>
                  <Button variant='danger' onClick={handleSaveData}>
                      Save Changes
                  </Button>
              </Modal.Footer>
          </Modal.Dialog>
      </div>
      
  )
}

export default DisplayTable;
