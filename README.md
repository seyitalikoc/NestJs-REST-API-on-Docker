<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# NestJS REST API with Dockerized Database

Bu proje, **NestJS** framework'u kullanılarak geliştirilmiş bir **REST API** uygulamasıdır. Ayrıca, proje **Docker** üzerinde çalışan bir veritabanına bağlanmaktadır. Veritabanı konteyneri de Docker aracılığıyla yönetilmektedir.

## Proje Yapısı
- **NestJS**: Sunucu tarafında kullanılan backend framework.
- **Docker**: Projenin veritabanı konteyneri ve uygulama konteynerinin yönetimi.
- **PostgreSQL**: Veritabanı, Docker üzerinde çalışmaktadır.

## Başlarken

Bu adımlar, projenin yerel ortamda çalışmasını sağlamak için gerekenleri açıklamaktadır.

### Gereksinimler
- [Node.js](https://nodejs.org/) (LTS versiyon önerilir)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Adım 1: Depoyu Klonlayın
GitHub reposunu bilgisayarınıza klonlayarak başlayın.

```bash
git clone https://github.com/seyitalikoc/NestJs-REST-API-on-Docker.git
cd NestJs-REST-API-on-Docker
```
### Adım 2: Docker'ı Başlatın
Docker konteynerlerini başlatmak için aşağıdaki komutu kullanın.

```bash
docker-compose up -d
```
Bu komut, docker-compose.yml dosyasına göre Docker konteynerlerini başlatır ve projenizin çalışması için gerekli olan veritabanı konteynerini otomatik olarak oluşturur.

### Adım 3: Bağımlılıkları Yükleyin
Projede kullanılan npm bağımlılıklarını yüklemek için şu komutu çalıştırın:

```bash
npm install
```

### Adım 4: Uygulamayı Çalıştırın
Uygulamayı yerel ortamda çalıştırmak için aşağıdaki komutu kullanın:

```bash
npm run start:dev
```

Uygulama, varsayılan olarak http://localhost:3000 adresinde çalışacaktır.

### Adım 5: Veritabanı Yapılandırması
Veritabanı Docker konteyneri çalıştığında, NestJS API'si bu veritabanına bağlanacaktır. Eğer veritabanı bağlantı bilgilerini değiştirmek isterseniz, src/config/database.config.ts veya .env dosyasını düzenleyebilirsiniz.

## API Kullanımı
### Başlangıçta Yapılacak İşlemler
- API'nin düzgün çalışabilmesi için, veritabanındaki gerekli tabloların oluşturulmuş olması gerekir. Bunun için bir migrasyon işlemi yapılabilir.
- NestJS'te kullanılan ORM (örneğin TypeORM veya Sequelize) ile veritabanı migrasyonlarını çalıştırabilirsiniz.

## Kullanılabilir Endpoints (USER)

### 1. `POST /user`
**Açıklama**: Kullanıcı kayıt yapmak için kullanılır.

- **Yöntem**: POST
- **URL**: `/user`

#### Gerekli Parametreler:
- **name**: Kullanıcı adı (String).
- **username**: Kullanıcının username'i (String).
- **mail**: Kullanıcının email adresi (String).
- **password**: Kullanıcının şifresi (String).

#### Örnek İstek:
```bash
POST http://localhost:3000/user

{
  "name": "your-name"
  "username": "your-username"
  "mail": "user@example.com",
  "password": "your-password"
}
```

### 2. `POST /user/login`
**Açıklama**: Kullanıcı girişi yapmak için kullanılır. Başarılı bir girişten sonra, kullanıcıya bir JWT token döner. Bu token, diğer korumalı API uç noktalarına erişim sağlamak için kullanılabilir.

- **Yöntem**: POST
- **URL**: `/user/login`

#### Gerekli Parametreler:
- **username**: Kullanıcının kullanıcı adı (String).
- **password**: Kullanıcının şifresi (String).

#### Örnek İstek:
```bash
POST http://localhost:3000/user/login

{
  "username": "your-username",
  "password": "your-password"
}
```

### 3. `PUT /user`
**Açıklama**: Kullanıcı bilgilerini güncellemek için kullanılır.

- **Yöntem**: PUT
- **URL**: `/user`

#### Gerekli Parametreler:
- **name**: Kullanıcı adı (String).
- **username**: Kullanıcının username'i (String).
- **email**: Kullanıcının email adresi (String).
- **password**: Kullanıcının şifresi (String).

#### Örnek İstek:
```bash
PUT http://localhost:3000/user

{
  "name": "your-name"
  "username": "new-username"
  "mail": "user@example.com",
  "password": "new-password"
}
```

### 4. 'GET /user/events'
**Açıklama**: Kullanıcı kaydolduğu eventleri görmek için kullanır.

- **Yöntem**: GET
- **URL**: `/user/events`

#### Örnek İstek:
```bash
GET http://localhost:3000/user/events
```

### 5. 'GET /user/eventid:eventId'
**Açıklama**: Kullanıcı kaydolduğu eventlerin birisinin detaylarını görmek için kullanır.

- **Yöntem**: GET
- **URL**: `/user/eventid:eventId`

#### Gerekli Parametreler:
- **eventId**: Kullanıcı kayıtlı olduğu eventlerden birinin id'si (Integer).

#### Örnek İstek:
```bash
GET http://localhost:3000/user/eventid1
```

### 6. 'DELETE /user/eventid:eventId'
**Açıklama**: Kullanıcı kaydolduğu eventten kaydını silmek için kullanır.

- **Yöntem**: DELETE
- **URL**: `/user/eventid:eventId`

#### Gerekli Parametreler:
- **eventId**: Kullanıcı kayıtlı olduğu eventlerden birinin id'si (Integer).

#### Örnek İstek:
```bash
DELETE http://localhost:3000/user/eventid1
```

## Kullanılabilir Endpoints (EVENT)

### 1. 'GET /event'
**Açıklama**: Tüm eventleri döndürür.

- **Yöntem**: GET
- **URL**: `/event`

#### Örnek İstek:
```bash
GET http://localhost:3000/event
```

### 2. 'GET /event/id:eventId'
**Açıklama**: İstenilen id'ye sahip eventin detayları döndürülür.

- **Yöntem**: GET
- **URL**: `/event/id:eventId`

#### Gerekli Parametreler:
- **eventId**: İstenilen eventin id'si (Integer).

#### Örnek İstek:
```bash
GET http://localhost:3000/event/id1
```

### 3. `POST /event`
**Açıklama**: Eventi kaydetmek için kullanılır.

- **Yöntem**: POST
- **URL**: `/event`

#### Gerekli Parametreler:
- **eventName**: Event adı (String).
- **eventStatement**: Eventin durumu (String).
- **context**: Eventin içeriği (String).
- **eventDate**: Eventin tarihi ve saati (Date).
- **place**: Eventin gerçekleşeceği ortam (String).

#### Örnek İstek:
```bash
POST http://localhost:3000/event

{
  "eventName": "event-name"
  "eventStatement": "event-statement"
  "context": "event-context",
  "eventDate": "29/01/2025 19:00",
  "place": "event-place"
}
```

### 4. `PUT /event/id:eventId`
**Açıklama**: Event bilgilerini güncellemek için kullanılır.

- **Yöntem**: PUT
- **URL**: `/event/id:eventId`

#### Gerekli Parametreler:
- **eventId**: Güncellenecek eventin id'si (Integer).

#### Örnek İstek:
```bash
POST http://localhost:3000/event/id1

{
  "eventName": "event-name"
  "eventStatement": "new-event-statement"
  "context": "new-event-context",
  "eventDate": "29/01/2025 19:00",
  "place": "new-event-place"
}
```

### 5. 'DELETE /event/id:eventId'
**Açıklama**: Belirtilen id'ye sahip event silinir.

- **Yöntem**: DELETE
- **URL**: `/event/id:eventId`

#### Gerekli Parametreler:
- **eventId**: İstenilen eventin id'si (Integer).

#### Örnek İstek:
```bash
DELETE http://localhost:3000/event/id1
```

## Docker Komutları
Docker konteynerlerini başlatmak için:
```bash
docker-compose up -d
```

Docker konteynerlerini durdurmak için:
```bash
docker-compose down
```

Docker konteyner loglarını görmek için:
```bash
docker-compose logs
```

## Proje Yapısı
```bash
.
├── src/
│   ├── app.module.ts           # Ana modül
│   ├── event/                  # Event yönetim modülü
│   ├── user/                   # Kullanıcı yönetimi modülü
│   └── guard/                  # Kimlik doğrulama modülü
├── Dockerfile                  # Uygulama için Dockerfile
├── docker-compose.yml          # Docker Compose yapılandırma dosyası
└── README.md                   # Proje açıklaması
```

## Geliştirici Notları

### **API Güvenliği**
- **JWT (JSON Web Tokens)**: API erişimi için **JWT** kullanılır. Kullanıcı giriş yaptıktan sonra, her API isteğinde **Authorization** başlığında `Bearer <token>` göndermeniz gerekir.
  - Token'ın geçerliliği süresi dolduğunda, kullanıcı yeniden giriş yapmak zorunda kalacaktır.

- **Guard**: Bu yapı ile bazı endpointler **JWT TOKEN** olmadan bir dönüş yapmamaktadır. Örnek *"GET http://localhost:3000/user/events"* endpointi bunlardan bir tanesidir.

