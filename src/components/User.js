import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Users() {
    const Token = useSelector((state)=>state?.auth?.token)
    const userList = useSelector((state) => state?.auth?.userList)
    const [Header, setHeader] = useState([])
    const navigate = useNavigate();
    let timer;
    
    
    useEffect(()=>{
      Object.values(events).forEach((item) => {
        window.addEventListener(item, () => {
          resetTimer();
          logoutTimer();
        });
      });
    },[])

    useEffect(()=>{
        if(userList?.length)
            setHeader(Object.keys(userList[0]).map((key)=>{return key}))    
    },[userList])


    const events = [
      "load",
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress",
    ];
    
    
    
    const logoutTimer = () => {
      timer = setTimeout(() => {
        resetTimer();
        Object.values(events).forEach((item) => {
          window.removeEventListener(item, resetTimer);
        });
        logout();
      }, 1000 * 60 * 5);
    };
  
    const resetTimer = () => {
      if (timer) clearTimeout(timer);
    };
    
    const logout = () => {
      localStorage.clear();
      navigate("/login")
    };
          
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {Header?.map((cellName,index)=>{
                return(<TableCell align='right' key={index}>{cellName}</TableCell>)
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {userList?.map((user) => (
            <TableRow
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              style={{'backgroundColor': user.color}}
            >
              <TableCell align='right'>
                {user.id}
              </TableCell>
              <TableCell align="right">{user.name}</TableCell>
              <TableCell align="right">{user.year}</TableCell>
              <TableCell align="right">{user.color}</TableCell>
              <TableCell align="right">{user.pantone_value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}