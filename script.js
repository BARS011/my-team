document.querySelectorAll('a[href="#courses"]').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelector('#courses')?.scrollIntoView({ behavior: 'smooth' });
  });
});