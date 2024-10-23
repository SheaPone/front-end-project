'use strict';
//interface FormElements extends HTMLFormControlsCollection {
// BookTitle: HTMLInputElement;
// Author: HTMLInputElement;
// photo: HTMLInputElement;
// rating: number;
// review: HTMLTextAreaElement;
// entryId: number;
//}
let $photo = document.querySelector('#photo');
let $img = document.querySelector('img');
if (!$img || !$photo) throw new Error('Image query failed');
// Input Event listener for Photo Change
const originalSrc = $img.src;
$img.dataset.originalSrc = originalSrc;
function inputPhoto(event) {
  let eventTarget = event.target;
  const newSrc = eventTarget.value;
  $img.src = newSrc;
  if (!newSrc) {
    $img.src = originalSrc;
  }
}
$photo.addEventListener('input', inputPhoto);
