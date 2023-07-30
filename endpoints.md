# Endpoints

Welcome to the Unofficial Kabum Digital API endpoints! This API provides access to posts and their content from the Kabum Digital website. Below are the available endpoints along with their usage examples.

## Random

To get posts from a random page, access the following endpoint:

```
GET /random
```

Response example:
```json
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
```

## All posts from a page

To get all posts from a specific page, use the following endpoint:

```
GET /all/:page
```

There are around 79 pages available at the moment.

Request example:
```
GET /all/5
```

Response example:
```json
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
```

## Get a post content

To get post content, use the following endpoint:

```
GET /post/:id
```

Request example:
```
GET /post/o-lancamento-fracassado-do-aplicativo-tom-de-guidione-machava-e-dario-mungoi
```

Response example:
```json
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
```
