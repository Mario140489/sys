using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication4.Model
{
    public class Crm_imobilizado
    {
        [Key]
        public int id_imobilizado { get; set; }
        public string ds_localizacao { get; set; }
        public string nr_nf { get; set; }
        public string ds_fornecedor { get; set; }
        public DateTime dt_aquisicao { get; set; }
        public string ds_registro { get; set; }
        public string ds_item { get; set; }
        /* public string ds_detalhe { get; set; }
         public string ds_material { get; set; }
         public string ds_cor { get; set; }
         public int id_status { get; set; }
         public Crm_status crm_Status { get; set; }
         public int id_produtogroup { get; set; }
         public Crm_produtogroup crm_produtogroup { get; set; }
           public decimal nr_vlaquisicao { get; set; }
           public decimal nr_vlrecuperavel { get; set; }
           public string bol_imagem { get; set; }
           public bool do_inativo { get; set; }
           public bool do_imobilizado { get; set; }
           public int nr_vida_util { get; set; }
           public DateTime dt_reavaliacao { get; set; }
           public decimal nr_vlreavaliado { get; set; }
           public int nr_vida_util_societaria { get; set; }
           public decimal nr_depreacuinicial { get; set; }
           public Crm_status crm_Status { get; set; }
           public int id_produtogroup { get; set; }
           public Crm_produtogroup crm_produtogroup { get; set; }
           */
    }

}
