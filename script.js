let highestZ = 1;

class Paper {
  holdingPaper = false;
  currentPaperX = 0;
  currentPaperY = 0;
  rotation = Math.random() * 30 - 15;

  init(paper) {
    paper.style.transform = `rotateZ(${this.rotation}deg)`;

    paper.addEventListener('mousedown', (e) => {
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      paper.style.transition = 'none';
    });

    document.addEventListener('mousemove', (e) => {
      if (!this.holdingPaper) return;

      this.currentPaperX += e.movementX;
      this.currentPaperY += e.movementY;

      paper.style.transform = `
        translate(${this.currentPaperX}px, ${this.currentPaperY}px) 
        rotateZ(${this.rotation}deg)
        scale(1.1)`;
    });

    document.addEventListener('mouseup', () => {
      if (this.holdingPaper) {
        this.holdingPaper = false;
        paper.style.transition = 'transform 0.3s ease';
        paper.style.transform = `
          translate(${this.currentPaperX}px, ${this.currentPaperY}px) 
          rotateZ(${this.rotation}deg)`;
      }
    });
  }
}

document.querySelectorAll('.paper').forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
