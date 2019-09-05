using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication4.Model
{
    public class Formularios
    {
        [Key]
        public int IdFormularios { get; set; }
        public string Nome { get; set; }
        public string Link { get; set; }
        public int Id_SubModulos { get; set; }
    }
}
