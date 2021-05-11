let staff;
let scheduleSelect = document.getElementById('staff_schedule');
let form = document.getElementById('form');
let form2 = document.getElementById('form2');
const submitEvent = new Event('submit');

function validEmail(email) {
  return email.match(/^\w+@\w+\.\w+$/);
}

function populateSchedules(staff) {
  function addOptions(schedules) {
    schedules.forEach(schedule => {
      nextOption = document.createElement('OPTION');
      nextOption.value = schedule.id;
      let thisStaff = staff.find(member => member.id === schedule.staff_id);
      nextOption.textContent = `${thisStaff.name} | ${schedule.date} | ${schedule.time}`;
      scheduleSelect.appendChild(nextOption);
    });
  }

  let schedulesRequest = new XMLHttpRequest();
  schedulesRequest.open('GET', 'api/schedules');
  schedulesRequest.addEventListener('load', () => {
    let schedules = JSON.parse(schedulesRequest.response);
    addOptions(schedules);
  });
  schedulesRequest.send();
}

let staffRequest = new XMLHttpRequest();
staffRequest.open('GET', 'api/staff_members');
staffRequest.addEventListener('load', () => {
  staff = JSON.parse(staffRequest.response);
  populateSchedules(staff);
});
staffRequest.send();

function formDataToJson(formData) {
  const json = {};
  for (elem of formData.entries()) {
    if (elem[0] === 'booking_sequence') {
      json[elem[0]] = Number(elem[1]);
    } else {
      json[elem[0]] = elem[1];
    }
  }
  return json;
}

function addStudent(data, response) {
  form2.style.display = 'block';
  let studentEmail = document.getElementById('student_email2');
  studentEmail.value = data.student_email;
  let bookingSequence = document.getElementById('booking_sequence');
  bookingSequence.value = response.split(' ').pop();
}

form.addEventListener('submit', event => {
  event.preventDefault();
  let data = new FormData(form);
  let jsonData = formDataToJson(data);

  if (!validEmail(jsonData.student_email)) {
    alert('Must enter a valid email address');
    return;
  }

  let xhr = new XMLHttpRequest();
  xhr.open('POST', form.action);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.addEventListener('error', () => {
    alert('Request error');
  });
  xhr.addEventListener('load', () => {
    switch (xhr.status) {
      case 204:
        alert('Booked');
        form.reset();
        break;
      case 404:
        alert(xhr.responseText);
        if (xhr.responseText !== 'Schedule is either booked or does not exist.') {
          addStudent(jsonData, xhr.responseText);
        }
        break;
      case 500:
        alert('Server error');
        break;
    }
  });
  xhr.send(JSON.stringify(jsonData));
});

form2.addEventListener('submit', event => {
  event.preventDefault();
  let data2 = new FormData(form2);
  let jsonData2 = formDataToJson(data2);

  let xhr2 = new XMLHttpRequest();
  xhr2.open('POST', form2.action);
  xhr2.setRequestHeader('Content-Type', 'application/json');
  xhr2.addEventListener('error', () => {
    alert('Request error');
  });
  xhr2.addEventListener('load', () => {
    switch (xhr2.status) {
      case 201:
        alert(xhr2.responseText);
        form2.style.display = 'none';
        form.dispatchEvent(submitEvent);
        form.reset();
        break;
      case 400:
        alert(xhr2.responseText);
        break;
      case 403:
        alert(xhr2.responseText);
        break;
      case 500:
        alert('Server error');
        break;
    }
  });
  xhr2.send(JSON.stringify(jsonData2));
});
