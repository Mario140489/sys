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
    public class FormulariosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FormulariosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Formularios
        [HttpGet]
        public IEnumerable<Formularios> GetFormularios()
        {
            return _context.Formularios;
        }

        // GET: api/Formularios/5
        [HttpGet("{id}")]
        public  IActionResult GetFormularios([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var formularios =  _context.Formularios.Where(b => b.Id_SubModulos == id);

            if (formularios == null)
            {
                return NotFound();
            }

            return Ok(formularios);
        }

        // PUT: api/Formularios/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFormularios([FromRoute] int id, [FromBody] Formularios formularios)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != formularios.IdFormularios)
            {
                return BadRequest();
            }

            _context.Entry(formularios).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FormulariosExists(id))
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

        // POST: api/Formularios
        [HttpPost]
        public async Task<IActionResult> PostFormularios([FromBody] Formularios formularios)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Formularios.Add(formularios);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFormularios", new { id = formularios.IdFormularios }, formularios);
        }

        // DELETE: api/Formularios/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFormularios([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var formularios = await _context.Formularios.FindAsync(id);
            if (formularios == null)
            {
                return NotFound();
            }

            _context.Formularios.Remove(formularios);
            await _context.SaveChangesAsync();

            return Ok(formularios);
        }

        private bool FormulariosExists(int id)
        {
            return _context.Formularios.Any(e => e.IdFormularios == id);
        }
    }
}