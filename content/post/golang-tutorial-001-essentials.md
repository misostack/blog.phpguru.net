---
title: "Golang Tutorial 001 Essentials"
type: "post"
date: 2024-03-01T22:29:00+07:00
description: "In this article, you will learn about the essentials in golang"
keywords: ["golang"]
categories: ["golang-tutorial"]
tags: ["golang"]
image: "https://gist.github.com/assets/31009750/93b0e3f8-5ae5-419a-a79d-d0ca429c4a37"
---

To install golang in your computer, just follow [the installation guide](https://go.dev/doc/install)

## Install Go

> For Apple Silicon

```sh
sudo rm -rf /usr/local/go
brew uninstall go
brew install wget
wget https://golang.org/dl/go1.22.3.darwin-arm64.tar.gz
sudo tar -C /usr/local -xzf go1.22.3.darwin-arm64.tar.gz
source ~/.zshrc  # or source ~/.bash_profile
```

> go version go1.22.3 darwin/arm64

## Go essentials

```go
package main

import (
	"fmt"
	"math"
	"reflect"
)

// interface is like any in typescript
func checkType(value interface{}) {
	var t = reflect.TypeOf(value)
	fmt.Printf("Type from reflect of %v is %v\n", value, t)
}

func main() {
	fmt.Println("Welcome to Golang Tutorial 2024!!!")
	// same as python, your data type can be inferred
	// but you should declare your data type explicitly
	// basic data types
	var aBool bool = true
	var anInteger int64 = 123
	var aFloat float64 = 1.23

	checkType(aBool)
	checkType(anInteger)
	checkType(aFloat)

	// calculation
	a, b := 3, 4 // short hand for inferred type declaration
	var c = math.Sqrt(math.Pow(float64(a), 2) + math.Pow(float64(b), 2))
	checkType(c)
	// i^2 = -1
	// z = a + bi
	// eg: (x+1)^2 = -9
	// x = -1 + 3i || x = -1 - 3i
	var aComplexNumber = -1 + 3i
	var calculationOfComplexNumber = (aComplexNumber + 1) * (aComplexNumber + 1)
	checkType(aComplexNumber)
	checkType(calculationOfComplexNumber)

	// string is a sequence of bytes
	var aString = "abcdef"
	checkType(aString)

	var aRune = 'a'
	checkType(aRune)

	// constant
	const PI = 3.14
	const circleRadius = 5
	var circleCircumFerence = PI * circleRadius
	checkType(circleCircumFerence)

	// pointer
	var number int = 0
	fmt.Print("Please enter random number: ")
	fmt.Scan(&number)
	if number > 0 {
		fmt.Printf("Your number %v is greater than 0", number)
	} else {
		fmt.Printf("Your number %v is less than 0", number)
	}

	// some special types: byte(int8), rune(int32 - a Unicode code point), any(interface{}), nil

	// composites
}
```
