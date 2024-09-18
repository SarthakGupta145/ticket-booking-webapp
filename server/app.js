const express = require('express');
const cors =require('cors');
const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

const PORT = 3000;


// Initial seat layout (0 = available, 1 = booked)
let seatLayout = [
    [1, 1, 1, 0, 1, 1, 1],
    [0, 1, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 0],
    [0, 1, 1, 0, 0, 1, 0],
    [1, 0, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 0],
    [1, 0, 0, 0, 1, 0, 0],
    [0, 1, 1],
];

function findAndBookSeats(numSeats){
    let bookedSeats = [];

    // Try to find a row with enough available seats

    for(let i=0;i<seatLayout.length;i++)
    {
        let availableSeatsInRow =seatLayout[i].filter(seat => seat===0).length;
        if(availableSeatsInRow >=numSeats){
            for(let j=0;j<seatLayout[i].length;j++){
                if(seatLayout[i][j]===0 &&bookedSeats.length<numSeats){
                    seatLayout[i][j] =1;
                    bookedSeats.push(`S${i*7 +j+1}`);
                }
            }
            return bookedSeats;
        }
    }

    // If no single row has enough seats, book nearby seats
  for (let i = 0; i < seatLayout.length; i++) {
    for (let j = 0; j < seatLayout[i].length; j++) {
      if (seatLayout[i][j] === 0 && bookedSeats.length < numSeats) {
        seatLayout[i][j] = 1;
        bookedSeats.push(`S${i * 7 + j + 1}`);
      }
    }
    if (bookedSeats.length === numSeats) return bookedSeats;
  }

  return bookedSeats;
}

app.get('/seat-layout',(req,res)=>{
    res.json({seatLayout});
});

app.post('/book-seats',(req,res)=>{
    const {numSeats}=req.body;
    if(numSeats <1 || numSeats >7){
        return res.json({success:false,message:'You can only book between 1 to 7 seats.'});
    }else{
        return res.json({success:false,message:'Not enough seats available.'});
    }
});

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});

