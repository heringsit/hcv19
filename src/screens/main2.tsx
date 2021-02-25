import React, { useState, useRef, useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

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



    const [totalScore, setTotalScore] = React.useState(0);
    const [resultString, setResultString] = React.useState("");
    const [resultScoreString, setResultScoreString] = React.useState("");

    const crpInput : any = useRef<HTMLDivElement>(null);
    const ldhInput : any = useRef<HTMLDivElement>();
    const hemoInput : any = useRef<HTMLDivElement>();

    const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let selectVal = Number(event.target.value)
        setAge(selectVal);
    };

    const handleCRPChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRealcrp(Number(event.target.value));
        let inputVal = Number(event.target.value);
        console.log(" inputVal CRP >> ", inputVal);
        if(inputVal < 1.4){
            inputVal = 0;
        }else{
            inputVal = 3;
        }  
        setCrp(inputVal);

    };

    const handleLDHChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRealldh(Number(event.target.value));
        let inputVal = Number(event.target.value);
        console.log(" inputVal LDH >> ", inputVal);
        if(inputVal < 500){
            inputVal = 0;
        }else if(inputVal < 700){
            inputVal = 2;
        }else{
            inputVal = 4;
        }
        setLdh(inputVal);
    };

    const handleHemoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRealhemo(Number(event.target.value));
        let inputVal = Number(event.target.value);
        console.log(" inputVal Hemo >> ", inputVal);
        if(inputVal < 13.3){
            inputVal = 0;
        }else{
            inputVal = 3;
        }
        setHemo(inputVal);
    };

    const handleTotalScore = (event: any) => {
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
        } else {
            setResultString("중증 폐렴 전이 가능성이 낮은 환자입니다.");
        }

        setResultScoreString(`위험도 지수: ${totalScore}`);

        const patientDtoObj  = {
            age:age,
            crp:realCrp,
            ldh:realLdh,
            hemo:realHemo
        }

        console.log("patientDtoObj >>>>>> ", patientDtoObj)

        axios.post(comm.SERVER_URL+"/patient", patientDtoObj).then(res => {
            console.log(' res >> ', res);
        });

    }

    const handleInit = (ev: any) => {
        setAge(-1);
        setResultString("");
        crpInput.current.value = "";
        ldhInput.current.value = "";
        hemoInput.current.value = "";
        setResultScoreString("");
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', margin: 25, width:360}}>
            <div style={{ marginTop: 10 }}>환자 검진 정보를 입력해 주세요</div>
            <FormControl component="fieldset" style={{ marginTop: 20 }}>
                <FormLabel component="legend" style={{ fontWeight: 'bold', color: 'black', fontSize: 17.5 }}>Age(years)</FormLabel>
                <RadioGroup aria-label="age" name="age" value={age} onChange={handleAgeChange} style={{ padding: 5 }}>
                    <FormControlLabel value={0} control={<Radio />} label="50 미만" />
                    <FormControlLabel value={4} control={<Radio />} label="50대(50-59)" />
                    <FormControlLabel value={5} control={<Radio />} label="60대(60-69)" />
                    <FormControlLabel value={7} control={<Radio />} label="70대(70-79)" />
                    <FormControlLabel value={10} control={<Radio />} label="80대(>=80) 이상" />
                </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" style={{ marginTop: 15 }}>
                <FormLabel component="legend" style={{ fontWeight: 'bold', color: 'black', fontSize: 17.5, marginBottom: 15 }}>C-reactive protein(mg/dL)</FormLabel>
                <TextField
                    id="crp"
                    label="mg/dL"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    style={{width:250}}
                    onChange={handleCRPChange}
                    inputRef={crpInput}
                    // ref={crpInput}
                    placeholder="ex) 1.4"
                />  
            </FormControl>

            <FormControl component="fieldset" style={{ marginTop: 15 }}>
                <FormLabel component="legend" style={{ fontWeight: 'bold', color: 'black', fontSize: 17.5, marginBottom: 15 }}>Lactate dehydrogenase(U/L)</FormLabel>
                <TextField
                    id="ldh"
                    label="U/L"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    style={{width:250}}
                    onChange={handleLDHChange}
                    inputRef={ldhInput}
                    placeholder="ex) 550"

                />
            </FormControl>

            <FormControl component="fieldset" style={{ marginTop: 15 }}>
                <FormLabel component="legend" style={{ fontWeight: 'bold', color: 'black', fontSize: 17.5, marginBottom: 15 }}>Hemoglobin(g/dL)</FormLabel>
                <TextField
                    id="ldh"
                    label="g/dL"
                    type="number"

                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    style={{width:250}}
                    onChange={handleHemoChange}
                    inputRef={hemoInput}
                    placeholder="ex) 13.3"

                />
            </FormControl>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <Button color="primary" variant="contained" size="medium" onClick={handleTotalScore}>결과 보기</Button>
                <Button color="secondary" variant="outlined" size="medium" onClick={handleInit} style={{ marginLeft: 15 }}>초기화</Button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                {totalScore >= 9 ? <p style={{ color: 'red', fontWeight: "bold" }}>{resultScoreString}</p> : <p style={{ color: 'green' }}>{resultScoreString}</p>}
                {totalScore >= 9 ? <p style={{ color: 'red', fontWeight: "bold" }}>{resultString}</p> : <p style={{ color: 'green' }}>{resultString}</p>}
            </div>

        </div>
    );

}

export default Main2;