import service from "./global";
export function hasPermission() {
    return service.post('/checkIsManager')
    .then(response => {
        return response.status===200;
    })
    .catch(error => {
        return false;
    });
}