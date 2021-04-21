import { environment } from '../environments/environment';

export const API_HOST = environment.apiHost;
export const API_HOST_PRIVATE = environment.apiHost;
export const API_URL_PREFIX = environment.apiPrefix;

export const LOCAL_STORAGE_VARIABLE = {
    is_admin: 'is_admin',
    access_token: 'access_token',
    is_logged_in: 'is_logged_in',
    user_avt: 'user_avatar',
    user_name: 'user_name',
    user_id: 'user_id',
    is_first_login: 'is_first_login'
};

export const LOGIN_STATUS = {
    logged_in: 'true'
};

export const DEFAULT_SETTINGS = {
    time_zone: 'SE Asia Standard Time'
};

export const REQUEST_TIMEOUT = 30000;

export const FORMAT_DATE_CONSTANT = {
    short_date_time_format: 'dd/MM/yyyy HH:mm:ss',
    short_date_format: 'dd/MM/yyyy',
    short_date_standard: 'yyyy-MM-dd',
    short_date_time_standard: 'yyyy-MM-dd HH:mm:ss',
    date_format_mm_dd_yyyy: 'MM/dd/yyyy',
    date_format_mm_dd_yyyy_HH_mm_ss: 'MM/dd/yyyy HH:mm:ss',
}

export const API_ENDPOINT = {
    ADD_EDIT_PRODUCT_GROUP: "/Products/AddEditProductGroup",
    DELETE_PRODUCT_GROUP: "/Products/DeleteProductGroup",
    GET_PRODUCT_GROUP: "/Products/GetProductGroups",
    LOG_IN: "/User/Login"
}

export const ADMIN_CONST = '1';

export const jsFileForMainLayout = [
    {
        name: "metisMenu",
        src: "../assets/js/metisMenu.min.js"
    },
    {
        name: "jqueryApp",
        src: "../assets/js/jquery.app.js"
    },
    {
        name: "jqueryCore",
        src: "../assets/js/jquery.core.js"
    }
];

export const datatableLanguageOptions =  {
    processing: "Đang xử lý...",
        search: "Tìm kiếm:",
        lengthMenu: "Hiển thị _MENU_ mục mỗi trang",
        info: "Hiển thị trang _PAGE_ của _PAGES_",
        infoEmpty: "Hiển thị trang _PAGE_ của _PAGES_",
        infoFiltered: "( lọc từ _MAX_ mục )",
        loadingRecords: "Đang tải lên...",
        zeroRecords: "Không có danh mục nào",
        emptyTable: "Không có danh mục nào",
        paginate: {
          first: "Trang đầu",
          previous: "Trang trước",
          next: "Trang kế",
          last: "Trang cuối"
        }
}