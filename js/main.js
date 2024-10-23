'use strict';
const $photo = document.querySelector('#photo');
const $img = document.querySelector('img');
if (!$img || !$photo) throw new Error('Image query failed');
// Input Event listener for Photo Change
const originalSrc = $img.src;
$img.dataset.originalSrc = originalSrc;
function inputPhoto(event) {
  const eventTarget = event.target;
  const newSrc = eventTarget.value;
  $img.src = newSrc;
  writeReviews();
  if (!newSrc) {
    $img.src = originalSrc;
  }
}
$photo.addEventListener('input', inputPhoto);
//Add event listener to stars
const $stars = document.querySelector('.stars');
const $one = document.querySelector('#one');
const $two = document.querySelector('#two');
const $three = document.querySelector('#three');
const $four = document.querySelector('#four');
const $five = document.querySelector('#five');
if (!$one || !$two || !$three || !$four || !$five || !$stars)
  throw new Error('Star search failed');
let selectedRating = 0;
function rating(event) {
  let eventTarget = event.target;
  let starClicked = eventTarget.id;
  if (starClicked === 'one') {
    $one.className = 'fa-solid fa-star';
    selectedRating = 1;
  } else if (starClicked === 'two') {
    $one.className = 'fa-solid fa-star';
    $two.className = 'fa-solid fa-star';
    selectedRating = 2;
  } else if (starClicked === 'three') {
    $one.className = 'fa-solid fa-star';
    $two.className = 'fa-solid fa-star';
    $three.className = 'fa-solid fa-star';
    selectedRating = 3;
  } else if (starClicked === 'four') {
    $one.className = 'fa-solid fa-star';
    $two.className = 'fa-solid fa-star';
    $three.className = 'fa-solid fa-star';
    $four.className = 'fa-solid fa-star';
    selectedRating = 4;
  } else if (starClicked === 'five') {
    $one.className = 'fa-solid fa-star';
    $two.className = 'fa-solid fa-star';
    $three.className = 'fa-solid fa-star';
    $four.className = 'fa-solid fa-star';
    $five.className = 'fa-solid fa-star';
    selectedRating = 5;
  }
  return selectedRating;
}
$stars.addEventListener('click', rating);
//Submit Form Event Listener
const formElementsValues = document.querySelector('form');
if (!formElementsValues) throw new Error('formElementsVales query failed');
function submit(event) {
  event.preventDefault();
  const $formElements = formElementsValues.elements;
  const newReview = {
    bookTitle: $formElements.bookTitle.value,
    author: $formElements.author.value,
    photo: $formElements.photo.value,
    rating: selectedRating,
    review: $formElements.review.value,
    reviewId: data.nextReviewId,
  };
  data.nextReviewId++;
  data.reviews.unshift(newReview);
  $img.src = originalSrc;
  $one.className = 'fa-regular fa-star';
  $two.className = 'fa-regular fa-star';
  $three.className = 'fa-regular fa-star';
  $four.className = 'fa-regular fa-star';
  $five.className = 'fa-regular fa-star';
  selectedRating = 0;
  writeReviews();
  formElementsValues.reset();
}
formElementsValues.addEventListener('submit', submit);
