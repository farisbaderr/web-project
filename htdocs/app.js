
const toggleButton = document.getElementById('toggle-btn')
const sidebar = document.getElementById('sidebar')
const signUpButton=document.getElementById('signUpButton');
const signInButton=document.getElementById('signInButton');
const signInForm=document.getElementById('signIn');
const signUpForm=document.getElementById('signup');
const isAuthenticated = true;
function toggleSidebar(){
  sidebar.classList.toggle('close')
  toggleButton.classList.toggle('rotate')

  closeAllSubMenus()
}

function toggleSubMenu(button){

  if(!button.nextElementSibling.classList.contains('show')){
    closeAllSubMenus()
  }

  button.nextElementSibling.classList.toggle('show')
  button.classList.toggle('rotate')

  if(sidebar.classList.contains('close')){
    sidebar.classList.toggle('close')
    toggleButton.classList.toggle('rotate')
  }
}

function closeAllSubMenus(){
  Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
    ul.classList.remove('show')
    ul.previousElementSibling.classList.remove('rotate')
  })
}
document.addEventListener('DOMContentLoaded', () => {
  const authButton = document.getElementById('auth-button');

  if (isAuthenticated) {
    authButton.textContent = '';
    authButton.style.backgroundColor = '#4467da'; // Change to a "Log Out" color, e.g., red
    authButton.addEventListener('click', () => {
      
      // Perform log-out action (e.g., clearing tokens, redirecting, etc.)
    });
  } 
 
});
  