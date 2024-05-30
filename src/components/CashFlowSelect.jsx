import React, { useEffect, useState } from "react"
import { Button, Col, Row } from "react-bootstrap";

const CashFlowSelect = ({callbackDeposit, callbackExpense, AltDefault}) =>{        
    const [bgDeposit, setbgDeposit] = useState('success');
    const [bgExpense, setbgExpense] = useState('outline-secondary');
    
    useEffect(() => {
        if (AltDefault !== undefined && AltDefault === true){
            setbgDeposit('outline-secondary');
            setbgExpense('success');
        }
    }        
    , []);
    const handleDeposit = () => {     
        setbgDeposit('success');
        setbgExpense('outline-secondary');
        //console.log('handleDeposit');
        callbackDeposit();
    }
    const handleExpense = () => {
        setbgDeposit('outline-secondary');
        setbgExpense('success');
        //console.log('handleExpense');
        callbackExpense();
    }
    return (
        <Row>
            <Col>
                <Button variant={bgDeposit} onClick={handleDeposit}>
                    Deposit
                </Button>
            </Col>
            <Col>
                <Button variant={bgExpense} onClick={handleExpense}>
                    Expense
                </Button>
            </Col>
        </Row>
    )
};

export default CashFlowSelect;
