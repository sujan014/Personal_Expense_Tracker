import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import { NewCashFlow } from "../services/LocalStorage";
import CashFlowSelect from "./CashFlowSelect";


const RenderNewForm = ({condition, callback, reloadCallback}) => {
    //const {condition, callback, reloadCallback} = props;

    if (condition){
        return(       
            <AddNew closeAction = {callback} reloadCallback={reloadCallback}/> 
        )
    }
    else{
        return null;
    }
}

const AddNew = ({closeAction, reloadCallback}) => {
    //const {closeAction} = props;
    const [expdate, setExpDate] = useState('');
    const [category, setCategory] = useState('');    
    const [item, setItem] = useState('');
    const [amount, setAmount] = useState(0);
    const [depositState, setDepositState] = useState(true);   // true: deposit, false: expense
        
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
            id: Date.now(),
            date: expdate,
            category: category,
            item: item,
            amount: exactAmount
        }
        const items = JSON.parse(localStorage.getItem('NewEntry')) || []
        console.log('GET ITEMS:');
        console.log(items);        
        items.push(cashObject);        
        localStorage.setItem('NewEntry', JSON.stringify(items));
        reloadCallback();
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
                    <Modal.Title>Add new</Modal.Title>
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
                        <CashFlowSelect callbackDeposit = {handleDeposit} callbackExpense={handleExpense}/>
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

export default RenderNewForm;

/*const RenderNewForm = ({reloadCallback}) => {
    const [showForm, setShowForm] = useState(false);
    const [expdate, setExpDate] = useState('');
    const [category, setCategory] = useState('');    
    const [item, setItem] = useState('');
    const [amount, setAmount] = useState(0);
    const [depositState, setDepositState] = useState(true);   // true: deposit, false: expense
        
    const closeForm = () => {
        setShowForm(false);
    }
    const diplayForm = () => {
        setShowForm(true);
    }
    const handleDeposit = () => {
        setDepositState(true);
    }
    const handleExpense = () => {
        setDepositState(false);
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
            id: Date.now(),
            date: expdate,
            category: category,
            item: item,
            amount: exactAmount
        }
        const items = JSON.parse(localStorage.getItem('NewEntry')) || []
        console.log('GET ITEMS:');
        console.log(items);        
        items.push(cashObject);        
        localStorage.setItem('NewEntry', JSON.stringify(items));
        reloadCallback();
        closeForm();
    }
    return(
        <div>
            <Button className='py-1' onClick={diplayForm} ><h5>Add new</h5></Button>
            <Modal show={showForm} onHide={closeForm}>
            <Modal.Header>
                    <Modal.Title>Add new</Modal.Title>
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
                        <CashFlowSelect callbackDeposit = {handleDeposit} callbackExpense={handleExpense}/>
                    </Row>                    
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeForm}>
                        Close
                    </Button>
                    <Button variant='danger' onClick={handleSaveData}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}*/