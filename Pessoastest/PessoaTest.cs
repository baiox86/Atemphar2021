using System;
using API.Models.Pessoas;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Pessoastest
{
    [TestClass]
    public class PessoaTest
    {
        [TestMethod]
        public void TestMethod1()
        {

            Pessoa pessoa = new Pessoa();


            pessoa.telefone = "915236985";
            pessoa.nome = "Zé";
            pessoa.zona = "Ourem";
            pessoa.email = "123@hotmail.com";
            pessoa.nif = "220985468";
            pessoa.genero = "macho";
            pessoa.dataNasc = "12/12/2020";
            //pessoa.comoConheceu 

            pessoa.CreatePessoa(pessoa);
        }
    }
}
