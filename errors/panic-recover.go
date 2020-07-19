package errors

import "fmt"

func rec() {
	r := recover()
	if r != nil {
		fmt.Println("something happend but we're recovered!")
	}
}

// PanicRecover ...
func PanicRecover() {
	defer rec()
	s := []int {1, 2}
	fmt.Println(s[2])
	fmt.Println("All good!")
}