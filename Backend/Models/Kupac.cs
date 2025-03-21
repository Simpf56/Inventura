﻿namespace Backend.Models

{
    public class Kupac : Entitet
    {
        public string Ime { get; set; } = "";
        public string Prezime { get; set; } = "";
        public string Br_tel { get; set; } = "";

        public string Adresa { get; set; } = "";
        public DateOnly Datum_rod { get; set; }

        public ICollection<Narudzba> Narudzbe { get;} = [];
    }
}
