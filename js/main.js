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
const formElementsValues = document.querySelector('#new-review');
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
        const originalLi = $allLi[i];
        const newLi = renderReview(newReview);
        $ul?.replaceChild(newLi, originalLi);
        break;
      }
    }
    data.editing = null;
    $reviewFormHeader.textContent = 'New Review';
    $deleteButton.className = 'delete-button hidden';
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
  const $chatBot = document.createElement('i');
  $chatBot.className = 'fa-solid fa-message';
  $h4.appendChild($chatBot);
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
// Function to turn message regarding no reviews, on and off
function toggleNoReviews() {
  if (data.reviews.length === 0) {
    $reviewsMessage.className = 'reviews-message no';
  } else {
    $reviewsMessage.className = 'reviews-message yes';
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
  $one.className = 'fa-regular fa-star';
  $two.className = 'fa-regular fa-star';
  $three.className = 'fa-regular fa-star';
  $four.className = 'fa-regular fa-star';
  $five.className = 'fa-regular fa-star';
  selectedRating = 0;
  $reviewFormHeader.textContent = 'New Review';
  $deleteButton.className = 'delete-button hidden';
  formElementsValues.reset();
});
$reviewNav.addEventListener('click', () => viewSwap('reviews'));
$homeNav.addEventListener('click', () => viewSwap('home'));
// Edit Review Code
const $reviewFormHeader = document.querySelector('.review-form-title');
const $deleteButton = document.querySelector('.delete-button');
if (!$reviewFormHeader || !$deleteButton)
  throw new Error('Review form header or delete button query failed!');
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
  const eventTarget = event.target;
  const elementName = eventTarget.className;
  if (elementName === 'fa-solid fa-pencil') {
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
const $dialog = document.querySelector('#delete-modal');
const $deleteReview = document.querySelector('.delete-review');
if (!$dismissModal) throw new Error('$dismissModal does not exist');
if (!$dialog) throw new Error('$dialog does not exist');
if (!$deleteReview) throw new Error('$deleteReview does not exist');
function openModal() {
  $dialog?.showModal();
}
$deleteButton.addEventListener('click', openModal);
function dismissModal() {
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
// Open Modal for Search and Search books
const $homeDialog = document.querySelector('#home-dialog');
const $pageArrows = document.querySelector('#page-arrows');
const $resultsContainer = document.querySelector('#results-container');
const $dismissModalSearch = document.querySelector('.dismiss-modal-search');
const $search = document.querySelector('#search');
const $searchForm = document.querySelector('#search-books');
const $searchButton = document.querySelector('#search-button');
if (
  !$search ||
  !$searchForm ||
  !$searchButton ||
  !$homeDialog ||
  !$dismissModalSearch ||
  !$resultsContainer ||
  !$pageArrows
)
  throw new Error(
    '$search or $searchBooks or $searchButton of $homeDialog or $dismissModalSearch or $resultsContainer or $pageArrows query failed!',
  );
function openSearchModal() {
  $homeDialog.showModal();
}
$searchButton.addEventListener('click', openSearchModal);
// Search for Books
const $waiting = document.querySelector('#waiting');
if (!$waiting) throw new Error('$waiting query failed!');
const APIKey = 'AIzaSyCD5-pLWPpEX8hFF-sYzRmkB2jzOujJEEU';
$searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = $search.value;
  $resultsContainer.innerHTML = '';
  $pageArrows.innerHTML = '';
  $waiting.textContent = 'Searching...';
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=40&key=${APIKey}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const books = await response.json();
    $waiting.textContent = '';
    if (!books.items || books.items.length === 0) {
      const $noResults = document.createElement('p');
      $noResults.textContent = 'No results found.';
      $resultsContainer.appendChild($noResults);
      return;
    }
    const $nextPage = document.createElement('i');
    $nextPage.className = 'fa-solid fa-arrow-right-long';
    $pageArrows.appendChild($nextPage);
    for (let i = 0; i < 20; i++) {
      const book = books.items[i];
      const $h3Title = document.createElement('h3');
      $h3Title.textContent = book.volumeInfo.title;
      $resultsContainer.appendChild($h3Title);
      const $h4Author = document.createElement('h4');
      $h4Author.textContent = book.volumeInfo.authors;
      $resultsContainer.appendChild($h4Author);
      const $imgSearch = document.createElement('img');
      $imgSearch.src =
        book.volumeInfo.imageLinks?.thumbnail ||
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj2mL7JKp9TKfgH9eDUV4FP0Jasm1FLRaydg&s';
      $resultsContainer.appendChild($imgSearch);
      $nextPage.addEventListener('click', () => {
        $resultsContainer.innerHTML = '';
        $pageArrows.innerHTML = '';
        if ($dialog) {
          $dialog.scrollTop = 0;
        }
        for (let i = 20; i < 40; i++) {
          const book = books.items[i];
          const $h3Title = document.createElement('h3');
          $h3Title.textContent = book.volumeInfo.title;
          $resultsContainer.appendChild($h3Title);
          const $h4Author = document.createElement('h4');
          $h4Author.textContent = book.volumeInfo.authors;
          $resultsContainer.appendChild($h4Author);
          const $imgSearch = document.createElement('img');
          $imgSearch.src =
            book.volumeInfo.imageLinks?.thumbnail ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj2mL7JKp9TKfgH9eDUV4FP0Jasm1FLRaydg&s';
          $resultsContainer.appendChild($imgSearch);
        }
      });
      $imgSearch.addEventListener('click', () => {
        viewSwap('review-form');
        formElementsValues.reset();
        $one.className = 'fa-regular fa-star';
        $two.className = 'fa-regular fa-star';
        $three.className = 'fa-regular fa-star';
        $four.className = 'fa-regular fa-star';
        $five.className = 'fa-regular fa-star';
        selectedRating = 0;
        const $formElements = formElementsValues?.elements;
        $formElements.bookTitle.value = book.volumeInfo.title;
        $formElements.author.value = book.volumeInfo.authors;
        $formElements.photo.value =
          book.volumeInfo.imageLinks?.thumbnail ||
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj2mL7JKp9TKfgH9eDUV4FP0Jasm1FLRaydg&s';
        $img.src =
          book.volumeInfo.imageLinks?.thumbnail ||
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj2mL7JKp9TKfgH9eDUV4FP0Jasm1FLRaydg&s';
        $homeDialog.close();
        $search.value = '';
        $reviewFormHeader.textContent = 'New Review';
        $deleteButton.className = 'hidden';
      });
    }
  } catch (error) {
    console.log('Error:', error);
  }
});
// Close Modal on cancel button click
function closeSearchModal() {
  $homeDialog.close();
}
$dismissModalSearch?.addEventListener('click', closeSearchModal);
// Search through reviews
const $searchReviews = document.querySelector('[data-search]');
if (!$searchReviews) throw new Error('$searchReviews query failed!');
function searchReviews(event) {
  const eventTarget = event.target;
  const value = eventTarget.value.toLowerCase();
  const $allLi = document.querySelectorAll('li');
  if (!$allLi) throw new Error('$allLi query failed');
  for (let i = 0; i < $allLi.length; i++) {
    const reviewId = Number($allLi[i].getAttribute('data-review-id'));
    for (let index = 0; index < data.reviews.length; index++) {
      if (data.reviews[index].reviewId === reviewId) {
        if (
          data.reviews[index].bookTitle.toLowerCase().includes(value) ||
          data.reviews[index].review.toLowerCase().includes(value) ||
          data.reviews[index].author.toLowerCase().includes(value)
        ) {
          $allLi[i].style.display = '';
        } else {
          $allLi[i].style.display = 'none';
        }
        break;
      }
    }
  }
}
$searchReviews.addEventListener('input', searchReviews);
// AI summary code
const $summaryDialog = document.querySelector('.summary-dialog');
const $summaryContainer = document.querySelector('.summary-container');
const $closeSummaryModal = document.querySelector('.close-summary-modal');
if (!$summaryDialog || !$summaryContainer || !$closeSummaryModal)
  throw new Error('Summary query failed!');
const apiKey = prompt('Enter your API key');
const apiUrl = 'https://api.openai.com/v1/chat/completions';
$ul.addEventListener('click', async function AISummary(event) {
  const eventTarget = event.target;
  const className = eventTarget.className;
  if (className === 'fa-solid fa-message') {
    const closestLi = eventTarget.closest('li');
    if (closestLi) {
      const bookReview = closestLi.getAttribute('data-review-id');
      const clickedBook = Number(bookReview);
      for (let i = 0; i < data.reviews.length; i++) {
        if (data.reviews[i].reviewId === clickedBook) {
          const clientPrompt = `Provide a brief summary of ${data.reviews[i].bookTitle}`;
          try {
            const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
              },
              body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: clientPrompt }],
              }),
            });
            if (!response.ok) {
              throw new Error(
                `Error: ${response.status} ${response.statusText}`,
              );
            }
            const summary = await response.json();
            const summaryContent = summary.choices[0].message.content;
            $summaryContainer.textContent = summaryContent;
            $summaryDialog.showModal();
            $closeSummaryModal.addEventListener('click', () => {
              $summaryDialog.close();
            });
          } catch {
            console.error('Failed to retrieve AI summary:', Error);
          }
        }
      }
    }
  }
});
