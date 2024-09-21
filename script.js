//This script is for the sound effects of the buttons and the background music



document.addEventListener('DOMContentLoaded', function() {
    
    // document.querySelectorAll('.grid-item').forEach((button, index) => {
    //     console.log(button);
    //     button.addEventListener('click', () => activateTest('test' + (index + 1)));
    // });

    var audio = document.getElementById('background-sound');
    audio.play();
    audio.volume = 0.05;
    const hoverSound = document.getElementById('hoverSound');
    const clickSound = document.getElementById('clickSound');
    const buttons = document.querySelectorAll('.response, .grid-item, .planet-input');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0; // Rewind to the start
            hoverSound.volume = 0.03;
            hoverSound.play(); 
        });
        button.addEventListener('click', () => {
            clickSound.currentTime = 0; // Rewind to the start
            clickSound.volume = 0.1;
            clickSound.play();
        });
    });
}); 
