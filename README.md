# Unofficial Kabum Digital API

## 💻 Project

This a unofficial <a href="https://kabum.digital/" target="_blank">Kabum Digital</a> API, created by me to get posts.

## Endpoints

### Random

To get posts from a random page access the following endpoint:
<pre>
  <code>
  https://kabum-digital.herokuapp.com/random
  </code>
</pre>


Response example:
<pre>
<code>
{
  "posts": [
    {
      "title": "O efeito do Y combinator nas startups Africanas",
      "link": "https://kabum.digital/o-efeito-do-y-combinator-nas-startups-africanas/"
    },
    {
      "title": "Homens mais ricos da tecnologia em Moçambique",
      "link": "https://kabum.digital/homens-mais-ricos-da-tecnologia-em-mocambique/"
    },
    ....
  ]
}
</code>
</pre>



### Most read

To get most read posts access the following endpoint
<pre>
  <code>
  https://kabum-digital.herokuapp.com/mostread
  </code>
</pre>


Response example:
<pre>
<code>
{
  "posts": [
    {
      "title": "Bill Gates busca por talentos em Moçambique",
      "link": "https://kabum.digital/bill-gates-busca-por-talentos-em-mocambique/"
    },
    {
      "title": "Cientista angolano desenvolve robô cristão",
      "link": "https://kabum.digital/cientista-angolano-desenvolve-robo-cristao/"
    },
    ...
  ]
}
</code>
</pre>



### All posts from a page

To get all posts from a specific page use
<pre>
<code>
https://kabum-digital.herokuapp.com/all/:page
</code>
</pre>
Are available 30 pages at the moment.

Response/get example:
<pre>
<code>https://kabum-digital.herokuapp.com/all/5</code>
<code>
{
  "posts": [
    ...,
    {
      "title": "LayLizzy dá luz ao seu primeiro Podcast",
      "link": "https://kabum.digital/laylizzy-da-luz-ao-seu-primeiro-podcast/"
    },
    {
      "title": "Geraldine Geraldo digitaliza o comércio informal em Angola",
      "link": "https://kabum.digital/geraldine-geraldo-digitaliza-o-comercio-informal-em-angola/"
    },
    ...
  ]
}
</code>
</pre>



### Get a post content

To get post content use
<code>
https://kabum-digital.herokuapp.com/post/:id
</code>

Response example:
<pre>
<code>https://kabum-digital.herokuapp.com/post/entre-htmls-e-javas-conheca-o-jose-pedro-dava/"</code>
<code>
{
  "post": {
    "title": "Entre “HTMLs e Javas”: conheça o José Pedro Dava",
    "link": "https://kabum.digital/entre-htmls-e-javas-conheca-o-jose-pedro-dava",
    "image": "https://kabum.digital/wp-content/uploads/2022/08/KABUM_Media_artigo_cover-01-1160x829.jpeg",
    "content": [
      "Chama-se José Pedro Dava, nasceu em Maputo, é Desenvolvedor de software há mais de 10 anos e entusiasta de UI/UX.",
      "A sua interação com a actual área em que actua aconteceu através de um concurso de matemática, na secundária e pelo seu sonho de desenvolverjogos.",
      "É formado em Engenharia informática, CCNA e UI/UX e através da sua área busca pela consistência em termos de design de aplicativos, web apps e criação destas plataformas para resolução de problemas sociais.",
      ...
    ]
  }
}
</code>
</pre>

## 📝 License

This project is under MIT license. See the [LICENSE](./LICENSE) file for more details.

---

Made by ♥ :wave: [Jeffer Marcelino!](https://github.com/JefferMarcelino/)
