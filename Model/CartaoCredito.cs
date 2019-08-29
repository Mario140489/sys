using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication4.Model
{
    public class CartaoCredito
    {
        [Key]
        public int idcartao { get; set; }
        [MaxLength(50)]
        public string descricao { get; set; }
        public string numero { get; set; }
        public decimal limite { get; set; }
        public decimal saldo { get; set; }
        public string dtfechamento { get; set; }
        public string dtpagamento { get; set; }
        public bool inativo { get; set; }
    }
}
