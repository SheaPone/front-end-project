/* exported data */
// interface Data {
// view: 'reviews' | 'review-form' | 'home';
// reviews: Review[];
// editing: null | Review;
// nextReviewId: number;
// }

const data: any = {
  view: 'review-form',
  reviews: [],
  editing: null,
  nextReviewId: 1,
};

// Function to turn javascript into JSON
function writeReviews(): void {
  const reviewsJSON = JSON.stringify(data);
  localStorage.setItem('new-storage', reviewsJSON);
}

// Function to turn JSON into Javascript
function readReviews(): any {
  const storage = localStorage.getItem('new-storage');
  if (storage !== null) {
    const newData = JSON.parse(storage);
    return newData;
  } else {
    return data;
  }
}

// have to console both functions as receiving teh following error ''writeReviews' is defined but never used' and ''readReviews' is defined but never used

console.log(writeReviews());
console.log(readReviews());
