# Unofficial Kabum Digital API

## 💻 Project

This a unofficial <a href="https://kabum.digital/" target="_blank">Kabum Digital</a> API, created by me to get posts.

## Endpoints

### Random

To get posts from a random page access the following endpoint:
<pre>
<code>
  https://unofficial-kabum-digital-api.up.railway.app/random
</code>
</pre>


Response example:
<pre>
<code>
{
  "result": {
    "posts": [
      {
        "title": "Acabou stress, Doilio Matsinhe cria uma app para calcular valor de Lobolo",
        "link": "https://kabum.digital/acabou-stress-doilio-matsinhe-cria-uma-app-para-calcular-valor-de-lobolo/",
        "image": "https://kabum.digital/wp-content/uploads/2023/01/KABUM_Media_artigos_ver-02-380x250.jpeg",
        "id": "acabou-stress-doilio-matsinhe-cria-uma-app-para-calcular-valor-de-lobolo",
        "description": "Lobolo é um costume tradicional em algumas culturas africanas, como Moçambique, no qual o noivo paga uma espécie…"
      },
      {
        "title": "Calebe Miquissene: a busca por novas experiências",
        "link": "https://kabum.digital/calebe-miquissene-a-busca-por-novas-experiencias/",
        "image": "https://kabum.digital/wp-content/uploads/2023/01/KABUM_Media_artigos_cover-02-380x250.jpeg",
        "id": "calebe-miquissene-a-busca-por-novas-experiencias",
        "description": "Calebe Miquissene é um jovem moçambicano de 22 anos, com paixão pelo desenvolvimento de software seguindo as melhores…"
      },
      ...
    ],
    "prev": "https://kabum.digital/page/42/?s",
    "current": "https://kabum.digital/page/43/?s=",
    "next": "https://kabum.digital/page/44/?s"
  }
}
</code>
</pre>


### All posts from a page

To get all posts from a specific page use
<pre>
<code>
  https://unofficial-kabum-digital-api.up.railway.app/all/:page
</code>
</pre>

Are available 79 pages at the moment.

Request example:
<pre>
<code>
  https://unofficial-kabum-digital-api.up.railway.app/all/5
</code>
</pre>

Response example:
<pre>
<code>
{
  "result": {
    "posts": [
      {
        "title": "Startup cria braços robóticos para humanos",
        "link": "https://kabum.digital/startup-cria-bracos-roboticos-para-humanos/",
        "image": "https://kabum.digital/wp-content/uploads/2023/07/Bracos-Roboticos-380x250.jpg",
        "id": "startup-cria-bracos-roboticos-para-humanos",
        "description": "Com o objectivo de levar interação humana com robôs mais atrativa, uma startup japonesa desenvolveu braços robóticos que…"
      },
      {
        "title": "Whatsapp lança canais de comunicação",
        "link": "https://kabum.digital/whatsapp-lanca-canais-de-comunicacao/",
        "image": "https://kabum.digital/wp-content/uploads/2023/07/Whatsapp-Canais-1-380x250.jpg",
        "id": "whatsapp-lanca-canais-de-comunicacao",
        "description": "A mais nova funcionalidade no WhatsApp traz uma proposta diferente ao aplicativo, mas já conhecido por aqueles que…"
      },
      ...
    ],
    "prev": "https://kabum.digital/page/4/?s",
    "current": "https://kabum.digital/page/5/?s=",
    "next": "https://kabum.digital/page/6/?s"
  }
}
</code>
</pre>

### Get a post content

To get post content use
<pre>
<code>
  https://unofficial-kabum-digital-api.up.railway.app/post/:id
</code>
</pre>

Request example:
<pre>
<code>
  https://unofficial-kabum-digital-api.up.railway.app/post/o-lancamento-fracassado-do-aplicativo-tom-de-guidione-machava-e-dario-mungoi
</code>
</pre>

Response example:
<pre>
<code>
{
  "post": {
    "title": "O lançamento fracassado do aplicativo TOM de Guidione Machava e Dário MungoiWake Up aposta em formações online pelo WhatsappTmcel amplia seu serviço de internet com “MaxTurbo”DEZAINE Conference reflecte a relação do homem com a Inteligência Artificial",
    "link": "https://kabum.digital/o-lancamento-fracassado-do-aplicativo-tom-de-guidione-machava-e-dario-mungoi",
    "image": "https://kabum.digital/wp-content/uploads/2022/12/Paulina-1160x829.jpeg",
    "content": [
      "Dário Mungoi e Guidione Machava, são dois jovens moçambicanos com um percurso inquestionáveis na tecnologia no país que os viu nascer, concretamente Moçambique. ",
      "Se por um lado, Dario Mungoi, contribuiu para o nascimento e chegada da GDG Maputo, sigla para comunidade mundial de desenvolvedores Google, de outro lado, Guidione Machava, colocou-se como motor dos desenvolvedores moçambicanos através da co-fundação da MozDevz ao lado de Fei Manheche,",
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
