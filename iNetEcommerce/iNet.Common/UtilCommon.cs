using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using static iNet.Common.UtilEnum;

namespace iNet.Common
{
    public static class UtilCommon
    {
        static bool invalid = false;
        static SymmetricSecurityKey _secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(ApiConstants.API_KEY));
        static string Key { get; set; } = "A!9HHhi%XjjYY4YP2@Nob009X";
        public static bool IsValidEmail(string email)
        {
            invalid = false;

            if (string.IsNullOrEmpty(email)) return false;

            try
            {
                email = Regex.Replace(email, @"(@)(.+)$", DomainMapper, RegexOptions.None, TimeSpan.FromMilliseconds(200));
            }
            catch (RegexMatchTimeoutException)
            {

                return false;
            }

            if (invalid)
                return false;

            try
            {
                return Regex.IsMatch(email,
                    @"^(?("")("".+?(?<!\\)""@)|(([0-9a-z]((\.(?!\.))|[-!#\$%&'\*\+/=\?\^`\{\}\|~\w])*)(?<=[0-9a-z])@))" +
                      @"(?(\[)(\[(\d{1,3}\.){3}\d{1,3}\])|(([0-9a-z][-0-9a-z]*[0-9a-z]*\.)+[a-z0-9][\-a-z0-9]{0,22}[a-z0-9]))$",
                    RegexOptions.IgnoreCase, TimeSpan.FromMilliseconds(250));
            }
            catch (RegexMatchTimeoutException)
            {

                return false;
            }
        }

        public static string ToUserID(this int userId)
        {
            return "#" + userId.ToString("0000");
        }

        public static bool IsValidPhone(string Phone)
        {
            try
            {
                if (string.IsNullOrEmpty(Phone))
                    return false;
                var r = new Regex(@"(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$)");
                return r.IsMatch(Phone);

            }
            catch (RegexMatchTimeoutException)
            {
                return false;
            }
        }

        public static bool IsValidPassword(string password)
        {
            try
            {
                if (string.IsNullOrEmpty(password))
                    return false;
                var r = new Regex(@"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$");
                return r.IsMatch(password);
            }
            catch (RegexMatchTimeoutException)
            {
                return false;
            }
        }


        private static string DomainMapper(Match match)
        {
            // IdnMapping class with default property values.
            IdnMapping idn = new IdnMapping();

            string domainName = match.Groups[2].Value;
            try
            {
                domainName = idn.GetAscii(domainName);
            }
            catch (ArgumentException)
            {
                invalid = true;
            }
            return match.Groups[1].Value + domainName;
        }

        public static string GenerateToken(string id, int exp, UserRole role)
        {
            var claims = new Claim[] {
                new Claim(ClaimTypes.Name, id),
                new Claim("Role", ((int)role).ToString()),
                new Claim(ClaimTypes.Role, role.ToString()),
                new Claim(JwtRegisteredClaimNames.Exp, $"{new DateTimeOffset(DateTime.UtcNow.AddDays(exp == 0? 1: exp)).ToUnixTimeSeconds()}"),
                new Claim(JwtRegisteredClaimNames.Nbf, $"{new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds()}")};

            var token = new JwtSecurityToken(
                issuer: ApiConstants.API_ISSUER,
                audience: ApiConstants.API_CLIENT,
                claims: claims,
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddDays(exp),
                signingCredentials: new SigningCredentials(_secretKey, SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public static string GeneratePasscode(string passcode, string salt)
        {
            byte[] plainTextWithSaltBytes = Encoding.UTF8.GetBytes(passcode + salt);
            HashAlgorithm algorithm = new SHA256Managed();
            var buffer = algorithm.ComputeHash(plainTextWithSaltBytes);
            return Convert.ToBase64String(buffer);
        }

        public static string ImageUpload(string folderDir, IFormFile uploadedFile, string oldName = "", bool isDelete = false)
        {
            string fileName = null;
            var path = Path.Combine(Directory.GetCurrentDirectory(), folderDir);

            if (isDelete)
            {
                return DeleteFile(path, oldName);
            }

            if (uploadedFile != null && uploadedFile.Length > 0)
            {
                fileName = Guid.NewGuid().ToString() + "." + uploadedFile.FileName.Split('.').LastOrDefault();

                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }

                var filePath = Path.Combine(path, fileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    uploadedFile.CopyTo(fileStream);
                }

                if (!string.IsNullOrWhiteSpace(oldName))
                    DeleteFile(path, oldName);

                return fileName;
            }

            return oldName;
        }
        public static string FileUpload(string folderDir, IFormFile uploadedFile, string oldName = "", bool isDelete = false)
        {
            string fileName = null;
            var path = Path.Combine(Directory.GetCurrentDirectory(), folderDir);

            if (isDelete && uploadedFile == null)
            {
                return DeleteFile(path, oldName);
            }
            if (uploadedFile != null && uploadedFile.Length > 0)
            {
                fileName = Guid.NewGuid().ToString() + "." + uploadedFile.FileName.Split('.').LastOrDefault();

                Directory.CreateDirectory(path);

                var filePath = Path.Combine(path, fileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    uploadedFile.CopyTo(fileStream);
                }

                if (!string.IsNullOrWhiteSpace(oldName))
                    DeleteFile(path, oldName);

                return fileName;
            }

            return oldName;
        }


        public static string DeleteFile(string folderDir, string oldName)
        {
            var path = Path.Combine(Directory.GetCurrentDirectory(), folderDir);
            var fileOld = Path.Combine(path, oldName);
            if (File.Exists(fileOld))
                File.Delete(fileOld);
            return string.Empty;
        }

        public static string ToImageResource(this string imageName)
        {
            if (string.IsNullOrWhiteSpace(imageName))
                return string.Empty;

            var imageLink = Path.Combine(Directory.GetCurrentDirectory(), ApiConstants.FOLDELUPLOAD, imageName);

            return imageLink;
        }

        public static string EncryptMD5(string text)
        {
            using (var md5 = new MD5CryptoServiceProvider())
            {
                using (var tdes = new TripleDESCryptoServiceProvider())
                {
                    tdes.Key = md5.ComputeHash(UTF8Encoding.UTF8.GetBytes(Key));
                    tdes.Mode = CipherMode.ECB;
                    tdes.Padding = PaddingMode.PKCS7;

                    using (var transform = tdes.CreateEncryptor())
                    {
                        byte[] textBytes = UTF8Encoding.UTF8.GetBytes(text);
                        byte[] bytes = transform.TransformFinalBlock(textBytes, 0, textBytes.Length);
                        return Convert.ToBase64String(bytes, 0, bytes.Length);
                    }
                }
            }
        }
        public static string EncryptMD5(object obj)
        {
            var text = JsonConvert.SerializeObject(obj);
            using (var md5 = new MD5CryptoServiceProvider())
            {
                using (var tdes = new TripleDESCryptoServiceProvider())
                {
                    tdes.Key = md5.ComputeHash(UTF8Encoding.UTF8.GetBytes(Key));
                    tdes.Mode = CipherMode.ECB;
                    tdes.Padding = PaddingMode.PKCS7;

                    using (var transform = tdes.CreateEncryptor())
                    {
                        byte[] textBytes = UTF8Encoding.UTF8.GetBytes(text);
                        byte[] bytes = transform.TransformFinalBlock(textBytes, 0, textBytes.Length);
                        return Convert.ToBase64String(bytes, 0, bytes.Length);
                    }
                }
            }
        }

        public static string DecryptMD5(string cipher)
        {
            using (var md5 = new MD5CryptoServiceProvider())
            {
                using (var tdes = new TripleDESCryptoServiceProvider())
                {
                    tdes.Key = md5.ComputeHash(UTF8Encoding.UTF8.GetBytes(Key));
                    tdes.Mode = CipherMode.ECB;
                    tdes.Padding = PaddingMode.PKCS7;

                    using (var transform = tdes.CreateDecryptor())
                    {
                        byte[] cipherBytes = Convert.FromBase64String(cipher);
                        byte[] bytes = transform.TransformFinalBlock(cipherBytes, 0, cipherBytes.Length);
                        return UTF8Encoding.UTF8.GetString(bytes);
                    }
                }
            }
        }

        public static string ConvertToUnSignString(string s)
        {
            Regex regex = new Regex("\\p{IsCombiningDiacriticalMarks}+");
            string temp = s.Normalize(NormalizationForm.FormD);
            return regex.Replace(temp, String.Empty).Replace('\u0111', 'd').Replace('\u0110', 'D');
        }

        public static string ConvertFileNameDownload(string fileName)
        {
            return Regex.Replace(ConvertToUnSignString(fileName), @"\b \b", "_");
        }

        public static string NumberToWordsUnSign(long number)
        {
            if (number == 0)
                return "zero";

            if (number < 0)
                return "minus " + NumberToWordsUnSign(Math.Abs(number));

            string words = "";

            if ((number / 1000000) > 0)
            {
                words += NumberToWordsUnSign(number / 1000000) + " million ";
                number %= 1000000;
            }

            if ((number / 1000) > 0)
            {
                words += NumberToWordsUnSign(number / 1000) + " thousand ";
                number %= 1000;
            }

            if ((number / 100) > 0)
            {
                words += NumberToWordsUnSign(number / 100) + " hundred ";
                number %= 100;
            }

            if (number > 0)
            {
                if (words != "")
                    words += "and ";

                var unitsMap = new[] { "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen" };
                var tensMap = new[] { "zero", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety" };

                if (number < 20)
                    words += unitsMap[number];
                else
                {
                    words += tensMap[number / 10];
                    if ((number % 10) > 0)
                        words += "-" + unitsMap[number % 10];
                }
            }

            return words.TrimEnd();
        }

        public static string NumberToWords(long number)
        {
            if (number == 0)
                return "không";

            if (number < 0)
                return "trừ " + NumberToWords(Math.Abs(number));

            string words = "";

            if ((number / 1000000) > 0)
            {
                words += NumberToWords(number / 1000000) + " triệu ";
                number %= 1000000;
            }

            if ((number / 1000) > 0)
            {
                words += NumberToWords(number / 1000) + " ngàn ";
                number %= 1000;
            }

            if ((number / 100) > 0)
            {
                words += NumberToWords(number / 100) + " trăm ";
                number %= 100;
            }

            if (number > 0)
            {
                if (words != "")
                    words += "";

                var unitsMap = new[] { "không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín", "mười", "mười một", "mười hai", "mười ba", "mười bốn", "mười lăm", "mười sáu", "mười bảy", "mười tám", "mười chín" };
                var tensMap = new[] { "không", "mười", "hai mươi", "ba mươi", "bốn mươi", "năm mươi", "sáu mươi", "bảy mươi", "tám mươi", "chín mươi" };

                if (number < 20)
                    words += unitsMap[number];
                else
                {
                    words += tensMap[number / 10];
                    if ((number % 10) > 0)
                        words += " " + unitsMap[number % 10];
                }
            }

            return words.TrimEnd();
        }

        public static string FirstCharToUpper(this string input)
        {
            switch (input)
            {
                case null: throw new ArgumentNullException(nameof(input));
                case "": throw new ArgumentException($"{nameof(input)} cannot be empty", nameof(input));
                default: return input.First().ToString().ToUpper() + input.Substring(1);
            }
        }

        public static long GetTaxIncome(this long _income)
        {
            long income = _income;
            long tax = 0;
            int levelTax = 1;
            long temp = 0;

            while (income > 0)
            {
                switch (levelTax)
                {
                    case 1:
                        temp = income > 5000000 ? 5000000 : income;
                        income = income - temp;
                        tax += temp * 5 / 100;
                        break;
                    case 2:
                        temp = income > 5000000 ? 5000000 : income;
                        income = income - temp;
                        tax += temp * 10 / 100;
                        break;
                    case 3:
                        temp = income > 8000000 ? 8000000 : income;
                        income = income - temp;
                        tax += temp * 15 / 100;
                        break;
                    case 4:
                        temp = income > 14000000 ? 14000000 : income;
                        income = income - temp;
                        tax += temp * 20 / 100;
                        break;
                    case 5:
                        temp = income > 20000000 ? 20000000 : income;
                        income = income - temp;
                        tax += temp * 25 / 100;
                        break;
                    case 6:
                        temp = income > 28000000 ? 28000000 : income;
                        income = income - temp;
                        tax += temp * 30 / 100;
                        break;
                    case 7:
                        tax += income * 35 / 100;
                        income = 0;
                        break;
                }
                levelTax++;
            }
            return tax;
        }

        public static string NonUnicode(this string s)
        {
            Regex regex = new Regex("\\p{IsCombiningDiacriticalMarks}+");
            string temp = s.Normalize(NormalizationForm.FormD);
            return regex.Replace(temp, String.Empty).Replace('\u0111', 'd').Replace('\u0110', 'D');
        }

        public static bool IsValidJson(string strInput)
        {
            strInput = strInput.Trim();
            if ((strInput.StartsWith("{") && strInput.EndsWith("}")) || //For object
                (strInput.StartsWith("[") && strInput.EndsWith("]"))) //For array
            {
                try
                {
                    var obj = JToken.Parse(strInput);
                    var stringJson = obj.ToString();
                    return stringJson != "{}";
                }
                catch (JsonReaderException jex)
                {
                    //Exception in parsing json
                    Console.WriteLine(jex.Message);
                    return false;
                }
                catch (Exception ex) //some other exception
                {
                    Console.WriteLine(ex.ToString());
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

    }
}
