fetch('./data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    const sections = document.querySelectorAll('.section');

    data.forEach((item, index)=>{
        const section = sections[index];
        section.querySelector('.activity-title').textContent = item.title;
        
        section.querySelector('.current-day').textContent = `${item.timeframes.daily.current}hrs`;
        section.querySelector('.previous-day').textContent = `Yesterday - ${item.timeframes.daily.previous}hrs`;

        section.querySelector('.current-week').textContent = `${item.timeframes.weekly.current}hrs`;
        section.querySelector('.previous-week').textContent = `Last Week - ${item.timeframes.weekly.previous}hrs`;

        section.querySelector('.current-month').textContent = `${item.timeframes.monthly.current}hrs`;
        section.querySelector('.previous-month').textContent = `Last Month - ${item.timeframes.monthly.previous}hrs`;
    });
    const buttons = document.querySelectorAll('.button-group button');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const timeframe = button.textContent.toLowerCase();
        
        buttons.forEach(btn => btn.classList.remove('active'));

        button.classList.add('active');
        
        sections.forEach(section => {
          section.querySelectorAll('.time-frames').forEach(frame => frame.classList.remove('active'));
          section.querySelector(`.${timeframe}`).classList.add('active');
        });
      });
    });

    buttons[1].click();

  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });