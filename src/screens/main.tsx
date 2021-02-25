import React, { useState, useRef, useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {Button} from '@material-ui/core';

import axios from 'axios';
import comm from '../common';
import { Link, useHistory } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import { useForm } from "react-hook-form";

function Main(): any {
    const [age, setAge] = React.useState(-1);
    const [crp, setCrp] = React.useState(-1);
    const [ldh, setLdh] = React.useState(-1);
    const [hemo, setHemo] = React.useState(-1);
    const [totalScore, setTotalScore] = React.useState(0);
    const [resultString, setResultString] = React.useState("");
    const [resultScoreString, setResultScoreString] = React.useState("");

    const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let selectVal = Number(event.target.value)
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

    const handleTotalScore = (event:any) => {
        if(age === -1){
            console.log(" 나이를 입력하세요. ")
            return;
        }
        if(crp === -1){
            console.log(" C-reactive protein을 입력하세요. ")
            return;
        }

        if(ldh === -1){
            console.log(" Lactate dehydrogenase을 입력하세요. ")
            return;
        }

        if(hemo === -1){
            console.log(" hemoglobin을 입력하세요. ")
            return;
        }

        let totalScore = age + crp + ldh + hemo;
        setTotalScore(totalScore);
        if(totalScore >= 9){
            setResultString("중증 폐렴 전이 가능성이 높은 환자입니다.");
        }else{
            setResultString("중증 폐렴 전이 가능성이 낮은 환자입니다.");
        }
        
        setResultScoreString(`위험도 지수: ${totalScore}`);

        const patientDtoObj  = {
            age:age,
            crp:crp,
            ldh:ldh,
            hemo:hemo
        }

        console.log("patientDtoObj >>>>>> ", patientDtoObj)

        axios.post(comm.SERVER_URL+"/patient", patientDtoObj).then(res => {
            console.log(' res >> ', res);
        });
    }
    
    const handleInit = (ev:any) => {
        setAge(-1);
        setCrp(-1);
        setLdh(-1);
        setHemo(-1);
        setResultString("");
        setResultScoreString("");
    } 

    return (
        <div style={{display:'flex', flexDirection:'column', margin:25 }}>
            <div style={{marginTop:10}}>환자 검진 정보를 체크해 주세요</div>
            <FormControl component="fieldset" style={{marginTop:20}}>
                <FormLabel component="legend" style={{fontWeight:'bold', color:'black', fontSize:17.5}}>Age(years)</FormLabel>
                <RadioGroup aria-label="age" name="age" value={age} onChange={handleAgeChange} style={{padding:5}}>
                    <FormControlLabel value={0} control={<Radio />} label="50 미만" />
                    <FormControlLabel value={4} control={<Radio />} label="50대(50-59)" />
                    <FormControlLabel value={5} control={<Radio />} label="60대(60-69)" />
                    <FormControlLabel value={7} control={<Radio />} label="70대(70-79)" />
                    <FormControlLabel value={10} control={<Radio />} label="80대(>=80) 이상" />
                </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" style={{marginTop:15}}>
                <FormLabel component="legend" style={{fontWeight:'bold', color:'black', fontSize:17.5}}>C-reactive protein(mg/dL)</FormLabel>
                <RadioGroup aria-label="crp" name="crp" value={crp} onChange={handleCRPChange} style={{padding:5}}>
                    <FormControlLabel value={0} control={<Radio />} label="< 1.4" />
                    <FormControlLabel value={3} control={<Radio />} label=">= 1.4" />
                </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" style={{marginTop:15}}>
                <FormLabel component="legend" style={{fontWeight:'bold', color:'black', fontSize:17.5}}>Lactate dehydrogenase(U/L)</FormLabel>
                <RadioGroup aria-label="ldh" name="ldh" value={ldh} onChange={handleLDHChange} style={{padding:5}}>
                    <FormControlLabel value={0} control={<Radio />} label="< 500" />
                    <FormControlLabel value={2} control={<Radio />} label="500-700" />
                    <FormControlLabel value={4} control={<Radio />} label=">= 700" />
                </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" style={{marginTop:15}}>
                <FormLabel component="legend" style={{fontWeight:'bold', color:'black', fontSize:17.5}}>Hemoglobin(g/dL)</FormLabel>
                <RadioGroup aria-label="hemo" name="hemo" value={hemo} onChange={handleHemoChange} style={{padding:5}}>
                    <FormControlLabel value={0} control={<Radio />} label="< 13.3" />
                    <FormControlLabel value={3} control={<Radio />} label=">= 13.3" />
                </RadioGroup>
            </FormControl>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:20 }}>
                <Button color="primary" variant="contained" size="medium" onClick={handleTotalScore}>결과 보기</Button>
                <Button color="secondary" variant="outlined" size="medium" onClick={handleInit} style={{marginLeft:15}}>초기화</Button>
            </div>
            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:15 }}>
                {totalScore >= 9 ? <p style={{ color: 'red', fontWeight: "bold" }}>{resultScoreString}</p> : <p style={{ color: 'green' }}>{resultScoreString}</p>}
                {totalScore >= 9 ? <p style={{color:'red', fontWeight:"bold"}}>{resultString}</p> : <p style={{color:'green'}}>{resultString}</p>}
            </div>

        </div>
    );

}

export default Main;