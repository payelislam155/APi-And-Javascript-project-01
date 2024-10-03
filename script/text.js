function getTimeString(time) {
    const hour = parseInt (time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hours ${minute} minute ${remainingSecond} seconds ago`;
  }
  
  const result = getTimeString(7875);
  
  console.log(result);