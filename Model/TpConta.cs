using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication4.Model
{
    public class TpConta
    {
        [Key]
        public int idtpconta { get; set; }
        [Required]
        [MaxLength(50)]
        public string descricao { get; set; }
        public bool inativo { get; set; }
        public bool tpcartao { get; set; }
    }
}
