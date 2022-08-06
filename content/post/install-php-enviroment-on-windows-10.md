---
title: "Install Php Enviroment on Windows 10"
type: "post"
date: 2022-08-06T09:47:49+07:00
description: "Install Php Enviroment on Windows 10"
keywords: ["Install Php Enviroment on Windows 10"]
categories: ["cheatsheet"]
tags: []
image: "/common/no-image.png"
---

> Todo

## 1. Install XAMPP with PHP

## 2. Add custom configuration for vhost

> C:\xampp\apache\conf\httpd.conf

**Add this line at the end**

Include "C:/custom_virtual_hoit.conf"

**Add your first virtual host**

```bash
<Directory "C:/www">
    AllowOverride All
    Options None
    Require all granted
</Directory>

# Default
<VirtualHost *:80>
    DocumentRoot "C:/www/localhost"
	ServerName localhost
    LogLevel warn
    ErrorLog "C:/www/localhost_error.log"
    CustomLog "C:/www/localhost_access.log" combined
</VirtualHost>
```

**Create new file C:/www/localhost/index.php**

```php
phpinfo();
```

**Restart XAMPP and open your localhost**

## Create PHP Path Variable

![image](https://user-images.githubusercontent.com/31009750/125823161-ad1f4009-430b-406d-8a3b-4290c7f1f6a3.png)

**Edit Path**

![image](https://user-images.githubusercontent.com/31009750/125823337-c7eed734-a2ff-4ddf-8827-4dce0a0d2664.png)

**Add Path**

![image](https://user-images.githubusercontent.com/31009750/125823267-7c5d5b11-4ace-4d42-9c78-f715595c4102.png)

**Open your terminal**

```bash
php -i
```

## 4. Install XDebug

**Install PHP Xdebug**

- URL : https://xdebug.org/wizard

### 1. Installation

**PHP 7.x**

Download php_xdebug-3.0.4-7.4-vc15-x86_64.dll
Move the downloaded file to C:\xampp\php\ext
Edit C:\xampp\php\php.ini and add the line
zend_extension = C:\xampp\php\ext\php_xdebug-3.0.4-7.4-vc15-x86_64.dll
Restart the webserver

**PHP 8.x**
Download php_xdebug-3.0.4-8.0-vs16-x86_64.dll
Rename **php_xdebug.dll**
Move the downloaded file to C:\desk\xampp\php\ext
Update C:\desk\xampp\php\php.ini to have the line:
zend_extension = xdebug
Restart the Apache Webserver

### 2. Debug

https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug

; XDebug
zend_extension = C:\xampp\php\ext\php_xdebug-3.0.4-7.4-vc15-x86_64.dll

xdebug.mode = debug
xdebug.start_with_request = yes
