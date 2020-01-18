

export function checkLogin(username: string, password: string) {
    if (!username.trim() || !password.trim()) {
        alert("Please type something");
        return false;
    }
    alert("Hello:" + username);

    return true;

}