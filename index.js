const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 8000; // Const para armanezar a porta do servidor

const Pokedex = [
  {
    Número: "N°001",
    Nome: "Bulbasaur",
    Tipo: "Grama, Venenoso",
    Imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
    Imagem2:
      "https://i.pinimg.com/originals/62/a6/94/62a694968a8a3a1842c4b9a79d5aa5c1.gif",
    Descrição:
      "Bulbasaur é uma criatura quadrúpede réptil que lembra um dinossauro jovem, com um azul-verde manchado. Ele tem três dedos brancos ou garras crescendo fora de suas quatro pernas, e seus olhos são de um vermelho brilhante.",
    Altura: "0,7 M",
    Peso: "6.9Kg",
    Categoria: "Semente",
    Habilidade: "Super Crescimento",
  },
  {
    Número: "N°002",
    Nome: "Ivysaur",
    Tipo: "Grama, Venenoso",
    Imagem:
      "https://i.pinimg.com/originals/df/ed/88/dfed88e5a6cd366da8a8ff5e6ee4a6fe.png",
    Imagem2:
      "https://64.media.tumblr.com/e859d14fc70c90df13a165e7e5c08aae/tumblr_ny4n6sYoYj1umnumio4_500.gifv",
    Descrição:
      "Sua flor em suas costas cresce conforme à intensidade da luz do sol absorvida. Como a flor cresce, Ivysaur perde a capacidade de ficar sobre as patas traseiras. A flor produz um cheiro agradável quando ele está pronto para florescer, e Ivysaur está pronto para evoluir para Venusaur.",
    Altura: "1.0 M",
    Peso: "13.0Kg",
    Categoria: "Semente",
    Habilidade: "Super Crescimento",
  },
  {
    Número: "N°003",
    Nome: "Venusaur",
    Tipo: "Grama, Venenoso",
    Imagem:
      "https://assets.pokemon.com/assets/cms2/img/pokedex/full/003_f2.png",
    Imagem2: "https://giffiles.alphacoders.com/131/13110.gif",
    Descrição:
      "Venusaur absorve a luz solar para ganhar energia e para alimentar a sua flor, localizada em sua parte traseira. Depois de ganhar uma certa quantidade de luz solar, a flor vai lançar um aroma doce. Além disso, depois de um dia de chuva, o cheiro do aroma da flor cresce mais forte, atraindo outros pokémon.",
    Altura: "2.0 M",
    Peso: "100.0Kg",
    Categoria: "Semente",
    Habilidade: "Super Crescimento",
  },
];

let message = "";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

app.get("/", (req, res) => {
  setTimeout(() => {
    message = "";
  }, 1000);
  res.render("index", { Pokedex, message }); // Nome do arquivo, o EJS já busca dentro da pasta views.
});

app.get("/detalhes/:id", (req, res) => {
  const id = req.params.id;
  const pokemon = Pokedex[id];
  res.render("detalhes", {
    pokemon,
  });
});

app.get("/cadastro", (req, res) => {
  res.render("cadastro"); // Nome do arquivo, o EJS já busca dentro da pasta views.
});

app.post("/new", (req, res) => {
  const { number, nome, type, img, descrypt, alt, kg, cat, ability } = req.body;
  Pokedex.push({
    Número: number,
    Nome: nome,
    Tipo: type,
    Imagem: img,
    Descrição: descrypt,
    Altura: alt,
    Peso: kg,
    Categoria: cat,
    Habilidade: ability,
  }); // Nome do arquivo, o EJS já busca dentro da pasta views.
  message = "Seu pokémon foi cadastrado com sucesso!!!";
  res.redirect("/");
});

// Adicionando a const port e uma arow function de callback para mostrar no console que o servidor está rodando.
app.listen(port);
