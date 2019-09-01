using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication4.Model
{
    public class Usuario
    {
        [Key]
        public int IdUsuario { get; set; }
        public string Nome { get; set; }
        public string Login { get; set; }
        public string Senha { get; set; }
        public DateTime DtCadastor { get; set; }
        public DateTime DtUpdate { get; set; }
        public virtual GrupoUsuario Id_GrupoUsuario {get;set;}
    }
}
