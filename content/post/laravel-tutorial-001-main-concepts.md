---
title: "Laravel Tutorial 001 Main Concepts"
type: "post"
date: 2024-03-01T22:07:05+07:00
description: "In this article, we will go through all of main concepts in laravel."
keywords: ["laravel"]
categories: ["laravel-tutorial"]
tags: ["laravel", "php"]
image: "https://gist.github.com/assets/31009750/84d13faa-dd94-43f9-8aef-d4d13b4f64b1"
---

The 1st step, create new laravel project with composer

```sh
composer create-project laravel/laravel example-app
```

## Topics will be go through

> Laravel Atoms

1. [ ] Request Flow
2. [ ] Service Containers
3. [ ] Service Providers
4. [ ] Facades

> Go through all basic concepts via "Todo Application"

### Overview Architecture

![image](https://gist.github.com/assets/31009750/58f8d4de-89cb-4be3-a621-0667f14283a2)

```php
require __DIR__.'/../vendor/autoload.php';

/*
|--------------------------------------------------------------------------
| Run The Application
|--------------------------------------------------------------------------
|
| Once we have the application, we can handle the incoming request using
| the application's HTTP kernel. Then, we will send the response back
| to this client's browser, allowing them to enjoy our application.
|
*/

$app = require_once __DIR__.'/../bootstrap/app.php';

$kernel = $app->make(Kernel::class);

$response = $kernel->handle(
    $request = Request::capture()
)->send();

$kernel->terminate($request, $response);

```

### Laravel Atoms
