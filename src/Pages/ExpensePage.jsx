import { Fragment, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import RenderNewForm from "../components/AddNew";
import { GetCashFlows } from "../services/LocalStorage";
import DisplayTable from "../components/DisplayTable";
import Netbalance from "../components/Netbalance";
import ResetConfirmation from "../components/ResetConfirmation";
import ReportComponent from "../components/ReportComponent";
import ToastComponent from "../components/ToastComponent";

function ExpensePage(){
    const [newdata, setNewData] = useState(false);
    const [cashflows, setCashFlows] = useState([]);
    //const [dates, setDates] = useState([]);
    const [recordChange, setRecordChange] = useState(false);
    const [total, setTotal] = useState(0);
    //const [updateBalance, setUpdateBalance] = useState(0);
    //const [updatePermission, setUpdatePermission] = useState(false);
    const [balance, setBalance] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const [toastMsg, setToastMsg] = useState({
        header: 'This is toast header.',
        body: 'This is toast body.'
    });
    const [emgToast, setEmgToast] = useState(false);

    const ReadRecord = () => {
        const items = JSON.parse(localStorage.getItem('NewEntry')) || [];
        if (items){
            setCashFlows(items);            
        }
        const initSum = 0;
        const TotalAmount = items.reduce((acc, elements) => acc + parseFloat(elements.amount), initSum);
        setTotal(TotalAmount);
        console.log(`TotalAmount: ${total}`);        
    }
    const ReadBalance = () => {
        var readBalance = parseFloat(localStorage.getItem('NetBalance'));
        if (isNaN(readBalance) || readBalance === 'undefined'){
            readBalance = 0;
        }
        console.log(`readBalance: ${readBalance}`);
        setBalance(readBalance);
    }
    const UpdateBalance = (updateValue) => {
        const tempBal = balance + updateValue;
        setBalance(tempBal);
        localStorage.setItem('NetBalance', tempBal);
        console.log(`balance: ${balance}`);
    }
    const handleCloseRecords = () => {
        UpdateBalance(total);
        //setUpdateBalance(total);        
        localStorage.removeItem('NewEntry');
        ReadRecord();
        setToastMsg({
            header: 'Balance close notification',
            body: 'Your current records has been closed and your net balance has been updated.'
        });
        setEmgToast(false);
        handleShowToast();
    }
    const handleResetBalance = () => {
        const tempBal = 0;
        setBalance(tempBal);
        localStorage.setItem('NetBalance', tempBal);
        setToastMsg({
            header: 'Alert',
            body: 'Your balance has been reset.'
        });
        setEmgToast(true);
        handleShowToast();
    }
    useEffect(() => {
        ReadBalance();
        ReadRecord();
    }, [recordChange]);

    const handleNewData = () => {
        if (!newdata)
            setNewData(true);
    }    
    const closeNewData = () => {
        setNewData(!newdata);
    }
    const handleDeleteItem = (id) => {
        console.log(`Delete id: ${id}`);
        const newdata = cashflows.filter((item) => item.id !== id);
        localStorage.setItem('NewEntry', JSON.stringify(newdata));
        setRecordChange(!recordChange);
        //setCashFlows(newdata);
    }
    const handleEditItem = (id) => {
        console.log(`Edit id: ${id}`);
    }
    const handleShowToast = () =>{
        setShowToast(true);
    }
    const handleCloseToast = () =>{
        setShowToast(false);
    }
    return(
        <div className="container fluid mt-1">
            <Row 
                className="mt-4 my-2 w-lg-50 w-sm-90 border border-1 border-dark rounded-3"
            >
                <Col className="text-center">
                    <h4>Net Balance</h4>
                </Col>
                <Col className="text-center">
                    <h4>{balance}</h4>
                </Col>                
            </Row>
            <ResetConfirmation confirmAction={handleResetBalance}/>
            <hr/>
            <Button className='py-1' onClick={handleNewData} ><h5>Add new</h5></Button>
            <RenderNewForm 
                condition={newdata} 
                callback={closeNewData} 
                reloadCallback={() => setRecordChange(!recordChange)}
            />
            
            <div className="mx-auto my-2 w-lg-50 w-sm-90">
                {cashflows.map((cashItem) => (
                    <DisplayTable 
                        key={cashItem.id} 
                        item={cashItem} 
                        ackEdit={() => setRecordChange(!recordChange)} 
                        onDelete={() => handleDeleteItem(cashItem.id)}
                    />
                    ))
                }            
            </div>
            <Row className="mx-auto my-2 w-lg-50 w-sm-90 border border-1 bg-body-secondary rounded-3">
                <Col className="text-center">
                    <h4>Cash Flow balance</h4>
                </Col>
                <Col className="text-center">
                    <h4>{total}</h4>
                </Col>
            </Row>
            <br/>
            <div className="d-grid justify-content-center">
                <Button className='py-1' onClick={handleCloseRecords}><h5>Close Balance</h5></Button>
            </div>
            <ReportComponent />            
            {
                emgToast ? 
                <ToastComponent showToast={showToast} onToggleClose={handleCloseToast} toastMessage={toastMsg} background="danger"/> :
                <ToastComponent showToast={showToast} onToggleClose={handleCloseToast} toastMessage={toastMsg}/>
            }
        </div>
    )
}

export {ExpensePage};