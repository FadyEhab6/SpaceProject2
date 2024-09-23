//This script is for the sound effects of the buttons and the background music


function closeOverlay() {
document.getElementById('overlay').style.display = 'none';
console.log('overlay closed');
}


    var audio = document.getElementById('background-sound');
    audio.play();
    audio.volume = 0.05;
    const hoverSound = document.getElementById('hoverSound');
    const clickSound = document.getElementById('clickSound');
    const buttons = document.querySelectorAll('.response, .grid-item, .planet-input, #log, .test1-button, .modal-button, .victory-button,.Planet');
    
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0; // Rewind to the start
            hoverSound.volume = 0.03;
            hoverSound.play(); 
        });
        button.addEventListener('click', () => {
            clickSound.currentTime = 0; // Rewind to the start
            clickSound.volume = 0.5;
            clickSound.play();
        });
    });


