import { LOCAL_STORAGE_VARIABLE } from '../../app.constants';
export class LocalService {
    static getItem(key) {
        return localStorage.getItem(key);
    }
    static setItem(key, value) {
        return localStorage.setItem(key, value);
    }
    static removeItem(key) {
        return localStorage.removeItem(key);
    }
    static clear() {
        localStorage.clear();
    }
    static logout() {
        LocalService.clear();
    }
    static getAccessToken() {
        return LocalService.getItem(LOCAL_STORAGE_VARIABLE.access_token);
    }
    static setAccessToken(accessToken) {
        LocalService.setItem(LOCAL_STORAGE_VARIABLE.access_token, accessToken);
    }
    static getLogStatus() {
        return LocalService.getItem(LOCAL_STORAGE_VARIABLE.is_logged_in);
    }
    static setLogStatus(bool) {
        LocalService.setItem(LOCAL_STORAGE_VARIABLE.is_logged_in, bool);
    }
    static getIsAdminState() {
        return LocalService.getItem(LOCAL_STORAGE_VARIABLE.is_admin);
    }
    static setIsAdminState(isAdmin) {
        LocalService.setItem(LOCAL_STORAGE_VARIABLE.is_admin, isAdmin);
    }
    static setUserName(name) {
        LocalService.setItem(LOCAL_STORAGE_VARIABLE.user_name, name);
    }
    static getUserName() {
        return LocalService.getItem(LOCAL_STORAGE_VARIABLE.user_name);
    }
    static setUserId(id) {
        LocalService.setItem(LOCAL_STORAGE_VARIABLE.user_id, id);
    }
    static getUserId() {
        return parseInt(LocalService.getItem(LOCAL_STORAGE_VARIABLE.user_id) || '{}');
    }
}
//# sourceMappingURL=local.service.js.map