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
// Input Event listener for Photo Change
const $photo = document.querySelector('#photo') as HTMLInputElement;
const $img = document.querySelector('img') as HTMLImageElement;
if (!$img || !$photo) throw new Error('Image query failed');

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
  if (!data.editing) {
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
        const originalLi = $allLi[i];
        const newLi = renderReview(newReview);
        $ul?.replaceChild(newLi, originalLi);
        break;
      }
    }
    data.editing = null;
    $reviewFormHeader!.textContent = 'New Review';
    $deleteButton!.className = 'delete-button hidden';
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
}

formElementsValues.addEventListener('submit', submit);

// Create DOM element function
function renderReview(review: Review): HTMLLIElement {
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

// Function to turn message regarding no reviews, on and off
function toggleNoReviews(): void {
  if (data.reviews.length === 0) {
    $reviewsMessage!.className = 'reviews-message no';
  } else {
    $reviewsMessage!.className = 'reviews-message yes';
  }
}

// Event Listeners on nav bar
const $newButton = document.querySelector('#new-button');
const $reviewNav = document.querySelector('#review-nav');
const $homeNav = document.querySelector('#home-nav');
if (!$newButton || !$reviewNav || !$homeNav)
  throw new Error('$newButton, $homeNav, and $reviewNav query failed');

$newButton.addEventListener('click', () => {
  viewSwap('review-form');
  $img.src = originalSrc;
  $one!.className = 'fa-regular fa-star';
  $two!.className = 'fa-regular fa-star';
  $three!.className = 'fa-regular fa-star';
  $four!.className = 'fa-regular fa-star';
  $five!.className = 'fa-regular fa-star';
  selectedRating = 0;
  $reviewFormHeader!.textContent = 'New Review';
  $deleteButton!.className = 'delete-button hidden';
  formElementsValues.reset();
});
$reviewNav.addEventListener('click', () => viewSwap('reviews'));
$homeNav.addEventListener('click', () => viewSwap('home'));

// Edit Review Code
const $reviewFormHeader = document.querySelector('.review-form-title');
const $deleteButton = document.querySelector('.delete-button');
if (!$reviewFormHeader || !$deleteButton)
  throw new Error('Review form header or delete button query failed!');

function populateRating(ratingValue: number): void {
  selectedRating = ratingValue;
  if (ratingValue === 1) {
    $one!.className = 'fa-solid fa-star';
    $two!.className = 'fa-regular fa-star';
    $three!.className = 'fa-regular fa-star';
    $four!.className = 'fa-regular fa-star';
    $five!.className = 'fa-regular fa-star';
    selectedRating = 1;
  } else if (ratingValue === 2) {
    $one!.className = 'fa-solid fa-star';
    $two!.className = 'fa-solid fa-star';
    $three!.className = 'fa-regular fa-star';
    $four!.className = 'fa-regular fa-star';
    $five!.className = 'fa-regular fa-star';
    selectedRating = 2;
  } else if (ratingValue === 3) {
    $one!.className = 'fa-solid fa-star';
    $two!.className = 'fa-solid fa-star';
    $three!.className = 'fa-solid fa-star';
    $four!.className = 'fa-regular fa-star';
    $five!.className = 'fa-regular fa-star';
    selectedRating = 3;
  } else if (ratingValue === 4) {
    $one!.className = 'fa-solid fa-star';
    $two!.className = 'fa-solid fa-star';
    $three!.className = 'fa-solid fa-star';
    $four!.className = 'fa-solid fa-star';
    $five!.className = 'fa-regular fa-star';
    selectedRating = 4;
  } else if (ratingValue === 5) {
    $one!.className = 'fa-solid fa-star';
    $two!.className = 'fa-solid fa-star';
    $three!.className = 'fa-solid fa-star';
    $four!.className = 'fa-solid fa-star';
    $five!.className = 'fa-solid fa-star';
    selectedRating = 5;
  }
}

function populateReview(review: Review): void {
  const $formElements = formElementsValues?.elements as FormElements;
  $formElements.bookTitle.value = review.bookTitle;
  $formElements.author.value = review.author;
  $formElements.photo.value = review.photo;
  $img.src = review.photo;
  $formElements.review.value = review.review;
  populateRating(review.rating);
}

$ul.addEventListener('click', (event: Event) => {
  const eventTarget = event.target as HTMLElement;
  const elementName = eventTarget.tagName;
  if (elementName === 'I') {
    const closestLi = eventTarget.closest('li');
    if (closestLi) {
      const editReview = closestLi.getAttribute('data-review-id');
      const editableReview = Number(editReview);
      for (let i = 0; i < data.reviews.length; i++) {
        if (data.reviews[i].reviewId === editableReview) {
          viewSwap('review-form');
          const dataReview = data.reviews[i];
          data.editing = dataReview;
          $reviewFormHeader.textContent = 'Edit Review';
          $deleteButton.className = 'delete-button';
          populateReview(dataReview);
        }
      }
    }
  }
});

// Delete a review
const $dismissModal = document.querySelector('.dismiss-modal');
const $dialog = document.querySelector('dialog');
const $deleteReview = document.querySelector('.delete-review');
if (!$dismissModal) throw new Error('$dismissModal does not exist');
if (!$dialog) throw new Error('$dialog does not exist');
if (!$deleteReview) throw new Error('$deleteReview does not exist');

function openModal(): void {
  $dialog?.showModal();
}

$deleteButton.addEventListener('click', openModal);

function dismissModal(): void {
  $dialog?.close();
}

$dismissModal.addEventListener('click', dismissModal);

$deleteReview.addEventListener('click', () => {
  const clickedReview = data.editing?.reviewId;
  for (let i = 0; i < data.reviews.length; i++) {
    if (data.reviews[i].reviewId === clickedReview) {
      data.reviews.splice(i, 1);
      writeReviews();
      break;
    }
  }
  const $allLi = document.querySelectorAll('li');
  if (!$allLi) throw new Error('$allLi query failed!');
  for (let i = 0; i < $allLi.length; i++) {
    if (Number($allLi[i].getAttribute('data-review-id')) === clickedReview) {
      const deleteLi = $allLi[i];
      deleteLi.remove();
      break;
    }
  }
  data.editing = null;
  $dialog?.close();
  viewSwap('reviews');
  toggleNoReviews();
});
