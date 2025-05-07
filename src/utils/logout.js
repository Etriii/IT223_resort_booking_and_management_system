export default function logout(navigate) {
    fetch(`http://localhost:8000/api.php?controller=Auth&action=logout&user_id=${localStorage.getItem('user_id')}`);
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_role');
    navigate('/oceanview/login');
}