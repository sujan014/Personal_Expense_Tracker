import React, { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap";

const Netbalance = ({updateBalance}) => {        
    const [balance, setBalance] = useState(0);
    const [updateValue, setUpdateValue] = useState(updateBalance);
    console.log(`updateBalance: ${updateBalance}`);

    useEffect(() => {
        var readBalance = parseFloat(localStorage.getItem('NetBalance'));
        setBalance(readBalance + updateValue);
        localStorage.setItem('NetBalance', balance);
    }
    ,[updateValue]);
        
    return (
        <Row className="mt-4">
            <Col className="text-center"><h4>Net Balance</h4>
            </Col>
            <Col className="text-center"><h4>{balance}</h4>
            </Col>
        </Row>    
    )
};

export default Netbalance;
