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

- [x] Install XAMPP
- [x] Add custom configuration for vhost
- [x] Create PHP Path Variable
- [x] Install XDebug
- [x] Debug with PHPStorm

## 1. Install XAMPP

## 2. Add custom configuration for vhost

> C:\xampp\apache\conf\httpd.conf

**Add this line at the end**

Include "C:/custom_virtual_host.conf"

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

## 3. Create PHP Path Variable

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

> Follow the instruction from xdebug

### 4.1. Installation

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

### 4.2. Debug

https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug

; XDebug
zend_extension = C:\xampp\php\ext\php_xdebug-3.0.4-7.4-vc15-x86_64.dll

xdebug.mode = debug
xdebug.start_with_request = yes

### 5. Debug with PHPStorm

**Add CLI Intepreter**

> Settings => Search "PHP"

Select your PHP version

![image](https://user-images.githubusercontent.com/31009750/183253725-7fc5851a-64ad-4493-8ab1-00bf06d330af.png)

**Create your server setting**

> Settings => Search "server"
> Select PHP > Servers > Add Insert

![image](https://user-images.githubusercontent.com/31009750/183253800-b0c6607b-b18e-4f69-bb9e-8a8ccf34fd92.png)

**Add your Debug Configuration**

> Run -> Edit Configuration

Add New -> PHP Web Page

Select your server and set the default open URL

![image](https://user-images.githubusercontent.com/31009750/183253983-5ed9368d-20a9-4ff2-9930-116fd08eba9c.png)

> Let's debug

Presse Shift + F9 or Debug Icon to start. Your URL may look like this

http://phonebook.phpguru.local/?XDEBUG_SESSION_START=13163

Then make sure you clicked on "Start Listening Debug PHP Connection" next to the debug icon

![image](https://user-images.githubusercontent.com/31009750/183254119-03f9a2c6-0491-4301-99cd-720929192366.png)

You can start adding your debug breakpoint, and it will look like this

![image](https://user-images.githubusercontent.com/31009750/183254169-64b1812f-2eb7-48e3-ab62-d9bf59016885.png)

Some shorcuts:

- Shift + F9 : start debug
- Shift + F8 : toggle debug breakdown
- F8 : step over

Enjoy!!!
