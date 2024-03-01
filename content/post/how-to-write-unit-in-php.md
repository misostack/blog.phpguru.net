---
title: "How to Write Unit in Php"
type: "post"
date: 2022-08-07T09:55:08+07:00
description: "Unit testing is a software testing method by which individual units of source code"
keywords: ["php", "testing", "unit-testing", "phpunit"]
categories: ["cheatsheet"]
tags: ["php"]
image: "/common/no-image.png"
---

> Only ever write code to fix a failing test.

**That’s test-driven development, or TDD, in one sentence.**

## When do we write test?

![image](https://user-images.githubusercontent.com/31009750/184848843-67c8dfa8-65e0-41c4-9e07-3e5386e23deb.png)

## Steps

> Step 1 : Install PHPUnit using composer

```bash
composer require --dev phpunit/phpunit ^9.5
```

> Step 2: Configuration

**bootstrap.php**

```php
require_once '../vendor/autoload.php';
```

**phpunit.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>

<phpunit bootstrap="./bootstrap.php" colors="true">
    <testsuites>
        <testsuite name="UnitTestSuite">
            <directory>unit</directory>
        </testsuite>
        <testsuite name="IntegrationTestSuite">
            <directory>integration</directory>
        </testsuite>
        <testsuite name="EdgeToEdgeTestSuite">
            <directory>edge-to-edge</directory>
        </testsuite>
    </testsuites>
    <coverage cacheDirectory="./cached"
              includeUncoveredFiles="true"
              processUncoveredFiles="true"
              pathCoverage="false"
              ignoreDeprecatedCodeUnits="true"
              disableCodeCoverageIgnore="true">
        <include>
            <directory suffix=".php">../src</directory>
        </include>
        <report>
            <clover outputFile="clover.xml"/>
            <cobertura outputFile="cobertura.xml"/>
            <crap4j outputFile="crap4j.xml" threshold="50"/>
            <html outputDirectory="html-coverage" lowUpperBound="50" highLowerBound="90"/>
            <php outputFile="coverage.php"/>
            <text outputFile="coverage.txt" showUncoveredFiles="false" showOnlySummary="true"/>
            <xml outputDirectory="xml-coverage"/>
        </report>
    </coverage>
</phpunit>
```

> Step 3: Let's write some test

**src/StringManipulation.php**

```php
namespace PhpGuru;

class StringManipulation
{
	public static function trimVietnameseAccent($str)
	{
		$str = preg_replace("/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/", 'a', $str);
		$str = preg_replace("/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/", 'e', $str);
		$str = preg_replace("/(ì|í|ị|ỉ|ĩ)/", 'i', $str);
		$str = preg_replace("/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/", 'o', $str);
		$str = preg_replace("/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/", 'u', $str);
		$str = preg_replace("/(ỳ|ý|ỵ|ỷ|ỹ)/", 'y', $str);
		$str = preg_replace("/(đ)/", 'd', $str);
		$str = preg_replace("/(À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)/", 'A', $str);
		$str = preg_replace("/(È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)/", 'E', $str);
		$str = preg_replace("/(Ì|Í|Ị|Ỉ|Ĩ)/", 'I', $str);
		$str = preg_replace("/(Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)/", 'O', $str);
		$str = preg_replace("/(Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)/", 'U', $str);
		$str = preg_replace("/(Ỳ|Ý|Ỵ|Ỷ|Ỹ)/", 'Y', $str);
		$str = preg_replace("/(Đ)/", 'D', $str);
		$str = preg_replace("/(\“|\”|\‘|\’|\,|\!|\&|\;|\@|\#|\%|\~|\`|\=|\_|\'|\]|\[|\}|\{|\)|\(|\+|\^)/", '-', $str);
		$str = preg_replace("/( )/", '-', $str);
		return $str;
	}
}
```

**tests/unit/StringManipulationTest.php**

```php
declare(strict_types=1);

final class StringManipulationTest extends \PHPUnit\Framework\TestCase
{
	public function testEmpty(): void
	{
		$inputStr = "";
		$outputStr = PhpGuru\StringManipulation::trimVietnameseAccent($inputStr);
		$this->assertEmpty($outputStr);
	}
}
```

> Step 4: run

```bash
 XDEBUG_MODE=coverage vendor/phpunit/phpunit/phpunit --bootstrap ./vendor/autoload.php --configuration ./tests/phpunit.xml
```

**.gitignore** for phpunit

```bash
/tests/.phpunit.result.cache
/tests/cached
/tests/clover.xml
/tests/cobertura.xml
/tests/coverage.php
/tests/coverage.txt
/tests/crap4j.xml
/tests/html-coverage
/tests/xml-coverage
```
