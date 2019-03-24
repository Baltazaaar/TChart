let nightMode = false;

const drawChart = (number, canvasClass) => {
  const xArr = DATA[number].columns[0];
  xArr.shift();
  const firstColor = DATA[number].colors['y0'];
  const y0Arr = DATA[number].columns[1];
  y0Arr.shift();
  const secondColor = DATA[number].colors['y1'];
  const y1Arr = DATA[number].columns[2];
  y1Arr.shift();
  const thirdColor = DATA[number].colors['y2'];
  const y2Arr = DATA[number].columns[3];
  y2Arr && y2Arr.shift();
  const fourthColor = DATA[number].colors['y3'];
  const y3Arr = DATA[number].columns[4];
  y3Arr && y3Arr.shift();
  const maxY = Math.max(...y0Arr);

  const parseDate = timestamp => `${new Date(timestamp).getDay() + 1} ${parseMonth(new Date(timestamp).getMonth() + 1)} ${new Date(timestamp).getFullYear()}`;
  const parseMonth = month => {
    switch (month) {
      case 1: return 'Jan';
      case 2: return 'Feb';
      case 3: return 'Mar';
      case 4: return 'Apr';
      case 5: return 'May';
      case 6: return 'Jun';
      case 7: return 'Jul';
      case 8: return 'Aug';
      case 9: return 'Sep';
      case 10: return 'Oct';
      case 11: return 'Nov';
      case 12: return 'Dec';
      default: return 'Month';
    }
  };

  const canvas = document.querySelector(canvasClass);
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const heightOffset = 100;
  const widthOffset = 100;
  const delNumbers = height / heightOffset;

  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 1;
    ctx.font = 'small-caps bold 12px verdana';
    ctx.strokeStyle = '#b6b3ef';

    ctx.fillStyle = '#b6b3ef';
    ctx.fillText(maxY, 5, 10);
    ctx.fillText("0", 5, height - 5);
    for (let i = 1; i < height / heightOffset; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * heightOffset);
      ctx.lineTo(width, i * heightOffset);
      ctx.stroke();
      ctx.fillText(Math.round(maxY / delNumbers * (delNumbers - i)), 5, i * heightOffset - 2);
    }
    for (let i = 1; i < width / widthOffset; i++) {
      ctx.fillText(parseDate(xArr[Math.round(i * xArr.length / 5)]), i * widthOffset, height - 5);
    }

    const drawLine = (line, color) => {
      ctx.lineWidth = 2;
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, height - line[0] * (height / maxY));
      for (let i = 1; i < xArr.length; i++) {
        ctx.lineTo(i * (width / xArr.length), height - line[i] * (height / maxY));
      };
      ctx.stroke();
    };

    drawLine(y0Arr, firstColor);
    drawLine(y1Arr, secondColor);
    y2Arr && drawLine(y2Arr, thirdColor);
    y3Arr && drawLine(y3Arr, fourthColor);
  }
};

const drawSlider = (number, canvasClass) => {

  const xArr = DATA[number].columns[0];
  xArr.shift();
  const firstColor = DATA[number].colors['y0'];
  const y0Arr = DATA[number].columns[1];
  y0Arr.shift();
  const secondColor = DATA[number].colors['y1'];
  const y1Arr = DATA[number].columns[2];
  y1Arr.shift();
  const thirdColor = DATA[number].colors['y2'];
  const y2Arr = DATA[number].columns[3];
  y2Arr && y2Arr.shift();
  const fourthColor = DATA[number].colors['y3'];
  const y3Arr = DATA[number].columns[4];
  y3Arr && y3Arr.shift();
  const max = Math.max(...y0Arr);

  const canvas = document.querySelector(canvasClass);
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#b6b3ef';

    const drawLine = (line, color) => {
      ctx.lineWidth = 2;
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, height - line[0] * (height / max));
      for (let i = 1; i < xArr.length; i++) {
        ctx.lineTo(i * (width / xArr.length), height - line[i] * (height / max));
      };
      ctx.stroke();
    };

    drawLine(y0Arr, firstColor);
    drawLine(y1Arr, secondColor);
    y2Arr && drawLine(y2Arr, thirdColor);
    y3Arr && drawLine(y3Arr, fourthColor);
  }
};

const switchNight = () => {
  if (!nightMode) {
    document.querySelector('#style').href = 'night.css';
    document.querySelector('.day-night').textContent = 'SWITCH TO DAY MODE';
    nightMode = !nightMode;
  } else {
    document.querySelector('#style').href = 'day.css';
    document.querySelector('.day-night').textContent = 'SWITCH TO NIGHT MODE';
    nightMode = !nightMode;
  }
}
