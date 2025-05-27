
    const menuBtn = document.getElementById('menu');
    const menuItems = document.getElementById('menu-items');

    menuBtn.addEventListener('click', () => {
      if (menuItems.style.display === 'none' || menuItems.style.display === '') {
        menuItems.style.display = 'block';
      } else {
        menuItems.style.display = 'none';
      }
    });
  