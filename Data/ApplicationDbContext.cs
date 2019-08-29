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
        public DbSet<Contas> Contas { get; set; }
        public DbSet<TpConta> TpConta { get; set; }
        public DbSet<CartaoCredito> CartaoCredito { get; set; }
        public DbSet<WebApplication4.Model.Crm_status> Crm_status { get; set; }
        public DbSet<WebApplication4.Model.Crm_produtogroup> Crm_produtogroup { get; set; }
        public DbSet<WebApplication4.Model.Crm_imobilizado> Crm_imobilizado { get; set; }
    }
}
