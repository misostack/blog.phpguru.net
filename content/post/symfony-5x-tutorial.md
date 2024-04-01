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
