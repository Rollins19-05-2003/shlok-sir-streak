const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("button");
const main = document.querySelector(".main");

let alarmTime, isAlarmSet = false;
ringtone = new Audio("alarm_clock.mp3");

for(let i = 12; i>0; i--){
    i = i >= 10 ? i : "0" + i;
    let option = `<option value="${i}">${i}</option>` 
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i = 59; i>=0; i--){
    i = i >= 10 ? i : "0" + i;
    let option = `<option value="${i}">${i}</option>` 
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i = 2; i>0; i--){
    let ampm = i==1? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>` 
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}


setInterval(()=>{
    const time = document.querySelector("h3");
    let dd = new Date();
    let hour = dd.getHours();
    let minute = dd.getMinutes();
    let second = dd.getSeconds();
    let daynight = "AM";
    if(hour > 12){
        hour = hour - 12;
        daynight = "PM";
    }

    if(hour < 10){
        hour = "0" + hour;
    }

    if(minute < 10){
        minute = "0" + minute;
    }

    if(second < 10){
        second = "0" + second;
    }

    if(hour == 0){
        hour = "12";
    }

    time.textContent = hour + " : " + minute + " : " + second + " " + daynight;
    if(alarmTime == `${hour}:${minute} ${daynight}`){
        ringtone.play();
        ringtone.loop = true;
    }
}, 1000)



function setAlarm() {
    if (isAlarmSet == true) {
      alarmTime = ""; 
      ringtone.pause(); 
      setAlarmBtn.innerText = "Set Alarm"; 
      return (isAlarmSet = false);
    }
    let currentTime = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if (
      currentTime.includes("Hour") ||
      currentTime.includes("Minutes") ||
      currentTime.includes("AM/PM")
    ) {
      return alert("Please, Select a Valid time to Set Alarm..!");
    }
  
    isAlarmSet = true;
    alarmTime = currentTime;
    setAlarmBtn.innerText = "Clear Alarm";
  }


  setAlarmBtn.addEventListener("click", setAlarm);
  