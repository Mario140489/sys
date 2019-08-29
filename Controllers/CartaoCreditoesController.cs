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
    public class CartaoCreditoesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CartaoCreditoesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/CartaoCreditoes
        [HttpGet("getcartao")]
        public IEnumerable<CartaoCredito> GetCartaoCredito()
        {
            return _context.CartaoCredito;
        }

        // GET: api/CartaoCreditoes/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCartaoCredito([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var cartaoCredito = await _context.CartaoCredito.FindAsync(id);

            if (cartaoCredito == null)
            {
                return NotFound();
            }

            return Ok(cartaoCredito);
        }

        // PUT: api/CartaoCreditoes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCartaoCredito([FromRoute] int id, [FromBody] CartaoCredito cartaoCredito)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != cartaoCredito.idcartao)
            {
                return BadRequest();
            }

            _context.Entry(cartaoCredito).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartaoCreditoExists(id))
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

        // POST: api/CartaoCreditoes
        [HttpPost]
        public async Task<IActionResult> PostCartaoCredito([FromBody] CartaoCredito cartaoCredito)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.CartaoCredito.Add(cartaoCredito);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCartaoCredito", new { id = cartaoCredito.idcartao }, cartaoCredito);
        }

        // DELETE: api/CartaoCreditoes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCartaoCredito([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var cartaoCredito = await _context.CartaoCredito.FindAsync(id);
            if (cartaoCredito == null)
            {
                return NotFound();
            }

            _context.CartaoCredito.Remove(cartaoCredito);
            await _context.SaveChangesAsync();

            return Ok(cartaoCredito);
        }

        private bool CartaoCreditoExists(int id)
        {
            return _context.CartaoCredito.Any(e => e.idcartao == id);
        }
    }
}