using API.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace EmpresaTest
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {

            int idEmpresa = 10;
            string nomeEmpresa = "Hehe";
            string moradaEmpresa = "Hehe1";
            string telefoneEmpresa = "Hehe2";
            string emailEmpresa = "Hehe3";
            string nifEmpresa = "Hehe4";
            string observacoes = "Hehe5";

            Empresa empresa = new Empresa();

            empresa.idEmpresa = idEmpresa;
            empresa.nomeEmpresa = nomeEmpresa;
            empresa.moradaEmpresa = moradaEmpresa;
            empresa.telefoneEmpresa = telefoneEmpresa;
            empresa.emailEmpresa = emailEmpresa;
            empresa.nifEmpresa = nifEmpresa;
            empresa.observacoes = observacoes;

            Empresa.CreateEmpresa(empresa);
    }
}
}
