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
    public class Crm_statusController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public Crm_statusController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Crm_status
        [HttpGet("getstatus")]
        public IEnumerable<Crm_status> GetCrm_status()
        {
            return _context.Crm_status;
        }

        // GET: api/Crm_status/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCrm_status([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var crm_status = await _context.Crm_status.FindAsync(id);

            if (crm_status == null)
            {
                return NotFound();
            }

            return Ok(crm_status);
        }

        // PUT: api/Crm_status/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCrm_status([FromRoute] int id, [FromBody] Crm_status crm_status)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != crm_status.id_status)
            {
                return BadRequest();
            }

            _context.Entry(crm_status).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Crm_statusExists(id))
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

        // POST: api/Crm_status
        [HttpPost]
        public async Task<IActionResult> PostCrm_status([FromBody] Crm_status crm_status)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Crm_status.Add(crm_status);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCrm_status", new { id = crm_status.id_status }, crm_status);
        }

        // DELETE: api/Crm_status/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCrm_status([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var crm_status = await _context.Crm_status.FindAsync(id);
            if (crm_status == null)
            {
                return NotFound();
            }

            _context.Crm_status.Remove(crm_status);
            await _context.SaveChangesAsync();

            return Ok(crm_status);
        }

        private bool Crm_statusExists(int id)
        {
            return _context.Crm_status.Any(e => e.id_status == id);
        }
    }
}