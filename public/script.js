// Initialize the seat layout (0 = available, 1 = booked)
const seatLayout = JSON.parse(localStorage.getItem('seatLayout')) || [
    [0, 0, 1, 0, 0, 1, 0],  // Row 1
    [1, 0, 0, 0, 1, 1, 1],  // Row 2
    [0, 1, 0, 0, 0, 0, 0],  // Row 3
    [0, 0, 1, 1, 1, 0, 0],  // Row 4
    [0, 0, 0, 0, 0, 0, 0],  // Row 5
    [1, 1, 1, 0, 0, 0, 1],  // Row 6
    [0, 0, 0, 0, 0, 0, 0],  // Row 7
    [0, 0, 0, 0, 0, 0, 0],  // Row 8
    [0, 0, 0, 0, 0, 0, 0],  // Row 9
    [0, 0, 0, 0, 0, 0, 0],  // Row 10
    [0, 0, 0, 0, 0, 0, 0],  // Row 11
    [0, 0, 0]               // Row 12 (last row with only 3 seats)
  ];

  // Function to save the seat layout to local storage
function saveSeatLayout() {
    localStorage.setItem('seatLayout', JSON.stringify(seatLayout));
  }
  
  // Render the seat layout into the DOM
  function renderSeatLayout(seatLayout) {
    const seatContainer = document.getElementById('seatContainer');
    
    // Clear the seat layout container before rendering new seats
    seatContainer.innerHTML = '';
    console.log('Rendering seat layout:', seatLayout);  // Debugging
    
    seatLayout.forEach((row, rowIndex) => {
      const rowDiv = document.createElement('div');
      rowDiv.className = 'row';
  
      row.forEach((seat, seatIndex) => {
        const seatDiv = document.createElement('div');
        seatDiv.className = 'seat';
  
        // Assign available/booked class
        if (seat === 1) {
          seatDiv.classList.add('booked');
        } else {
          seatDiv.classList.add('available');
        }
  
        // Set the seat number
        seatDiv.innerText = `S${rowIndex * 7 + seatIndex + 1}`;
  
        // Append the seat div to the row div
        rowDiv.appendChild(seatDiv);
      });
  
      // Append the row to the seat container
      seatContainer.appendChild(rowDiv);
    });
  }
  
  // Booking function when "Book Seats" button is clicked
  function bookSeats() {
    const numSeats = parseInt(document.getElementById('numSeats').value);
  
    console.log('Booking seats:', numSeats);  // Debugging
  
    // Check if the input is valid
    if (isNaN(numSeats) || numSeats < 1 || numSeats > 7) {
      alert('Please enter a valid number of seats (1-7).');
      return;
    }
  
    // Check if enough seats are available
    const totalAvailableSeats = seatLayout.flat().filter(seat => seat === 0).length;
    console.log('Total available seats:', totalAvailableSeats);  // Debugging
    
    if (totalAvailableSeats < numSeats) {
      alert('Not enough seats available.');
      return;
    }
  
    // Booking logic
    let seatsBooked = false;
    for (let row = 0; row < seatLayout.length; row++) {
      const rowAvailableSeats = seatLayout[row].filter(seat => seat === 0).length;
  
      if (rowAvailableSeats >= numSeats) {
        console.log(`Booking ${numSeats} seats in row ${row + 1}`);
        let seatsToBook = numSeats;
        for (let i = 0; i < seatLayout[row].length && seatsToBook > 0; i++) {
          if (seatLayout[row][i] === 0) {
            seatLayout[row][i] = 1;
            seatsToBook--;
          }
        }
        seatsBooked = true;
        break;
      }
    }
  
    // If not enough seats in one row, book across multiple rows
    if (!seatsBooked) {
      let seatsToBook = numSeats;
      for (let row = 0; row < seatLayout.length && seatsToBook > 0; row++) {
        for (let i = 0; i < seatLayout[row].length && seatsToBook > 0; i++) {
          if (seatLayout[row][i] === 0) {
            seatLayout[row][i] = 1;
            seatsToBook--;
          }
        }
      }
    }


  // Save the updated seat layout to local storage
  saveSeatLayout();
  
    // Re-render the seat layout after booking
    console.log('Updated seat layout:', seatLayout);  // Debugging
    renderSeatLayout(seatLayout);
  
    alert(`${numSeats} seat(s) successfully booked.`);
  }
  
  // Attach event listeners once the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, rendering seat layout');  // Debugging
    renderSeatLayout(seatLayout);  // Render seats on page load
  
    const bookBtn = document.getElementById('bookBtn');
    bookBtn.addEventListener('click', bookSeats);  // Book seats on button click
  });
  