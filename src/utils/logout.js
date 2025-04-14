export default function logout(navigate) {
     localStorage.removeItem('user_id');
    localStorage.removeItem('user_role');
    navigate('/oceanview/login');
}