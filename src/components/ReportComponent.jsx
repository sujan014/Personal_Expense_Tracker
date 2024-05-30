import React, { useEffect, useState } from "react"
import { Button, Col, Row, Table } from "react-bootstrap";

const ReportComponent = () => {
    const [show, setShow] = useState(false);
    const [btnText, setBtnText] = useState('View Report');
    const [data, setData] = useState([]);
    var dataCategory = {}
    const [cashCategory, setCashCategory] = useState([]);

    useEffect(() => {
        if (show){
            setBtnText('Hide Report');
            const readData = JSON.parse(localStorage.getItem('NewEntry')) || [];
            console.log(readData);
            readData.forEach(element => {
                var categoryProp = element.category;
                var amountProp = parseFloat(element.amount);
                if (dataCategory.hasOwnProperty(categoryProp)){
                    dataCategory[categoryProp] += amountProp;
                }
                else{
                    dataCategory[categoryProp] = amountProp
                }                
            });
            console.log('dataCategory object: '); console.log(dataCategory);
            // Object.entries(dataCategory).map(([key, value]) => {
            //     console.log(key + ' -> ' + value);                
            // })
            var tempCashCategory = [];
            Object.keys(dataCategory).forEach((key) => {
                console.log(`${key} -> ${dataCategory[key]}`);
                tempCashCategory.push({category: key, amount: dataCategory[key]});
            });
            setCashCategory(tempCashCategory);
            if (readData){
                setData(readData);
            }            
        } else{
            setBtnText('Show Report');
        }
    }
    , [show]);
    const handleReportBtn = () => {
        setShow(!show);
    }
    return (
        <div className="d-grid gap-2 mt-3 justify-content-center">
            <Button
                className='py-1' 
                onClick={handleReportBtn}
            >
                <h5>{btnText}</h5>
            </Button>            

            {show ?                             
            <div>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>
                                <h3>Category</h3>
                            </th>
                            <th>
                                <h3>Amount</h3>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cashCategory.map((elems) => 
                            <tr>
                                <td>
                                    <h4>{elems.category}</h4>
                                </td>
                                <td>
                                    <h4>{elems.amount}</h4>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>                
            </div>:            
            null
            }
            
        </div>
    )
};

export default ReportComponent;

/*
<p>{data.map((child) => 
    <p>{child.id} {child.date} {child.category} {child.item} {child.amount}</p>
)}</p>
*/