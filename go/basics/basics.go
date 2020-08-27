package basics

import (
	"Go-Playground/util"
	"fmt"
)

// functions
func sum(a int, b int) int {
	return a + b
}

func swap(a, b int) (int, int) {
	return b, a
}

//Basics ...
func Basics() {
	// variables
	var v1 int = 1
	var v2 int
	v2 = 2
	var v3 = 3
	v4 := 4

	fmt.Println(v1, v2, v3, v4)
	fmt.Println()

	// types
	var a int = -3
	var b int16 = 37
	var c uint16 = 10
	var d float32 = 3.14
	var e bool = true
	f := 3 + 2i     // f := complex(3, 2)
	str := "Hello!" // var str string = "Hello!"

	fmt.Println(a, b, c, d, e, f, str)
	fmt.Println()

	// constants
	const c1 = true
	const c2 = 3.14
	const c3 = -24

	fmt.Println(c1, c2, c3)
	fmt.Println()

	// functions
	a1 := 5
	a2 := 6
	fmt.Println(sum(a1, a2))

	a3, a4 := swap(a1, a2)
	fmt.Println(a3, a4)
	fmt.Println()

	// modules
	b1 := 1
	b2 := 2
	s := util.Sum(b1, b2)
	fmt.Println(s)
	fmt.Println()

	// if-else
	a = 5
	if a < 5 {
		fmt.Println("a is less than 5")
	} else {
		fmt.Println("a is more than ot equal to 5")
	}
	fmt.Println()

	if b := 2 * a; b < 7 {
		fmt.Println("b is less than 7")
	}
	fmt.Println()

	// loop
	for i := 0; i < 5; i++ {
		fmt.Println("*")
	}
	fmt.Println()

	// swtich-case
	n := 2
	switch n {
	case 1:
		fmt.Println("n = 1")
	case 2:
		fmt.Println("n = 2")
	default:
		fmt.Println("default case")
	}
	fmt.Println()

	// array (fixed-size, value type)
	var arr1 [3]int
	arr1[0] = 5
	fmt.Println(arr1)

	arr2 := [...]int{1, 2}
	fmt.Println(arr2)
	fmt.Println()

	// slice (variable-size, reference tyoe)
	var s1 []int
	s1 = append(s1, 6)
	fmt.Println(s1)

	s2 := make([]int, 5, 10) //type, length, capacity
	fmt.Println(s2)
}
