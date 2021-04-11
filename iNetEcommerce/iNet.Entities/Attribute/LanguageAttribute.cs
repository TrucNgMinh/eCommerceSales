using System;
using System.Collections.Generic;
using System.Text;

namespace iNet.Attribute
{
    [AttributeUsage(AttributeTargets.Property)]
    public class LanguageAttribute : FlagsAttribute
    {
        public string FieldName { get; set; }

        public LanguageAttribute()
        {

        }

        public LanguageAttribute(string name)
        {
            FieldName = name;
        }
    }

    [AttributeUsage(AttributeTargets.Class)]
    public class LanguageTableAttribute : FlagsAttribute
    {
        public string TableName { get; set; }

        public LanguageTableAttribute()
        {

        }

        public LanguageTableAttribute(string tableName)
        {
            TableName = tableName;
        }
    }
}
