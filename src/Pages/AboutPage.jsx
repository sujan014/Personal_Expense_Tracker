import React from "react";
import { Table } from "react-bootstrap";

const About = () =>{
  return (
    <div className="container fluid my-4 mx-auto border border-1 border-black rounded-2">
      <div className="d-grid  mt-4 text-center">
        <h3  className="d-grid justify-content-center">Sujan Raj Shrestha</h3>
        E-mail: sujanrshr@gmail.com, rshr01sujan@hotmail.com
        <p>Github : <a href="https://github.com/sujan014">https://github.com/sujan014</a>, LinkedIn: <a href="https://www.linkedin.com/in/sujan-raj-shrestha-bbb6a120">https://www.linkedin.com/in/sujan-raj-shrestha-bbb6a120</a></p>
      </div>      
      <div>
        <h4>Technical Expertise</h4>
        <hr/>
        <ul>
            <li>Front-end, Backend and Base-metal MCU application development.</li>
            <li>Programming language: C, C#, React JS, JavaScript, MVC, Winforms, WPF, Kotlin, Python</li>
            <li>HTML, CSS, Bootstrap, Semantic UI</li>
            <li>SqlServer, Azure</li>
            <li>Github, Git version control.</li>
            <li>MCU programming: STM, AVR</li>
            <li>Circuit analysis hardware workshops: board parts assembly and solder.</li>
            <li>Advanced knowledge of Microsoft and Google products.</li>            
        </ul>        
      </div>
      <div>
        <h4>
            Work Experience
        </h4>
        <hr/>
        <div>
            <h5>MVP Studio</h5>
            Full-stack Software Developer : Feb 2024 - Present
        </div>
        <div>
            <h5>K.I Inc (South Korea)</h5>
            Senior Systems Engineer : Jan 2021 - March 2023
        </div>
        <div>
            <h5>K.I Inc (South Korea)</h5>
            Junior Hardware Engineer : May 2016 - Dec 2020
        </div>
        <div>
            <h5>Junsung E & R (South Korea)</h5>
             Junior Embedded Systems Engineer/Researcher: Nov 2013 - Nov 2015
        </div>
        <div>
            <h5>Clean Power (Nepal)</h5>
            Junior Hardware Engineer : 2010 - 2011
        </div>
      </div>
      <br/>
      <div>
        <h4>Language</h4>
        <hr/>
        <Table striped bordered>
            <thead>
                <tr>
                    <th>Language</th>
                    <th>Level</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>English</td>
                    <td>Full Professional Proficiency</td>
                </tr>
                <tr>
                    <td>Korean</td>
                    <td>Professional Working Proficiency</td>
                </tr>
                <tr>
                    <td>Nepalese</td>
                    <td>Native</td>
                </tr>
                <tr>
                    <td>Hindi</td>
                    <td>Full Professional Proficiency</td>
                </tr>
            </tbody>
        </Table>
      </div>
    </div>
  )
};

export default About;
