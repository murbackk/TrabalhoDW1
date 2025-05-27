const menuBtn = document.getElementById('menu');
    const menuItems = document.getElementById('menu-items');

    menuBtn.addEventListener('click', () => {
      menuItems.style.display = (menuItems.style.display === 'none' || menuItems.style.display === '') ? 'block' : 'none';
    });