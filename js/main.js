'use strict';
// Input Event listener for Photo Change
const $photo = document.querySelector('#photo');
const $img = document.querySelector('img');
if (!$img || !$photo) throw new Error('Image query failed');
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
// Add event listener to stars
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
  const eventTarget = event.target;
  const starClicked = eventTarget.id;
  if (starClicked === 'one') {
    $one.className = 'fa-solid fa-star';
    $two.className = 'fa-regular fa-star';
    $three.className = 'fa-regular fa-star';
    $four.className = 'fa-regular fa-star';
    $five.className = 'fa-regular fa-star';
    selectedRating = 1;
  } else if (starClicked === 'two') {
    $one.className = 'fa-solid fa-star';
    $two.className = 'fa-solid fa-star';
    $three.className = 'fa-regular fa-star';
    $four.className = 'fa-regular fa-star';
    $five.className = 'fa-regular fa-star';
    selectedRating = 2;
  } else if (starClicked === 'three') {
    $one.className = 'fa-solid fa-star';
    $two.className = 'fa-solid fa-star';
    $three.className = 'fa-solid fa-star';
    $four.className = 'fa-regular fa-star';
    $five.className = 'fa-regular fa-star';
    selectedRating = 3;
  } else if (starClicked === 'four') {
    $one.className = 'fa-solid fa-star';
    $two.className = 'fa-solid fa-star';
    $three.className = 'fa-solid fa-star';
    $four.className = 'fa-solid fa-star';
    $five.className = 'fa-regular fa-star';
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
// Submit Form Event Listener
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
  if (!data.editing) {
    data.nextReviewId++;
    data.reviews.unshift(newReview);
    $ul.prepend(renderReview(newReview));
    writeReviews();
    toggleNoReviews();
    viewSwap('reviews');
    $img.src = originalSrc;
    $one.className = 'fa-regular fa-star';
    $two.className = 'fa-regular fa-star';
    $three.className = 'fa-regular fa-star';
    $four.className = 'fa-regular fa-star';
    $five.className = 'fa-regular fa-star';
    selectedRating = 0;
    formElementsValues.reset();
  } else if (data.editing) {
    for (let i = 0; i < data.reviews.length; i++) {
      if (data.reviews[i].reviewId === data.editing.reviewId) {
        newReview.reviewId = data.reviews[i].reviewId;
        data.reviews[i] = newReview;
        break;
      }
    }
    const $allLi = document.querySelectorAll('li');
    if (!$allLi) throw new Error('$allLi query failed!');
    for (let i = 0; i < $allLi.length; i++) {
      if (
        Number($allLi[i].getAttribute('data-review-id')) ===
        data.editing.reviewId
      ) {
        let originalLi = $allLi[i];
        const newLi = renderReview(newReview);
        $ul?.replaceChild(newLi, originalLi);
        break;
      }
    }
    data.editing = null;
    writeReviews();
    toggleNoReviews();
    viewSwap('reviews');
    $img.src = originalSrc;
    $one.className = 'fa-regular fa-star';
    $two.className = 'fa-regular fa-star';
    $three.className = 'fa-regular fa-star';
    $four.className = 'fa-regular fa-star';
    $five.className = 'fa-regular fa-star';
    selectedRating = 0;
    formElementsValues.reset();
  }
}
formElementsValues.addEventListener('submit', submit);
// Create DOM element function
function renderReview(review) {
  const $li = document.createElement('li');
  $li.setAttribute('data-review-id', `${review.reviewId}`);
  $li.className = 'row';
  const $div1 = document.createElement('div');
  $div1.className = 'column-half';
  $li.appendChild($div1);
  const $img = document.createElement('img');
  $img.setAttribute('src', review.photo);
  $div1.appendChild($img);
  const $div2 = document.createElement('div');
  $div2.className = 'column-half';
  $li.appendChild($div2);
  const $h3 = document.createElement('h3');
  $h3.textContent = review.bookTitle;
  $div2.appendChild($h3);
  const $pencil = document.createElement('i');
  $pencil.className = 'fa-solid fa-pencil';
  $h3.appendChild($pencil);
  const $h4 = document.createElement('h4');
  $h4.textContent = review.author;
  $div2.appendChild($h4);
  for (let i = 0; i < 5; i++) {
    const $star = document.createElement('i');
    $star.className =
      i < review.rating ? 'fa-solid fa-star' : 'fa-regular fa-star';
    $div2.appendChild($star);
  }
  const $p = document.createElement('p');
  $p.textContent = review.review;
  $div2.appendChild($p);
  return $li;
}
const $ul = document.querySelector('ul');
if (!$ul) throw new Error('$ul query failed');
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.reviews.length; i++) {
    const dataReview = data.reviews[i];
    $ul.appendChild(renderReview(dataReview));
  }
  viewSwap(data.view);
  toggleNoReviews();
});
// Function to switch the view
const $reviewForm = document.querySelector('#review-form');
const $reviews = document.querySelector('#reviews');
const $home = document.querySelector('#home');
if (!$reviewForm || !$reviews)
  throw new Error('$reviews, $home, and $review-form query failed');
function viewSwap(viewName) {
  if (viewName === 'reviews') {
    $reviews.className = 'view';
    $reviewForm.className = 'view hidden';
    $home.className = 'view hidden';
  } else if (viewName === 'review-form') {
    $reviews.className = 'view hidden';
    $reviewForm.className = 'view';
    $home.className = 'view hidden';
  } else if (viewName === 'home') {
    $reviews.className = 'view hidden';
    $reviewForm.className = 'view hidden';
    $home.className = 'view';
  }
  data.view = viewName;
  writeReviews();
}
const $reviewsMessage = document.querySelector('.reviews-message');
if (!$reviewsMessage) throw new Error('$reviewsMessages query failed');
//Function to turn message regarding no reviews, on and off
function toggleNoReviews() {
  if (data.reviews.length === 0) {
    $reviewsMessage.className = 'reviews-message no';
  } else {
    $reviewsMessage.className = 'reviews-message yes';
  }
}
//Event Listeners on nav bar
const $newButton = document.querySelector('#new-button');
const $reviewNav = document.querySelector('#review-nav');
const $homeNav = document.querySelector('#home-nav');
if (!$newButton || !$reviewNav || !$homeNav)
  throw new Error('$newButton, $homeNav, and $reviewNav query failed');
$newButton.addEventListener('click', () => {
  viewSwap('review-form');
  $img.src = originalSrc;
  $one.className = 'fa-regular fa-star';
  $two.className = 'fa-regular fa-star';
  $three.className = 'fa-regular fa-star';
  $four.className = 'fa-regular fa-star';
  $five.className = 'fa-regular fa-star';
  selectedRating = 0;
  formElementsValues.reset();
});
$reviewNav.addEventListener('click', () => viewSwap('reviews'));
$homeNav.addEventListener('click', () => viewSwap('home'));
//Edit Review Code
function populateRating(ratingValue) {
  selectedRating = ratingValue;
  if (ratingValue === 1) {
    $one.className = 'fa-solid fa-star';
    $two.className = 'fa-regular fa-star';
    $three.className = 'fa-regular fa-star';
    $four.className = 'fa-regular fa-star';
    $five.className = 'fa-regular fa-star';
    selectedRating = 1;
  } else if (ratingValue === 2) {
    $one.className = 'fa-solid fa-star';
    $two.className = 'fa-solid fa-star';
    $three.className = 'fa-regular fa-star';
    $four.className = 'fa-regular fa-star';
    $five.className = 'fa-regular fa-star';
    selectedRating = 2;
  } else if (ratingValue === 3) {
    $one.className = 'fa-solid fa-star';
    $two.className = 'fa-solid fa-star';
    $three.className = 'fa-solid fa-star';
    $four.className = 'fa-regular fa-star';
    $five.className = 'fa-regular fa-star';
    selectedRating = 3;
  } else if (ratingValue === 4) {
    $one.className = 'fa-solid fa-star';
    $two.className = 'fa-solid fa-star';
    $three.className = 'fa-solid fa-star';
    $four.className = 'fa-solid fa-star';
    $five.className = 'fa-regular fa-star';
    selectedRating = 4;
  } else if (ratingValue === 5) {
    $one.className = 'fa-solid fa-star';
    $two.className = 'fa-solid fa-star';
    $three.className = 'fa-solid fa-star';
    $four.className = 'fa-solid fa-star';
    $five.className = 'fa-solid fa-star';
    selectedRating = 5;
  }
}
function populateReview(review) {
  const $formElements = formElementsValues?.elements;
  $formElements.bookTitle.value = review.bookTitle;
  $formElements.author.value = review.author;
  $formElements.photo.value = review.photo;
  $img.src = review.photo;
  $formElements.review.value = review.review;
  populateRating(review.rating);
}
$ul.addEventListener('click', (event) => {
  let eventTarget = event.target;
  let elementName = eventTarget.tagName;
  console.log(elementName);
  if (elementName === 'I') {
    const closestLi = eventTarget.closest('li');
    if (closestLi) {
      let editReview = closestLi.getAttribute('data-review-id');
      let editableReview = Number(editReview);
      for (let i = 0; i < data.reviews.length; i++) {
        if (data.reviews[i].reviewId === editableReview) {
          viewSwap('review-form');
          let dataReview = data.reviews[i];
          data.editing = dataReview;
          populateReview(dataReview);
        }
      }
    }
  }
});
