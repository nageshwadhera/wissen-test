import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {Table,TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@mui/material";
import { setToken } from "../redux/action";

export default function Users() {
  const Token = useSelector((state) => state?.auth?.token);
  const userList = useSelector((state) => state?.auth?.userList);
  const [Header, setHeader] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let timer;
    
  useEffect(() => {
    if (!Token) navigate("/login");
      Object.values(events).forEach((item) => {
        window.addEventListener(item, () => {
          resetTimer();
          logoutTimer();
        });
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userList?.length)
      setHeader(
        Object.keys(userList[0]).map((key) => {
          return key;
        })
      );
  }, [userList]);

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
    dispatch(setToken(""))
      localStorage.clear();
    navigate("/login");
    };
          
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {Header?.map((cellName, index) => {
              return (
                <TableCell align="right" key={index}>
                  {cellName}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {userList?.map((user) => (
            <TableRow
              key={user.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              style={{ backgroundColor: user.color }}>
              <TableCell align="right">{user.id}</TableCell>
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
