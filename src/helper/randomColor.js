const randomColor = () => {
  const colors = [
    [0, 255, 170],
    [155, 245, 215],
    [155, 245, 170],
  ];

  const [x, y, z] = colors[Math.floor(Math.random() * 3)];
  return `rgb(${x},${y},${z},0.5)`;
};

export { randomColor };
