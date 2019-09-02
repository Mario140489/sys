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
    public class ModulosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ModulosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Modulos
        [HttpGet]
        public IEnumerable<Modulos> GetModulo()
        {
            return _context.Modulos;
        }

        // GET: api/Modulos/5
        [HttpGet("{id}")]
        public IActionResult GetModulos(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var modulos = _context.Modulos.Where(b => b.Id_GrupoUsuario == id);

            if (modulos == null)
            {
                return NotFound();
            }

            return Ok(modulos);
        }

        // PUT: api/Modulos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutModulos([FromRoute] int id, [FromBody] Modulos modulos)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != modulos.Id_Modulos)
            {
                return BadRequest();
            }

            _context.Entry(modulos).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ModulosExists(id))
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

        // POST: api/Modulos
        [HttpPost]
        public async Task<IActionResult> PostModulos([FromBody] Modulos modulos)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Modulos.Add(modulos);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetModulos", new { id = modulos.Id_Modulos }, modulos);
        }

        // DELETE: api/Modulos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteModulos([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var modulos = await _context.Modulos.FindAsync(id);
            if (modulos == null)
            {
                return NotFound();
            }

            _context.Modulos.Remove(modulos);
            await _context.SaveChangesAsync();

            return Ok(modulos);
        }

        private bool ModulosExists(int id)
        {
            return _context.Modulos.Any(e => e.Id_Modulos == id);
        }
    }
}