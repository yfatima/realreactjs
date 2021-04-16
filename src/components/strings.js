import React, { useState, useCallback, useEffect, useRef } from "react";
/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import getPlace from "../core/popcorn";

function numberOnly(value, fallbackValue) {
  if (isNaN(value)) {
    return fallbackValue;
  } else {
    return value;
  }
}

function Strings(props) {
  const initiallist = [];
  const [list, setList] = useState(initiallist); // const stateAndSetter= useState(""); const firstValue = stateAndSetter[0], setFirstValue= stateAndSetter[1];
  const [name, setName] = useState("");
  let result = "";
  const radio1 = "replacement";
  const radio2 = "withoutreplacement";
  
  function handleFirstValueChange(event) {
    setName(event.target.value);
  }

  function handleAddChange() {
    const tmp = name.toString();
    const newList = list.concat(tmp);

    setList(newList);
    document.getElementById("showlist").innerHTML = newList.join("<br />");
  }

  function handleResetChange() {
    const newList = [];
    setList(newList);
    document.getElementById("showlist").innerHTML = newList.join("<br />");
  }
  
  function handleReplacmentChange() {
	console.log(list);
  	if ( list.length == 0) {
     	document.getElementById("result").innerHTML = "No strings in the collection!";
     }
     else {
     	 let index = getRandomInt(0, list.length);
     	result = list[index];
     	document.getElementById("result").innerHTML = result;
     	console.log(result);
     }
  	
  }
  
  function handleWithoutReplacementChange() {
  	 if ( list.length == 0) {
     	document.getElementById("result").innerHTML = "No strings in the collection!";
     }
 	else {
 	 	let index = getRandomInt(0, list.length);
     	result = list[index];
     	console.log(index);
     	document.getElementById("result").innerHTML = result;
    	 console.log(result);
    	 handleListChange(index);
 		 
 
 	}
     
 }
  
  function handleListChange(index) {
  	 list.splice(index,1);
  	 const newList = list;
     setList(newList);
     console.log(newList);
     document.getElementById("showlist").innerHTML = list.join("<br />");

  }
  
  function getRandomInt(min, max) {
  	min = Math.ceil(min);
  	max = Math.floor(max);
  	return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
 
  return (
    <div css={css`
      position: relative;
    `}>
      <h2>Assignment 8</h2>
      {/* <form action="" name="addressForm"> */}
      {/* <!-- A borderless table of text widgets for name and address --> */}
      <p><h3>Instructions:</h3> Enter one string at a time and click add</p><br/>
      <table>
        <tr>
          <td> Enter a string: </td>
          <td>
            <input type="text" name="firstValue" size="30" onChange={handleFirstValueChange} />
          </td>
        </tr>
      </table>
       <p id="showlist"></p>


      {/* <!-- The submit and reset buttons --> */}
      <p>
        <input type="button" value="Add" onClick={handleAddChange}/>
        <input type="reset" value="Clear" onClick={handleResetChange}/>
      </p>
      
      <h3>Get a random string:</h3>
       
       <input type="submit" value="With Replacement" onClick={handleReplacmentChange}/>
       <input type="submit" value="Without Replacement" onClick={handleWithoutReplacementChange}/>
       <h3>Result:</h3>
       <p id="result"></p>
       
       <br/>
    	<br/>
        <br/>
        <br/>
       <p> We had two meetings together to work on this assignment. One person shared the screen and the other two gave ideas and helped write the code. Also, all design decisions were made collaboratively. We made a github repository to share the Assignment 8 servlet file with all the group members</p>
    </div>
  );
}

export default Strings;
