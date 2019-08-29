using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication4.Model
{
    public class Crm_status
    {
        [Key]
        public int id_status { get; set; }
        public string ds_status { get; set; }
        public bool do_inativo { get; set; }
    }
}
