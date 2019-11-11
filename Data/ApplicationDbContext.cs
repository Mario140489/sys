using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication4.Model;

namespace WebApplication4.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
           : base(options)
        {
        }
        //public DbSet<Cliente> Cliente { get; set; }
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<GrupoUsuario> GrupoUsuario { get; set; }
        public DbSet<Modulos> Modulos { get; set; }
        public DbSet<SubModulos> SubModulos { get; set; }
        public DbSet<Formularios> Formularios { get; set; }
        public DbSet<GrupoXModulos> grupoXModulos { get; set; }
        public DbSet<ProdCardapio> ProdCardapio { get; set; }
    }
}
