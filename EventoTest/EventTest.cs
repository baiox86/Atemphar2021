using System;
using API.Models.Evento;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace EventoTest
{
    [TestClass]
    public class EventTest
    {
        [TestMethod]
        public void TestMethod1()
        {
            Evento evento = new Evento();

            evento.nomeEvento = "Evento ";
            evento.dataEvento = "26/08/2021";
            evento.localEvento = "Lá";
            evento.tipoEvento = "Festa";
            evento.observacoes = "nada";

            Evento.CreateEvento(evento);
        }
    }
}
