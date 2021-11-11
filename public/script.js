const WHITE_KEYS = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
const BLACK_KEYS = ['s', 'd', 'g', 'h', 'j'];

const recordButton = document.querySelector('.record-button');
const keys = document.querySelectorAll('.key')
const whiteKeys = document.querySelectorAll('.key.white');
const blackKeys = document.querySelectorAll('.key.black');

let recordingStartTime;
let songNotes;

keys.forEach(key => {
  key.addEventListener('click', () => playNote(key));
});

recordButton.addEventListener('click', toggleRecording);

document.addEventListener('keydown', e => {
  if (e.repeat) return;
  const key = e.key;
  const whiteKeyIndex = WHITE_KEYS.indexOf(key);
  const blackKeyIndex = BLACK_KEYS.indexOf(key);

  if (whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex]);
  if (blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex]);
});

function toggleRecording() {
  recordButton.classList.toggle('active');
  if (isRecording()) {
    startRecording();
  } else {
    stopRecording();
  }
}

function isRecording() {
  return recordButton != null && recordButton.classList.contains('active');
}

function startRecording() {
  recordingStartTime = Date.now();
  songNotes = [];
}

function stopRecording() {
  playSong();
}

function playSong() {
  console.log(songNotes);
}

function playNote(key) {
  if (isRecording()) recordNote(key.dataset.note);
  const noteAudio = document.getElementById(key.dataset.note);
  noteAudio.currentTime = 0;
  noteAudio.play();
  key.classList.add('active');
  noteAudio.addEventListener('ended', () => {
    key.classList.remove('active');
  });
}

function recordNote(note) {
  songNotes.push({
    key: note,
    startTime: Date.now() - recordingStartTime
  });
}