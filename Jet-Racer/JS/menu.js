document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    // Function to draw the main menu
    function drawMainMenu() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw start button
      ctx.fillStyle = "#4CAF50";
      ctx.fillRect(50, 120, 200, 60);

      // Draw start text
      ctx.fillStyle = "#fff";
      ctx.font = "20px Arial";
      ctx.fillText("Start", 130, 160);
    }

    // Function to handle click events
    function handleMouseClick(event) {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      // Check if the click is inside the start button
      if (mouseX >= 50 && mouseX <= 250 && mouseY >= 120 && mouseY <= 180) {
        // Start the Tic Tac Toe game (you can replace this with your game logic)
        alert("Jet Racer has st!");
        // Add your game initialization logic here
      }
    }

    // Add click event listener to canvas
    canvas.addEventListener("click", handleMouseClick);

    // Draw the main menu initially
    drawMainMenu();
  });
