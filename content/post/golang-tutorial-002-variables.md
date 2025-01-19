---
title: "Learn variables by reading env file"
type: "post"
date: 2025-01-18T17:28:27+07:00
description: "In this article, you will learn about the variables in golang"
keywords: ["golang"]
categories: ["golang-tutorial"]
tags: ["golang"]
image: "https://gist.github.com/assets/31009750/93b0e3f8-5ae5-419a-a79d-d0ca429c4a37"
---

## How many ways you can create a variable in golang?

**Explicit declaration**

```go
var number int
```

**Implicit declaration ( inferred )**

```go
var number = 1
```

**Shorthand ( inferred )**

```go
number :=1
```

## Some example with variable and data types in golang

```go
package variables

import (
	"fmt"
	"math"

	"github.com/shopspring/decimal"
)

func ExampleDataTypes() {
	// boolean
	var isValid bool
	fmt.Println(isValid)
	// numbers : integer, float, complex
	var a, b int = 3, 4
	c := math.Sqrt(float64(a*a + b*b))
	fmt.Printf("sqrt(%v^2 + %v^2) = %v\n", a, b, c)
	var f float64 = 3.14
	fmt.Printf("f=%v\n", f)
}
```

## Go does not have built-in decimal type

Why decimal is important, let's check this example

```go
// go does not have built-in decimal
var x, y, z float64 = 0.1, 0.2, 0.3
var xPlusY = x + y
fmt.Printf("%v + %v = %v vs %v\n", x, y, xPlusY, z)
```

And here is the result

> 0.1 + 0.2 = 0.30000000000000004 vs 0.3

No worried, we have a popular package can solve this problem

```sh
go get github.com/shopspring/decimal
```

```go
import (
	"fmt"
	"github.com/shopspring/decimal"
)
var dx, dy = decimal.NewFromFloat(x), decimal.NewFromFloat(y)
var dz = decimal.NewFromFloat(z)
dXPlusY := dx.Add(dy)
fmt.Printf("%v + %v = %v vs %v\n", dx, dy, dXPlusY, dz)
```

And you have correct value

> 0.1 + 0.2 = 0.3 vs 0.3

## In golang a string is a collection of bytes

```go
	// string
	var s string = "Đây là chuỗi utf8"
	fmt.Println(len(s)) // => 22

    fmt.Println(s[0], s[7]) // => 196, 195
```

If you want to retrieve a character in string

```go
	for i, r := range s {
		fmt.Printf("%v: %c\n", i, r)
	}
```

```md
0: Đ
2: â
4: y
5:  
6: l
7: à
9:  
10: c
11: h
12: u
13: ỗ
16: i
17:  
18: u
19: t
20: f
21: 8
```

## 5. Derived types

### 5.1. Pointer

Let's have a look at this example

```go
func sum(a, b *int) *int {
	c := *a + *b
	return &c
}

var a1, b1 int = 1, 2
var c1 = sum(&a1, &b1)
fmt.Println(*c1)
```

Why does it so complicated? What is the difference.
Let's breakdown

> a,b \*int => declare a and b data type if int pointer
> &a1 => the address (pointer) that store value of a1
> &b1 => the address (pointer) that store value of b1
> &c => the address (pointer) that store value of c
> \*a1,\*b1,\*c => the value which the address stored

It means, go application only need to provide memory 3 times: a1, b1, c.
Because we use pointer to pass around between inside/outside of function.

Let's write another example, which make more sense of this technique

```go
func double(x *int) {
	*x *= 2
}

var x1 int = 10
double(&x1)
fmt.Println(x1)
double(&x1)
fmt.Println(x1)
```

Make more sense, right? We'll have side effect inside function. So be careful when using this technique.
It is a technique for saving memory.

### 5.2. Array in go

**Fixed size**

```go
	var arr1 [3]int = [3]int{1, 2, 3}
	fmt.Println(arr1[0])
	fmt.Println(arr1[1])
	fmt.Println(arr1[2])
```

**Dynamic size ( slice )**

````go
	var arr2 []int
	arr2 = append(arr2, 1)
	arr2 = append(arr2, 2)
	arr2 = append(arr2, 3)
	arr2 = append(arr2, 4)
	arr2 = append(arr2, 5)
	fmt.Println(arr2[len(arr2)-1])
	```
````
