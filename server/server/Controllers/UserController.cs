using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.ResourceManagers;

namespace server.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserManager _userManager;

        public UserController(IUserManager userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        public ActionResult<User> GetUsers()
        {
            var users = _userManager.GetUsers();
            return Ok(users);
        }

        [HttpPost]
        public ActionResult<User> PostUser([FromBody]User user)
        {
            _userManager.AddUser(user);
            return Created(nameof(GetUsers), user);
        }

        [HttpGet("{id}")]
        public ActionResult<User> GetUser(int id)
        {
            var user = _userManager.GetUser(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpDelete("{id}")]
        public ActionResult<User> DeleteUser([FromRoute]int id)
        {
            var user = _userManager.GetUser(id);
            if (user != null)
            {
                _userManager.DeleteUser(user);
                return Ok();
            }
            return NotFound();
        }

        [HttpPatch("{id}")]
        public ActionResult<User> UpdateUser([FromRoute]int id, [FromBody]User user)
        {
            //TODO: implement PATCH method, for ref check https://docs.microsoft.com/en-us/aspnet/core/web-api/jsonpatch?view=aspnetcore-3.1
            return Ok();
        }
    }
}