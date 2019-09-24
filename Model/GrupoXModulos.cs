using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication4.Model
{
    public class GrupoXModulos
    {
        [Key]
        public int Idgrupoxmodulo { get; set; }
        public int Idgrupo { get; set; }
        public int IdModulo { get; set; }
    }
}
