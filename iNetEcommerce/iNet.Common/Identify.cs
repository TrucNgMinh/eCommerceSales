using PCLCrypto;
using System;

namespace iNet.Common
{
    public static class Identify
    {
        public static long Id
        {
            get
            {
                var dateTime = DateTime.Now.ToUniversalTime();
                var julianDate = ToJulian(dateTime);
                //hardcode device id 
                var bitmark = GetBitMarkLength(201);
                long id = 201;
                id = id << 4 - bitmark;
                id |= (uint)Rand(); //maximum 20 bit
                id = id << 16;
                id |= (ushort)julianDate;
                id = id << 5;
                id |= (ushort)dateTime.Hour;
                id = id << 6;
                id |= (ushort)dateTime.Minute;
                id = id << 6;
                id |= (ushort)dateTime.Second;
                id = id << 10;
                id |= (ushort)dateTime.Millisecond;
                return id;
            }
        }

        static int ToJulian(DateTime dateTime)
        {
            int day = dateTime.Day;
            int month = dateTime.Month;
            int year = dateTime.Year;

            if (month < 3)
            {
                month = month + 12;
                year = year - 1;
            }

            return day + (153 * month - 457) / 5 + 365 * year + (year / 4) - (year / 100) + (year / 400);// + 1721119;
        }

        static string FromJulian(long julianDate, string format)
        {
            long L = julianDate + 68569;
            long N = ((4 * L) / 146097);
            L = L - ((146097 * N + 3) / 4);
            long I = ((4000 * (L + 1) / 1461001));
            L = L - ((1461 * I) / 4) + 31;
            long J = ((80 * L) / 2447);
            int Day = (int)(L - ((2447 * J) / 80));
            L = (J / 11);
            int Month = (int)(J + 2 - 12 * L);
            int Year = (int)(100 * (N - 49) + I + L);

            // example format "dd/MM/yyyy"
            return new DateTime(Year, Month, Day).ToString(format);
        }

        static int GetBitMarkLength(uint n)
        {
            return Convert.ToString(n, 2).Length;
        }

        static string GetInvert(int n)
        {
            return Convert.ToString(~n, 2);
        }

        static int Rand()
        {
            const int maxValue = 2 ^ 20;

            var buffer = new byte[4];
            int bits, val;

            do
            {
                NetFxCrypto.RandomNumberGenerator.GetBytes(buffer);
                bits = BitConverter.ToInt32(buffer, 0) & 0x7FFFFFFF;
                val = bits % maxValue;
            } while (bits - val + (maxValue - 1) < 0);

            return val;
        }
    }
}
