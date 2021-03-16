import React, { useState, useRef, useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Button } from '@material-ui/core';
import './main.css';
import axios from 'axios';
import comm from '../common';
import Snackbar from '@material-ui/core/Snackbar';
import { Link, useHistory } from 'react-router-dom';


function Main(): any {
    const [age, setAge] = React.useState(-1);
    const [crp, setCrp] = React.useState(-1);
    const [ldh, setLdh] = React.useState(-1);
    const [hemo, setHemo] = React.useState(-1);
    const [totalScore, setTotalScore] = React.useState(-1);
    const [resultString, setResultString] = React.useState("");
    const [resultScoreString, setResultScoreString] = React.useState("");

    useEffect(() => {
        handleTotalScore();
    }, [age, crp, ldh, hemo]);

    let history = useHistory();

    const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let selectVal = Number(event.target.value)
        console.log(' selectVal => ', selectVal);
        setAge(selectVal);
    };

    const handleCRPChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let selectVal = Number(event.target.value)
        setCrp(selectVal);
    };

    const handleLDHChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let selectVal = Number(event.target.value)
        setLdh(selectVal);
    };

    const handleHemoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let selectVal = Number(event.target.value)
        setHemo(selectVal);
    };

    const handleTotalScore = () => {
        if (age === -1) {
            console.log(" 나이를 입력하세요. ")
            return;
        }
        if (crp === -1) {
            console.log(" C-reactive protein을 입력하세요. ")
            return;
        }

        if (ldh === -1) {
            console.log(" Lactate dehydrogenase을 입력하세요. ")
            return;
        }

        if (hemo === -1) {
            console.log(" hemoglobin을 입력하세요. ")
            return;
        }

        let totalScore = age + crp + ldh + hemo;
        setTotalScore(totalScore);
        if (totalScore >= 9) {
            setResultString("중증 폐렴 전이 가능성이 높은 환자입니다.");
            setResultScoreString(`위험도 지수: ${totalScore} >= 9(기준값)`);
        } else {
            setResultString("중증 폐렴 전이 가능성이 낮은 환자입니다.");
            setResultScoreString(`위험도 지수: ${totalScore} < 9(기준값)`);
        }

        const patientDtoObj = {
            age: age,
            crp: crp,
            ldh: ldh,
            hemo: hemo
        }

        console.log("patientDtoObj >>>>>> ", patientDtoObj)
        axios.post(comm.SERVER_URL + "/patient", patientDtoObj).then(res => {
            console.log(' res >> ', res);
        });
    }

    const handleInit = (ev: any) => {
        setAge(-1);
        setCrp(-1);
        setLdh(-1);
        setHemo(-1);
        setResultString("");
        setResultScoreString("");
    }

    const handleChangeURL = () => {
        console.log(" history => ", history);
        if(history.location.pathname === "/main2"){
            history.replace("/main");
          }else{
            history.replace("/main2");
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', margin: 25 }}>
            <div style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>환자 검진 정보를 체크해 주세요</div>
            <FormControl component="fieldset" style={{ marginTop: 20 }}>
                <div className='label-div'>
                    <span className='label-span'>Age(years)</span>
                    <span className='score-title'>scores</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <RadioGroup aria-label="age" name="age" value={age} onChange={handleAgeChange} style={{ padding: 5, width: '100%' }}>
                        <div className="each-controll-label">
                            <FormControlLabel value={0} control={<Radio />} label="50 미만" />
                            {age === 0 ? <span>{age}</span> : null}
                        </div>
                        <div className="each-controll-label">
                            <FormControlLabel value={4} control={<Radio />} label="50대(50-59)" />
                            {age === 4 ? <span>{age}</span> : null}
                        </div>
                        <div className="each-controll-label">
                            <FormControlLabel value={5} control={<Radio />} label="60대(60-69)" />
                            {age === 5 ? <span>{age}</span> : null}
                        </div>
                        <div className="each-controll-label">
                            <FormControlLabel value={7} control={<Radio />} label="70대(70-79)" />
                            {age === 7 ? <span>{age}</span> : null}
                        </div>
                        <div className="each-controll-label">
                            <FormControlLabel value={10} control={<Radio />} label="80대(>=80) 이상" />
                            {age === 10 ? <span>{age}</span> : null}
                        </div>
                    </RadioGroup>
                </div>
            </FormControl>

            <FormControl component="fieldset" style={{ marginTop: 15 }}>
                <span className='label-span'>C-reactive protein(mg/dL)</span>
                <RadioGroup aria-label="crp" name="crp" value={crp} onChange={handleCRPChange} style={{ padding: 5 }}>
                    <div className="each-controll-label">
                        <FormControlLabel value={0} control={<Radio />} label="< 1.4" />
                        {crp === 0 ? <span>{crp}</span> : null}
                    </div>
                    <div className="each-controll-label">
                        <FormControlLabel value={3} control={<Radio />} label=">= 1.4" />
                        {crp === 3 ? <span>{crp}</span> : null}
                    </div>
                </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" style={{ marginTop: 15 }}>
                <span className='label-span'>Lactate dehydrogenase(U/L)</span>
                <RadioGroup aria-label="ldh" name="ldh" value={ldh} onChange={handleLDHChange} style={{ padding: 5 }}>
                    <div className="each-controll-label">
                        <FormControlLabel value={0} control={<Radio />} label="< 500" />
                        {ldh === 0 ? <span>{ldh}</span> : null}
                    </div>
                    <div className="each-controll-label">
                        <FormControlLabel value={2} control={<Radio />} label="500-700" />
                        {ldh === 2 ? <span>{ldh}</span> : null}
                    </div>
                    <div className="each-controll-label">
                        <FormControlLabel value={4} control={<Radio />} label=">= 700" />
                        {ldh === 4 ? <span>{ldh}</span> : null}
                    </div>
                </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" style={{ marginTop: 15 }}>
                <span style={{ fontWeight: 'bold', color: 'black', fontSize: 17.5 }}>Hemoglobin(g/dL)</span>
                <RadioGroup aria-label="hemo" name="hemo" value={hemo} onChange={handleHemoChange} style={{ padding: 5 }}>
                    <div className="each-controll-label">
                        <FormControlLabel value={0} control={<Radio />} label="< 13.3" />
                        {hemo === 0 ? <span>{hemo}</span> : null}
                    </div>
                    <div className="each-controll-label">
                        <FormControlLabel value={3} control={<Radio />} label=">= 13.3" />
                        {hemo === 3 ? <span>{hemo}</span> : null}
                    </div>
                </RadioGroup>
            </FormControl>
            {totalScore === -1 ? null : <div className="total-score-area"><span style={{ display:'flex', flex:1}}></span><span>Total Score: {totalScore}</span><span style={{width:5}}></span></div>}
            <div style={{height:30}}></div>
            <div className='resultstr-div'>
                {totalScore >= 9 ? <span style={{ color: 'red', fontWeight: "bold" }}>{resultScoreString}</span> : <span style={{ color: 'green' }}>{resultScoreString}</span>}
                {totalScore >= 9 ? <p style={{ color: 'red', fontWeight: "bold" }}>{resultString}</p> : <p style={{ color: 'green' }}>{resultString}</p>}
            </div>
            <div style={{height:20}}></div>

            <div className='btn-div'>
                <Button color="secondary" variant="outlined" size="large" onClick={handleInit} style={{ marginRight: 20 }}>초기화</Button>
                <Button color="primary" variant="contained" size="large" onClick={handleChangeURL}>입력모드 전환</Button>
            </div>

        </div>
    );

}

export default Main;