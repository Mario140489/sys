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
    public class Crm_imobilizadoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public Crm_imobilizadoController(ApplicationDbContext context)
        {
            _context = context;
        }

        //GET: api/Crm_imobilizado
        [HttpGet("getimobilizado")]
        public IEnumerable<Crm_imobilizado> GetCrm_imobilizado()
        {
            var imobilizado = _context.Crm_imobilizado;
            return imobilizado;
        }
       
        // GET: api/Crm_imobilizado/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCrm_imobilizado([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var crm_imobilizado = await _context.Crm_imobilizado.FindAsync(id);

            if (crm_imobilizado == null)
            {
                return NotFound();
            }

            return Ok(crm_imobilizado);
        }

        // PUT: api/Crm_imobilizado/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCrm_imobilizado([FromRoute] int id, [FromBody] Crm_imobilizado crm_imobilizado)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != crm_imobilizado.id_imobilizado)
            {
                return BadRequest();
            }

            _context.Entry(crm_imobilizado).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Crm_imobilizadoExists(id))
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

        // POST: api/Crm_imobilizado
        [HttpPost]
        public async Task<IActionResult> PostCrm_imobilizado([FromBody] Crm_imobilizado crm_imobilizado)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Crm_imobilizado.Add(crm_imobilizado);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCrm_imobilizado", new { id = crm_imobilizado.id_imobilizado }, crm_imobilizado);
        }

        // DELETE: api/Crm_imobilizado/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCrm_imobilizado([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var crm_imobilizado = await _context.Crm_imobilizado.FindAsync(id);
            if (crm_imobilizado == null)
            {
                return NotFound();
            }

            _context.Crm_imobilizado.Remove(crm_imobilizado);
            await _context.SaveChangesAsync();

            return Ok(crm_imobilizado);
        }

        private bool Crm_imobilizadoExists(int id)
        {
            return _context.Crm_imobilizado.Any(e => e.id_imobilizado == id);
        }
    }
}