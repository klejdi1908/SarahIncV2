using System;
using System.Collections.Generic;

namespace SarahIncV2.DbModels
{
    public partial class PrintOption
    {
        public int Id { get; set; }
        public int? FormId { get; set; }
        public string Name { get; set; }
        public short? Height { get; set; }
        public short? Width { get; set; }
        public byte? Widows { get; set; }
        public byte? Orphans { get; set; }

        public Form Form { get; set; }
    }
}
