using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iNet.Common
{
    public static class ErrorMessageCode
    {
        public const string EMAIL_INVALID = "email_invalid"; //Email invalid
        public const string USER_NOT_FOUND = "user_not_found"; //User not found
        public const string USER_IS_DEACTIVATE = "user_is_deactivate"; //User is Deactivate
        public const string SERVER_ERROR = "server_error"; //Server Error
        public const string IMAGE_EXTENTION = "image_extention"; //Please Upload image of type .jpg,.gif,.png.
        public const string VIDEO_EXTENTION = "video_extention"; //Please Upload video of type .mp4,.avi,.3gp.
        public const string IMAGE_LARGE = "image_large"; //Please Upload a file upto 10 Mb..
        public const string VIDEO_LARGE = "video_large"; //Please Upload a file upto 50 Mb..
        public const string FIELD_INVALID = "field_invalid"; //The name of the field is invalid.
        public const string EMAIL_OR_PHONE_NUMBER_ALREADY_EXIST = "email_or_phone_number_already_exist"; //This email or phone number already exist.
        public const string EMAIL_OR_PHONE_NUMBER_INVALID = "email_or_phone_number_invalid"; //This email or phone number is invalid.
        public const string PASSWORD_INVALID = "password_invalid"; //This password is invalid.
        public const string PASSWORD_INCORRECT = "password_incorrect"; //Your password is Incorrect.
        public const string USERNAME_INCORRECT = "username_incorrect"; //This user name is Incorrect
        public const string PRODUCT_NOT_FOUND = "product_not_found"; 
        public const string GROUP_NOT_FOUND = "group_not_found"; 
        public const string BLOG_NOT_FOUND = "blog_not_found"; 
    }
}
