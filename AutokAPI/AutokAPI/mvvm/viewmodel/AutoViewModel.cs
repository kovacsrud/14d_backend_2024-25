using AutokAPI.mvvm.model;

namespace AutokAPI.mvvm.viewmodel
{
    public class AutoViewModel
    {
        public List<Auto> Autok { get; set; }=new List<Auto>();

        public AutoViewModel()
        {
              Autok.Add(new Auto
              {
                  Id = 0,
                  Marka="Ford",
                  Tipus="Focus",
                  Rendszam="KKL-029",
                  GyartasiEv=2009,
                  Szin="kék"
              });

            Autok.Add(new Auto
            {
                Id = 1,
                Marka = "Fiat",
                Tipus = "Linea",
                Rendszam = "NCK-366",
                GyartasiEv = 2006,
                Szin = "bordó"
            });

            Autok.Add(new Auto
            {
                Id = 2,
                Marka = "Volkswagen",
                Tipus = "Touran",
                Rendszam = "SWK-116",
                GyartasiEv = 2007,
                Szin = "szürke"
            });

        }
    }
}
