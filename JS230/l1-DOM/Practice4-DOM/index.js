//Use JavaScript to set a class of 'heading' to the heading (the h1 element).
let heading = document.body.querySelector('h1')
heading.classList.add('heading')
//ALT
document.getElementById('primary_heading').setAttribute('class', 'heading');


//Use JavaScript to set the class of the ul element to 'bulleted'.
document.getElementById('list').setAttribute('class', 'bulleted');


//In this problem and the next, we'll use the onclick Element property. Our page has an element that you can't see initially; it's hidden. When the user clicks the link, the browser should display the hidden item; the next click on that link should hide the revealed item. Each click should toggle the hidden element between the visible and hidden states.
document.getElementById('toggle').onclick = e => {
  e.preventDefault();
  let notice = document.getElementById('notice');
  if (notice.getAttribute('class') === 'hidden') {
    notice.setAttribute('class', 'visible');
  }
  else {
    notice.setAttribute('class', 'hidden');
  }
};
//Clicking the link should now reveal the hidden element, or hide it when it's already visible.


//Add an onclick event to the element we show and hide above. This time, the function should set the class of the element to 'hidden'. This event will let you hide the visible element by clicking on it. As with the previous function, the first thing the function should do is invoke e.preventDefault
let notice = document.getElementById('notice');
notice.onclick = e => {
  e.preventDefault() // for consistency: not needed here
  e.currentTarget.setAttribute('class', 'hidden');
}
//You can now click directly on the revealed element to hide it.


//Locate the multiplication paragraph and change the text to the result of the arithmetic problem.
document.getElementById('multiplication').textContent = String(13 * 9)
//ALT
document.getElementById('multiplication').innerText = String(13 * 9);


//Set the ID of the body element to 'styled' to apply the rest of the styles from the original file. The body tag in this file doesn't have an ID, so you must locate it by some other means.
document.body.setAttribute('id', 'styled')
