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
        public class ContasController : ControllerBase
        {
            private readonly ApplicationDbContext _context;

            public ContasController(ApplicationDbContext context)
            {
                _context = context;
            }

        // GET: api/Contas
        [HttpGet("GetContas")]
        public IEnumerable<Contas> GetContas()
            {
               return _context.Contas;
            }

            // GET: api/Contas/5
            [HttpGet("{id}")]
            public async Task<IActionResult> GetContas([FromRoute] int id)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var contas = await _context.Contas.FindAsync(id);

                if (contas == null)
                {
                    return NotFound();
                }

                return Ok(contas);
            }

            // PUT: api/Contas/5
            [HttpPut("{id}")]
            public async Task<IActionResult> PutContas([FromRoute] int id, [FromBody] Contas contas)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (id != contas.IdContas)
                {
                    return BadRequest();
                }

                _context.Entry(contas).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ContasExists(id))
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

            // POST: api/Contas
            [HttpPost]
            public async Task<IActionResult> PostContas([FromBody] Contas contas)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _context.Contas.Add(contas);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetContas", new { id = contas.IdContas }, contas);
            }

            // DELETE: api/Contas/5
            [HttpDelete("{id}")]
            public async Task<IActionResult> DeleteContas([FromRoute] int id)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var contas = await _context.Contas.FindAsync(id);
                if (contas == null)
                {
                    return NotFound();
                }

                _context.Contas.Remove(contas);
                await _context.SaveChangesAsync();

                return Ok(contas);
            }

            private bool ContasExists(int id)
            {
                return _context.Contas.Any(e => e.IdContas == id);
            }
        }
    
}
