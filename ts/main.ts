// interface FormElements extends HTMLFormControlsCollection {
// BookTitle: HTMLInputElement;
// Author: HTMLInputElement;
// photo: HTMLInputElement;
// rating: number;
// review: HTMLTextAreaElement;
// entryId: number;
// }

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
  if (!newSrc) {
    $img.src = originalSrc;
  }
}

$photo.addEventListener('input', inputPhoto);
