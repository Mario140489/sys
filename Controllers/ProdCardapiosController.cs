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
    public class ProdCardapiosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProdCardapiosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ProdCardapios
        [HttpGet]
        public IEnumerable<ProdCardapio> GetProdCardapio()
        {
            return _context.ProdCardapio;
        }

        // GET: api/ProdCardapios/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProdCardapio([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var prodCardapio = await _context.ProdCardapio.FindAsync(id);

            if (prodCardapio == null)
            {
                return NotFound();
            }

            return Ok(prodCardapio);
        }

        // PUT: api/ProdCardapios/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProdCardapio([FromRoute] int id, [FromBody] ProdCardapio prodCardapio)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != prodCardapio.idprodcardapio)
            {
                return BadRequest();
            }

            _context.Entry(prodCardapio).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProdCardapioExists(id))
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

        // POST: api/ProdCardapios
        [HttpPost]
        public async Task<IActionResult> PostProdCardapio([FromBody] ProdCardapio prodCardapio)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.ProdCardapio.Add(prodCardapio);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProdCardapio", new { id = prodCardapio.idprodcardapio }, prodCardapio);
        }

        // DELETE: api/ProdCardapios/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProdCardapio([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var prodCardapio = await _context.ProdCardapio.FindAsync(id);
            if (prodCardapio == null)
            {
                return NotFound();
            }

            _context.ProdCardapio.Remove(prodCardapio);
            await _context.SaveChangesAsync();

            return Ok(prodCardapio);
        }

        private bool ProdCardapioExists(int id)
        {
            return _context.ProdCardapio.Any(e => e.idprodcardapio == id);
        }
    }
}