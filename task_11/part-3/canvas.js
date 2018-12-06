let canvas = {
  init: (context) => {
    'use strict';

    const canvasSize = 300;
    const sectionSize = canvasSize / 3;
  
    let drawGrid = ()=> {
      context.clearRect(0, 0, canvasSize, canvasSize);

      context.lineWidth = 1;
      context.strokeStyle = "#ddd";
      context.beginPath();

      //Horizontal lines
      for (let y = 1; y <= 2;y++) {  
        context.moveTo(0, y * sectionSize);
        context.lineTo(canvasSize, y * sectionSize);
      }
     
      //Vertical lines
      for (let x = 1; x <= 2;x++) {
        context.moveTo(x * sectionSize, 0);
        context.lineTo(x * sectionSize, canvasSize);
      }

      context.stroke();
    }

    let drawPlayer = (column, row, player) => {
      if(player === "X")
        drawX(column, row);
      else
        drawO(column, row); 
    }
    
    let drawSelection = (row, column) => {
      const margin = 1;
      let xCordinate = column * sectionSize +margin;
      let yCordinate = row * sectionSize +margin;

      context.fillStyle = 'rgba(20, 64, 150, 0.2)';
      context.fillRect(xCordinate, yCordinate, sectionSize - margin*2, sectionSize - margin*2);
    }

    function drawO(row, column) {
      let xCordinate = row * sectionSize;
      let yCordinate = column * sectionSize;
      
      let halfSectionSize = (0.5 * sectionSize);
      let centerX = xCordinate + halfSectionSize;
      let centerY = yCordinate + halfSectionSize;
      let radius = (sectionSize - 60) / 2;
      let startAngle = 0 * Math.PI; 
      let endAngle = 2 * Math.PI;

      context.lineWidth = 4;
      context.strokeStyle = "#01bBC2";
      context.beginPath();
      context.arc(centerX, centerY, radius, startAngle, endAngle);
      context.stroke();
    }
    function drawX(row, column) {
      let xCordinate = row * sectionSize;
      let yCordinate = column * sectionSize;
      let offset = 30;

      context.strokeStyle = "#f1be32";
      context.lineWidth = 4;
      context.beginPath();
            
      context.moveTo(xCordinate + offset, yCordinate + offset);
      context.lineTo(xCordinate + sectionSize - offset, yCordinate + sectionSize - offset);

      context.moveTo(xCordinate + offset, yCordinate + sectionSize - offset);
      context.lineTo(xCordinate + sectionSize - offset, yCordinate + offset);

      context.stroke();
    }

    return {
        drawGrid: drawGrid,
        drawPlayer: drawPlayer,
        drawSelection: drawSelection
    };
  }
};