export function getCookie(name) {
    if(!name)
        return null;
    const encodedName=encodeURIComponent(name);
    const regex=new RegExp(`(?:^|;\\s*)${encodedName}=([^;]*)`);
    const match=document.cookie.match(regex);
    return match ? decodeURIComponent(match[1]) : '';
}