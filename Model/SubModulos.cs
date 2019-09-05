using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication4.Model
{
    public class SubModulos
    {
        [Key]
        public int Id_SubModulos { get; set; }
        public int Id_Modulos { get; set; }
        public string Nome { get; set; }
        public string Icon { get; set; }
        public virtual Formularios Formularios { get; set; }
    }
}
