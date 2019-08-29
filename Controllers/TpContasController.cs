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
    public class TpContasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TpContasController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/TpContas
        [HttpGet("Gettpcontas")]
        public IEnumerable<TpConta> GetTpConta()
        {
            return _context.TpConta;
        }

        // GET: api/TpContas/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTpConta([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tpConta = await _context.TpConta.FindAsync(id);

            if (tpConta == null)
            {
                return NotFound();
            }

            return Ok(tpConta);
        }

        // PUT: api/TpContas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTpConta([FromRoute] int id, [FromBody] TpConta tpConta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tpConta.idtpconta)
            {
                return BadRequest();
            }

            _context.Entry(tpConta).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TpContaExists(id))
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

        // POST: api/TpContas
        [HttpPost]
        public async Task<IActionResult> PostTpConta([FromBody] TpConta tpConta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.TpConta.Add(tpConta);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTpConta", new { id = tpConta.idtpconta }, tpConta);
        }

        // DELETE: api/TpContas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTpConta([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tpConta = await _context.TpConta.FindAsync(id);
            if (tpConta == null)
            {
                return NotFound();
            }

            _context.TpConta.Remove(tpConta);
            await _context.SaveChangesAsync();

            return Ok(tpConta);
        }

        private bool TpContaExists(int id)
        {
            return _context.TpConta.Any(e => e.idtpconta == id);
        }
    }
}