﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication4.Model
{
    public class GrupoUsuario
    {
      [Key]
      public int  idGrupoUsuario { get; set; }
      public string ds_GrupoUsuario { get; set; }
      public bool Inativo { get; set; }
    }
}
