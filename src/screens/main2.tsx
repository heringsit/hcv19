import React, { useState, useRef, useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import './main.css';
import axios from 'axios';
import comm from '../common';
import { Link, useHistory } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import { useForm } from "react-hook-form";

function Main2(): any {
    const [age, setAge] = React.useState(-1);
    const [crp, setCrp] = React.useState(-1);
    const [ldh, setLdh] = React.useState(-1);
    const [hemo, setHemo] = React.useState(-1);

    const [realCrp, setRealcrp] = React.useState(-1);
    const [realLdh, setRealldh] = React.useState(-1);
    const [realHemo, setRealhemo] = React.useState(-1);

    const [totalScore, setTotalScore] = React.useState(-1);
    const [resultString, setResultString] = React.useState("");
    const [resultScoreString, setResultScoreString] = React.useState("");

    const crpInput: any = useRef<HTMLDivElement>(null);
    const ldhInput: any = useRef<HTMLDivElement>();
    const hemoInput: any = useRef<HTMLDivElement>();

    useEffect(() => {
        handleTotalScore();
    }, [age, crp, ldh, hemo])

    let history = useHistory();

    const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let selectVal = Number(event.target.value)
        setAge(selectVal);
    };

    const handleCRPChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let inputVal = Number(event.target.value);
        let settingVal = -1;
        setRealcrp(Number(event.target.value));
        console.log(" inputVal CRP >> ", inputVal);
        if (inputVal < 1.4) {
            if(inputVal === 0){
                settingVal = -1;
            }else{
                settingVal = 0;
            }
        } else {
            settingVal = 3;
        }
        
        setCrp(settingVal);

    };

    const handleLDHChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRealldh(Number(event.target.value));
        let inputVal = Number(event.target.value);
        let settingVal = -1;
        console.log(" inputVal LDH >> ", inputVal);
        if (inputVal < 500) {
            if(inputVal === 0){
                settingVal = -1;
            }else{
                settingVal = 0;
            }
        } else if (inputVal < 700) {
            settingVal = 2;
        } else {
            settingVal = 4;
        }
        setLdh(settingVal);
    };
 
    const handleHemoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRealhemo(Number(event.target.value));
        let inputVal = Number(event.target.value);
        let settingVal = -1;
        console.log(" inputVal Hemo >> ", inputVal);
        if (inputVal < 13.3) {
            if(inputVal === 0){
                settingVal = -1;
            }else{
                settingVal = 0;
            }
        } else {
            settingVal = 3;
        }
        setHemo(settingVal);
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
            crp: realCrp,
            ldh: realLdh,
            hemo: realHemo
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
        crpInput.current.value = "";
        ldhInput.current.value = "";
        hemoInput.current.value = "";
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
        <div style={{ display: 'flex', flexDirection: 'column', margin: 25, width: 360 }}>
            <div style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>환자 검진 정보를 입력해 주세요</div>
            <FormControl component="fieldset" style={{ marginTop: 20 }}>
                <div className='label-div'>
                    <span className='label-span'>Age(years)</span>
                    <span className='score-title'>scores</span>
                </div>
                <RadioGroup aria-label="age" name="age" value={age} onChange={handleAgeChange} style={{ padding: 5 }}>
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
            </FormControl>

            <FormControl component="fieldset" style={{ marginTop: 15 }}>
                <span className='label-span'>C-reactive protein(mg/dL)</span>
                <div style={{ height: 12 }}></div>
                <div className="each-controll-label">
                    <TextField
                        id="crp"
                        label="mg/dL"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        style={{ width: 250 }}
                        onChange={handleCRPChange}
                        inputRef={crpInput}
                        // ref={crpInput}
                        placeholder="ex) 1.4"
                    />
                    {crp !== -1 ? <span>{crp}</span> : null}
                </div>

            </FormControl>

            <FormControl component="fieldset" style={{ marginTop: 15 }}>
                <span className='label-span'>Lactate dehydrogenase(U/L)</span>
                <div style={{ height: 12 }}></div>
                <div className="each-controll-label">
                <TextField
                    id="ldh"
                    label="U/L"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    style={{ width: 250 }}
                    onChange={handleLDHChange}
                    inputRef={ldhInput}
                    placeholder="ex) 550"
                />
                {ldh !== -1 ? <span>{ldh}</span> : null}
                </div>
            </FormControl>

            <FormControl component="fieldset" style={{ marginTop: 15 }}>
                <span className='label-span'>Hemoglobin(g/dL)</span>
                <div style={{ height: 12 }}></div>
                <div className="each-controll-label">
                    <TextField
                        id="ldh"
                        label="g/dL"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        style={{ width: 250 }}
                        onChange={handleHemoChange}
                        inputRef={hemoInput}
                        placeholder="ex) 13.3"
                    />
                    {hemo !== -1 ? <span>{hemo}</span> : null}
                </div>
            </FormControl>
            <div style={{height:20}}></div>
            {totalScore === -1 ? null : <div className="total-score-area"><span style={{ display:'flex', flex:1}}></span><span>Total Score: {totalScore}</span><span style={{width:5}}></span></div>}
            <div style={{height:30}}></div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                {totalScore >= 9 ? <span style={{ color: 'red', fontWeight: "bold" }}>{resultScoreString}</span> : <span style={{ color: 'green' }}>{resultScoreString}</span>}
                {totalScore >= 9 ? <p style={{ color: 'red', fontWeight: "bold" }}>{resultString}</p> : <p style={{ color: 'green' }}>{resultString}</p>}
            </div>
            <div style={{height:20}}></div>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <Button color="secondary" variant="outlined" size="large" onClick={handleInit} style={{ marginRight: 20 }}>초기화</Button>
                <Button color="primary" variant="contained" size="large" onClick={handleChangeURL}>입력모드 전환</Button>
            </div>
        </div>
    );

}

export default Main2;