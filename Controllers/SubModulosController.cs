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
    public class SubModulosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SubModulosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/SubModulos
        [HttpGet]
        public IEnumerable<SubModulos> GetSubModulos()
        {
            return _context.SubModulos;
        }

        // GET: api/SubModulos/5
        [HttpGet("{id}")]
        public  IActionResult GetSubModulos([FromRoute] int id)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var subModulos = _context.SubModulos.Where(b => b.Id_Modulos == id);

            if (subModulos == null)
            {
                return NotFound();
            }

            return Ok(subModulos);
        }

        // PUT: api/SubModulos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubModulos([FromRoute] int id, [FromBody] SubModulos subModulos)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != subModulos.Id_SubModulos)
            {
                return BadRequest();
            }

            _context.Entry(subModulos).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubModulosExists(id))
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

        // POST: api/SubModulos
        [HttpPost]
        public async Task<IActionResult> PostSubModulos([FromBody] SubModulos subModulos)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.SubModulos.Add(subModulos);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSubModulos", new { id = subModulos.Id_SubModulos }, subModulos);
        }

        // DELETE: api/SubModulos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubModulos([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var subModulos = await _context.SubModulos.FindAsync(id);
            if (subModulos == null)
            {
                return NotFound();
            }

            _context.SubModulos.Remove(subModulos);
            await _context.SaveChangesAsync();

            return Ok(subModulos);
        }

        private bool SubModulosExists(int id)
        {
            return _context.SubModulos.Any(e => e.Id_SubModulos == id);
        }
    }
}