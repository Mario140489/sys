using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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
        public DateTime DtUpdate { get; set; }
        public DateTime DtCadastro { get; set; }
        [ForeignKey("GrupoUsuario")]
        public int Id_GrupoUsuario { get; set; }
        public virtual GrupoUsuario GrupoUsuario { get; set; }
    }
}
