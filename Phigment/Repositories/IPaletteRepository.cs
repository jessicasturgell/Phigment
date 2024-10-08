﻿using Phigment.Models;

namespace Phigment.Repositories
{
    public interface IPaletteRepository
    {
        List<Palette> GetAll();
        public List<Palette> GetAllByUserId(int userId);
        public Palette GetById(int id);
        public void Add (Palette palette);
        public void Update(Palette palette);
        public void Delete(int id);
    }
}