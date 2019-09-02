using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication4.Model
{
    public class Modulos
    {
        [Key]
        public int Id_Modulos { get; set; }
        public bool View { get; set; }
        public bool Inserir { get; set; }
        public bool Update { get; set; }
        public bool Excluir { get; set; }
        public string Nome { get; set; }
        [ForeignKey("GrupoUsuario")]
        public int Id_GrupoUsuario { get; set; }
        public virtual GrupoUsuario GrupoUsuario { get; set; }
    }
}
