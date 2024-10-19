// Handle movement
function updatePlayer() {
    velocity.set(0, 0, 0); // Reset velocity

    // Calculate forward and right directions based on camera rotation
    const forward = new THREE.Vector3();
    const right = new THREE.Vector3();
    camera.getWorldDirection(forward); // Get the forward direction
    forward.y = 0; // Ignore vertical movement for walking
    forward.normalize(); // Normalize the direction

    right.crossVectors(forward, new THREE.Vector3(0, 1, 0)); // Get the right direction

    // Movement controls based on camera direction
    if (keys['KeyW']) { // Move forward (W)
        velocity.add(forward.clone().multiplyScalar(playerSpeed)); // Move in the forward direction
    } 
    if (keys['KeyS']) { // Move backward (S)
        velocity.add(forward.clone().multiplyScalar(-playerSpeed)); // Move in the backward direction
    }
    if (keys['KeyA']) { // Move left (A)
        velocity.add(right.clone().multiplyScalar(-playerSpeed)); // Move in the left direction
    }
    if (keys['KeyD']) { // Move right (D)
        velocity.add(right.clone().multiplyScalar(playerSpeed)); // Move in the right direction
    }

    // Jumping logic
    if (keys['Space'] && !isJumping) {
        isJumping = true;
        velocity.y = jumpForce; // Apply jumping force
    }

    // Apply gravity
    if (isJumping) {
        velocity.y -= 0.01; // Apply a simple gravity
    }

    // Check for ground contact to reset jumping
    if (camera.position.y <= 1.5) {
        isJumping = false;
        camera.position.y = 1.5; // Reset camera height
    }

    // Move the camera based on velocity
    camera.position.x += velocity.x;
    camera.position.y += velocity.y;
    camera.position.z += velocity.z;

    // Update visible chunks after moving
    updateChunks();
}
