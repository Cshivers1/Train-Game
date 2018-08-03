$(document).ready(function () {
  let config = {
    apiKey: "AIzaSyA2LgYA_zuP80x1Wn2FsDB2Bu1daxw2CwU",
    authDomain: "train-game-2b5b2.firebaseapp.com",
    databaseURL: "https://train-game-2b5b2.firebaseio.com",
    projectId: "train-game-2b5b2",
    storageBucket: "train-game-2b5b2.appspot.com",
    messagingSenderId: "673793607948"
  };
  firebase.initializeApp(config);
  let database = firebase.database();

  // Initialize push into database on click

  $('.submit').on('click', function (e) {
    e.preventDefault();
    console.log('cow')
    database.ref().push({
      name: $('.trainName').val().trim(),
      destination: $('.trainDestination').val().trim(),
      time: $('.trainTime').val().trim(),
      frequency: $('.trainFrequency').val().trim(),
    });
  })

  // Information calculation for varibles 

  database.ref().on('child_added', function (snapshot) {
    console.log(snapshot.val());
    let snap = snapshot.val();

    let trainTime = snap.time;
    let trainFrequency = snap.frequency;
    console.log(trainTime, trainFrequency);

    let nextArrival = nextArrival(trainTime, timeFrequency);
    $('.data').append(
      `
            <div class="rowHead row">
            <div class="col-md name">${snap.name}</div>
            <div class="col-md destination">${snap.destination}</div>
            <div class="col-md frequency">${snap.frequency}</div>
            <div class="col-md nextTrainTime">${snap.departures}</div>
            <div class="col-md timeTill">${snap.arrivals}</div>
        </div>
        `

    )

  })
  //calculating functiong 
  function gettingTimeTrain(initialStartTime, timeFrequency) {
    //variables
    let gfy = moment().format('HH:mm');
    let startTime = initialStartTime;

    //timeFrequency = timeFrequency

    //Next train function
    let gTime = convert(gfy);
    console.log(gfy, startTime);
    let newTrain = nextTrain(startTime, gfy, timeFrequency);
    console.log(newTrain);
    nextTrainTime = revert(newTrain[0]);
    trainWillArrive = newTrain[1];
    console.log(newTrain);
    //Function to set up values for the last 2 columns in table
    nextTrainTime = revert(newTrain[0]);
    trainWillArrive = newTrain[1];
    console.log(revert);
    let finalResults = [];
    finalResults.push(nextTrainTime, trainWillArrive);
    console.log(finalResults);
    return finalResults

  }
  function revert(a) {
    console.log(a);
    let time = parseFloat(a[0] / 60);
    console.log(time)
    timeH = parseInt(time);
    timeM = time - timeH;
    timeM = timeM * 60;
    if (timeM < 10) {
      timeM = '0' + timeM;
    }
    console.log(`${timeH}:${timeM}`);
    let timerz = `${timeH}:${timeM}`
    return timerz;
  }

  //convert string to minutes
  function convert(e) {
    console.log(e);
    let time = e.split(':');
    return parseInt((time[0] * 60)) + parseInt((time[1]));
    // console.log(timer)
  }

  // use convert fxn to get the next train info
  function nextTrain(sTime, nTime, timeFrequency) {
    console.log("stime", sTime);

    let nextTrainArray = [];
    console.log(timeFrequency + 'freq2' + typeof timeFrequency);
    let x = parseInt(timeFrequency);
    //for loop to find next train
    for (let index = sTime; index < 1440; index += x) {
      console.log(index);
      if (index > nTime) {
        console.log('boo');
        let newTrainz = index;
        console.log('newTrainz= ' + newTrainz);
        let minutesTill = index - nTime;
        console.log('TILL: ' + minutesTill);
        nextTrainArray.push(newTrainz, minutesTill)
        return nextTrainArray;
      }
    }
  }

})





