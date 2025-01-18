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

1. How many ways you can create a variable in golang?

- Explicit declaration
- Implicit declaration ( interpolation )
- Shorthand

```go
// explicit declaration
var number int
var number = 1
number :=1
```

2. Some example with variable and data types in golang

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

3. Go does not have built-in decimal type

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

4. Trong go string là tập hợp các kí tự

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
