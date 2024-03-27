---
title: "Php Tutorial 2024 01 Setup Php Development Environment in Windows 10"
type: "post"
date: 2024-03-28T00:24:54+07:00
description: "In this article, you will learn how to install php environment, install, update composer, multiple php versions, useful vscode extensions and debug your php scripts or websites."
keywords:
  ["Php Tutorial 2024 01 Setup Php Development Environment in Windows 10"]
categories: ["php-tutorial"]
tags: ["php"]
image: "/common/no-image.png"
---

A very long story that every body knows is on window XAMPP/WAMP were the most popular choices in the past. But one day i've figure out Laragon - the all in one and light tool for windows. I never came back! Here is your new story.

## Setup Tools for development

1. [x] Install PHP Environment -> https://laragon.org/index.html
2. [x] Install and Update composer -> https://getcomposer.org/download/
3. [x] VsCode Extensions for PHP
4. [x] Debug PHP with VSCode and Xdebug

### Install PHP Environment

> Install Laragon in Windows

Download and install the appropriate versions

![image](https://gist.github.com/assets/31009750/da04e4e9-df09-4832-914c-cc2c043cda49)

Then launch laragon. Your www root directory will be placed in "C:\laragon\www"

When you create any folder in this www root directory, when launch wih laragon, it may help you to run at [your-folder-name].test

With Laragon, you can also manage multiple php versions on Window.

### Wanna use another version php with laragon

Find your specific version at [php archives](https://windows.php.net/downloads/releases/archives/)
Usually, we use safe thread version so, for example, i wanna run with php 7.4.x

> 9/29/2022 5:50 PM 26238674 php-7.4.32-Win32-vc15-x64.zip => this is my expected version

Just download then extract and move it into "C:\laragon\bin\php"

And select your appropriate version

![image](https://gist.github.com/assets/31009750/5ff91326-5001-4c4e-8273-69d0f7b417c9)

Remember to restart and check your version with command line like this

```sh
php -v
```

### Install and Update composer

Laragon already included a built-in composer version. But you may wanna upgrade it, so just go to "C:\laragon\bin\composer", and run these commands

```sh
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === 'dac665fdc30fdd8ec78b38b9800061b4150413ff2e3b6f88543c636f7cd84f6db9189d43a81e5503cda447da73c7e5b6') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"
```

Then check your composer version

```sh
composer --version
```

### VsCode Extensions for PHP

![image](https://gist.github.com/assets/31009750/7e9da8aa-cc22-424b-9bd8-6f137201f796)

- PHP Intelephense
- PHP Namespace Resolver
- PHPDoc Comment
- PHP Debug

### Install XDebug on Windows

- Create index.php at your root folder
- Edit content and replace with

```php
<?php
phpinfo();
```

- View source and copy all of content
- Paste in this [xdebug wizard form](https://xdebug.org/wizard)
- Follow the instruction
- Then enable xdebug extension witht laragon or edit your php.ini

![image](https://gist.github.com/assets/31009750/5894e2cb-74a1-4f3c-a888-3638032415d0)

![image](https://gist.github.com/assets/31009750/ac07d096-c1ee-4551-9950-27d6cf94048c)

Then edit your php.ini, in my example "C:\laragon\bin\php\php-7.4.32-Win32-vc15-x64\php.ini", and add the following lines at the end of file.

```cfg
[XDEBUG]
xdebug.mode = coverage,debug,develop
#xdebug.client_host = 127.0.0.1
xdebug.client_port = 9003
xdebug.start_with_request=yes
```

Then create new debug config on vscode, you may see something like this

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Listen for Xdebug",
      "type": "php",
      "request": "launch",
      "port": 9003
    },
    {
      "name": "Launch currently open script",
      "type": "php",
      "request": "launch",
      "program": "${file}",
      "cwd": "${fileDirname}",
      "port": 0,
      "runtimeArgs": ["-dxdebug.start_with_request=yes"],
      "env": {
        "XDEBUG_MODE": "debug,develop",
        "XDEBUG_CONFIG": "client_port=${port}"
      }
    },
    {
      "name": "Launch Built-in web server",
      "type": "php",
      "request": "launch",
      "runtimeArgs": [
        "-dxdebug.mode=debug",
        "-dxdebug.start_with_request=yes",
        "-S",
        "localhost:0"
      ],
      "program": "",
      "cwd": "${workspaceRoot}",
      "port": 9003,
      "serverReadyAction": {
        "pattern": "Development Server \\(http://localhost:([0-9]+)\\) started",
        "uriFormat": "http://localhost:%s",
        "action": "openExternally"
      }
    }
  ]
}
```

Press F5 to debug your website

![image](https://gist.github.com/assets/31009750/77dce5fb-2683-4d45-be26-e239d3d4f694)

Now when you access your website vscode will jump in the selected breakpoint you set before.

Feel free to working with PHP on window 10
