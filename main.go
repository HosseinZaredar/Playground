package main

import (
	"fmt"
)

func main() {

	// variables
	var v1 int = 1
	var v2 int
	v2 = 2
	var v3 = 3
	v4 := 4

	fmt.Println(v1, v2, v3 ,v4)

	// types
	var a int = -3
	var b int16 = 37
	var c uint16 = 10
	var d float32 = 3.14
	var e bool = true
	f := 3 + 2i // f := complex(3, 2)
	str := "Hello!" // var str string = "Hello!"

	fmt.Println(a, b, c, d, e, f, str)

	// constants
	const c1 = true
	const c2 = 3.14
	const c3 = -24

	fmt.Println(c1, c2, c3)
	
}
