using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication4.Model
{
    public class ProdCardapio
    {   [Key]
        public int idprodcardapio { get; set; }
        public string nome { get; set; }
        public decimal preco { get; set; }
        public bool inativo { get; set; }
    }
}
