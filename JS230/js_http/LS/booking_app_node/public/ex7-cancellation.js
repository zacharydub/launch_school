//<!-- implement two functions: one for cancelling schedules and the other for cancelling of bookings. The functions take a scheduleId and a bookingId as arguments respectively.
//
//-->

function cancelSchedule(scheduleId) {
  const xhr = new XMLHttpRequest();
  xhr.open('DELETE', `/api/schedules/${String(scheduleId)}`);
  xhr.send();
  xhr.addEventListener('load', () => {
    if (xhr.status === 204) {
      alert('Schedule deleted.');
    } else {
      alert(`Deleting failed: ${xhr.responseText}`);
    }
  });
}

function cancelBooking(bookingId) {
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', `/api/bookings/${String(bookingId)}`);
  xhr.send();
  xhr.addEventListener('load', () => {
    if (xhr.status === 204) {
      alert('Booking cancelled.');
    } else {
      alert(`Canceling failed: ${xhr.responseText}`);
    }
  });
}

//he two functions are similar. The primary difference is the method used; one is DELETE and the other is PUT.å
