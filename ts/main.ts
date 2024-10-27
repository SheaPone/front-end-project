interface FormElements extends HTMLFormControlsCollection {
  bookTitle: HTMLInputElement;
  author: HTMLInputElement;
  photo: HTMLInputElement;
  rating: number;
  review: HTMLTextAreaElement;
  reviewId: number;
}

interface Review {
  bookTitle: string;
  author: string;
  photo: string;
  rating: number;
  review: string;
  reviewId: number;
}

const $photo = document.querySelector('#photo') as HTMLInputElement;
const $img = document.querySelector('img') as HTMLImageElement;
if (!$img || !$photo) throw new Error('Image query failed');

// Input Event listener for Photo Change
const originalSrc = $img.src;
$img.dataset.originalSrc = originalSrc;

function inputPhoto(event: Event): void {
  const eventTarget = event.target as HTMLInputElement;
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
function rating(event: Event): number {
  const eventTarget = event.target as HTMLElement;
  const starClicked = eventTarget.id;
  if (starClicked === 'one') {
    $one!.className = 'fa-solid fa-star';
    $two!.className = 'fa-regular fa-star';
    $three!.className = 'fa-regular fa-star';
    $four!.className = 'fa-regular fa-star';
    $five!.className = 'fa-regular fa-star';
    selectedRating = 1;
  } else if (starClicked === 'two') {
    $one!.className = 'fa-solid fa-star';
    $two!.className = 'fa-solid fa-star';
    $three!.className = 'fa-regular fa-star';
    $four!.className = 'fa-regular fa-star';
    $five!.className = 'fa-regular fa-star';
    selectedRating = 2;
  } else if (starClicked === 'three') {
    $one!.className = 'fa-solid fa-star';
    $two!.className = 'fa-solid fa-star';
    $three!.className = 'fa-solid fa-star';
    $four!.className = 'fa-regular fa-star';
    $five!.className = 'fa-regular fa-star';
    selectedRating = 3;
  } else if (starClicked === 'four') {
    $one!.className = 'fa-solid fa-star';
    $two!.className = 'fa-solid fa-star';
    $three!.className = 'fa-solid fa-star';
    $four!.className = 'fa-solid fa-star';
    $five!.className = 'fa-regular fa-star';
    selectedRating = 4;
  } else if (starClicked === 'five') {
    $one!.className = 'fa-solid fa-star';
    $two!.className = 'fa-solid fa-star';
    $three!.className = 'fa-solid fa-star';
    $four!.className = 'fa-solid fa-star';
    $five!.className = 'fa-solid fa-star';
    selectedRating = 5;
  }
  return selectedRating;
}

$stars!.addEventListener('click', rating);

// Submit Form Event Listener
const formElementsValues = document.querySelector('form');
if (!formElementsValues) throw new Error('formElementsVales query failed');

function submit(event: Event): void {
  event.preventDefault();
  const $formElements = formElementsValues!.elements as FormElements;
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
  $ul!.prepend(renderReview(newReview));
  writeReviews();
  toggleNoReviews();
  viewSwap('reviews');
  $img.src = originalSrc;
  $one!.className = 'fa-regular fa-star';
  $two!.className = 'fa-regular fa-star';
  $three!.className = 'fa-regular fa-star';
  $four!.className = 'fa-regular fa-star';
  $five!.className = 'fa-regular fa-star';
  selectedRating = 0;
  formElementsValues!.reset();
}

formElementsValues.addEventListener('submit', submit);

// Create DOM element function
function renderReview(review: Review): HTMLLIElement {
  const $li = document.createElement('li');
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

function viewSwap(viewName: 'reviews' | 'review-form' | 'home'): void {
  if (viewName === 'reviews') {
    $reviews!.className = 'view';
    $reviewForm!.className = 'view hidden';
    $home!.className = 'view hidden';
  } else if (viewName === 'review-form') {
    $reviews!.className = 'view hidden';
    $reviewForm!.className = 'view';
    $home!.className = 'view hidden';
  } else if (viewName === 'home') {
    $reviews!.className = 'view hidden';
    $reviewForm!.className = 'view hidden';
    $home!.className = 'view';
  }
  data.view = viewName;
  writeReviews();
}

const $reviewsMessage = document.querySelector('.reviews-message');
if (!$reviewsMessage) throw new Error('$reviewsMessages query failed');

function toggleNoReviews(): void {
  if (data.reviews.length === 0) {
    $reviewsMessage!.className = 'entries no';
  } else {
    $reviewsMessage!.className = 'entries yes';
  }
}

const $newButton = document.querySelector('#new-button');
const $reviewNav = document.querySelector('#review-nav');
const $homeNav = document.querySelector('#home-nav');
if (!$newButton || !$reviewNav || !$homeNav)
  throw new Error('$newButton, $homeNav, and $reviewNav query failed');

$newButton.addEventListener('click', () => viewSwap('review-form'));
$reviewNav.addEventListener('click', () => viewSwap('reviews'));
$homeNav.addEventListener('click', () => viewSwap('home'));
