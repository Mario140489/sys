using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication4.Model
{
    public class Crm_produtogroup
    {
        [Key]
        public int id_produtogroup { get; set; }
        public string ds_produtogroup { get; set; }
        public bool do_inativo { get; set; }
    }

}
