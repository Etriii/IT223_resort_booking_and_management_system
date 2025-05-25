export default function logout(navigate) {
    document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "resort_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";  
    fetch(`http://localhost:8000/api.php?controller=Auth&action=logout&user_id=${localStorage.getItem('user_id')}`);
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_role');
    localStorage.setItem('profileDropdownOpen', false);
    localStorage.setItem('sideNavOpen', false);
    navigate('/oceanview/login');
}