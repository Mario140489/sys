using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication4.Model
{
    public class Contas

    {
        [Key]
        public int IdContas { get; set; }
        [MaxLength(50)]
        public string Descricao { get; set; }
        [DataType(DataType.Currency)]
        public decimal Valor { get; set; }
        [DataType(DataType.Date)]
        public DateTime vencimento {get;set;}
        public int parcela { get; set; }
        //public bool status { get; set; }
        //public DateTime dtCadastro { get; set; }
        //public DateTime dtupdate { get; set; }
        //public int idtpconta { get; set; }
    }
    }


