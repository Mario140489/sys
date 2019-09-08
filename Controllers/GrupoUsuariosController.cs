using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication4.Data;
using WebApplication4.Model;

namespace WebApplication4.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GrupoUsuariosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public GrupoUsuariosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/GrupoUsuarios
        [HttpGet]
        public IEnumerable<GrupoUsuario> GetGrupoUsuario()
        {
            return _context.GrupoUsuario;
        }

        // GET: api/GrupoUsuarios/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetGrupoUsuario([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var grupoUsuario = await _context.GrupoUsuario.FindAsync(id);

            if (grupoUsuario == null)
            {
                return NotFound();
            }

            return Ok(grupoUsuario);
        }

        // PUT: api/GrupoUsuarios/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGrupoUsuario([FromRoute] int id, [FromBody] GrupoUsuario grupoUsuario)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != grupoUsuario.idGrupoUsuario)
            {
                return BadRequest();
            }

            _context.Entry(grupoUsuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GrupoUsuarioExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/GrupoUsuarios
        [HttpPost]
        public async Task<IActionResult> PostGrupoUsuario([FromBody] GrupoUsuario grupoUsuario)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.GrupoUsuario.Add(grupoUsuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGrupoUsuario", new { id = grupoUsuario.idGrupoUsuario }, grupoUsuario);
        }

        // DELETE: api/GrupoUsuarios/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGrupoUsuario([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var grupoUsuario = await _context.GrupoUsuario.FindAsync(id);
            if (grupoUsuario == null)
            {
                return NotFound();
            }

            _context.GrupoUsuario.Remove(grupoUsuario);
            await _context.SaveChangesAsync();

            return Ok(grupoUsuario);
        }

        private bool GrupoUsuarioExists(int id)
        {
            return _context.GrupoUsuario.Any(e => e.idGrupoUsuario == id);
        }
    }
}