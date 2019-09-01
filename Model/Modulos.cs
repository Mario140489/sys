using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication4.Model
{
    public class Modulos
    {
        public int Id_Modulos { get; set; }
        public bool View { get; set; }
        public bool Inserir { get; set; }
        public bool Update { get; set; }
        public bool Excluir { get; set; }
        public string Nome { get; set; }
        public virtual GrupoUsuario Id_GrupoUsuario { get; set; }
    }
}
