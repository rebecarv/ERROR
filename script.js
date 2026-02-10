// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const lever = document.querySelector('.lever');
    const lightBeam = document.getElementById('lightBeam');
    const textSomething = document.getElementById('textSomething');
    const textHere = document.getElementById('textHere');
    const character = document.getElementById('character');
    const triggerSound = document.getElementById('triggerSound');
    const backgroundSong = document.getElementById('backgroundSong');
    const constantSound = document.getElementById('constantSound');

    let isActive = false; // Track if effects are currently visible

    // Check if lever exists
    if (!lever) {
        console.error('Lever not found!');
        return;
    }

    // Lever change handler: update pristine/aria-checked and toggle animations
    lever.addEventListener('change', function() {
        this.classList.remove('pristine');
        const ac = 'aria-checked';
        this.setAttribute(ac, this.getAttribute(ac) === 'true' ? 'false' : 'true');
        // Sync animations with lever state (aria-checked "true" = on = show effects)
        isActive = this.getAttribute(ac) === 'true';
        if (isActive) {
            showEffects();
        } else {
            hideEffects();
        }
    });

    function handleTrigger() {
        isActive = lever.getAttribute('aria-checked') === 'true';
        if (isActive) {
            showEffects();
        } else {
            hideEffects();
        }
    }

    function showEffects() {
        // Change character to second.png
        character.src = 'assets/second.png';
        
        // Activate light beam
        setTimeout(() => {
            lightBeam.classList.add('active');
        }, 100);
        
        // Fade in text
        setTimeout(() => {
            textSomething.classList.add('fade-in');
        }, 200);
        
        setTimeout(() => {
            textHere.classList.add('fade-in');
        }, 400);
        
        // Play sounds
        playSounds();
    }

    function hideEffects() {
        // Change character back to first.jpg
        character.src = 'assets/first.jpg';
        
        // Hide light beam
        lightBeam.classList.remove('active');
        
        // Hide text
        textSomething.classList.remove('fade-in');
        textHere.classList.remove('fade-in');
        
        // Stop sounds
        stopSounds();
    }

    function playSounds() {
        // Play trigger sound (one-shot)
        triggerSound.currentTime = 0;
        triggerSound.play().catch(err => {
            console.log('Trigger sound not available:', err);
        });
        
        // Start background song (looping)
        setTimeout(() => {
            backgroundSong.currentTime = 0;
            backgroundSong.play().catch(err => {
                console.log('Background song not available:', err);
            });
        }, 500);
        
        // Start constant sound (looping)
        setTimeout(() => {
            constantSound.currentTime = 0;
            constantSound.play().catch(err => {
                console.log('Constant sound not available:', err);
            });
        }, 300);
    }

    function stopSounds() {
        // Stop all sounds
        triggerSound.pause();
        backgroundSong.pause();
        constantSound.pause();
        triggerSound.currentTime = 0;
        backgroundSong.currentTime = 0;
        constantSound.currentTime = 0;
    }

    // Optional: Add keyboard trigger (spacebar) – toggles lever
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            lever.classList.remove('pristine');
            const ac = 'aria-checked';
            const newChecked = lever.getAttribute(ac) !== 'true';
            lever.setAttribute(ac, newChecked ? 'true' : 'false');
            lever.checked = newChecked;
            handleTrigger();
        }
    });

    // Reset function (optional - for testing)
    window.reset = function() {
        isActive = false;
        lever.setAttribute('aria-checked', 'false');
        lever.checked = false;
        lever.classList.add('pristine');
        hideEffects();
    };
});

function handleTrigger(e) {
    // Toggle state based on checkbox
    isActive = toggleInput.checked;
    
    if (isActive) {
        // Show effects
        showEffects();
    } else {
        // Hide effects
        hideEffects();
    }
}

function showEffects() {
    // Change character to second.png
    character.src = 'assets/second.png';
    
    // Activate light beam
    setTimeout(() => {
        lightBeam.classList.add('active');
    }, 100);
    
    // Fade in text
    setTimeout(() => {
        textSomething.classList.add('fade-in');
    }, 200);
    
    setTimeout(() => {
        textHere.classList.add('fade-in');
    }, 400);
    
    // Play sounds
    playSounds();
}

function hideEffects() {
    // Change character back to first.jpg
    character.src = 'assets/first.jpg';
    
    // Hide light beam
    lightBeam.classList.remove('active');
    
    // Hide text
    textSomething.classList.remove('fade-in');
    textHere.classList.remove('fade-in');
    
    // Stop sounds
    stopSounds();
}

function playSounds() {
    // Play trigger sound (one-shot)
    triggerSound.currentTime = 0;
    triggerSound.play().catch(err => {
        console.log('Trigger sound not available:', err);
    });
    
    // Start background song (looping)
    setTimeout(() => {
        backgroundSong.currentTime = 0;
        backgroundSong.play().catch(err => {
            console.log('Background song not available:', err);
        });
    }, 500);
    
    // Start constant sound (looping)
    setTimeout(() => {
        constantSound.currentTime = 0;
        constantSound.play().catch(err => {
            console.log('Constant sound not available:', err);
        });
    }, 300);
}

function stopSounds() {
    // Stop all sounds
    triggerSound.pause();
    backgroundSong.pause();
    constantSound.pause();
    triggerSound.currentTime = 0;
    backgroundSong.currentTime = 0;
    constantSound.currentTime = 0;
}

// Optional: Add keyboard trigger (spacebar)
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        toggleInput.checked = !toggleInput.checked;
        handleTrigger(e);
    }
});

// Reset function (optional - for testing)
function reset() {
    isActive = false;
    toggleInput.checked = false;
    hideEffects();
}

// Make reset available globally for testing
window.reset = reset;
