package main

import (
	"Go-Playground/util"
	"fmt"
)

/*
// functions
func sum(a int, b int) int {
	return a + b
}

func swap(a, b int) (int, int) {
	return b, a
}
*/

func main() {

	/*
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
	*/

	/*
		// functions
		a := 5
		b := 6
		fmt.Println(sum(a, b))

		c, d := swap(a, b)
		fmt.Println(c, d)
	*/

	a := 1
	b := 2
	s := util.Sum(a, b)
	fmt.Println(s)

}
