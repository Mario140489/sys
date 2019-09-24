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
    public class GrupoXModulosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public GrupoXModulosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/GrupoXModulos
        [HttpGet]
        public IEnumerable<GrupoXModulos> GetgrupoXModulos()
        {
            return _context.grupoXModulos;
        }

        // GET: api/GrupoXModulos/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetGrupoXModulos([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var grupoXModulos = await _context.grupoXModulos.FindAsync(id);

            if (grupoXModulos == null)
            {
                return NotFound();
            }

            return Ok(grupoXModulos);
        }

        // PUT: api/GrupoXModulos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGrupoXModulos([FromRoute] int id, [FromBody] GrupoXModulos grupoXModulos)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != grupoXModulos.Idgrupoxmodulo)
            {
                return BadRequest();
            }

            _context.Entry(grupoXModulos).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GrupoXModulosExists(id))
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

        // POST: api/GrupoXModulos
        [HttpPost]
        public async Task<IActionResult> PostGrupoXModulos([FromBody] GrupoXModulos grupoXModulos)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.grupoXModulos.Add(grupoXModulos);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGrupoXModulos", new { id = grupoXModulos.Idgrupoxmodulo }, grupoXModulos);
        }

        // DELETE: api/GrupoXModulos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGrupoXModulos([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var grupoXModulos = await _context.grupoXModulos.FindAsync(id);
            if (grupoXModulos == null)
            {
                return NotFound();
            }

            _context.grupoXModulos.Remove(grupoXModulos);
            await _context.SaveChangesAsync();

            return Ok(grupoXModulos);
        }

        private bool GrupoXModulosExists(int id)
        {
            return _context.grupoXModulos.Any(e => e.Idgrupoxmodulo == id);
        }
    }
}