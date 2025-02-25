﻿using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;

        public AuthRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<User> Register(User user, string password)
        {
            CreatePasswordHash(password, out var passwordHash, out var passwordSalt);

            user.PasswordHash = passwordHash;

            user.PasswordSalt = passwordSalt;

            await _context.Users.AddAsync(user);

            await _context.SaveChangesAsync();

            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;

                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<User> Login(string username, string password)
        {
            var user = await _context.Users
                .Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.Username == username);

            if (user == null)
                return null;

            if (!VeryPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            return user;
        }

        private bool VeryPasswordHash(string password, byte[] userPasswordHash, byte[] userPasswordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(userPasswordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

                for (var i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != userPasswordHash[i]) return false;
                }

                return true;
            }
        }

        public async Task<bool> UserExist(string username)
        {
            return await _context.Users.AnyAsync(x => x.Username == username);
        }
    }
}