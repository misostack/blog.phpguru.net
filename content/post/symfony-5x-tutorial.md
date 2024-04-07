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
3. Getting start with controller
4. Generate Entity
5. CRUD
6. User and Authentication
7. Repository
8. Service

Feel free to download full source code at [PHPGuru Symfony 5 Tutorial](https://github.com/phpguru-net/symfony54-webapp)

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

**Create user**

```sh
php bin\console make:user
```

```php
<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ORM\Table(name="`user`")
 */
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    private $password;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @deprecated since Symfony 5.3, use getUserIdentifier instead
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }
}

```

**Create auth**

```sh
php bin\console make:auth
```

```php
// src/Security/CustomBasicAuthenticator.php

namespace App\Security;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Http\Authenticator\AbstractLoginFormAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\CsrfTokenBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Credentials\PasswordCredentials;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Util\TargetPathTrait;

class CustomBasicAuthenticator extends AbstractLoginFormAuthenticator
{
    use TargetPathTrait;

    public const LOGIN_ROUTE = 'app_login';

    private UrlGeneratorInterface $urlGenerator;

    public function __construct(UrlGeneratorInterface $urlGenerator)
    {
        $this->urlGenerator = $urlGenerator;
    }

    public function authenticate(Request $request): Passport
    {
        $email = $request->request->get('email', '');

        $request->getSession()->set(Security::LAST_USERNAME, $email);

        return new Passport(
            new UserBadge($email),
            new PasswordCredentials($request->request->get('password', '')),
            [
                new CsrfTokenBadge('authenticate', $request->request->get('_csrf_token')),
            ]
        );
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        if ($targetPath = $this->getTargetPath($request->getSession(), $firewallName)) {
            return new RedirectResponse($targetPath);
        }

        // For example:
        return new RedirectResponse($this->urlGenerator->generate('post.index'));
    }

    protected function getLoginUrl(Request $request): string
    {
        return $this->urlGenerator->generate(self::LOGIN_ROUTE);
    }
}

```

```php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;


class RegistrationController extends AbstractController
{
    /**
     * @Route("/register", name="register")
     */
    public function index(Request $request, ManagerRegistry $doctrine, UserPasswordHasherInterface $passwordHasherEncoder): Response
    {

        $form = $this->createFormBuilder()
            ->add('email')
            ->add('password', RepeatedType::class, [
                'type' => PasswordType::class,
                'invalid_message' => 'The password fields must match.',
                'options' => ['attr' => ['class' => 'password-field']],
                'required' => true,
                'first_options'  => ['label' => 'Password'],
                'second_options' => ['label' => 'Repeat Password'],
            ])
            ->add('register', SubmitType::class, [
                "attr" => [
                    'class' => 'btn btn-primary float-end'
                ]
            ])
            ->getForm();

        $form->handleRequest($request);

        if ($form->isSubmitted()) {
            $data = $form->getData();
            $user = new User();
            $user->setEmail($data['email']);
            $hashedPassword = $passwordHasherEncoder->hashPassword($user, $data['password']);
            $user->setPassword($hashedPassword);


            dump($user);

            $entityManager = $doctrine->getManager();

            $entityManager->persist($user);
            $entityManager->flush();

            return $this->redirect($this->generateUrl('app_login'));
        }

        return $this->render('registration/index.html.twig', [
            'form' => $form->createView()
        ]);
    }
}

```

```php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
    /**
     * @Route("/login", name="app_login")
     */
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        if ($this->getUser()) {
            return $this->redirectToRoute('post.index');
        }

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('security/login.html.twig', ['last_username' => $lastUsername, 'error' => $error]);
    }

    /**
     * @Route("/logout", name="app_logout")
     */
    public function logout(): void
    {
    }
}

```

Access Control and Password Hashed Algorithm

```yml
security:
  enable_authenticator_manager: true
  # https://symfony.com/doc/current/security.html#registering-the-user-hashing-passwords
  password_hashers:
    Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface: "bcrypt"
  # https://symfony.com/doc/current/security.html#loading-the-user-the-user-provider
  providers:
    # used to reload user from session & other features (e.g. switch_user)
    app_user_provider:
      entity:
        class: App\Entity\User
        property: email
  firewalls:
    dev:
      pattern: ^/(_(profiler|wdt)|css|images|js)/
      security: false
    main:
      lazy: true
      provider: app_user_provider
      custom_authenticator: App\Security\CustomBasicAuthenticator
      logout:
        path: app_logout
        # where to redirect after logout
        target: app_login

      # activate different ways to authenticate
      # https://symfony.com/doc/current/security.html#the-firewall

      # https://symfony.com/doc/current/security/impersonating_user.html
      # switch_user: true

  # Easy way to control access for large sections of your site
  # Note: Only the *first* access control that matches will be used
  access_control:
    # Restricts access to paths starting with /login to users with the IS_AUTHENTICATED_ANONYMOUSLY role
    - { path: ^/login, roles: IS_AUTHENTICATED_ANONYMOUSLY }
    # Restricts access to all other paths to users with the ROLE_USER role
    - { path: ^/, roles: ROLE_USER }
    # - { path: ^/admin, roles: ROLE_ADMIN }
    # - { path: ^/profile, roles: ROLE_USER }

when@test:
  security:
    password_hashers:
      # By default, password hashers are resource intensive and take time. This is
      # important to generate secure password hashes. In tests however, secure hashes
      # are not important, waste resources and increase test times. The following
      # reduces the work factor to the lowest possible values.
      Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface:
        algorithm: auto
        cost: 4 # Lowest possible value for bcrypt
        time_cost: 3 # Lowest possible value for argon
        memory_cost: 10 # Lowest possible value for argon
```

### But you seems stuck with Symfony/Doctrine syntax, there not much auto completion

No worries, install the following plugins, will solve your problems

#### 1.[PHP Anotations](https://plugins.jetbrains.com/plugin/7320-php-annotations)

- Analyses the classes which can be used as annotations and provides code-completing when writing annotations - e.g. Doctrine ORM mappings.

#### 2.[Symfony Support](https://plugins.jetbrains.com/plugin/7219-symfony-support)

- This plugin provides auto-completion for anything in Symfony you can imagine. It analyses the DI container code.
