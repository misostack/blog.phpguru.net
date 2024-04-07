---
title: "Symfony 5x Tutorial"
type: "post"
date: 2024-04-02T02:37:35+07:00
description: "Symfony 5x Tutorial"
keywords: ["Symfony 5x Tutorial"]
categories: ["cheatsheet"]
tags: ["symfony5x"]
image: "/common/no-image.png"
---

**Glossary**

1. Install symfony cli
2. Create new symfony project

## Install symfony cli

- Follow [instruction](https://symfony.com/download) from symfony official doc to install symfony cli in your local.

- [Install scoop for window users](https://scoop.sh/)

```sh
# ubuntu/mac
curl -sS https://get.symfony.com/cli/installer | bash
# window
scoop install symfony-cli
```

## Create new Symfony project

```sh
symfony new symfony54-webapp --version=5.4 --webapp
```

For instance your webapp can be placed at **C:\laragon\www\symfony54-webapp**

If you're using Laragon that we already introduce on the last article, you can access the website on this url : symfony54-webapp.test. Why? Because laragon already add create this config for you in apache site config

```sh
<VirtualHost *:80>
    DocumentRoot "C:/laragon/www/symfony54-webapp/public"
    ServerName symfony54-webapp.test
    ServerAlias *.symfony54-webapp.test
    <Directory "C:/laragon/www/symfony54-webapp/public">
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>

# If you want to use SSL, enable it by going to Menu > Apache > SSL > Enabled
```

Let's write some code, but what should we start. Let's take a first glance at the source code structure

![image](https://gist.github.com/assets/31009750/e95d36c2-49c6-4677-9f18-09d76761ebd9)

So with the first glance, you can see that the request flow should be like this

> Browser -> Router -> Controller -> Repository -> Entity -> Templates -> Controller -> Browser

Let's create a controller first, but how?
Don't worry Symfony has [built-in cli](https://symfony.com/doc/5.x/console.html) that support you to generate common bricks to build your app.

```sh
php bin/console list
```

So let's **make** something

![image](https://gist.github.com/assets/31009750/d8f7c599-eaec-483c-b244-5f72cc8b63a6)

```sh
php bin\console make:controller --help
php bin\console make:controller HomeController
```

And then you can access your page with this URL http://symfony54-webapp.test/index.php/home

![image](https://gist.github.com/assets/31009750/3aad32b0-3829-4ec6-a28e-c7afb56dda24)

LOL, sound strange

Basically, you can debug your app with same configuration in last article. But sometime you wanna [dump](https://symfony.com/doc/5.x/components/var_dumper.html#var-dumper-dump-server) like a PHP Developer.

```sh
composer require --dev symfony/var-dumper
```

Then add the following line into .env file

```sh
###> symfony/var-dumper ###
VAR_DUMPER_FORMAT=html
###> symfony/var-dumper ###
```

```php
<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    /**
     * @Route("/home", name="app_home")
     */
    public function index(): Response
    {
        $var = [
            'a simple string' => "in an array of 5 elements",
            'a float' => 1.0,
            'an integer' => 1,
            'a boolean' => true,
            'an empty array' => [],
        ];
        dump($var);
        return $this->render('home/index.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }

    /**
     * @Route("/home/sidebar/{username?}", name="app_home_sidebar")
     */
    public function sidebar(Request $request): Response
    {
        $var = [
            'a simple string' => "in an array of 5 elements",
            'a float' => 1.0,
            'an integer' => 1,
            'a boolean' => true,
            'an empty array' => [],
        ];
        dump($var);
        $username = $request->get('username');
        return new Response("
        <aside>Sidebar {$username}</aside>");
    }
}

```

![image](https://gist.github.com/assets/31009750/f3c5b63a-12cb-44a2-a78e-e4c48a3c868c)

## Symfony console cheatsheet

### Make

```sh
 make
  make:auth                                  Creates a Guard authenticator of different flavors
  make:command                               Creates a new console command class
  make:controller                            Creates a new controller class
  make:crud                                  Creates CRUD for Doctrine entity class
  make:docker:database                       Adds a database container to your docker-compose.yaml file
  make:entity                                Creates or updates a Doctrine entity class, and optionally an API Platform resource
  make:fixtures                              Creates a new class to load Doctrine fixtures
  make:form                                  Creates a new form class
  make:message                               Creates a new message and handler
  make:messenger-middleware                  Creates a new messenger middleware
  make:migration                             Creates a new migration based on database changes
  make:registration-form                     Creates a new registration form system
  make:reset-password                        Create controller, entity, and repositories for use with symfonycasts/reset-password-bundle
  make:serializer:encoder                    Creates a new serializer encoder class
  make:serializer:normalizer                 Creates a new serializer normalizer class
  make:stimulus-controller                   Creates a new Stimulus controller
  make:subscriber                            Creates a new event subscriber class
  make:test                                  [make:unit-test|make:functional-test] Creates a new test class
  make:twig-extension                        Creates a new Twig extension class
  make:user                                  Creates a new security user class
  make:validator                             Creates a new validator and constraint class
  make:voter                                 Creates a new security voter class
```

## Let's run your symfony server for development purpose

```sh
symfony server:start
```

## Working with Persistent Layer

- Database
- ORM
- Install/Enable PHP extensions: pdo_mysql(MySQL), pdo_pgsql(PostgreSQL)

### Connect Database

> Symfony provide tools for you to work with Database via Doctrine ORM

```sh
# install Doctrine via orm Symfony pack
composer require symfony/orm-pack
# maker bundle help you to generate some code
composer require --dev symfony/maker-bundle
```

**Configuration**

> doctrine.yaml

```yaml
doctrine:
  dbal:
    url: "%env(resolve:DATABASE_URL)%"

    # IMPORTANT: You MUST configure your server version,
    # either here or in the DATABASE_URL env var (see .env file)
    #server_version: '16'
    driver: "pdo_pgsql"
    use_savepoints: true
  orm:
    auto_generate_proxy_classes: true
    naming_strategy: doctrine.orm.naming_strategy.underscore_number_aware
    auto_mapping: true
    mappings:
      App:
        is_bundle: false
        dir: "%kernel.project_dir%/src/Entity"
        prefix: 'App\Entity'
        alias: App

when@test:
  doctrine:
    dbal:
      # "TEST_TOKEN" is typically set by ParaTest
      dbname_suffix: "_test%env(default::TEST_TOKEN)%"

when@prod:
  doctrine:
    orm:
      auto_generate_proxy_classes: false
      proxy_dir: "%kernel.build_dir%/doctrine/orm/Proxies"
      query_cache_driver:
        type: pool
        pool: doctrine.system_cache_pool
      result_cache_driver:
        type: pool
        pool: doctrine.result_cache_pool

  framework:
    cache:
      pools:
        doctrine.result_cache_pool:
          adapter: cache.app
        doctrine.system_cache_pool:
          adapter: cache.system
```

> .env

```sh
DATABASE_URL="postgresql://sf_54_webapp:123456@127.0.0.1:5432/sf_54_webapp?serverVersion=16&charset=utf8"
```

**Migration**

```sh
# just check what changes
php bin\console doctrine:schema:update --dump-sql
# generate
php bin/console make:migration
# run migrations
php bin/console doctrine:migrations:migrate
# crud with doctrine
```

Entity

```php

namespace App\Entity;

use App\Repository\PostRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=PostRepository::class)
 */
class Post
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }
}

```

Repository

```php

namespace App\Repository;

use App\Entity\Post;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Post>
 *
 * @method Post|null find($id, $lockMode = null, $lockVersion = null)
 * @method Post|null findOneBy(array $criteria, array $orderBy = null)
 * @method Post[]    findAll()
 * @method Post[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PostRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Post::class);
    }

    public function add(Post $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Post $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return Post[] Returns an array of Post objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('p.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Post
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}

```

Let's create a controller

```php

namespace App\Controller;

use App\Entity\Post;
use App\Repository\PostRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/post", name="post.")
 */
class PostController extends AbstractController
{
    /**
     * @Route("/", name="index")
     */
    public function index(PostRepository $postRepository): Response
    {
        $posts = $postRepository->findAll();
        return $this->render('post/index.html.twig', [
            'posts' => $posts
        ]);
    }


    /**
     * @Route("/create", name="create")
     */
    public function create(Request $request, ManagerRegistry $doctrine): Response
    {
        // create new post with title
        $post = new Post();
        $post->setTitle('This is going to be title!');

        // entity manager to persist data into database
        $entityManger = $doctrine->getManager();
        $entityManger->persist($post);
        $entityManger->flush();
        // return a response

        return new Response('Post created!');
    }

    /**
     * @Route("/show/{id}", name="show")
     */
    public function show(string $id, PostRepository $postRepository): Response
    {
        $post = $postRepository->find($id);
        return $this->render('post/show.html.twig', [
            'post' => $post
        ]);
    }

}

```

In symfony, you can also do this

```sh
# Automatically Fetching Objects (ParamConverter)
composer require sensio/framework-extra-bundle
```

```php
    /**
     * @Route("/show/{id}", name="show")
     */
    public function show(Post $post): Response
    {
        return $this->render('post/show.html.twig', [
            'post' => $post
        ]);
    }
```

### Symfony Display dump in profiler

```sh
composer require --dev symfony/var-dumper
composer require --dev symfony/profiler-pack
```

### Adding Forms

```sh
composer require symfony/form
php bin\console make:form
```

![image](https://gist.github.com/assets/31009750/53327146-0bb5-49c4-9191-b1312c4811c6)

```php
// src\Form\PostType.php
namespace App\Form;

use App\Entity\Post;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PostType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('title')
            ->add('save', SubmitType::class, [
                'attr' => [
                    'class' => 'btn btn-primary float-end'
                ]
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Post::class,
        ]);
    }
}

```

```php
// src\Controller\PostController.php

namespace App\Controller;

use App\Entity\Post;
use App\Form\PostType;
use App\Repository\PostRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/post", name="post.")
 */
class PostController extends AbstractController
{
    /**
     * @Route("/", name="index")
     */
    public function index(PostRepository $postRepository): Response
    {
        $posts = $postRepository->findAll();
        return $this->render('post/index.html.twig', [
            'posts' => $posts
        ]);
    }


    /**
     * @Route("/create", name="create")
     */
    public function create(Request $request, ManagerRegistry $doctrine): Response
    {
        // create new post with title
        $post = new Post();

        $form = $this->createForm(PostType::class, $post);

        $form->handleRequest($request);

        if ($form->isSubmitted()) {

            // entity manager to persist data into database
            $entityManger = $doctrine->getManager();
            $entityManger->persist($post);
            $entityManger->flush();

            // // Set a flash message
            $this->addFlash(
                'success',
                "New post with id ={$post->getId()} created !"
            );
            return $this->redirect($this->generateUrl('post.index'));
        }

        return $this->render('post/create.html.twig', [
            'form' => $form->createView()
        ]);
    }

    /**
     * @Route("/show/{id}", name="show")
     */
    public function show(Post $post): Response
    {
        return $this->render('post/show.html.twig', [
            'post' => $post
        ]);
    }

    /**
     * @Route("/delete/{id}", name="delete")
     */
    public function delete(Post $post, ManagerRegistry $doctrine): Response
    {
        $entityManger = $doctrine->getManager();
        $id = $post->getId();

        $entityManger->remove($post);
        $entityManger->flush();

        // Set a flash message
        $this->addFlash(
            'danger',
            "Post with id ={$id} removed !"
        );

        return $this->redirect($this->generateUrl('post.index'));
    }
}

```

**templates\post\create.html.twig**

```twig
{% extends 'base.html.twig' %}

{% block title %}Create Post{% endblock %}

{% block body %}


<div class="container">
    <h1>Create Post</h1>
    {{ form(form) }}
</div>
{% endblock %}

```

Your form may looks not good, don't worry, symfony has it built-in theme for form

- [Symfony and Bootstrap5](https://symfony.com/doc/5.x/form/bootstrap5.html)

Make sure you add bootstrap5 css and js into your base layout

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>{% block title %}Welcome!{% endblock %}</title>
    {# Run `composer require symfony/webpack-encore-bundle` to start using
    Symfony UX #}
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
      crossorigin="anonymous"
    />
    {% block stylesheets %} {{ encore_entry_link_tags('app') }} {% endblock %}
    {% block javascripts %} {{ encore_entry_script_tags('app') }} {% endblock %}
  </head>
  <body>
    {% block body %}{% endblock %}
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
      crossorigin="anonymous"
    ></script>
  </body>
</html>
```

> form_themes: ["bootstrap_5_layout.html.twig"]

```yml
# config\packages\twig.yaml
twig:
  default_path: "%kernel.project_dir%/templates"
  form_themes: ["bootstrap_5_layout.html.twig"]

when@test:
  twig:
    strict_variables: true
```

### User and Authentication
