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
    public class Crm_produtogroupController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public Crm_produtogroupController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Crm_produtogroup
        [HttpGet("getprodutogroup")]
        public IEnumerable<Crm_produtogroup> GetCrm_produtogroup()
        {
            return _context.Crm_produtogroup;
        }

        // GET: api/Crm_produtogroup/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCrm_produtogroup([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var crm_produtogroup = await _context.Crm_produtogroup.FindAsync(id);

            if (crm_produtogroup == null)
            {
                return NotFound();
            }

            return Ok(crm_produtogroup);
        }

        // PUT: api/Crm_produtogroup/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCrm_produtogroup([FromRoute] int id, [FromBody] Crm_produtogroup crm_produtogroup)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != crm_produtogroup.id_produtogroup)
            {
                return BadRequest();
            }

            _context.Entry(crm_produtogroup).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Crm_produtogroupExists(id))
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

        // POST: api/Crm_produtogroup
        [HttpPost]
        public async Task<IActionResult> PostCrm_produtogroup([FromBody] Crm_produtogroup crm_produtogroup)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Crm_produtogroup.Add(crm_produtogroup);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCrm_produtogroup", new { id = crm_produtogroup.id_produtogroup }, crm_produtogroup);
        }

        // DELETE: api/Crm_produtogroup/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCrm_produtogroup([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var crm_produtogroup = await _context.Crm_produtogroup.FindAsync(id);
            if (crm_produtogroup == null)
            {
                return NotFound();
            }

            _context.Crm_produtogroup.Remove(crm_produtogroup);
            await _context.SaveChangesAsync();

            return Ok(crm_produtogroup);
        }

        private bool Crm_produtogroupExists(int id)
        {
            return _context.Crm_produtogroup.Any(e => e.id_produtogroup == id);
        }
    }
}