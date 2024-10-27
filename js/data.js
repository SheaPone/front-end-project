'use strict';
let data = {
  view: 'review-form',
  reviews: [],
  editing: null,
  nextReviewId: 1,
};
// Function to turn javascript into JSON
function writeReviews() {
  const reviewsJSON = JSON.stringify(data);
  localStorage.setItem('new-storage', reviewsJSON);
}
// Function to turn JSON into Javascript
function readReviews() {
  const storage = localStorage.getItem('new-storage');
  if (storage !== null) {
    const newData = JSON.parse(storage);
    return newData;
  } else {
    return data;
  }
}
data = readReviews();
// have to console both functions as receiving the following error ''writeReviews' is defined but never used' and ''readReviews' is defined but never used
console.log(writeReviews());
console.log(readReviews());
